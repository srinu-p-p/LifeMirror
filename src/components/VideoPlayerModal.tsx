import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { VideoItem } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Sparkles,
  Clock,
  Film,
  CheckCircle2,
  HeartHandshake,
  ArrowLeft,
  ChevronLeft,
} from 'lucide-react';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onSelectLeadForOutreach?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onSelectLeadForOutreach,
}) => {
  const { launchUserExperience } = useApp();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const duration = video?.durationSec || 60;

  // ESC key listener for instant closing/backing out
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  if (!video) return null;

  // Active chapter based on currentTime
  const currentChapter =
    video.chapters.slice().reverse().find((c) => currentTime >= c.timeSec) ||
    video.chapters[0];

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        id="video-player-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header with prominent Back button */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-3">
            {/* Highly Prominent Back Button */}
            <button
              id="btn-video-modal-back-top"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow hover:border-purple-500/50"
              title="Return to previous view"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" />
              <span>Back</span>
            </button>

            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">{video.title}</h3>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
                  {video.filename}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Category: <span className="text-purple-300 font-medium">{video.category}</span> • Duration: {video.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-video-modal-close"
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors text-xs border border-transparent hover:border-slate-700"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        {/* Video Canvas Simulation Area */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex flex-col items-center justify-between p-8 select-none">
          {/* Animated Background Simulation */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${video.thumbnailGradient} opacity-90 transition-all duration-700`}
          ></div>
          
          {/* Dynamic Light Particle Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          {/* Top Info Bar inside player */}
          <div className="relative z-10 w-full flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 text-slate-200 text-xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-purple-400" />
                <span>Back</span>
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>LifeMirror Future Simulation Engine</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatTime(currentTime)} / {video.duration}</span>
            </div>
          </div>

          {/* Center Dynamic Visual Simulation & Narrative Voiceover */}
          <div className="relative z-10 text-center max-w-2xl px-6 py-6 rounded-2xl bg-black/50 backdrop-blur-lg border border-white/10 shadow-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              {currentChapter ? currentChapter.title : 'Simulation Horizon'}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight mb-3">
              {currentChapter?.narrativeText}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 italic">
              "{currentChapter?.reflectionPrompt}"
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
              <span>Visual Mode: {currentChapter?.visualMood}</span>
            </div>
          </div>

          {/* Bottom Player Controls */}
          <div className="relative z-10 w-full space-y-3">
            {/* Timeline Progress Bar */}
            <div className="relative w-full">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                {video.chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTime(ch.timeSec)}
                    className={`hover:text-purple-300 transition-colors ${
                      currentTime >= ch.timeSec ? 'text-purple-400 font-bold' : ''
                    }`}
                  >
                    • {ch.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Play/Pause & Volume */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-full bg-white text-black hover:bg-slate-200 transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className="p-2 rounded-lg bg-black/50 hover:bg-black/70 text-slate-300 transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-black/50 hover:bg-black/70 text-slate-300 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  {formatTime(currentTime)} / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    launchUserExperience(video.category);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-semibold transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Full User Experience</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Meta & Themes with explicit Back button */}
        <div className="p-5 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Simulated Narrative Script & Psychological Angles:
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {video.simulatedNarrative}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="btn-video-modal-back-bottom"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-purple-400" />
              <span>Back to Library</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

