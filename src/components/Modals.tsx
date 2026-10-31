import React, { useState } from 'react';
import { X, Plus, Sparkles, Check, Calendar, DollarSign } from 'lucide-react';
import { 
  Idea, 
  Assumption, 
  AssumptionCategory, 
  AssumptionImportance, 
  AssumptionConfidence, 
  CustomerInterview, 
  Competitor, 
  Experiment 
} from '../types';

// ==========================================
// 1. CREATE IDEA MODAL
// ==========================================
interface CreateIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateIdea: (newIdea: Idea) => void;
}

export const CreateIdeaModal: React.FC<CreateIdeaModalProps> = ({
  isOpen,
  onClose,
  onCreateIdea
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [targetCustomer, setTargetCustomer] = useState('');
  const [coreProblem, setCoreProblem] = useState('');
  const [currentWorkaround, setCurrentWorkaround] = useState('');
  const [negativeConsequence, setNegativeConsequence] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [businessModel, setBusinessModel] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim()) return;

    const newIdea: Idea = {
      id: `IDEA-${Math.floor(10 + Math.random() * 90)}`,
      title: title.trim(),
      tagline: tagline.trim(),
      description: tagline.trim(),
      problemStatement: {
        targetCustomer: targetCustomer.trim() || 'Emerging business leaders and teams',
        coreProblem: coreProblem.trim() || 'Operational bottlenecks in existing workflows',
        currentWorkaround: currentWorkaround.trim() || 'Manual spreadsheets and ad-hoc communication',
        negativeConsequence: negativeConsequence.trim() || 'Loss of team velocity and revenue churn'
      },
      personas: [
        {
          id: `PER-${Math.floor(100 + Math.random() * 900)}`,
          name: 'Primary Buyer Persona',
          role: 'Decision Maker',
          companyType: 'Target Segment',
          painPoints: ['Manual workflow latency', 'High overhead'],
          willingnessToPay: '$50/mo or $5k/yr',
          primaryChannel: 'Online Search, Referrals'
        }
      ],
      status: 'In Validation',
      targetMarket: targetMarket.trim() || 'B2B Software',
      businessModel: businessModel.trim() || 'Subscription SaaS',
      validationScore: 40,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onCreateIdea(newIdea);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white border-t sm:border border-[#e2e8f0] rounded-t-[12px] sm:rounded-[8px] w-full max-w-xl max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        <div className="px-4 py-3.5 border-b border-[#e2e8f0] flex items-center justify-between shrink-0">
          <h3 className="font-bold text-sm text-[#0f172a]">Create New Idea Workspace</h3>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-[#0f172a] flex-1">
          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Idea Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. DevFlow AI, BioScribe"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Tagline / One-Liner *</label>
            <input
              type="text"
              required
              placeholder="e.g. Automated PR triage and review acceleration for engineering teams"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Target Customer</label>
              <input
                type="text"
                placeholder="e.g. VP of Engineering at 50-200 eng SaaS"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Target Market</label>
              <input
                type="text"
                placeholder="e.g. B2B DevOps Tooling"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Core Problem Pain Point</label>
            <textarea
              rows={2}
              placeholder="What specifically breaks, wastes money, or causes frustration?"
              value={coreProblem}
              onChange={(e) => setCoreProblem(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Monetization Model</label>
            <input
              type="text"
              placeholder="e.g. $45/seat/month B2B SaaS"
              value={businessModel}
              onChange={(e) => setBusinessModel(e.target.value)}
              className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
            />
          </div>

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 text-xs font-medium text-[#64748b] hover:text-[#0f172a]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 text-xs font-semibold text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Workspace</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 2. ADD / EDIT ASSUMPTION MODAL
// ==========================================
interface AssumptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assumption: Assumption) => void;
  initialData?: Assumption | null;
  ideaId: string;
}

export const AssumptionModal: React.FC<AssumptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  ideaId
}) => {
  const [statement, setStatement] = useState(initialData?.statement || '');
  const [category, setCategory] = useState<AssumptionCategory>(initialData?.category || 'Problem');
  const [importance, setImportance] = useState<AssumptionImportance>(initialData?.importance || 'High');
  const [confidence, setConfidence] = useState<AssumptionConfidence>(initialData?.confidence || 'Low');
  const [nextExperiment, setNextExperiment] = useState(initialData?.nextExperiment || '');
  const [notes, setNotes] = useState(initialData?.notes || '');

  React.useEffect(() => {
    if (initialData) {
      setStatement(initialData.statement);
      setCategory(initialData.category);
      setImportance(initialData.importance);
      setConfidence(initialData.confidence);
      setNextExperiment(initialData.nextExperiment);
      setNotes(initialData.notes);
    } else {
      setStatement('');
      setCategory('Problem');
      setImportance('High');
      setConfidence('Low');
      setNextExperiment('');
      setNotes('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statement.trim()) return;

    const saved: Assumption = {
      id: initialData?.id || `ASM-${Math.floor(100 + Math.random() * 900)}`,
      ideaId,
      statement: statement.trim(),
      category,
      importance,
      confidence,
      status: initialData?.status || 'Untested',
      nextExperiment: nextExperiment.trim() || 'Define validation experiment',
      notes: notes.trim(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white border-t sm:border border-[#e2e8f0] rounded-t-[12px] sm:rounded-[8px] w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        <div className="px-4 py-3.5 border-b border-[#e2e8f0] flex items-center justify-between shrink-0">
          <h3 className="font-bold text-sm text-[#0f172a]">
            {initialData ? 'Edit Assumption' : 'Add Strategic Assumption'}
          </h3>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-[#0f172a] flex-1">
          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">
              Assumption Premise (Must be testable & falsifiable) *
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Engineering managers will allow a third-party tool to read private repo ASTs without mandatory on-premises deployment."
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AssumptionCategory)}
                className="w-full min-h-[44px] px-2 bg-white border border-[#e2e8f0] rounded-[6px] text-xs"
              >
                <option value="Problem">Problem</option>
                <option value="Solution">Solution</option>
                <option value="Customer">Customer</option>
                <option value="Monetization">Monetization</option>
                <option value="Market">Market</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Importance</label>
              <select
                value={importance}
                onChange={(e) => setImportance(e.target.value as AssumptionImportance)}
                className="w-full min-h-[44px] px-2 bg-white border border-[#e2e8f0] rounded-[6px] text-xs"
              >
                <option value="High">High (Existential Risk)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Confidence</label>
              <select
                value={confidence}
                onChange={(e) => setConfidence(e.target.value as AssumptionConfidence)}
                className="w-full min-h-[44px] px-2 bg-white border border-[#e2e8f0] rounded-[6px] text-xs"
              >
                <option value="Low">Low (Untested Leap)</option>
                <option value="Medium">Medium</option>
                <option value="High">High (Proven Evidence)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">
              Planned Next Experiment to Validate
            </label>
            <input
              type="text"
              placeholder="e.g. Conduct 10 infosec discovery interviews with VPs of Eng"
              value={nextExperiment}
              onChange={(e) => setNextExperiment(e.target.value)}
              className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Notes & Context</label>
            <textarea
              rows={2}
              placeholder="Any supporting context or preliminary benchmark..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
            />
          </div>

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 text-xs font-medium text-[#64748b]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 text-xs font-semibold text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] shadow-sm"
            >
              Save Assumption
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 3. RECORD / EDIT INTERVIEW MODAL
// ==========================================
interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (interview: CustomerInterview) => void;
  initialData?: CustomerInterview | null;
  ideaId: string;
}

export const InterviewModal: React.FC<InterviewModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  ideaId
}) => {
  const [interviewee, setInterviewee] = useState(initialData?.interviewee || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [organization, setOrganization] = useState(initialData?.organization || '');
  const [customerSegment, setCustomerSegment] = useState(initialData?.customerSegment || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [quoteInput, setQuoteInput] = useState(initialData?.actualQuotes.join('\n') || '');
  const [founderInterpretation, setFounderInterpretation] = useState(initialData?.founderInterpretation || '');
  const [keyFindings, setKeyFindings] = useState(initialData?.keyFindings || '');
  const [followUpActions, setFollowUpActions] = useState(initialData?.followUpActions || '');
  const [painIntensity, setPainIntensity] = useState<number>(initialData?.painIntensity || 4);

  React.useEffect(() => {
    if (initialData) {
      setInterviewee(initialData.interviewee);
      setRole(initialData.role);
      setOrganization(initialData.organization);
      setCustomerSegment(initialData.customerSegment);
      setDate(initialData.date);
      setQuoteInput(initialData.actualQuotes.join('\n'));
      setFounderInterpretation(initialData.founderInterpretation);
      setKeyFindings(initialData.keyFindings);
      setFollowUpActions(initialData.followUpActions);
      setPainIntensity(initialData.painIntensity);
    } else {
      setInterviewee('');
      setRole('');
      setOrganization('');
      setCustomerSegment('Mid-Market SaaS');
      setDate(new Date().toISOString().split('T')[0]);
      setQuoteInput('');
      setFounderInterpretation('');
      setKeyFindings('');
      setFollowUpActions('');
      setPainIntensity(4);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewee.trim() || !organization.trim()) return;

    const quotes = quoteInput
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    const saved: CustomerInterview = {
      id: initialData?.id || `INT-${Math.floor(200 + Math.random() * 800)}`,
      ideaId,
      interviewee: interviewee.trim(),
      role: role.trim() || 'Executive Buyer',
      organization: organization.trim(),
      customerSegment: customerSegment.trim() || 'Enterprise Target',
      date,
      status: 'Completed',
      actualQuotes: quotes.length > 0 ? quotes : ['"Pain is severe during peak release periods."'],
      founderInterpretation: founderInterpretation.trim() || 'Validates core problem premise.',
      keyFindings: keyFindings.trim() || 'High urgency to solve within the quarter.',
      followUpActions: followUpActions.trim() || 'Send follow-up product prototype.',
      painIntensity
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white border-t sm:border border-[#e2e8f0] rounded-t-[12px] sm:rounded-[8px] w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        <div className="px-4 py-3.5 border-b border-[#e2e8f0] flex items-center justify-between shrink-0">
          <h3 className="font-bold text-sm text-[#0f172a]">
            {initialData ? 'Edit Customer Discovery Record' : 'Record Customer Discovery Interview'}
          </h3>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-[#0f172a] flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Interviewee Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={interviewee}
                onChange={(e) => setInterviewee(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Company / Organization *</label>
              <input
                type="text"
                required
                placeholder="e.g. Acme FinTech"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Role / Title</label>
              <input
                type="text"
                placeholder="e.g. VP Engineering"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Customer Segment</label>
              <input
                type="text"
                placeholder="e.g. Mid-Market SaaS"
                value={customerSegment}
                onChange={(e) => setCustomerSegment(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Pain Intensity (1-5)</label>
              <select
                value={painIntensity}
                onChange={(e) => setPainIntensity(Number(e.target.value))}
                className="w-full min-h-[44px] px-2 bg-white border border-[#e2e8f0] rounded-[6px]"
              >
                <option value={5}>5 - Burning Urgent Hair-on-Fire</option>
                <option value={4}>4 - High Pain</option>
                <option value={3}>3 - Moderate Annoyance</option>
                <option value={2}>2 - Minor Friction</option>
                <option value={1}>1 - Low / Indifferent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#065f46] uppercase block mb-1">
              Direct Verbatim Quotes (Enter one quote per line) *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Record the exact words the customer said. Don't editorialize yet..."
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#a7f3d0] rounded-[6px] text-xs text-[#0f172a]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#4f46e5] uppercase block mb-1">
              Founder Interpretation & Analysis
            </label>
            <textarea
              rows={2}
              placeholder="What does their quote mean for your product, willingness to pay, or solution?"
              value={founderInterpretation}
              onChange={(e) => setFounderInterpretation(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#e2e8f0] rounded-[6px] text-xs text-[#0f172a]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Key Finding</label>
              <input
                type="text"
                placeholder="Core validated takeaway..."
                value={keyFindings}
                onChange={(e) => setKeyFindings(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Follow-up Action</label>
              <input
                type="text"
                placeholder="e.g. Schedule demo in 2 weeks"
                value={followUpActions}
                onChange={(e) => setFollowUpActions(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 text-xs font-medium text-[#64748b]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 text-xs font-semibold text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] shadow-sm"
            >
              Save Interview Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 4. ADD / EDIT EXPERIMENT MODAL
// ==========================================
interface ExperimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experiment: Experiment) => void;
  initialData?: Experiment | null;
  ideaId: string;
}

export const ExperimentModal: React.FC<ExperimentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  ideaId
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [hypothesis, setHypothesis] = useState(initialData?.hypothesis || '');
  const [method, setMethod] = useState<Experiment['method']>(initialData?.method || 'Customer Interviews');
  const [status, setStatus] = useState<Experiment['status']>(initialData?.status || 'Planned');
  const [deadline, setDeadline] = useState(initialData?.deadline || new Date().toISOString().split('T')[0]);
  const [estimatedCost, setEstimatedCost] = useState(initialData?.estimatedCost || '$0');
  const [targetMetric, setTargetMetric] = useState(initialData?.targetMetric || '');
  const [results, setResults] = useState(initialData?.results || '');
  const [conclusion, setConclusion] = useState(initialData?.conclusion || '');

  React.useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setHypothesis(initialData.hypothesis);
      setMethod(initialData.method);
      setStatus(initialData.status);
      setDeadline(initialData.deadline);
      setEstimatedCost(initialData.estimatedCost);
      setTargetMetric(initialData.targetMetric);
      setResults(initialData.results);
      setConclusion(initialData.conclusion);
    } else {
      setTitle('');
      setHypothesis('');
      setMethod('Landing Page Smoke Test');
      setStatus('Planned');
      setDeadline(new Date().toISOString().split('T')[0]);
      setEstimatedCost('$100');
      setTargetMetric('>= 10% conversion');
      setResults('Pending execution');
      setConclusion('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !hypothesis.trim()) return;

    const saved: Experiment = {
      id: initialData?.id || `EXP-${Math.floor(500 + Math.random() * 500)}`,
      ideaId,
      title: title.trim(),
      hypothesis: hypothesis.trim(),
      method,
      status,
      deadline,
      estimatedCost: estimatedCost.trim() || '$0',
      targetMetric: targetMetric.trim() || 'Positive statistical signal',
      results: results.trim() || 'In progress',
      conclusion: conclusion.trim()
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white border-t sm:border border-[#e2e8f0] rounded-t-[12px] sm:rounded-[8px] w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        <div className="px-4 py-3.5 border-b border-[#e2e8f0] flex items-center justify-between shrink-0">
          <h3 className="font-bold text-sm text-[#0f172a]">
            {initialData ? 'Edit Experiment Run' : 'Plan Validation Experiment'}
          </h3>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-[#0f172a] flex-1">
          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Experiment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Smoke Test Landing Page with Pre-Orders"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">
              Falsifiable Hypothesis *
            </label>
            <textarea
              rows={2}
              required
              placeholder="If we [do this], then [this measurable response will happen]..."
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#e2e8f0] rounded-[6px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Methodology</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full min-h-[44px] px-2 bg-white border border-[#e2e8f0] rounded-[6px]"
              >
                <option value="Landing Page Smoke Test">Landing Page Smoke Test</option>
                <option value="Customer Interviews">Customer Interviews</option>
                <option value="A/B Split Test">A/B Split Test</option>
                <option value="Pre-sales / LOI">Pre-sales / LOI</option>
                <option value="Concierge MVP">Concierge MVP</option>
                <option value="Pricing Survey">Pricing Survey</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full min-h-[44px] px-2 bg-white border border-[#e2e8f0] rounded-[6px]"
              >
                <option value="Planned">Planned</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Target Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Estimated Budget/Cost</label>
              <input
                type="text"
                placeholder="e.g. $150 or Free"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">
              Target Success Metric / Pass-Fail Threshold
            </label>
            <input
              type="text"
              placeholder="e.g. >= 8% conversion rate or 5 LOIs"
              value={targetMetric}
              onChange={(e) => setTargetMetric(e.target.value)}
              className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
            />
          </div>

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 text-xs font-medium text-[#64748b]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 text-xs font-semibold text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] shadow-sm"
            >
              Save Experiment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 5. ADD / EDIT COMPETITOR MODAL
// ==========================================
interface CompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (competitor: Competitor) => void;
  initialData?: Competitor | null;
  ideaId: string;
}

export const CompetitorModal: React.FC<CompetitorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  ideaId
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [website, setWebsite] = useState(initialData?.website || '');
  const [pricingModel, setPricingModel] = useState(initialData?.pricingModel || '');
  const [threatLevel, setThreatLevel] = useState<'High' | 'Medium' | 'Low'>(initialData?.threatLevel || 'Medium');
  const [strengthsInput, setStrengthsInput] = useState(initialData?.strengths.join('\n') || '');
  const [weaknessesInput, setWeaknessesInput] = useState(initialData?.weaknesses.join('\n') || '');
  const [ourDifferentiator, setOurDifferentiator] = useState(initialData?.ourDifferentiator || '');

  React.useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setWebsite(initialData.website);
      setPricingModel(initialData.pricingModel);
      setThreatLevel(initialData.threatLevel);
      setStrengthsInput(initialData.strengths.join('\n'));
      setWeaknessesInput(initialData.weaknesses.join('\n'));
      setOurDifferentiator(initialData.ourDifferentiator);
    } else {
      setName('');
      setWebsite('https://');
      setPricingModel('$20 - $50/mo');
      setThreatLevel('Medium');
      setStrengthsInput('');
      setWeaknessesInput('');
      setOurDifferentiator('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const strengths = strengthsInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const weaknesses = weaknessesInput
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length > 0);

    const saved: Competitor = {
      id: initialData?.id || `CMP-${Math.floor(300 + Math.random() * 700)}`,
      ideaId,
      name: name.trim(),
      website: website.trim() || 'https://example.com',
      pricingModel: pricingModel.trim() || 'Freemium / Subscription',
      strengths: strengths.length ? strengths : ['Market presence'],
      weaknesses: weaknesses.length ? weaknesses : ['Legacy user interface'],
      ourDifferentiator: ourDifferentiator.trim() || 'Superior deterministic workflow automation',
      threatLevel
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white border-t sm:border border-[#e2e8f0] rounded-t-[12px] sm:rounded-[8px] w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        <div className="px-4 py-3.5 border-b border-[#e2e8f0] flex items-center justify-between shrink-0">
          <h3 className="font-bold text-sm text-[#0f172a]">
            {initialData ? 'Edit Competitor' : 'Add Competitor Profile'}
          </h3>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center rounded text-[#64748b] hover:bg-[#f1f5f9]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-[#0f172a] flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Competitor Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. CodeRabbit, SonarCloud"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Website URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Pricing Model</label>
              <input
                type="text"
                placeholder="e.g. $19/seat/month"
                value={pricingModel}
                onChange={(e) => setPricingModel(e.target.value)}
                className="w-full min-h-[44px] px-3 bg-white border border-[#e2e8f0] rounded-[6px]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">Threat Level</label>
              <select
                value={threatLevel}
                onChange={(e) => setThreatLevel(e.target.value as any)}
                className="w-full min-h-[44px] px-2 bg-white border border-[#e2e8f0] rounded-[6px]"
              >
                <option value="High">High Threat (Direct Competitor)</option>
                <option value="Medium">Medium Threat (Adjacent)</option>
                <option value="Low">Low Threat (Legacy / Distant)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">
              Key Strengths (One per line)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. High brand awareness&#10;Fast setup"
              value={strengthsInput}
              onChange={(e) => setStrengthsInput(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#e2e8f0] rounded-[6px]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#64748b] uppercase block mb-1">
              Weaknesses & Customer Complaints (One per line)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Noisy alerts&#10;Slow customer support"
              value={weaknessesInput}
              onChange={(e) => setWeaknessesInput(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#e2e8f0] rounded-[6px]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#4f46e5] uppercase block mb-1">
              Our Specific Differentiator
            </label>
            <input
              type="text"
              placeholder="Why will customers switch to us?"
              value={ourDifferentiator}
              onChange={(e) => setOurDifferentiator(e.target.value)}
              className="w-full min-h-[44px] px-3 bg-white border border-[#c7d2fe] rounded-[6px]"
            />
          </div>

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 text-xs font-medium text-[#64748b]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 text-xs font-semibold text-white bg-[#4f46e5] rounded-[6px] hover:bg-[#4338ca] shadow-sm"
            >
              Save Competitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
