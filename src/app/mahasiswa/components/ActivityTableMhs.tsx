"use client";

import { Fragment } from "react";
import { motion, Variants } from "framer-motion";

interface Activity {
  date: string;
  type: string;
  status: "Selesai" | "Ditangguhkan";
}

interface ActivityTableProps {
  activities: Activity[];
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
};

const badgeVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
};

export default function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="bg-white rounded-xl shadow-md overflow-hidden"
      aria-labelledby="activity-title"
    >
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 id="activity-title" className="text-xl font-bold text-gray-900">
          Aktivitas Terakhir
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tanggal</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Jenis Surat</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>

          <motion.tbody className="divide-y divide-gray-200" role="list">
            {activities.length === 0 ? (
              <motion.tr
                variants={rowVariants}
                className="bg-white"
              >
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  Belum ada aktivitas
                </td>
              </motion.tr>
            ) : (
              activities.map((activity, index) => (
                <motion.tr
                  key={activity.date + activity.type + index}
                  variants={rowVariants}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="hover:bg-gray-50"
                  role="listitem"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{activity.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{activity.type}</td>
                  <td className="px-6 py-4">
                    <motion.span
                      variants={badgeVariants}
                      className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${
                        activity.status === "Selesai"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                      aria-label={`Status: ${activity.status}`}
                    >
                      {activity.status}
                    </motion.span>
                  </td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </div>
    </motion.section>
  );
}
