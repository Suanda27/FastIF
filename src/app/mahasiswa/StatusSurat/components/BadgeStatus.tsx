'use client';
import { motion } from "framer-motion";
import { StatusType } from "../page";

interface BadgeStatusProps {
  status: StatusType;
}

export default function BadgeStatus({ status }: BadgeStatusProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Diproses":
        return {
          bg: "bg-blue-500",
          text: "text-white",
        };
      case "Ditangguhkan":
        return {
          bg: "bg-orange-500",
          text: "text-white",
        };
      case "Selesai":
        return {
          bg: "bg-green-500",
          text: "text-white",
        };
      default:
        return {
          bg: "bg-gray-500",
          text: "text-white",
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`${styles.bg} ${styles.text} px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium inline-block min-w-[90px] sm:min-w-[120px] text-center`}
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      {status}
    </motion.span>
  );
}
