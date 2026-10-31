import React, { useState, useMemo } from 'react';
import { Assumption, AssumptionCategory, AssumptionStatus } from '../types';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  Plus, 
  ArrowUpDown, 
  Trash2, 
  Edit3, 
  ChevronDown, 
  ChevronUp, 
  X,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface AssumptionsTrackerProps {
  assumptions: Assumption[];
  onAddAssumption: () => void;
  onEditAssumption: (assumption: Assumption) => void;
  onDeleteAssumption: (id: string) => void;
  onUpdateStatus: (id: string, status: AssumptionStatus) => void;
}

export const AssumptionsTracker: React.FC<AssumptionsTrackerProps> = ({
  assumptions,
  onAddAssumption,
  onEditAssumption,
  onDeleteAssumption,
  onUpdateStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<AssumptionCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AssumptionStatus | 'all'>('all');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'importance' | 'confidence' | 'category'>('importance');

  // Filter and sort
  const filteredAssumptions = useMemo(() => {
    return assumptions
      .filter((a) => {
        if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
        if (statusFilter !== 'all' && a.status !== statusFilter) return false;
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchStatement = a.statement.toLowerCase().includes(q);
          const matchExp = a.nextExperiment.toLowerCase().includes(q);
          const matchId = a.id.toLowerCase().includes(q);
          if (!matchStatement && !matchExp && !matchId) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'importance') {
          const weight = { High: 3, Medium: 2, Low: 1 };
          return weight[b.importance] - weight[a.importance];
        }
        if (sortBy === 'confidence') {
          const weight = { High: 3, Medium: 2, Low: 1 };
          return weight[b.confidence] - weight[a.confidence];
        }
        return a.category.localeCompare(b.category);
      });
  }, [assumptions, categoryFilter, statusFilter, searchQuery, sortBy]);

  const getStatusBadge = (status: AssumptionStatus) => {
    switch (status) {
      case 'Validated':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-2 text-[11px] font-semibold rounded-[4px] bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span>Validated</span>
          </span>
        );
      case 'Testing':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-2 text-[11px] font-semibold rounded-[4px] bg-[#fffbeb] border border-[#fde68a] text-[#92400e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span>Testing</span>
          </span>
        );
      case 'Invalidated':
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-2 text-[11px] font-semibold rounded-[4px] bg-[#fef2f2] border border-[#fecaca] text-[#991b1b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
            <span>Invalidated</span>
          </span>
        );
      case 'Untested':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 h-[22px] px-2 text-[11px] font-semibold rounded-[4px] bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]" />
            <span>Untested</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div>
          <h2 className="text-sm font-bold text-[#0f172a]">Assumptions & Risk Tracker</h2>
          <p className="text-xs text-[#64748b]">Rank by importance and confidence to identify existential leap-of-faith risks</p>
        </div>
        <button
          onClick={onAddAssumption}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 text-xs font-medium text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] shadow-sm transition-colors whitespace-nowrap self-stretch sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Assumption</span>
        </button>
      </div>

      {/* Full-Width Search & Collapsible Filter Bar */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-3 space-y-3 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-2">
          {/* Full-width Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search assumptions or next experiments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] pl-9 pr-3 text-xs bg-white border border-[#e2e8f0] rounded-[6px] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#4f46e5]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748b]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Toggle Button on Mobile */}
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`min-h-[44px] px-3.5 text-xs font-medium rounded-[6px] border flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              isFilterPanelOpen || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'bg-[#eef2ff] border-[#c7d2fe] text-[#4f46e5]'
                : 'bg-white border-[#e2e8f0] text-[#0f172a] hover:bg-[#f8f9fa]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {isFilterPanelOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Filter Panel */}
        {isFilterPanelOpen && (
          <div className="pt-3 border-t border-[#f1f5f9] grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-150">
            <div>
              <label className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="w-full min-h-[44px] px-2 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
              >
                <option value="all">All Categories</option>
                <option value="Problem">Problem</option>
                <option value="Solution">Solution</option>
                <option value="Customer">Customer</option>
                <option value="Monetization">Monetization</option>
                <option value="Market">Market</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full min-h-[44px] px-2 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
              >
                <option value="all">All Statuses</option>
                <option value="Untested">Untested</option>
                <option value="Testing">Testing</option>
                <option value="Validated">Validated</option>
                <option value="Invalidated">Invalidated</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full min-h-[44px] px-2 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
              >
                <option value="importance">Importance (High to Low)</option>
                <option value="confidence">Confidence (High to Low)</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE VIEW: Compact Cards (< 768px) */}
      <div className="block md:hidden space-y-3">
        {filteredAssumptions.map((asm) => (
          <div
            key={asm.id}
            className="p-4 bg-white border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-3"
          >
            {/* Assumption statement first */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-xs text-[#64748b]">{asm.id}</span>
                {getStatusBadge(asm.status)}
              </div>
              <h3 className="text-sm font-semibold text-[#0f172a] leading-snug break-words">
                {asm.statement}
              </h3>
            </div>

            {/* Badges for Category, Importance, Confidence */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="bg-[#f8f9fa] border border-[#e2e8f0] px-2 py-0.5 rounded font-medium text-[#475569]">
                {asm.category}
              </span>
              <span className={`px-2 py-0.5 rounded font-semibold ${
                asm.importance === 'High' ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {asm.importance} Importance
              </span>
              <span className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded font-medium">
                {asm.confidence} Confidence
              </span>
            </div>

            {/* Next experiment underneath */}
            <div className="p-2.5 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px] text-xs">
              <span className="text-[10px] font-semibold text-[#4f46e5] uppercase block mb-0.5">
                Next Experiment Run
              </span>
              <p className="text-[#0f172a] font-medium leading-relaxed">
                {asm.nextExperiment}
              </p>
            </div>

            {/* Touch Action Menu */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9]">
              <select
                value={asm.status}
                onChange={(e) => onUpdateStatus(asm.id, e.target.value as AssumptionStatus)}
                aria-label={`Change status for ${asm.id}`}
                className="h-9 px-2 text-xs bg-white border border-[#e2e8f0] rounded text-[#0f172a]"
              >
                <option value="Untested">Untested</option>
                <option value="Testing">Testing</option>
                <option value="Validated">Validated</option>
                <option value="Invalidated">Invalidated</option>
              </select>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditAssumption(asm)}
                  aria-label="Edit assumption"
                  className="w-10 h-10 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteAssumption(asm.id)}
                  aria-label="Delete assumption"
                  className="w-10 h-10 flex items-center justify-center rounded text-[#94a3b8] hover:bg-[#fee2e2] hover:text-[#ef4444]"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredAssumptions.length === 0 && (
          <div className="p-8 text-center bg-white border border-[#e2e8f0] rounded-[8px] text-xs text-[#64748b]">
            No assumptions match your search or filter.
          </div>
        )}
      </div>

      {/* DESKTOP VIEW: High-Density Table (>= 768px) */}
      <div className="hidden md:block bg-white border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#f8f9fa] border-b border-[#e2e8f0] text-[11px] font-semibold text-[#64748b] tracking-wider">
              <th className="w-20 px-4 py-2.5 font-mono">ID</th>
              <th className="px-4 py-2.5">Assumption Premise</th>
              <th className="w-28 px-4 py-2.5">Category</th>
              <th className="w-28 px-4 py-2.5">Importance</th>
              <th className="w-28 px-4 py-2.5">Confidence</th>
              <th className="w-32 px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5">Planned Validation Experiment</th>
              <th className="w-20 px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {filteredAssumptions.map((asm) => (
              <tr key={asm.id} className="hover:bg-[#faf8ff] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-[#64748b]">
                  {asm.id}
                </td>
                <td className="px-4 py-3 font-medium text-[#0f172a] max-w-xs">
                  {asm.statement}
                </td>
                <td className="px-4 py-3">
                  <span className="bg-[#f8f9fa] border border-[#e2e8f0] px-2 py-0.5 rounded text-[11px]">
                    {asm.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    asm.importance === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'text-slate-600'
                  }`}>
                    {asm.importance}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[#475569]">
                  {asm.confidence}
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(asm.status)}
                </td>
                <td className="px-4 py-3 text-[#64748b] truncate max-w-xs">
                  {asm.nextExperiment}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEditAssumption(asm)}
                      title="Edit"
                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#f1f5f9] text-[#64748b]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteAssumption(asm.id)}
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
