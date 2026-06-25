import { useRef, useEffect, useState } from 'react';
import type { Analyst } from '../data/mockData';
import AnalystModal from './AnalystModal';
import Icon from './Icon';

function useHoverScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const speedRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const shell = ref.current?.parentElement;
    const strip = ref.current;
    
    if (!shell || !strip) return;
    
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const updateSpeed = (event: PointerEvent) => {
      const rect = shell.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const edgeZone = Math.min(90, rect.width * 0.18);
      const maxSpeed = 9;

      if (x < edgeZone) {
        speedRef.current = -((edgeZone - x) / edgeZone) * maxSpeed;
      } else if (x > rect.width - edgeZone) {
        const dist = rect.width - x;
        speedRef.current = ((edgeZone - dist) / edgeZone) * maxSpeed;
      } else {
        speedRef.current = 0;
      }
    };

    const scrollLoop = () => {
      if (speedRef.current !== 0) {
        if (strip.style.scrollSnapType !== 'none') {
          strip.style.scrollSnapType = 'none';
        }
        strip.scrollLeft += speedRef.current;
      } else {
        if (strip.style.scrollSnapType === 'none') {
          strip.style.scrollSnapType = '';
        }
      }
      animationIdRef.current = requestAnimationFrame(scrollLoop);
    };

    const startLoop = (event: PointerEvent) => {
      updateSpeed(event);
      if (!animationIdRef.current) {
        animationIdRef.current = requestAnimationFrame(scrollLoop);
      }
    };

    const handlePointerLeave = () => {
      speedRef.current = 0;
      strip.style.scrollSnapType = '';
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };

    shell.addEventListener('pointerenter', startLoop as EventListener);
    shell.addEventListener('pointermove', updateSpeed as EventListener);
    shell.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      shell.removeEventListener('pointerenter', startLoop as EventListener);
      shell.removeEventListener('pointermove', updateSpeed as EventListener);
      shell.removeEventListener('pointerleave', handlePointerLeave);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [ref]);
}

export default function AnalystStrip({ analysts }: { analysts: Analyst[] }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [selectedAnalyst, setSelectedAnalyst] = useState<Analyst | null>(null);
  useHoverScroll(stripRef);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <div className="analyst-strip-shell">
        <div className="analyst-strip analyst-strip-public analyst-strip-home" aria-label="Research team profiles" ref={stripRef}>
          {analysts.map(analyst => (
            <article 
              key={analyst.id} 
              className="analyst-card analyst-card-compact" 
              role="button" 
              tabIndex={0}
              onClick={() => setSelectedAnalyst(analyst)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedAnalyst(analyst); }}
            >
              <div 
                className={`analyst-photo ${analyst.isHouseView ? 'analyst-photo-house' : ''}`}
                style={{ '--analyst-photo-position': analyst.photo_position } as React.CSSProperties}
              >
                {analyst.isHouseView ? (
                  <img className="analyst-house-logo" src={analyst.photo_path} alt="Chapel Hill Denham" />
                ) : analyst.photo_path ? (
                  <img src={analyst.photo_path} alt={analyst.name} />
                ) : (
                  <span className="analyst-initials">{getInitials(analyst.name)}</span>
                )}
              </div>
              <div className="analyst-info">
                <p className="analyst-role">{analyst.title}</p>
                <h3>{analyst.name}</h3>
                {analyst.coverage && analyst.coverage.length > 0 && (
                  <div className="analyst-coverage" aria-label="Coverage sectors">
                    {analyst.coverage.map((cov, idx) => (
                      <span key={idx}>{cov}</span>
                    ))}
                  </div>
                )}
                <p className="analyst-bio-preview">
                  {analyst.bio ? analyst.bio : `${analyst.name} is a member of the Chapel Hill Denham Research team...`}
                </p>
                <span className="text-link analyst-link">
                  View Coverage <Icon name="arrow" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selectedAnalyst && (
        <AnalystModal analyst={selectedAnalyst} onClose={() => setSelectedAnalyst(null)} />
      )}
    </>
  );
}
