"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

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

  useEffect(() => setMounted(true), []);

  // ==================== AMBIL DATA TABEL ====================
  useEffect(() => {
    fetch("http://localhost:8001/api/cardadmin")
      .then((res) => res.json())
      .then((result) => {
        setData(
          (result.dataSurat || []).map((item: any) => ({
            id: item.id_surat,
            nama: item.nama,
            nim: item.nim,
            jenis: item.jenis,
            jurusan: item.jurusan,
            status: item.status as Status,
          }))
        );
      })
      .catch((err) => console.error("Gagal fetch:", err));
  }, []);

  // ==================== FIX DETAIL SURAT ====================
  const handleDetail = async (row: SuratRow) => {
    try {
      const res = await fetch(`http://localhost:8001/api/verifikasi/${row.id}`);
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

  // ==================== ANIMASI CLOSE ====================
  const closeModal = (setter: Function) => {
    setClosing(true);
    setTimeout(() => {
      setter(null);
      setClosing(false);
    }, 250);
  };

  // ==================== VERIFIKASI ====================
  const handleConfirm = async () => {
    if (!confirmAction) return;

    const newStatus =
      confirmAction.type === "accept" ? "diterima" : "ditolak";

    try {
      const res = await fetch("http://localhost:8001/api/verifikasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_surat: confirmAction.row.id,
          status: newStatus,
        }),
      });

      const text = await res.text();
      console.log("Response:", res.status, text);

      if (!res.ok) throw new Error("Gagal update database");

      setData((prev) =>
        prev.map((r) =>
          r.id === confirmAction.row.id
            ? { ...r, status: newStatus as Status }
            : r
        )
      );
    } catch (err) {
      console.error("Error verifikasi:", err);
    }

    closeModal(setConfirmAction);
  };

  // ==================== FILTER DATA ====================
  const filteredData = useMemo(() => {
    const formatted = data.map((r) => ({
      ...r,
      status: (
        r.status === "diproses"
          ? "Diproses"
          : r.status === "diterima"
          ? "Diterima"
          : "Ditangguhkan"
      ) as Status,
    }));

    return formatted.filter((r) => {
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
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">
          Verifikasi Surat Mahasiswa
        </h1>
      </div>

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

      {/* =============== DETAIL MODAL =============== */}
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

      {/* =============== CONFIRM MODAL =============== */}
      {confirmAction &&
        createPortal(
          <ConfirmModal
            action={confirmAction.type}
            onClose={() => closeModal(setConfirmAction)}
            onConfirm={handleConfirm}
            closing={closing}
          />,
          document.body
        )}

      {/* =============== PREVIEW MODAL =============== */}
      {previewRow &&
        createPortal(
          <PreviewModal
            row={previewRow}
            onClose={() => closeModal(setPreviewRow)}
            closing={closing}
          />,
          document.body
        )}
    </motion.div>
  );
}
