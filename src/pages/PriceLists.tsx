import { useEffect, useState } from 'react';
import { priceListGroups, type PriceListGroup } from '../data/mockData';
import { fetchPublicPriceLists } from '../lib/supabase';

export default function PriceLists() {
  const [groups, setGroups] = useState<PriceListGroup[]>(priceListGroups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPriceLists() {
      const data = await fetchPublicPriceLists();
      if (data && data.length > 0) {
        // Group by asset_class or category
        const grouped: Record<string, PriceListGroup> = {};
        data.forEach((item: any) => {
          const groupTitle = item.asset_class || item.category || 'Other';
          if (!grouped[groupTitle]) {
            grouped[groupTitle] = {
              title: groupTitle,
              description: `Reference pricing and market data for ${groupTitle}.`,
              items: []
            };
          }
          grouped[groupTitle].items.push({
            name: item.title,
            asAt: item.effective_date,
            fileType: item.file_type || 'CSV',
            access: 'Public'
          });
        });
        setGroups(Object.values(grouped));
      }
      setLoading(false);
    }
    loadPriceLists();
  }, []);

  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Price Lists</h1>
          <p>Reference pricing and market data files from the Chapel Hill Denham Research desk.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {loading ? (
            <p>Loading price lists...</p>
          ) : (
            <div className="price-list-grid">
              {groups.map(group => (
                <article className="panel price-list-panel" key={group.title}>
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                  <div className="table-wrap light">
                    <table>
                      <thead>
                        <tr><th>Name</th><th>As at</th><th>Type</th><th>Access</th></tr>
                      </thead>
                      <tbody>
                        {group.items.map(item => (
                          <tr key={`${group.title}-${item.name}-${item.asAt}`}>
                            <td>{item.name}</td>
                            <td>{item.asAt}</td>
                            <td>{item.fileType}</td>
                            <td>{item.access}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="notice compact">Downloads are disabled in this static preview.</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
