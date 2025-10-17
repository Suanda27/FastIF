"use client";

import React, { useRef } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { motion, Variants, useInView, useReducedMotion } from "framer-motion";

interface CardSuratProps {
  title: string;
  iconName: string; // now a string identifier
  link: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.36, ease: "backOut" } },
};

export default function CardSurat({ title, iconName, link }: CardSuratProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  // resolve icon component from lucide-react by name (string).
  // fallback to Mail if iconName not found.
  const Icon = (Icons as any)[iconName] ?? (Icons as any).Mail;

  return (
    <motion.article
      ref={ref}
      role="article"
      aria-label={title}
      initial={reduceMotion ? undefined : "hidden"}
      animate={inView || reduceMotion ? "show" : "hidden"}
      variants={cardVariants}
      whileHover={reduceMotion ? undefined : { y: -8, boxShadow: "0 20px 40px rgba(10,28,86,0.12)" }}
      whileTap={reduceMotion ? undefined : { scale: 0.995 }}
      className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center transition-shadow"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Icon container */}
      <motion.div
        variants={iconVariants}
        className="w-24 h-24 rounded-full bg-[#C5D5F7] flex items-center justify-center mb-6"
        aria-hidden
      >
        <Icon size={48} className="text-[#0A1C56]" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <motion.h3
        layout
        className="text-xl font-bold text-[#0A1C56] mb-6 text-center"
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {title}
      </motion.h3>

      {/* CTA */}
      <motion.div
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full flex justify-center"
      >
        <Link
          href={link}
          className="inline-block bg-[#0A1C56] text-white px-12 py-3 rounded-lg font-medium hover:bg-[#1976D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A1C56]"
          aria-label={`Ajukan ${title}`}
        >
          Ajukan
        </Link>
      </motion.div>
    </motion.article>
  );
}
