"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileArchive } from "lucide-react";
import { SuratRow, DUMMY } from "./data";

import FilterBar from "./components/FilterBar";
import ArsipTable from "./components/ArsipTable";
import DetailModal from "./components/DetailModal";
import PreviewModal from "./components/PreviewModal";

export default function ArsipSuratPage() {
  const [rows] = useState<SuratRow[]>(DUMMY);
  const [query, setQuery] = useState("");
  const [jenisFilter, setJenisFilter] = useState("Semua");
  const [detailRow, setDetailRow] = useState<SuratRow | null>(null);
  const [previewRow, setPreviewRow] = useState<SuratRow | null>(null);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const anyModalOpen = !!detailRow || !!previewRow;
  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "";
    setMounted(true);
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyModalOpen]);

  const closeModal = (setter: Function) => {
    setClosing(true);
    setTimeout(() => {
      setter(null);
      setClosing(false);
    }, 250);
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchQuery =
        r.nama.toLowerCase().includes(query.toLowerCase()) ||
        r.nim.includes(query);
      const matchJenis = jenisFilter === "Semua" || r.jenis === jenisFilter;
      return matchQuery && matchJenis;
    });
  }, [rows, query, jenisFilter]);

  const jenisOptions = [
    "Semua",
    ...Array.from(new Set(rows.map((r) => r.jenis))),
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">Arsip Surat</h1>
      </div>

      <FilterBar
        query={query}
        setQuery={setQuery}
        jenisFilter={jenisFilter}
        setJenisFilter={setJenisFilter}
        jenisOptions={jenisOptions}
      />

      <ArsipTable
        data={filtered}
        onDetail={(r) => setDetailRow(r)}
        onPreview={(r) => setPreviewRow(r)}
      />

      {detailRow &&
        createPortal(
          <DetailModal
            row={detailRow}
            closing={closing}
            onClose={() => closeModal(setDetailRow)}
            onPreview={(id) => {
              const found = rows.find((r) => r.id === id);
              if (found) setPreviewRow(found);
            }}
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
    </div>
  );
}
