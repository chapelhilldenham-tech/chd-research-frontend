import { useEffect, useState } from 'react';
import { fetchMarketSnapshot, updateMarketSnapshot } from '../../lib/supabase';

type ForecastEntry = { year: string; value: string };
type MacroForecastMetric = {
  key: string;
  label: string;
  currentValue: string;
  change: string;
  effectiveDate: string;
  forecasts: ForecastEntry[];
};
type BondRow = { bond: string; maturity: string; coupon: string; yield: string; price: string };
type FixedIncomeTab = 'LCY Bonds' | 'Eurobonds';
type SimpleKpi = { label: string; value: string; change: string; effectiveDate: string };
type SectorMetricRow = { label: string; value: string; change: string; effectiveDate: string };
type SectorForm = { effectiveDate: string; commentary: string; metrics: SectorMetricRow[] };
type ParamountPerformanceRow = { index: string; '1YR': string; '2YR': string; '3YR': string; '5YR': string };

const DATA_TYPE = 'analytics_dashboard';

const sectorNames = ['Banking', 'Telecoms', 'Pension', 'Oil & Gas', 'Consumer Goods'] as const;

const defaultMacroForecasts: MacroForecastMetric[] = [
  {
    key: 'gdp', label: 'GDP Growth (%)', currentValue: '3.89%', change: '-0.18ppt', effectiveDate: '9 Jul 2026',
    forecasts: [
      { year: '2025A', value: '4.53%' },
      { year: '2026F', value: '4.39%' },
      { year: '2027F', value: '5.01%' },
      { year: '2028F', value: '' },
    ],
  },
  {
    key: 'cpi', label: 'CPI / Inflation (%)', currentValue: '15.93%', change: '+0.24ppt', effectiveDate: '9 Jul 2026',
    forecasts: [
      { year: '2026F', value: '' },
      { year: '2027F', value: '' },
      { year: '2028F', value: '' },
    ],
  },
  {
    key: 'mpr', label: 'Policy Rate / MPR (%)', currentValue: '26.50%', change: '0.00ppt', effectiveDate: '9 Jul 2026',
    forecasts: [
      { year: '2026F', value: '' },
      { year: '2027F', value: '' },
      { year: '2028F', value: '' },
    ],
  },
  {
    key: 'fx', label: 'FX (USD/NGN)', currentValue: '1,370.64', change: '+0.11%', effectiveDate: '9 Jul 2026',
    forecasts: [
      { year: '2026F', value: '' },
      { year: '2027F', value: '' },
      { year: '2028F', value: '' },
    ],
  },
];

function makeEmptyBondRows(count: number, prefix: string): BondRow[] {
  return Array.from({ length: count }, (_, i) => ({
    bond: `${prefix} ${i + 1}`,
    maturity: '',
    coupon: '',
    yield: '',
    price: '',
  }));
}

function defaultSectors(): Record<string, SectorForm> {
  const seed: Record<string, SectorForm> = {
    Banking: {
      effectiveDate: 'Mixed: 23 May 2026 and Q1 2026',
      commentary: 'Banking snapshot includes confirmed credit, asset quality, real GDP contribution, ROE, and YTD index return metrics.',
      metrics: [
        { label: 'Deposit Money Banks Credit', value: 'N59.98tn', change: '+0.47%', effectiveDate: '23 May 2026' },
        { label: 'NPL Ratio', value: '10.59%', change: '+2.47ppt', effectiveDate: 'Q1 2026' },
        { label: 'Real GDP Contribution', value: '3.33%', change: '+1.06ppt', effectiveDate: 'Q1 2026' },
        { label: 'ROE', value: '27.11%', change: '+8.02ppt', effectiveDate: 'Q1 2026' },
        { label: 'Index return (YTD)', value: '41.33%', change: '--', effectiveDate: '24 Jun 2026' },
      ],
    },
    Telecoms: {
      effectiveDate: 'Mixed: 23 Apr 2026 and Q1 2026',
      commentary: 'Telecoms snapshot includes confirmed subscriber, broadband, mobile subscriber, and real GDP contribution metrics.',
      metrics: [
        { label: 'Total Subscribers', value: '188.01mn', change: '+1.23%', effectiveDate: '23 Apr 2026' },
        { label: 'Broadband Subscriptions', value: '120.68mn', change: '+2.53%', effectiveDate: '23 Apr 2026' },
        { label: 'Mobile Subscribers', value: '154.35mn', change: '+0.78%', effectiveDate: '23 Apr 2026' },
        { label: 'Real GDP Contribution', value: '9.19%', change: '+1.07ppt', effectiveDate: 'Q1 2026' },
      ],
    },
    Pension: {
      effectiveDate: '23 Apr 2026',
      commentary: 'Pension metrics updated.',
      metrics: [
        { label: 'Net Asset Value', value: 'N30.94tn', change: '+4.81%', effectiveDate: '23 Apr 2026' },
        { label: 'RSA membership', value: '11.23mn', change: '+0.44%', effectiveDate: '23 Apr 2026' },
        { label: 'Equity allocation', value: '21.92%', change: '+2.58ppt', effectiveDate: '23 Apr 2026' },
        { label: 'FGN securities allocation', value: '56.10%', change: '-1.97ppt', effectiveDate: '23 Apr 2026' },
      ],
    },
    'Oil & Gas': {
      effectiveDate: 'Mixed: 23 May 2026 and Q1 2026',
      commentary: 'Oil & Gas metrics updated.',
      metrics: [
        { label: 'Crude Oil Production', value: '1.53mbpd', change: '+2.68%', effectiveDate: '23 May 2026' },
        { label: 'Brent Crude', value: '$76.80', change: '-0.93%', effectiveDate: 'Q1 2026' },
        { label: 'Gas production', value: '245,966.16mmscf', change: '+3.31%', effectiveDate: '23 May 2026' },
        { label: 'Index return (YTD)', value: '110.60%', change: '--', effectiveDate: '24 Jun 2026' },
      ],
    },
    'Consumer Goods': {
      effectiveDate: '24 Jun 2026',
      commentary: 'Consumer Goods/Agriculture metrics updated.',
      metrics: [
        { label: 'Global sugar price', value: '14.13cts/lb', change: '+0.43%', effectiveDate: '24 Jun 2026' },
        { label: 'Global crude palm oil price', value: '$1,130.03/mt', change: '-0.65%', effectiveDate: '24 Jun 2026' },
        { label: 'Index return (YTD)', value: '17.53%', change: '--', effectiveDate: '24 Jun 2026' },
      ],
    },
  };
  return seed;
}

type HomepageStat = { label: string; value: string };

interface DraftState {
  headlineKpis: SimpleKpi[];
  creditGrowth: SimpleKpi;
  debtGdp: SimpleKpi;
  macroForecasts: MacroForecastMetric[];
  lcyBonds: BondRow[];
  eurobonds: BondRow[];
  sectors: Record<string, SectorForm>;
  paramountIndexValue: string;
  paramount1yr: string;
  paramount2yr: string;
  paramount3yr: string;
  paramount5yr: string;
  paramountPerformance: ParamountPerformanceRow[];
  paramountMethodology: string;
  macroSourcesNote: string;
  fixedIncomeSourcesNote: string;
  sectorSourcesNote: string;
  paramountSourcesNote: string;
  paramountYtd: SimpleKpi;
  homepageStats: HomepageStat[];
}

function defaultDraft(): DraftState {
  return {
    headlineKpis: [
      { label: 'NGX ASI', value: '240,743.19', change: '+1.06%', effectiveDate: '23 Jun 2026' },
      { label: 'FX', value: '1,370.64', change: '+0.11%', effectiveDate: '23 Jun 2026' },
      { label: 'Inflation', value: '15.93%', change: '+0.24ppt', effectiveDate: '23 May 2026' },
      { label: 'MPR', value: '26.50%', change: '0.00ppt', effectiveDate: '23 Jun 2026' },
      { label: 'Commodities', value: 'Brent $76.80', change: '-0.93%', effectiveDate: '23 Jun 2026' },
    ],
    creditGrowth: { label: 'Credit Growth', value: 'N59.98tn', change: '+0.47%', effectiveDate: '9 Jul 2026' },
    debtGdp: { label: 'Debt/GDP (%)', value: '36.07%', change: '-2.73ppt', effectiveDate: '9 Jul 2026' },
    macroForecasts: defaultMacroForecasts,
    lcyBonds: makeEmptyBondRows(29, 'FGN Bond'),
    eurobonds: makeEmptyBondRows(10, 'NGERIA Eurobond'),
    sectors: defaultSectors(),
    paramountIndexValue: '607.36',
    paramount1yr: '85%',
    paramount2yr: '120%',
    paramount3yr: '354%',
    paramount5yr: '426%',
    paramountPerformance: [
      { index: 'Paramount', '1YR': '85%', '2YR': '120%', '3YR': '354%', '5YR': '426%' },
      { index: 'NGX30', '1YR': '86%', '2YR': '88%', '3YR': '278%', '5YR': '308%' },
      { index: 'NGXAllShare', '1YR': '91%', '2YR': '93%', '3YR': '271%', '5YR': '329%' },
    ],
    paramountMethodology: 'The Paramount Index is Chapel Hill Denham\'s proprietary benchmark for selected Nigerian equities. Constituents are screened for liquidity and market relevance, weighted by free-float market capitalisation, and reviewed quarterly.',
    macroSourcesNote: 'GDP, CPI and Policy Rate figures sourced from the National Bureau of Statistics and Central Bank of Nigeria. FX from FMDQ. 2026-2028 figures are Chapel Hill Denham Research house forecasts.',
    fixedIncomeSourcesNote: 'Local currency (LCY) bond and Eurobond pricing sourced from FMDQ.',
    sectorSourcesNote: 'Sector metrics sourced from NGX, sector regulators (CBN, NCC, PenCom, NUPRC) and CHD Research estimates.',
    paramountSourcesNote: 'Paramount Index is a Chapel Hill Denham Research proprietary benchmark; constituent pricing from NGX.',
    paramountYtd: { label: 'Paramount YTD', value: '+11.42%', change: '', effectiveDate: '' },
    homepageStats: [
      { label: 'Research Reports Published', value: '150+' },
      { label: 'Sectors Under Coverage', value: '7' },
      { label: 'Years of Market Intelligence', value: '20+' },
      { label: 'Assets Under Advisory', value: '\u20a6500bn+' },
    ],
  };
}

function mergeWithDefaults(payload: Partial<DraftState> | null | undefined): DraftState {
  const defaults = defaultDraft();
  if (!payload) return defaults;
  return {
    ...defaults,
    ...payload,
    sectors: payload.sectors && Object.keys(payload.sectors).length > 0 ? payload.sectors : defaults.sectors,
    lcyBonds: payload.lcyBonds && payload.lcyBonds.length > 0 ? payload.lcyBonds : defaults.lcyBonds,
    eurobonds: payload.eurobonds && payload.eurobonds.length > 0 ? payload.eurobonds : defaults.eurobonds,
    homepageStats: payload.homepageStats && payload.homepageStats.length > 0 ? payload.homepageStats : defaults.homepageStats,
  };
}

const tabs = [
  'Headline KPIs',
  'Homepage Stats',
  'Macro Forecasts',
  'Fixed Income',
  'Sector Metrics',
  'Paramount Index',
  'Sources & Commentary',
] as const;

export default function AdminAnalyticsDraftInputs() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Headline KPIs');
  const [draft, setDraft] = useState<DraftState>(defaultDraft);
  const [fiTab, setFiTab] = useState<FixedIncomeTab>('LCY Bonds');
  const [activeSector, setActiveSector] = useState<(typeof sectorNames)[number]>('Banking');
  const [loading, setLoading] = useState(true);
  const [publishState, setPublishState] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchMarketSnapshot(DATA_TYPE).then((snapshot) => {
      if (!mounted) return;
      setDraft(mergeWithDefaults(snapshot?.payload as Partial<DraftState> | null));
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  async function publishLive() {
    setPublishState('saving');
    const { error } = await updateMarketSnapshot(DATA_TYPE, draft as unknown as Record<string, unknown>);
    if (error) {
      setPublishState('error');
      return;
    }
    setPublishState('success');
    setPublishedAt(new Date().toLocaleTimeString());
  }

  function updateHeadlineKpi(index: number, field: keyof SimpleKpi, value: string) {
    setDraft(current => ({
      ...current,
      headlineKpis: current.headlineKpis.map((k, i) => i === index ? { ...k, [field]: value } : k),
    }));
  }

  function updateHomepageStat(index: number, value: string) {
    setDraft(current => ({
      ...current,
      homepageStats: current.homepageStats.map((s, i) => i === index ? { ...s, value } : s),
    }));
  }

  function updateMetricField(key: string, field: 'currentValue' | 'change' | 'effectiveDate', value: string) {
    setDraft(current => ({
      ...current,
      macroForecasts: current.macroForecasts.map(m => m.key === key ? { ...m, [field]: value } : m),
    }));
  }

  function updateForecastValue(key: string, year: string, value: string) {
    setDraft(current => ({
      ...current,
      macroForecasts: current.macroForecasts.map(m =>
        m.key === key
          ? { ...m, forecasts: m.forecasts.map(f => f.year === year ? { ...f, value } : f) }
          : m
      ),
    }));
  }

  function addForecastYear(key: string) {
    setDraft(current => ({
      ...current,
      macroForecasts: current.macroForecasts.map(m =>
        m.key === key ? { ...m, forecasts: [...m.forecasts, { year: '', value: '' }] } : m
      ),
    }));
  }

  function removeForecastYear(key: string, year: string) {
    setDraft(current => ({
      ...current,
      macroForecasts: current.macroForecasts.map(m =>
        m.key === key ? { ...m, forecasts: m.forecasts.filter(f => f.year !== year) } : m
      ),
    }));
  }

  function updateBondRow(tab: FixedIncomeTab, index: number, field: keyof BondRow, value: string) {
    const listKey = tab === 'LCY Bonds' ? 'lcyBonds' : 'eurobonds';
    setDraft(current => ({
      ...current,
      [listKey]: current[listKey].map((row, i) => i === index ? { ...row, [field]: value } : row),
    }));
  }

  function addBondRow(tab: FixedIncomeTab) {
    const listKey = tab === 'LCY Bonds' ? 'lcyBonds' : 'eurobonds';
    setDraft(current => ({
      ...current,
      [listKey]: [...current[listKey], { bond: '', maturity: '', coupon: '', yield: '', price: '' }],
    }));
  }

  function removeBondRow(tab: FixedIncomeTab, index: number) {
    const listKey = tab === 'LCY Bonds' ? 'lcyBonds' : 'eurobonds';
    setDraft(current => ({
      ...current,
      [listKey]: current[listKey].filter((_, i) => i !== index),
    }));
  }

  function updateSectorField(sector: string, field: 'effectiveDate' | 'commentary', value: string) {
    setDraft(current => ({
      ...current,
      sectors: { ...current.sectors, [sector]: { ...current.sectors[sector], [field]: value } },
    }));
  }

  function updateSectorMetric(sector: string, index: number, field: keyof SectorMetricRow, value: string) {
    setDraft(current => ({
      ...current,
      sectors: {
        ...current.sectors,
        [sector]: {
          ...current.sectors[sector],
          metrics: current.sectors[sector].metrics.map((m, i) => i === index ? { ...m, [field]: value } : m),
        },
      },
    }));
  }

  function addSectorMetric(sector: string) {
    setDraft(current => ({
      ...current,
      sectors: {
        ...current.sectors,
        [sector]: {
          ...current.sectors[sector],
          metrics: [...current.sectors[sector].metrics, { label: '', value: '', change: '', effectiveDate: '' }],
        },
      },
    }));
  }

  function removeSectorMetric(sector: string, index: number) {
    setDraft(current => ({
      ...current,
      sectors: {
        ...current.sectors,
        [sector]: {
          ...current.sectors[sector],
          metrics: current.sectors[sector].metrics.filter((_, i) => i !== index),
        },
      },
    }));
  }

  function updateParamountPerformance(index: number, field: keyof ParamountPerformanceRow, value: string) {
    setDraft(current => ({
      ...current,
      paramountPerformance: current.paramountPerformance.map((row, i) => i === index ? { ...row, [field]: value } : row),
    }));
  }

  const activeSectorForm = draft.sectors[activeSector];

  return (
    <>
      <div className="section-head">
        <h1>Data &amp; Analytics — Live Inputs</h1>
        <span className="status-pill status-live">Publishes live immediately — no login</span>
      </div>
      <p className="notice">
        This page covers every figure and commentary on the public Data &amp; Analytics page. Changes here go
        live on the public site as soon as you click "Publish Live" below — there's no draft/review step and no
        password on this page, so double-check numbers before publishing. Historical chart points (Paramount vs
        NGX30/NGX All Share time series) aren't editable here — those go through the data import pipeline.
      </p>
      {loading && <p className="notice">Loading current live data…</p>}

      <div className="report-view-tabs" role="tablist" style={{ marginTop: 24 }}>
        {tabs.map(tab => (
          <button
            key={tab}
            type="button"
            role="tab"
            className={`report-view-tab${activeTab === tab ? ' active' : ''}`}
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Headline KPIs' && (
        <section className="grid-4" style={{ marginTop: 20 }}>
          {draft.headlineKpis.map((kpi, index) => (
            <article className="panel" key={kpi.label}>
              <h3>{kpi.label}</h3>
              <div className="form-grid">
                <div className="field">
                  <label>Value</label>
                  <input value={kpi.value} onChange={e => updateHeadlineKpi(index, 'value', e.target.value)} />
                </div>
                <div className="field">
                  <label>Change</label>
                  <input value={kpi.change} onChange={e => updateHeadlineKpi(index, 'change', e.target.value)} />
                </div>
                <div className="field">
                  <label>Effective Date</label>
                  <input value={kpi.effectiveDate} onChange={e => updateHeadlineKpi(index, 'effectiveDate', e.target.value)} />
                </div>
              </div>
            </article>
          ))}
          <article className="panel">
            <h3>Credit Growth</h3>
            <div className="form-grid">
              <div className="field"><label>Value</label><input value={draft.creditGrowth.value} onChange={e => setDraft(c => ({ ...c, creditGrowth: { ...c.creditGrowth, value: e.target.value } }))} /></div>
              <div className="field"><label>Change</label><input value={draft.creditGrowth.change} onChange={e => setDraft(c => ({ ...c, creditGrowth: { ...c.creditGrowth, change: e.target.value } }))} /></div>
              <div className="field"><label>Effective Date</label><input value={draft.creditGrowth.effectiveDate} onChange={e => setDraft(c => ({ ...c, creditGrowth: { ...c.creditGrowth, effectiveDate: e.target.value } }))} /></div>
            </div>
          </article>
          <article className="panel">
            <h3>Debt/GDP (%)</h3>
            <div className="form-grid">
              <div className="field"><label>Value</label><input value={draft.debtGdp.value} onChange={e => setDraft(c => ({ ...c, debtGdp: { ...c.debtGdp, value: e.target.value } }))} /></div>
              <div className="field"><label>Change</label><input value={draft.debtGdp.change} onChange={e => setDraft(c => ({ ...c, debtGdp: { ...c.debtGdp, change: e.target.value } }))} /></div>
              <div className="field"><label>Effective Date</label><input value={draft.debtGdp.effectiveDate} onChange={e => setDraft(c => ({ ...c, debtGdp: { ...c.debtGdp, effectiveDate: e.target.value } }))} /></div>
            </div>
          </article>
          <article className="panel">
            <h3>Paramount YTD</h3>
            <div className="form-grid">
              <div className="field"><label>Value</label><input value={draft.paramountYtd.value} onChange={e => setDraft(c => ({ ...c, paramountYtd: { ...c.paramountYtd, value: e.target.value } }))} /></div>
            </div>
            <p className="notice" style={{ marginTop: 8 }}>Used in the homepage ticker strip.</p>
          </article>
        </section>
      )}

      {activeTab === 'Homepage Stats' && (
        <section className="grid-4" style={{ marginTop: 20 }}>
          {draft.homepageStats.map((stat, index) => (
            <article className="panel" key={stat.label}>
              <h3>{stat.label}</h3>
              <div className="form-grid">
                <div className="field">
                  <label>Value</label>
                  <input value={stat.value} onChange={e => updateHomepageStat(index, e.target.value)} />
                </div>
              </div>
            </article>
          ))}
          <p className="notice" style={{ gridColumn: '1 / -1' }}>
            These three figures appear in the homepage credibility strip (the "150+ / 20+ / ₦500bn+" row).
            Labels are fixed; only the values are editable here.
          </p>
        </section>
      )}

      {activeTab === 'Macro Forecasts' && (
        <section className="grid-2" style={{ marginTop: 20 }}>
          {draft.macroForecasts.map(metric => (
            <article className="panel" key={metric.key}>
              <h3>{metric.label}</h3>
              <div className="form-grid">
                <div className="field">
                  <label>Current Value</label>
                  <input value={metric.currentValue} onChange={e => updateMetricField(metric.key, 'currentValue', e.target.value)} />
                </div>
                <div className="field">
                  <label>Change</label>
                  <input value={metric.change} onChange={e => updateMetricField(metric.key, 'change', e.target.value)} />
                </div>
                <div className="field">
                  <label>Effective Date</label>
                  <input value={metric.effectiveDate} onChange={e => updateMetricField(metric.key, 'effectiveDate', e.target.value)} />
                </div>
              </div>
              <div className="section-head" style={{ marginTop: 16 }}>
                <h4>Forecast Rows</h4>
                <button className="btn" type="button" onClick={() => addForecastYear(metric.key)}>Add year</button>
              </div>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr><th>Year</th><th>Value</th><th></th></tr>
                  </thead>
                  <tbody>
                    {metric.forecasts.map(f => (
                      <tr key={f.year || Math.random()}>
                        <td><input value={f.year} onChange={e => {
                          const newYear = e.target.value;
                          setDraft(current => ({
                            ...current,
                            macroForecasts: current.macroForecasts.map(m =>
                              m.key === metric.key
                                ? { ...m, forecasts: m.forecasts.map(row => row === f ? { ...row, year: newYear } : row) }
                                : m
                            ),
                          }));
                        }} placeholder="e.g. 2026F" /></td>
                        <td><input value={f.value} onChange={e => updateForecastValue(metric.key, f.year, e.target.value)} placeholder="e.g. 4.39%" /></td>
                        <td><button className="btn" type="button" onClick={() => removeForecastYear(metric.key, f.year)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </section>
      )}

      {activeTab === 'Fixed Income' && (
        <section style={{ marginTop: 20 }}>
          <div className="report-view-tabs" role="tablist">
            {(['LCY Bonds', 'Eurobonds'] as const).map(tab => (
              <button
                key={tab}
                type="button"
                role="tab"
                className={`report-view-tab${fiTab === tab ? ' active' : ''}`}
                aria-selected={fiTab === tab}
                onClick={() => setFiTab(tab)}
              >
                {tab} ({(tab === 'LCY Bonds' ? draft.lcyBonds : draft.eurobonds).length})
              </button>
            ))}
          </div>
          <div className="section-head" style={{ marginTop: 16 }}>
            <h3>{fiTab}</h3>
            <button className="btn" type="button" onClick={() => addBondRow(fiTab)}>Add row</button>
          </div>
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Bond</th>
                  <th>Maturity</th>
                  <th>Coupon (%)</th>
                  <th>Yield (%)</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(fiTab === 'LCY Bonds' ? draft.lcyBonds : draft.eurobonds).map((row, index) => (
                  <tr key={index}>
                    <td><input value={row.bond} onChange={e => updateBondRow(fiTab, index, 'bond', e.target.value)} /></td>
                    <td><input value={row.maturity} onChange={e => updateBondRow(fiTab, index, 'maturity', e.target.value)} /></td>
                    <td><input value={row.coupon} onChange={e => updateBondRow(fiTab, index, 'coupon', e.target.value)} /></td>
                    <td><input value={row.yield} onChange={e => updateBondRow(fiTab, index, 'yield', e.target.value)} /></td>
                    <td><input value={row.price} onChange={e => updateBondRow(fiTab, index, 'price', e.target.value)} /></td>
                    <td><button className="btn" type="button" onClick={() => removeBondRow(fiTab, index)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'Sector Metrics' && (
        <section style={{ marginTop: 20 }}>
          <div className="report-view-tabs" role="tablist">
            {sectorNames.map(name => (
              <button
                key={name}
                type="button"
                role="tab"
                className={`report-view-tab${activeSector === name ? ' active' : ''}`}
                aria-selected={activeSector === name}
                onClick={() => setActiveSector(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <article className="panel" style={{ marginTop: 16 }}>
            <div className="form-grid">
              <div className="field">
                <label>Effective Date</label>
                <input value={activeSectorForm.effectiveDate} onChange={e => updateSectorField(activeSector, 'effectiveDate', e.target.value)} />
              </div>
              <div className="field">
                <label>Commentary</label>
                <textarea rows={3} value={activeSectorForm.commentary} onChange={e => updateSectorField(activeSector, 'commentary', e.target.value)} />
              </div>
            </div>
            <div className="section-head" style={{ marginTop: 16 }}>
              <h4>Metrics</h4>
              <button className="btn" type="button" onClick={() => addSectorMetric(activeSector)}>Add row</button>
            </div>
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Label</th><th>Value</th><th>Change</th><th>Effective Date</th><th></th></tr>
                </thead>
                <tbody>
                  {activeSectorForm.metrics.map((m, index) => (
                    <tr key={index}>
                      <td><input value={m.label} onChange={e => updateSectorMetric(activeSector, index, 'label', e.target.value)} /></td>
                      <td><input value={m.value} onChange={e => updateSectorMetric(activeSector, index, 'value', e.target.value)} /></td>
                      <td><input value={m.change} onChange={e => updateSectorMetric(activeSector, index, 'change', e.target.value)} /></td>
                      <td><input value={m.effectiveDate} onChange={e => updateSectorMetric(activeSector, index, 'effectiveDate', e.target.value)} /></td>
                      <td><button className="btn" type="button" onClick={() => removeSectorMetric(activeSector, index)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      )}

      {activeTab === 'Paramount Index' && (
        <section style={{ marginTop: 20 }}>
          <article className="panel">
            <h3>Summary</h3>
            <div className="form-grid">
              <div className="field"><label>Index Value</label><input value={draft.paramountIndexValue} onChange={e => setDraft(c => ({ ...c, paramountIndexValue: e.target.value }))} /></div>
              <div className="field"><label>1YR</label><input value={draft.paramount1yr} onChange={e => setDraft(c => ({ ...c, paramount1yr: e.target.value }))} /></div>
              <div className="field"><label>2YR</label><input value={draft.paramount2yr} onChange={e => setDraft(c => ({ ...c, paramount2yr: e.target.value }))} /></div>
              <div className="field"><label>3YR</label><input value={draft.paramount3yr} onChange={e => setDraft(c => ({ ...c, paramount3yr: e.target.value }))} /></div>
              <div className="field"><label>5YR</label><input value={draft.paramount5yr} onChange={e => setDraft(c => ({ ...c, paramount5yr: e.target.value }))} /></div>
            </div>
          </article>
          <article className="panel" style={{ marginTop: 16 }}>
            <h3>Performance Table</h3>
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Index</th><th>1YR</th><th>2YR</th><th>3YR</th><th>5YR</th></tr>
                </thead>
                <tbody>
                  {draft.paramountPerformance.map((row, index) => (
                    <tr key={row.index}>
                      <td>{row.index}</td>
                      <td><input value={row['1YR']} onChange={e => updateParamountPerformance(index, '1YR', e.target.value)} /></td>
                      <td><input value={row['2YR']} onChange={e => updateParamountPerformance(index, '2YR', e.target.value)} /></td>
                      <td><input value={row['3YR']} onChange={e => updateParamountPerformance(index, '3YR', e.target.value)} /></td>
                      <td><input value={row['5YR']} onChange={e => updateParamountPerformance(index, '5YR', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
          <article className="panel" style={{ marginTop: 16 }}>
            <h3>Methodology</h3>
            <textarea rows={4} value={draft.paramountMethodology} onChange={e => setDraft(c => ({ ...c, paramountMethodology: e.target.value }))} />
          </article>
          <p className="notice" style={{ marginTop: 12 }}>
            Historical chart points (Paramount vs NGX30/NGX All Share quarterly series) aren't editable here —
            those go through the data import pipeline, same as the existing back office.
          </p>
        </section>
      )}

      {activeTab === 'Sources & Commentary' && (
        <section className="grid-2" style={{ marginTop: 20 }}>
          <article className="panel">
            <h3>Macro Sources</h3>
            <textarea rows={4} value={draft.macroSourcesNote} onChange={e => setDraft(c => ({ ...c, macroSourcesNote: e.target.value }))} />
          </article>
          <article className="panel">
            <h3>Fixed Income Sources</h3>
            <textarea rows={4} value={draft.fixedIncomeSourcesNote} onChange={e => setDraft(c => ({ ...c, fixedIncomeSourcesNote: e.target.value }))} />
          </article>
          <article className="panel">
            <h3>Sector Sources</h3>
            <textarea rows={4} value={draft.sectorSourcesNote} onChange={e => setDraft(c => ({ ...c, sectorSourcesNote: e.target.value }))} />
          </article>
          <article className="panel">
            <h3>Paramount Index Sources</h3>
            <textarea rows={4} value={draft.paramountSourcesNote} onChange={e => setDraft(c => ({ ...c, paramountSourcesNote: e.target.value }))} />
          </article>
        </section>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
        <button className="btn btn-bronze" type="button" onClick={publishLive} disabled={publishState === 'saving' || loading}>
          {publishState === 'saving' ? 'Publishing…' : 'Publish Live'}
        </button>
        {publishState === 'success' && publishedAt && <span className="notice">Published live at {publishedAt}</span>}
        {publishState === 'error' && <span className="notice" style={{ color: 'var(--color-danger)' }}>Publish failed — check connection and try again</span>}
      </div>

      <details className="methodology" style={{ marginTop: 24 }}>
        <summary>Preview current data (JSON)</summary>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{JSON.stringify(draft, null, 2)}</pre>
      </details>
    </>
  );
}
