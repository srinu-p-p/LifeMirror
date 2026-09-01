import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Loader2, Send, ShieldAlert, Sparkles, X, Eye, ArrowRight } from 'lucide-react';

export const DemoGatewayModal: React.FC = () => {
  const {
    isSendModalOpen,
    setIsSendModalOpen,
    sendProgress,
    selectedLeadForOutreach,
    launchUserExperience,
  } = useApp();

  if (!isSendModalOpen) return null;

  const isDelivered = sendProgress.step === 'delivered';
  const isError = sendProgress.step === 'error';

  const stepsList = [
    { id: 'preparing', label: 'Preparing video asset & transcoding...' },
    { id: 'uploading', label: 'Uploading to WhatsApp Media Gateway CDN...' },
    { id: 'composing', label: 'Formatting interactive button template...' },
    { id: 'sending', label: 'Dispatching through cellular carrier network...' },
    { id: 'delivered', label: 'Delivered (Virtual double blue check)' },
  ];

  const getStepIndex = (step: string) => {
    switch (step) {
      case 'preparing':
        return 0;
      case 'uploading':
        return 1;
      case 'composing':
        return 2;
      case 'sending':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentIdx = getStepIndex(sendProgress.step);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        id="demo-gateway-modal"
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Send className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100">Demo WhatsApp Gateway</h3>
              <p className="text-xs text-slate-400 font-mono">
                Recipient: {selectedLeadForOutreach?.phone || '+91 ••••••3213'}
              </p>
            </div>
          </div>
          {isDelivered && (
            <button
              onClick={() => setIsSendModalOpen(false)}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Status indicator bar */}
        <div className="my-6 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Gateway Dispatch Progress</span>
            <span className="font-mono text-emerald-400 font-bold">{sendProgress.progressPercentage}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isDelivered
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-500 animate-pulse'
              }`}
              style={{ width: `${sendProgress.progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Steps Tracker */}
        <div className="space-y-3 mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          {stepsList.map((stepItem, idx) => {
            const isCompleted = currentIdx > idx || isDelivered;
            const isCurrent = currentIdx === idx && !isDelivered;

            return (
              <div key={stepItem.id} className="flex items-center gap-3 text-xs">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 bg-slate-900 shrink-0"></div>
                )}
                <span
                  className={
                    isCompleted
                      ? 'text-slate-200 font-medium'
                      : isCurrent
                      ? 'text-purple-300 font-semibold animate-pulse'
                      : 'text-slate-500'
                  }
                >
                  {stepItem.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Success Banner or Current Progress note */}
        {isDelivered ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-sm">Demo message sent successfully</span>
            </div>
            <div className="flex items-center justify-between text-xs text-emerald-400/80 pt-1 font-mono">
              <span>Status: SENT & DELIVERED</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] uppercase tracking-wider">
                DEMO MODE
              </span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-center text-slate-400 italic mb-6">
            {sendProgress.currentMessage}
          </p>
        )}

        {/* Disclaimer Notice */}
        <div className="px-3 py-2 rounded-lg bg-slate-950/40 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2 mb-6">
          <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <span>
            Prototype simulation. Connect Meta WhatsApp Business Cloud API in Settings for production messaging.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {isDelivered && selectedLeadForOutreach?.rawPhone && (
            <button
              onClick={() => {
                const clean = (selectedLeadForOutreach.rawPhone || '').replace(/[^0-9]/g, '');
                const url = `https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(
                  `Hi 👋\n\nWe prepared a private reflection video for you:\n🎬 https://lifemirror.app/exp/${encodeURIComponent(clean)}\n\n— LifeMirror Healthcare Outreach`
                )}`;
                window.open(url, '_blank');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 transition-all shadow"
            >
              <span>🚀 Open in WhatsApp (wa.me)</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setIsSendModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Close
            </button>

            {isDelivered && selectedLeadForOutreach && (
              <button
                onClick={() => {
                  setIsSendModalOpen(false);
                  launchUserExperience(
                    selectedLeadForOutreach.addictionCategory,
                    selectedLeadForOutreach
                  );
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Simulate Recipient Watching Video</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
