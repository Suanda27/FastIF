'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, FileText, Clock, History, User, LogOut, Menu, X } from 'lucide-react';

const menuItems = [
  { href: '/mahasiswa/DashboardMhs', label: 'Dashboard', icon: Home },
  { href: '/mahasiswa/PengajuanSurat', label: 'Pengajuan Surat', icon: FileText },
  { href: '/mahasiswa/StatusSurat', label: 'Status Surat', icon: Clock },
  { href: '/mahasiswa/RiwayatSurat', label: 'Riwayat Surat', icon: History },
  { href: '/mahasiswa/ProfileMhs', label: 'Profil', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // disable page scroll when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isCurrentPath = (href: string) => pathname === href;

  return (
    <div className="lg:block">
      {/* fixed burger / close button - keep its position but ensure z-index high */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] bg-[#0A1A4A] text-white p-2 rounded-lg shadow"
        aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* overlay - appears only on mobile and sits BETWEEN content and sidebar */}
      <div
        // overlay visible only on small devices; when isOpen true it's interactive
        className={`fixed inset-0 lg:hidden bg-black/50 transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 40 }}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* sidebar:
          - fixed on mobile (so it slides over content)
          - relative/normal flow on large screens (lg:relative) so it stays beside content
          - z-index higher than overlay so it appears on top of overlay
      */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0A1A4A] z-[50] transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:transform-none lg:shadow-none shadow-black`}
      >


        <div className="p-6 flex justify-center border-zinc-700 mb-4">
          <Image
            src="/logo-fastif-white.png"
            alt="FastIF Logo"
            width={150}
            height={60}
            className="h-12 w-auto"
          />
        </div>

        <nav className="flex-1 px-2 py-4 lg:py-12 pt-4 lg:pt-4">
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
            className="flex items-center gap-3 px-2 py-8 rounded-lg text-white/80 hover:bg-[#1E40AF]/50 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
