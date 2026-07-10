export type ForecastRow = { year: string; value: string; isPlaceholder?: boolean };

export type SnapshotMetric = {
  label: string;
  value: string;
  change?: string;
  effectiveDate?: string;
  sourceStatus?: string;
  forecast?: ForecastRow[];
};

export type SnapshotSector = {
  status: 'available' | 'pending';
  effectiveDate?: string;
  metrics: SnapshotMetric[];
  commentary: string;
};

export type FixedIncomeRow = {
  bond: string;
  maturity: string;
  coupon: string;
  yield: string;
  price: string;
};

export const analyticsSnapshot = {
  sourceLabel: 'Adefolarin.xlsx',
  fallbackLabel: '',
  statusNote:
    'Staging data snapshot. Figures are manually loaded from the latest provided spreadsheet. Some fields use previous snapshot values and are clearly marked pending update until confirmed.',
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
  macroSourcesNote:
    'Draft — pending confirmation with Nabila Mohammed. GDP, CPI and Policy Rate figures sourced from the National Bureau of Statistics and Central Bank of Nigeria. FX from FMDQ. 2026-2028 figures are Chapel Hill Denham Research house forecasts.',
  macroIndicators: [
    {
      label: 'GDP Growth (%)', value: '3.89%', change: '-0.18ppt', effectiveDate: '9 Jul 2026',
      forecast: [
        { year: '2025A', value: '4.53%' },
        { year: '2026F', value: '4.39%' },
        { year: '2027F', value: '5.01%' },
        { year: '2028F', value: '—', isPlaceholder: true },
      ],
    },
    {
      label: 'CPI / Inflation (%)', value: '15.93%', change: '+0.24ppt', effectiveDate: '9 Jul 2026',
      forecast: [
        { year: '2026F', value: '—', isPlaceholder: true },
        { year: '2027F', value: '—', isPlaceholder: true },
        { year: '2028F', value: '—', isPlaceholder: true },
      ],
    },
    {
      label: 'Policy Rate / MPR (%)', value: '26.50%', change: '0.00ppt', effectiveDate: '9 Jul 2026',
      forecast: [
        { year: '2026F', value: '—', isPlaceholder: true },
        { year: '2027F', value: '—', isPlaceholder: true },
        { year: '2028F', value: '—', isPlaceholder: true },
      ],
    },
    {
      label: 'FX (USD/NGN)', value: '1,370.64', change: '+0.11%', effectiveDate: '9 Jul 2026',
      forecast: [
        { year: '2026F', value: '—', isPlaceholder: true },
        { year: '2027F', value: '—', isPlaceholder: true },
        { year: '2028F', value: '—', isPlaceholder: true },
      ],
    },
    { label: 'Credit Growth', value: 'N59.98tn', change: '+0.47%', effectiveDate: '9 Jul 2026' },
    { label: 'Debt/GDP (%)', value: '36.07%', change: '-2.73ppt', effectiveDate: '9 Jul 2026' },
  ],
  market: {
    effectiveDate: '23 Jun 2026',
    summary: [
      { label: 'NGX ASI', value: '240,743.19' },
      { label: 'Market Cap', value: 'N154.48tn' },
      { label: 'Volume', value: '565.00mn' },
    ],
    stats: [
      { label: 'NGX ASI Change', value: '+2,524.00 / +1.06%', change: 'Day change' },
      { label: 'Top Gainer', value: 'LAFARGE +3.04%', change: 'Leading advance', sourceStatus: '' },
      { label: 'Top Loser', value: 'BUACEMENT -1.07%', change: 'Steepest decline', sourceStatus: '' },
      { label: 'Total Gainers', value: '8.00', change: 'Advancing issues', sourceStatus: '' },
      { label: 'Total Losers', value: '2.00', change: 'Declining issues', sourceStatus: '' },
    ],
    rows: [
      { ticker: 'DANGCEM', price: '751.00', change: '+12.00', percent: '+1.62%', sourceStatus: '' },
      { ticker: 'MTNN', price: '248.50', change: '-2.10', percent: '-0.84%', sourceStatus: '' },
      { ticker: 'GTCO', price: '64.30', change: '+1.80', percent: '+2.88%', sourceStatus: '' },
      { ticker: 'ACCESSCORP', price: '24.45', change: '+0.35', percent: '+1.45%', sourceStatus: '' },
      { ticker: 'ZENITHBANK', price: '52.80', change: '+0.95', percent: '+1.83%', sourceStatus: '' },
      { ticker: 'NGXGROUP', price: '31.20', change: '+0.80', percent: '+2.63%', sourceStatus: '' },
      { ticker: 'SEPLAT', price: '5,240.00', change: '+90.00', percent: '+1.75%', sourceStatus: '' },
    ],
  },
  fixedIncomeSourcesNote:
    'Draft — pending confirmation. Local currency (LCY) bond and Eurobond pricing to be sourced from FMDQ. Table structure is in place; figures pending data feed.',
  fixedIncome: {
    effectiveDate: '9 Jul 2026',
    lcyBonds: Array.from({ length: 29 }, (_, i) => ({
      bond: `FGN Bond ${i + 1}`,
      maturity: '—',
      coupon: '—',
      yield: '—',
      price: '—',
    })),
    eurobonds: Array.from({ length: 10 }, (_, i) => ({
      bond: `NGERIA Eurobond ${i + 1}`,
      maturity: '—',
      coupon: '—',
      yield: '—',
      price: '—',
    })),
  },
  sectorSourcesNote:
    'Draft — pending confirmation. Sector metrics sourced from NGX, sector regulators (CBN, NCC, PenCom, NUPRC) and CHD Research estimates.',
  sectors: {
    Banking: {
      status: 'available',
      effectiveDate: 'Mixed: 23 May 2026 and Q1 2026',
      metrics: [
        { label: 'Deposit Money Banks Credit', value: 'N59.98tn', change: '+0.47%', effectiveDate: '23 May 2026' },
        { label: 'NPL Ratio', value: '10.59%', change: '+2.47ppt', effectiveDate: 'Q1 2026' },
        { label: 'Real GDP Contribution', value: '3.33%', change: '+1.06ppt', effectiveDate: 'Q1 2026' },
        { label: 'ROE', value: '27.11%', change: '+8.02ppt', effectiveDate: 'Q1 2026' },
        { label: 'Index return (YTD)', value: '41.33%', change: '--', effectiveDate: '24 Jun 2026' },
      ],
      commentary: 'Banking snapshot includes confirmed credit, asset quality, real GDP contribution, ROE, and YTD index return metrics.',
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
      commentary: 'Telecoms snapshot includes confirmed subscriber, broadband, mobile subscriber, and real GDP contribution metrics.',
    },
    Pension: {
      status: 'available',
      effectiveDate: '23 Apr 2026',
      metrics: [
        { label: 'Net Asset Value', value: 'N30.94tn', change: '+4.81%', effectiveDate: '23 Apr 2026' },
        { label: 'RSA membership', value: '11.23mn', change: '+0.44%', effectiveDate: '23 Apr 2026' },
        { label: 'Equity allocation', value: '21.92%', change: '+2.58ppt', effectiveDate: '23 Apr 2026' },
        { label: 'FGN securities allocation', value: '56.10%', change: '-1.97ppt', effectiveDate: '23 Apr 2026' },
      ],
      commentary: 'Pension metrics updated.',
    },
    'Oil & Gas': {
      status: 'available',
      effectiveDate: 'Mixed: 23 May 2026 and Q1 2026',
      metrics: [
        { label: 'Crude Oil Production', value: '1.53mbpd', change: '+2.68%', effectiveDate: '23 May 2026' },
        { label: 'Brent Crude', value: '$76.80', change: '-0.93%', effectiveDate: 'Q1 2026' },
        { label: 'Gas production', value: '245,966.16mmscf', change: '+3.31%', effectiveDate: '23 May 2026' },
        { label: 'Index return (YTD)', value: '110.60%', change: '--', effectiveDate: '24 Jun 2026' },
      ],
      commentary: 'Oil & Gas metrics updated.',
    },
    'Consumer Goods': {
      status: 'available',
      effectiveDate: '24 Jun 2026',
      metrics: [
        { label: 'Global sugar price', value: '14.13cts/lb', change: '+0.43%', effectiveDate: '24 Jun 2026' },
        { label: 'Global crude palm oil price', value: '$1,130.03/mt', change: '-0.65%', effectiveDate: '24 Jun 2026' },
        { label: 'Index return (YTD)', value: '17.53%', change: '--', effectiveDate: '24 Jun 2026' },
      ],
      commentary: 'Consumer Goods/Agriculture metrics updated.',
    },
  } satisfies Record<string, SnapshotSector>,
  paramountSourcesNote:
    'Draft — pending confirmation. Paramount Index is a Chapel Hill Denham Research proprietary benchmark; constituent pricing from NGX.',
  paramount: {
    effectiveDate: 'Q2 2026',
    summary: [
      { label: 'Paramount Index', value: '607.36', change: '', sourceStatus: '' },
      { label: '1YR', value: '85%', change: '', sourceStatus: '' },
      { label: '2YR', value: '120%', change: '', sourceStatus: '' },
      { label: '3YR', value: '354%', change: '', sourceStatus: '' },
      { label: '5YR', value: '426%', change: '', sourceStatus: '' },
    ],
    points: [
      {"label": "2018-03", "paramount": 100,    "ngx30": 100,    "ngxAllShare": 100},
      {"label": "2018-06", "paramount": 94.59,  "ngx30": 92.79,  "ngxAllShare": 92.23},
      {"label": "2018-09", "paramount": 81.74,  "ngx30": 78.62,  "ngxAllShare": 78.95},
      {"label": "2018-12", "paramount": 78.50,  "ngx30": 75.61,  "ngxAllShare": 75.73},
      {"label": "2019-03", "paramount": 77.83,  "ngx30": 74.30,  "ngxAllShare": 74.79},
      {"label": "2019-06", "paramount": 72.57,  "ngx30": 67.00,  "ngxAllShare": 72.20},
      {"label": "2019-09", "paramount": 68.99,  "ngx30": 61.20,  "ngxAllShare": 66.57},
      {"label": "2019-12", "paramount": 70.57,  "ngx30": 62.84,  "ngxAllShare": 64.67},
      {"label": "2020-03", "paramount": 51.33,  "ngx30": 48.15,  "ngxAllShare": 51.32},
      {"label": "2020-06", "paramount": 65.03,  "ngx30": 56.13,  "ngxAllShare": 58.98},
      {"label": "2020-09", "paramount": 73.25,  "ngx30": 61.29,  "ngxAllShare": 64.66},
      {"label": "2020-12", "paramount": 100.81, "ngx30": 87.51,  "ngxAllShare": 97.03},
      {"label": "2021-03", "paramount": 98.51,  "ngx30": 83.01,  "ngxAllShare": 94.07},
      {"label": "2021-06", "paramount": 101.93, "ngx30": 85.09,  "ngxAllShare": 91.33},
      {"label": "2021-09", "paramount": 106.40, "ngx30": 89.34,  "ngxAllShare": 96.91},
      {"label": "2021-12", "paramount": 113.06, "ngx30": 91.89,  "ngxAllShare": 102.92},
      {"label": "2022-03", "paramount": 115.56, "ngx30": 95.56,  "ngxAllShare": 113.16},
      {"label": "2022-06", "paramount": 130.63, "ngx30": 100.71, "ngxAllShare": 124.85},
      {"label": "2022-09", "paramount": 122.59, "ngx30": 93.21,  "ngxAllShare": 118.12},
      {"label": "2022-12", "paramount": 128.09, "ngx30": 98.30,  "ngxAllShare": 123.48},
      {"label": "2023-03", "paramount": 133.70, "ngx30": 103.15, "ngxAllShare": 130.67},
      {"label": "2023-06", "paramount": 174.68, "ngx30": 117.44, "ngxAllShare": 146.90},
      {"label": "2023-09", "paramount": 187.41, "ngx30": 130.30, "ngxAllShare": 159.94},
      {"label": "2023-12", "paramount": 228.76, "ngx30": 148.87, "ngxAllShare": 180.16},
      {"label": "2024-03", "paramount": 275.66, "ngx30": 207.05, "ngxAllShare": 251.93},
      {"label": "2024-06", "paramount": 255.25, "ngx30": 197.96, "ngxAllShare": 241.08},
      {"label": "2024-09", "paramount": 268.52, "ngx30": 195.35, "ngxAllShare": 237.47},
      {"label": "2024-12", "paramount": 316.25, "ngx30": 203.38, "ngxAllShare": 247.99},
      {"label": "2025-03", "paramount": 327.58, "ngx30": 209.22, "ngxAllShare": 254.58},
      {"label": "2025-06", "paramount": 379.15, "ngx30": 235.99, "ngxAllShare": 289.07},
      {"label": "2025-09", "paramount": 430.95, "ngx30": 278.04, "ngxAllShare": 343.84},
      {"label": "2025-12", "paramount": 453.73, "ngx30": 302.66, "ngxAllShare": 374.93},
      {"label": "2026-03", "paramount": 607.36, "ngx30": 389.77, "ngxAllShare": 484.98},
      {"label": "2026-06", "paramount": 700.87, "ngx30": 444.24, "ngxAllShare": 552.76},
    ],
    performance: [
      { index: 'Paramount', '1YR': '85%', '2YR': '120%', '3YR': '354%', '5YR': '426%' },
      { index: 'NGX30', '1YR': '86%', '2YR': '88%', '3YR': '278%', '5YR': '308%' },
      { index: 'NGXAllShare', '1YR': '91%', '2YR': '93%', '3YR': '271%', '5YR': '329%' },
    ],
    weights: [
      { ticker: 'ARADEL', weight: 13.21, price: 1260 },
      { ticker: 'MTNN', weight: 12.60, price: 760 },
      { ticker: 'GTCO', weight: 12.21, price: 112.65 },
      { ticker: 'ZENITHBANK', weight: 10.07, price: 95.8 },
      { ticker: 'SEPLAT', weight: 9.05, price: 9099.9 },
      { ticker: 'AIRTELAFRI', weight: 5.81, price: 2497 },
      { ticker: 'UBA', weight: 4.79, price: 46.4 },
      { ticker: 'DANGCEM', weight: 4.72, price: 810 },
      { ticker: 'FBNH', weight: 4.68, price: 50 },
      { ticker: 'ACCESS', weight: 3.55, price: 25.85 },
      { ticker: 'BUAFOODS', weight: 3.15, price: 798 },
      { ticker: 'FIDELITYBK', weight: 2.81, price: 19 },
      { ticker: 'NESTLE', weight: 2.34, price: 3395 },
      { ticker: 'PRESCO', weight: 2.06, price: 1980 },
      { ticker: 'STANBIC', weight: 1.99, price: 133.1 },
      { ticker: 'OKOMUOIL', weight: 1.86, price: 1765 },
      { ticker: 'NB', weight: 1.83, price: 73 },
      { ticker: 'WAPCO', weight: 1.71, price: 219.9 },
      { ticker: 'GEREGU', weight: 1.58, price: 1141.5 },
    ],
  },
} as const;

export type AnalyticsSectorName = keyof typeof analyticsSnapshot.sectors;
export const analyticsSectorOrder = Object.keys(analyticsSnapshot.sectors) as AnalyticsSectorName[];
