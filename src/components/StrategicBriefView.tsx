import React from 'react';
import { EvidenceItem } from '../types';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface StrategicBriefViewProps {
  evidenceList: EvidenceItem[];
  onSelectItem: (item: EvidenceItem) => void;
}

export const StrategicBriefView: React.FC<StrategicBriefViewProps> = ({
  evidenceList,
  onSelectItem
}) => {
  const supported = evidenceList.filter(e => e.status === 'supported');
  const invalidated = evidenceList.filter(e => e.status === 'invalidated');

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">
      {/* Memo Header */}
      <div className="bg-white border border-neutral-200/80 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="text-[11px] font-mono font-medium text-neutral-400 mb-1 tracking-wider uppercase">
          IdeaValidator Executive Memo · Strategy Synthesis
        </div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">
          Validation Summary & Capital Allocation Directive
        </h1>
        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
          Synthesized from {evidenceList.length} empirical hypothesis audits, {evidenceList.reduce((acc, curr) => acc + curr.sampleSize, 0).toLocaleString()} tested customer interactions, and p &lt; 0.05 statistical significance standards.
        </p>
      </div>

      {/* Two Column Directive: Scale vs Halt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Validated Ideas */}
        <div className="bg-white border border-emerald-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Validated Pillars (Deploy Capital & Build)</span>
          </div>
          <div className="space-y-2">
            {supported.map(item => (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-lg hover:bg-emerald-50/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-800 mb-1">
                  <span>{item.id} · {item.hypothesisId}</span>
                  <span className="font-semibold">{item.confidenceScore}% conf</span>
                </div>
                <div className="text-xs font-semibold text-neutral-900 group-hover:text-emerald-900 transition-colors">
                  {item.title}
                </div>
                <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2">
                  {item.synthesis}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Refuted Traps */}
        <div className="bg-white border border-rose-200/80 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Refuted Traps (Pivot / Stop Resource Burn)</span>
          </div>
          <div className="space-y-2">
            {invalidated.map(item => (
              <div 
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="p-3 bg-rose-50/40 border border-rose-100 rounded-lg hover:bg-rose-50/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-rose-800 mb-1">
                  <span>{item.id} · {item.hypothesisId}</span>
                  <span className="font-semibold">{item.confidenceScore}% conf (Refuted)</span>
                </div>
                <div className="text-xs font-semibold text-neutral-900 group-hover:text-rose-900 transition-colors">
                  {item.title}
                </div>
                <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2">
                  {item.synthesis}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decision Table */}
      <div className="bg-white border border-neutral-200/80 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Executive Decision Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                <th className="py-2.5">Domain</th>
                <th className="py-2.5">Empirical Finding</th>
                <th className="py-2.5">Strategic Directive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-900">
              <tr>
                <td className="py-3 font-medium text-neutral-900">Enterprise Pricing</td>
                <td className="py-3 text-neutral-500">Usage-based consumption billing lifts NRR past 138% with zero churn.</td>
                <td className="py-3 text-emerald-700 font-semibold">Scale usage tiering across all new enterprise deals.</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-neutral-900">Distribution & OEM</td>
                <td className="py-3 text-neutral-500">White-label ERP bundling produced 14-month deal lag and &lt;42% margins.</td>
                <td className="py-3 text-rose-700 font-semibold">Terminate OEM partner integrations; redirect budget to direct sales.</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-neutral-900">Self-Serve Funnel</td>
                <td className="py-3 text-neutral-500">Mandatory credit card entry reduced developer trial conversion by 73%.</td>
                <td className="py-3 text-emerald-700 font-semibold">Adopt zero-friction Google Workspace SSO trial onboarding.</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-neutral-900">Cohort Retention</td>
                <td className="py-3 text-neutral-500">Retention stabilizes above 85% only when &ge;3 integrations are active.</td>
                <td className="py-3 text-violet-700 font-semibold">Trigger automated Day 7 integration onboarding wizard.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
