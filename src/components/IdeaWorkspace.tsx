import React, { useState } from 'react';
import { 
  Idea, 
  CustomerPersona 
} from '../types';
import { 
  Lightbulb, 
  Copy, 
  Archive, 
  Trash2, 
  Plus, 
  Edit3, 
  Save, 
  Check, 
  X,
  UserCheck,
  Target,
  Layers,
  ArrowRight
} from 'lucide-react';

interface IdeaWorkspaceProps {
  ideas: Idea[];
  selectedIdeaId: string;
  onSelectIdea: (id: string) => void;
  onUpdateIdea: (updated: Idea) => void;
  onDuplicateIdea: (id: string) => void;
  onDeleteIdea: (id: string) => void;
  onOpenCreateIdea: () => void;
}

export const IdeaWorkspace: React.FC<IdeaWorkspaceProps> = ({
  ideas,
  selectedIdeaId,
  onSelectIdea,
  onUpdateIdea,
  onDuplicateIdea,
  onDeleteIdea,
  onOpenCreateIdea
}) => {
  const currentIdea = ideas.find(i => i.id === selectedIdeaId) || ideas[0];
  const [activeTab, setActiveTab] = useState<'problem' | 'personas' | 'details'>('problem');
  const [isEditing, setIsEditing] = useState(false);

  // Form states for editing
  const [editTitle, setEditTitle] = useState(currentIdea?.title || '');
  const [editTagline, setEditTagline] = useState(currentIdea?.tagline || '');
  const [editDescription, setEditDescription] = useState(currentIdea?.description || '');
  const [editStatus, setEditStatus] = useState(currentIdea?.status || 'In Validation');
  const [editTargetMarket, setEditTargetMarket] = useState(currentIdea?.targetMarket || '');
  const [editBusinessModel, setEditBusinessModel] = useState(currentIdea?.businessModel || '');

  // Problem statement state
  const [targetCustomer, setTargetCustomer] = useState(currentIdea?.problemStatement.targetCustomer || '');
  const [coreProblem, setCoreProblem] = useState(currentIdea?.problemStatement.coreProblem || '');
  const [currentWorkaround, setCurrentWorkaround] = useState(currentIdea?.problemStatement.currentWorkaround || '');
  const [negativeConsequence, setNegativeConsequence] = useState(currentIdea?.problemStatement.negativeConsequence || '');

  // Sync state if selected idea changes
  React.useEffect(() => {
    if (currentIdea) {
      setEditTitle(currentIdea.title);
      setEditTagline(currentIdea.tagline);
      setEditDescription(currentIdea.description);
      setEditStatus(currentIdea.status);
      setEditTargetMarket(currentIdea.targetMarket);
      setEditBusinessModel(currentIdea.businessModel);
      setTargetCustomer(currentIdea.problemStatement.targetCustomer);
      setCoreProblem(currentIdea.problemStatement.coreProblem);
      setCurrentWorkaround(currentIdea.problemStatement.currentWorkaround);
      setNegativeConsequence(currentIdea.problemStatement.negativeConsequence);
      setIsEditing(false);
    }
  }, [currentIdea?.id]);

  const handleSave = () => {
    if (!currentIdea) return;
    const updated: Idea = {
      ...currentIdea,
      title: editTitle,
      tagline: editTagline,
      description: editDescription,
      status: editStatus as any,
      targetMarket: editTargetMarket,
      businessModel: editBusinessModel,
      problemStatement: {
        targetCustomer,
        coreProblem,
        currentWorkaround,
        negativeConsequence
      }
    };
    onUpdateIdea(updated);
    setIsEditing(false);
  };

  if (!currentIdea) {
    return (
      <div className="p-8 text-center bg-white border border-[#e2e8f0] rounded-[8px]">
        <Lightbulb className="w-8 h-8 text-[#94a3b8] mx-auto mb-2" />
        <p className="text-sm font-semibold text-[#0f172a]">No ideas in your workspace yet</p>
        <button
          onClick={onOpenCreateIdea}
          className="mt-3 px-4 py-2 min-h-[44px] bg-[#4f46e5] text-white rounded-[6px] text-xs font-medium"
        >
          Create First Idea
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Idea Selector Cards: Responsive (1 column on mobile, 2 on tablet, 3 on desktop) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-sm font-bold text-[#0f172a]">All Tracked Ideas ({ideas.length})</h2>
            <p className="text-xs text-[#64748b]">Select an idea to inspect or edit assumptions and customer research</p>
          </div>
          <button
            onClick={onOpenCreateIdea}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 text-xs font-medium text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Idea</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ideas.map((idea) => {
            const isSelected = idea.id === selectedIdeaId;

            return (
              <div
                key={idea.id}
                onClick={() => onSelectIdea(idea.id)}
                className={`p-4 rounded-[8px] border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#4f46e5] shadow-[0_0_0_1.5px_#4f46e5]'
                    : 'bg-white border-[#e2e8f0] hover:border-[#cbd5e1]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <span className="font-mono text-[11px] text-[#64748b] bg-[#f8f9fa] px-1.5 py-0.5 rounded border border-[#e2e8f0]">
                      {idea.id}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      idea.status === 'Validated' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : idea.status === 'Archived'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {idea.status}
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm text-[#0f172a] break-words">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-[#64748b] line-clamp-2 mt-1 leading-relaxed">
                    {idea.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#4f46e5] font-semibold">
                    <span>Score:</span>
                    <span>{idea.validationScore}/100</span>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onDuplicateIdea(idea.id)}
                      title="Duplicate idea"
                      aria-label="Duplicate idea"
                      className="w-8 h-8 flex items-center justify-center rounded text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {ideas.length > 1 && (
                      <button
                        onClick={() => onDeleteIdea(idea.id)}
                        title="Delete idea"
                        aria-label="Delete idea"
                        className="w-8 h-8 flex items-center justify-center rounded text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#fee2e2]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Idea Workspace Tabs: Horizontally Scrollable on Mobile */}
      <div className="bg-white border border-[#e2e8f0] rounded-[8px] shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] overflow-hidden">
        {/* Workspace Action Header */}
        <div className="p-4 border-b border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#faf8ff]">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">
              Active Workspace
            </span>
            <h2 className="text-base font-bold text-[#0f172a] truncate">
              {currentIdea.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="min-h-[40px] px-3 text-xs font-medium text-[#64748b] hover:text-[#0f172a] bg-white border border-[#e2e8f0] rounded-[6px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="min-h-[40px] px-3.5 text-xs font-medium text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="min-h-[40px] px-3.5 text-xs font-medium text-[#0f172a] bg-white border border-[#e2e8f0] hover:bg-[#f8f9fa] rounded-[6px] flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#64748b]" />
                <span>Edit Workspace</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation: Horizontally scrollable tab bar on mobile */}
        <div className="flex border-b border-[#e2e8f0] bg-white overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('problem')}
            className={`min-h-[44px] px-4 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'problem'
                ? 'border-[#4f46e5] text-[#4f46e5] bg-[#faf8ff]'
                : 'border-transparent text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Problem Statement Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('personas')}
            className={`min-h-[44px] px-4 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'personas'
                ? 'border-[#4f46e5] text-[#4f46e5] bg-[#faf8ff]'
                : 'border-transparent text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Customer Personas ({currentIdea.personas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('details')}
            className={`min-h-[44px] px-4 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'details'
                ? 'border-[#4f46e5] text-[#4f46e5] bg-[#faf8ff]'
                : 'border-transparent text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Market & Business Model</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 text-xs text-[#0f172a]">
          {/* TAB 1: Problem Statement Builder */}
          {activeTab === 'problem' && (
            <div className="space-y-4 max-w-3xl">
              <div>
                <h3 className="text-sm font-semibold text-[#0f172a]">The 4-Part Empirical Problem Framework</h3>
                <p className="text-xs text-[#64748b] mt-0.5">
                  Articulate exactly who suffers, what fails, how they cope today, and the measurable cost.
                </p>
              </div>

              <div className="space-y-4">
                {/* Part 1 */}
                <div>
                  <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1">
                    1. Who specifically has this problem? (Target Customer)
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={targetCustomer}
                      onChange={(e) => setTargetCustomer(e.target.value)}
                      className="w-full min-h-[44px] px-3 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
                    />
                  ) : (
                    <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px] font-medium leading-relaxed">
                      {currentIdea.problemStatement.targetCustomer}
                    </div>
                  )}
                </div>

                {/* Part 2 */}
                <div>
                  <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1">
                    2. What is the acute pain point? (Core Problem)
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={coreProblem}
                      onChange={(e) => setCoreProblem(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
                    />
                  ) : (
                    <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px] font-medium leading-relaxed">
                      {currentIdea.problemStatement.coreProblem}
                    </div>
                  )}
                </div>

                {/* Part 3 */}
                <div>
                  <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1">
                    3. How do they solve it right now? (Current Workaround)
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={currentWorkaround}
                      onChange={(e) => setCurrentWorkaround(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
                    />
                  ) : (
                    <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px] font-medium leading-relaxed">
                      {currentIdea.problemStatement.currentWorkaround}
                    </div>
                  )}
                </div>

                {/* Part 4 */}
                <div>
                  <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1">
                    4. What is the measurable damage if unsolved? (Negative Consequence)
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={negativeConsequence}
                      onChange={(e) => setNegativeConsequence(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
                    />
                  ) : (
                    <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px] font-medium leading-relaxed text-[#991b1b]">
                      {currentIdea.problemStatement.negativeConsequence}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Customer Personas */}
          {activeTab === 'personas' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-[#0f172a]">Target Customer Personas</h3>
                  <p className="text-xs text-[#64748b]">Buyer profiles, willingness to pay thresholds, and acquisition channels</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentIdea.personas.map((persona) => (
                  <div key={persona.id} className="p-4 bg-[#faf8ff] border border-[#e2e8f0] rounded-[8px] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#0f172a]">{persona.name}</h4>
                        <div className="text-xs text-[#64748b]">{persona.role} · {persona.companyType}</div>
                      </div>
                      <span className="font-mono text-xs text-[#4f46e5] font-semibold bg-white border border-[#c7d2fe] px-2 py-0.5 rounded">
                        {persona.willingnessToPay}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold text-[#64748b] uppercase block mb-1">Acute Pain Points</span>
                      <ul className="space-y-1">
                        {persona.painPoints.map((pain, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-[#0f172a]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-1.5 shrink-0" />
                            <span>{pain}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-[#e2e8f0] text-[11px] text-[#64748b]">
                      <span className="font-semibold text-[#0f172a]">Acquisition Channel:</span> {persona.primaryChannel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Market & Details */}
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1">
                  Target Market Segment
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editTargetMarket}
                    onChange={(e) => setEditTargetMarket(e.target.value)}
                    className="w-full min-h-[44px] px-3 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
                  />
                ) : (
                  <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px] font-medium">
                    {currentIdea.targetMarket}
                  </div>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1">
                  Monetization Model
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editBusinessModel}
                    onChange={(e) => setEditBusinessModel(e.target.value)}
                    className="w-full min-h-[44px] px-3 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
                  />
                ) : (
                  <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px] font-medium">
                    {currentIdea.businessModel}
                  </div>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider block mb-1">
                  Comprehensive Concept Description
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-[#e2e8f0] rounded-[6px]"
                  />
                ) : (
                  <div className="p-3 bg-[#faf8ff] border border-[#e2e8f0] rounded-[6px] leading-relaxed">
                    {currentIdea.description}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
