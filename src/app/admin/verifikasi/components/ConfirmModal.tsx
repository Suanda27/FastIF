"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import ModalShell from "./ModalShell";

export default function ConfirmModal({
  action,
  onClose,
  onConfirm,
  closing,
}: {
  action: "accept" | "reject";
  onClose: () => void;
  onConfirm: (data: { status: string; catatan: string }) => void;
  closing?: boolean;
}) {
  const [catatan, setCatatan] = useState("");
  const [isTangguhkan, setIsTangguhkan] = useState(false);
  const [loading, setLoading] = useState(false);

  const finalStatus =
  action === "accept"
    ? "diterima"
    : isTangguhkan
    ? "ditangguhkan"
    : "ditolak";

  return (
    <ModalShell onClose={onClose} closing={closing}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {action === "accept"
            ? "Terima Surat"
            : isTangguhkan
            ? "Tangguhkan Surat"
            : "Tolak Surat"}
        </h3>

        <p className="text-sm text-gray-700 mb-4">
          {action === "accept" ? (
            "Apakah Anda yakin ingin menerima surat ini?"
            ) : isTangguhkan ? (
                "Surat akan dikembalikan ke mahasiswa untuk diperbaiki."
            ) : (
                "Surat akan ditolak secara final dan tidak dapat diperbaiki."
            )}
        </p>

        {action === "reject" && (
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-3 justify-center">
            <input
              type="checkbox"
              checked={isTangguhkan}
                onChange={(e) => setIsTangguhkan(e.target.checked)}
                className="accent-blue-600"
            />
            Tangguhkan agar mahasiswa dapat memperbaiki surat
          </label>
        )}

        {/* === TEXTAREA CATATAN ADMIN === */}
        <textarea
          className="w-full border rounded-lg p-3 text-sm mb-4 
             focus:ring-2 focus:ring-blue-500
             text-gray-800 placeholder-gray-600"
          rows={3}
          placeholder="Tambahkan catatan admin (opsional)"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
        />

        <div className="flex justify-center gap-3">
          <button
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                
                await onConfirm({
                  status: finalStatus,
                  catatan,
                });

                onClose();
              } catch (error) {
                 console.error(error);
              } finally {
                setLoading(false);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition text-white
              ${
                action === "reject" && !isTangguhkan
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }
              ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          > 
            <CheckCircle /> Ya, lanjutkan
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg shadow text-gray-700 hover:bg-gray-200 transition"
          >
            <XCircle /> Batal
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
