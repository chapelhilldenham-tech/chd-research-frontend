import type { Analyst } from '../data/mockData';
import type { NormalizedReport } from '../types/research';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { fetchPublicResearchReportBundle } from '../lib/supabase';
import { Link } from 'react-router-dom';

// Per-analyst photo focal point so faces aren't cropped out
const PHOTO_POSITION: Record<string, string> = {
  'Tajudeen Ibrahim':              '50% 15%',
  'Nabila Mohammed':               '50% 18%',
  'Gideon Oshadumi':               '50% 12%',
  'Boluwatife Ishola':             '50% 20%',
  'Bolade Agboola':                '50% 10%',
  'Chapel Hill Denham Research':   '50% 50%',
};

function formatCategory(cat: string): string {
  return cat.replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export default function AnalystModal({ analyst, onClose }: { analyst: Analyst, onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reports, setReports] = useState<NormalizedReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  useEffect(() => {
    let mounted = true;
    async function fetchReports() {
      const data = await fetchPublicResearchReportBundle();
      if (!mounted) return;
      if (data) {
        const matched = data.filter(r => r.analysts.some(a =>
          String(a.id) === String(analyst.id) ||
          (a.name && analyst.name && a.name.toLowerCase() === analyst.name.toLowerCase())
        ));
        setReports(matched);
      }
      setLoadingReports(false);
    }
    fetchReports();
    return () => { mounted = false; };
  }, [analyst.id, analyst.name]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) handleClose();
  };

  const isHouseView = analyst.name === 'Chapel Hill Denham Research';
  const photoSrc = analyst.photo_path ||
    (isHouseView
      ? '/assets/img/logo-navy-transparent.png'
      : `/assets/img/analysts/${analyst.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`);
  const focalPoint = PHOTO_POSITION[analyst.name] ?? '50% 15%';

  return (
    <dialog ref={dialogRef} className="analyst-modal analyst-modal-panel" onClick={handleClickOutside}>
      <button className="analyst-modal-close" aria-label="Close" onClick={handleClose}>
        <X size={22} />
      </button>

      {/* ── Full-width hero photo ── */}
      <div
        className="analyst-modal-photo"
        style={{ '--analyst-photo-position': focalPoint } as React.CSSProperties}
      >
        <img
          src={photoSrc}
          alt={analyst.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/img/logo-navy-transparent.png';
          }}
        />
        <div className="analyst-modal-photo-overlay">
          <div className="analyst-modal-heading">
            <p className="analyst-role">{analyst.title}</p>
            <h2>{analyst.name}</h2>
            <div className="analyst-coverage">
              {analyst.coverage?.map((cov, idx) => (
                <span key={idx} className="coverage-chip">{cov}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="analyst-modal-body">
        {analyst.bio && (
          <section className="analyst-bio">
            <h3>Biography</h3>
            <p>{analyst.bio}</p>
          </section>
        )}

        <section style={{ marginTop: '28px' }}>
          <h3>Recent Coverage</h3>
          {loadingReports ? (
            <p style={{ color: 'rgba(16,37,48,.5)', fontSize: '14px', marginTop: '12px' }}>Loading…</p>
          ) : reports.length > 0 ? (
            <div className="analyst-report-list" style={{ marginTop: '14px' }}>
              {reports.slice(0, 12).map(item => (
                <Link key={item.id} to={`/report/${item.id}`} onClick={handleClose}>
                  <span>{formatCategory(item.category)}</span>
                  <strong>{item.title}</strong>
                  <small>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</small>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ color: 'rgba(16,37,48,.5)', fontSize: '14px', marginTop: '12px' }}>No coverage linked yet.</p>
          )}
        </section>
      </div>
    </dialog>
  );
}
