import React, { useState, useEffect, useMemo } from 'react';
import { EvidenceItem, EvidenceStatus, DomainCategory } from './types';
import { INITIAL_EVIDENCE } from './data/initialData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MetricsBanner } from './components/MetricsBanner';
import { EvidenceGrid } from './components/EvidenceGrid';
import { ContextualInspectionDrawer } from './components/ContextualInspectionDrawer';
import { HypothesisMatrix } from './components/HypothesisMatrix';
import { ExperimentsView } from './components/ExperimentsView';
import { MarketSignalsView } from './components/MarketSignalsView';
import { StrategicBriefView } from './components/StrategicBriefView';
import { NewEvidenceModal } from './components/NewEvidenceModal';

const STORAGE_KEY = 'ideavalidator_vault_v1';

export default function App() {
  // Initialize with local storage if available
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return INITIAL_EVIDENCE;
  });

  const [selectedItemId, setSelectedItemId] = useState<string | null>('EVD-101');
  const [activeTab, setActiveTab] = useState<'grid' | 'matrix' | 'experiments' | 'signals' | 'synthesis'>('grid');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<EvidenceStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<DomainCategory | 'all'>('all');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(evidenceList));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [evidenceList]);

  // Selected item object
  const selectedItem = useMemo(() => {
    return evidenceList.find(e => e.id === selectedItemId) || null;
  }, [evidenceList, selectedItemId]);

  // Evidence stats for sidebar
  const evidenceStats = useMemo(() => {
    return {
      total: evidenceList.length,
      supported: evidenceList.filter(e => e.status === 'supported').length,
      inProgress: evidenceList.filter(e => e.status === 'in_progress').length,
      invalidated: evidenceList.filter(e => e.status === 'invalidated').length
    };
  }, [evidenceList]);

  // Handlers
  const handleSelectItem = (item: EvidenceItem) => {
    setSelectedItemId(item.id);
    setDrawerOpen(true);
  };

  const handleUpdateItem = (updated: EvidenceItem) => {
    setEvidenceList(prev => prev.map(item => item.id === updated.id ? updated : item));
  };

  const handleDeleteItem = (id: string) => {
    setEvidenceList(prev => prev.filter(item => item.id !== id));
    if (selectedItemId === id) {
      setSelectedItemId(null);
      setDrawerOpen(false);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: EvidenceStatus) => {
    setEvidenceList(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          lastAudited: new Date().toISOString().split('T')[0],
          auditHistory: [
            {
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              analyst: 'Elena Rostova',
              action: `Status marked as ${newStatus}`
            },
            ...item.auditHistory
          ]
        };
      }
      return item;
    }));
  };

  const handleAddEvidence = (newItem: EvidenceItem) => {
    setEvidenceList(prev => [newItem, ...prev]);
    setSelectedItemId(newItem.id);
    setDrawerOpen(true);
    setActiveTab('grid');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Hypothesis ID',
      'Title',
      'Premise',
      'Category',
      'Status',
      'Confidence Score',
      'Impact Score',
      'Cohort Size',
      'P-Value',
      'Source Name',
      'Last Audited'
    ];
    const rows = evidenceList.map(e => [
      e.id,
      e.hypothesisId,
      `"${e.title.replace(/"/g, '""')}"`,
      `"${e.hypothesisStatement.replace(/"/g, '""')}"`,
      e.category,
      e.status,
      `${e.confidenceScore}%`,
      `${e.impactScore}/10`,
      e.sampleSize,
      e.pValue,
      `"${e.sourceName.replace(/"/g, '""')}"`,
      e.lastAudited
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ideavalidator_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isNewModalOpen) setIsNewModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNewModalOpen]);

  // Compute next ID
  const nextIdNum = useMemo(() => {
    const nums = evidenceList.map(e => parseInt(e.id.replace('EVD-', ''), 10)).filter(n => !isNaN(n));
    return (nums.length ? Math.max(...nums) : 100) + 1;
  }, [evidenceList]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-neutral-900 font-sans antialiased">
      {/* Minimal Top Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenNewEvidence={() => setIsNewModalOpen(true)}
        onExportCSV={handleExportCSV}
        evidenceCount={evidenceList.length}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main Responsive Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Minimal Left Sidebar */}
        <Sidebar
          currentTab={activeTab}
          onSelectTab={setActiveTab}
          selectedStatusFilter={statusFilter}
          onSelectStatusFilter={setStatusFilter}
          selectedCategoryFilter={categoryFilter}
          onSelectCategoryFilter={setCategoryFilter}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          evidenceStats={evidenceStats}
        />

        {/* Central Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 transition-all">
          <div className="max-w-[1400px] mx-auto">
            {/* Scorecard Metric Banner */}
            <MetricsBanner
              evidenceList={evidenceList}
              onFilterByStatus={(st) => {
                setStatusFilter(st);
                setActiveTab('grid');
              }}
            />

            {/* View Switching */}
            {activeTab === 'grid' && (
              <EvidenceGrid
                items={
                  evidenceList.filter(e => {
                    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
                    if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
                    return true;
                  })
                }
                selectedItem={selectedItem}
                onSelectItem={handleSelectItem}
                onUpdateStatus={handleUpdateStatus}
                onOpenNewIdea={() => setIsNewModalOpen(true)}
              />
            )}

            {activeTab === 'matrix' && (
              <HypothesisMatrix
                evidenceList={evidenceList}
                selectedItem={selectedItem}
                onSelectItem={handleSelectItem}
              />
            )}

            {activeTab === 'experiments' && (
              <ExperimentsView
                evidenceList={evidenceList}
                onSelectItem={handleSelectItem}
              />
            )}

            {activeTab === 'signals' && (
              <MarketSignalsView
                evidenceList={evidenceList}
                onSelectItem={handleSelectItem}
              />
            )}

            {activeTab === 'synthesis' && (
              <StrategicBriefView
                evidenceList={evidenceList}
                onSelectItem={handleSelectItem}
              />
            )}
          </div>
        </main>

        {/* Contextual Inspection Drawer (Right 380px on desktop, slide-over on mobile) */}
        {drawerOpen && selectedItem && (
          <ContextualInspectionDrawer
            item={selectedItem}
            onClose={() => setDrawerOpen(false)}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        )}
      </div>

      {/* New Idea Modal */}
      <NewEvidenceModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAddEvidence={handleAddEvidence}
        nextIdNumber={nextIdNum}
      />
    </div>
  );
}
