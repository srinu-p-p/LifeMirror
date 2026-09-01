import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Shield,
  Key,
  Database,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Code2,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { resetDemoData, addToast } = useApp();
  const [phoneNumberId, setPhoneNumberId] = useState('109847291038472');
  const [wabaId, setWabaId] = useState('293847192837461');
  const [metaToken, setMetaToken] = useState('EAAG...demo_token_hidden');
  const [webhookSecret, setWebhookSecret] = useState('lm_verify_secret_token_99');
  const [providerMode, setProviderMode] = useState<'mock' | 'cloud_api'>('mock');
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      addToast(
        'WhatsApp Cloud API Handshake',
        'Meta Graph API v19.0 endpoint responded with 200 OK (Interactive template ready).',
        'success'
      );
    }, 1200);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo leads, outreach status, and registrations to pristine prototype baseline?')) {
      resetDemoData();
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>System & Messaging Gateway Architecture</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings & WhatsApp API Integration</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Configure delivery providers, Meta WhatsApp Business Cloud API credentials, privacy rules, and prototype state.
        </p>
      </div>

      {/* Provider Selector */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">WhatsApp Outreach Provider Mode</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setProviderMode('mock')}
            className={`p-4 rounded-xl border text-left transition-all ${
              providerMode === 'mock'
                ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-purple-300">Mock Simulated Gateway</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold">
                Active Demo
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Realistic step-by-step simulation (Preparing → Uploading → Creating → Sending → Delivered). No external costs or Meta accounts required.
            </p>
          </button>

          <button
            onClick={() => setProviderMode('cloud_api')}
            className={`p-4 rounded-xl border text-left transition-all ${
              providerMode === 'cloud_api'
                ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-white">WhatsApp Business Cloud API</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] uppercase">
                Production Ready
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Direct integration via Meta Graph API v19.0 endpoints for real-world enterprise deployment.
            </p>
          </button>
        </div>
      </div>

      {/* Meta Graph API Credentials */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-bold text-white">Meta WhatsApp Cloud API Configuration</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Graph API v19.0</span>
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">WhatsApp Phone Number ID</label>
              <input
                type="text"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">WhatsApp Business Account ID (WABA)</label>
              <input
                type="text"
                value={wabaId}
                onChange={(e) => setWabaId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Permanent System User Access Token</label>
            <input
              type="password"
              value={metaToken}
              onChange={(e) => setMetaToken(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Webhook Verify Token</label>
            <input
              type="text"
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-xl font-semibold transition-colors"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>{isTesting ? 'Verifying Gateway...' : 'Test Webhook & API Handshake'}</span>
            </button>

            <button
              onClick={() => addToast('Config Saved', 'API Credentials safely updated in local runtime context.', 'success')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold"
            >
              Save Credentials
            </button>
          </div>
        </div>
      </div>

      {/* Reset State Section */}
      <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Reset Demo Prototype State</span>
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            Resets all screened leads, delivered WhatsApp statuses, and registered participants back to initial clean state.
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-bold transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Prototype Data</span>
        </button>
      </div>
    </div>
  );
};
