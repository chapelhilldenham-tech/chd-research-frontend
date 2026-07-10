import ReportCard from '../components/ReportCard';

import { fetchPublicResearchReportBundle } from '../lib/supabase';
import type { NormalizedReport } from '../types/research';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const viewTabs = ['Research Library', 'Daily & Weekly Updates'] as const;

const categories = [
  { value: 'equity-research', label: 'Equity Research' },
  { value: 'fixed-income', label: 'Fixed Income' },
  { value: 'sector', label: 'Sector Research' },
  { value: 'strategy-outlook', label: 'Strategy & Outlook' },
  { value: 'macro-research', label: 'Macroeconomic Research' },
];

const periodicityOptions = ['All', 'Daily', 'Weekly'] as const;

function isRoutine(report: NormalizedReport) {
  return report.documentType === 'daily' || report.documentType === 'weekly';
}

export default function Reports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeView, setActiveView] = useState<(typeof viewTabs)[number]>(
    () => (searchParams.get('view') === 'daily-weekly' ? 'Daily & Weekly Updates' : 'Research Library')
  );
  const [search, setSearch] = useState(() => searchParams.get('search') || '');
  const [selected, setSelected] = useState<string[]>(() => {
    const values = searchParams.getAll('category')
      .flatMap(value => value.split(','))
      .map(value => value.trim())
      .filter(Boolean);
    return values;
  });
  const [periodicity, setPeriodicity] = useState<(typeof periodicityOptions)[number]>('All');
  const [reports, setReports] = useState<NormalizedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadReports() {
      const data = await fetchPublicResearchReportBundle();
      if (!mounted) return;
      if (data) {
        setReports(data);
      }
      setLoading(false);
    }

    loadReports();
    return () => {
      mounted = false;
    };
  }, []);

  const libraryPool = useMemo(() => reports.filter(report => !isRoutine(report)), [reports]);
  const dailyWeeklyPool = useMemo(() => reports.filter(isRoutine), [reports]);

  const libraryReports = useMemo(() => {
    const term = search.trim().toLowerCase();
    return libraryPool.filter(report => {
      const categoryMatch = selected.length === 0 || selected.includes(report.categorySlug);
      const searchMatch = term === '' || [
        report.title,
        report.synopsis,
        report.analysts.map(a => a.name).join(' '),
        report.documentType,
        report.tags.join(' ')
      ].join(' ').toLowerCase().includes(term);
      return categoryMatch && searchMatch;
    });
  }, [libraryPool, search, selected]);

  const dailyWeeklyReports = useMemo(() => {
    const term = search.trim().toLowerCase();
    return dailyWeeklyPool.filter(report => {
      const periodicityMatch = periodicity === 'All' || report.documentType === periodicity.toLowerCase();
      const searchMatch = term === '' || [
        report.title,
        report.synopsis,
        report.tags.join(' ')
      ].join(' ').toLowerCase().includes(term);
      return periodicityMatch && searchMatch;
    });
  }, [dailyWeeklyPool, search, periodicity]);

  const filteredReports = activeView === 'Research Library' ? libraryReports : dailyWeeklyReports;
  const currentPool = activeView === 'Research Library' ? libraryPool : dailyWeeklyPool;

  const toggleCategory = (category: string) => {
    setSelected(current => current.includes(category) ? current.filter(item => item !== category) : [...current, category]);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeView === 'Daily & Weekly Updates') {
      params.set('view', 'daily-weekly');
    }
    selected.forEach(category => params.append('category', category));
    if (search.trim() !== '') {
      params.set('search', search.trim());
    }
    setSearchParams(params, { replace: true });
  }, [search, selected, activeView, setSearchParams]);

  const clearFilters = () => {
    setSearch('');
    setSelected([]);
    setPeriodicity('All');
  };

  const libraryFilterControls = (prefix = '') => (
    <div className="form-grid">
      <div className="field">
        <label htmlFor={`${prefix}report-search`}>Search</label>
        <input
          id={`${prefix}report-search`}
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search by title, analyst or keyword..."
        />
      </div>
      <fieldset className="filter-checks">
        <legend>Category</legend>
        {categories.map(category => (
          <div className={`checkbox-item${selected.includes(category.value) ? ' active' : ''}`} key={`${prefix}${category.value}`}>
            <input
              id={`${prefix}cat-${category.value}`}
              type="checkbox"
              checked={selected.includes(category.value)}
              onChange={() => toggleCategory(category.value)}
            />
            <label htmlFor={`${prefix}cat-${category.value}`}>{category.label}</label>
          </div>
        ))}
      </fieldset>
      <button className="btn btn-border" type="button" onClick={clearFilters}>Clear Filters</button>
    </div>
  );

  const dailyWeeklyFilterControls = (prefix = '') => (
    <div className="form-grid">
      <div className="field">
        <label htmlFor={`${prefix}dw-search`}>Search</label>
        <input
          id={`${prefix}dw-search`}
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search by title or keyword..."
        />
      </div>
      <fieldset className="filter-checks">
        <legend>Frequency</legend>
        {periodicityOptions.map(option => (
          <div className={`checkbox-item${periodicity === option ? ' active' : ''}`} key={`${prefix}${option}`}>
            <input
              id={`${prefix}freq-${option}`}
              type="radio"
              name={`${prefix}frequency`}
              checked={periodicity === option}
              onChange={() => setPeriodicity(option)}
            />
            <label htmlFor={`${prefix}freq-${option}`}>{option}</label>
          </div>
        ))}
      </fieldset>
      <button className="btn btn-border" type="button" onClick={clearFilters}>Clear Filters</button>
    </div>
  );

  const filterControls = (prefix = '') =>
    activeView === 'Research Library' ? libraryFilterControls(prefix) : dailyWeeklyFilterControls(prefix);

  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Research Library</h1>
        </div>
      </header>

      <section className="section reports-content-section">
        <div className="container">
          <div className="report-view-tabs" role="tablist" aria-label="Report views">
            {viewTabs.map(tab => (
              <button
                key={tab}
                type="button"
                role="tab"
                className={`report-view-tab${activeView === tab ? ' active' : ''}`}
                aria-selected={activeView === tab}
                onClick={() => setActiveView(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="btn btn-navy filter-mobile" type="button" onClick={() => setIsSheetOpen(true)}>
            Filters
          </button>
          <div className="filter-layout">
            <aside className="filter-sidebar">
              {filterControls()}
            </aside>
            <section>
              <div className="report-discovery-toolbar">
                <strong>{activeView}</strong>
                <span className="text-muted">{loading ? 'Loading published reports...' : `Showing ${filteredReports.length} of ${currentPool.length} reports`}</span>
              </div>
              {filteredReports.length === 0 && (
                <p className="notice report-filter-empty">No reports match your current filters.</p>
              )}
              <div className="report-grid">
                {filteredReports.map(report => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </section>
          </div>
          <div className={`bottom-sheet${isSheetOpen ? ' open' : ''}`}>
            <button className="drawer-close" type="button" onClick={() => setIsSheetOpen(false)}>x</button>
            {filterControls('mobile-')}
          </div>
        </div>
      </section>
    </main>
  );
}
