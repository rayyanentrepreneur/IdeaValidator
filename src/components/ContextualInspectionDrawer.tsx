import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Check, 
  Copy, 
  Trash2, 
  Plus, 
  Sliders, 
  FlaskConical, 
  ShieldCheck, 
  History 
} from 'lucide-react';
import { EvidenceItem, EvidenceStatus } from '../types';

interface ContextualInspectionDrawerProps {
  item: EvidenceItem | null;
  onClose: () => void;
  onUpdateItem: (updated: EvidenceItem) => void;
  onDeleteItem: (id: string) => void;
}

export const ContextualInspectionDrawer: React.FC<ContextualInspectionDrawerProps> = ({
  item,
  onClose,
  onUpdateItem,
  onDeleteItem
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'experiments' | 'mitigations' | 'history'>('overview');
  const [copied, setCopied] = useState(false);
  const [newMitigation, setNewMitigation] = useState('');
  const [showAddExp, setShowAddExp] = useState(false);
  const [expName, setExpName] = useState('');
  const [expMethod, setExpMethod] = useState<'A/B Split Test' | 'Double-Blind Survey' | 'Conjoint Analysis' | 'Cohort Intercept' | 'User Discovery'>('A/B Split Test');
  const [expLift, setExpLift] = useState('');

  if (!item) return null;

  const handleStatusChange = (newStatus: EvidenceStatus) => {
    const updated: EvidenceItem = {
      ...item,
      status: newStatus,
      lastAudited: new Date().toISOString().split('T')[0],
      auditHistory: [
        {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          analyst: 'Elena Rostova',
          action: `Updated status to ${newStatus}`
        },
        ...item.auditHistory
      ]
    };
    onUpdateItem(updated);
  };

  const handleConfidenceChange = (val: number) => {
    onUpdateItem({ ...item, confidenceScore: val });
  };

  const handleImpactChange = (val: number) => {
    onUpdateItem({ ...item, impactScore: val });
  };

  const handleAddMitigation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMitigation.trim()) return;
    onUpdateItem({
      ...item,
      mitigationSteps: [...item.mitigationSteps, newMitigation.trim()]
    });
    setNewMitigation('');
  };

  const handleRemoveMitigation = (index: number) => {
    const updatedSteps = [...item.mitigationSteps];
    updatedSteps.splice(index, 1);
    onUpdateItem({
      ...item,
      mitigationSteps: updatedSteps
    });
  };

  const handleCreateExperiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expName.trim()) return;
    const newExp = {
      id: `EXP-${Math.floor(400 + Math.random() * 500)}`,
      name: expName.trim(),
      method: expMethod,
      status: 'Running' as const,
      sampleSize: 500,
      lift: expLift.trim() || 'Pending',
      significance: 'In validation'
    };
    onUpdateItem({
      ...item,
      experiments: [newExp, ...item.experiments],
      auditHistory: [
        {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          analyst: 'Elena Rostova',
          action: `Added experiment ${newExp.id}`
        },
        ...item.auditHistory
      ]
    });
    setExpName('');
    setExpLift('');
    setShowAddExp(false);
  };

  const copyId = () => {
    navigator.clipboard?.writeText(item.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-full sm:w-[380px] shrink-0 bg-white border-l border-neutral-200/80 flex flex-col h-[calc(100vh-3.5rem)] shadow-lg sm:shadow-none select-none z-30">
      {/* Top Header */}
      <div className="p-3.5 border-b border-neutral-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={copyId}
            title="Copy ID"
            className="flex items-center gap-1 font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors"
          >
            <span>{item.id}</span>
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-neutral-400" />}
          </button>
          <span className="text-neutral-300">/</span>
          <span className="font-mono text-xs text-neutral-400">{item.hypothesisId}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDeleteItem(item.id)}
            title="Delete this idea"
            className="w-7 h-7 flex items-center justify-center rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            title="Close drawer"
            className="w-7 h-7 flex items-center justify-center rounded-md text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-neutral-50 border-b border-neutral-100 px-3 text-xs shrink-0">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-1 rounded text-center transition-colors font-medium ${
            activeTab === 'overview' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('experiments')}
          className={`flex-1 py-1 rounded text-center transition-colors font-medium flex items-center justify-center gap-1 ${
            activeTab === 'experiments' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <span>Runs</span>
          <span className="font-mono text-[10px] text-neutral-400">({item.experiments.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('mitigations')}
          className={`flex-1 py-1 rounded text-center transition-colors font-medium flex items-center justify-center gap-1 ${
            activeTab === 'mitigations' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <span>Hedges</span>
          <span className="font-mono text-[10px] text-neutral-400">({item.mitigationSteps.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-1 px-2 rounded text-center transition-colors font-medium ${
            activeTab === 'history' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
          }`}
          title="Audit Trail"
        >
          <History className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-neutral-900">
        {activeTab === 'overview' && (
          <>
            {/* Title & Premise */}
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase block mb-1">
                Hypothesis Premise
              </label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => onUpdateItem({ ...item, title: e.target.value })}
                className="w-full text-sm font-semibold text-neutral-900 bg-transparent border-b border-transparent hover:border-neutral-200 focus:border-violet-500 focus:outline-none pb-1 transition-colors"
                placeholder="Idea title..."
              />
              <textarea
                rows={3}
                value={item.hypothesisStatement}
                onChange={(e) => onUpdateItem({ ...item, hypothesisStatement: e.target.value })}
                className="w-full mt-2 text-xs text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 leading-relaxed focus:bg-white focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="State the measurable premise..."
              />
            </div>

            {/* Validation Verdict Switcher */}
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase block mb-1.5">
                Validation Verdict
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleStatusChange('supported')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    item.status === 'supported'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold shadow-xs'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Validated</span>
                </button>

                <button
                  onClick={() => handleStatusChange('in_progress')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    item.status === 'in_progress'
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold shadow-xs'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Testing</span>
                </button>

                <button
                  onClick={() => handleStatusChange('invalidated')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    item.status === 'invalidated'
                      ? 'bg-rose-50 border-rose-300 text-rose-800 font-semibold shadow-xs'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Refuted / Pivot</span>
                </button>

                <button
                  onClick={() => handleStatusChange('neutral')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    item.status === 'neutral'
                      ? 'bg-neutral-100 border-neutral-300 text-neutral-800 font-semibold shadow-xs'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-neutral-400" />
                  <span>Backlog</span>
                </button>
              </div>
            </div>

            {/* Scorecard Sliders */}
            <div className="p-3 bg-neutral-50/70 border border-neutral-200/80 rounded-xl space-y-3">
              {/* Confidence */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-neutral-600">Confidence Level</span>
                  <span className="font-mono text-xs font-bold text-neutral-900 tabular-nums">
                    {item.confidenceScore}% <span className="font-normal text-neutral-400">(±{item.confidenceMargin}%)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={item.confidenceScore}
                  onChange={(e) => handleConfidenceChange(Number(e.target.value))}
                  className="w-full accent-violet-600 cursor-pointer"
                />
              </div>

              {/* Impact */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-neutral-600">Strategic Impact</span>
                  <span className="font-mono text-xs font-bold text-neutral-900 tabular-nums">
                    {item.impactScore} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={item.impactScore}
                  onChange={(e) => handleImpactChange(Number(e.target.value))}
                  className="w-full accent-violet-600 cursor-pointer"
                />
              </div>

              {/* Statistical Rigor */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200 font-mono text-[11px]">
                <div>
                  <div className="text-[10px] text-neutral-400">Significance</div>
                  <div className="font-semibold text-neutral-900">{item.pValue}</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400">Tested Cohort (N)</div>
                  <div className="font-semibold text-neutral-900">{item.sampleSize.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Category & Lead */}
            <div className="space-y-2 border-t border-neutral-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 text-[11px]">Domain Category</span>
                <span className="font-medium bg-neutral-100 px-2 py-0.5 rounded text-[11px] text-neutral-800">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 text-[11px]">Lead Analyst</span>
                <div className="flex items-center gap-1.5 font-medium text-[11px]">
                  <span className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[9px]">
                    {item.owner.initials}
                  </span>
                  <span>{item.owner.name}</span>
                </div>
              </div>
            </div>

            {/* Synthesis */}
            <div className="border-t border-neutral-100 pt-3">
              <label className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase block mb-1">
                Empirical Synthesis
              </label>
              <textarea
                rows={3}
                value={item.synthesis}
                onChange={(e) => onUpdateItem({ ...item, synthesis: e.target.value })}
                className="w-full text-xs text-neutral-900 bg-white border border-neutral-200 rounded-lg p-2.5 leading-relaxed focus:outline-none focus:border-violet-500"
                placeholder="Key empirical takeaway..."
              />
            </div>

            {/* Source */}
            <div className="border-t border-neutral-100 pt-3">
              <label className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase block mb-1">
                Data Citation
              </label>
              <div className="p-2.5 bg-neutral-50/70 border border-neutral-200 rounded-lg">
                <div className="font-medium text-xs text-neutral-900">{item.sourceName}</div>
                <p className="text-[11px] text-neutral-500 mt-1 italic">
                  "{item.citation}"
                </p>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-violet-700 hover:underline mt-2 font-medium"
                  >
                    <span>View Telemetry Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </>
        )}

        {/* Experiments Tab */}
        {activeTab === 'experiments' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-900">
                Validation Tests ({item.experiments.length})
              </span>
              <button
                onClick={() => setShowAddExp(!showAddExp)}
                className="text-xs text-violet-700 hover:underline flex items-center gap-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Test</span>
              </button>
            </div>

            {showAddExp && (
              <form onSubmit={handleCreateExperiment} className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-2">
                <input
                  type="text"
                  placeholder="Test name (e.g. Pricing A/B test)..."
                  value={expName}
                  onChange={(e) => setExpName(e.target.value)}
                  className="w-full h-8 px-2 text-xs bg-white border border-neutral-200 rounded"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={expMethod}
                    onChange={(e) => setExpMethod(e.target.value as any)}
                    className="h-8 px-2 text-xs bg-white border border-neutral-200 rounded text-neutral-900"
                  >
                    <option value="A/B Split Test">A/B Split Test</option>
                    <option value="Double-Blind Survey">Double-Blind Survey</option>
                    <option value="Conjoint Analysis">Conjoint Analysis</option>
                    <option value="Cohort Intercept">Cohort Intercept</option>
                    <option value="User Discovery">User Discovery</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Lift (e.g. +24% NRR)"
                    value={expLift}
                    onChange={(e) => setExpLift(e.target.value)}
                    className="h-8 px-2 text-xs bg-white border border-neutral-200 rounded"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddExp(false)}
                    className="px-2.5 py-1 text-xs text-neutral-500 hover:text-neutral-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-medium text-white bg-violet-600 rounded hover:bg-violet-700"
                  >
                    Launch Run
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {item.experiments.map((exp) => (
                <div key={exp.id} className="p-3 bg-white border border-neutral-200 rounded-lg">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-xs text-neutral-900">{exp.name}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {exp.method} · n={exp.sampleSize}
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {exp.lift}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mitigations Tab */}
        {activeTab === 'mitigations' && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-900">
              Risk Mitigations & Strategic Hedges
            </div>
            <div className="space-y-2">
              {item.mitigationSteps.map((step, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2 p-2 bg-neutral-50/70 rounded-lg border border-neutral-200">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs text-neutral-800 leading-snug">{step}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveMitigation(idx)}
                    className="text-neutral-400 hover:text-rose-600 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddMitigation} className="mt-3 flex gap-1.5">
              <input
                type="text"
                placeholder="Add mitigation hedge..."
                value={newMitigation}
                onChange={(e) => setNewMitigation(e.target.value)}
                className="flex-1 h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="h-8 px-3 bg-neutral-100 text-neutral-800 font-medium rounded-lg hover:bg-neutral-200 text-xs"
              >
                Add
              </button>
            </form>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-neutral-900 mb-2">
              Audit Trail
            </div>
            <div className="space-y-2 text-[11px] font-mono">
              {item.auditHistory.map((hist, i) => (
                <div key={i} className="p-2 bg-neutral-50 rounded border border-neutral-100">
                  <div className="text-neutral-400 text-[10px]">{hist.timestamp} · {hist.analyst}</div>
                  <div className="font-sans text-neutral-800 mt-0.5">{hist.action}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
