"use client";

import React, { useRef } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { motion, Variants, useInView, useReducedMotion } from "framer-motion";

interface CardSuratProps {
  title: string;
  iconName: string;
  link: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const iconVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.36, ease: "backOut" } },
};

export default function CardSurat({ title, iconName, link }: CardSuratProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  const Icon = (Icons as any)[iconName] ?? (Icons as any).Mail;

  return (
    <motion.article
      ref={ref}
      role="article"
      aria-label={title}
      initial={reduceMotion ? undefined : "hidden"}
      animate={inView || reduceMotion ? "show" : "hidden"}
      variants={cardVariants}
      whileHover={reduceMotion ? undefined : { y: -6, boxShadow: "0 18px 40px rgba(10,28,86,0.10)" }}
      whileTap={reduceMotion ? undefined : { scale: 0.995 }}
      className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col justify-between transition-shadow min-h-[280px] w-full"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          variants={iconVariants}
          className="w-30 h-30 sm:w-24 sm:h-24 rounded-full bg-[#C5D5F7] flex items-center justify-center mb-4 sm:mb-6"
          aria-hidden
        >
          <Icon size={60} className="text-[#0A1C56]" strokeWidth={1.5} />
        </motion.div>

        <motion.h3
          layout
          className="text-2xl sm:text-1.5xl font-bold text-[#0A1C56] mb-4 text-center tracking-wide"
          initial={{ opacity: 0.95 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
>
          {title}
        </motion.h3>


        <p className="text-sm text-gray-500 mb-4 px-2 sm:px-6">
          {/* optional short description area if needed later */}
        </p>
      </div>

      <div className="w-full flex justify-center">
        <Link
          href={link}
          className="inline-flex items-center justify-center bg-[#0A1C56] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1976D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A1C56] w-full md:w-auto"
          aria-label={`Ajukan ${title}`}
        >
          Ajukan
        </Link>
      </div>
    </motion.article>
  );
}
