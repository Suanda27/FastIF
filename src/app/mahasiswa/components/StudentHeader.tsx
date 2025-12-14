'use client';

import { Bell, CheckCircle, XCircle, Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  time: string;
}

export default function StudentHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [floatingNotifs, setFloatingNotifs] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  const prevCountRef = useRef(0);
  const bellRef = useRef<HTMLDivElement | null>(null);

  const [dropStyle, setDropStyle] = useState<{
    left: number;
    top: number;
    width?: number;
  } | null>(null);

  const DROPDOWN_WIDTH = 320;

  /* animasi header */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleDropdown = () => setIsOpen((p) => !p);

  /* posisi dropdown */
  useEffect(() => {
    function updatePos() {
      const el = bellRef.current;
      if (!el) return setDropStyle(null);

      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;

      const left = Math.min(
        Math.max(8, rect.right - DROPDOWN_WIDTH),
        vw - DROPDOWN_WIDTH - 8
      );
      const top = rect.bottom + 8;

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

  /* floating notif (optional) */
  const showFloatingNotif = (notif: Notification) => {
    const id = Date.now();
    setFloatingNotifs((prev) => [...prev, { ...notif, _floatId: id }]);

    setTimeout(() => {
      setFloatingNotifs((prev) => prev.filter((n) => n._floatId !== id));
    }, 3000);
  };

  /* ambil user login dari session */
  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch('http://localhost:8001/api/me', {
          credentials: 'include',
        });
        const json = await res.json();

        if (json.success) {
          setUserId(json.user.id_user);
        }
      } catch (err) {
        console.error('Gagal ambil user login', err);
      }
    }

    fetchMe();
  }, []);

  /* ambil notifikasi */
  useEffect(() => {
    if (!userId) return;

    async function fetchNotifikasi() {
      try {
        const res = await fetch(
          `http://localhost:8001/api/notifikasi/${userId}`,
          { credentials: 'include' }
        );
        const json = await res.json();

        if (json.success) {
          const mapped: Notification[] = json.data.map((n: any) => ({
            id: n.id,
            message: n.message,
            type: n.type,
            time: dayjs(n.time).fromNow(),
          }));

          if (mapped.length > prevCountRef.current) {
            mapped
              .slice(0, mapped.length - prevCountRef.current)
              .forEach(showFloatingNotif);
          }

          prevCountRef.current = mapped.length;
          setNotifications(mapped);
        }
      } catch (err) {
        console.error('Gagal ambil notifikasi', err);
      }
    }

    fetchNotifikasi();
  }, [userId]);

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
                onClick={toggleDropdown}
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
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* DROPDOWN NOTIFIKASI */}
      <AnimatePresence>
        {isOpen && dropStyle && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            style={dropStyle}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-blue-50">
              <span className="text-sm font-semibold text-gray-700">Notifikasi</span>
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Bersihkan
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-sm text-gray-500 text-center">
                  Tidak ada notifikasi
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 flex gap-3 items-start border-b border-gray-100 last:border-b-0 hover:bg-gray-100 transition-all duration-200"
                  >
                    {getIcon(n.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {n.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {n.time}
                        </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
