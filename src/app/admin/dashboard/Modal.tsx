"use client";

import React, { useState } from "react";

interface LoginModalProps {
  adminToken: string;
  onSaveToken: (token: string) => void;
  onClose: () => void;
}

export default function LoginModal({ adminToken, onSaveToken, onClose }: LoginModalProps) {
  const [tempToken, setTempToken] = useState<string>("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempToken.trim()) {
      onSaveToken(tempToken.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-8 shadow-2xl shadow-black/50">
        <div className="mb-6 text-center">
          <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-100">Elevated Authorization Required</h3>
          <p className="text-sm text-slate-400 mt-1">
            Please insert your administrative runtime security access code string key vector.
          </p>
        </div>
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 tracking-wider mb-2 font-mono uppercase">
              ADMIN_KEY
            </label>
            <input
              type="password"
              value={tempToken}
              onChange={(e) => setTempToken(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-100 placeholder-slate-700 transition"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            {adminToken && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 font-medium text-sm transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-emerald-600 text-white font-medium text-sm rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/20"
            >
              Save Access Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}