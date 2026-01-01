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
  const isDoc = ["doc", "docx"].includes(ext ?? "");

  const fileUrl = isPdf
    ? `http://localhost:8001/preview/${file}`
    : `http://localhost:8001/uploads/${file}`;

  return (
    <ModalShell onClose={onClose} closing={closing} wide>
      <div className="space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Preview Surat:
            <span className="text-blue-600 ml-1 break-all">{file}</span>
          </h3>
        </div>

        {/* PREVIEW AREA */}
        <div className="w-full h-[75vh] bg-white border border-gray-200 rounded flex items-center justify-center">

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

          {/* DOC / DOCX FALLBACK */}
          {isDoc && (
            <div className="text-center space-y-4">
              <p className="text-gray-600 text-sm">
                Tidak dapat menampilkan preview untuk tipe file ini.
              </p>

              <a
                href={fileUrl}
                download
                className="inline-block px-5 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
              >
                Download {file}
              </a>
            </div>
          )}

          {/* OTHER FILE */}
          {!isPdf && !isImage && !isDoc && (
            <div className="text-gray-500 text-sm">
              File tidak dapat dipreview
            </div>
          )}
        </div>

      </div>
    </ModalShell>
  );
}
