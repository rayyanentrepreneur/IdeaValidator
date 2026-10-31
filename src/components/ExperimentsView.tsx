import React, { useState } from 'react';
import { EvidenceItem } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ExperimentsViewProps {
  evidenceList: EvidenceItem[];
  onSelectItem: (item: EvidenceItem) => void;
}

export const ExperimentsView: React.FC<ExperimentsViewProps> = ({
  evidenceList,
  onSelectItem
}) => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Running' | 'Completed' | 'Scheduled'>('All');

  const allExperiments = evidenceList.flatMap(e => 
    e.experiments.map(exp => ({
      ...exp,
      evidenceId: e.id,
      evidenceTitle: e.title,
      parentItem: e
    }))
  );

  const filteredExperiments = filterStatus === 'All'
    ? allExperiments
    : allExperiments.filter(exp => exp.status === filterStatus);

  const runningCount = allExperiments.filter(e => e.status === 'Running').length;
  const completedCount = allExperiments.filter(e => e.status === 'Completed').length;
  const totalSample = allExperiments.reduce((acc, curr) => acc + curr.sampleSize, 0);

  return (
    <div className="space-y-4">
      {/* Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-neutral-200/80 rounded-xl shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Total Tests</div>
          <div className="font-mono text-xl font-bold text-neutral-900 mt-1 tabular-nums">
            {allExperiments.length}
          </div>
        </div>

        <div className="p-3.5 bg-white border border-neutral-200/80 rounded-xl shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Active In-Market</div>
          <div className="font-mono text-xl font-bold text-amber-800 mt-1 tabular-nums flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>{runningCount} Running</span>
          </div>
        </div>

        <div className="p-3.5 bg-white border border-neutral-200/80 rounded-xl shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Concluded</div>
          <div className="font-mono text-xl font-bold text-emerald-800 mt-1 tabular-nums">
            {completedCount} Completed
          </div>
        </div>

        <div className="p-3.5 bg-white border border-neutral-200/80 rounded-xl shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Total Cohort</div>
          <div className="font-mono text-xl font-bold text-neutral-900 mt-1 tabular-nums">
            {totalSample.toLocaleString()} <span className="text-xs font-normal text-neutral-400">users</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between bg-white p-3 border border-neutral-200/80 rounded-xl shadow-xs">
        <div className="flex items-center gap-1 p-1 bg-neutral-100/80 rounded-lg text-xs">
          {(['All', 'Running', 'Completed', 'Scheduled'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                filterStatus === st 
                  ? 'bg-white text-neutral-900 shadow-xs font-semibold' 
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Compact List */}
      <div className="bg-white border border-neutral-200/80 rounded-xl shadow-xs overflow-hidden divide-y divide-neutral-100">
        {filteredExperiments.map(exp => (
          <div
            key={exp.id}
            onClick={() => onSelectItem(exp.parentItem)}
            className="p-4 hover:bg-neutral-50/70 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-neutral-400">
                  {exp.id}
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                  exp.status === 'Running' 
                    ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                    : exp.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {exp.status}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {exp.method}
                </span>
              </div>

              <h3 className="font-semibold text-sm text-neutral-900 group-hover:text-violet-700 transition-colors">
                {exp.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                Linked hypothesis: {exp.evidenceTitle}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
              <div className="text-right">
                <div className="font-mono text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {exp.lift}
                </div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  n = {exp.sampleSize.toLocaleString()}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-violet-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
