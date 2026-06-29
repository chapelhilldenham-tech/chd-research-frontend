import { useEffect, useState } from 'react';
import { fetchPublicPriceLists } from '../lib/supabase';

export default function PriceLists() {
  const [activeList, setActiveList] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('2026-06-24');
  const [viewedDate, setViewedDate] = useState('2026-06-24');

  useEffect(() => {
    async function loadPriceLists() {
      const data = await fetchPublicPriceLists();
      if (data && data.length > 0) {
        const found = data.find((item: any) => item.effective_date === viewedDate);
        setActiveList(found || data[0]);
      }
    }

    loadPriceLists();
  }, [viewedDate]);

  const displayDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${viewedDate}T00:00:00`));

  const handleLoadDate = (e: React.FormEvent) => {
    e.preventDefault();
    setViewedDate(selectedDate);
  };

  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Price Lists</h1>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="price-list-intro">
            <p>Reference pricing and market data for Chapel Hill Denham subscribers</p>
          </div>

          {activeList && (
            <div className="price-list-featured">
              <div className="plf-featured-icon">📊</div>
              <div className="plf-featured-info">
                <h3>{activeList.title || 'CHD Price List'}</h3>
                <p className="plf-date">{displayDate}</p>
                <p className="plf-desc">
                  Reference pricing for equities, fixed income instruments, and market data as at {displayDate}.
                </p>
                <p className="plf-size">34 KB · PDF/Excel</p>
              </div>
              <div className="plf-featured-action">
                <a
                  className="btn btn-bronze"
                  href={activeList.file_url}
                  download
                >
                  ↓ Download Price List
                </a>
                <p className="plf-access-note">
                  Available to subscribers
                </p>
              </div>
            </div>
          )}

          <section className="price-list-archive">
            <h2>Select a Different Date</h2>
            <form className="price-list-date-form" onSubmit={handleLoadDate}>
              <input
                type="date"
                className="date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <button className="btn btn-navy btn-sm" type="submit">Load</button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
