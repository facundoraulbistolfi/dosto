const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const CrownCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="crownGlow" cx="50%" cy="35%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#crownGlow)" />
    <Border dim={dim} />
    {/* Corona torcida */}
    <path
      d="M60,120 L68,75 L85,105 L100,65 L115,105 L132,75 L140,120"
      fill="none"
      stroke={accent}
      strokeWidth="2"
    />
    <line x1="60" y1="120" x2="140" y2="120" stroke={accent} strokeWidth="2" />
    {/* Joyas de la corona */}
    <circle cx="100" cy="68" r="2.5" fill={accent} opacity="0.6" />
    <circle cx="68" cy="78" r="2" fill={fg} opacity="0.4" />
    <circle cx="132" cy="78" r="2" fill={fg} opacity="0.4" />
    {/* Cojín debajo */}
    <ellipse cx="100" cy="140" rx="45" ry="10" fill="none" stroke={fg} strokeWidth="1" opacity="0.4" />
    <path d="M55,140 Q60,148 100,150 Q140,148 145,140" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    {/* Nube de sueño */}
    <ellipse cx="100" cy="190" rx="35" ry="15" fill="none" stroke={dim} strokeWidth="0.8" opacity="0.3" />
    <ellipse cx="80" cy="185" rx="18" ry="10" fill="none" stroke={dim} strokeWidth="0.6" opacity="0.25" />
    <ellipse cx="120" cy="185" rx="18" ry="10" fill="none" stroke={dim} strokeWidth="0.6" opacity="0.25" />
    {/* Zzz */}
    <text x="140" y="165" fill={fg} fontSize="10" opacity="0.25" fontFamily="serif">z</text>
    <text x="148" y="155" fill={fg} fontSize="12" opacity="0.2" fontFamily="serif">z</text>
    <text x="155" y="143" fill={fg} fontSize="14" opacity="0.15" fontFamily="serif">z</text>
  </svg>
);

export default CrownCover;
