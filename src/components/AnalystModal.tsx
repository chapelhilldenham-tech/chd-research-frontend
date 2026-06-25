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
        setReports(data.filter(r => r.analysts.some(a => 
          String(a.id) === String(analyst.id) || 
          (a.name && analyst.name && a.name.toLowerCase() === analyst.name.toLowerCase())
        )));
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
        <div className="analyst-modal-header" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <img 
              src={analyst.photo_path || (analyst.name === 'Chapel Hill Denham Research' ? '/assets/img/logo-navy-transparent.png' : `/assets/img/analysts/${analyst.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`)} 
              alt={analyst.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/img/logo-navy-transparent.png'; // Ultimate fallback
              }}
            />
          </div>
          <div>
            <p className="analyst-role">{analyst.title}</p>
            <h2 style={{ margin: '4px 0 8px', fontSize: '28px' }}>{analyst.name}</h2>
            <div className="analyst-coverage">
              {analyst.coverage?.map((cov, idx) => (
                <span key={idx} className="coverage-chip">{cov}</span>
              ))}
            </div>
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
