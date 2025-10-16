'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, FileText, Clock, History, User, LogOut, Menu, X } from 'lucide-react';

const menuItems = [
  { href: '/mahasiswa/DashboardMhs', label: 'Dashboard', icon: Home },  // update path
  { href: '/mahasiswa/PengajuanSurat', label: 'Pengajuan Surat', icon: FileText },
  { href: '/status-surat', label: 'Status Surat', icon: Clock },
  { href: '/riwayat-surat', label: 'Riwayat Surat', icon: History },
  { href: '/profil', label: 'Profil', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);


  const isCurrentPath = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="lg:block">
 
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-22 left-4 z-50 bg-[#0A1A4A] text-white p-2 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>


      <div
        className={`fixed inset-0 bg-black/50 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />


      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0A1A4A] z-40 transform transition-transform duration-300 ease-in-out border-r-4 border-black ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:relative lg:transform-none`}
      >
        <nav className="flex-1 px-4 py-6 lg:py-18 pt-30 lg:pt-18">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isCurrentPath(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#1E40AF] text-white'
                        : 'text-white/80 hover:bg-[#1E40AF]/50 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 pb-6">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-[#1E40AF]/50 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
