import { useEffect, useState } from 'react';
import { fetchPublicPriceLists } from '../../lib/supabase';

interface AdminPriceListRow {
  id: string;
  title: string;
  category: string;
  asset_class: string;
  effective_date: string;
  file_type: string;
  visibility?: string;
}

export default function AdminPriceLists() {
  const [rows, setRows] = useState<AdminPriceListRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPriceLists() {
      const data = await fetchPublicPriceLists();
      setRows((data || []) as AdminPriceListRow[]);
      setLoading(false);
    }
    loadPriceLists();
  }, []);

  return (
    <>
      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Price List Administration</h2>
            <p className="muted">Review the public price-list entries and prepare the daily pricing file workflow. Upload and edit actions remain disabled.</p>
          </div>
          <button className="btn btn-bronze" type="button" disabled>Upload Price List</button>
        </div>
      </section>

      <section className="panel admin-price-form">
        <h2>Select Date</h2>
        <form className="price-list-form" onSubmit={(event) => event.preventDefault()}>
          <div className="field">
            <label>Pricing Date</label>
            <input type="date" value="2026-06-24" disabled />
          </div>
          <button className="btn btn-navy" type="submit" disabled>View Price List</button>
        </form>
      </section>

      <section className="panel">
        {loading ? (
          <p>Loading price lists...</p>
        ) : (
          <div className="table-wrap">
            <table className="admin-table">
              <thead><tr><th>Title</th><th>Category</th><th>Asset Class</th><th>Effective Date</th><th>Type</th><th>Action</th></tr></thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.id}>
                    <td data-label="Title">{row.title}</td>
                    <td data-label="Category">{row.category}</td>
                    <td data-label="Asset Class">{row.asset_class}</td>
                    <td data-label="Effective Date">{row.effective_date}</td>
                    <td data-label="Type">{row.file_type}</td>
                    <td data-label="Action"><button className="btn btn-border" type="button" disabled>Edit</button></td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={6}>No price list file is currently available for this date.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
