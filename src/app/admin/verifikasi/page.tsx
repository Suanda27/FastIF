"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FileCheck2 } from "lucide-react";

import { DUMMY, SuratRow } from "./data";
import FilterBar from "./components/FilterBar";
import VerifikasiTable from "./components/VerifikasiTable";
import ConfirmModal from "./components/ConfirmModal";
import DetailModal from "./components/DetailModal";
import PreviewModal from "./components/PreviewModal";

export default function VerifikasiSuratPage() {
  const [data, setData] = useState<SuratRow[]>(DUMMY);
  const [query, setQuery] = useState("");
  const [jenisFilter, setJenisFilter] = useState("Semua");
  const [detailRow, setDetailRow] = useState<SuratRow | null>(null);
  const [previewRow, setPreviewRow] = useState<SuratRow | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: "accept" | "reject";
    row: SuratRow;
  } | null>(null);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const closeModal = (setter: Function) => {
    setClosing(true);
    setTimeout(() => {
      setter(null);
      setClosing(false);
    }, 250);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      setData((prev) =>
        prev.map((r) =>
          r.id === confirmAction.row.id
            ? {
                ...r,
                status:
                  confirmAction.type === "accept" ? "Diterima" : "Ditangguhkan",
              }
            : r
        )
      );
      closeModal(setConfirmAction);
    }
  };

  // 🔍 Filter pencarian
  const filteredData = useMemo(() => {
    return data.filter((r) => {
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
        onDetail={setDetailRow}
        onAccept={(row) => setConfirmAction({ type: "accept", row })}
        onReject={(row) => setConfirmAction({ type: "reject", row })}
      />

      {/* === Portals === */}
      {detailRow &&
        createPortal(
          <DetailModal
            row={detailRow}
            closing={closing}
            onClose={() => closeModal(setDetailRow)}
            onPreview={(id) => {
              const row = data.find((r) => r.id === id);
              if (row) setPreviewRow(row);
            }}
          />,
          document.body
        )}

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
