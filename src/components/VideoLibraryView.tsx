import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VideoItem } from '../types';
import {
  Film,
  Play,
  Upload,
  Clock,
  Sparkles,
  CheckCircle2,
  Edit2,
  X,
  FileVideo,
  Layers,
} from 'lucide-react';

export const VideoLibraryView: React.FC = () => {
  const { videos, setPreviewVideo, updateVideo, launchUserExperience, addToast } = useApp();
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [replaceFilename, setReplaceFilename] = useState('');
  const [replaceDuration, setReplaceDuration] = useState('01:00');
  const [replaceDescription, setReplaceDescription] = useState('');

  const handleOpenReplace = (video: VideoItem) => {
    setEditingVideo(video);
    setReplaceFilename(video.filename);
    setReplaceDuration(video.duration);
    setReplaceDescription(video.description);
  };

  const handleSaveVideoChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    updateVideo(editingVideo.id, {
      filename: replaceFilename,
      duration: replaceDuration,
      description: replaceDescription,
      status: 'Ready',
    });

    setEditingVideo(null);
    addToast('Video Asset Updated', `Updated parameters for ${editingVideo.title}`, 'success');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Awareness Asset Store</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Video Library & Simulation Media</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Manage the awareness videos and future-simulation media attached to each addiction category. All assets are encoded for instant playback across WhatsApp and web client viewports.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{videos.length} Simulated Media Modules Loaded</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            id={`video-card-${vid.id}`}
            className="group rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Thumbnail Canvas Simulation */}
            <div
              className={`relative aspect-video w-full bg-gradient-to-br ${vid.thumbnailGradient} p-4 flex flex-col justify-between overflow-hidden`}
            >
              <div className="flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-white border border-white/10 font-bold">
                  {vid.id}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 uppercase tracking-wider">
                  {vid.status}
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setPreviewVideo(vid)}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-xl"
                  title="Preview simulated video"
                >
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </button>
              </div>

              {/* Bottom details on thumbnail */}
              <div className="flex items-center justify-between z-10 text-[11px] text-slate-300">
                <span className="font-mono px-2 py-0.5 rounded bg-black/70 backdrop-blur-md">
                  {vid.filename}
                </span>
                <span className="flex items-center gap-1 font-mono px-2 py-0.5 rounded bg-black/70 backdrop-blur-md">
                  <Clock className="w-3 h-3 text-purple-400" />
                  <span>{vid.duration}</span>
                </span>
              </div>
            </div>

            {/* Video Card Body */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold">
                    Category: {vid.category}
                  </span>
                  <button
                    onClick={() => handleOpenReplace(vid)}
                    className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Edit or replace demo video"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight">{vid.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {vid.description}
                </p>
              </div>

              {/* Key Chapters Pill Row */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Simulation Narrative Chapters:
                </span>
                <div className="flex flex-wrap gap-1">
                  {vid.chapters.map((ch, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] border border-slate-800"
                    >
                      {ch.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setPreviewVideo(vid)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
              >
                <Film className="w-3.5 h-3.5 text-purple-400" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => launchUserExperience(vid.category)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Simulate View</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Replace / Edit Video Modal */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Edit / Replace Demo Video</h3>
              <button onClick={() => setEditingVideo(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideoChanges} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Video Asset Filename</label>
                <input
                  type="text"
                  required
                  value={replaceFilename}
                  onChange={(e) => setReplaceFilename(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Duration (MM:SS)</label>
                <input
                  type="text"
                  required
                  value={replaceDuration}
                  onChange={(e) => setReplaceDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Narrative Description</label>
                <textarea
                  rows={3}
                  value={replaceDescription}
                  onChange={(e) => setReplaceDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-center text-slate-400 space-y-1">
                <Upload className="w-5 h-5 mx-auto text-purple-400" />
                <p className="text-[11px] font-medium text-slate-300">Upload New MP4 / H.264 Video File</p>
                <p className="text-[10px] text-slate-500">Drag & drop or simulate file replacement</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
