import ReportCard from '../components/ReportCard';

import { fetchPublicResearchReportBundle } from '../lib/supabase';
import type { NormalizedReport } from '../types/research';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const categories = [
  { value: 'equity-research', label: 'Equity Research' },
  { value: 'fixed-income', label: 'Fixed Income' },
  { value: 'sector', label: 'Sector Research' },
  { value: 'research-report', label: 'Market Updates (Daily & Weekly)' },
];

export default function Reports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get('search') || '');
  const [selected, setSelected] = useState<string[]>(() => {
    const values = searchParams.getAll('category')
      .flatMap(value => value.split(','))
      .map(value => value.trim())
      .filter(Boolean);
    return values;
  });
  const [reports, setReports] = useState<NormalizedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [hideRoutine, setHideRoutine] = useState(false);

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

  const filteredReports = useMemo(() => {
    const term = search.trim().toLowerCase();
    return reports.filter(report => {
      const categoryMatch = selected.length === 0 || selected.includes(report.categorySlug);
      const searchMatch = term === '' || [
        report.title,
        report.synopsis,
        report.analysts.map(a => a.name).join(' '),
        report.documentType,
        report.tags.join(' ')
      ].join(' ').toLowerCase().includes(term);
      const periodicityMatch = !hideRoutine || (report.documentType !== 'daily' && report.documentType !== 'weekly');
      return categoryMatch && searchMatch && periodicityMatch;
    });
  }, [reports, search, selected, hideRoutine]);

  const toggleCategory = (category: string) => {
    setSelected(current => current.includes(category) ? current.filter(item => item !== category) : [...current, category]);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    selected.forEach(category => params.append('category', category));
    if (search.trim() !== '') {
      params.set('search', search.trim());
    }
    setSearchParams(params, { replace: true });
  }, [search, selected, setSearchParams]);

  const clearFilters = () => {
    setSearch('');
    setSelected([]);
    setHideRoutine(false);
  };

  const filterControls = (prefix = '') => (
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
      <fieldset className="filter-checks">
        <legend>Frequency</legend>
        <div className={`checkbox-item${hideRoutine ? ' active' : ''}`}>
          <input
            id={`${prefix}hide-routine`}
            type="checkbox"
            checked={hideRoutine}
            onChange={() => setHideRoutine(v => !v)}
          />
          <label htmlFor={`${prefix}hide-routine`}>Hide Daily &amp; Weekly Updates</label>
        </div>
      </fieldset>
      <button className="btn btn-border" type="button" onClick={clearFilters}>Clear Filters</button>
    </div>
  );

  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Research Library</h1>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <button className="btn btn-navy filter-mobile" type="button" onClick={() => setIsSheetOpen(true)}>
            Filters
          </button>
          <div className="filter-layout">
            <aside className="filter-sidebar">
              {filterControls()}
            </aside>
            <section>
              <div className="report-discovery-toolbar">
                <strong>Research Library</strong>
                <span className="text-muted">{loading ? 'Loading published reports...' : `Showing ${filteredReports.length} of ${reports.length} reports`}</span>
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
