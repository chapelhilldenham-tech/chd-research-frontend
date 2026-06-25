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
  file_url?: string;
  id: number | string;
  uuid: string;
  title: string;
  type: string;
  category: string;
  coverage: string;
  synopsis: string;
  date: string;
  analyst_id: number | string;
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
    "id": "df6b7e15-0a45-4e44-b5a7-28ee11d157e0",
    "name": "Sample Research Lead",
    "title": "Director, Research",
    "coverage": [
      "Telecommunications"
    ],
    "sectors": [
      "Telecommunications"
    ],
    "bio": "Placeholder profile for validating the public analyst directory layout.",
    "photo_path": "/assets/img/analysts/placeholder-research-lead.jpg",
    "photo_position": "50% 0%",
    "isHouseView": false
  },
  {
    "id": "6b35936d-7693-4aaa-a66b-4170257a3e19",
    "name": "Sample Financials Analyst",
    "title": "Analyst",
    "coverage": [
      "Financial Services"
    ],
    "sectors": [
      "Financial Services"
    ],
    "bio": "Placeholder profile for validating financial services coverage displays.",
    "photo_path": "/assets/img/analysts/placeholder-financials.jpg",
    "photo_position": "50% 0%",
    "isHouseView": false
  },
  {
    "id": "87e9bce8-2589-4b62-9962-df3f0a372088",
    "name": "Sample Consumer Analyst",
    "title": "Analyst",
    "coverage": [
      "Consumer Goods",
      "Agriculture"
    ],
    "sectors": [
      "Consumer Goods",
      "Agriculture"
    ],
    "bio": "Placeholder profile for validating consumer and agriculture coverage displays.",
    "photo_path": "/assets/img/analysts/placeholder-consumer.jpg",
    "photo_position": "50% 24%",
    "isHouseView": false
  },
  {
    "id": "b18ecc2d-6b05-4f87-b37a-68cef253df94",
    "name": "Tajudeen Ibrahim",
    "title": "Director, Research",
    "coverage": [],
    "sectors": [],
    "bio": "Tajudeen Ibrahim leads the research function and coordinates coverage priorities across Chapel Hill Denham's institutional research platform. His work focuses on telecommunications, market strategy and the interpretation of sector developments for investor decision-making.",
    "photo_path": "public_assets/analysts/tajudeen-ibrahim.jpg",
    "photo_position": "50% 0%",
    "isHouseView": false
  },
  {
    "id": "aebb5193-74b5-4496-b8f8-477db5043011",
    "name": "Nabila Mohammed",
    "title": "Analyst",
    "coverage": [],
    "sectors": [],
    "bio": "Nabila Mohammed covers financial services, with emphasis on bank earnings, balance-sheet trends, capital adequacy and sector regulation. Her research supports institutional clients with concise analysis of valuation drivers and operating performance.",
    "photo_path": "public_assets/analysts/nabila-mohammed.jpg",
    "photo_position": "50% 0%",
    "isHouseView": false
  },
  {
    "id": "2707f7e6-b1bf-4989-8a2c-e19700c01c4c",
    "name": "Gideon Oshadumi",
    "title": "Analyst",
    "coverage": [],
    "sectors": [],
    "bio": "Gideon Oshadumi covers cement and selected financial-services names, focusing on earnings quality, pricing trends, cost pressures and balance-sheet resilience. His work combines company analysis with sector context for actionable research views.",
    "photo_path": "public_assets/analysts/gideon-oshadumi.jpg",
    "photo_position": "50% 0%",
    "isHouseView": false
  },
  {
    "id": "06c1ff72-7dff-4507-aa48-32256f664f0b",
    "name": "Boluwatife Ishola",
    "title": "Analyst",
    "coverage": [],
    "sectors": [],
    "bio": "Boluwatife Ishola covers FMCG and agriculture-linked equities, tracking consumer demand, pricing power, input costs and margin trends. Her research focuses on the operating factors shaping listed companies in Nigeria's consumer economy.",
    "photo_path": "public_assets/analysts/boluwatife-ishola.jpg",
    "photo_position": "50% 0%",
    "isHouseView": false
  },
  {
    "id": "a667e183-9761-40b1-965a-cd12de6750db",
    "name": "Bolade Agboola",
    "title": "Analyst",
    "coverage": [],
    "sectors": [],
    "bio": "Bolade Agboola supports coverage across oil & gas and FMCG, with a focus on market developments, company fundamentals and sector themes. Her work contributes to timely research notes and the broader Chapel Hill Denham house view.",
    "photo_path": "public_assets/analysts/bolade-agboola.jpg",
    "photo_position": "50% 0%",
    "isHouseView": false
  },
  {
    "id": "b5912ff3-e1c8-44ed-9b0a-02b6d8aa44a7",
    "name": "Chapel Hill Denham Research",
    "title": "Department Research / Routine Research",
    "coverage": [],
    "sectors": [],
    "bio": "The House View represents Chapel Hill Denham Research's consolidated perspective across equity, macroeconomic, sector and market strategy coverage. It is used where a report reflects the desk's institutional view rather than a single named analyst.",
    "photo_path": "",
    "photo_position": "50% 0%",
    "isHouseView": true
  }
];

export const mockReports: Report[] = [
  {
    "id": "f393d033-6d39-4e0d-98f6-338d733ebb43",
    "uuid": "f393d033-6d39-4e0d-98f6-338d733ebb43",
    "title": "2025 Debt TAI",
    "type": "Report",
    "category": "fixed-income",
    "coverage": "",
    "synopsis": "",
    "date": "2025-09-11",
    "analyst_id": "b5912ff3-e1c8-44ed-9b0a-02b6d8aa44a7",
    "analyst_name": "Chapel Hill Denham Research",
    "access_level": "subscriber",
    "tags": [],
    "featured": false
  },
  {
    "id": "20aa34f7-a9ec-4b02-88d7-30d2b529635b",
    "uuid": "20aa34f7-a9ec-4b02-88d7-30d2b529635b",
    "title": "Accesscorp Company Update 2025",
    "type": "Report",
    "category": "research-report",
    "coverage": "",
    "synopsis": "",
    "date": "2025-11-14",
    "analyst_id": "aebb5193-74b5-4496-b8f8-477db5043011",
    "analyst_name": "Nabila Mohammed",
    "access_level": "subscriber",
    "tags": [],
    "featured": false
  },
  {
    "id": "d2720c50-f3d4-4adc-a11a-e02f9aa82323",
    "uuid": "d2720c50-f3d4-4adc-a11a-e02f9aa82323",
    "title": "Airtel Africa Plc Company Research Update",
    "type": "Report",
    "category": "equity-research",
    "coverage": "",
    "synopsis": "",
    "date": "2025-05-16",
    "analyst_id": "b18ecc2d-6b05-4f87-b37a-68cef253df94",
    "analyst_name": "Tajudeen Ibrahim",
    "access_level": "subscriber",
    "tags": [],
    "featured": false
  },
  {
    "id": "559f9ac1-2128-4d05-87a1-715e3d2d6ecf",
    "uuid": "559f9ac1-2128-4d05-87a1-715e3d2d6ecf",
    "title": "Dangote Cement 9M - 24 Initial Comment",
    "type": "Report",
    "category": "sector-research",
    "coverage": "",
    "synopsis": "",
    "date": "2024-10-29",
    "analyst_id": "2707f7e6-b1bf-4989-8a2c-e19700c01c4c",
    "analyst_name": "Gideon Oshadumi",
    "access_level": "subscriber",
    "tags": [],
    "featured": false
  },
  {
    "id": "04051a6e-baff-4038-848a-32006b32f8ac",
    "uuid": "04051a6e-baff-4038-848a-32006b32f8ac",
    "title": "Dangote Cement Plc FY - 25 Company Update (1)",
    "type": "Report",
    "category": "equity-research",
    "coverage": "",
    "synopsis": "",
    "date": "2026-03-16",
    "analyst_id": "2707f7e6-b1bf-4989-8a2c-e19700c01c4c",
    "analyst_name": "Gideon Oshadumi",
    "access_level": "subscriber",
    "tags": [],
    "featured": false
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

export const getAnalystById = (id: number | string) => mockAnalysts.find(a => String(a.id) === String(id));
export const getReportById = (id: number | string) => mockReports.find(r => String(r.id) === String(id) || r.uuid === id);
export const relatedReportsFor = (report: Report) =>
  mockReports.filter(item => item.id !== report.id && (item.category === report.category || item.analyst_id === report.analyst_id)).slice(0, 3);
