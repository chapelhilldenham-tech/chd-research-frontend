import type { Analyst } from '../data/mockData';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function AnalystModal({ analyst, onClose }: { analyst: Analyst, onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

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
        <div 
          className="analyst-photo-block analyst-modal-photo"
          style={{ 
            backgroundImage: analyst.photo_path ? `url(${analyst.photo_path})` : 'none', 
            backgroundPosition: analyst.photo_position 
          }}
        ></div>
        <div className="analyst-modal-heading">
          <p className="analyst-role">{analyst.title}</p>
          <h2>{analyst.name}</h2>
          <div className="analyst-coverage">
            {analyst.coverage.map((cov, idx) => (
              <span key={idx} className="coverage-chip">{cov}</span>
            ))}
          </div>
        </div>
        <section className="analyst-bio">
          <h3>Biography</h3>
          <p>{analyst.bio}</p>
        </section>
        <h3>Recent Coverage</h3>
        <p>No published coverage is available in this preview.</p>
      </div>
    </dialog>
  );
}
