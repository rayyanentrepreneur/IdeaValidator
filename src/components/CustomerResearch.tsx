import React, { useState, useMemo } from 'react';
import { CustomerInterview } from '../types';
import { 
  Users, 
  Search, 
  Plus, 
  Calendar, 
  Building, 
  Quote, 
  Compass, 
  CheckCircle2, 
  Clock, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Trash2,
  Sparkles
} from 'lucide-react';

interface CustomerResearchProps {
  interviews: CustomerInterview[];
  onOpenRecordModal: () => void;
  onEditInterview: (interview: CustomerInterview) => void;
  onDeleteInterview: (id: string) => void;
}

export const CustomerResearch: React.FC<CustomerResearchProps> = ({
  interviews,
  onOpenRecordModal,
  onEditInterview,
  onDeleteInterview
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Distinct customer segments
  const segments = useMemo(() => {
    return Array.from(new Set(interviews.map(i => i.customerSegment)));
  }, [interviews]);

  const filteredInterviews = useMemo(() => {
    return interviews.filter((i) => {
      if (segmentFilter !== 'all' && i.customerSegment !== segmentFilter) return false;
      if (statusFilter !== 'all' && i.status !== statusFilter) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = i.interviewee.toLowerCase().includes(q);
        const matchOrg = i.organization.toLowerCase().includes(q);
        const matchFindings = i.keyFindings.toLowerCase().includes(q);
        const matchQuotes = i.actualQuotes.some(quote => quote.toLowerCase().includes(q));
        if (!matchName && !matchOrg && !matchFindings && !matchQuotes) return false;
      }
      return true;
    });
  }, [interviews, segmentFilter, statusFilter, searchQuery]);

  return (
    <div className="space-y-4 pb-12">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div>
          <h2 className="text-sm font-bold text-[#0f172a]">Customer Discovery & Interview Tracker</h2>
          <p className="text-xs text-[#64748b]">
            Separate direct customer verbatim evidence from founder synthesis to eliminate confirmation bias
          </p>
        </div>
        <button
          onClick={onOpenRecordModal}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 text-xs font-medium text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] shadow-sm transition-colors whitespace-nowrap self-stretch sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Record Interview</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-3 space-y-3 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
            <input
              type="text"
              placeholder="Search interviewees, quotes, or key findings..."
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

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`min-h-[44px] px-3.5 text-xs font-medium rounded-[6px] border flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              isFilterOpen || segmentFilter !== 'all' || statusFilter !== 'all'
                ? 'bg-[#eef2ff] border-[#c7d2fe] text-[#4f46e5]'
                : 'bg-white border-[#e2e8f0] text-[#0f172a] hover:bg-[#f8f9fa]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
            {isFilterOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Filter Row */}
        {isFilterOpen && (
          <div className="pt-3 border-t border-[#f1f5f9] grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-150">
            <div>
              <label className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Customer Segment</label>
              <select
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
                className="w-full min-h-[44px] px-2 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
              >
                <option value="all">All Segments ({interviews.length})</option>
                {segments.map((seg) => (
                  <option key={seg} value={seg}>{seg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Interview Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full min-h-[44px] px-2 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
              >
                <option value="all">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Analyzing">Analyzing</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Responsive Interview Cards (Stacked on Mobile, Clean Grid on Desktop) */}
      <div className="space-y-4">
        {filteredInterviews.map((int) => (
          <div
            key={int.id}
            className="p-4 sm:p-5 bg-white border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-4"
          >
            {/* Header: Interviewee, Date, Segment, Pain */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1f5f9] pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-[#64748b] bg-[#f8f9fa] px-1.5 py-0.5 rounded border border-[#e2e8f0]">
                    {int.id}
                  </span>
                  <h3 className="font-bold text-sm text-[#0f172a]">{int.interviewee}</h3>
                  <span className="text-xs text-[#64748b]">·</span>
                  <span className="text-xs text-[#475569]">{int.role} at {int.organization}</span>
                </div>
                <div className="text-[11px] text-[#64748b] flex items-center gap-3">
                  <span>Segment: <strong className="text-[#0f172a]">{int.customerSegment}</strong></span>
                  <span>·</span>
                  <span>{int.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto">
                <div className="flex items-center gap-1.5 bg-[#faf8ff] border border-[#e2e8f0] px-2.5 py-1 rounded-[6px]">
                  <span className="text-[11px] text-[#64748b]">Pain Intensity:</span>
                  <span className="font-mono font-bold text-xs text-[#4f46e5]">{int.painIntensity}/5</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEditInterview(int)}
                    aria-label="Edit interview"
                    className="w-10 h-10 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteInterview(int.id)}
                    aria-label="Delete interview"
                    className="w-10 h-10 flex items-center justify-center rounded text-[#94a3b8] hover:bg-[#fee2e2] hover:text-[#ef4444]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Split Comparison: Actual Customer Quotes vs Founder Interpretation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Direct Customer Quotes */}
              <div className="p-3.5 bg-[#ecfdf5]/30 border border-[#a7f3d0] rounded-[6px] space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#065f46] uppercase tracking-wider">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Direct Customer Quotes (Empirical Grounding)</span>
                </div>
                <div className="space-y-1.5">
                  {int.actualQuotes.map((quote, idx) => (
                    <p key={idx} className="text-xs text-[#0f172a] italic leading-relaxed pl-2 border-l-2 border-[#10b981]">
                      {quote}
                    </p>
                  ))}
                </div>
              </div>

              {/* Founder Interpretation */}
              <div className="p-3.5 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px] space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4f46e5] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Founder Interpretation & Strategic Meaning</span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {int.founderInterpretation}
                </p>
              </div>
            </div>

            {/* Key Findings & Follow-Up Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-2.5 bg-[#f8f9fa] border border-[#e2e8f0] rounded-[6px]">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-0.5">
                  Core Validated Takeaway
                </span>
                <p className="text-[#0f172a] font-medium leading-relaxed">
                  {int.keyFindings}
                </p>
              </div>

              <div className="p-2.5 bg-[#f8f9fa] border border-[#e2e8f0] rounded-[6px]">
                <span className="text-[10px] font-semibold text-[#4f46e5] uppercase block mb-0.5">
                  Follow-up Strategic Action
                </span>
                <p className="text-[#0f172a] font-medium leading-relaxed">
                  {int.followUpActions}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredInterviews.length === 0 && (
          <div className="p-8 text-center bg-white border border-[#e2e8f0] rounded-[8px] text-xs text-[#64748b]">
            No customer discovery interviews found. Record your first conversation to populate research.
          </div>
        )}
      </div>
    </div>
  );
};
