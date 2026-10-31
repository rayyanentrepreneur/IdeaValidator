import React from 'react';
import { ScoreDimension, Idea, Assumption, CustomerInterview } from '../types';
import { Award, AlertCircle, CheckCircle2, XCircle, Info, Sparkles, ArrowRight } from 'lucide-react';

interface ValidationScorecardProps {
  scorecard: ScoreDimension[];
  onUpdateDimension: (id: string, newScore: number, notes?: string) => void;
  idea: Idea;
  assumptions: Assumption[];
  interviews: CustomerInterview[];
}

export const ValidationScorecard: React.FC<ValidationScorecardProps> = ({
  scorecard,
  onUpdateDimension,
  idea,
  assumptions,
  interviews
}) => {
  // Calculate overall Validation Progress Score
  // sum of: (dimension.score / 4) * dimension.weight
  const totalScore = scorecard.reduce((sum, dim) => sum + (dim.score * (dim.weight / 4)), 0);
  const roundedScore = Math.round(totalScore);

  const scoreLabels = [
    '0 - Severe Risk',
    '1 - Weak Evidence',
    '2 - Promising Signal',
    '3 - Validated',
    '4 - Overwhelming Proof'
  ];

  const supportingAssumptions = assumptions.filter(a => a.status === 'Validated');
  const contradictoryAssumptions = assumptions.filter(a => a.status === 'Invalidated');

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Overall Validation Progress Score Banner */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-5 sm:p-6 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#4f46e5]" />
              <h2 className="text-base font-bold text-[#0f172a]">Empirical Validation Scorecard</h2>
            </div>
            <p className="text-xs text-[#64748b]">
              Weighted multi-dimensional index calculated from recorded customer discovery and quantitative pilots
            </p>
          </div>

          {/* Big Score Callout */}
          <div className="flex items-center gap-3 bg-[#faf8ff] border border-[#e2e8f0] px-4 py-3 rounded-[8px] self-start sm:self-auto">
            <span className="font-mono text-3xl font-extrabold text-[#4f46e5] tabular-nums">
              {roundedScore}
            </span>
            <div className="text-xs">
              <span className="font-semibold text-[#0f172a] block">/ 100 Index</span>
              <span className="text-[11px] text-[#64748b]">
                {roundedScore >= 70 ? 'High Validation' : roundedScore >= 45 ? 'Moderate Validation' : 'High Uncertainty'}
              </span>
            </div>
          </div>
        </div>

        {/* Proportional Progress Bar */}
        <div className="w-full bg-[#f1f5f9] h-2.5 rounded-full mt-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              roundedScore >= 70 ? 'bg-[#10b981]' : roundedScore >= 45 ? 'bg-[#4f46e5]' : 'bg-[#f59e0b]'
            }`}
            style={{ width: `${Math.min(100, Math.max(5, roundedScore))}%` }}
          />
        </div>

        {/* Mandatory Disclaimer */}
        <div className="mt-4 p-3 bg-[#f8f9fa] border border-[#e2e8f0] rounded-[6px] flex items-start gap-2.5 text-xs text-[#64748b]">
          <Info className="w-4 h-4 text-[#64748b] shrink-0 mt-0.5" />
          <p className="italic leading-relaxed">
            "This is a heuristic based on recorded research. It is not a prediction of startup success, market demand, profitability, or product-market fit."
          </p>
        </div>
      </div>

      {/* 2. Assessment Dimensions: Separate Cards on Narrow Screens */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#0f172a]">5 Core Validation Dimensions</h3>

        <div className="space-y-3">
          {scorecard.map((dim) => (
            <div
              key={dim.id}
              className="p-4 sm:p-5 bg-white border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#0f172a]">{dim.title}</h4>
                    <span className="font-mono text-xs text-[#64748b] bg-[#f8f9fa] px-1.5 py-0.5 rounded border border-[#e2e8f0]">
                      Weight: {dim.weight}%
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                    {dim.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-base text-[#4f46e5]">
                    {dim.score} / 4
                  </span>
                  <div className="text-[10px] text-[#64748b]">{scoreLabels[dim.score]}</div>
                </div>
              </div>

              {/* Touch-Friendly 0-4 Assessment Controls (44px min height) */}
              <div>
                <label className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1.5">
                  Update Score Rating (0 = Unvalidated, 4 = Empirical Proof)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[0, 1, 2, 3, 4].map((point) => (
                    <button
                      key={point}
                      onClick={() => onUpdateDimension(dim.id, point, dim.evidenceNotes)}
                      className={`min-h-[44px] flex flex-col items-center justify-center rounded-[6px] border text-xs font-semibold transition-all ${
                        dim.score === point
                          ? 'bg-[#4f46e5] border-[#4f46e5] text-white shadow-sm'
                          : 'bg-[#faf8ff] border-[#e2e8f0] text-[#0f172a] hover:bg-[#eef2ff]'
                      }`}
                    >
                      <span className="font-mono text-sm">{point}</span>
                      <span className="text-[9px] hidden sm:inline truncate px-1 opacity-80">
                        {point === 0 ? 'Risk' : point === 4 ? 'Proof' : point === 3 ? 'Valid' : point === 2 ? 'Signal' : 'Weak'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Evidence Notes Input */}
              <div>
                <label className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">
                  Empirical Evidence & Audit Notes
                </label>
                <input
                  type="text"
                  value={dim.evidenceNotes}
                  onChange={(e) => onUpdateDimension(dim.id, dim.score, e.target.value)}
                  placeholder="Record customer quotes or experiment links supporting this rating..."
                  className="w-full min-h-[40px] px-3 text-xs bg-[#f8f9fa] border border-[#e2e8f0] rounded-[6px] focus:bg-white focus:outline-none focus:border-[#4f46e5]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Evidence Balance: Stacked Vertically on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Supporting Evidence */}
        <div className="p-4 bg-white border border-[#a7f3d0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#065f46]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Validated Supporting Signals ({supportingAssumptions.length})</span>
          </div>
          <div className="space-y-1.5 text-xs">
            {supportingAssumptions.map(a => (
              <div key={a.id} className="p-2.5 bg-[#ecfdf5]/40 border border-[#a7f3d0]/60 rounded-[6px]">
                <div className="font-mono text-[10px] text-[#065f46] font-semibold">{a.id} · {a.category}</div>
                <div className="font-medium text-[#0f172a] mt-0.5">{a.statement}</div>
              </div>
            ))}
            {supportingAssumptions.length === 0 && (
              <p className="text-xs text-[#64748b] py-2">No validated assumptions yet.</p>
            )}
          </div>
        </div>

        {/* Contradictory / High Risk Evidence */}
        <div className="p-4 bg-white border border-[#fecaca] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#991b1b]">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Refuted / Contradictory Signals ({contradictoryAssumptions.length})</span>
          </div>
          <div className="space-y-1.5 text-xs">
            {contradictoryAssumptions.map(a => (
              <div key={a.id} className="p-2.5 bg-[#fef2f2]/40 border border-[#fecaca]/60 rounded-[6px]">
                <div className="font-mono text-[10px] text-[#991b1b] font-semibold">{a.id} · {a.category}</div>
                <div className="font-medium text-[#0f172a] mt-0.5">{a.statement}</div>
              </div>
            ))}
            {contradictoryAssumptions.length === 0 && (
              <p className="text-xs text-[#64748b] py-2">Zero refuted assumptions currently recorded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
