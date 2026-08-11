import React from 'react';
import { Award, Flame, Trash2, CheckCircle, BarChart3 } from 'lucide-react';

interface StatsBarProps {
  stats: {
    total: number;
    premium: number;
    normal: number;
    trash: number;
  };
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const premiumPct = stats.total > 0 ? Math.round((stats.premium / stats.total) * 100) : 0;
  const normalPct = stats.total > 0 ? Math.round((stats.normal / stats.total) * 100) : 0;
  const trashPct = stats.total > 0 ? Math.round((stats.trash / stats.total) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Concrete Work Portfolio Classification Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Total items tracked in gallery: <span className="font-bold text-amber-400">{stats.total}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Award className="w-4 h-4" />
            <span>Premium: {stats.premium} ({premiumPct}%)</span>
          </div>

          <div className="flex items-center gap-1.5 text-sky-400">
            <Flame className="w-4 h-4" />
            <span>Normal: {stats.normal} ({normalPct}%)</span>
          </div>

          <div className="flex items-center gap-1.5 text-rose-400">
            <Trash2 className="w-4 h-4" />
            <span>Trash: {stats.trash} ({trashPct}%)</span>
          </div>
        </div>
      </div>

      {/* Visual Stacked Progress Bar */}
      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
        <div
          title={`Premium: ${premiumPct}%`}
          className="bg-amber-500 h-full transition-all duration-500 first:rounded-l-full"
          style={{ width: `${premiumPct}%` }}
        />
        <div
          title={`Normal: ${normalPct}%`}
          className="bg-sky-500 h-full transition-all duration-500"
          style={{ width: `${normalPct}%` }}
        />
        <div
          title={`Trash: ${trashPct}%`}
          className="bg-rose-500 h-full transition-all duration-500 last:rounded-r-full"
          style={{ width: `${trashPct}%` }}
        />
      </div>
    </div>
  );
};
