"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function Header() {
  return (
    <header className="bg-[#0A1A4A] py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-fastif-white.png"
            alt="FastIF Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0A1A4A] py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-white text-sm md:text-base">
          © 2025 Fasilitas Surat Informatika. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <motion.div
      className="min-h-screen flex flex-col bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header />

      <section className="flex-1 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
          <motion.div
            className="space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1C56] leading-tight">
              FASILITAS SURAT INFORMATIKA
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Kelola pengajuan dan status surat mahasiswa dengan cepat, mudah, dan terintegrasi.
            </p>
            <Link
              href="/login"
              className="inline-block bg-[#0A1C56] hover:bg-[#00aeff] text-white font-medium px-8 py-3 rounded-lg transition-colors text-lg"
            >
              Masuk
            </Link>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Image
              src="/banner-homepage.png"
              alt="FastIF Banner"
              width={600}
              height={450}
              className="w-full h-auto max-w-lg rounded-lg"
              priority
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
