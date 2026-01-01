"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import { SuratRow, Status } from "./data";
import FilterBar from "./components/FilterBar";
import VerifikasiTable from "./components/VerifikasiTable";
import ConfirmModal from "./components/ConfirmModal";
import DetailModal from "./components/DetailModal";
import PreviewModal from "./components/PreviewModal";

export default function VerifikasiSuratPage() {
  const [data, setData] = useState<SuratRow[]>([]);
  const [query, setQuery] = useState("");
  const [jenisFilter, setJenisFilter] = useState("Semua");

  const [detailRow, setDetailRow] = useState<any>(null);
  const [previewRow, setPreviewRow] = useState<any>(null);

  const [confirmAction, setConfirmAction] = useState<{
    type: "accept" | "reject";
    row: SuratRow;
  } | null>(null);

  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // TOAST STATE
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => setMounted(true), []);

  // ==================== AUTO DISMISS TOAST ====================
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000); // ⏱️ 3 detik

    return () => clearTimeout(timer);
  }, [toast]);

  // ==================== FETCH DATA ====================
  useEffect(() => {
    fetch("http://localhost:8001/api/verifikasi", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        setData(
          (result.data || []).map((item: any) => ({
            id: item.id_surat,
            nama: item.nama,
            nim: item.nim,
            jenis: item.jenis_surat,
            status: (item.status || "diproses").toLowerCase() as Status,
          }))
        );
      })
      .catch((err) => console.error("Gagal fetch:", err));
  }, []);

  // ==================== DETAIL SURAT ====================
  const handleDetail = async (row: SuratRow) => {
    try {
      const res = await fetch(
        `http://localhost:8001/api/verifikasi/${row.id}`,
        { credentials: "include" }
      );
      const result = await res.json();

      if (result.success) {
        setDetailRow(result.data);
      } else {
        alert("Gagal memuat detail surat");
      }
    } catch (err) {
      console.error("Error get detail:", err);
    }
  };

  // ==================== CLOSE ANIMATION ====================
  const closeModal = (setter: Function) => {
    setClosing(true);
    setTimeout(() => {
      setter(null);
      setClosing(false);
    }, 250);
  };

  // ==================== VERIFIKASI SURAT ====================
  const handleConfirm = async ({
    status,
    catatan,
  }: {
    status: string;
    catatan: string;
  }) => {
    if (!confirmAction) throw new Error("Tidak ada surat");

    const res = await fetch("http://localhost:8001/api/verifikasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id_surat: confirmAction.row.id,
        status,
        catatan: catatan || null,
      }),
    });

    if (!res.ok) {
      setToast({
        type: "error",
        message: "Gagal memproses verifikasi surat",
      });
      throw new Error("Gagal update database");
    }

    setData((prev) =>
      prev.map((r) =>
        r.id === confirmAction.row.id
          ? { ...r, status: status as Status }
          : r
      )
    );

    // Tutup modal dulu
    closeModal(setConfirmAction);

    // Toast muncul setelah modal hilang
    setTimeout(() => {
      setToast({
        type: "success",
        message:
          status === "diterima"
            ? "Surat berhasil diterima"
            : status === "ditangguhkan"
            ? "Surat berhasil ditangguhkan"
            : "Surat berhasil ditolak",
      });
    }, 300);
  };

  // ==================== FILTER DATA ====================
  const filteredData = useMemo(() => {
    return data
      .map((r) => {
        const statusLower = (r.status || "").toLowerCase();
        const mappedStatus: Status =
          statusLower === "diproses"
            ? "Diproses"
            : statusLower === "diterima"
            ? "Diterima"
            : "Ditangguhkan";

        return { ...r, status: mappedStatus };
      })
      .filter((r) => r.status === "Diproses")
      .filter((r) => {
        const matchQuery =
          r.nama.toLowerCase().includes(query.toLowerCase()) ||
          r.nim.toLowerCase().includes(query.toLowerCase());
        const matchJenis = jenisFilter === "Semua" || r.jenis === jenisFilter;
        return matchQuery && matchJenis;
      });
  }, [data, query, jenisFilter]);

  const jenisOptions = [
    "Semua",
    ...Array.from(new Set(data.map((r) => r.jenis))),
  ];

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-semibold text-gray-800">
        Verifikasi Surat Mahasiswa
      </h1>

      <FilterBar
        query={query}
        setQuery={setQuery}
        jenisFilter={jenisFilter}
        setJenisFilter={setJenisFilter}
        jenisOptions={jenisOptions}
      />

      <VerifikasiTable
        data={filteredData}
        onDetail={handleDetail}
        onAccept={(row) => setConfirmAction({ type: "accept", row })}
        onReject={(row) => setConfirmAction({ type: "reject", row })}
      />

      {detailRow &&
        createPortal(
          <DetailModal
            row={detailRow}
            closing={closing}
            onClose={() => closeModal(setDetailRow)}
            onPreview={(file) => setPreviewRow({ previewFile: file })}
          />,
          document.body
        )}

      {confirmAction &&
        createPortal(
          <ConfirmModal
            action={confirmAction.type}
            closing={closing}
            onClose={() => closeModal(setConfirmAction)}
            onConfirm={handleConfirm}
          />,
          document.body
        )}

      {previewRow &&
        createPortal(
          <PreviewModal
            row={previewRow}
            closing={closing}
            onClose={() => closeModal(setPreviewRow)}
          />,
          document.body
        )}

      {/* ================= TOAST (TOP) ================= */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-20 right-6 z-[9999] px-5 py-3 rounded-xl shadow-xl text-white text-sm
              ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
            `}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
