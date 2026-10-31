import React from 'react';
import { 
  Lightbulb, 
  Grid2X2, 
  FlaskConical, 
  Radio, 
  FileText, 
  ChevronRight, 
  PanelLeftClose,
  PanelLeftOpen,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { DomainCategory, EvidenceStatus } from '../types';

interface SidebarProps {
  currentTab: 'grid' | 'matrix' | 'experiments' | 'signals' | 'synthesis';
  onSelectTab: (tab: 'grid' | 'matrix' | 'experiments' | 'signals' | 'synthesis') => void;
  selectedStatusFilter: EvidenceStatus | 'all';
  onSelectStatusFilter: (status: EvidenceStatus | 'all') => void;
  selectedCategoryFilter: DomainCategory | 'all';
  onSelectCategoryFilter: (category: DomainCategory | 'all') => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  evidenceStats: {
    total: number;
    supported: number;
    inProgress: number;
    invalidated: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  selectedStatusFilter,
  onSelectStatusFilter,
  selectedCategoryFilter,
  onSelectCategoryFilter,
  collapsed,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
  evidenceStats
}) => {
  const categories: DomainCategory[] = [
    'Enterprise Pricing',
    'Retention & Cohorts',
    'TAM & Market Cap',
    'Product Mechanics',
    'CAC & Acquisition',
    'Unit Economics'
  ];

  // If collapsed on desktop
  if (collapsed && !mobileOpen) {
    return (
      <aside className="hidden md:flex w-14 shrink-0 bg-white border-r border-neutral-200/80 flex-col items-center py-3 justify-between select-none">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onToggleCollapse}
            title="Expand Sidebar"
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
          <div className="w-6 h-[1px] bg-neutral-200 my-1" />
          <button
            onClick={() => onSelectTab('grid')}
            title="Ideas Vault"
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              currentTab === 'grid' ? 'bg-violet-50 text-violet-700' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectTab('matrix')}
            title="Validation Matrix"
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              currentTab === 'matrix' ? 'bg-violet-50 text-violet-700' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectTab('experiments')}
            title="Test Experiments"
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              currentTab === 'experiments' ? 'bg-violet-50 text-violet-700' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectTab('signals')}
            title="Market Signals"
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              currentTab === 'signals' ? 'bg-violet-50 text-violet-700' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <Radio className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectTab('synthesis')}
            title="Strategy Memo"
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
              currentTab === 'synthesis' ? 'bg-violet-50 text-violet-700' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>

        <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-medium">
          IV
        </div>
      </aside>
    );
  }

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full text-[13px] select-none">
      <div className="p-3 space-y-4 overflow-y-auto">
        {/* Workspace Title & Minimize */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-neutral-900">
            Workspace
          </span>
          <div className="flex items-center gap-1">
            {mobileOpen && (
              <button
                onClick={onCloseMobile}
                className="md:hidden p-1 text-neutral-400 hover:text-neutral-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onToggleCollapse}
              title="Collapse sidebar"
              className="hidden md:flex p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-100"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Primary Views */}
        <div className="space-y-0.5">
          <button
            onClick={() => { onSelectTab('grid'); onCloseMobile?.(); }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              currentTab === 'grid'
                ? 'bg-violet-50 text-violet-700 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-neutral-500" />
              <span>Ideas Vault</span>
            </div>
            <span className="font-mono text-xs text-neutral-400 tabular-nums">
              {evidenceStats.total}
            </span>
          </button>

          <button
            onClick={() => { onSelectTab('matrix'); onCloseMobile?.(); }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              currentTab === 'matrix'
                ? 'bg-violet-50 text-violet-700 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Grid2X2 className="w-4 h-4 text-neutral-500" />
              <span>Validation Matrix</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">
              2x2
            </span>
          </button>

          <button
            onClick={() => { onSelectTab('experiments'); onCloseMobile?.(); }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              currentTab === 'experiments'
                ? 'bg-violet-50 text-violet-700 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-neutral-500" />
              <span>Test Runs</span>
            </div>
            <span className="font-mono text-[11px] text-amber-700 bg-amber-50 px-1.5 rounded">
              2 active
            </span>
          </button>

          <button
            onClick={() => { onSelectTab('signals'); onCloseMobile?.(); }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              currentTab === 'signals'
                ? 'bg-violet-50 text-violet-700 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-neutral-500" />
              <span>Market Signals</span>
            </div>
            <span className="font-mono text-xs text-neutral-400">4</span>
          </button>

          <button
            onClick={() => { onSelectTab('synthesis'); onCloseMobile?.(); }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
              currentTab === 'synthesis'
                ? 'bg-violet-50 text-violet-700 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-500" />
              <span>Strategy Memo</span>
            </div>
          </button>
        </div>

        {/* Validation Status Filter */}
        <div className="pt-2 border-t border-neutral-100 space-y-0.5">
          <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Validation Status
          </div>
          <button
            onClick={() => onSelectStatusFilter('all')}
            className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-xs transition-colors ${
              selectedStatusFilter === 'all'
                ? 'bg-neutral-100 text-neutral-900 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <span>All Ideas</span>
            <span className="font-mono text-neutral-400 tabular-nums">{evidenceStats.total}</span>
          </button>

          <button
            onClick={() => onSelectStatusFilter('supported')}
            className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-xs transition-colors ${
              selectedStatusFilter === 'supported'
                ? 'bg-emerald-50 text-emerald-800 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Validated</span>
            </div>
            <span className="font-mono text-emerald-700 tabular-nums">{evidenceStats.supported}</span>
          </button>

          <button
            onClick={() => onSelectStatusFilter('in_progress')}
            className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-xs transition-colors ${
              selectedStatusFilter === 'in_progress'
                ? 'bg-amber-50 text-amber-900 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Testing</span>
            </div>
            <span className="font-mono text-amber-800 tabular-nums">{evidenceStats.inProgress}</span>
          </button>

          <button
            onClick={() => onSelectStatusFilter('invalidated')}
            className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-xs transition-colors ${
              selectedStatusFilter === 'invalidated'
                ? 'bg-rose-50 text-rose-800 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Refuted / Pivot</span>
            </div>
            <span className="font-mono text-rose-700 tabular-nums">{evidenceStats.invalidated}</span>
          </button>
        </div>

        {/* Domain Taxonomy */}
        <div className="pt-2 border-t border-neutral-100 space-y-0.5">
          <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Domain Focus
          </div>
          <button
            onClick={() => onSelectCategoryFilter('all')}
            className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-xs transition-colors ${
              selectedCategoryFilter === 'all'
                ? 'bg-neutral-100 text-neutral-900 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategoryFilter(cat)}
              className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md text-xs transition-colors ${
                selectedCategoryFilter === cat
                  ? 'bg-violet-50 text-violet-700 font-medium'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <span className="truncate">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Founder Status Footer */}
      <div className="p-3 border-t border-neutral-200/80 bg-neutral-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
            ER
          </div>
          <div className="truncate">
            <div className="font-medium text-xs text-neutral-900 truncate">Elena Rostova</div>
            <div className="text-[10px] text-neutral-500 truncate">Lead Strategist</div>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500" title="All changes saved" />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[230px] shrink-0 bg-white border-r border-neutral-200/80 h-[calc(100vh-3.5rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div 
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs" 
            onClick={onCloseMobile} 
          />
          <aside className="relative w-64 max-w-[80vw] bg-white border-r border-neutral-200 h-full z-50 shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
