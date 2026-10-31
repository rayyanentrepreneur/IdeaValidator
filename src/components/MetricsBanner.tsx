import React from 'react';
import { EvidenceItem } from '../types';

interface MetricsBannerProps {
  evidenceList: EvidenceItem[];
  onFilterByStatus?: (status: 'supported' | 'invalidated' | 'in_progress' | 'all') => void;
}

export const MetricsBanner: React.FC<MetricsBannerProps> = ({ evidenceList, onFilterByStatus }) => {
  const total = evidenceList.length;
  const supported = evidenceList.filter(e => e.status === 'supported').length;
  const inProgress = evidenceList.filter(e => e.status === 'in_progress').length;
  const invalidated = evidenceList.filter(e => e.status === 'invalidated').length;

  const validationRate = total > 0 ? Math.round((supported / total) * 100) : 0;
  const avgConfidence = total > 0
    ? (evidenceList.reduce((acc, curr) => acc + curr.confidenceScore, 0) / total).toFixed(0)
    : '0';

  const totalSampleSize = evidenceList.reduce((acc, curr) => acc + curr.sampleSize, 0);

  return (
    <div className="bg-white border border-neutral-200/80 rounded-xl shadow-xs mb-5 overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-neutral-100">
        {/* Metric 1: Total Ideas Tested */}
        <button 
          onClick={() => onFilterByStatus?.('all')} 
          className="p-4 text-left hover:bg-neutral-50/80 transition-colors group cursor-pointer"
        >
          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            Total Ideas
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-mono text-2xl font-bold text-neutral-900 tabular-nums">
              {total}
            </span>
            <span className="text-xs text-neutral-400">
              tested
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
            Active validation roadmap
          </p>
        </button>

        {/* Metric 2: Validation Rate */}
        <button 
          onClick={() => onFilterByStatus?.('supported')} 
          className="p-4 text-left hover:bg-neutral-50/80 transition-colors group cursor-pointer"
        >
          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            Validation Rate
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-mono text-2xl font-bold text-emerald-700 tabular-nums">
              {validationRate}%
            </span>
            <span className="text-xs text-neutral-400">
              ({supported}/{total})
            </span>
          </div>
          <div className="w-full bg-neutral-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
              style={{ width: `${validationRate}%` }} 
            />
          </div>
        </button>

        {/* Metric 3: Pivots Required */}
        <button 
          onClick={() => onFilterByStatus?.('invalidated')} 
          className="p-4 text-left hover:bg-neutral-50/80 transition-colors group cursor-pointer"
        >
          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            Pivots Required
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-mono text-2xl font-bold text-rose-700 tabular-nums">
              {invalidated}
            </span>
            <span className="text-xs text-neutral-400">
              refuted
            </span>
          </div>
          <p className="text-[11px] text-rose-600/80 mt-0.5 truncate">
            Avoided costly build traps
          </p>
        </button>

        {/* Metric 4: Average Confidence */}
        <div className="p-4 text-left">
          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            Mean Confidence
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-mono text-2xl font-bold text-neutral-900 tabular-nums">
              {avgConfidence}%
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              ± 2.4%
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
            High statistical power
          </p>
        </div>

        {/* Metric 5: Total Sample Size */}
        <div className="p-4 text-left col-span-2 sm:col-span-1">
          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            Total Cohort Sample
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-mono text-2xl font-bold text-neutral-900 tabular-nums">
              {totalSampleSize.toLocaleString()}
            </span>
            <span className="text-xs text-neutral-400">
              users
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
            Across {evidenceList.reduce((acc, curr) => acc + curr.experiments.length, 0)} experiments
          </p>
        </div>
      </div>
    </div>
  );
};
