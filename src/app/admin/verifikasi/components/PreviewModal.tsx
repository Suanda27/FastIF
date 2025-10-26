"use client";

import ModalShell from "./ModalShell";
import { SuratRow } from "../data";

export default function PreviewModal({
  row,
  onClose,
  closing,
}: {
  row: SuratRow;
  onClose: () => void;
  closing?: boolean;
}) {
  return (
    <ModalShell onClose={onClose} closing={closing} wide>
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">Preview Surat</h3>
          <div>
            <span className="text-xs text-gray-500">File:</span>
            <div className="text-sm text-blue-700">
              {row.files?.[0] ?? "No file"}
            </div>
          </div>
        </div>

        <div className="w-full h-[60vh] bg-white border border-gray-200 rounded overflow-auto flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="mb-3 text-sm">Preview tidak tersedia (dummy)</div>
            <div className="w-48 h-60 bg-gray-100 border rounded shadow-inner flex items-center justify-center">
              <span className="text-xs text-gray-400">Thumbnail Surat</span>
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
