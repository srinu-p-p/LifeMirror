import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Eye,
  Send,
  HeartHandshake,
  ShieldCheck,
  Zap,
  Users,
  Film,
  Sparkles,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { kpiStats, leads, registrations } = useApp();

  const categoryPerformance = [
    { name: 'Online Betting', sent: 48, viewed: 39, rate: '81.2%', help: 11, reg: 6, color: 'bg-emerald-500' },
    { name: 'Alcohol', sent: 55, viewed: 38, rate: '69.1%', help: 10, reg: 5, color: 'bg-amber-500' },
    { name: 'Smartphone', sent: 50, viewed: 34, rate: '68.0%', help: 7, reg: 3, color: 'bg-cyan-500' },
    { name: 'Smoking', sent: 38, viewed: 21, rate: '55.2%', help: 5, reg: 2, color: 'bg-rose-500' },
    { name: 'Gaming', sent: 15, viewed: 9, rate: '60.0%', help: 3, reg: 1, color: 'bg-indigo-500' },
    { name: 'Other', sent: 8, viewed: 1, rate: '12.5%', help: 1, reg: 1, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Outreach Intelligence & Behavioral Impact</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Analytics & Campaign Performance</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Detailed metrics tracking delivery rates, recipient viewing engagement, and post-reflection help-seeking conversion.
        </p>
      </div>

      {/* Top Conversion Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">WhatsApp Delivery Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">92.5%</span>
            <span className="text-xs text-slate-500">198 / 214 sent</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="w-[92.5%] h-full bg-emerald-400 rounded-full"></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Recipient Video Watch Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-purple-400">71.7%</span>
            <span className="text-xs text-slate-500">142 / 198 delivered</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="w-[71.7%] h-full bg-purple-400 rounded-full"></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Post-Reflection Help Intent</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-pink-400">26.1%</span>
            <span className="text-xs text-slate-500">37 / 142 viewers</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="w-[26.1%] h-full bg-pink-400 rounded-full"></div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Completed Intake Registration</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-teal-400">48.6%</span>
            <span className="text-xs text-slate-500">18 / 37 requests</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="w-[48.6%] h-full bg-teal-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-base font-bold text-white">Category Performance & Engagement Matrix</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Comparison of future simulation impact across specific addiction categories
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">WhatsApp Sent</th>
                <th className="py-3 px-4">Video Viewed</th>
                <th className="py-3 px-4">Viewing Rate</th>
                <th className="py-3 px-4">Help Requests</th>
                <th className="py-3 px-4">Rehab Registrations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {categoryPerformance.map((cat) => (
                <tr key={cat.name} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></span>
                    <span>{cat.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{cat.sent}</td>
                  <td className="py-3.5 px-4 font-mono text-purple-300">{cat.viewed}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{cat.rate}</td>
                  <td className="py-3.5 px-4 font-mono text-pink-300">{cat.help}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-teal-300">{cat.reg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ethical Compliance Scorecard */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900 to-indigo-950/30 border border-purple-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Privacy & Outreach Compliance Scorecard
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
            100% Audit Pass
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Consent Filtering</span>
            <p className="text-emerald-400 font-semibold">100% Opted In Enforced</p>
            <p className="text-[10px] text-slate-500">Unconsented leads blocked from dispatch pipeline.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Phone Masking Policy</span>
            <p className="text-purple-300 font-semibold">Active in All Displays</p>
            <p className="text-[10px] text-slate-500">Strict PII protection for addiction registries.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Voluntary Experience</span>
            <p className="text-cyan-300 font-semibold">Self-Selected Registration</p>
            <p className="text-[10px] text-slate-500">No medical diagnosis or forced enrollment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
