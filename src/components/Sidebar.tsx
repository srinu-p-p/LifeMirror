import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Grid,
  Film,
  Send,
  ClipboardList,
  BarChart3,
  GitBranch,
  Home,
  Settings,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, registrations, leads } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users, badge: leads.length },
    { id: 'categories', label: 'Addiction Categories', icon: Grid, badge: '6' },
    { id: 'videos', label: 'Video Library', icon: Film, badge: '6' },
    { id: 'outreach', label: 'WhatsApp Outreach', icon: Send, highlight: true },
    { id: 'registrations', label: 'Registrations', icon: ClipboardList, badge: registrations.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'architecture', label: 'Architecture', icon: GitBranch },
    { id: 'landing', label: 'Public Landing', icon: Home },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-950/90 border-r border-slate-800/80 flex flex-col justify-between min-h-[calc(100vh-61px)]">
      <div className="p-4 space-y-6">
        {/* Core Tagline Badge */}
        <div className="px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
          <p className="text-[11px] font-medium text-slate-400">Core Mission:</p>
          <p className="text-xs font-semibold text-purple-300 mt-0.5 leading-snug">
            "See Where Your Choices Could Lead."
          </p>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-900/50 to-indigo-950/40 text-purple-200 border border-purple-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-purple-400'
                        : item.highlight
                        ? 'text-emerald-400'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded-md ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-300 font-semibold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom of sidebar: Required "● Demo Mode" badge */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">Demo Mode</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            WhatsApp sending & video delivery are safely simulated in this prototype.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-purple-300/80 pt-1 border-t border-slate-800/40">
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            <span>Ready for WhatsApp Cloud API</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
