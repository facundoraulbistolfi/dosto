const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const EnvelopeCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="envGlow" cx="50%" cy="45%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#envGlow)" />
    <Border dim={dim} />
    {/* Sobre principal */}
    <rect x="50" y="80" width="100" height="70" fill="none" stroke={accent} strokeWidth="1.8" />
    <path d="M50,80 L100,120 L150,80" fill="none" stroke={accent} strokeWidth="1.5" />
    <path d="M50,150 L85,115" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.4" />
    <path d="M150,150 L115,115" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.4" />
    {/* Número 9 */}
    <text x="100" y="108" textAnchor="middle" fill={accent} fontSize="16" fontFamily="serif" opacity="0.4">IX</text>
    {/* Sobres apilados detrás */}
    <rect x="55" y="170" width="90" height="55" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <path d="M55,170 L100,200 L145,170" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.25" />
    <rect x="60" y="178" width="80" height="45" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.2" />
    {/* Pluma y tinta */}
    <line x1="100" y1="45" x2="108" y2="70" stroke={fg} strokeWidth="1" opacity="0.35" />
    <path d="M108,70 Q112,65 110,60" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <circle cx="108" cy="72" r="2" fill={accent} opacity="0.3" />
  </svg>
);

export default EnvelopeCover;
