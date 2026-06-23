export interface Analyst {
  id: number;
  name: string;
  title: string;
  coverage: string[];
  bio: string;
  photo_path: string;
  photo_position: string;
}

export interface Report {
  id: number;
  title: string;
  type: string;
  coverage: string;
  synopsis: string;
  date: string;
  analyst_id: number;
  featured?: boolean;
}

export const mockAnalysts: Analyst[] = [
  {
    id: 1,
    name: "Tajudeen Ibrahim",
    title: "Director, Research",
    coverage: ["Telecommunications"],
    bio: "Tajudeen Ibrahim leads the research function and coordinates coverage priorities across Chapel Hill Denham's institutional research platform.",
    photo_path: "/assets/img/analysts/tajudeen-ibrahim.jpg",
    photo_position: "50% 0%"
  },
  {
    id: 2,
    name: "Nabila Mohammed",
    title: "Analyst",
    coverage: ["Financial Services"],
    bio: "Nabila Mohammed covers financial services, with emphasis on bank earnings, balance-sheet trends, capital adequacy and sector regulation.",
    photo_path: "/assets/img/analysts/nabila-mohammed.jpg",
    photo_position: "50% 0%"
  },
  {
    id: 3,
    name: "Gideon Oshadumi",
    title: "Analyst",
    coverage: ["Cement", "Financial Services"],
    bio: "Gideon Oshadumi covers cement and selected financial-services names, focusing on earnings quality, pricing trends, cost pressures and balance-sheet resilience.",
    photo_path: "/assets/img/analysts/gideon-oshadumi.jpg",
    photo_position: "50% 0%"
  },
  {
    id: 4,
    name: "Boluwatife Ishola",
    title: "Analyst",
    coverage: ["FMCGs", "Agriculture"],
    bio: "Boluwatife Ishola covers FMCG and agriculture-linked equities, tracking consumer demand, pricing power, input costs and margin trends.",
    photo_path: "/assets/img/analysts/boluwatife-ishola.jpg",
    photo_position: "50% 24%"
  },
  {
    id: 5,
    name: "Bolade Agboola",
    title: "Analyst",
    coverage: ["Oil & Gas", "FMCGs"],
    bio: "Bolade Agboola supports coverage across oil & gas and FMCG, with a focus on market developments, company fundamentals and sector themes.",
    photo_path: "/assets/img/analysts/bolade-agboola.jpg",
    photo_position: "50% 0%"
  }
];

export const mockReports: Report[] = [
  {
    id: 101,
    title: "Nigerian Telecoms: Sustained Growth Amidst Inflation",
    type: "Sector Update",
    coverage: "Telecommunications",
    synopsis: "An in-depth analysis of Q3 performance across major telecom operators, highlighting ARPU trends and CAPEX cycles.",
    date: "Oct 15, 2026",
    analyst_id: 1,
    featured: true
  },
  {
    id: 102,
    title: "Banking Sector: Capital Adequacy and Rate Hikes",
    type: "Macro / Strategy",
    coverage: "Financial Services",
    synopsis: "Examining the impact of recent central bank rate hikes on net interest margins and loan book quality.",
    date: "Oct 12, 2026",
    analyst_id: 2,
    featured: true
  },
  {
    id: 103,
    title: "Cement Industry: Pricing Power vs Energy Costs",
    type: "Equity Research",
    coverage: "Cement",
    synopsis: "How rising energy costs are offset by aggressive pricing strategies in the cement sector.",
    date: "Oct 05, 2026",
    analyst_id: 3,
    featured: true
  },
  {
    id: 104,
    title: "FMCG: Volume Contraction and Margin Squeeze",
    type: "Equity Research",
    coverage: "FMCGs",
    synopsis: "Consumer wallet pressures are leading to volume contractions across key FMCG segments.",
    date: "Sep 28, 2026",
    analyst_id: 4
  },
  {
    id: 105,
    title: "Oil & Gas: Downstream Deregulation Impacts",
    type: "Sector Update",
    coverage: "Oil & Gas",
    synopsis: "The long-term effects of subsidy removal on downstream marketing companies and their working capital.",
    date: "Sep 20, 2026",
    analyst_id: 5
  }
];

export const getAnalystById = (id: number) => mockAnalysts.find(a => a.id === id);
export const getReportById = (id: number) => mockReports.find(r => r.id === id);
