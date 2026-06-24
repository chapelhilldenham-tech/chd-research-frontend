import ReportCard from '../components/ReportCard';
import { mockReports } from '../data/mockData';
import { useMemo, useState } from 'react';

const categories = [
  { value: 'equity', label: 'Equity Research' },
  { value: 'fixed_income', label: 'Fixed Income' },
  { value: 'macro', label: 'Macroeconomic Analysis' },
  { value: 'sector', label: 'Sector Research' },
  { value: 'index', label: 'The Paramount Index' },
];

export default function Reports() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filteredReports = useMemo(() => {
    const term = search.trim().toLowerCase();
    return mockReports.filter(report => {
      const categoryMatch = selected.length === 0 || selected.includes(report.category);
      const searchMatch = term === '' || [
        report.title,
        report.synopsis,
        report.analyst_name,
        report.type,
        report.tags.join(' ')
      ].join(' ').toLowerCase().includes(term);
      return categoryMatch && searchMatch;
    });
  }, [search, selected]);

  const toggleCategory = (category: string) => {
    setSelected(current => current.includes(category) ? current.filter(item => item !== category) : [...current, category]);
  };

  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Research Library</h1>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="filter-layout">
            <aside className="filter-sidebar">
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="report-search">Search</label>
                  <input
                    id="report-search"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    placeholder="Search by title, analyst or keyword..."
                  />
                </div>
                <fieldset className="filter-checks">
                  <legend>Category</legend>
                  {categories.map(category => (
                    <div className="checkbox-item" key={category.value}>
                      <input
                        id={`cat-${category.value}`}
                        type="checkbox"
                        checked={selected.includes(category.value)}
                        onChange={() => toggleCategory(category.value)}
                      />
                      <label htmlFor={`cat-${category.value}`}>{category.label}</label>
                    </div>
                  ))}
                </fieldset>
                <button className="btn btn-border" type="button" onClick={() => { setSearch(''); setSelected([]); }}>Clear Filters</button>
              </div>
            </aside>
            <section>
              <div className="report-discovery-toolbar">
                <strong>Research Library</strong>
                <span className="text-muted">Showing {filteredReports.length} reports</span>
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
        </div>
      </section>
    </main>
  );
}
