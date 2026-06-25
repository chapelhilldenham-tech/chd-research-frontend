export type SnapshotMetric = {
  label: string;
  value: string;
  change?: string;
  effectiveDate?: string;
  sourceStatus?: string;
};

export type SnapshotSector = {
  status: 'available' | 'pending';
  effectiveDate?: string;
  metrics: SnapshotMetric[];
  commentary: string;
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
  sectors: {
    Banking: {
      status: 'available',
      effectiveDate: 'Mixed: 23 May 2026 and Q1 2026',
      metrics: [
        { label: 'Deposit Money Banks Credit', value: 'N59.98trn', change: '+0.47%', effectiveDate: '23 May 2026' },
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
        { label: 'Net Asset Value', value: 'N30.94trn', change: '+4.81%', effectiveDate: '23 Apr 2026' },
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
  paramount: {
    effectiveDate: 'Q1 2026',
    summary: [
      { label: 'Index Value', value: '2,750.40', sourceStatus: '' },
      { label: '1D', value: '+1.15%', sourceStatus: '' },
      { label: '1W', value: '+3.10%', sourceStatus: '' },
      { label: '1M', value: '+5.40%', sourceStatus: '' },
      { label: 'YTD', value: '+36.50%', sourceStatus: '' },
    ],
    weights: [
      { ticker: 'ARADEL', weight: '13.21%', lastPrice: '-', change: '-' },
      { ticker: 'MTNN', weight: '12.60%', lastPrice: '720.00', change: '-0.69%', sourceStatus: '' },
      { ticker: 'GTCO', weight: '12.21%', lastPrice: '110.00', change: '-0.45%', sourceStatus: '' },
      { ticker: 'ZENITHBANK', weight: '10.07%', lastPrice: '105.50', change: '+1.15%', sourceStatus: '' },
      { ticker: 'SEPLAT', weight: '9.05%', lastPrice: '3,600.00', change: '+2.85%', sourceStatus: '' },
      { ticker: 'AIRTELAFRI', weight: '5.81%', lastPrice: '2,100.00', change: '0.00%', sourceStatus: '' },
      { ticker: 'UBA', weight: '4.79%', lastPrice: '-', change: '-' },
      { ticker: 'DANGCEM', weight: '4.72%', lastPrice: '950.00', change: '+1.60%', sourceStatus: '' },
      { ticker: 'FBNH', weight: '4.68%', lastPrice: '-', change: '-' },
      { ticker: 'ACCESS', weight: '3.55%', lastPrice: '-', change: '-' },
      { ticker: 'BUAFOODS', weight: '3.15%', lastPrice: '-', change: '-' },
      { ticker: 'FIDELITYBK', weight: '2.81%', lastPrice: '-', change: '-' },
      { ticker: 'NESTLE', weight: '2.34%', lastPrice: '-', change: '-' },
      { ticker: 'PRESCO', weight: '2.06%', lastPrice: '-', change: '-' },
      { ticker: 'STANBIC', weight: '1.99%', lastPrice: '-', change: '-' },
      { ticker: 'OKOMUOIL', weight: '1.86%', lastPrice: '-', change: '-' },
      { ticker: 'NB', weight: '1.83%', lastPrice: '-', change: '-' },
      { ticker: 'WAPCO', weight: '1.71%', lastPrice: '-', change: '-' },
      { ticker: 'GEREGU', weight: '1.58%', lastPrice: '-', change: '-' },
    ],
  },
} as const;

export type AnalyticsSectorName = keyof typeof analyticsSnapshot.sectors;
export const analyticsSectorOrder = Object.keys(analyticsSnapshot.sectors) as AnalyticsSectorName[];
