import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Wine,
  Cigarette,
  Smartphone,
  TrendingDown,
  Gamepad2,
  ShieldAlert,
  Film,
  Play,
  ArrowRight,
  Sparkles,
  Heart,
  CheckCircle,
  Users,
} from 'lucide-react';
import { AddictionCategory } from '../types';

export const CategoriesView: React.FC = () => {
  const { categories, setPreviewVideo, getVideoForCategory, launchUserExperience, leads } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wine':
        return <Wine className="w-5 h-5" />;
      case 'Cigarette':
        return <Cigarette className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'TrendingDown':
        return <TrendingDown className="w-5 h-5" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5" />;
      default:
        return <ShieldAlert className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Category Mapping & Awareness Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Addiction Categories System</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Each addiction category is mapped directly to a dedicated future-simulation awareness video. When a lead is identified, the system automatically binds the corresponding experience without manual video selection.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>6 of 6 Categories Active</span>
        </div>
      </div>

      {/* 6 Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const matchedVid = getVideoForCategory(cat.category);
          const categoryLeadsCount = leads.filter((l) => l.addictionCategory === cat.category).length;

          return (
            <div
              key={cat.category}
              id={`category-card-${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-purple-500/40 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle Ambient Background Gradient */}
              <div
                className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${cat.colorScheme.bgGlow} blur-2xl pointer-events-none`}
              ></div>

              <div className="p-6 space-y-4 relative z-10">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${cat.colorScheme.badge} border`}>
                      {getIcon(cat.iconName)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">{cat.name}</h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {categoryLeadsCount} Screened Leads
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-purple-300 font-medium leading-snug">
                  {cat.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                  {cat.description}
                </p>

                {/* Connected Demo Video Box */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-purple-400" />
                      <span>Matched Video:</span>
                    </span>
                    <span className="text-emerald-400 font-semibold uppercase text-[10px]">
                      Ready (01:00)
                    </span>
                  </div>
                  <p className="font-semibold text-slate-200 truncate">
                    {cat.videoFilename}
                  </p>
                  <p className="text-[11px] text-slate-400 font-sans truncate">
                    "{matchedVid.title}"
                  </p>
                </div>

                {/* Impact Stat */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Clinical Impact Focus:</span>
                  </div>
                  <p className="text-slate-300 font-medium leading-tight">
                    {cat.impactStats.primaryImpactArea}
                  </p>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center gap-2 relative z-10">
                <button
                  id={`btn-preview-${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setPreviewVideo(matchedVid)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
                >
                  <Film className="w-3.5 h-3.5 text-purple-400" />
                  <span>Preview Video</span>
                </button>

                <button
                  onClick={() => launchUserExperience(cat.category)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Experience</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
