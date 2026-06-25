import type { Analyst } from '../data/mockData';
import type { NormalizedReport } from '../types/research';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fetchPublicResearchReportBundle } from '../lib/supabase';
import { Link } from 'react-router-dom';
import AnalystAvatar from './AnalystAvatar';

export default function AnalystModal({ analyst, onClose }: { analyst: Analyst, onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reports, setReports] = useState<NormalizedReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    async function fetchReports() {
      const data = await fetchPublicResearchReportBundle();
      if (!mounted) return;
      if (data) {
        setReports(data.filter(r => r.analysts.some(a => String(a.id) === String(analyst.id))));
      }
      setLoadingReports(false);
    }
    fetchReports();
    return () => { mounted = false; };
  }, [analyst.id]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  return (
    <dialog ref={dialogRef} className="analyst-modal" onClick={handleClickOutside}>
      <button className="drawer-close" aria-label="Close" onClick={handleClose}>
        <X size={24} />
      </button>
      <div className="analyst-modal-body">
        <AnalystAvatar analyst={analyst} />
        <div className="analyst-modal-heading">
          <p className="analyst-role">{analyst.title}</p>
          <h2>{analyst.name}</h2>
          <div className="analyst-coverage">
            {analyst.coverage?.map((cov, idx) => (
              <span key={idx} className="coverage-chip">{cov}</span>
            ))}
          </div>
        </div>
        <section className="analyst-bio">
          <h3>Biography</h3>
          <p>{analyst.bio}</p>
        </section>
        
        {loadingReports ? (
          <p>Loading coverage...</p>
        ) : reports.length > 0 ? (
          <>
            <h3>Recent Coverage</h3>
            <div className="related-list" style={{ marginTop: '1rem' }}>
              {reports.map(item => (
                <Link key={item.id} to={`/report/${item.id}`} style={{ display: 'block', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-navy-muted)', display: 'block' }}>{item.documentType}</span>
                  <strong style={{ display: 'block', color: 'var(--color-navy)', textDecoration: 'none' }}>{item.title}</strong>
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </dialog>
  );
}
