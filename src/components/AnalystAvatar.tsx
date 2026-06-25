import { useState } from 'react';
import type { Analyst } from '../data/mockData';

export default function AnalystAvatar({ analyst }: { analyst: Analyst }) {
  const [imgError, setImgError] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isPublicUrl = (url?: string) => {
    if (!url) return false;
    // House view logo is a local asset
    if (url.startsWith('/assets/')) return true;
    if (!url.startsWith('http')) return false;
    if (url.includes('/storage/v1/object/authenticated/')) return false;
    return true;
  };

  const showImg = analyst.photo_path && isPublicUrl(analyst.photo_path) && !imgError;

  return (
    <div
      className={`analyst-photo ${analyst.isHouseView ? 'analyst-photo-house' : ''}`}
      style={{ '--analyst-photo-position': analyst.photo_position } as React.CSSProperties}
    >
      {showImg ? (
        <img
          className={analyst.isHouseView ? 'analyst-house-logo' : ''}
          src={analyst.photo_path}
          alt={analyst.isHouseView ? 'Chapel Hill Denham' : analyst.name}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="analyst-initials">{getInitials(analyst.name)}</span>
      )}
    </div>
  );
}
