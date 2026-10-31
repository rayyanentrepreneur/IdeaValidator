import { Idea, Assumption, CustomerInterview, Competitor, ScoreDimension, Experiment } from '../types';

export const SEED_IDEAS: Idea[] = [
  {
    id: 'IDEA-01',
    title: 'DevFlow Intelligence',
    tagline: 'Automated PR Triage and Review Acceleration for Engineering Teams',
    description: 'An AI-native developer tool that performs deterministic pre-merge linting, architectural invariant checks, and risk-scoring to cut code review cycle times by 65%.',
    problemStatement: {
      targetCustomer: 'Engineering Managers and Staff Engineers at 50-500 person SaaS companies',
      coreProblem: 'Senior engineers spend 14+ hours weekly reviewing routine pull requests, causing sprint bottlenecks and delayed release cadences.',
      currentWorkaround: 'Manual peer-review rotations, fragile GitHub Actions linters, and Slack reminder channels.',
      negativeConsequence: 'Delayed quarterly feature shipping, engineer context fragmentation, and subtle architectural regressions leaking to production.'
    },
    personas: [
      {
        id: 'PER-1',
        name: 'Sarah Jenkins',
        role: 'VP of Engineering',
        companyType: 'Series B FinTech (120 engineers)',
        painPoints: [
          'High latency on PR turnaround (median 48 hours)',
          'Engineering burn-out from context switching',
          'Compliance risk on unvetted library dependencies'
        ],
        willingnessToPay: '$40-$60/engineer/month',
        primaryChannel: 'Hacker News, Peer CTO Communities'
      },
      {
        id: 'PER-2',
        name: 'Alex Rivera',
        role: 'Staff Platform Engineer',
        companyType: 'Mid-Market E-Commerce (80 engineers)',
        painPoints: [
          'Noise from nitpick style comments on PRs',
          'Inconsistent architectural enforcement across squads'
        ],
        willingnessToPay: 'Wants company expense approval',
        primaryChannel: 'GitHub Marketplace, Twitter/X'
      }
    ],
    status: 'In Validation',
    targetMarket: 'B2B Developer Tooling / DevOps Automation',
    businessModel: 'B2B SaaS ($45/seat/month, tiered on repository activity)',
    validationScore: 74,
    createdAt: '2026-10-15'
  },
  {
    id: 'IDEA-02',
    title: 'BioScribe Protocols',
    tagline: 'Regulatory Protocol Drafter for Phase II/III Clinical Trials',
    description: 'Automated extraction of FDA guidance protocols into standardized electronic Trial Master Files (eTMF) for biopharma sponsors.',
    problemStatement: {
      targetCustomer: 'Clinical Operations Directors at emerging biotech startups',
      coreProblem: 'Trial protocol amendments cost $500k+ and take 90 days of back-and-forth medical writing revisions.',
      currentWorkaround: 'Expensive contract research organizations (CROs) and manual Word document redlines.',
      negativeConsequence: 'Trial initiation delays resulting in patent exclusivity burn of up to $1M per day.'
    },
    personas: [
      {
        id: 'PER-3',
        name: 'Dr. Marcus Vance',
        role: 'VP Clinical Development',
        companyType: 'Clinical Stage Oncology Biotech',
        painPoints: [
          'CRO turnaround lag of 8-12 weeks',
          'Inconsistent regulatory terminology across global sites'
        ],
        willingnessToPay: '$5,000/trial protocol or $60k/year platform',
        primaryChannel: 'ASCO, DIA Global Annual Meeting'
      }
    ],
    status: 'In Validation',
    targetMarket: 'Life Sciences / Regulatory Tech',
    businessModel: 'Enterprise Annual Licensing ($48k - $120k ACV)',
    validationScore: 58,
    createdAt: '2026-10-22'
  }
];

export const SEED_ASSUMPTIONS: Assumption[] = [
  {
    id: 'ASM-101',
    ideaId: 'IDEA-01',
    statement: 'Engineering teams will permit a third-party tool to read private repo ASTs without mandatory on-premises deployment.',
    category: 'Solution',
    importance: 'High',
    confidence: 'High',
    status: 'Validated',
    nextExperiment: 'SOC2 Type II trust portal review with enterprise infosec leads.',
    notes: '8 out of 10 interviewed VPs confirmed SOC2 Type II in AWS us-east-1 is sufficient for non-banking code.',
    lastUpdated: '2026-10-28'
  },
  {
    id: 'ASM-102',
    ideaId: 'IDEA-01',
    statement: 'Engineering managers have discretionary budget up to $50/seat/month without CFO sign-off.',
    category: 'Monetization',
    importance: 'High',
    confidence: 'Medium',
    status: 'Testing',
    nextExperiment: 'EXP-02: Self-serve credit card pricing page pilot test.',
    notes: 'Department credit card limits are usually $5,000/mo. For 40-person teams this fits comfortably.',
    lastUpdated: '2026-10-26'
  },
  {
    id: 'ASM-103',
    ideaId: 'IDEA-01',
    statement: 'PR cycle turnaround latency is perceived as a top-3 engineering productivity blocker.',
    category: 'Problem',
    importance: 'High',
    confidence: 'High',
    status: 'Validated',
    nextExperiment: 'Customer interview synthesis across 15 engineering leaders.',
    notes: 'Confirmed in 12/14 discovery interviews. Ranked #2 behind unexpected incident firefighting.',
    lastUpdated: '2026-10-24'
  },
  {
    id: 'ASM-104',
    ideaId: 'IDEA-01',
    statement: 'Developers will accept automated inline bot comments without developing notification fatigue.',
    category: 'Customer',
    importance: 'Medium',
    confidence: 'Low',
    status: 'Untested',
    nextExperiment: 'EXP-03: Beta cohort inline comment reaction test.',
    notes: 'Requires high signal-to-noise ratio: maximum 2 automated comments per pull request.',
    lastUpdated: '2026-10-29'
  },
  {
    id: 'ASM-105',
    ideaId: 'IDEA-01',
    statement: 'Total addressable market of GitHub Organization teams with >20 engineers exceeds 180,000 teams globally.',
    category: 'Market',
    importance: 'Medium',
    confidence: 'High',
    status: 'Validated',
    nextExperiment: 'GitHub Public API census and LinkedIn Sales Navigator scraping.',
    notes: 'TAM modeled at $2.4B ARR assuming 15% market penetration at $45/seat.',
    lastUpdated: '2026-10-18'
  }
];

export const SEED_INTERVIEWS: CustomerInterview[] = [
  {
    id: 'INT-201',
    ideaId: 'IDEA-01',
    interviewee: 'Sarah Jenkins',
    role: 'VP of Engineering',
    organization: 'Acme Cloud Platform (Series B)',
    customerSegment: 'Mid-Market SaaS (50-200 eng)',
    date: '2026-10-24',
    status: 'Completed',
    actualQuotes: [
      '"My senior staff engineers spend half their Tuesday and Thursday just reviewing pull requests."',
      '"If a PR sits for more than 24 hours, the branch goes stale and merge conflicts double."',
      '"We pay $40/month for Datadog and GitHub Enterprise without flinching. If this saves 4 hours a week per engineer, $50 is a no-brainer."'
    ],
    founderInterpretation: 'Strong willingness to pay and urgent pain around senior developer context fragmentation. Budget authority is localized to her department.',
    keyFindings: 'Median PR latency is 36 hours. 60% of PR review comments are routine stylistic or linter items that could be auto-triaged.',
    followUpActions: 'Share clickable Figma prototype by next Friday; conduct trial integration on sandbox repository.',
    painIntensity: 5
  },
  {
    id: 'INT-202',
    ideaId: 'IDEA-01',
    interviewee: 'Liam Zhang',
    role: 'Lead Architect',
    organization: 'FinScale Payments',
    customerSegment: 'Enterprise FinTech (300 eng)',
    date: '2026-10-27',
    status: 'Completed',
    actualQuotes: [
      '"We have strict zero-data retention requirements. Our source code cannot be used for foundational LLM training."',
      '"If you can provide a SOC2 Type II and contractual data isolation, our infosec will approve it in 2 weeks."'
    ],
    founderInterpretation: 'Security compliance is the gating gatekeeper. Must establish transparent zero-retention policy before enterprise outreach.',
    keyFindings: 'Security assurance is paramount. Willing to pay upfront annual contract if data never persists beyond review execution.',
    followUpActions: 'Draft one-page Security & Architecture Whitepaper; send SOC2 readiness checklist.',
    painIntensity: 4
  },
  {
    id: 'INT-203',
    ideaId: 'IDEA-01',
    interviewee: 'Elena Gomez',
    role: 'Engineering Manager',
    organization: 'HealthTrack Systems',
    customerSegment: 'Digital Health (75 eng)',
    date: '2026-10-30',
    status: 'Completed',
    actualQuotes: [
      '"Our junior engineers wait too long for feedback, then feel intimidated by blunt reviewer comments."',
      '"An automated preliminary review would help them learn conventions faster."'
    ],
    founderInterpretation: 'Educational/mentorship angle is a secondary value proposition for junior developer velocity.',
    keyFindings: 'Identified educational benefit for onboarding new engineers faster during first 90 days.',
    followUpActions: 'Add persona note on onboarding acceleration metric.',
    painIntensity: 4
  }
];

export const SEED_COMPETITORS: Competitor[] = [
  {
    id: 'CMP-301',
    ideaId: 'IDEA-01',
    name: 'CodeRabbit AI',
    website: 'https://coderabbit.ai',
    pricingModel: '$15 - $30 / developer / month',
    strengths: [
      'Fast growing developer mindshare',
      'One-click GitHub App marketplace installation',
      'Clean conversational chat interface on PRs'
    ],
    weaknesses: [
      'High rate of verbose, low-value comments',
      'Lacks custom organizational architectural rules',
      'No deep Jira / issue tracker contextual linking'
    ],
    ourDifferentiator: 'Deterministic architectural invariant verification with zero noise and team-specific code conventions.',
    threatLevel: 'High'
  },
  {
    id: 'CMP-302',
    ideaId: 'IDEA-01',
    name: 'SonarQube / SonarCloud',
    website: 'https://sonarsource.com',
    pricingModel: 'Tiered based on lines of code ($150 - $20k+/yr)',
    strengths: [
      'Established enterprise standard for static analysis',
      'Deep CVE vulnerability database',
      'Broad language syntax support'
    ],
    weaknesses: [
      'Legacy UX with slow scan runtimes',
      'Rigid rule configurations requiring heavy maintenance',
      'No generative context understanding of PR intent'
    ],
    ourDifferentiator: 'Sub-30 second runtime with semantic PR intent comprehension rather than brittle static AST rule matching.',
    threatLevel: 'Medium'
  },
  {
    id: 'CMP-303',
    ideaId: 'IDEA-01',
    name: 'Qodo (formerly CodiumAI)',
    website: 'https://qodo.ai',
    pricingModel: 'Freemium + $19/seat/month',
    strengths: [
      'Strong test generation capabilities',
      'IDE extension integration (VS Code, JetBrains)'
    ],
    weaknesses: [
      'Focused primarily on individual developer test drafting rather than team-wide PR triage',
      'Complex enterprise setup'
    ],
    ourDifferentiator: 'Team-level PR turnaround acceleration and automated triage workflows.',
    threatLevel: 'Medium'
  }
];

export const SEED_SCORECARD: ScoreDimension[] = [
  {
    id: 'DIM-1',
    title: 'Problem Severity & Urgency',
    description: 'Is the problem actively painful, urgent, and causing quantifiable economic loss for the target buyer?',
    score: 4, // 0 to 4
    weight: 25,
    evidenceNotes: 'Validated in 12/14 customer interviews. Median PR latency of 36-48h ranked #2 engineering priority.'
  },
  {
    id: 'DIM-2',
    title: 'Willingness to Pay & Budget Authority',
    description: 'Does the buyer have pre-allocated discretionary budget and verified ability to purchase at target ACV?',
    score: 3,
    weight: 25,
    evidenceNotes: '3 engineering executives explicitly confirmed willingness to pay $40-$60/engineer/mo from tool budgets.'
  },
  {
    id: 'DIM-3',
    title: 'Market Size & Addressability',
    description: 'Is the total market sufficiently large with accessible acquisition channels to reach scale?',
    score: 3,
    weight: 15,
    evidenceNotes: '180,000+ GitHub organizations with >=20 engineers. $2.4B serviceable market.'
  },
  {
    id: 'DIM-4',
    title: 'Competitive Differentiation & Moat',
    description: 'Can we build a defensible advantage against well-funded incumbents and open-source models?',
    score: 3,
    weight: 20,
    evidenceNotes: 'Proprietary repo architectural invariant graphs prevent competitors from matching semantic precision.'
  },
  {
    id: 'DIM-5',
    title: 'Technical Feasibility & Velocity',
    description: 'Can the core solution be built and delivered with acceptable latency, unit economics, and security?',
    score: 4,
    weight: 15,
    evidenceNotes: 'Working prototype executes deterministic AST checks and LLM synthesis in 18 seconds median.'
  }
];

export const SEED_EXPERIMENTS: Experiment[] = [
  {
    id: 'EXP-501',
    ideaId: 'IDEA-01',
    title: 'Landing Page Smoke Test with Pricing Tiers',
    hypothesis: 'If we drive 500 targeted engineering managers from Reddit/Hacker News, at least 8% will click "Request Sandbox Access" at $45/seat.',
    method: 'Landing Page Smoke Test',
    status: 'Completed',
    deadline: '2026-10-20',
    estimatedCost: '$250 ad spend',
    targetMetric: '>= 8% CTA click-through rate',
    results: '640 unique visits; 67 sandbox access requests (10.4% conversion rate). 42 provided work emails.',
    conclusion: 'Strong initial validation of positioning and pricing elasticity.'
  },
  {
    id: 'EXP-502',
    ideaId: 'IDEA-01',
    title: 'Private Beta Sandbox Integration Pilot',
    hypothesis: 'Engineering teams with >=20 active PRs will experience a 40%+ drop in review latency within 14 days of connecting our GitHub App.',
    method: 'Concierge MVP',
    status: 'Running',
    deadline: '2026-11-15',
    estimatedCost: '$80 server compute',
    targetMetric: '40% reduction in median PR time-to-merge',
    results: 'Currently connected to 3 beta pilot organizations. Preliminary data shows median latency dropped from 41h to 22h.',
    conclusion: 'Experiment in progress. Final cohort report expected mid-November.'
  },
  {
    id: 'EXP-503',
    ideaId: 'IDEA-01',
    title: 'Pre-sales Letter of Intent (LOI) Outreach',
    hypothesis: 'At least 3 enterprise engineering leaders will sign non-binding LOIs for pilot deployment upon SOC2 completion.',
    method: 'Pre-sales / LOI',
    status: 'Planned',
    deadline: '2026-11-30',
    estimatedCost: '$0',
    targetMetric: '3 signed LOIs with $15k+ pilot commit',
    results: 'Drafted standardized pilot LOI agreement with legal counsel.',
    conclusion: 'Ready to distribute to Sarah Jenkins and 2 additional interview prospects.'
  }
];
