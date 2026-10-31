import React, { useState } from 'react';
import { Experiment } from '../types';
import { 
  FlaskConical, 
  Plus, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Trash2,
  Check,
  TrendingUp
} from 'lucide-react';

interface ExperimentPlannerProps {
  experiments: Experiment[];
  onOpenAddModal: () => void;
  onEditExperiment: (experiment: Experiment) => void;
  onDeleteExperiment: (id: string) => void;
  onUpdateStatus: (id: string, status: Experiment['status']) => void;
}

export const ExperimentPlanner: React.FC<ExperimentPlannerProps> = ({
  experiments,
  onOpenAddModal,
  onEditExperiment,
  onDeleteExperiment,
  onUpdateStatus
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredExperiments = filterStatus === 'All'
    ? experiments
    : experiments.filter(e => e.status === filterStatus);

  const getStatusBadge = (status: Experiment['status']) => {
    switch (status) {
      case 'Running':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Running</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'Planned':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>Planned</span>
          </span>
        );
      case 'Cancelled':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div>
          <h2 className="text-sm font-bold text-[#0f172a]">Experiment & Hypothesis Planner</h2>
          <p className="text-xs text-[#64748b]">
            Design rigorous, time-boxed validation sprints with predefined pass/fail metric thresholds
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 text-xs font-medium text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] shadow-sm transition-colors whitespace-nowrap self-stretch sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experiment</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#f1f5f9] rounded-[6px] text-xs self-start overflow-x-auto max-w-full">
        {(['All', 'Running', 'Planned', 'Completed'] as const).map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`min-h-[36px] px-3.5 rounded-[4px] font-medium transition-all whitespace-nowrap ${
              filterStatus === st 
                ? 'bg-white text-[#0f172a] shadow-sm font-semibold' 
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            {st} ({st === 'All' ? experiments.length : experiments.filter(e => e.status === st).length})
          </button>
        ))}
      </div>

      {/* Experiment Cards: Vertically Stacked on Mobile, Clean Spacing */}
      <div className="space-y-4">
        {filteredExperiments.map((exp) => (
          <div
            key={exp.id}
            className="p-4 sm:p-5 bg-white border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-3.5"
          >
            {/* Top Bar: ID, Title, Status, Deadline */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1f5f9] pb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-mono text-xs text-[#64748b] bg-[#f8f9fa] border border-[#e2e8f0] px-1.5 py-0.5 rounded">
                    {exp.id}
                  </span>
                  <span className="text-xs font-medium text-[#4f46e5] bg-[#eef2ff] px-2 py-0.5 rounded">
                    {exp.method}
                  </span>
                  {getStatusBadge(exp.status)}
                </div>
                <h3 className="font-bold text-sm text-[#0f172a] break-words">{exp.title}</h3>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#64748b]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Deadline: <strong className="text-[#0f172a]">{exp.deadline}</strong></span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Cost: <strong className="text-[#0f172a]">{exp.estimatedCost}</strong></span>
                </div>
              </div>
            </div>

            {/* Hypothesis statement */}
            <div>
              <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">
                Falsifiable Hypothesis Premise
              </span>
              <p className="text-xs font-medium text-[#0f172a] bg-[#faf8ff] border border-[#e2e8f0] p-3 rounded-[6px] leading-relaxed">
                {exp.hypothesis}
              </p>
            </div>

            {/* Target Metric vs Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#f8f9fa] border border-[#e2e8f0] rounded-[6px]">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">
                  Success Criteria / Target Metric
                </span>
                <p className="font-mono text-[#0f172a] font-semibold">{exp.targetMetric}</p>
              </div>

              <div className="p-3 bg-[#ecfdf5]/40 border border-[#a7f3d0] rounded-[6px]">
                <span className="text-[10px] font-semibold text-[#065f46] uppercase block mb-1">
                  Measured Results & Lift
                </span>
                <p className="text-[#0f172a] font-medium leading-relaxed">{exp.results}</p>
              </div>
            </div>

            {/* Conclusion */}
            {exp.conclusion && (
              <div className="pt-1 text-xs">
                <span className="text-[10px] font-semibold text-[#4f46e5] uppercase block mb-0.5">
                  Strategic Conclusion
                </span>
                <p className="text-[#475569] leading-relaxed">{exp.conclusion}</p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-3 border-t border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <label className="text-xs text-[#64748b]">Status:</label>
                <select
                  value={exp.status}
                  onChange={(e) => onUpdateStatus(exp.id, e.target.value as any)}
                  className="min-h-[36px] px-2 text-xs bg-white border border-[#e2e8f0] rounded text-[#0f172a]"
                >
                  <option value="Planned">Planned</option>
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => onEditExperiment(exp)}
                  aria-label="Edit experiment"
                  className="w-10 h-10 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteExperiment(exp.id)}
                  aria-label="Delete experiment"
                  className="w-10 h-10 flex items-center justify-center rounded text-[#94a3b8] hover:bg-[#fee2e2] hover:text-[#ef4444]"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredExperiments.length === 0 && (
          <div className="p-8 text-center bg-white border border-[#e2e8f0] rounded-[8px] text-xs text-[#64748b]">
            No experiments found for this filter.
          </div>
        )}
      </div>
    </div>
  );
};
