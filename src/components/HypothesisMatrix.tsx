import React, { useState } from 'react';
import { EvidenceItem } from '../types';
import { Sparkles, ShieldAlert, ArrowUpRight, HelpCircle } from 'lucide-react';

interface HypothesisMatrixProps {
  evidenceList: EvidenceItem[];
  selectedItem: EvidenceItem | null;
  onSelectItem: (item: EvidenceItem) => void;
}

export const HypothesisMatrix: React.FC<HypothesisMatrixProps> = ({
  evidenceList,
  selectedItem,
  onSelectItem
}) => {
  const [hoveredItem, setHoveredItem] = useState<EvidenceItem | null>(null);
  const [filterDomain, setFilterDomain] = useState<string>('all');

  const filteredItems = filterDomain === 'all' 
    ? evidenceList 
    : evidenceList.filter(e => e.category === filterDomain);

  const quadrantStats = {
    coreAnchors: evidenceList.filter(e => e.confidenceScore >= 65 && e.impactScore >= 7.5),
    criticalRisks: evidenceList.filter(e => e.confidenceScore < 65 && e.impactScore >= 7.5),
    optimizations: evidenceList.filter(e => e.confidenceScore >= 65 && e.impactScore < 7.5),
    deprioritized: evidenceList.filter(e => e.confidenceScore < 65 && e.impactScore < 7.5)
  };

  return (
    <div className="space-y-4">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 border border-neutral-200/80 rounded-xl shadow-xs">
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">2x2 Validation Strategic Matrix</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Plotting empirical confidence against enterprise ARR impact
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500 font-medium">Domain:</label>
          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-violet-500"
          >
            <option value="all">All Domains ({evidenceList.length})</option>
            <option value="Enterprise Pricing">Enterprise Pricing</option>
            <option value="CAC & Acquisition">CAC & Acquisition</option>
            <option value="Product Mechanics">Product Mechanics</option>
            <option value="Unit Economics">Unit Economics</option>
            <option value="Retention & Cohorts">Retention & Cohorts</option>
            <option value="TAM & Market Cap">TAM & Market Cap</option>
          </select>
        </div>
      </div>

      {/* 2x2 Matrix Canvas */}
      <div className="relative bg-white border border-neutral-200/80 rounded-xl p-6 shadow-xs h-[520px] flex flex-col justify-between overflow-hidden">
        {/* Subtle Quadrant Background Tints */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none divide-x divide-y divide-neutral-100">
          {/* Top-Left: High Impact / Low Confidence */}
          <div className="p-4 bg-amber-50/20 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-amber-800 font-medium text-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>High Risk / Discovery Needed ({quadrantStats.criticalRisks.length})</span>
            </div>
            <span className="text-[10px] text-amber-700/60 font-mono">
              High Impact &lt; 65% Confidence
            </span>
          </div>

          {/* Top-Right: High Impact / High Confidence */}
          <div className="p-4 bg-emerald-50/20 flex flex-col justify-between">
            <div className="flex items-center justify-end gap-1.5 text-emerald-800 font-medium text-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Core Validated Pillars ({quadrantStats.coreAnchors.length})</span>
            </div>
            <span className="text-[10px] text-emerald-700/60 font-mono text-right">
              High Impact &ge; 65% Confidence
            </span>
          </div>

          {/* Bottom-Left: Low Impact / Low Confidence */}
          <div className="p-4 bg-neutral-50/40 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-neutral-500 font-medium text-xs">
              <span>Deprioritized ({quadrantStats.deprioritized.length})</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">
              Low Impact &lt; 65% Confidence
            </span>
          </div>

          {/* Bottom-Right: Low Impact / High Confidence */}
          <div className="p-4 bg-violet-50/20 flex flex-col justify-between">
            <div className="flex items-center justify-end gap-1.5 text-violet-800 font-medium text-xs">
              <span>Tactical Optimizations ({quadrantStats.optimizations.length})</span>
            </div>
            <span className="text-[10px] text-violet-700/60 font-mono text-right">
              Low Impact &ge; 65% Confidence
            </span>
          </div>
        </div>

        {/* Center Crosshair Hairlines */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-neutral-200 -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-neutral-200 -translate-y-1/2 pointer-events-none" />

        {/* Axis Labels */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-wider text-neutral-500 uppercase pointer-events-none bg-white px-2 py-0.5 rounded border border-neutral-200 shadow-xs">
          Strategic Impact (1 - 10)
        </div>
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-wider text-neutral-500 uppercase pointer-events-none bg-white px-2 py-0.5 rounded border border-neutral-200 shadow-xs">
          Confidence Score (0% - 100%)
        </div>

        {/* Interactive Scatter Points */}
        <div className="relative w-full h-full m-3">
          {filteredItems.map((item) => {
            const leftPercent = Math.max(6, Math.min(94, item.confidenceScore));
            const topPercent = Math.max(6, Math.min(94, 100 - (item.impactScore / 10) * 100));
            const isSelected = selectedItem?.id === item.id;
            const isHovered = hoveredItem?.id === item.id;

            return (
              <div
                key={item.id}
                style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                onClick={() => onSelectItem(item)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-all ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                }`}
              >
                {/* Node Pill */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shadow-xs border transition-all ${
                    item.status === 'supported'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                      : item.status === 'in_progress'
                      ? 'bg-amber-50 border-amber-400 text-amber-900'
                      : item.status === 'invalidated'
                      ? 'bg-rose-50 border-rose-400 text-rose-800'
                      : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                  } ${
                    isSelected ? 'ring-2 ring-violet-600 ring-offset-2' : ''
                  }`}
                >
                  {item.hypothesisId.replace('HYP-', 'H')}
                </div>

                {/* Floating Tooltip */}
                {(isHovered || isSelected) && (
                  <div className="absolute left-1/2 -top-16 -translate-x-1/2 bg-neutral-900 text-white p-2.5 rounded-lg shadow-xl text-left whitespace-nowrap z-50 pointer-events-none min-w-[210px] animate-in fade-in duration-100">
                    <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-neutral-400 border-b border-neutral-800 pb-1 mb-1">
                      <span>{item.id} · {item.hypothesisId}</span>
                      <span className="text-emerald-400 font-semibold">{item.confidenceScore}% conf</span>
                    </div>
                    <div className="font-sans font-medium text-xs truncate max-w-xs">{item.title}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">Impact: {item.impactScore}/10 · {item.category}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
