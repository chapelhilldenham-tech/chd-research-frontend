import { priceListGroups } from '../data/mockData';

export default function PriceLists() {
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
          <div className="price-list-grid">
            {priceListGroups.map(group => (
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
        </div>
      </section>
    </main>
  );
}
