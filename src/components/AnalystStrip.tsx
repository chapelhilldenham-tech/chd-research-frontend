import { useRef, useEffect, useState } from 'react';
import type { Analyst } from '../data/mockData';
import AnalystModal from './AnalystModal';

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

  return (
    <>
      <div className="analyst-strip-shell">
        <div className="analyst-strip analyst-strip-public analyst-strip-home" aria-label="Research team profiles" ref={stripRef}>
          {analysts.map(analyst => (
            <div 
              key={analyst.id} 
              className="analyst-card card" 
              role="button" 
              tabIndex={0}
              onClick={() => setSelectedAnalyst(analyst)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedAnalyst(analyst); }}
            >
              <div 
                className="analyst-photo-block card-img" 
                style={{ 
                  backgroundImage: analyst.photo_path ? `url(${analyst.photo_path})` : 'none', 
                  backgroundPosition: analyst.photo_position 
                }}
              ></div>
              <div className="card-body">
                <h3>{analyst.name}</h3>
                <p className="analyst-role">{analyst.title}</p>
                <div className="analyst-coverage">
                  {analyst.coverage.map((cov, idx) => (
                    <span key={idx} className="coverage-chip">{cov}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedAnalyst && (
        <AnalystModal analyst={selectedAnalyst} onClose={() => setSelectedAnalyst(null)} />
      )}
    </>
  );
}
