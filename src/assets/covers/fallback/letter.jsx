const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const LetterCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="bg-letter" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={bg} />
        <stop offset="100%" stopColor="#080810" />
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-letter)" />
    <Border dim={dim} />
    <rect x="14" y="14" width="172" height="252" fill="none" stroke={dim} strokeWidth="0.3" />
    {/* Sobre */}
    <rect x="45" y="90" width="110" height="78" rx="2" fill="none" stroke={fg} strokeWidth="1.5" />
    <polyline points="45,90 100,135 155,90" fill="none" stroke={fg} strokeWidth="1.5" />
    <line x1="45" y1="168" x2="80" y2="135" stroke={fg} strokeWidth="1" opacity="0.5" />
    <line x1="155" y1="168" x2="120" y2="135" stroke={fg} strokeWidth="1" opacity="0.5" />
    {/* Pluma */}
    <path d="M100,60 Q108,50 116,42 Q122,36 128,34" fill="none" stroke={accent} strokeWidth="1.2" />
    <path d="M100,60 Q94,52 90,44 Q88,38 90,34 Q96,36 100,44 Q106,54 100,60" fill={dim} stroke={accent} strokeWidth="1" />
    <line x1="100" y1="60" x2="100" y2="80" stroke={accent} strokeWidth="0.8" />
    {/* Líneas de texto */}
    <line x1="68" y1="190" x2="132" y2="190" stroke={fg} strokeWidth="0.6" opacity="0.5" />
    <line x1="72" y1="200" x2="128" y2="200" stroke={fg} strokeWidth="0.6" opacity="0.4" />
    <line x1="76" y1="210" x2="124" y2="210" stroke={fg} strokeWidth="0.6" opacity="0.3" />
    <line x1="80" y1="220" x2="120" y2="220" stroke={fg} strokeWidth="0.6" opacity="0.2" />
    {/* Sello */}
    <rect x="130" y="96" width="16" height="18" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4" />
    <rect x="132" y="98" width="12" height="14" fill={dim} />
  </svg>
);

export default LetterCover;
