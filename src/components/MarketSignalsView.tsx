import React, { useState } from 'react';
import { MarketSignal, EvidenceItem } from '../types';
import { INITIAL_SIGNALS } from '../data/initialData';
import { Plus, ExternalLink, ArrowRight } from 'lucide-react';

interface MarketSignalsViewProps {
  evidenceList: EvidenceItem[];
  onSelectItem: (item: EvidenceItem) => void;
}

export const MarketSignalsView: React.FC<MarketSignalsViewProps> = ({
  evidenceList,
  onSelectItem
}) => {
  const [signals, setSignals] = useState<MarketSignal[]>(INITIAL_SIGNALS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [headline, setHeadline] = useState('');
  const [source, setSource] = useState('');
  const [sentiment, setSentiment] = useState<'Bullish' | 'Bearish' | 'Neutral'>('Bullish');
  const [summary, setSummary] = useState('');
  const [hypothesisId, setHypothesisId] = useState(evidenceList[0]?.hypothesisId || 'HYP-01');

  const handleAddSignal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim() || !source.trim()) return;

    const newSig: MarketSignal = {
      id: `SIG-${Math.floor(810 + Math.random() * 100)}`,
      headline: headline.trim(),
      source: source.trim(),
      timestamp: 'Just now',
      sentiment,
      linkedHypothesisId: hypothesisId,
      relevance: 'Direct Empirical',
      impactSummary: summary.trim() || 'Macro confirmation for strategic hypothesis.'
    };

    setSignals([newSig, ...signals]);
    setHeadline('');
    setSource('');
    setSummary('');
    setShowAddModal(false);
  };

  const getEvidenceByHypothesis = (hypId: string) => {
    return evidenceList.find(e => e.hypothesisId === hypId);
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 border border-neutral-200/80 rounded-xl shadow-xs">
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Market Signals & External Evidence</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            SEC 10-K filings, sector benchmarks, and competitive market data
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Signal</span>
        </button>
      </div>

      {/* Add Signal Form */}
      {showAddModal && (
        <form onSubmit={handleAddSignal} className="p-4 bg-white border border-violet-200 rounded-xl space-y-3 shadow-sm">
          <div className="font-semibold text-xs text-neutral-900">Record External Benchmark Citation</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Headline / Empirical Finding..."
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-violet-500"
              required
            />
            <input
              type="text"
              placeholder="Source publication (e.g. SEC 10-Q, Gartner)..."
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-violet-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value as any)}
              className="h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-violet-500"
            >
              <option value="Bullish">Bullish (Validates Premise)</option>
              <option value="Bearish">Bearish (Refutes Premise)</option>
              <option value="Neutral">Neutral (Macro Context)</option>
            </select>
            <select
              value={hypothesisId}
              onChange={(e) => setHypothesisId(e.target.value)}
              className="h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-violet-500"
            >
              {evidenceList.map(e => (
                <option key={e.id} value={e.hypothesisId}>
                  {e.hypothesisId} · {e.title.slice(0, 40)}...
                </option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Analytical takeaway & impact on our hypothesis..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="w-full text-xs p-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-violet-500"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700"
            >
              Save Citation
            </button>
          </div>
        </form>
      )}

      {/* Clean Signals List */}
      <div className="bg-white border border-neutral-200/80 rounded-xl shadow-xs overflow-hidden divide-y divide-neutral-100">
        {signals.map((sig) => {
          const linkedEvidence = getEvidenceByHypothesis(sig.linkedHypothesisId);

          return (
            <div
              key={sig.id}
              className="p-4 hover:bg-neutral-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md ${
                    sig.sentiment === 'Bullish' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : sig.sentiment === 'Bearish'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {sig.sentiment}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    {sig.id}
                  </span>
                  <span className="text-xs text-neutral-400">{sig.timestamp}</span>
                </div>

                <h3 className="font-semibold text-sm text-neutral-900">
                  {sig.headline}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  {sig.impactSummary}
                </p>
                <div className="text-[11px] font-mono text-neutral-400 mt-1.5">
                  Source: {sig.source}
                </div>
              </div>

              {linkedEvidence && (
                <div className="shrink-0 flex items-center">
                  <button
                    onClick={() => onSelectItem(linkedEvidence)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-700 bg-violet-50/70 border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors"
                  >
                    <span>Inspect {sig.linkedHypothesisId}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
