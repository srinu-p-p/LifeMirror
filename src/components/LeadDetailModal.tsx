import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lead } from '../types';
import {
  X,
  Phone,
  Shield,
  Film,
  Send,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  MapPin,
  FileText,
  UserCheck,
  Lock,
  Unlock,
} from 'lucide-react';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
  const {
    getVideoForCategory,
    setPreviewVideo,
    setSelectedLeadForOutreach,
    setCurrentView,
    launchUserExperience,
  } = useApp();
  const [showRawPhone, setShowRawPhone] = useState(false);

  if (!lead) return null;

  const matchedVideo = getVideoForCategory(lead.addictionCategory);
  const isEligible = lead.consent === 'Opted In' || lead.consent === 'Partner Referral';

  const handleStartOutreach = () => {
    setSelectedLeadForOutreach(lead);
    onClose();
    setCurrentView('outreach');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        id="lead-detail-modal"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-sm">
              {lead.id.split('-')[1]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100">{lead.id}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    lead.risk === 'High'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : lead.risk === 'Moderate'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  Priority: {lead.risk}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Source: {lead.referralSource} • {lead.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-6 max-h-[75vh] overflow-y-auto pr-1">
          {/* Identity & Consent Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Phone Number
              </span>
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono font-semibold text-slate-200">
                  {showRawPhone ? lead.rawPhone : lead.phone}
                </p>
                <button
                  onClick={() => setShowRawPhone(!showRawPhone)}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-mono"
                  title="Toggle mask"
                >
                  {showRawPhone ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>{showRawPhone ? 'Mask' : 'Reveal'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Addiction Category
              </span>
              <p className="text-sm font-semibold text-purple-300">{lead.addictionCategory}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Consent / Outreach Status
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                    isEligible
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  <UserCheck className="w-3 h-3" />
                  {lead.consent}
                </span>
                {!isEligible && (
                  <span className="text-[11px] text-rose-400 font-medium">
                    (Outreach Ineligible)
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Location & Context
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{lead.location}</span>
              </div>
            </div>
          </div>

          {/* SECTION: MATCHED EXPERIENCE */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-950/70 to-indigo-950/40 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                  MATCHED EXPERIENCE (Automatic Logic)
                </h4>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Category: {lead.addictionCategory}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-3.5 rounded-lg border border-slate-800">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-100">"{matchedVideo.title}"</p>
                <p className="text-xs text-slate-400 font-mono">
                  Video Asset: <span className="text-slate-200">{matchedVideo.filename}</span> • Duration: {matchedVideo.duration}
                </p>
              </div>
              <button
                id="btn-preview-matched-video"
                onClick={() => setPreviewVideo(matchedVideo)}
                className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-medium border border-slate-700 transition-colors shrink-0"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Preview Video</span>
              </button>
            </div>
          </div>

          {/* SECTION: OUTREACH & USER RESPONSE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Outreach Status */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                OUTREACH PIPELINE
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">WhatsApp Status:</span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold ${
                    lead.whatsappStatus === 'Delivered'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : lead.whatsappStatus === 'Sent'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {lead.whatsappStatus}
                </span>
              </div>

              <button
                id="btn-send-whatsapp-lead"
                disabled={!isEligible}
                onClick={handleStartOutreach}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                  isEligible
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lead.whatsappStatus === 'Delivered' ? 'Resend WhatsApp Video' : 'Send WhatsApp Video'}</span>
              </button>
            </div>

            {/* User Response Status */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                USER ENGAGEMENT & RESPONSE
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Video Viewed:</span>
                  <span
                    className={`font-semibold ${
                      lead.videoStatus === 'Viewed' ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {lead.videoStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Help Request:</span>
                  <span
                    className={`font-semibold ${
                      lead.registrationStatus === 'Help Requested' ||
                      lead.registrationStatus === 'Registered'
                        ? 'text-purple-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {lead.registrationStatus === 'Help Requested' ||
                    lead.registrationStatus === 'Registered'
                      ? 'Yes'
                      : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Registration:</span>
                  <span
                    className={`font-semibold ${
                      lead.registrationStatus === 'Registered'
                        ? 'text-emerald-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {lead.registrationStatus === 'Registered' ? 'Registered' : 'No'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  launchUserExperience(lead.addictionCategory, lead);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-purple-400" />
                <span>Simulate Recipient Experience</span>
              </button>
            </div>
          </div>

          {/* Notes */}
          {lead.notes && (
            <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                <FileText className="w-3.5 h-3.5" />
                <span>Clinical / Referral Screening Notes:</span>
              </div>
              <p className="text-slate-300 pl-5">{lead.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
