"use client";

import React from "react";

export default function ModalShell({
  children,
  onClose,
  closing,
  wide = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  closing?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-300 ${
        closing
          ? "opacity-0 backdrop-blur-none bg-black/0 pointer-events-none"
          : "opacity-100 backdrop-blur-[8px] bg-black/50 pointer-events-auto"
      }`}
    >
      <div className="absolute inset-0" onClick={onClose}></div>

      <div
        className={`relative bg-white rounded-xl shadow-2xl p-6 transform transition-all duration-250 ${
          wide ? "w-[95%] max-w-6xl" : "w-[90%] max-w-md"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
