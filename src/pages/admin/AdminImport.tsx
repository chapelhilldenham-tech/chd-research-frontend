export default function AdminImport() {
  return (
    <>
      <section className="panel ingestion-note">
        <div>
          <h2>Live Research Ingestion</h2>
          <p>PHP reference allowed single and bulk uploads. React MVP keeps this as a placeholder only.</p>
        </div>
        <div>
          <h2>Historical Import Package</h2>
          <p>Legacy package review remains manual. No PDFs are uploaded and `reports_seed.sql` is not run from the UI.</p>
        </div>
      </section>

      <section className="grid-2">
        <form className="panel form-grid">
          <h2>Single Upload Placeholder</h2>
          <div className="drop-zone"><strong>Select one research file</strong><span>Disabled until storage, auth, and RLS are approved.</span></div>
          <div className="field"><label>Title</label><input placeholder="Pending upload workflow" disabled /></div>
          <div className="grid-2">
            <div className="field"><label>Category</label><select disabled><option>Equity</option></select></div>
            <div className="field"><label>Access Level</label><select disabled><option>Internal</option></select></div>
          </div>
          <div className="field"><label>Abstract</label><textarea disabled /></div>
          <button className="btn btn-bronze" type="button" disabled>Submit for Review Disabled</button>
        </form>

        <aside className="panel upload-preview-panel">
          <p className="eyebrow">Import readiness</p>
          <h2>Manual package review required</h2>
          <p className="notice">Expected files: reports_manifest.csv, source_file_inventory.csv, skipped_files.csv, extraction_errors.csv, README_IMPORT_NOTES.md.</p>
          <div className="admin-mini-grid">
            <div><span>Upload</span><strong>Off</strong></div>
            <div><span>SQL Import</span><strong>Off</strong></div>
            <div><span>Publish</span><strong>Off</strong></div>
          </div>
        </aside>
      </section>
    </>
  );
}
