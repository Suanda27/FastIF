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
  onConfirm: (catatan: string) => void;
  closing?: boolean;
}) {
  const [catatan, setCatatan] = useState("");

  return (
    <ModalShell onClose={onClose} closing={closing}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {action === "accept" ? "Terima Surat" : "Tangguhkan Surat"}
        </h3>

        <p className="text-sm text-gray-700 mb-4">
          {action === "accept"
            ? "Apakah Anda yakin ingin menerima surat ini?"
            : "Apakah Anda yakin ingin menangguhkan/menolak surat ini?"}
        </p>

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
            onClick={() => onConfirm(catatan)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
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
