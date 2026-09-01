import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AddictionCategory, VideoItem } from '../types';
import { whatsAppService } from '../services/WhatsAppService';
import {
  Send,
  Zap,
  CheckCircle2,
  Film,
  Phone,
  Play,
  Copy,
  Check,
  X,
  Smartphone as PhoneIcon,
  ArrowRight,
  Sparkles,
  Radio,
  Clock,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

interface DirectWhatsAppDispatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
];

const SOURCE_NUMBER = '+91 9014848294';

export const DirectWhatsAppDispatcherModal: React.FC<DirectWhatsAppDispatcherModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    getVideoForCategory,
    setPreviewVideo,
    launchUserExperience,
    addToast,
    addOrUpdateLead,
  } = useApp();

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('9014848294');
  const [selectedCategory, setSelectedCategory] = useState<AddictionCategory>('Online Betting');
  const [isDispatched, setIsDispatched] = useState(false);
  const [lastDispatchedPhone, setLastDispatchedPhone] = useState('');
  const [lastDispatchedVideo, setLastDispatchedVideo] = useState<VideoItem | null>(null);

  // Matched video based on category
  const matchedVideo: VideoItem = useMemo(() => {
    return getVideoForCategory(selectedCategory);
  }, [selectedCategory, getVideoForCategory]);

  // Clean full target number
  const fullCleanPhone进 = useMemo(() => {
    const cleanNum进 = phoneNumber.replace(/[^0-9]/g, '');
    const cleanCode进不易 = countryCode.replace(/[^0-9]/g, '');
    return `+${cleanCode进不易}${cleanNum进}`;
  }, [countryCode, phoneNumber]);

  // Clean pure digits for wa.me URL
  const cleanTargetDigits = useMemo(() => {
    return fullCleanPhone进.replace(/[^0-9]/g, '');
  }, [fullCleanPhone进]);

  // Live Experience URL for recipient
  const liveExperienceUrl = useMemo(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return `${window.location.origin}/?view=experience&cat=${encodeURIComponent(selectedCategory)}&phone=${encodeURIComponent(fullCleanPhone进)}`;
    }
    return `https://lifemirror.app/exp/${encodeURIComponent(fullCleanPhone进)}`;
  }, [selectedCategory, fullCleanPhone进]);

  // Dynamic message template matching exact user prompt
  const defaultMessage = useMemo(() => {
    return `Every habit has a story. And every story can have a different next chapter.\n\n🎥 Watch this short video:\n🎬 "${matchedVideo.title}"\n👉 ${liveExperienceUrl}\n\nIf you feel that a habit is starting to control your time, money, health, or relationships, you don't have to deal with it alone.\n\n🏥 Please register on the link above — tap "Register / Find Nearest Rehabs" to find verified de-addiction & rehab centers near your location with 24/7 confidential support.\n\n— LifeMirror Healthcare Outreach (${SOURCE_NUMBER})`;
  }, [matchedVideo, liveExperienceUrl]);

  if (!isOpen) return null;

  // 1-Click WhatsApp Direct Dispatch (wa.me)
  const handleOneClickWhatsAppDispatch = async () => {
    if (!phoneNumber || phoneNumber.trim().length < 6) {
      addToast('Enter Target Number', 'Please enter a target mobile phone number first.', 'warning');
      return;
    }

    // 1. Build official WhatsApp direct link
    const encodedText = encodeURIComponent(defaultMessage);
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanTargetDigits}&text=${encodedText}`;

    // 2. Launch WhatsApp directly to the target number
    window.open(waUrl, '_blank');

    // 3. Record in application state and database
    try {
      await whatsAppService.dispatchCustomNumberMessage({
        phoneNumber: fullCleanPhone进,
        category: selectedCategory,
        videoId: matchedVideo.id,
        videoTitle: matchedVideo.title,
        videoFilename: matchedVideo.filename,
        videoDuration: matchedVideo.duration,
        messageText: defaultMessage,
        experienceUrl: liveExperienceUrl,
      });

      const newLeadId进 = `LM-HIT-${Date.now().toString().slice(-4)}`;
      addOrUpdateLead({
        id: newLeadId进,
        phone: fullCleanPhone进,
        rawPhone: fullCleanPhone进,
        addictionCategory: selectedCategory,
        risk: 'High',
        consent: 'Opted In',
        whatsappStatus: 'Delivered',
        watchProgress: 'Not Started',
        watchTime: '0:00',
        supportInterest: 'Pending',
        source: 'WhatsApp Outreach (wa.me)',
        lastActivity: 'Just now',
        notes: `Dispatched from source ${SOURCE_NUMBER} to target ${fullCleanPhone进} with ${matchedVideo.filename}`,
      });

      setLastDispatchedPhone(fullCleanPhone进);
      setLastDispatchedVideo(matchedVideo);
      setIsDispatched(true);

      addToast(
        'WhatsApp Dispatched! 🚀',
        `Launched WhatsApp with "${matchedVideo.title}" to ${fullCleanPhone进}`,
        'success'
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveExperienceUrl);
    addToast('Link Copied!', 'Experience video URL copied to clipboard.', 'info');
  };

  const categoriesList: {
    category: AddictionCategory;
    icon: string;
    label: string;
    desc: string;
  }[] = [
    { category: 'Online Betting', icon: '🎰', label: 'Online Betting', desc: 'betting.mp4 • 0:45' },
    { category: 'Alcohol', icon: '🍺', label: 'Alcohol', desc: 'alcohol.mp4 • 0:42' },
    { category: 'Smoking', icon: '🚬', label: 'Smoking', desc: 'smoking.mp4 • 0:38' },
    { category: 'Smartphone', icon: '📱', label: 'Smartphone', desc: 'smartphone.mp4 • 0:40' },
    { category: 'Gaming', icon: '🎮', label: 'Gaming', desc: 'gaming.mp4 • 0:48' },
    { category: 'Other', icon: '🌐', label: 'Other', desc: 'other.mp4 • 0:35' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        id="modal-direct-whatsapp-hit"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#25D366] to-emerald-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/25 font-bold">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Direct WhatsApp Dispatcher
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  1-Click Direct Hit (wa.me)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                1-Click delivery to target number with matched reflection video
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Source Number Status */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs text-slate-400 font-medium">Source Dispatcher:</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{SOURCE_NUMBER}</span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
              Ready
            </span>
          </div>

          {/* Step 1: Target Phone Number Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>1. Enter Target Phone Number</span>
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-36 px-3 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>

              <div className="relative flex-1">
                <input
                  id="input-target-whatsapp-number"
                  type="tel"
                  autoFocus
                  placeholder="e.g. 9014848294 (or any recipient number)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleOneClickWhatsAppDispatch();
                  }}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
            {phoneNumber && (
              <p className="text-[11px] text-slate-400 font-mono pl-1">
                Target will receive at: <strong className="text-emerald-300 font-bold">{fullCleanPhone进}</strong>
              </p>
            )}
          </div>

          {/* Step 2: Select Addiction Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>2. Select Addiction Type (Auto-pairs Video)</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {categoriesList.map((item) => {
                const isSelected的的 = selectedCategory === item.category;
                return (
                  <button
                    key={item.category}
                    type="button"
                    onClick={() => setSelectedCategory(item.category)}
                    className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected的的
                        ? 'bg-gradient-to-br from-purple-950/80 to-indigo-950/80 border-purple-500 text-white shadow-md shadow-purple-500/10 ring-1 ring-purple-500'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xl">{item.icon}</span>
                      {isSelected的的 && <Check className="w-4 h-4 text-purple-400" />}
                    </div>
                    <span className="text-xs font-bold">{item.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matched Video & Message Preview Box */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-purple-400" />
                <span>Bound Video:</span>
                <strong className="text-purple-300 font-semibold">{matchedVideo.title}</strong>
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewVideo(matchedVideo)}
                  className="text-xs text-purple-400 hover:text-purple-200 flex items-center gap-1 font-semibold underline"
                >
                  <Play className="w-3 h-3" />
                  <span>Preview Video</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-slate-300 whitespace-pre-line leading-relaxed">
              {defaultMessage}
            </div>
          </div>

          {/* SUCCESS BANNER IF DISPATCHED */}
          {isDispatched && lastDispatchedVideo && (
            <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 flex items-start justify-between gap-3 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">
                    Dispatched to {lastDispatchedPhone}!
                  </p>
                  <p className="text-[11px] text-emerald-300">
                    WhatsApp opened with the reflection video link ({lastDispatchedVideo.filename}).
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => launchUserExperience(selectedCategory)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 transition-all shadow"
              >
                Simulate Recipient View
              </button>
            </div>
          )}

          {/* THE 1-CLICK WHATSAPP HIT BUTTON */}
          <button
            id="btn-hit-whatsapp-target-1click"
            type="button"
            onClick={handleOneClickWhatsAppDispatch}
            className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
            <span>HIT WHATSAPP MESSAGE NOW (1-CLICK SEND)</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400">
          <span>Source: <strong className="text-emerald-400 font-mono">{SOURCE_NUMBER}</strong></span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
