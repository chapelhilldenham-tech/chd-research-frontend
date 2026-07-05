import { useEffect, useState } from 'react';

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

const STORAGE_KEY = 'chd_analytics_draft_inputs_v1';

const defaultMacroForecasts: MacroForecastMetric[] = [
  {
    key: 'gdp', label: 'GDP Growth (%)', currentValue: '3.89%', change: '-0.18ppt', effectiveDate: 'Q1 2026',
    forecasts: [
      { year: '2025A', value: '4.53%' },
      { year: '2026F', value: '4.39%' },
      { year: '2027F', value: '5.01%' },
      { year: '2028F', value: '' },
    ],
  },
  {
    key: 'cpi', label: 'CPI / Inflation (%)', currentValue: '15.93%', change: '+0.24ppt', effectiveDate: '23 May 2026',
    forecasts: [
      { year: '2026F', value: '' },
      { year: '2027F', value: '' },
      { year: '2028F', value: '' },
    ],
  },
  {
    key: 'mpr', label: 'Policy Rate / MPR (%)', currentValue: '26.50%', change: '0.00ppt', effectiveDate: '23 Jun 2026',
    forecasts: [
      { year: '2026F', value: '' },
      { year: '2027F', value: '' },
      { year: '2028F', value: '' },
    ],
  },
  {
    key: 'fx', label: 'FX (USD/NGN)', currentValue: '1,370.64', change: '+0.11%', effectiveDate: '23 Jun 2026',
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

interface DraftState {
  macroForecasts: MacroForecastMetric[];
  lcyBonds: BondRow[];
  eurobonds: BondRow[];
  macroSourcesNote: string;
  fixedIncomeSourcesNote: string;
  sectorSourcesNote: string;
  paramountSourcesNote: string;
}

function defaultDraft(): DraftState {
  return {
    macroForecasts: defaultMacroForecasts,
    lcyBonds: makeEmptyBondRows(29, 'FGN Bond'),
    eurobonds: makeEmptyBondRows(10, 'NGERIA Eurobond'),
    macroSourcesNote: 'GDP, CPI and Policy Rate figures sourced from the National Bureau of Statistics and Central Bank of Nigeria. FX from FMDQ. 2026-2028 figures are Chapel Hill Denham Research house forecasts.',
    fixedIncomeSourcesNote: 'Local currency (LCY) bond and Eurobond pricing sourced from FMDQ.',
    sectorSourcesNote: 'Sector metrics sourced from NGX, sector regulators (CBN, NCC, PenCom, NUPRC) and CHD Research estimates.',
    paramountSourcesNote: 'Paramount Index is a Chapel Hill Denham Research proprietary benchmark; constituent pricing from NGX.',
  };
}

function loadDraft(): DraftState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultDraft();
    const parsed = JSON.parse(raw);
    return { ...defaultDraft(), ...parsed };
  } catch {
    return defaultDraft();
  }
}

const tabs = ['Macro Forecasts', 'Fixed Income', 'Sources & Commentary'] as const;

export default function AdminAnalyticsDraftInputs() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Macro Forecasts');
  const [draft, setDraft] = useState<DraftState>(defaultDraft);
  const [fiTab, setFiTab] = useState<FixedIncomeTab>('LCY Bonds');
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    setDraft(loadDraft());
  }, []);

  function saveDraft() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setSavedAt(new Date().toLocaleTimeString());
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

  function buildSnippet() {
    const macroIndicatorsSnippet = draft.macroForecasts.map(m => {
      const forecastRows = m.forecasts
        .filter(f => f.year.trim() !== '')
        .map(f => `        { year: '${f.year}', value: '${f.value || '—'}'${f.value ? '' : ', isPlaceholder: true'} },`)
        .join('\n');
      return `    {\n      label: '${m.label}', value: '${m.currentValue}', change: '${m.change}', effectiveDate: '${m.effectiveDate}',\n      forecast: [\n${forecastRows}\n      ],\n    },`;
    }).join('\n');

    const bondRowSnippet = (rows: BondRow[]) => rows.map(r =>
      `      { bond: '${r.bond || '—'}', maturity: '${r.maturity || '—'}', coupon: '${r.coupon || '—'}', yield: '${r.yield || '—'}', price: '${r.price || '—'}' },`
    ).join('\n');

    return `// Paste into src/data/analyticsSnapshot.ts\n\nmacroIndicators: [\n${macroIndicatorsSnippet}\n    { label: 'Credit Growth', value: 'N59.98tn', change: '+0.47%', effectiveDate: '23 May 2026' },\n    { label: 'Debt/GDP (%)', value: '36.07%', change: '-2.73ppt', effectiveDate: 'Q1 2026' },\n  ],\n\nfixedIncome: {\n  effectiveDate: 'Updated',\n  lcyBonds: [\n${bondRowSnippet(draft.lcyBonds)}\n  ],\n  eurobonds: [\n${bondRowSnippet(draft.eurobonds)}\n  ],\n},\n\nmacroSourcesNote: '${draft.macroSourcesNote}',\nfixedIncomeSourcesNote: '${draft.fixedIncomeSourcesNote}',\nsectorSourcesNote: '${draft.sectorSourcesNote}',\nparamountSourcesNote: '${draft.paramountSourcesNote}',\n`;
  }

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(buildSnippet());
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('idle');
    }
  }

  return (
    <>
      <div className="section-head">
        <h1>Data &amp; Analytics — Draft Inputs</h1>
        <span className="status-pill status-pending">Unlinked draft tool — not wired to Supabase yet</span>
      </div>
      <p className="notice">
        This page is for Nabila to enter forecast figures, fixed income pricing, and source notes ahead of the
        real back-office build. Nothing here saves to the live site automatically — use "Save Draft" to keep your
        work in this browser, and "Copy Snippet" to hand the formatted data to Fola for pasting into the site.
      </p>

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
        <button className="btn btn-bronze" type="button" onClick={saveDraft}>Save Draft (this browser)</button>
        {savedAt && <span className="notice">Saved at {savedAt}</span>}
        <button className="btn" type="button" onClick={copySnippet}>Copy Snippet for Fola</button>
        {copyStatus === 'copied' && <span className="notice">Copied to clipboard</span>}
      </div>

      <details className="methodology" style={{ marginTop: 24 }}>
        <summary>Preview snippet</summary>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{buildSnippet()}</pre>
      </details>
    </>
  );
}
