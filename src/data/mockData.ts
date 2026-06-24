export interface Analyst {
  id: number | string;
  name: string;
  title: string;
  coverage: string[];
  sectors?: string[];
  bio: string;
  photo_path: string;
  photo_position: string;
  isHouseView?: boolean;
}

export interface Report {
  id: number;
  uuid: string;
  title: string;
  type: string;
  category: string;
  coverage: string;
  synopsis: string;
  date: string;
  analyst_id: number;
  analyst_name: string;
  access_level: 'public' | 'subscriber';
  tags: string[];
  featured?: boolean;
}

export interface PriceListGroup {
  title: string;
  description: string;
  items: Array<{
    name: string;
    asAt: string;
    fileType: string;
    access: 'Public' | 'Subscriber';
  }>;
}

export interface MarketMetric {
  label: string;
  value: string;
  note: string;
}

export const mockAnalysts: Analyst[] = [
  {
    id: 0,
    name: 'House View',
    title: 'House View',
    coverage: ['Strategy', 'Macro', 'Markets'],
    bio: "The House View represents Chapel Hill Denham Research's consolidated perspective across equity, macroeconomic, sector and market strategy coverage.",
    photo_path: '/assets/img/logo-white-transparent.png',
    photo_position: '50% 50%',
    isHouseView: true
  },
  {
    id: 1,
    name: 'Tajudeen Ibrahim',
    title: 'Director, Research',
    coverage: ['Telecommunications'],
    bio: "Tajudeen Ibrahim leads the research function and coordinates coverage priorities across CHD's institutional research platform.",
    photo_path: '/assets/img/analysts/tajudeen-ibrahim.jpg',
    photo_position: '50% 0%'
  },
  {
    id: 2,
    name: 'Nabila Mohammed',
    title: 'Analyst',
    coverage: ['Financial Services'],
    bio: 'Nabila Mohammed covers financial services, with emphasis on bank earnings, balance-sheet trends, capital adequacy and sector regulation.',
    photo_path: '/assets/img/analysts/nabila-mohammed.jpg',
    photo_position: '50% 0%'
  },
  {
    id: 3,
    name: 'Gideon Oshadumi',
    title: 'Analyst',
    coverage: ['Cement', 'Financial Services'],
    bio: 'Gideon Oshadumi covers cement and selected financial-services names, focusing on earnings quality, pricing trends, cost pressures and balance-sheet resilience.',
    photo_path: '/assets/img/analysts/gideon-oshadumi.jpg',
    photo_position: '50% 0%'
  },
  {
    id: 4,
    name: 'Boluwatife Ishola',
    title: 'Analyst',
    coverage: ['FMCGs', 'Agriculture'],
    bio: 'Boluwatife Ishola covers FMCG and agriculture-linked equities, tracking consumer demand, pricing power, input costs and margin trends.',
    photo_path: '/assets/img/analysts/boluwatife-ishola.jpg',
    photo_position: '50% 24%'
  },
  {
    id: 5,
    name: 'Bolade Agboola',
    title: 'Analyst',
    coverage: ['Oil & Gas', 'FMCGs'],
    bio: 'Bolade Agboola supports coverage across oil and gas and FMCG, with a focus on market developments, company fundamentals and sector themes.',
    photo_path: '/assets/img/analysts/bolade-agboola.jpg',
    photo_position: '50% 0%'
  }
];

export const mockReports: Report[] = [
  {
    id: 101,
    uuid: '0038eac6-c29a-43e9-0e4d-7d68490525f0',
    title: 'MTN Nigeria Q1 2025: Subscriber Rebound Amid Tariff Adjustments',
    type: 'Equity Research',
    category: 'equity',
    coverage: 'Telecommunications',
    synopsis: 'MTN Nigeria reported net subscriber additions of 1.2 million in Q1 2025, reversing three quarters of churn following tariff review. We revise our FY2025 EBITDA estimate upward and maintain our BUY rating.',
    date: '2025-05-20',
    analyst_id: 1,
    analyst_name: 'Tajudeen Ibrahim',
    access_level: 'public',
    tags: ['equity', 'telecoms', 'macro'],
    featured: true
  },
  {
    id: 102,
    uuid: 'a40cbea7-ee88-5408-e27a-ae5ea58be66d',
    title: 'Airtel Africa H1 2025: Dollar Revenue Recovery and Margin Watch',
    type: 'Equity Research',
    category: 'equity',
    coverage: 'Telecommunications',
    synopsis: 'Airtel Africa is showing early dollar revenue recovery as Nigeria FX translation pressure eases and mobile money volumes compound.',
    date: '2025-05-19',
    analyst_id: 1,
    analyst_name: 'Tajudeen Ibrahim',
    access_level: 'subscriber',
    tags: ['equity', 'telecoms', 'strategy'],
    featured: true
  },
  {
    id: 103,
    uuid: '16a9bb84-bc55-5338-bf58-5cb865725447',
    title: 'Nigerian Telecoms Sector Mid-Year Review 2025',
    type: 'Sector Research',
    category: 'sector',
    coverage: 'Telecommunications',
    synopsis: 'The telecoms sector is entering a margin repair cycle as tariff adjustments meet sustained data demand and more stable FX conditions.',
    date: '2025-05-18',
    analyst_id: 1,
    analyst_name: 'Tajudeen Ibrahim',
    access_level: 'subscriber',
    tags: ['sector', 'telecoms', 'strategy'],
    featured: true
  },
  {
    id: 104,
    uuid: '0388cb8c-a304-aa83-124f-e4033c2f2e31',
    title: '5G Spectrum Allocation: What the Delay Costs Nigerian Operators',
    type: 'Equity Research',
    category: 'equity',
    coverage: 'Telecommunications',
    synopsis: 'The delay in 5G spectrum allocation is slowing enterprise connectivity plans and pushing incremental capex decisions into later budget cycles.',
    date: '2025-05-17',
    analyst_id: 1,
    analyst_name: 'Tajudeen Ibrahim',
    access_level: 'public',
    tags: ['equity', 'telecoms', 'capex']
  },
  {
    id: 105,
    uuid: 'sample-macro-outlook-q2-2025',
    title: 'Nigeria Macro Outlook Q2 2025: Disinflation in View, Fiscal Risks Remain',
    type: 'Macroeconomic Analysis',
    category: 'macro',
    coverage: 'Macroeconomics',
    synopsis: 'Inflation moderation is becoming visible, but fiscal financing, FX liquidity and administered prices remain important risks to the rate path.',
    date: '2025-05-16',
    analyst_id: 0,
    analyst_name: 'House View',
    access_level: 'public',
    tags: ['macro', 'inflation', 'fx']
  },
  {
    id: 106,
    uuid: 'sample-paramount-index-march-2025',
    title: 'Paramount Index March 2025: Banking Sector Drives YTD Outperformance',
    type: 'The Paramount Index',
    category: 'index',
    coverage: 'Market Data',
    synopsis: 'The proprietary index continues to point to banking-sector leadership, with breadth improving across select consumer and industrial names.',
    date: '2025-05-15',
    analyst_id: 0,
    analyst_name: 'House View',
    access_level: 'subscriber',
    tags: ['index', 'banking', 'market-data']
  },
  {
    id: 107,
    uuid: 'sample-equity-strategy-h1-2025',
    title: 'Nigeria Equity Strategy H1 2025: Selective Accumulation in a Rate-Cut Cycle',
    type: 'Equity Research',
    category: 'equity',
    coverage: 'Strategy',
    synopsis: 'We prefer resilient earnings, dividend visibility and selective rate-sensitive exposure as monetary policy approaches a turning point.',
    date: '2025-05-14',
    analyst_id: 0,
    analyst_name: 'House View',
    access_level: 'subscriber',
    tags: ['equity', 'strategy', 'rates']
  },
  {
    id: 108,
    uuid: 'sample-access-holdings-q1-2025',
    title: 'Access Holdings Q1 2025: Strong Trading Income Offsets Loan Loss Provisions',
    type: 'Equity Research',
    category: 'equity',
    coverage: 'Financial Services',
    synopsis: 'Trading income and balance-sheet scale support earnings, while credit-cost normalization remains the key watch point.',
    date: '2025-05-13',
    analyst_id: 2,
    analyst_name: 'Nabila Mohammed',
    access_level: 'subscriber',
    tags: ['banking', 'earnings', 'equity']
  },
  {
    id: 109,
    uuid: 'sample-fgn-yield-curve-may-2025',
    title: 'FGN Yield Curve Monitor: Duration Discipline Remains Rewarded',
    type: 'Fixed Income',
    category: 'fixed_income',
    coverage: 'Rates',
    synopsis: 'Yield-curve repricing remains uneven, with attractive carry but limited room for aggressive duration extension before clearer policy signals.',
    date: '2025-05-12',
    analyst_id: 0,
    analyst_name: 'House View',
    access_level: 'public',
    tags: ['fixed-income', 'rates', 'yield']
  },
  {
    id: 110,
    uuid: 'sample-cement-margin-watch-2025',
    title: 'Cement Margin Watch: Pricing Power Meets Energy Cost Relief',
    type: 'Sector Research',
    category: 'sector',
    coverage: 'Cement',
    synopsis: 'Cement producers are balancing price discipline with energy-cost normalization, keeping margins resilient despite volume softness.',
    date: '2025-05-11',
    analyst_id: 3,
    analyst_name: 'Gideon Oshadumi',
    access_level: 'subscriber',
    tags: ['cement', 'margins', 'sector']
  },
  {
    id: 111,
    uuid: 'sample-fmcg-volume-recovery-2025',
    title: 'Consumer Staples: Volume Recovery Still Requires Price Discipline',
    type: 'Sector Research',
    category: 'sector',
    coverage: 'FMCGs',
    synopsis: 'Consumer wallet pressure remains visible, but selected staples names are showing early volume repair as input-cost pressure eases.',
    date: '2025-05-10',
    analyst_id: 4,
    analyst_name: 'Boluwatife Ishola',
    access_level: 'subscriber',
    tags: ['fmcg', 'pricing', 'margins']
  },
  {
    id: 112,
    uuid: 'sample-downstream-working-capital-2025',
    title: 'Downstream Oil & Gas: Working Capital and Margin Recovery',
    type: 'Sector Research',
    category: 'sector',
    coverage: 'Oil & Gas',
    synopsis: 'Downstream operators are navigating inventory funding, deregulated pricing and margin recovery with different balance-sheet capacities.',
    date: '2025-05-09',
    analyst_id: 5,
    analyst_name: 'Bolade Agboola',
    access_level: 'subscriber',
    tags: ['oil-gas', 'downstream', 'margins']
  }
];

export const priceListGroups: PriceListGroup[] = [
  {
    title: 'Equities',
    description: 'Daily and archive equity reference files.',
    items: [
      { name: 'NGX Equity Price List', asAt: '2026-05-07', fileType: 'CSV', access: 'Public' },
      { name: 'NGX Equity Price List', asAt: '2026-04-17', fileType: 'CSV', access: 'Public' }
    ]
  },
  {
    title: 'Fixed Income',
    description: 'Money market and FGN bond reference prices.',
    items: [
      { name: 'Fixed Income / Money Market Price List', asAt: '2026-05-07', fileType: 'CSV', access: 'Subscriber' },
      { name: 'FGN Bond Prices', asAt: '2026-04-11', fileType: 'CSV', access: 'Subscriber' }
    ]
  },
  {
    title: 'Macro Reference',
    description: 'Selected macro series used by Research Desk.',
    items: [
      { name: 'Inflation and FX Reference Pack', asAt: '2026-05-31', fileType: 'XLSX', access: 'Subscriber' }
    ]
  },
  {
    title: 'ETFs & Indices',
    description: 'Index and benchmark reference materials.',
    items: [
      { name: 'Paramount Index Reference Pack', asAt: '2026-05-31', fileType: 'PDF', access: 'Subscriber' }
    ]
  }
];

export const marketMetrics: MarketMetric[] = [
  { label: 'NGX ASI', value: '101,200', note: '+0.7% day/day' },
  { label: 'Inflation', value: '23.8%', note: 'latest monthly print' },
  { label: 'FX Rate', value: '1,498', note: 'sample NGN/USD' },
  { label: 'T-Bill Stop Rate', value: '18.4%', note: 'primary-market guide' }
];

export const getAnalystById = (id: number) => mockAnalysts.find(a => a.id === id);
export const getReportById = (id: number) => mockReports.find(r => r.id === id);
export const relatedReportsFor = (report: Report) =>
  mockReports.filter(item => item.id !== report.id && (item.category === report.category || item.analyst_id === report.analyst_id)).slice(0, 3);
