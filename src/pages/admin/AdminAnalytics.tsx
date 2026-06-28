import { useEffect, useMemo, useState } from 'react';
import { fetchMarketSnapshot, updateMarketSnapshot } from '../../lib/supabase';

type DataType = 'macro' | 'ngx' | 'yields' | 'paramount' | 'sector';
type TabKey = 'macro' | 'ngx' | 'yields' | 'paramount' | 'sectors';
type FieldKind = 'number' | 'text' | 'textarea';
type SaveState = 'idle' | 'saving' | 'success' | 'error';
type FormValue = string | number | null | undefined;
type Payload = Record<string, unknown>;

interface MarketSnapshot {
  id?: string;
  data_type: DataType;
  payload: Payload | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

interface FieldConfig {
  key: string;
  label: string;
  type: FieldKind;
}

interface TickerRow {
  ticker: string;
  price: FormValue;
  change: FormValue;
  pct_change: FormValue;
}

interface WeightRow {
  ticker: string;
  weight: FormValue;
  price: FormValue;
}

interface MetricRow {
  label: string;
  value: string;
  change: string;
  effectiveDate: string;
}

interface SectorForm {
  effectiveDate: string;
  commentary: string;
  metrics: MetricRow[];
}

const tabs: { key: TabKey; label: string; dataType: DataType }[] = [
  { key: 'macro', label: 'Macro', dataType: 'macro' },
  { key: 'ngx', label: 'NGX Market', dataType: 'ngx' },
  { key: 'yields', label: 'Yields', dataType: 'yields' },
  { key: 'paramount', label: 'Paramount', dataType: 'paramount' },
  { key: 'sectors', label: 'Sectors', dataType: 'sector' },
];

const macroFields: FieldConfig[] = [
  { key: 'gdp_growth', label: 'GDP Growth %', type: 'number' },
  { key: 'inflation', label: 'Inflation %', type: 'number' },
  { key: 'mpr', label: 'MPR %', type: 'number' },
  { key: 'usd_ngn', label: 'USD/NGN Rate', type: 'number' },
  { key: 'debt_gdp', label: 'Debt/GDP %', type: 'number' },
  { key: 'credit_growth_trn', label: 'Credit Growth (₦trn)', type: 'number' },
  { key: 'commentary', label: 'Commentary', type: 'textarea' },
];

const ngxFields: FieldConfig[] = [
  { key: 'value', label: 'ASI Value', type: 'number' },
  { key: 'change', label: 'Day Change', type: 'number' },
  { key: 'pct_change', label: 'Day Change %', type: 'number' },
  { key: 'market_cap', label: 'Market Cap', type: 'text' },
  { key: 'volume_mn', label: 'Volume (mn units)', type: 'number' },
  { key: 'top_gainer', label: 'Top Gainer', type: 'text' },
  { key: 'top_loser', label: 'Top Loser', type: 'text' },
  { key: 'total_gainers', label: 'Total Gainers', type: 'number' },
  { key: 'total_losers', label: 'Total Losers', type: 'number' },
];

const yieldsFields: FieldConfig[] = [
  { key: 'tbill_91', label: '91-Day T-Bill %', type: 'number' },
  { key: 'tbill_182', label: '182-Day T-Bill %', type: 'number' },
  { key: 'tbill_364', label: '364-Day T-Bill %', type: 'number' },
  { key: 'bond_2yr', label: '2-Year Bond %', type: 'number' },
  { key: 'bond_5yr', label: '5-Year Bond %', type: 'number' },
  { key: 'bond_10yr', label: '10-Year Bond %', type: 'number' },
  { key: 'bond_20yr', label: '20-Year Bond %', type: 'number' },
  { key: 'eurobond_2029', label: 'Eurobond 2029 %', type: 'number' },
  { key: 'commentary', label: 'Commentary', type: 'textarea' },
];

const paramountFields: FieldConfig[] = [
  { key: 'index_value', label: 'Paramount Index Value', type: 'number' },
  { key: 'performance.1yr', label: '1 Year Return', type: 'text' },
  { key: 'performance.2yr', label: '2 Year Return', type: 'text' },
  { key: 'performance.3yr', label: '3 Year Return', type: 'text' },
  { key: 'performance.5yr', label: '5 Year Return', type: 'text' },
  { key: 'methodology', label: 'Methodology', type: 'textarea' },
];

const sectorNames = ['Banking', 'Telecoms', 'Pension', 'Oil & Gas', 'Consumer Goods'];

function emptyValues(fields: FieldConfig[]) {
  return fields.reduce<Record<string, FormValue>>((acc, field) => {
    acc[field.key] = '';
    return acc;
  }, {});
}

function getNestedValue(payload: Payload, key: string): FormValue {
  return key.split('.').reduce<unknown>((current, part) => {
    if (current && typeof current === 'object' && part in current) {
      return (current as Payload)[part];
    }
    return '';
  }, payload) as FormValue;
}

function normalizeValues(fields: FieldConfig[], payload: Payload | null | undefined) {
  const source = payload || {};
  return fields.reduce<Record<string, FormValue>>((acc, field) => {
    acc[field.key] = getNestedValue(source, field.key) ?? '';
    return acc;
  }, {});
}

function normalizeNumber(value: FormValue) {
  if (value === '' || value === null || typeof value === 'undefined') return null;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : value;
}

function normalizeScalar(value: FormValue, type: FieldKind) {
  return type === 'number' ? normalizeNumber(value) : String(value ?? '');
}

function buildPayload(fields: FieldConfig[], values: Record<string, FormValue>) {
  return fields.reduce<Payload>((payload, field) => {
    const value = normalizeScalar(values[field.key], field.type);
    if (field.key.includes('.')) {
      const [parent, child] = field.key.split('.');
      payload[parent] = {
        ...((payload[parent] as Payload | undefined) || {}),
        [child]: value,
      };
    } else {
      payload[field.key] = value;
    }
    return payload;
  }, {});
}

function normalizeTickers(payload: Payload | null | undefined): TickerRow[] {
  const tickers = Array.isArray(payload?.tickers) ? payload.tickers : [];
  return tickers.map((row) => {
    const source = row as Payload;
    return {
      ticker: String(source.ticker ?? ''),
      price: source.price as FormValue,
      change: source.change as FormValue,
      pct_change: source.pct_change as FormValue,
    };
  });
}

function normalizeWeights(payload: Payload | null | undefined): WeightRow[] {
  const weights = Array.isArray(payload?.weights) ? payload.weights : [];
  return weights.map((row) => {
    const source = row as Payload;
    return {
      ticker: String(source.ticker ?? ''),
      weight: (source.weight ?? source.weight_pct) as FormValue,
      price: source.price as FormValue,
    };
  });
}

function normalizeSectors(payload: Payload | null | undefined): Record<string, SectorForm> {
  return sectorNames.reduce<Record<string, SectorForm>>((acc, sectorName) => {
    const source = ((payload || {})[sectorName] || {}) as Payload;
    const metrics = Array.isArray(source.metrics) ? source.metrics : [];
    acc[sectorName] = {
      effectiveDate: String(source.effectiveDate ?? source.effective_date ?? ''),
      commentary: String(source.commentary ?? ''),
      metrics: metrics.map((metric) => {
        const row = metric as Payload;
        return {
          label: String(row.label ?? ''),
          value: String(row.value ?? ''),
          change: String(row.change ?? ''),
          effectiveDate: String(row.effectiveDate ?? row.effective_date ?? ''),
        };
      }),
    };
    return acc;
  }, {});
}

function formatUpdatedAt(updatedAt?: string | null) {
  if (!updatedAt) return 'Last updated: Not yet saved';
  return `Last updated: ${new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(updatedAt))}`;
}

function StatusMessage({ status }: { status: SaveState }) {
  if (status === 'idle') return null;
  const statusClass = status === 'saving' ? 'status-saving' : status === 'success' ? 'status-success' : 'status-error';
  const text = status === 'saving' ? 'Saving...' : status === 'success' ? 'Saved ✓' : 'Save failed';
  return <span className={`status-pill ${statusClass}`}>{text}</span>;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: FormValue;
  onChange: (value: FormValue) => void;
}) {
  const common = {
    value: value ?? '',
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  };

  return (
    <div className="field" style={field.type === 'textarea' ? { gridColumn: '1 / -1' } : undefined}>
      <label>{field.label}</label>
      {field.type === 'textarea' ? <textarea {...common} rows={5} /> : <input {...common} type={field.type} />}
    </div>
  );
}

export default function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState<TabKey>('macro');
  const [loading, setLoading] = useState(true);
  const [snapshots, setSnapshots] = useState<Partial<Record<DataType, MarketSnapshot | null>>>({});
  const [saveStatus, setSaveStatus] = useState<Record<TabKey, SaveState>>({
    macro: 'idle',
    ngx: 'idle',
    yields: 'idle',
    paramount: 'idle',
    sectors: 'idle',
  });
  const [macroValues, setMacroValues] = useState(emptyValues(macroFields));
  const [ngxValues, setNgxValues] = useState(emptyValues(ngxFields));
  const [tickers, setTickers] = useState<TickerRow[]>([]);
  const [yieldsValues, setYieldsValues] = useState(emptyValues(yieldsFields));
  const [paramountValues, setParamountValues] = useState(emptyValues(paramountFields));
  const [weights, setWeights] = useState<WeightRow[]>([]);
  const [sectors, setSectors] = useState<Record<string, SectorForm>>(() => normalizeSectors(null));

  const activeConfig = useMemo(() => tabs.find((tab) => tab.key === activeTab) || tabs[0], [activeTab]);

  useEffect(() => {
    let ignore = false;

    async function loadSnapshots() {
      setLoading(true);
      const results = await Promise.all(
        tabs.map(async (tab) => [tab.dataType, await fetchMarketSnapshot(tab.dataType)] as const),
      );

      if (ignore) return;

      const nextSnapshots = results.reduce<Partial<Record<DataType, MarketSnapshot | null>>>((acc, [dataType, snapshot]) => {
        acc[dataType] = snapshot as MarketSnapshot | null;
        return acc;
      }, {});

      setSnapshots(nextSnapshots);
      setMacroValues(normalizeValues(macroFields, nextSnapshots.macro?.payload));
      setNgxValues(normalizeValues(ngxFields, nextSnapshots.ngx?.payload));
      setTickers(normalizeTickers(nextSnapshots.ngx?.payload));
      setYieldsValues(normalizeValues(yieldsFields, nextSnapshots.yields?.payload));
      setParamountValues(normalizeValues(paramountFields, nextSnapshots.paramount?.payload));
      setWeights(normalizeWeights(nextSnapshots.paramount?.payload));
      setSectors(normalizeSectors(nextSnapshots.sector?.payload));
      setLoading(false);
    }

    loadSnapshots();

    return () => {
      ignore = true;
    };
  }, []);

  async function loadTabIfNeeded(tab: (typeof tabs)[number]) {
    setActiveTab(tab.key);
    if (typeof snapshots[tab.dataType] !== 'undefined') return;

    const snapshot = await fetchMarketSnapshot(tab.dataType) as MarketSnapshot | null;
    setSnapshots((current) => ({ ...current, [tab.dataType]: snapshot }));
  }

  function markSaved(tab: TabKey) {
    setSaveStatus((current) => ({ ...current, [tab]: 'success' }));
    window.setTimeout(() => {
      setSaveStatus((current) => current[tab] === 'success' ? { ...current, [tab]: 'idle' } : current);
    }, 3000);
  }

  async function saveSnapshot(tab: TabKey, dataType: DataType, payload: Payload) {
    setSaveStatus((current) => ({ ...current, [tab]: 'saving' }));
    const { error } = await updateMarketSnapshot(dataType, payload);

    if (error) {
      console.error('updateMarketSnapshot error:', error);
      setSaveStatus((current) => ({ ...current, [tab]: 'error' }));
      return;
    }

    const updatedAt = new Date().toISOString();
    setSnapshots((current) => ({
      ...current,
      [dataType]: {
        ...(current[dataType] || { data_type: dataType }),
        data_type: dataType,
        payload,
        updated_at: updatedAt,
      },
    }));
    markSaved(tab);
  }

  function saveMacro() {
    return saveSnapshot('macro', 'macro', buildPayload(macroFields, macroValues));
  }

  function saveNgx() {
    return saveSnapshot('ngx', 'ngx', {
      ...buildPayload(ngxFields, ngxValues),
      tickers: tickers.map((row) => ({
        ticker: row.ticker,
        price: normalizeNumber(row.price),
        change: normalizeNumber(row.change),
        pct_change: normalizeNumber(row.pct_change),
      })),
    });
  }

  function saveYields() {
    return saveSnapshot('yields', 'yields', buildPayload(yieldsFields, yieldsValues));
  }

  function saveParamount() {
    const existingPayload = snapshots.paramount?.payload || {};
    const editablePayload = buildPayload(paramountFields, paramountValues);
    return saveSnapshot('paramount', 'paramount', {
      ...existingPayload,
      index_value: editablePayload.index_value,
      performance: editablePayload.performance,
      methodology: editablePayload.methodology,
      chart_points: existingPayload.chart_points,
      weights: existingPayload.weights,
    });
  }

  function saveSectors() {
    const payload = sectorNames.reduce<Payload>((acc, sectorName) => {
      const sector = sectors[sectorName];
      acc[sectorName] = {
        effectiveDate: sector.effectiveDate,
        commentary: sector.commentary,
        metrics: sector.metrics.map((metric) => ({
          label: metric.label,
          value: metric.value,
          change: metric.change,
          effectiveDate: metric.effectiveDate,
        })),
      };
      return acc;
    }, {});
    return saveSnapshot('sectors', 'sector', payload);
  }

  function updateSector(sectorName: string, updates: Partial<SectorForm>) {
    setSectors((current) => ({
      ...current,
      [sectorName]: {
        ...current[sectorName],
        ...updates,
      },
    }));
  }

  function updateSectorMetric(sectorName: string, index: number, key: keyof MetricRow, value: string) {
    setSectors((current) => ({
      ...current,
      [sectorName]: {
        ...current[sectorName],
        metrics: current[sectorName].metrics.map((metric, metricIndex) => (
          metricIndex === index ? { ...metric, [key]: value } : metric
        )),
      },
    }));
  }

  if (loading) {
    return (
      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Market Data Workspace</h2>
            <p className="muted">Loading...</p>
          </div>
          <span className="status-pill status-active">Loading</span>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Market Data Workspace</h2>
            <p className="muted">Update the live analytics dashboard figures stored in Supabase market snapshots.</p>
          </div>
          <span className="status-pill status-active">{tabs.length} editable snapshots</span>
        </div>
      </section>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            type="button"
            key={tab.key}
            onClick={() => loadTabIfNeeded(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="tab-panel active panel">
        <p className="notice">{formatUpdatedAt(snapshots[activeConfig.dataType]?.updated_at)}</p>

        {activeTab === 'macro' && (
          <>
            <div className="section-head">
              <h2>Macro</h2>
            </div>
            <div className="grid-4">
              {macroFields.map((field) => (
                <FieldInput
                  field={field}
                  key={field.key}
                  value={macroValues[field.key]}
                  onChange={(value) => setMacroValues((current) => ({ ...current, [field.key]: value }))}
                />
              ))}
            </div>
            <section className="panel" style={{ marginTop: 20 }}>
              <h3>Effective dates</h3>
              <pre className="notice">{JSON.stringify(snapshots.macro?.payload?.effective_dates || {}, null, 2)}</pre>
            </section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
              <button className="btn btn-bronze" type="button" onClick={saveMacro}>Save Macro</button>
              <StatusMessage status={saveStatus.macro} />
            </div>
          </>
        )}

        {activeTab === 'ngx' && (
          <>
            <div className="section-head">
              <h2>NGX Market</h2>
            </div>
            <div className="grid-4">
              {ngxFields.map((field) => (
                <FieldInput
                  field={field}
                  key={field.key}
                  value={ngxValues[field.key]}
                  onChange={(value) => setNgxValues((current) => ({ ...current, [field.key]: value }))}
                />
              ))}
            </div>
            <section className="panel" style={{ marginTop: 20 }}>
              <div className="section-head">
                <h3>Tickers</h3>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setTickers((current) => [...current, { ticker: '', price: '', change: '', pct_change: '' }])}
                >
                  Add row
                </button>
              </div>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ticker</th>
                      <th>Price</th>
                      <th>Change</th>
                      <th>% Change</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickers.map((row, index) => (
                      <tr key={`${row.ticker}-${index}`}>
                        <td><input value={row.ticker} onChange={(event) => setTickers((current) => current.map((item, rowIndex) => rowIndex === index ? { ...item, ticker: event.target.value } : item))} /></td>
                        <td><input type="number" value={row.price ?? ''} onChange={(event) => setTickers((current) => current.map((item, rowIndex) => rowIndex === index ? { ...item, price: event.target.value } : item))} /></td>
                        <td><input type="number" value={row.change ?? ''} onChange={(event) => setTickers((current) => current.map((item, rowIndex) => rowIndex === index ? { ...item, change: event.target.value } : item))} /></td>
                        <td><input type="number" value={row.pct_change ?? ''} onChange={(event) => setTickers((current) => current.map((item, rowIndex) => rowIndex === index ? { ...item, pct_change: event.target.value } : item))} /></td>
                        <td><button className="btn" type="button" onClick={() => setTickers((current) => current.filter((_, rowIndex) => rowIndex !== index))}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
              <button className="btn btn-bronze" type="button" onClick={saveNgx}>Save NGX Market</button>
              <StatusMessage status={saveStatus.ngx} />
            </div>
          </>
        )}

        {activeTab === 'yields' && (
          <>
            <div className="section-head">
              <h2>Yields</h2>
            </div>
            <div className="grid-4">
              {yieldsFields.map((field) => (
                <FieldInput
                  field={field}
                  key={field.key}
                  value={yieldsValues[field.key]}
                  onChange={(value) => setYieldsValues((current) => ({ ...current, [field.key]: value }))}
                />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
              <button className="btn btn-bronze" type="button" onClick={saveYields}>Save Yields</button>
              <StatusMessage status={saveStatus.yields} />
            </div>
          </>
        )}

        {activeTab === 'paramount' && (
          <>
            <div className="section-head">
              <h2>Paramount</h2>
            </div>
            <div className="grid-4">
              {paramountFields.map((field) => (
                <FieldInput
                  field={field}
                  key={field.key}
                  value={paramountValues[field.key]}
                  onChange={(value) => setParamountValues((current) => ({ ...current, [field.key]: value }))}
                />
              ))}
            </div>
            <section className="panel" style={{ marginTop: 20 }}>
              <div className="section-head">
                <h3>Weights</h3>
                <button className="btn" type="button" onClick={() => setWeights((current) => [...current, { ticker: '', weight: '', price: '' }])}>Add row</button>
              </div>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ticker</th>
                      <th>Weight (%)</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {weights.map((row, index) => (
                      <tr key={`${row.ticker}-${index}`}>
                        <td><input value={row.ticker} onChange={(event) => setWeights((current) => current.map((item, rowIndex) => rowIndex === index ? { ...item, ticker: event.target.value } : item))} /></td>
                        <td><input type="number" value={row.weight ?? ''} onChange={(event) => setWeights((current) => current.map((item, rowIndex) => rowIndex === index ? { ...item, weight: event.target.value } : item))} /></td>
                        <td><input type="number" value={row.price ?? ''} onChange={(event) => setWeights((current) => current.map((item, rowIndex) => rowIndex === index ? { ...item, price: event.target.value } : item))} /></td>
                        <td><button className="btn" type="button" onClick={() => setWeights((current) => current.filter((_, rowIndex) => rowIndex !== index))}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <p className="notice" style={{ marginTop: 20 }}>
              {Array.isArray(snapshots.paramount?.payload?.chart_points) ? snapshots.paramount?.payload?.chart_points.length : 0} historical data points loaded. Edit chart history via data import pipeline.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
              <button className="btn btn-bronze" type="button" onClick={saveParamount}>Save Paramount</button>
              <StatusMessage status={saveStatus.paramount} />
            </div>
          </>
        )}

        {activeTab === 'sectors' && (
          <>
            <div className="section-head">
              <h2>Sectors</h2>
            </div>
            <section className="grid-2">
              {sectorNames.map((sectorName) => (
                <article className="panel" key={sectorName}>
                  <h3>{sectorName}</h3>
                  <div className="form-grid">
                    <div className="field">
                      <label>Effective Date</label>
                      <input value={sectors[sectorName].effectiveDate} onChange={(event) => updateSector(sectorName, { effectiveDate: event.target.value })} />
                    </div>
                    <div className="field">
                      <label>Commentary</label>
                      <textarea rows={4} value={sectors[sectorName].commentary} onChange={(event) => updateSector(sectorName, { commentary: event.target.value })} />
                    </div>
                  </div>
                  <div className="section-head" style={{ marginTop: 16 }}>
                    <h4>Metrics</h4>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => updateSector(sectorName, {
                        metrics: [...sectors[sectorName].metrics, { label: '', value: '', change: '', effectiveDate: '' }],
                      })}
                    >
                      Add row
                    </button>
                  </div>
                  <div className="table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Label</th>
                          <th>Value</th>
                          <th>Change</th>
                          <th>Effective Date</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {sectors[sectorName].metrics.map((metric, index) => (
                          <tr key={`${metric.label}-${index}`}>
                            <td><input value={metric.label} onChange={(event) => updateSectorMetric(sectorName, index, 'label', event.target.value)} /></td>
                            <td><input value={metric.value} onChange={(event) => updateSectorMetric(sectorName, index, 'value', event.target.value)} /></td>
                            <td><input value={metric.change} onChange={(event) => updateSectorMetric(sectorName, index, 'change', event.target.value)} /></td>
                            <td><input value={metric.effectiveDate} onChange={(event) => updateSectorMetric(sectorName, index, 'effectiveDate', event.target.value)} /></td>
                            <td>
                              <button
                                className="btn"
                                type="button"
                                onClick={() => updateSector(sectorName, {
                                  metrics: sectors[sectorName].metrics.filter((_, rowIndex) => rowIndex !== index),
                                })}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              ))}
            </section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
              <button className="btn btn-bronze" type="button" onClick={saveSectors}>Save All Sectors</button>
              <StatusMessage status={saveStatus.sectors} />
            </div>
          </>
        )}
      </section>
    </>
  );
}
