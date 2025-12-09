"use client";

import ModalShell from "./ModalShell";

export default function PreviewModal({
  row,
  onClose,
  closing,
}: {
  row: any;
  onClose: () => void;
  closing?: boolean;
}) {
  const file = row.previewFile;
  const fileUrl = `http://localhost:8001/preview/${file}`;

  return (
    <ModalShell onClose={onClose} closing={closing} wide>
      <div className="space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">Preview Lampiran</h3>

          <div>
            <span className="text-xs text-gray-500">File:</span>
            <div className="text-sm text-blue-700">{file}</div>
          </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="w-full h-[75vh] bg-white border border-gray-200 rounded overflow-hidden">
          <iframe
            src={fileUrl}
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>

      </div>
    </ModalShell>
  );
}
