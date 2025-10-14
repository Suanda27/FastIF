'use client';

import { User } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  userName?: string;
}

export default function DashboardHeader({ title, userName = 'Mahasiswa' }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex justify-end items-center">
      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-medium text-sm md:text-base">{userName}</span>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </header>
  );
}
