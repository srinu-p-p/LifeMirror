import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Lead, AddictionCategory } from '../types';
import {
  Send,
  Sparkles,
  CheckCircle2,
  Film,
  Search,
  Check,
  AlertCircle,
  Play,
  Eye,
  ShieldCheck,
  Smartphone as PhoneIcon,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Info,
  RotateCcw,
  X,
  Zap,
  Phone,
} from 'lucide-react';

export const WhatsAppOutreachView: React.FC = () => {
  const {
    leads,
    getVideoForCategory,
    selectedLeadForOutreach,
    setSelectedLeadForOutreach,
    sendWhatsAppOutreach,
    launchUserExperience,
    kpiStats,
    setPreviewVideo,
    setIsDirectDispatchModalOpen,
  } = useApp();

  // Eligible leads list (Opted In or Partner Referral)
  const eligibleLeads = useMemo(
    () => leads.filter((l) => l.consent === 'Opted In' || l.consent === 'Partner Referral'),
    [leads]
  );

  // Active selected lead (default to LM-004 Betting lead if available, or first eligible)
  const [activeLead, setActiveLead] = useState<Lead>(() => {
    if (selectedLeadForOutreach) return selectedLeadForOutreach;
    const defaultLead = eligibleLeads.find((l) => l.id === 'LM-004') || eligibleLeads[0];
    return defaultLead;
  });

  // Keep activeLead in sync if context changes
  useEffect(() => {
    if (selectedLeadForOutreach) {
      setActiveLead(selectedLeadForOutreach);
    }
  }, [selectedLeadForOutreach]);

  // Recipient search & category filter
  const [recipientSearch, setRecipientSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [recipientMode, setRecipientMode] = useState<'individual' | 'batch' | 'custom'>('individual');

  // Custom number manual entry state
  const [customPhone, setCustomPhone] = useState('+91 9014848294');
  const [customCategory, setCustomCategory] = useState<AddictionCategory>('Online Betting');

  // Confirmation Modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Message composer text matching user requested prompt
  const defaultMessageBody = `Every habit has a story. And every story can have a different next chapter.\n\n🎥 Watch this short video:\n[WATCH YOUR REFLECTION VIDEO]\n\nIf you feel that a habit is starting to control your time, money, health, or relationships, you don't have to deal with it alone.\n\n🏥 Please register — tap "Register / Find Nearest Rehab" to find accredited de-addiction centers and medical counselors near you.\n\n— LifeMirror Healthcare Outreach (+91 9014848294)`;

  const [messageText, setMessageText] = useState<string>(defaultMessageBody);

  // Matched video for currently active lead
  const matchedVideo = useMemo(() => {
    if (recipientMode === 'custom') {
      return getVideoForCategory(customCategory);
    }
    if (!activeLead) return getVideoForCategory('Online Betting');
    return getVideoForCategory(activeLead.addictionCategory);
  }, [activeLead, recipientMode, customCategory, getVideoForCategory]);

  // Filtered eligible list
  const filteredRecipients = useMemo(() => {
    return eligibleLeads.filter((lead) => {
      if (categoryFilter !== 'all' && lead.addictionCategory !== categoryFilter) return false;
      if (recipientSearch) {
        const query = recipientSearch.toLowerCase();
        const matchesId = lead.id.toLowerCase().includes(query);
        const matchesPhone = lead.phone.includes(query) || lead.rawPhone.includes(query);
        const matchesCat = lead.addictionCategory.toLowerCase().includes(query);
        if (!matchesId && !matchesPhone && !matchesCat) return false;
      }
      return true;
    });
  }, [eligibleLeads, categoryFilter, recipientSearch]);

  const handleSelectRecipient = (lead: Lead) => {
    setActiveLead(lead);
    setSelectedLeadForOutreach(lead);
  };

  const handleInitiateSend = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSendDemo = async () => {
    setIsConfirmModalOpen(false);
    if (activeLead) {
      await sendWhatsAppOutreach(activeLead.id, messageText);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Send className="w-3.5 h-3.5" />
            <span>Interactive Outreach Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">WhatsApp Outreach</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Send the right awareness experience to the right eligible user.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-trigger-judge-dispatcher"
            onClick={() => setIsDirectDispatchModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 transition-all border border-purple-400/40 hover:scale-[1.02]"
          >
            <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>⚡ Hit Specific Number (Judge Demo)</span>
          </button>

          <button
            onClick={() => {
              const nextUnsent = eligibleLeads.find((l) => l.whatsappStatus === 'Not Sent');
              if (nextUnsent) handleSelectRecipient(nextUnsent);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>+ Next Unsent Lead</span>
          </button>
        </div>
      </div>

      {/* Metrics Row requested in Section 11 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Eligible Contacts</span>
          <p className="text-xl font-bold font-mono text-emerald-400">{kpiStats.eligibleLeads}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Ready to Send</span>
          <p className="text-xl font-bold font-mono text-purple-400">172</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Sent</span>
          <p className="text-xl font-bold font-mono text-cyan-400">{kpiStats.messagesSent}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Delivered</span>
          <p className="text-xl font-bold font-mono text-teal-400">{kpiStats.messagesDelivered}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Viewed</span>
          <p className="text-xl font-bold font-mono text-amber-400">{kpiStats.videosViewed}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Help Requests</span>
          <p className="text-xl font-bold font-mono text-pink-400">{kpiStats.helpRequests}</p>
        </div>
      </div>

      {/* Main Composer & Phone Preview Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recipient Selection & Message Composer (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Select Recipient */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold font-mono">
                  1
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Select Recipient & Verify Eligibility
                </h3>
              </div>
              <div className="flex items-center gap-1 text-[11px] bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setRecipientMode('individual')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    recipientMode === 'individual'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Individual Lead
                </button>
                <button
                  onClick={() => setRecipientMode('batch')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    recipientMode === 'batch'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Filter Category
                </button>
                <button
                  id="btn-tab-custom-number-mode"
                  onClick={() => setRecipientMode('custom')}
                  className={`px-2.5 py-1 rounded font-bold transition-colors flex items-center gap-1 ${
                    recipientMode === 'custom'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-emerald-400 hover:text-emerald-300'
                  }`}
                >
                  <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                  <span>Custom Number (Demo)</span>
                </button>
              </div>
            </div>

            {/* If Custom Number Mode is Active */}
            {recipientMode === 'custom' ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Direct Number & Video Pairing</span>
                  </span>
                  <button
                    onClick={() => setIsDirectDispatchModalOpen(true)}
                    className="text-xs text-purple-300 hover:text-purple-100 flex items-center gap-1 underline font-semibold"
                  >
                    Open Full Direct Dispatcher Modal →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Target Phone Number</label>
                    <input
                      type="text"
                      value={customPhone}
                      onChange={(e) => setCustomPhone(e.target.value)}
                      placeholder="+91 90148 48294"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Target Addiction Category</label>
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value as AddictionCategory)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                    >
                      <option value="Online Betting">Online Betting (betting.mp4)</option>
                      <option value="Alcohol">Alcohol (alcohol.mp4)</option>
                      <option value="Smoking">Smoking (smoking.mp4)</option>
                      <option value="Smartphone">Smartphone (smartphone.mp4)</option>
                      <option value="Gaming">Gaming (gaming.mp4)</option>
                      <option value="Other">Other (other.mp4)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-800">
                  <span>Matched Video: <strong className="text-purple-300">{matchedVideo.title}</strong> ({matchedVideo.filename})</span>
                  <button
                    onClick={() => setIsDirectDispatchModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow"
                  >
                    <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                    <span>Hit This Number</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Recipient Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search eligible phone or Lead ID..."
                      value={recipientSearch}
                      onChange={(e) => setRecipientSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
                  >
                    <option value="all">All Addiction Categories</option>
                    <option value="Online Betting">Online Betting</option>
                    <option value="Alcohol">Alcohol</option>
                    <option value="Smoking">Smoking</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Quick Eligible List Scroll */}
                <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                  {filteredRecipients.map((lead) => {
                    const isSelected = activeLead?.id === lead.id;
                    return (
                      <button
                        key={lead.id}
                        id={`select-lead-${lead.id}`}
                        onClick={() => handleSelectRecipient(lead)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all text-left ${
                          isSelected
                            ? 'bg-purple-950/50 border border-purple-500/50 text-white shadow-md'
                            : 'bg-slate-950/60 border border-slate-800/80 hover:bg-slate-800/50 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-purple-400 font-semibold">{lead.id}</span>
                          <span className="font-mono text-slate-200">{lead.phone}</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                            {lead.addictionCategory}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              lead.whatsappStatus === 'Delivered'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : lead.whatsappStatus === 'Sent'
                                ? 'bg-cyan-500/10 text-cyan-400'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {lead.whatsappStatus}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* STEP 2: Automatic Video Matching Banner */}
          {activeLead && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Automatic Video Match Result
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Category: {activeLead.addictionCategory}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-400 font-medium">Selected Addiction:</p>
                  <p className="text-sm font-bold text-white">{activeLead.addictionCategory}</p>
                  <p className="text-xs text-purple-300 font-medium mt-1">
                    Matched Video: "{matchedVideo.title}" ({matchedVideo.filename})
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewVideo(matchedVideo)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                  >
                    <Film className="w-3.5 h-3.5 text-purple-400" />
                    <span>Preview Video</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Message Composer */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  WhatsApp Interactive Message Composer
                </h3>
              </div>
              <button
                onClick={() => setMessageText(defaultMessageBody)}
                className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1"
                title="Reset to standard template"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Text</span>
              </button>
            </div>

            <div className="space-y-2">
              <textarea
                rows={9}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 font-sans leading-relaxed focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Ethical Tone Guidelines Notice (Requirement 13) */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Confidential & Neutral Tone Enforcement</span>
              </div>
              <p className="leading-relaxed">
                Messages use empathetic, forward-looking language without sensitive addiction accusations. Recipients are invited to reflect on choice and agency.
              </p>
            </div>

            {/* Send WhatsApp Video Action */}
            <div className="pt-2">
              <button
                id="btn-trigger-send-whatsapp-video"
                onClick={handleInitiateSend}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-sm font-bold shadow-xl shadow-emerald-600/25 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>Send WhatsApp Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Realistic WhatsApp Phone Preview (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-sm">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <PhoneIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Client Live Preview</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Interactive
              </span>
            </div>

            {/* Phone Frame */}
            <div className="relative rounded-[36px] bg-slate-950 p-3.5 border-4 border-slate-800 shadow-2xl overflow-hidden">
              {/* Phone Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full z-30"></div>

              {/* Screen Inner */}
              <div className="rounded-[28px] bg-[#0b141a] text-slate-100 overflow-hidden flex flex-col h-[580px] border border-slate-800 relative">
                {/* WhatsApp Chat Header */}
                <div className="bg-[#202c33] px-3.5 py-3 pt-6 flex items-center justify-between border-b border-slate-700/60 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow">
                      LM
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-white">LifeMirror</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-emerald-400/20" />
                      </div>
                      <p className="text-[10px] text-emerald-400 font-medium">● Verified Support Outreach</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages Body with WhatsApp Wallpaper */}
                <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#0b141a] bg-[radial-gradient(#1f2c34_1px,transparent_1px)] bg-[size:16px_16px]">
                  {/* Encryption Notice */}
                  <div className="mx-auto text-center max-w-[240px] px-2.5 py-1 rounded-lg bg-[#182229] border border-slate-800 text-[9px] text-[#8696a0] leading-snug">
                    🔒 Messages and calls are end-to-end encrypted. No one outside of this chat can read them.
                  </div>

                  {/* WhatsApp Received Message Bubble */}
                  <div className="max-w-[90%] bg-[#202c33] rounded-2xl rounded-tl-sm p-3.5 shadow-md border border-slate-700/40 space-y-3">
                    <p className="text-xs text-[#e9edef] whitespace-pre-line leading-relaxed">
                      {messageText.replace('[WATCH YOUR EXPERIENCE]', '').replace('[GET SUPPORT]', '')}
                    </p>

                    {/* Rich Video Card Attachment inside WhatsApp */}
                    <div className="rounded-xl overflow-hidden bg-black/80 border border-slate-700 space-y-2">
                      <div
                        className={`relative aspect-video w-full bg-gradient-to-br ${matchedVideo.thumbnailGradient} flex items-center justify-center p-3`}
                      >
                        <button
                          id="btn-phone-preview-video-play"
                          onClick={() => launchUserExperience(activeLead?.addictionCategory, activeLead)}
                          className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                        >
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </button>
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                          {matchedVideo.duration}
                        </span>
                      </div>
                      <div className="p-2.5 text-left">
                        <p className="text-xs font-bold text-white truncate">{matchedVideo.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          Simulation: {matchedVideo.filename}
                        </p>
                      </div>
                    </div>

                    {/* Interactive CTA Buttons */}
                    <div className="space-y-1.5 pt-1">
                      <button
                        id="btn-phone-watch-experience"
                        onClick={() => launchUserExperience(activeLead?.addictionCategory, activeLead)}
                        className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-colors"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>WATCH YOUR EXPERIENCE</span>
                      </button>

                      <button
                        id="btn-phone-get-support"
                        onClick={() => launchUserExperience(activeLead?.addictionCategory, activeLead)}
                        className="w-full py-2 px-3 rounded-lg bg-[#2a3942] hover:bg-[#32444f] text-[#00a884] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>GET SUPPORT</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-end gap-1 text-[9px] text-[#8696a0] pt-1">
                      <span>10:42 AM</span>
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat Footer Bar */}
                <div className="p-2 bg-[#202c33] flex items-center gap-2 border-t border-slate-700/50">
                  <div className="flex-1 bg-[#2a3942] px-3 py-1.5 rounded-full text-[11px] text-slate-400">
                    Type a message...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-400 mt-3">
              Clicking <strong className="text-emerald-400">WATCH EXPERIENCE</strong> inside the phone simulates opening the user viewport.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal (Section 15: Send WhatsApp Video) */}
      {isConfirmModalOpen && activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            id="confirm-send-modal"
            className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Send Awareness Experience?</h3>
              <button onClick={() => setIsConfirmModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Recipient:</span>
                <span className="font-mono font-bold text-slate-200">{activeLead.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="font-semibold text-purple-300">{activeLead.addictionCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Matched Video:</span>
                <span className="text-slate-200 text-right truncate max-w-[200px]">{matchedVideo.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Outreach Eligibility:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase text-[10px]">
                  {activeLead.consent}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Message Payload:</span>
                <span className="text-emerald-400 font-semibold">Ready</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              This will run the simulated WhatsApp Business Gateway, delivering the category-matched video experience to the recipient.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                id="btn-confirm-send-demo-message"
                type="button"
                onClick={handleConfirmSendDemo}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
              >
                Send Demo Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
