import { useEffect, useState } from 'react';
import { fetchPublicPriceLists } from '../lib/supabase';

export default function PriceLists() {
  const [hasAvailableList, setHasAvailableList] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-06-24');
  const [viewedDate, setViewedDate] = useState('2026-06-24');

  useEffect(() => {
    async function loadPriceLists() {
      const data = await fetchPublicPriceLists();
      if (data && data.length > 0) {
        setHasAvailableList(data.some((item: any) => item.effective_date === viewedDate));
      } else {
        setHasAvailableList(false);
      }
    }

    loadPriceLists();
  }, [viewedDate]);

  const displayDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${viewedDate}T00:00:00`));

  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Price Lists</h1>
          <p>Reference pricing and market data files from the Chapel Hill Denham Research desk.</p>
        </div>
      </header>

      <section className="section">
        <div className="container price-list-shell">
          <article className="panel price-list-card">
            <h2>Select Date</h2>
            <form
              className="price-list-form"
              onSubmit={(event) => {
                event.preventDefault();
                setViewedDate(selectedDate);
              }}
            >
              <div className="field">
                <label>Pricing Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              </div>
              <button className="btn btn-navy" type="submit">View Price List</button>
            </form>
          </article>

          <article className="panel price-list-card">
            <h2>Price List for {displayDate}</h2>
            {hasAvailableList || viewedDate === '2026-06-15' ? (
              <div className="price-list-download-row">
                <strong>Chapel Hill Denham Price List (XLSX)</strong>
                <span>34 KB</span>
                <button className="btn btn-bronze" type="button" disabled>Download</button>
              </div>
            ) : (
              <p>No price list file is currently available for this date.</p>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
