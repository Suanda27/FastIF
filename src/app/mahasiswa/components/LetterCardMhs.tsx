import Link from 'next/link';
import { FileText } from 'lucide-react';

interface LetterCardProps {
  title: string;
  exampleLink?: string | null;
  templateLink?: string | null;
}

export default function LetterCard({
  title,
  exampleLink,
  templateLink,
}: LetterCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="bg-blue-200 p-3 rounded-lg">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

          <div className="space-y-1">
            {exampleLink ? (
              <p className="text-sm text-gray-700">
                Contoh Surat{" "}
                <a
                  href={exampleLink}
                  target="_blank"
                  download
                  className="text-blue-600 hover:underline font-medium"
                >
                  [Klik Disini]
                </a>
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">Contoh surat belum tersedia</p>
            )}

            {templateLink ? (
              <p className="text-sm text-gray-700">
                Template Surat{" "}
                <a
                  href={templateLink}
                  target="_blank"
                  download
                  className="text-blue-600 hover:underline font-medium"
                >
                  [Klik Disini]
                </a>
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">Template surat belum tersedia</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
