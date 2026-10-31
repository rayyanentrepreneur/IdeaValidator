import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { EvidenceItem, EvidenceStatus, DomainCategory } from '../types';

interface NewEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvidence: (item: EvidenceItem) => void;
  nextIdNumber: number;
}

export const NewEvidenceModal: React.FC<NewEvidenceModalProps> = ({
  isOpen,
  onClose,
  onAddEvidence,
  nextIdNumber
}) => {
  const [title, setTitle] = useState('');
  const [hypothesisStatement, setHypothesisStatement] = useState('');
  const [category, setCategory] = useState<DomainCategory>('Enterprise Pricing');
  const [status, setStatus] = useState<EvidenceStatus>('in_progress');
  const [confidenceScore, setConfidenceScore] = useState(70);
  const [impactScore, setImpactScore] = useState(8);
  const [sampleSize, setSampleSize] = useState(850);
  const [sourceName, setSourceName] = useState('');
  const [sourceType, setSourceType] = useState<any>('Telemetry Log');
  const [citation, setCitation] = useState('');
  const [synthesis, setSynthesis] = useState('');
  const [analystName, setAnalystName] = useState('Elena Rostova');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !hypothesisStatement.trim()) return;

    const initials = analystName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newItem: EvidenceItem = {
      id: `EVD-${nextIdNumber}`,
      hypothesisId: `HYP-${String(nextIdNumber).slice(-2) || '10'}`,
      title: title.trim(),
      hypothesisStatement: hypothesisStatement.trim(),
      category,
      status,
      confidenceScore,
      confidenceMargin: 2.5,
      impactScore,
      sampleSize: Number(sampleSize) || 500,
      pValue: confidenceScore > 75 ? 'p < 0.001' : 'p = 0.038',
      sourceName: sourceName.trim() || 'Internal Metric Funnel',
      sourceType,
      citation: citation.trim() || 'Empirical cohort experiment audited across customer segments.',
      owner: {
        name: analystName,
        role: 'Venture Analyst',
        avatar: '',
        initials: initials || 'AN'
      },
      lastAudited: new Date().toISOString().split('T')[0],
      synthesis: synthesis.trim() || 'Initial validation run completed with recorded observations.',
      mitigationSteps: [
        'Track longitudinal retention delta over 60-day cohort.',
        'Benchmark against industry standard CAC-to-LTV ratios.'
      ],
      experiments: [
        {
          id: `EXP-${Math.floor(450 + Math.random() * 200)}`,
          name: `${title.slice(0, 30)} Pilot`,
          method: 'A/B Split Test',
          status: status === 'supported' ? 'Completed' : 'Running',
          sampleSize: Number(sampleSize) || 500,
          lift: '+18.5%',
          significance: 'In validation'
        }
      ],
      auditHistory: [
        {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          analyst: analystName,
          action: 'Created new idea in IdeaValidator'
        }
      ]
    };

    onAddEvidence(newItem);
    // Reset form
    setTitle('');
    setHypothesisStatement('');
    setSourceName('');
    setCitation('');
    setSynthesis('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800">
              EVD-{nextIdNumber}
            </span>
            <h3 className="font-semibold text-sm text-neutral-900">Add New Idea to Validate</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[82vh] overflow-y-auto text-xs text-neutral-900">
          {/* Title & Premise */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
              Idea / Hypothesis Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Usage-based pricing lifts Net Retention past 135%"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-neutral-900"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
              Measurable Hypothesis Premise
            </label>
            <textarea
              required
              rows={2}
              placeholder="If we [action], then [customer outcome] because [empirical reason]..."
              value={hypothesisStatement}
              onChange={(e) => setHypothesisStatement(e.target.value)}
              className="w-full p-2.5 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-neutral-900"
            />
          </div>

          {/* Group: Category & Initial Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                Domain Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DomainCategory)}
                className="w-full h-8 px-2 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-violet-500"
              >
                <option value="Enterprise Pricing">Enterprise Pricing</option>
                <option value="CAC & Acquisition">CAC & Acquisition</option>
                <option value="Product Mechanics">Product Mechanics</option>
                <option value="Unit Economics">Unit Economics</option>
                <option value="Retention & Cohorts">Retention & Cohorts</option>
                <option value="TAM & Market Cap">TAM & Market Cap</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                Validation Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EvidenceStatus)}
                className="w-full h-8 px-2 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-violet-500"
              >
                <option value="in_progress">Testing (In Progress)</option>
                <option value="supported">Validated (Supported)</option>
                <option value="invalidated">Refuted (High Risk)</option>
                <option value="neutral">Backlog (Draft)</option>
              </select>
            </div>
          </div>

          {/* Group: Scorecard Sliders */}
          <div className="p-3.5 bg-neutral-50/80 border border-neutral-200/80 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-neutral-600">Initial Confidence</span>
              <span className="font-mono text-xs font-bold text-neutral-900 tabular-nums">
                {confidenceScore}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={confidenceScore}
              onChange={(e) => setConfidenceScore(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-semibold text-neutral-500 uppercase block mb-1">Impact (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={impactScore}
                  onChange={(e) => setImpactScore(Number(e.target.value))}
                  className="w-full h-7 px-2 font-mono text-xs border border-neutral-200 rounded-md bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-neutral-500 uppercase block mb-1">Sample Size (N)</label>
                <input
                  type="number"
                  min="10"
                  value={sampleSize}
                  onChange={(e) => setSampleSize(Number(e.target.value))}
                  className="w-full h-7 px-2 font-mono text-xs border border-neutral-200 rounded-md bg-white"
                />
              </div>
            </div>
          </div>

          {/* Group: Empirical Evidence Source */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                Source Name
              </label>
              <input
                type="text"
                placeholder="e.g. Q3 Cohort Telemetry"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                className="w-full h-8 px-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                Methodology
              </label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
                className="w-full h-8 px-2 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-violet-500"
              >
                <option value="Telemetry Log">Telemetry Log</option>
                <option value="A/B Experiment">A/B Experiment</option>
                <option value="Customer Discovery">Customer Discovery</option>
                <option value="Conjoint Survey">Conjoint Survey</option>
                <option value="SEC Filing / 10-K">SEC Filing / 10-K</option>
                <option value="Market Data">Market Data</option>
              </select>
            </div>
          </div>

          {/* Citation & Synthesis */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
              Data Finding / Citation
            </label>
            <input
              type="text"
              placeholder="e.g. 38.4% ARR expansion observed in tier 1..."
              value={citation}
              onChange={(e) => setCitation(e.target.value)}
              className="w-full h-8 px-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Lead Analyst */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
              Owner / Lead
            </label>
            <input
              type="text"
              value={analystName}
              onChange={(e) => setAnalystName(e.target.value)}
              className="w-full h-8 px-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-neutral-500 hover:text-neutral-800 rounded-lg hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save & Validate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
