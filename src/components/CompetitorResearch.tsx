import React, { useState } from 'react';
import { Competitor } from '../types';
import { 
  Swords, 
  ExternalLink, 
  Plus, 
  Search, 
  Check, 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  Edit3, 
  Trash2,
  Sparkles
} from 'lucide-react';

interface CompetitorResearchProps {
  competitors: Competitor[];
  onOpenAddModal: () => void;
  onEditCompetitor: (competitor: Competitor) => void;
  onDeleteCompetitor: (id: string) => void;
}

export const CompetitorResearch: React.FC<CompetitorResearchProps> = ({
  competitors,
  onOpenAddModal,
  onEditCompetitor,
  onDeleteCompetitor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [threatFilter, setThreatFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  const filteredCompetitors = competitors.filter(c => {
    if (threatFilter !== 'All' && c.threatLevel !== threatFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchDiff = c.ourDifferentiator.toLowerCase().includes(q);
      if (!matchName && !matchDiff) return false;
    }
    return true;
  });

  const getThreatBadge = (level: 'High' | 'Medium' | 'Low') => {
    switch (level) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>High Threat</span>
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Medium Threat</span>
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>Low Threat</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div>
          <h2 className="text-sm font-bold text-[#0f172a]">Competitive Landscape & Differentiation</h2>
          <p className="text-xs text-[#64748b]">
            Evaluate incumbent alternatives and identify sustainable positioning moats
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 text-xs font-medium text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] shadow-sm transition-colors whitespace-nowrap self-stretch sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Competitor</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search competitor names or differentiators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-h-[44px] pl-9 pr-3 text-xs bg-white border border-[#e2e8f0] rounded-[6px] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#4f46e5]"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#f1f5f9] p-1 rounded-[6px] text-xs self-start sm:self-auto overflow-x-auto max-w-full">
          {(['All', 'High', 'Medium', 'Low'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setThreatFilter(lvl)}
              className={`min-h-[36px] px-3 rounded-[4px] font-medium transition-all whitespace-nowrap ${
                threatFilter === lvl 
                  ? 'bg-white text-[#0f172a] shadow-sm font-semibold' 
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              {lvl} Threat
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE VIEW: Stacked Competitor Cards (< 768px) */}
      <div className="block md:hidden space-y-3">
        {filteredCompetitors.map(comp => (
          <div
            key={comp.id}
            className="p-4 bg-white border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-sm text-[#0f172a]">{comp.name}</h3>
                <a
                  href={comp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#4f46e5] hover:underline flex items-center gap-1 mt-0.5 break-all"
                >
                  <span>{comp.website}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
              {getThreatBadge(comp.threatLevel)}
            </div>

            <div className="text-xs text-[#64748b]">
              <span className="font-semibold text-[#0f172a]">Pricing Model:</span> {comp.pricingModel}
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#f8f9fa] rounded border border-[#e2e8f0]">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Key Strengths</span>
                <ul className="space-y-1">
                  {comp.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-[#0f172a]">
                      <Check className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 bg-[#f8f9fa] rounded border border-[#e2e8f0]">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Weaknesses / Gaps</span>
                <ul className="space-y-1">
                  {comp.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-[#0f172a]">
                      <X className="w-3 h-3 text-rose-600 mt-0.5 shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Our Differentiator */}
            <div className="p-3 bg-[#eef2ff] border border-[#c7d2fe] rounded-[6px] text-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#4f46e5] uppercase mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Strategic Differentiator</span>
              </div>
              <p className="text-xs font-medium text-[#0f172a] leading-relaxed">
                {comp.ourDifferentiator}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1 pt-2 border-t border-[#f1f5f9]">
              <button
                onClick={() => onEditCompetitor(comp)}
                aria-label="Edit competitor"
                className="w-10 h-10 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteCompetitor(comp.id)}
                aria-label="Delete competitor"
                className="w-10 h-10 flex items-center justify-center rounded text-[#94a3b8] hover:bg-[#fee2e2] hover:text-[#ef4444]"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Detailed Comparison Table (>= 768px) */}
      <div className="hidden md:block bg-white border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-[#e2e8f0] text-[11px] font-semibold text-[#64748b] tracking-wider">
              <th className="px-4 py-3">Competitor</th>
              <th className="w-28 px-4 py-3">Threat</th>
              <th className="w-44 px-4 py-3">Pricing Model</th>
              <th className="px-4 py-3">Strengths</th>
              <th className="px-4 py-3">Gaps & Weaknesses</th>
              <th className="px-4 py-3">Our Core Differentiator</th>
              <th className="w-20 px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {filteredCompetitors.map(comp => (
              <tr key={comp.id} className="hover:bg-[#faf8ff] transition-colors">
                <td className="px-4 py-3 font-medium text-[#0f172a]">
                  <div className="font-semibold">{comp.name}</div>
                  <a 
                    href={comp.website} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[11px] text-[#4f46e5] hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{comp.website.replace('https://', '')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-4 py-3">
                  {getThreatBadge(comp.threatLevel)}
                </td>
                <td className="px-4 py-3 text-[#64748b]">
                  {comp.pricingModel}
                </td>
                <td className="px-4 py-3 max-w-[200px]">
                  <ul className="space-y-0.5 text-[11px]">
                    {comp.strengths.slice(0, 2).map((s, i) => (
                      <li key={i} className="truncate">• {s}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 max-w-[200px]">
                  <ul className="space-y-0.5 text-[11px] text-[#64748b]">
                    {comp.weaknesses.slice(0, 2).map((w, i) => (
                      <li key={i} className="truncate">• {w}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 font-medium text-[#4f46e5] max-w-[240px]">
                  {comp.ourDifferentiator}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEditCompetitor(comp)}
                      title="Edit"
                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#f1f5f9] text-[#64748b]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteCompetitor(comp.id)}
                      title="Delete"
                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#fee2e2] text-[#94a3b8] hover:text-[#ef4444]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
