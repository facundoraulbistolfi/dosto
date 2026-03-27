const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const DoveCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="doveGlow" cx="50%" cy="35%" r="25%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#doveGlow)" />
    <Border dim={dim} />
    {/* Paloma cayendo */}
    <path d="M100,70 Q90,65 75,55 Q85,68 80,80" fill="none" stroke={accent} strokeWidth="1.5" />
    <path d="M100,70 Q110,65 125,55 Q115,68 120,80" fill="none" stroke={accent} strokeWidth="1.5" />
    <ellipse cx="100" cy="80" rx="12" ry="18" fill="none" stroke={accent} strokeWidth="1.8" />
    {/* Cabeza */}
    <circle cx="100" cy="64" r="5" fill="none" stroke={accent} strokeWidth="1.2" />
    {/* Ojo */}
    <circle cx="101" cy="63" r="1" fill={accent} opacity="0.6" />
    {/* Cola */}
    <path d="M95,98 Q100,115 92,120 M100,98 Q105,115 100,122 M105,98 Q108,115 108,120" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.5" />
    {/* Plumas cayendo */}
    <path d="M70,130 Q75,125 72,140" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.3" />
    <path d="M135,145 Q138,140 133,155" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.25" />
    <path d="M60,165 Q63,160 58,175" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.2" />
    {/* Mesa del prestamista */}
    <line x1="40" y1="200" x2="160" y2="200" stroke={fg} strokeWidth="1.2" opacity="0.4" />
    <line x1="55" y1="200" x2="55" y2="230" stroke={fg} strokeWidth="1" opacity="0.3" />
    <line x1="145" y1="200" x2="145" y2="230" stroke={fg} strokeWidth="1" opacity="0.3" />
    {/* Ventana abierta */}
    <rect x="82" y="160" width="36" height="30" fill="none" stroke={fg} strokeWidth="1" opacity="0.35" />
    <line x1="100" y1="160" x2="100" y2="190" stroke={fg} strokeWidth="0.6" opacity="0.3" />
    {/* Cortina ondeando */}
    <path d="M82,160 Q78,170 82,180 Q86,190 82,190" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.25" />
  </svg>
);

export default DoveCover;
