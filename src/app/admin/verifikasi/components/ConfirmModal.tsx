"use client";

import { CheckCircle, XCircle, Check, X } from "lucide-react";
import ModalShell from "./ModalShell";

export default function ConfirmModal({
  action,
  onClose,
  onConfirm,
  closing,
}: {
  action: "accept" | "reject";
  onClose: () => void;
  onConfirm: () => void;
  closing?: boolean;
}) {
  return (
    <ModalShell onClose={onClose} closing={closing}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {action === "accept" ? "Terima Surat" : "Tangguhkan Surat"}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {action === "accept"
            ? "Apakah Anda yakin ingin menerima surat ini?"
            : "Apakah Anda yakin ingin menangguhkan/menolak surat ini?"}
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <CheckCircle /> Ya, lanjutkan
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition"
          >
            <XCircle /> Batal
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
