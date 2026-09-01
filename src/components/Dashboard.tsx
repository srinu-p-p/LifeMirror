import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  CheckCircle,
  Film,
  Send,
  CheckCheck,
  Eye,
  HeartHandshake,
  ClipboardList,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  PlayCircle,
  Zap,
} from 'lucide-react';
import { AddictionCategory } from '../types';

export const Dashboard: React.FC = () => {
  const {
    kpiStats,
    setCurrentView,
    setSelectedLeadForDetail,
    setSelectedLeadForOutreach,
    leads,
    categories,
    launchUserExperience,
    setIsDirectDispatchModalOpen,
  } = useApp();

  // Primary demo lead LM-004 (Online Betting)
  const bettingDemoLead = leads.find((l) => l.id === 'LM-004') || leads[0];

  const handleStartDemoFlow = () => {
    setSelectedLeadForDetail(bettingDemoLead);
  };

  const kpis = [
    {
      id: 'kpi-total-leads',
      label: 'Total Leads',
      value: kpiStats.totalLeads,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      desc: 'Screened & referred registry',
    },
    {
      id: 'kpi-eligible',
      label: 'Eligible Leads',
      value: kpiStats.eligibleLeads,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      desc: 'Opted In + Partner Referrals',
    },
    {
      id: 'kpi-videos-ready',
      label: 'Videos Ready',
      value: kpiStats.videosReady,
      icon: Film,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      desc: '100% matched across 6 categories',
    },
    {
      id: 'kpi-sent',
      label: 'WhatsApp Sent',
      value: kpiStats.messagesSent,
      icon: Send,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      desc: 'Personalized video payloads',
    },
    {
      id: 'kpi-delivered',
      label: 'Delivered',
      value: kpiStats.messagesDelivered,
      icon: CheckCheck,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/20',
      desc: '92.5% delivery receipt rate',
    },
    {
      id: 'kpi-viewed',
      label: 'Videos Viewed',
      value: kpiStats.videosViewed,
      icon: Eye,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      desc: '71.7% recipient watch rate',
    },
    {
      id: 'kpi-help-requests',
      label: 'Help Requests',
      value: kpiStats.helpRequests,
      icon: HeartHandshake,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      desc: 'Post-reflection intent',
    },
    {
      id: 'kpi-registrations',
      label: 'Registrations',
      value: kpiStats.registrations,
      icon: ClipboardList,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      desc: 'Connected to counseling care',
    },
  ];

  const funnelSteps = [
    { name: 'Total Leads', count: kpiStats.totalLeads, pct: '100%', color: 'from-blue-500 to-indigo-500' },
    { name: 'Eligible', count: kpiStats.eligibleLeads, pct: '77.2%', color: 'from-indigo-500 to-purple-500' },
    { name: 'Contacted', count: kpiStats.messagesSent, pct: '55.4%', color: 'from-purple-500 to-pink-500' },
    { name: 'Delivered', count: kpiStats.messagesDelivered, pct: '51.3%', color: 'from-pink-500 to-rose-500' },
    { name: 'Video Viewed', count: kpiStats.videosViewed, pct: '36.8%', color: 'from-rose-500 to-amber-500' },
    { name: 'Help Requested', count: kpiStats.helpRequests, pct: '9.6%', color: 'from-amber-500 to-emerald-500' },
    { name: 'Registered', count: kpiStats.registrations, pct: '4.7%', color: 'from-emerald-500 to-teal-400' },
  ];

  const categoryDistribution: { category: AddictionCategory; count: number; video: string; color: string }[] = [
    { category: 'Alcohol', count: 110, video: 'alcohol.mp4', color: 'bg-amber-500' },
    { category: 'Smoking', count: 95, video: 'smoking.mp4', color: 'bg-rose-500' },
    { category: 'Smartphone', count: 120, video: 'smartphone.mp4', color: 'bg-cyan-500' },
    { category: 'Online Betting', count: 90, video: 'betting.mp4', color: 'bg-emerald-500' },
    { category: 'Gaming', count: 55, video: 'gaming.mp4', color: 'bg-indigo-500' },
    { category: 'Other', count: 30, video: 'other.mp4', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Hero Banner with Fast Guided Demo CTA */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Outreach & Impact Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              See Where Your Choices Could Lead.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Demonstrating the end-to-end automated addiction awareness workflow: from screened leads to category-matched personalized WhatsApp video outreach and supportive care registration.
            </p>
          </div>

          {/* Guided Demo & Judge Dispatcher Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              id="btn-dashboard-hit-custom-whatsapp"
              onClick={() => setIsDirectDispatchModalOpen(true)}
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/30 border border-emerald-400/40 transition-all duration-200 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>⚡ Hit Specific Phone Number (Judge Demo)</span>
            </button>

            <button
              id="btn-start-demo-walkthrough"
              onClick={handleStartDemoFlow}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-purple-500/40 text-purple-200 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Scenario: LM-004 Betting</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 8 KPI Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Real-Time Outreach & Impact Key Metrics
          </h2>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Mock Telemetry Active
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.id}
                id={kpi.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">{kpi.label}</span>
                  <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.border} border`}>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                    {kpi.value.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{kpi.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funnel & Category Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Outreach Conversion Funnel (7 columns on large) */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Outreach & Conversion Funnel</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                From initial consented leads to verified rehabilitation care registration
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 text-xs font-mono border border-purple-500/20">
              4.7% End-to-End
            </span>
          </div>

          {/* Funnel visual bars */}
          <div className="space-y-3.5">
            {funnelSteps.map((step, idx) => {
              const widthPct = Math.max(12, (step.count / kpiStats.totalLeads) * 100);
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-400 font-bold">
                        {idx + 1}
                      </span>
                      {step.name}
                    </span>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="font-bold text-white">{step.count}</span>
                      <span className="text-[11px] text-slate-400 w-12 text-right">({step.pct})</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${step.color} transition-all duration-500`}
                      style={{ width: `${widthPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Privacy Verified: Strict consent gate enforced before WhatsApp payload dispatch.</span>
            </span>
          </div>
        </div>

        {/* Leads by Addiction Category & Automatic Matching (5 columns) */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Leads by Addiction Category</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically matches unique awareness videos
              </p>
            </div>
            <button
              onClick={() => setCurrentView('categories')}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {categoryDistribution.map((cat, idx) => {
              const catInfo = categories.find((c) => c.category === cat.category);
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></span>
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {cat.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Matched: <span className="text-purple-300">{cat.video}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {cat.count} leads
                    </span>
                    <button
                      onClick={() => launchUserExperience(cat.category)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 transition-colors"
                      title={`Preview ${cat.category} user video`}
                    >
                      <PlayCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 space-y-1">
            <span className="font-semibold block text-purple-300">Automatic Video Matching Rule:</span>
            <p className="text-[11px] text-slate-400">
              When an eligible user is selected, the platform deterministically attaches the exact corresponding simulation video based on their intake category.
            </p>
          </div>
        </div>
      </div>

      {/* Category Engagement Matrix & Quick Lead Table Preview */}
      <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Recent Active Leads in Queue</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any lead to inspect their matched video and simulate WhatsApp dispatch
            </p>
          </div>
          <button
            onClick={() => setCurrentView('leads')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            <span>Manage All {leads.length} Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compact Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Lead ID</th>
                <th className="py-3 px-3">Masked Phone</th>
                <th className="py-3 px-3">Addiction Category</th>
                <th className="py-3 px-3">Consent</th>
                <th className="py-3 px-3">Matched Video</th>
                <th className="py-3 px-3">WhatsApp Status</th>
                <th className="py-3 px-3">Video Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-200">{lead.id}</td>
                  <td className="py-3 px-3 font-mono text-slate-300">{lead.phone}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                      {lead.addictionCategory}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                        lead.consent === 'Opted In' || lead.consent === 'Partner Referral'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {lead.consent}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                    {lead.addictionCategory.toLowerCase().replace(/\s+/g, '')}.mp4
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                        lead.whatsappStatus === 'Delivered'
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : lead.whatsappStatus === 'Sent'
                          ? 'text-cyan-400 bg-cyan-500/10'
                          : 'text-slate-500 bg-slate-800'
                      }`}
                    >
                      {lead.whatsappStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={
                        lead.videoStatus === 'Viewed'
                          ? 'text-emerald-400 font-medium'
                          : 'text-slate-500'
                      }
                    >
                      {lead.videoStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedLeadForDetail(lead)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 transition-colors font-medium text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
