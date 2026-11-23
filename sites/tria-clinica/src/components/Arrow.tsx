// Seta em SVG (traço fino, herda a cor do texto). Substitui os caracteres ↗ ↓ ↑,
// que o iPhone desenha como emoji.
const ROT = { ne: 0, down: 135, up: -45 } as const;

export function Arrow({ dir = 'ne', className = '' }: { dir?: keyof typeof ROT; className?: string }) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      style={ROT[dir] ? { rotate: `${ROT[dir]}deg` } : undefined}
    >
      <path d="M4 12 L12 4 M5.5 4 H12 V10.5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
