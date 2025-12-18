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

  const ext = file?.split(".").pop()?.toLowerCase();
  const isPdf = ext === "pdf";
  const isImage = ["jpg", "jpeg", "png"].includes(ext ?? "");

  // PDF pakai preview endpoint, image pakai uploads
  const fileUrl = isPdf
    ? `http://localhost:8001/preview/${file}`
    : `http://localhost:8001/uploads/${file}`;

  return (
    <ModalShell onClose={onClose} closing={closing} wide>
      <div className="space-y-3">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">
            Preview Lampiran
          </h3>

          <div className="text-right">
            <span className="text-xs text-gray-500">File:</span>
            <div className="text-sm text-blue-700 break-all">
              {file}
            </div>
          </div>
        </div>

        {/* TOOLBAR (HANYA UNTUK IMAGE) */}
        {isImage && (
          <div className="flex justify-end">
            <button
              onClick={() => window.print()}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Cetak
            </button>
          </div>
        )}

        {/* PREVIEW AREA */}
        <div className="w-full h-[75vh] bg-white border border-gray-200 rounded overflow-auto flex items-center justify-center">

          {/* PDF */}
          {isPdf && (
            <iframe
              src={fileUrl}
              className="w-full h-full"
              style={{ border: "none" }}
            />
          )}

          {/* IMAGE */}
          {isImage && (
            <img
              src={fileUrl}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          )}

          {/* FALLBACK */}
          {!isPdf && !isImage && (
            <div className="text-gray-500 text-sm">
              File tidak dapat dipreview
            </div>
          )}
        </div>

      </div>
    </ModalShell>
  );
}
