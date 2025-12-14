"use client";

import { Search, Bell, CheckCircle, XCircle, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type NotifType = "info" | "success" | "error";

interface Notification {
  id: number;
  message: string;
  type: NotifType;
  time: string;
}

export default function AdminHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastCount, setLastCount] = useState(0);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [floatingNotifs, setFloatingNotifs] = useState<any[]>([]);

  // === header animation ===
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();
  const toggleDropdown = () => setIsOpen(!isOpen);
  const clearNotifications = () => setNotifications([]);

  const handleClickNotif = () => {
  setIsOpen(false); // tutup dropdown
  router.push("/admin/verifikasi");
  };

  // === floating notif ===
  const showFloatingNotif = (notif: {
    message: string;
    type: NotifType;
  }) => {
    const id = Date.now();
    setFloatingNotifs((prev) => [...prev, { id, ...notif }]);

    setTimeout(() => {
      setFloatingNotifs((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  // === FETCH NOTIFIKASI (LOGIC BARU, UI TETAP) ===
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/verifikasi", {
          credentials: "include",
        });

        if (!res.ok) return;

        const result = await res.json();

        const suratList = Array.isArray(result.data)
          ? result.data
          : [];

        // 🔑 FORMAT DISESUAIKAN DENGAN UI LAMA
        const mappedNotifications: Notification[] = suratList.map(
          (surat: any) => ({
            id: surat.id_surat,
            message: `Surat baru dari ${surat.nama_mahasiswa || "Mahasiswa"}`,
            type: "info",
            time: "Baru masuk",
          })
        );

        setNotifications(mappedNotifications);

        // 🔔 floating hanya jika ada penambahan
        if (suratList.length > lastCount) {
          showFloatingNotif({
            message: "Surat baru menunggu verifikasi",
            type: "info",
          });
        }

        setLastCount(suratList.length);
      } catch (err) {
        console.error("Gagal ambil notifikasi:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [lastCount]);

  const getIcon = (type: NotifType) => {
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
            {/* === Search === */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari Surat..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/95 text-sm text-gray-700
                  placeholder-gray-400 shadow-sm focus:shadow-md focus:ring-2 focus:ring-[#1B4DE3]/40
                  focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* === Bell === */}
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

              {/* === Dropdown === */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-8 mt-2 w-72 bg-white/95 backdrop-blur-md
                    text-gray-800 rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-3 py-2 border-b bg-blue-50">
                      <p className="text-sm font-semibold">Notifikasi</p>
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
                            onClick={handleClickNotif}
                             className="px-4 py-2 hover:bg-gray-100 transition flex gap-2 items-start cursor-pointer"
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

      {/* === FLOATING === */}
      <div className="fixed top-20 right-5 z-[9999] space-y-2">
        <AnimatePresence>
          {floatingNotifs.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg
              text-sm font-medium text-white
              ${
                notif.type === "success"
                  ? "bg-green-600/90"
                  : notif.type === "error"
                  ? "bg-red-600/90"
                  : "bg-blue-600/90"
              }`}
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
