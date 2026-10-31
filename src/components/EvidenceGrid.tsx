import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  Filter, 
  Check, 
  SlidersHorizontal,
  Plus,
  Inbox
} from 'lucide-react';
import { EvidenceItem, EvidenceStatus, DomainCategory } from '../types';
import { StatusBadge } from './StatusBadge';

interface EvidenceGridProps {
  items: EvidenceItem[];
  selectedItem: EvidenceItem | null;
  onSelectItem: (item: EvidenceItem) => void;
  onUpdateStatus: (id: string, status: EvidenceStatus) => void;
  onOpenNewIdea?: () => void;
}

export const EvidenceGrid: React.FC<EvidenceGridProps> = ({
  items,
  selectedItem,
  onSelectItem,
  onUpdateStatus,
  onOpenNewIdea
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<EvidenceStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<DomainCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'confidence' | 'impact' | 'date' | 'sampleSize'>('confidence');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (statusFilter !== 'all' && item.status !== statusFilter) return false;
        if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchStatement = item.hypothesisStatement.toLowerCase().includes(q);
          const matchId = item.id.toLowerCase().includes(q);
          const matchSource = item.sourceName.toLowerCase().includes(q);
          if (!matchTitle && !matchStatement && !matchId && !matchSource) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortBy === 'confidence') comp = a.confidenceScore - b.confidenceScore;
        else if (sortBy === 'impact') comp = a.impactScore - b.impactScore;
        else if (sortBy === 'date') comp = a.lastAudited.localeCompare(b.lastAudited);
        else if (sortBy === 'sampleSize') comp = a.sampleSize - b.sampleSize;
        return sortOrder === 'desc' ? -comp : comp;
      });
  }, [items, statusFilter, categoryFilter, searchQuery, sortBy, sortOrder]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map(i => i.id));
    }
  };

  const handleToggleRowSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBatchStatus = (status: EvidenceStatus) => {
    selectedIds.forEach(id => onUpdateStatus(id, status));
    setSelectedIds([]);
  };

  const toggleSort = (col: 'confidence' | 'impact' | 'date' | 'sampleSize') => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-white border border-neutral-200/80 rounded-xl shadow-xs overflow-hidden">
      {/* Refined Filter Toolbar */}
      <div className="p-3 border-b border-neutral-100 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Left: Minimalist Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100/80 rounded-lg text-xs font-medium self-start overflow-x-auto max-w-full">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 ${
              statusFilter === 'all'
                ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            All Ideas ({items.length})
          </button>
          <button
            onClick={() => setStatusFilter('supported')}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              statusFilter === 'supported'
                ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Validated</span>
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              statusFilter === 'in_progress'
                ? 'bg-white text-amber-900 shadow-xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Testing</span>
          </button>
          <button
            onClick={() => setStatusFilter('invalidated')}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              statusFilter === 'invalidated'
                ? 'bg-white text-rose-800 shadow-xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Refuted / Pivot</span>
          </button>
        </div>

        {/* Right: Search & Category Dropdown */}
        <div className="flex items-center gap-2">
          {/* Live Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ideas, findings, sources..."
              className="w-full h-8 pl-8 pr-3 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="h-8 px-2.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-700 focus:outline-none focus:border-violet-500 transition-colors hidden sm:block"
          >
            <option value="all">All Domains</option>
            <option value="Enterprise Pricing">Enterprise Pricing</option>
            <option value="CAC & Acquisition">CAC & Acquisition</option>
            <option value="Product Mechanics">Product Mechanics</option>
            <option value="Unit Economics">Unit Economics</option>
            <option value="Retention & Cohorts">Retention & Cohorts</option>
            <option value="TAM & Market Cap">TAM & Market Cap</option>
          </select>
        </div>
      </div>

      {/* Batch Action Bar */}
      {selectedIds.length > 0 && (
        <div className="px-4 py-2 bg-violet-50/70 border-b border-violet-100 flex items-center justify-between text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-violet-900 font-medium">
            <span>{selectedIds.length} ideas selected</span>
            <span className="text-violet-300">·</span>
            <button
              onClick={() => setSelectedIds([])}
              className="text-violet-600 hover:underline"
            >
              Deselect all
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-violet-700 font-medium">Mark as:</span>
            <button
              onClick={() => handleBatchStatus('supported')}
              className="px-2 py-1 text-[11px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md hover:bg-emerald-100 transition-colors"
            >
              Validated
            </button>
            <button
              onClick={() => handleBatchStatus('in_progress')}
              className="px-2 py-1 text-[11px] font-semibold bg-amber-50 border border-amber-200 text-amber-800 rounded-md hover:bg-amber-100 transition-colors"
            >
              Testing
            </button>
            <button
              onClick={() => handleBatchStatus('invalidated')}
              className="px-2 py-1 text-[11px] font-semibold bg-rose-50 border border-rose-200 text-rose-800 rounded-md hover:bg-rose-100 transition-colors"
            >
              Refuted
            </button>
          </div>
        </div>
      )}

      {/* High-Scannability Ideas Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50/60 border-b border-neutral-100 text-[11px] font-semibold text-neutral-400 select-none uppercase tracking-wider">
              <th className="w-10 px-3 py-2.5 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === filteredItems.length}
                  onChange={handleSelectAll}
                  className="w-3.5 h-3.5 rounded border-neutral-300 text-violet-600 focus:ring-0 cursor-pointer"
                  aria-label="Select all rows"
                />
              </th>
              <th className="w-16 px-3 py-2.5 font-mono">ID</th>
              <th className="px-3 py-2.5">Hypothesis & Strategic Premise</th>
              <th className="w-36 px-3 py-2.5">Domain</th>
              <th className="w-28 px-3 py-2.5">Status</th>
              <th 
                onClick={() => toggleSort('confidence')}
                className="w-28 px-3 py-2.5 text-right cursor-pointer hover:text-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Confidence</span>
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th 
                onClick={() => toggleSort('sampleSize')}
                className="w-24 px-3 py-2.5 text-right cursor-pointer hover:text-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Sample</span>
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th className="w-32 px-3 py-2.5">Lead</th>
              <th 
                onClick={() => toggleSort('date')}
                className="w-24 px-3 py-2.5 text-right cursor-pointer hover:text-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Updated</span>
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-[13px] text-neutral-900">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-16 text-center text-neutral-500">
                  <div className="flex flex-col items-center justify-center gap-3 max-w-sm mx-auto">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                      <Inbox className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-neutral-900">No matching ideas found</h4>
                      <p className="text-xs text-neutral-500 mt-1">
                        Try clearing your search query, adjusting your filters, or log a brand new hypothesis.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => { setStatusFilter('all'); setCategoryFilter('all'); setSearchQuery(''); }}
                        className="text-xs font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50"
                      >
                        Reset filters
                      </button>
                      {onOpenNewIdea && (
                        <button
                          onClick={onOpenNewIdea}
                          className="text-xs font-medium text-white bg-violet-600 hover:bg-violet-700 px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Create Idea</span>
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const isChecked = selectedIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className={`cursor-pointer transition-colors group relative h-[44px] ${
                      isSelected
                        ? 'bg-violet-50/60'
                        : 'hover:bg-neutral-50/80'
                    }`}
                  >
                    {/* Active violet left bar indicator */}
                    {isSelected && (
                      <td className="absolute left-0 top-0 bottom-0 w-[3px] bg-violet-600 p-0" />
                    )}

                    {/* Checkbox */}
                    <td className="w-10 px-3 py-1.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleToggleRowSelect(item.id, e as unknown as React.MouseEvent)}
                        className="w-3.5 h-3.5 rounded border-neutral-300 text-violet-600 focus:ring-0 cursor-pointer"
                        aria-label={`Select ${item.title}`}
                      />
                    </td>

                    {/* ID */}
                    <td className="px-3 py-1.5 font-mono text-xs text-neutral-400 whitespace-nowrap">
                      {item.id}
                    </td>

                    {/* Title & Premise */}
                    <td className="px-3 py-1.5 max-w-md">
                      <div className="font-medium text-neutral-900 group-hover:text-violet-700 transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate max-w-sm">
                        {item.hypothesisStatement}
                      </div>
                    </td>

                    {/* Domain Category */}
                    <td className="px-3 py-1.5 text-xs whitespace-nowrap">
                      <span className="text-neutral-600 font-medium">
                        {item.category}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-3 py-1.5 whitespace-nowrap">
                      <StatusBadge status={item.status} size="sm" />
                    </td>

                    {/* Confidence */}
                    <td className="px-3 py-1.5 text-right font-mono text-xs tabular-nums whitespace-nowrap">
                      <span className="font-semibold text-neutral-900">
                        {item.confidenceScore}%
                      </span>
                      <span className="text-[10px] text-neutral-400 ml-1">
                        ±{item.confidenceMargin}%
                      </span>
                    </td>

                    {/* Sample N */}
                    <td className="px-3 py-1.5 text-right font-mono text-xs text-neutral-500 tabular-nums whitespace-nowrap">
                      {item.sampleSize.toLocaleString()}
                    </td>

                    {/* Lead Analyst */}
                    <td className="px-3 py-1.5 text-xs text-neutral-700 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 flex items-center justify-center text-[9px] font-semibold">
                          {item.owner.initials}
                        </div>
                        <span className="truncate">{item.owner.name.split(' ')[0]}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-3 py-1.5 text-right font-mono text-xs text-neutral-400 tabular-nums whitespace-nowrap">
                      {item.lastAudited}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Clean Footer Bar */}
      <div className="px-4 py-2.5 border-t border-neutral-100 bg-neutral-50/40 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-neutral-800">{filteredItems.length}</strong> of {items.length} items</span>
        </div>
        <div className="text-[11px] text-neutral-400 hidden sm:block">
          Select any row to inspect & edit research in detail
        </div>
      </div>
    </div>
  );
};
