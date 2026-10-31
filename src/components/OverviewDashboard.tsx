import React from 'react';
import { 
  Idea, 
  Assumption, 
  CustomerInterview, 
  Competitor, 
  Experiment, 
  ScoreDimension, 
  NavTab 
} from '../types';
import { 
  Award, 
  CheckSquare, 
  Users, 
  Swords, 
  FlaskConical, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Plus,
  TrendingUp,
  FileText
} from 'lucide-react';

interface OverviewDashboardProps {
  idea: Idea;
  assumptions: Assumption[];
  interviews: CustomerInterview[];
  competitors: Competitor[];
  experiments: Experiment[];
  scorecard: ScoreDimension[];
  onNavigate: (tab: NavTab) => void;
  onOpenNewExperiment: () => void;
  onOpenNewInterview: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  idea,
  assumptions,
  interviews,
  competitors,
  experiments,
  scorecard,
  onNavigate,
  onOpenNewExperiment,
  onOpenNewInterview
}) => {
  // Metrics calculation
  const totalAssumptions = assumptions.length;
  const validatedAssumptions = assumptions.filter(a => a.status === 'Validated').length;
  const assumptionPercent = totalAssumptions > 0 ? Math.round((validatedAssumptions / totalAssumptions) * 100) : 0;

  const totalInterviews = interviews.length;
  const avgPainScore = totalInterviews > 0 
    ? (interviews.reduce((acc, curr) => acc + curr.painIntensity, 0) / totalInterviews).toFixed(1)
    : '0';

  const runningExperiments = experiments.filter(e => e.status === 'Running').length;
  const highThreatCompetitors = competitors.filter(c => c.threatLevel === 'High').length;

  // Validation Score calculation from scorecard dimensions
  const totalScore = scorecard.reduce((sum, dim) => sum + (dim.score * (dim.weight / 4)), 0);
  const roundedScore = Math.round(totalScore);

  return (
    <div className="space-y-5 pb-8">
      {/* Hero: Current Idea Summary & Validation Score */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 sm:p-6 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[#64748b] bg-[#f8f9fa] border border-[#e2e8f0] px-2 py-0.5 rounded">
                {idea.id}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46]">
                {idea.status}
              </span>
              <span className="text-xs text-[#64748b]">Created {idea.createdAt}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#0f172a] break-words">
              {idea.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748b] break-words leading-relaxed max-w-3xl">
              {idea.tagline}
            </p>
          </div>

          {/* Validation Progress Score Card */}
          <div className="flex items-center gap-4 bg-[#faf8ff] border border-[#e2e8f0] p-3.5 sm:p-4 rounded-[8px] shrink-0 self-start md:self-auto w-full md:w-auto">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-white border-2 border-[#4f46e5] shrink-0">
              <span className="font-mono text-lg sm:text-xl font-bold text-[#4f46e5]">
                {roundedScore}
              </span>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">
                Validation Score
              </div>
              <div className="text-xs font-medium text-[#0f172a] mt-0.5">
                {roundedScore >= 70 ? 'High Empirical Traction' : roundedScore >= 45 ? 'Promising Signals' : 'Early Discovery Stage'}
              </div>
              <button
                onClick={() => onNavigate('scorecard')}
                className="text-[11px] font-medium text-[#4f46e5] hover:underline flex items-center gap-1 mt-1"
              >
                <span>View Scorecard breakdown</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards: Responsive Grid (1 col on mobile, 2 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Assumptions */}
        <div 
          onClick={() => onNavigate('assumptions')}
          className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 hover:border-[#cbd5e1] transition-all cursor-pointer shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] group"
        >
          <div className="flex items-center justify-between text-xs text-[#64748b] mb-1">
            <span className="font-medium">Assumptions Tested</span>
            <CheckSquare className="w-4 h-4 text-[#4f46e5] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold text-[#0f172a] tabular-nums">
              {assumptionPercent}%
            </span>
            <span className="text-xs text-[#64748b]">
              ({validatedAssumptions}/{totalAssumptions})
            </span>
          </div>
          <div className="w-full bg-[#f1f5f9] h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-[#10b981] h-full rounded-full transition-all"
              style={{ width: `${assumptionPercent}%` }}
            />
          </div>
        </div>

        {/* Card 2: Interviews */}
        <div 
          onClick={() => onNavigate('interviews')}
          className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 hover:border-[#cbd5e1] transition-all cursor-pointer shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] group"
        >
          <div className="flex items-center justify-between text-xs text-[#64748b] mb-1">
            <span className="font-medium">Customer Interviews</span>
            <Users className="w-4 h-4 text-[#4f46e5] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold text-[#0f172a] tabular-nums">
              {totalInterviews}
            </span>
            <span className="text-xs text-[#64748b]">
              completed
            </span>
          </div>
          <div className="text-[11px] text-[#64748b] mt-1.5 flex items-center gap-1">
            <span>Avg pain score:</span>
            <span className="font-mono font-semibold text-[#0f172a]">{avgPainScore}/5</span>
          </div>
        </div>

        {/* Card 3: Competitors */}
        <div 
          onClick={() => onNavigate('competitors')}
          className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 hover:border-[#cbd5e1] transition-all cursor-pointer shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] group"
        >
          <div className="flex items-center justify-between text-xs text-[#64748b] mb-1">
            <span className="font-medium">Competitors Analyzed</span>
            <Swords className="w-4 h-4 text-[#4f46e5] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold text-[#0f172a] tabular-nums">
              {competitors.length}
            </span>
            <span className="text-xs text-[#991b1b]">
              ({highThreatCompetitors} High Threat)
            </span>
          </div>
          <div className="text-[11px] text-[#64748b] mt-1.5">
            Differentiator defined
          </div>
        </div>

        {/* Card 4: Experiments */}
        <div 
          onClick={() => onNavigate('experiments')}
          className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 hover:border-[#cbd5e1] transition-all cursor-pointer shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] group"
        >
          <div className="flex items-center justify-between text-xs text-[#64748b] mb-1">
            <span className="font-medium">Live Experiments</span>
            <FlaskConical className="w-4 h-4 text-[#4f46e5] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold text-amber-600 tabular-nums">
              {runningExperiments}
            </span>
            <span className="text-xs text-[#64748b]">
              Active in market
            </span>
          </div>
          <div className="text-[11px] text-[#64748b] mt-1.5">
            {experiments.filter(e => e.status === 'Completed').length} completed runs
          </div>
        </div>
      </div>

      {/* Two Column Section on Desktop, Vertically Stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Next Critical Validation Steps */}
        <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 sm:p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#0f172a] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4f46e5]" />
              <span>Priority Validation Next Steps</span>
            </h2>
            <button
              onClick={onOpenNewExperiment}
              className="text-xs text-[#4f46e5] font-medium hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Experiment</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {assumptions.filter(a => a.status === 'Testing' || a.status === 'Untested').slice(0, 3).map((asm) => (
              <div 
                key={asm.id}
                className="p-3 bg-[#f8f9fa] border border-[#e2e8f0] rounded-[6px] hover:border-[#cbd5e1] transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-[#64748b]">{asm.id}</span>
                  <span className={`px-1.5 py-0.2 rounded font-semibold text-[10px] ${
                    asm.importance === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {asm.importance} Importance
                  </span>
                </div>
                <p className="text-xs font-medium text-[#0f172a] leading-snug">
                  {asm.statement}
                </p>
                <div className="text-[11px] text-[#64748b] mt-1.5 flex items-center gap-1">
                  <span className="font-semibold text-[#4f46e5]">Action:</span>
                  <span className="truncate">{asm.nextExperiment}</span>
                </div>
              </div>
            ))}

            {assumptions.filter(a => a.status === 'Testing' || a.status === 'Untested').length === 0 && (
              <div className="py-6 text-center text-xs text-[#64748b]">
                All core assumptions have been validated! Log a new experiment or assumption.
              </div>
            )}
          </div>
        </div>

        {/* Recent Discovery Activity & Interviews */}
        <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 sm:p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#0f172a] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#4f46e5]" />
              <span>Recent Research Feed</span>
            </h2>
            <button
              onClick={onOpenNewInterview}
              className="text-xs text-[#4f46e5] font-medium hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Interview</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {interviews.slice(0, 3).map((int) => (
              <div 
                key={int.id}
                onClick={() => onNavigate('interviews')}
                className="p-3 bg-white border border-[#e2e8f0] rounded-[6px] hover:border-[#4f46e5] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <div className="font-semibold text-xs text-[#0f172a] truncate max-w-[180px]">
                    {int.interviewee} ({int.organization})
                  </div>
                  <span className="font-mono text-[#64748b] text-[10px]">{int.date}</span>
                </div>
                {int.actualQuotes[0] && (
                  <p className="text-[11px] text-[#475569] italic line-clamp-2 leading-relaxed bg-[#f8f9fa] p-1.5 rounded border border-[#e2e8f0]/60">
                    {int.actualQuotes[0]}
                  </p>
                )}
                <div className="text-[10px] text-[#64748b] mt-1.5 flex items-center justify-between">
                  <span>Segment: {int.customerSegment}</span>
                  <span className="font-mono text-emerald-700 font-medium">Pain {int.painIntensity}/5</span>
                </div>
              </div>
            ))}

            {interviews.length === 0 && (
              <div className="py-6 text-center text-xs text-[#64748b]">
                No customer interviews logged yet. Record your first discovery interview!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Problem Statement Card on Dashboard */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 sm:p-5 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#0f172a]">Core Problem Framing</h2>
          <button
            onClick={() => onNavigate('ideas')}
            className="text-xs text-[#4f46e5] font-medium hover:underline flex items-center gap-1"
          >
            <span>Edit in Workspace</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px]">
            <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Target Customer</span>
            <p className="font-medium text-[#0f172a]">{idea.problemStatement.targetCustomer}</p>
          </div>
          <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px]">
            <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Core Pain Point</span>
            <p className="font-medium text-[#0f172a]">{idea.problemStatement.coreProblem}</p>
          </div>
          <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px]">
            <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Current Workaround</span>
            <p className="font-medium text-[#0f172a]">{idea.problemStatement.currentWorkaround}</p>
          </div>
          <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px]">
            <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Negative Consequence</span>
            <p className="font-medium text-[#0f172a]">{idea.problemStatement.negativeConsequence}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
