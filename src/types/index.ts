export type AssumptionCategory = 'Problem' | 'Solution' | 'Customer' | 'Monetization' | 'Market';
export type AssumptionImportance = 'High' | 'Medium' | 'Low';
export type AssumptionConfidence = 'Low' | 'Medium' | 'High';
export type AssumptionStatus = 'Untested' | 'Testing' | 'Validated' | 'Invalidated';

export interface Assumption {
  id: string;
  ideaId: string;
  statement: string;
  category: AssumptionCategory;
  importance: AssumptionImportance;
  confidence: AssumptionConfidence;
  status: AssumptionStatus;
  nextExperiment: string;
  notes: string;
  lastUpdated: string;
}

export interface CustomerPersona {
  id: string;
  name: string;
  role: string;
  companyType: string;
  painPoints: string[];
  willingnessToPay: string;
  primaryChannel: string;
}

export interface ProblemStatement {
  targetCustomer: string;
  coreProblem: string;
  currentWorkaround: string;
  negativeConsequence: string;
}

export interface Idea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemStatement: ProblemStatement;
  personas: CustomerPersona[];
  status: 'In Validation' | 'Validated' | 'Pivoting' | 'Archived';
  targetMarket: string;
  businessModel: string;
  validationScore: number;
  createdAt: string;
}

export interface CustomerInterview {
  id: string;
  ideaId: string;
  interviewee: string;
  role: string;
  organization: string;
  customerSegment: string;
  date: string;
  status: 'Completed' | 'Scheduled' | 'Analyzing';
  actualQuotes: string[];
  founderInterpretation: string;
  keyFindings: string;
  followUpActions: string;
  painIntensity: number; // 1 to 5
}

export interface Competitor {
  id: string;
  ideaId: string;
  name: string;
  website: string;
  pricingModel: string;
  strengths: string[];
  weaknesses: string[];
  ourDifferentiator: string;
  threatLevel: 'High' | 'Medium' | 'Low';
}

export interface ScoreDimension {
  id: string;
  title: string;
  description: string;
  score: number; // 0 to 4
  weight: number; // percentage (e.g. 20)
  evidenceNotes: string;
}

export interface Experiment {
  id: string;
  ideaId: string;
  title: string;
  hypothesis: string;
  method: 'Customer Interviews' | 'Landing Page Smoke Test' | 'A/B Split Test' | 'Pre-sales / LOI' | 'Concierge MVP' | 'Pricing Survey';
  status: 'Planned' | 'Running' | 'Completed' | 'Cancelled';
  deadline: string;
  estimatedCost: string;
  targetMetric: string;
  results: string;
  conclusion: string;
}

export type NavTab = 
  | 'overview' 
  | 'ideas' 
  | 'assumptions' 
  | 'interviews' 
  | 'competitors' 
  | 'scorecard' 
  | 'experiments' 
  | 'settings';
