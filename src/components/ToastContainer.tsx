import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, ShieldCheck, X, Send } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
        let borderClass = 'border-cyan-500/30 bg-slate-900/95';
        let titleColor = 'text-cyan-300';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          borderClass = 'border-emerald-500/30 bg-slate-900/95';
          titleColor = 'text-emerald-300';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
          borderClass = 'border-amber-500/30 bg-slate-900/95';
          titleColor = 'text-amber-300';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
          borderClass = 'border-rose-500/30 bg-slate-900/95';
          titleColor = 'text-rose-300';
        } else if (toast.type === 'gateway') {
          icon = <Send className="w-5 h-5 text-purple-400 shrink-0 animate-pulse" />;
          borderClass = 'border-purple-500/30 bg-slate-900/95';
          titleColor = 'text-purple-300';
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${borderClass}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className={`text-sm font-semibold tracking-wide ${titleColor}`}>{toast.title}</h4>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
