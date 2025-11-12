'use client';

import { Bell, CheckCircle, XCircle, Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  time: string;
}

export default function StudentHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: 'Surat Izin Kehadiran telah diterima',
      type: 'success',
      time: 'Baru saja',
    },
    {
      id: 2,
      message: 'Surat Survei ditangguhkan',
      type: 'info',
      time: '5 menit lalu',
    },
    {
      id: 3,
      message: 'Surat Izin Pengantar ditolak',
      type: 'error',
      time: '1 jam lalu',
    },
  ]);
  const [floatingNotifs, setFloatingNotifs] = useState<any[]>([]);

  const bellRef = useRef<HTMLDivElement | null>(null);
  const [dropStyle, setDropStyle] = useState<{ left: number; top: number; width?: number } | null>(null);
  const DROPDOWN_WIDTH = 320; // sesuai w-80

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function updatePos() {
      const el = bellRef.current;
      if (!el) return setDropStyle(null);
      const rect = el.getBoundingClientRect();
      // posisi dropdown agar menempel ke kanan ikon, tetap di dalam viewport
      const vw = window.innerWidth;
      const left = Math.min(Math.max(8, rect.right - DROPDOWN_WIDTH), vw - DROPDOWN_WIDTH - 8);
      const top = rect.bottom + 8; // 8px gap
      setDropStyle({ left, top, width: DROPDOWN_WIDTH });
    }

    if (isOpen) {
      updatePos();
      window.addEventListener('resize', updatePos);
      window.addEventListener('scroll', updatePos, true);
    }
    return () => {
      window.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [isOpen]);

  const clearNotifications = () => setNotifications([]);

  const showFloatingNotif = (notif: any) => {
    const id = Date.now();
    setFloatingNotifs((prev) => [...prev, { id, ...notif }]);

    setTimeout(() => {
      setFloatingNotifs((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  useEffect(() => {
    const simulate = setInterval(() => {
      const newNotif = {
        message: 'Surat baru diterima!',
        type: 'success' as const,
      };
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: newNotif.message,
          type: newNotif.type,
          time: 'Baru saja',
        },
        ...prev,
      ]);
      showFloatingNotif(newNotif);
    }, 10000);

    return () => clearInterval(simulate);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'error':
        return <XCircle className="text-red-500" size={18} />;
      default:
        return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-16 flex items-center justify-end
            bg-white border-b border-gray-200
            px-4 md:px-8 py-4"
          >
            <div className="relative flex items-center text-gray-800">
              <div
                ref={bellRef}
                className="relative group cursor-pointer"
                onClick={() => {
                  toggleDropdown();
                  // posisi langsung di-update saat klik (in case speed)
                  const el = bellRef.current;
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    const vw = window.innerWidth;
                    const left = Math.min(Math.max(8, rect.right - DROPDOWN_WIDTH), vw - DROPDOWN_WIDTH - 8);
                    const top = rect.bottom + 8;
                    setDropStyle({ left, top, width: DROPDOWN_WIDTH });
                  }
                }}
              >
                <Bell
                  size={24}
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    isOpen ? 'text-[#0A1A4A]' : 'text-gray-700'
                  }`}
                />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-[10px] rounded-full px-1.5 text-white shadow-sm font-bold">
                    {notifications.length}
                  </span>
                )}
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="bg-white/95 backdrop-blur-md text-gray-800 rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                    style={
                      dropStyle
                        ? {
                            position: 'fixed',
                            left: dropStyle.left,
                            top: dropStyle.top,
                            width: dropStyle.width,
                          }
                        : { position: 'fixed', right: 16, top: 64, width: DROPDOWN_WIDTH }
                    }
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-blue-50">
                      <p className="text-sm font-semibold text-gray-700">
                        Notifikasi
                      </p>
                      {notifications.length > 0 && (
                        <button
                          onClick={clearNotifications}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Hapus semua
                        </button>
                      )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-4 text-center text-sm text-gray-500">
                          Tidak ada notifikasi.
                        </p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="px-4 py-3 hover:bg-gray-100 transition-all duration-200 flex gap-3 items-start border-b border-gray-100 last:border-b-0"
                          >
                            {getIcon(notif.type)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notif.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* floating notifications (keadaan tetap fixed) */}
      <div className="fixed top-20 right-5 z-[9999] space-y-2">
        <AnimatePresence>
          {floatingNotifs.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-md
              border text-sm font-medium text-white
              ${
                notif.type === 'success'
                  ? 'bg-green-600/90'
                  : notif.type === 'error'
                  ? 'bg-red-600/90'
                  : 'bg-blue-600/90'
              }
              `}
            >
              {getIcon(notif.type)}
              <span>{notif.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
