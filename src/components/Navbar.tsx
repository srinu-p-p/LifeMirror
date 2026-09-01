import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Smartphone,
  Eye,
  Shield,
  RotateCcw,
  ExternalLink,
  Activity,
  Layers,
  Zap,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    launchUserExperience,
    resetDemoData,
    kpiStats,
    setIsDirectDispatchModalOpen,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60">
      {/* Left Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-400 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-tight text-base">LifeMirror</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
                Judge Demo Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal">
              AI-Powered Addiction Awareness & Direct Outreach
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-800 text-xs text-slate-400">
          <span>Active Flow:</span>
          <span className="text-slate-200 font-medium capitalize">
            {currentView === 'outreach' ? 'WhatsApp Outreach & Video Matching' : currentView.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Prominent Judge Demo Trigger Button */}
        <button
          id="btn-nav-hit-whatsapp"
          onClick={() => setIsDirectDispatchModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 border border-emerald-400/40 transition-all hover:scale-105"
          title="Hit WhatsApp video message to any specific number"
        >
          <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          <span>⚡ Hit WhatsApp (Judge Demo)</span>
        </button>

        {/* Quick Demo Experience button */}
        <button
          id="btn-nav-experience"
          onClick={() => launchUserExperience('Online Betting')}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-purple-200 hover:text-white text-xs font-semibold shadow-md transition-all duration-200"
        >
          <Eye className="w-3.5 h-3.5 text-purple-400" />
          <span>Preview User View</span>
        </button>

        {/* Reset Demo button */}
        <button
          id="btn-nav-reset"
          onClick={resetDemoData}
          title="Reset leads and simulated events"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-slate-100 text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset</span>
        </button>

        {/* Live System indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="hidden sm:inline">API Live</span>
        </div>
      </div>
    </header>
  );
};

