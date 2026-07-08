"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { usePathname } from "next/navigation";

// The object layout from the top of your file
const content = {
  id: "sections",
  label: "Signs ",
dynamicLabel: (path: string) => {
  const match = path.match(/\/signs\/(\d+)/);
  return `Scanned Sign ${match ? match[1] : "unknown"}`;
},
  description: "Tailgate signs. Our hope is that someone like you would scan a sign and find the gospel.",
  icon: { displayName: "LayoutGrid" },
};

interface QRCodeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeSuccessModal({ isOpen, onClose }: QRCodeSuccessModalProps) {
  const pathname = usePathname()
  // Shoot glorious confetti when the modal opens
  useEffect(() => {
    if (isOpen) {
      // First burst (center)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#22c55e", "#eab308", "#ec4899", "#a855f7"],
      });

      // Side bursts for extra hype
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
      }, 150);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.35 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
          >
            {/* Decorative top glowing badge */}
            <div className="absolute top-0 left-1/2 h-2 w-32 -translate-x-1/2 rounded-b-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 shadow-[0_4px_20px_rgba(16,185,129,0.4)]" />

            {/* Giant Success Icon Badge */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-400 ring-8 ring-emerald-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10 animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>

            {/* Main Celebration Heading */}
            <h2 className="bg-gradient-to-r from-slate-900 via-emerald-600 to-slate-900 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-emerald-400 dark:to-white">
              Thanks for scanning the QR code!
            </h2>

            <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Successfully Verified
            </p>

            {/* Dynamic Content Display Card */}
            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left border border-slate-100 dark:bg-slate-800/50 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              
              </div>
              <h3 className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="text-emerald-500"></span> {content.dynamicLabel(pathname)}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {content.description}
              </p>
            </div>

            {/* Let's Go Button */}
            <button
              onClick={onClose}
              className="group mt-8 w-full rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 font-semibold text-white shadow-xl transition-all hover:opacity-95 hover:shadow-slate-900/20 active:scale-[0.98] dark:from-emerald-500 dark:to-teal-600 dark:shadow-emerald-950/30"
            >
              <span className="flex items-center justify-center gap-2 transition-transform group-hover:scale-105">
                Continue
              </span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}