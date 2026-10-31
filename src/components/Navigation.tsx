import React, { useEffect } from 'react';
import { 
  LayoutDashboard, 
  Lightbulb, 
  CheckSquare, 
  Users, 
  Swords, 
  Award, 
  FlaskConical, 
  Settings, 
  Menu, 
  X, 
  ChevronRight,
  FolderOpen,
  Plus
} from 'lucide-react';
import { NavTab, Idea } from '../types';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  ideas: Idea[];
  selectedIdeaId: string;
  onSelectIdea: (id: string) => void;
  onOpenNewIdea: () => void;
  isMobileDrawerOpen: boolean;
  setIsMobileDrawerOpen: (open: boolean) => void;
  counts: {
    assumptions: number;
    interviews: number;
    competitors: number;
    experiments: number;
  };
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  ideas,
  selectedIdeaId,
  onSelectIdea,
  onOpenNewIdea,
  isMobileDrawerOpen,
  setIsMobileDrawerOpen,
  counts
}) => {
  const currentIdea = ideas.find(i => i.id === selectedIdeaId) || ideas[0];

  // Prevent background scrolling while mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileDrawerOpen, setIsMobileDrawerOpen]);

  const navItems = [
    { id: 'overview' as NavTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'ideas' as NavTab, label: 'My Ideas', icon: Lightbulb, count: ideas.length },
    { id: 'assumptions' as NavTab, label: 'Assumptions Tracker', icon: CheckSquare, count: counts.assumptions },
    { id: 'interviews' as NavTab, label: 'Customer Research', icon: Users, count: counts.interviews },
    { id: 'competitors' as NavTab, label: 'Competitors', icon: Swords, count: counts.competitors },
    { id: 'scorecard' as NavTab, label: 'Validation Scorecard', icon: Award },
    { id: 'experiments' as NavTab, label: 'Experiments', icon: FlaskConical, count: counts.experiments },
    { id: 'settings' as NavTab, label: 'Settings & Data', icon: Settings }
  ];

  const handleNavClick = (tabId: NavTab) => {
    onSelectTab(tabId);
    setIsMobileDrawerOpen(false);
  };

  return (
    <>
      {/* Top Navigation Bar: Mobile & Tablet Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-3 sm:px-6 bg-white border-b border-[#e2e8f0] md:hidden">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded-[6px] text-[#0f172a] hover:bg-[#f1f5f9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f46e5]"
          >
            <Menu className="w-5 h-5 text-[#0f172a]" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" aria-hidden="true" />
            <span className="text-[15px] font-bold tracking-tight text-[#0f172a]">
              IdeaValidator
            </span>
          </div>
        </div>

        {/* Quick Idea Picker on Mobile Header */}
        <div className="flex items-center gap-2">
          {ideas.length > 0 && (
            <select
              value={selectedIdeaId}
              onChange={(e) => onSelectIdea(e.target.value)}
              aria-label="Active Idea Selector"
              className="h-9 px-2 text-xs font-medium bg-[#f8f9fa] border border-[#e2e8f0] rounded-[6px] text-[#0f172a] max-w-[130px] sm:max-w-[200px] truncate focus:outline-none focus:border-[#4f46e5]"
            >
              {ideas.map(i => (
                <option key={i.id} value={i.id}>
                  {i.title}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={onOpenNewIdea}
            title="Create new idea"
            aria-label="Create new idea"
            className="w-9 h-9 flex items-center justify-center rounded-[6px] bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Desktop Top Bar (Hidden on Mobile) */}
      <header className="hidden md:flex sticky top-0 z-30 items-center justify-between h-14 px-6 bg-white border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" aria-hidden="true" />
            <span className="text-[15px] font-bold tracking-tight text-[#0f172a]">
              IdeaValidator
            </span>
          </div>
          <span className="text-[#cbd5e1]">/</span>
          <div className="flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-[#64748b]" />
            <select
              value={selectedIdeaId}
              onChange={(e) => onSelectIdea(e.target.value)}
              aria-label="Select idea workspace"
              className="text-xs font-semibold text-[#0f172a] bg-transparent border-0 hover:bg-[#f1f5f9] rounded px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
            >
              {ideas.map(i => (
                <option key={i.id} value={i.id}>
                  {i.title} ({i.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#64748b] bg-[#f8f9fa] border border-[#e2e8f0] px-2.5 py-1 rounded-[6px]">
            <span>Validation Score:</span>
            <span className="font-mono font-bold text-[#4f46e5]">{currentIdea?.validationScore ?? 0}/100</span>
          </div>
          <button
            onClick={onOpenNewIdea}
            className="inline-flex items-center gap-1.5 h-8 px-3.5 text-xs font-medium text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Idea</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Slide-in with Backdrop) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-[280px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />
                  <span className="font-bold text-sm text-[#0f172a]">IdeaValidator</span>
                </div>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  aria-label="Close navigation"
                  className="w-10 h-10 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Active Idea Card in Drawer */}
              {currentIdea && (
                <div className="p-3 mx-3 my-2 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px]">
                  <div className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">
                    Current Idea
                  </div>
                  <div className="font-semibold text-xs text-[#0f172a] mt-0.5 truncate">
                    {currentIdea.title}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748b] mt-1">
                    <span className="font-mono text-[#4f46e5] font-semibold">{currentIdea.validationScore}/100</span>
                    <span className="bg-white border border-[#e2e8f0] px-1.5 py-0.2 rounded text-[10px]">
                      {currentIdea.status}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <nav className="p-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between min-h-[44px] px-3 rounded-[6px] text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#eef2ff] text-[#4f46e5] font-semibold'
                          : 'text-[#0f172a] hover:bg-[#f8f9fa]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#4f46e5]' : 'text-[#64748b]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className="font-mono text-[11px] text-[#64748b] tabular-nums">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-[#e2e8f0] bg-[#f8f9fa]">
              <button
                onClick={() => {
                  onOpenNewIdea();
                  setIsMobileDrawerOpen(false);
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#4f46e5] text-white rounded-[6px] text-xs font-medium hover:bg-[#4338ca] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Idea Workspace</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Permanent 240px) */}
      <aside className="hidden md:flex flex-col justify-between w-[240px] shrink-0 bg-white border-r border-[#e2e8f0] h-[calc(100vh-3.5rem)] select-none">
        <div>
          {/* Active Workspace Selector */}
          <div className="p-3 border-b border-[#e2e8f0]">
            <div className="text-[10px] font-semibold tracking-wider text-[#64748b] uppercase mb-1">
              Validation Workspace
            </div>
            <select
              value={selectedIdeaId}
              onChange={(e) => onSelectIdea(e.target.value)}
              className="w-full text-xs font-semibold text-[#0f172a] bg-[#f8f9fa] border border-[#e2e8f0] rounded-[6px] p-1.5 focus:outline-none focus:border-[#4f46e5]"
            >
              {ideas.map(i => (
                <option key={i.id} value={i.id}>
                  {i.title}
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[5px] text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#4f46e5] font-semibold'
                      : 'text-[#0f172a] hover:bg-[#f8f9fa]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#4f46e5]' : 'text-[#64748b]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="font-mono text-[11px] text-[#64748b] tabular-nums shrink-0">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Sidebar Footer */}
        <div className="p-3 border-t border-[#e2e8f0] bg-[#faf8ff]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#64748b]">Idea Stage:</span>
            <span className="font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded text-[11px]">
              {currentIdea?.status ?? 'Draft'}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
