export type SnapshotMetric = {
  label: string;
  value: string;
  change?: string;
  effectiveDate?: string;
};

export type SnapshotSector = {
  status: 'available' | 'pending';
  effectiveDate?: string;
  metrics: SnapshotMetric[];
  commentary: string;
};

export const analyticsSnapshot = {
  sourceLabel: 'Adefolarin.xlsx',
  statusNote:
    'Staging data snapshot. Figures are manually loaded from the latest provided spreadsheet. Some sector metrics are pending update and are intentionally not displayed until confirmed.',
  headlineKpis: [
    { label: 'NGX ASI', value: '240,743.19', change: '+1.06%', effectiveDate: '23 Jun 2026' },
    { label: 'FX', value: '1,370.64', change: '+0.11%', effectiveDate: '23 Jun 2026' },
    { label: 'Inflation', value: '15.93%', change: '+0.24ppt', effectiveDate: '23 May 2026' },
    { label: 'MPR', value: '26.50%', change: '0.00ppt', effectiveDate: '23 Jun 2026' },
    { label: 'Commodities', value: 'Brent $76.80', change: '-0.93%', effectiveDate: '23 Jun 2026' },
  ],
  macroChart: {
    effectiveDate: 'May 2026',
    inflationMpr: [
      { label: 'Jun 2025', inflation: 25.29, mpr: 27.5 },
      { label: 'Jul', inflation: 24.94, mpr: 27.5 },
      { label: 'Aug', inflation: 23.14, mpr: 27.5 },
      { label: 'Sep', inflation: 20.98, mpr: 27.0 },
      { label: 'Oct', inflation: 18.97, mpr: 27.0 },
      { label: 'Nov', inflation: 17.33, mpr: 27.0 },
      { label: 'Dec', inflation: 15.15, mpr: 27.0 },
      { label: 'Jan 2026', inflation: 15.10, mpr: 27.0 },
      { label: 'Feb', inflation: 15.06, mpr: 26.5 },
      { label: 'Mar', inflation: 15.38, mpr: 26.5 },
      { label: 'Apr', inflation: 15.69, mpr: 26.5 },
      { label: 'May', inflation: 15.93, mpr: 26.5 },
    ],
    gdpGrowth: [
      { label: 'Q1 2024', value: 2.27 },
      { label: 'Q2 2024', value: 3.48 },
      { label: 'Q3 2024', value: 3.86 },
      { label: 'Q4 2024', value: 3.76 },
      { label: 'Q1 2025', value: 3.13 },
      { label: 'Q2 2025', value: 4.23 },
      { label: 'Q3 2025', value: 3.98 },
      { label: 'Q4 2025', value: 4.07 },
      { label: 'Q1 2026', value: 3.89 },
    ],
  },
  macroIndicators: [
    { label: 'GDP Growth (%)', value: '3.89%', change: '-0.18ppt', effectiveDate: 'Q1 2026' },
    { label: 'CPI / Inflation (%)', value: '15.93%', change: '+0.24ppt', effectiveDate: '23 May 2026' },
    { label: 'Credit Growth', value: 'N59.98trn', change: '+0.47%', effectiveDate: '23 May 2026' },
    { label: 'Debt/GDP (%)', value: '36.07%', change: '-2.73ppt', effectiveDate: 'Q1 2026' },
  ],
  market: {
    effectiveDate: '23 Jun 2026',
    summary: [
      { label: 'NGX ASI', value: '240,743.19' },
      { label: 'Market Cap', value: 'N154.48trn' },
      { label: 'Volume', value: '565.00mn' },
    ],
    stats: [
      { label: 'NGX ASI Change', value: '+2,524.00 / +1.06%', change: 'Day change' },
    ],
    rows: [] as Array<{ ticker: string; price: string; change: string; percent: string }>,
  },
  sectors: {
    Banking: {
      status: 'available',
      effectiveDate: 'Mixed: 23 May 2026 and Q1 2026',
      metrics: [
        { label: 'Deposit Money Banks Credit', value: 'N59.98trn', change: '+0.47%', effectiveDate: '23 May 2026' },
        { label: 'NPL Ratio', value: '10.59%', change: '+2.47ppt', effectiveDate: 'Q1 2026' },
        { label: 'Real GDP Contribution', value: '3.33%', change: '+1.06ppt', effectiveDate: 'Q1 2026' },
        { label: 'ROE', value: '27.11%', change: '+8.02ppt', effectiveDate: 'Q1 2026' },
      ],
      commentary: 'Banking snapshot includes confirmed credit, asset quality, real GDP contribution, and ROE metrics from the provided workbook.',
    },
    Telecoms: {
      status: 'available',
      effectiveDate: 'Mixed: 23 Apr 2026 and Q1 2026',
      metrics: [
        { label: 'Total Subscribers', value: '188.01mn', change: '+1.23%', effectiveDate: '23 Apr 2026' },
        { label: 'Broadband Subscriptions', value: '120.68mn', change: '+2.53%', effectiveDate: '23 Apr 2026' },
        { label: 'Mobile Subscribers', value: '154.35mn', change: '+0.78%', effectiveDate: '23 Apr 2026' },
        { label: 'Real GDP Contribution', value: '9.19%', change: '+1.07ppt', effectiveDate: 'Q1 2026' },
      ],
      commentary: 'Telecoms snapshot includes confirmed subscriber, broadband, mobile subscriber, and real GDP contribution metrics from the provided workbook.',
    },
    Pension: {
      status: 'pending',
      effectiveDate: 'Pending update',
      metrics: [],
      commentary: 'Pending update. No confirmed Pension sector metrics were included in the provided workbook.',
    },
    'Oil & Gas': {
      status: 'pending',
      effectiveDate: 'Pending update',
      metrics: [],
      commentary: 'Pending update. No confirmed Oil & Gas sector metrics were included in the provided workbook.',
    },
    'Consumer Goods': {
      status: 'pending',
      effectiveDate: 'Pending update',
      metrics: [],
      commentary: 'Pending update. No confirmed Consumer Goods sector metrics were included in the provided workbook.',
    },
  } satisfies Record<string, SnapshotSector>,
  paramount: {
    effectiveDate: 'Q1 2026',
    summary: [
      { label: 'Index Value', value: 'Pending update' },
      { label: '1D', value: 'Pending update' },
      { label: '1W', value: 'Pending update' },
      { label: '1M', value: 'Pending update' },
      { label: 'YTD', value: 'Pending update' },
    ],
    weights: [
      { ticker: 'ARADEL', weight: '13.21%' },
      { ticker: 'MTNN', weight: '12.60%' },
      { ticker: 'GTCO', weight: '12.21%' },
      { ticker: 'ZENITHBANK', weight: '10.07%' },
      { ticker: 'SEPLAT', weight: '9.05%' },
      { ticker: 'AIRTELAFRI', weight: '5.81%' },
      { ticker: 'UBA', weight: '4.79%' },
      { ticker: 'DANGCEM', weight: '4.72%' },
      { ticker: 'FBNH', weight: '4.68%' },
      { ticker: 'ACCESS', weight: '3.55%' },
      { ticker: 'BUAFOODS', weight: '3.15%' },
      { ticker: 'FIDELITYBK', weight: '2.81%' },
      { ticker: 'NESTLE', weight: '2.34%' },
      { ticker: 'PRESCO', weight: '2.06%' },
      { ticker: 'STANBIC', weight: '1.99%' },
      { ticker: 'OKOMUOIL', weight: '1.86%' },
      { ticker: 'NB', weight: '1.83%' },
      { ticker: 'WAPCO', weight: '1.71%' },
      { ticker: 'GEREGU', weight: '1.58%' },
    ],
  },
} as const;

export type AnalyticsSectorName = keyof typeof analyticsSnapshot.sectors;
export const analyticsSectorOrder = Object.keys(analyticsSnapshot.sectors) as AnalyticsSectorName[];
