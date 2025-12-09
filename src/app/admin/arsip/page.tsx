"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileArchive } from "lucide-react";
import { SuratRow } from "./data";

import FilterBar from "./components/FilterBar";
import ArsipTable from "./components/ArsipTable";
import DetailModal from "./components/DetailModal";
import PreviewModal from "./components/PreviewModal";

export default function ArsipSuratPage() {
  const [rows, setRows] = useState<SuratRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [jenisFilter, setJenisFilter] = useState("Semua");
  const [detailRow, setDetailRow] = useState<SuratRow | null>(null);

  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fetch data dari backend Express
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/arsip-surat");
        const json = await res.json();

        if (json.success) {
          const formatted = json.data.map((item: any) => ({
            id: item.id_surat,
            nama: item.nama,
            nim: item.nim,
            jurusan: item.jurusan,
            jenis: item.jenis_surat,
            jenis_surat: item.jenis_surat,
            status: item.status || item.status_verifikasi,
            tanggal_pengajuan: item.tanggal_pengajuan,
            keperluan: item.keperluan || item.keterangan || null,
            files: item.files || [],
            detail: item.detail || {},
          }));

          setRows(formatted);
        } else {
          setError(json.message || "Gagal mengambil data arsip");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Tidak bisa terhubung ke server backend");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const anyModalOpen = !!detailRow || !!previewFile;
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
        r.nama?.toLowerCase().includes(query.toLowerCase()) ||
        (r.nim || "").includes(query);
      const matchJenis = jenisFilter === "Semua" || r.jenis === jenisFilter;
      return matchQuery && matchJenis;
    });
  }, [rows, query, jenisFilter]);

  const jenisOptions = ["Semua", ...Array.from(new Set(rows.map((r) => r.jenis)))];

  if (!mounted) return null;

  if (loading) return <p className="text-gray-500">Memuat data arsip surat...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileArchive className="w-6 h-6 text-blue-600" />
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
        onPreview={(r) => {
          const f = r.files?.[0] || null;
          if (f) setPreviewFile(f);
        }}
      />

      {detailRow &&
        createPortal(
          <DetailModal
            row={detailRow}
            closing={closing}
            onClose={() => closeModal(setDetailRow)}
            onPreview={(file: string) => {
              setPreviewFile(file);
            }}
          />,
          document.body
        )}

      {previewFile &&
        createPortal(
          <PreviewModal
            file={previewFile}
            closing={closing}
            onClose={() => closeModal(setPreviewFile)}
          />,
          document.body
        )}
    </div>
  );
}
