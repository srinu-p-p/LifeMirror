import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AddictionCategory } from '../types';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  HeartHandshake,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  Compass,
  ArrowLeft,
  Sun,
  Flame,
  Building2,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { SupportRegistrationModal } from './SupportRegistrationModal';

export const UserExperienceView: React.FC = () => {
  const {
    userExperienceCategory,
    userExperienceLead,
    getVideoForCategory,
    recordVideoViewed,
    recordHelpRequested,
    exitUserExperience,
  } = useApp();

  const video = getVideoForCategory(userExperienceCategory);
  const duration = video.durationSec || 60;

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasCompletedVideo, setHasCompletedVideo] = useState<boolean>(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState<boolean>(false);
  const [notNowMessage, setNotNowMessage] = useState<boolean>(false);

  // Playback timer
  useEffect(() => {
    let timer: any;
    if (isPlaying && !hasCompletedVideo) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            setHasCompletedVideo(true);
            recordVideoViewed(userExperienceLead?.id, userExperienceCategory);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, hasCompletedVideo, duration, recordVideoViewed, userExperienceLead, userExperienceCategory]);

  // Current chapter
  const currentChapter =
    video.chapters.slice().reverse().find((c) => currentTime >= c.timeSec) ||
    video.chapters[0];

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleWantSupport = () => {
    recordHelpRequested(userExperienceLead?.id, userExperienceCategory);
    setIsRegModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white font-sans">
      {/* Sticky Quick Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          id="btn-user-exp-floating-back"
          onClick={exitUserExperience}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/95 hover:bg-slate-800 text-white font-bold text-xs border border-purple-500/40 shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:border-purple-400 group"
          title="Return to Admin Dashboard"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>← Back to Dashboard</span>
        </button>
      </div>

      {/* Top Subtle Navigation */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md pl-44 sm:pl-48">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#05070c] rounded-full flex items-center justify-center">
              <Compass className="w-4 h-4 text-purple-300" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wide text-white">LifeMirror</h1>
            <p className="text-[11px] text-slate-400 font-serif italic">
              "Every habit has a story. And every story can have a different next chapter."
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-top-register-rehab-cta"
            onClick={handleWantSupport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Register / Find Nearest Rehab</span>
          </button>

          <button
            id="btn-user-exp-top-exit"
            onClick={exitUserExperience}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 hover:text-white text-xs font-semibold transition-colors border border-purple-500/30 shadow"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit</span>
          </button>
        </div>
      </header>

      {/* Main Cinematic Video Stage */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto w-full">
        {/* Intro text */}
        <div className="text-center space-y-2.5 mb-6 max-w-2xl animate-fadeIn">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Confidential Habit Reflection • {video.category}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extralight tracking-tight text-white">
            Every habit has a story. And every story can have a different next chapter.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            If you feel that a habit is starting to control your time, money, health, or relationships, you don't have to deal with it alone.
          </p>
        </div>

        {/* Video Canvas Container */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.15)] flex flex-col justify-between p-6 sm:p-10 select-none">
          {/* Simulated Cinematic Backdrop */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${video.thumbnailGradient} opacity-90 transition-all duration-1000`}
          ></div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"></div>

          {/* Top Status */}
          <div className="relative z-10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              <span className="font-mono text-[11px]">Timeline Simulator: {video.filename}</span>
            </div>

            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-slate-300 text-xs">
              {formatTime(currentTime)} / {video.duration}
            </div>
          </div>

          {/* Center Story Chapter Card */}
          <div className="relative z-10 my-auto text-center max-w-2xl mx-auto px-6 py-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3 border border-purple-500/30">
              {currentChapter?.title}
            </div>

            <h3 className="text-xl sm:text-2xl font-normal text-white leading-relaxed tracking-tight mb-4 font-serif">
              "{currentChapter?.narrativeText}"
            </h3>

            <p className="text-xs sm:text-sm text-purple-200/90 font-light italic">
              {currentChapter?.reflectionPrompt}
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Visual Atmosphere: {currentChapter?.visualMood}</span>
            </div>
          </div>

          {/* Bottom Timeline Controls */}
          <div className="relative z-10 space-y-3">
            {/* Scrubber */}
            <div className="relative">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  setCurrentTime(Number(e.target.value));
                  if (Number(e.target.value) >= duration) setHasCompletedVideo(true);
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-full bg-white text-black hover:bg-slate-200 transition-transform active:scale-95 shadow-lg"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentTime(0);
                    setIsPlaying(true);
                    setHasCompletedVideo(false);
                  }}
                  className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-300 transition-colors border border-white/5"
                  title="Watch Again"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-300 transition-colors border border-white/5"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>

              {/* Fast completion trigger for demo testing */}
              {!hasCompletedVideo && (
                <button
                  onClick={() => {
                    setCurrentTime(duration);
                    setHasCompletedVideo(true);
                    setIsPlaying(false);
                    recordVideoViewed(userExperienceLead?.id, userExperienceCategory);
                  }}
                  className="text-xs text-purple-300 hover:text-purple-100 underline decoration-purple-500/50"
                >
                  Skip to Reflection End →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ALWAYS-ACCESSIBLE REGISTER / NEAREST REHAB CALLOUT BAR */}
        <div className="w-full max-w-5xl mt-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Looking for confidential guidance or nearest rehabilitation centers?
              </p>
              <p className="text-[11px] text-slate-400">
                Click register to provide your city and get matched with certified nearest de-addiction facilities & counseling.
              </p>
            </div>
          </div>

          <button
            id="btn-user-exp-register-rehab"
            onClick={handleWantSupport}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>REGISTER / FIND NEAREST REHABS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* AFTER VIDEO REFLECTION STAGE */}
        {(hasCompletedVideo || currentTime >= 50) && (
          <div className="w-full max-w-2xl mt-8 p-8 rounded-3xl bg-slate-950/90 border border-purple-500/30 text-center space-y-6 shadow-2xl animate-fadeIn">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400 shadow-inner">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-light text-white tracking-tight">
                That was one possible future.
              </h3>
              <p className="text-base text-purple-200 font-serif italic">
                "Every habit has a story. And every story can have a different next chapter."
              </p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                If you feel that a habit is starting to control your time, money, health, or relationships, you don't have to deal with it alone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                id="btn-want-support-cta"
                onClick={handleWantSupport}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-slate-950" />
                <span>REGISTER & FIND NEAREST REHABS</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => setNotNowMessage(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
              >
                NOT RIGHT NOW
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center">
              <button
                id="btn-reflection-back-to-admin"
                onClick={exitUserExperience}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors py-1 px-3 rounded-lg hover:bg-slate-900"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-purple-400" />
                <span>← Back to Dashboard & Outreach Hub</span>
              </button>
            </div>

            {notNowMessage && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 animate-fadeIn">
                <p>
                  Take all the time you need. This door remains open whenever you feel ready to talk.
                </p>
                <button
                  onClick={handleWantSupport}
                  className="mt-2 text-emerald-400 font-semibold hover:underline"
                >
                  Changed your mind? Click here to register and view nearest rehabs.
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/5 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>LifeMirror confidential healthcare initiative</span>
        <span>Free, judgment-free clinical outreach and nearest rehab matching</span>
      </footer>

      {/* Support & Nearest Rehab Registration Modal */}
      {isRegModalOpen && (
        <SupportRegistrationModal
          category={userExperienceCategory}
          lead={userExperienceLead}
          onClose={() => setIsRegModalOpen(false)}
        />
      )}
    </div>
  );
};
