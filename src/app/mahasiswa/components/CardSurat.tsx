import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CardSuratProps {
  title: string;
  icon: LucideIcon;
  link: string;
}

export default function CardSurat({ title, icon: Icon, link }: CardSuratProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
      <div className="w-24 h-24 rounded-full bg-[#C5D5F7] flex items-center justify-center mb-6">
        <Icon size={48} className="text-[#0A1C56]" strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-bold text-[#0A1C56] mb-6 text-center">
        {title}
      </h3>

      <Link
        href={link}
        className="bg-[#0A1C56] text-white px-12 py-3 rounded-lg font-medium hover:bg-[#1976D2] transition-colors"
      >
        Ajukan
      </Link>
    </div>
  );
}
