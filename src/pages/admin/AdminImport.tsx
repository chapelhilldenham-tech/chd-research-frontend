export default function AdminImport() {
  return (
    <>
      <section className="panel ingestion-note">
        <div>
          <h2>Live Research Ingestion</h2>
          <p>Upload files, review extracted metadata, then save approved reports to the research library.</p>
        </div>
        <div>
          <h2>Historical Ingestion</h2>
          <p>Historical ZIP batches stay outside this screen: ZIP -&gt; external processing -&gt; JSON -&gt; import script.</p>
        </div>
      </section>

      <section className="grid-2">
        <form className="panel form-grid">
          <h2>Single Upload Placeholder</h2>
          <div className="drop-zone upload-drop-zone"><strong>Select one research file</strong><span>PDF, DOCX, XLSX, PPTX, CSV or TXT - maximum 50MB. Metadata can be reviewed before publishing.</span><em>Browse file</em></div>
          <p className="notice file-preview-notice">No file selected.</p>
          <div className="field"><label>Title*</label><input placeholder="Pending upload workflow" disabled /></div>
          <div className="grid-2">
            <div className="field"><label>Category*</label><select disabled><option>Equity</option></select></div>
            <div className="field"><label>Access Level</label><select disabled><option>Subscriber</option></select></div>
          </div>
          <div className="field"><label>Abstract</label><textarea disabled /></div>
          <div className="button-row">
            <button className="btn btn-navy" type="button" disabled>Save Draft</button>
            <button className="btn btn-bronze" type="button" disabled>Submit for Review</button>
          </div>
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
