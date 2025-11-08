"use client";

import { Search, Bell, CheckCircle, XCircle, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Surat baru telah dibuat",
      type: "info",
      time: "2 menit lalu",
    },
    {
      id: 2,
      message: "Surat Anda ditolak",
      type: "error",
      time: "10 menit lalu",
    },
    {
      id: 3,
      message: "Surat masuk dari Dinas Pendidikan",
      type: "success",
      time: "1 jam lalu",
    },
  ]);
  const [floatingNotifs, setFloatingNotifs] = useState<any[]>([]); // notifikasi ngambang

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const clearNotifications = () => setNotifications([]);

  // Fungsi untuk menampilkan notifikasi ngambang
  const showFloatingNotif = (notif: any) => {
    const id = Date.now();
    setFloatingNotifs((prev) => [...prev, { id, ...notif }]);

    // Hilangkan otomatis setelah 3 detik
    setTimeout(() => {
      setFloatingNotifs((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  // Simulasi notifikasi baru setiap 10 detik
  useEffect(() => {
    const simulate = setInterval(() => {
      const newNotif = {
        message: "Surat baru diterima!",
        type: "success",
      };
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: newNotif.message,
          type: newNotif.type,
          time: "Baru saja",
        },
        ...prev,
      ]);
      showFloatingNotif(newNotif);
    }, 10000);

    return () => clearInterval(simulate);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={18} />;
      case "error":
        return <XCircle className="text-red-500" size={18} />;
      default:
        return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <>
      {/* === HEADER === */}
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-16 fixed top-0 left-0 right-0 z-30 flex items-center justify-between
            bg-gradient-to-r from-[#0A1A55] via-[#1B4DE3] to-[#318FEB]
            backdrop-blur-md shadow-md border-b border-white/10 px-4 md:px-6 pl-16 md:pl-60"
          >
            {/* === Search Box === */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Cari Surat..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/95 text-sm text-gray-700
                  placeholder-gray-400 shadow-sm focus:shadow-md focus:ring-2 focus:ring-[#1B4DE3]/40
                  focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* === Bell Icon === */}
            <div className="relative flex items-center ml-3 text-white">
              <div
                className="relative group cursor-pointer"
                onClick={toggleDropdown}
              >
                <Bell
                  size={22}
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    isOpen ? "text-yellow-300" : "text-white"
                  }`}
                />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] rounded-full px-1.5 text-white shadow-sm">
                    {notifications.length}
                  </span>
                )}
              </div>

              {/* === Dropdown Notifikasi === */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-8 mt-2 w-72 bg-white/95 backdrop-blur-md text-gray-800 rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-blue-50">
                      <p className="text-sm font-semibold text-gray-700">
                        Notifikasi
                      </p>
                      <button
                        onClick={clearNotifications}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Hapus semua
                      </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-3 text-center text-sm text-gray-500">
                          Tidak ada notifikasi.
                        </p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="px-4 py-2 hover:bg-gray-100 transition-all duration-200 flex gap-2 items-start"
                          >
                            {getIcon(notif.type)}
                            <div>
                              <p className="text-sm font-medium">
                                {notif.message}
                              </p>
                              <p className="text-xs text-gray-500">
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

      {/* === FLOATING NOTIFICATIONS === */}
      <div className="fixed top-20 right-5 z-[9999] space-y-2">
        <AnimatePresence>
          {floatingNotifs.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg backdrop-blur-md 
              border text-sm font-medium text-white
              ${
                notif.type === "success"
                  ? "bg-green-600/90"
                  : notif.type === "error"
                  ? "bg-red-600/90"
                  : "bg-blue-600/90"
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
