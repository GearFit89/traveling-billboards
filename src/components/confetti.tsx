"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { usePathname } from "next/navigation";
import { thoughtsPageContent, getQrDynamicLabel } from "@/lib/content";



export interface ThoughtsPageContent {
  badge: string;
  title: string;
  subtitle: string;
  badgeIconKey: string;
  noThoughtsMessage: string;
  thankYouMessage: string;
}



const sectionMeta = {
  id: "sections",
  label: "Signs",
  dynamicLabel: getQrDynamicLabel,
  description: thoughtsPageContent.qrModal.description,
  icon: { displayName: "LayoutGrid" },
};

interface QRCodeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeSuccessModal({ isOpen, onClose }: QRCodeSuccessModalProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      // Delay confetti slightly so framer-motion finishes its entry spring animation smoothly
      const timer = setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          disableForReducedMotion: true,
          colors: ["#3b82f6", "#22c55e", "#eab308", "#ec4899", "#a855f7"],
        });

        confetti({ 
          particleCount: 40, 
          angle: 60, 
          spread: 45, 
          origin: { x: 0 },
          disableForReducedMotion: true 
        });
        
        confetti({ 
          particleCount: 40, 
          angle: 120, 
          spread: 45, 
          origin: { x: 1 },
          disableForReducedMotion: true 
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur effect optimized with hardware acceleration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transform-gpu"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transform-gpu"
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
              {thoughtsPageContent.thankYouMessage}
            </h2>

            <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Successfully Verified
            </p>

            {/* Dynamic Content Display Card */}
            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left border border-slate-100 dark:bg-slate-800/50 dark:border-slate-800">
              <h3 className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="text-emerald-500"></span> {sectionMeta.dynamicLabel(pathname)}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {sectionMeta.description}
              </p>
            </div>

            {/* Action Button */}
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