import { useId } from 'react';
import { LOGO_PATH, LOGO_VIEWBOX } from './logoPath';

// Logo em cobre (tom do material da clínica) ou em uma cor sólida.
export function Logo({ className = '', title = 'Tria', solid }: { className?: string; title?: string; solid?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`logo-svg ${className}`} viewBox={LOGO_VIEWBOX} role="img" aria-label={title}>
      {!solid && (
        <defs>
          <linearGradient id={`cu${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7A4320" />
            <stop offset="0.42" stopColor="#B87843" />
            <stop offset="0.58" stopColor="#D99C66" />
            <stop offset="1" stopColor="#7A4320" />
          </linearGradient>
        </defs>
      )}
      <path d={LOGO_PATH} fill={solid ?? `url(#cu${id})`} fillRule="evenodd" />
    </svg>
  );
}
