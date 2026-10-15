import { PipelineStep, Outlet, Agent } from '../types';

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    number: '01',
    id: 'ink',
    name: 'I.N.K.',
    fullName: 'Investigative News & Knowledge',
    description: 'Scours thousands of sources in real time — wire services, local papers, primary documents — to gather the raw facts of a story.',
    iconType: 'ink'
  },
  {
    number: '02',
    id: 'bias',
    name: 'B.I.A.S.',
    fullName: 'Balanced Information Analysis & Scoring',
    description: 'Scores every source on the political spectrum, flags loaded language, and maps how the same story is being told differently across the media landscape.',
    iconType: 'bias'
  },
  {
    number: '03',
    id: 'verify',
    name: 'V.E.R.I.F.Y.',
    fullName: 'Verification, Evidence Review & Integrity',
    description: 'Cross-references every claim against primary sources, government data, and academic research. Assigns confidence ratings with linked evidence.',
    iconType: 'verify'
  },
  {
    number: '04',
    id: 'draft',
    name: 'D.R.A.F.T.',
    fullName: 'Data Reduction & Factual Translation',
    description: 'Distills verified information into clear, balanced reporting. Language is neutral, sourcing is explicit, and every editorial choice is logged.',
    iconType: 'draft'
  },
  {
    number: '05',
    id: 'publish',
    name: 'P.U.B.L.I.S.H.',
    fullName: 'Platform Upload, Broadcast & Live Integration',
    description: 'Delivers the final article with full audit trail attached — readers can inspect every source, every bias score, and every AI decision.',
    iconType: 'publish'
  }
];

export const OUTLETS: Outlet[] = [
  {
    name: 'CBC',
    positionPercent: 8,
    category: 'Far Left',
    description: 'Canadian public broadcaster; scored per-story on framing, source reliance, and editorial focus.'
  },
  {
    name: 'Globe & Mail',
    positionPercent: 24,
    category: 'Center Left',
    isGold: true,
    description: 'National broadsheet publication; evaluated across editorial opinions, business reporting, and policy analysis.'
  },
  {
    name: 'WTF Center',
    positionPercent: 48,
    category: 'Center',
    isVerifiedCenter: true,
    bottomOffset: '18px',
    description: 'What The Fact synthesized neutral reference point with verified multi-source corroboration.'
  },
  {
    name: 'Toronto Star',
    positionPercent: 38,
    category: 'Center Left',
    description: 'Major metropolitan daily; monitored for progressive framing, labor coverage, and civil discourse.'
  },
  {
    name: 'National Post',
    positionPercent: 55,
    category: 'Center Right',
    isGold: true,
    description: 'Prominent national conservative daily newspaper; analyzed for fiscal, regulatory, and policy viewpoints.'
  },
  {
    name: 'Post Millennial',
    positionPercent: 67,
    category: 'Center Right',
    description: 'Digital outlet with conservative and cultural commentary; indexed for opinion vs fact delineation.'
  },
  {
    name: 'Western Standard',
    positionPercent: 79,
    category: 'Far Right',
    isGold: true,
    description: 'Western Canadian independent outlet focusing on regional autonomy, libertarian and conservative perspectives.'
  }
];

export const AGENTS: Agent[] = [
  {
    acronym: 'F.A.C.T.',
    fullName: 'Factual Analysis, Credibility & Transparency',
    role: 'Director',
    isDirector: true,
    description: 'Oversees the entire pipeline. Sets accuracy standards, resolves agent conflicts, and signs off on every published story.',
    tags: ['Oversight', 'Standards', 'Final Review'],
    avatarClass: 'agent-avatar--fact',
    initials: 'F'
  },
  {
    acronym: 'I.N.K.',
    fullName: 'Investigative News & Knowledge',
    role: 'Staff Agent',
    description: 'Relentless source gatherer. Monitors wire services, documents, and social signals 24/7 to ensure no story breaks undetected.',
    tags: ['Research', 'Monitoring', 'Sourcing'],
    avatarClass: 'agent-avatar--ink',
    initials: 'I'
  },
  {
    acronym: 'B.I.A.S.',
    fullName: 'Balanced Information Analysis & Scoring',
    role: 'Staff Agent',
    description: 'Detects spin, loaded language, and selective framing across thousands of articles per day. Produces the bias spectrum scores you see.',
    tags: ['Bias Detection', 'Scoring', 'Framing'],
    avatarClass: 'agent-avatar--bias',
    initials: 'B'
  },
  {
    acronym: 'V.E.R.I.F.Y.',
    fullName: 'Verification, Evidence Review & Integrity',
    role: 'Staff Agent',
    description: 'The fact-checker. Traces every claim to primary evidence and flags anything unverifiable before it can enter the published record.',
    tags: ['Fact-Checking', 'Evidence', 'Confidence'],
    avatarClass: 'agent-avatar--verify',
    initials: 'V'
  },
  {
    acronym: 'D.R.A.F.T.',
    fullName: 'Data Reduction & Factual Translation',
    role: 'Staff Agent',
    description: 'Turns verified data into clear, human-readable articles. Every word choice logged, every editorial decision transparent and reversible.',
    tags: ['Writing', 'Neutrality', 'Clarity'],
    avatarClass: 'agent-avatar--draft',
    initials: 'D'
  },
  {
    acronym: 'P.U.B.L.I.S.H.',
    fullName: 'Platform Upload, Broadcast & Live Integration',
    role: 'Staff Agent',
    description: 'Handles delivery — web, RSS, newsletter, and API. Attaches the full audit trail so readers can inspect the work behind every story.',
    tags: ['Distribution', 'Audit Trail', 'Integration'],
    avatarClass: 'agent-avatar--publish',
    initials: 'P'
  }
];
