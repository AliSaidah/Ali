import { useId } from 'react';
import { LOGO_PATH, LOGO_VIEWBOX } from './logoPath';

// Logo em cobre metálico. "shine" anima um brilho que atravessa as letras.
export function Logo({ className = '', shine = false, title = 'Tria' }: { className?: string; shine?: boolean; title?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`logo-svg ${className}`} viewBox={LOGO_VIEWBOX} role="img" aria-label={title}>
      <defs>
        <linearGradient id={`cu${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7A4320" />
          <stop offset="0.38" stopColor="#B87843" />
          <stop offset="0.55" stopColor="#E0A773" />
          <stop offset="0.72" stopColor="#A5622F" />
          <stop offset="1" stopColor="#6B3818" />
        </linearGradient>
        <linearGradient id={`sh${id}`} x1="0" y1="0" x2="1" y2="0.25" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#FFE9CF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFF3E2" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#FFE9CF" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`cl${id}`}><path d={LOGO_PATH} fillRule="evenodd" /></clipPath>
      </defs>
      <path d={LOGO_PATH} fill={`url(#cu${id})`} fillRule="evenodd" />
      {shine && (
        <g clipPath={`url(#cl${id})`}>
          <rect className="logo-shine" x="-2357" y="0" width="2357" height="711" fill={`url(#sh${id})`} />
        </g>
      )}
    </svg>
  );
}
