const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const TombstoneCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="tombGlow" cx="50%" cy="55%" r="35%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.06" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#tombGlow)" />
    <Border dim={dim} />
    {/* Lápida central */}
    <path d="M75,190 L75,90 Q75,65 100,65 Q125,65 125,90 L125,190" fill="none" stroke={accent} strokeWidth="2" />
    <line x1="75" y1="190" x2="125" y2="190" stroke={accent} strokeWidth="1.5" />
    {/* Cruz en la lápida */}
    <line x1="100" y1="80" x2="100" y2="115" stroke={fg} strokeWidth="1.2" opacity="0.4" />
    <line x1="88" y1="92" x2="112" y2="92" stroke={fg} strokeWidth="1.2" opacity="0.4" />
    {/* Texto ilegible */}
    <line x1="85" y1="130" x2="115" y2="130" stroke={fg} strokeWidth="0.6" opacity="0.2" />
    <line x1="88" y1="140" x2="112" y2="140" stroke={fg} strokeWidth="0.6" opacity="0.15" />
    <line x1="90" y1="150" x2="110" y2="150" stroke={fg} strokeWidth="0.6" opacity="0.12" />
    {/* Lápidas secundarias */}
    <path d="M35,195 L35,145 Q35,132 48,132 Q60,132 60,145 L60,195" fill="none" stroke={fg} strokeWidth="1" opacity="0.3" />
    <path d="M145,195 L145,155 Q145,142 155,142 Q165,142 165,155 L165,195" fill="none" stroke={fg} strokeWidth="1" opacity="0.3" />
    {/* Suelo / hierba */}
    <line x1="20" y1="195" x2="180" y2="195" stroke={fg} strokeWidth="1" opacity="0.3" />
    {/* Bocadillos de diálogo (los muertos hablan) */}
    <ellipse cx="55" cy="115" rx="15" ry="8" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.25" />
    <ellipse cx="150" cy="130" rx="12" ry="7" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.2" />
    {/* Ondas sonoras saliendo de la tierra */}
    <path d="M85,195 Q82,200 85,205" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.2" />
    <path d="M80,195 Q76,203 80,210" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.15" />
    <path d="M115,195 Q118,200 115,205" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.2" />
    <path d="M120,195 Q124,203 120,210" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.15" />
  </svg>
);

export default TombstoneCover;
