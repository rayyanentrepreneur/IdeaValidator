import React from 'react';
import { Plus, Download, Sparkles, Menu } from 'lucide-react';

interface HeaderProps {
  activeTab: 'grid' | 'matrix' | 'experiments' | 'signals' | 'synthesis';
  onSelectTab: (tab: 'grid' | 'matrix' | 'experiments' | 'signals' | 'synthesis') => void;
  onOpenNewEvidence: () => void;
  onExportCSV: () => void;
  evidenceCount: number;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenNewEvidence,
  onExportCSV,
  evidenceCount,
  onToggleMobileSidebar
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-6 h-14 px-4 sm:px-6 bg-white/95 backdrop-blur-sm border-b border-neutral-200/80">
      {/* Zone 1: Brand wordmark & mobile toggle */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-1.5 -ml-1 text-neutral-500 hover:text-neutral-900 rounded-md hover:bg-neutral-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <a 
          href="#dashboard" 
          onClick={(e) => { e.preventDefault(); onSelectTab('grid'); }}
          className="flex items-center gap-2 group"
        >
          <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-neutral-900 group-hover:text-violet-600 transition-colors">
            IdeaValidator
          </span>
        </a>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-[13px] font-medium text-neutral-600">
        <button
          onClick={() => onSelectTab('grid')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'grid' 
              ? 'text-violet-700 bg-violet-50/70 font-semibold' 
              : 'hover:text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          Ideas Vault
        </button>
        <button
          onClick={() => onSelectTab('matrix')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'matrix' 
              ? 'text-violet-700 bg-violet-50/70 font-semibold' 
              : 'hover:text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          Validation Matrix
        </button>
        <button
          onClick={() => onSelectTab('experiments')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'experiments' 
              ? 'text-violet-700 bg-violet-50/70 font-semibold' 
              : 'hover:text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          Experiments
        </button>
        <button
          onClick={() => onSelectTab('signals')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'signals' 
              ? 'text-violet-700 bg-violet-50/70 font-semibold' 
              : 'hover:text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          Signals & Citations
        </button>
        <button
          onClick={() => onSelectTab('synthesis')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'synthesis' 
              ? 'text-violet-700 bg-violet-50/70 font-semibold' 
              : 'hover:text-neutral-900 hover:bg-neutral-50'
          }`}
        >
          Strategy Memo
        </button>
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onExportCSV}
          title="Export CSV"
          className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-colors whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-neutral-500" />
          <span>Export CSV</span>
        </button>

        <button
          onClick={onOpenNewEvidence}
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 active:scale-[0.99] shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Idea</span>
        </button>
      </div>
    </header>
  );
};
