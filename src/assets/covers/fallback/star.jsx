const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const StarCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="starGlow" cx="50%" cy="32%" r="28%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="60%" stopColor={accent} stopOpacity="0.05" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#starGlow)" />
    <Border dim={dim} />
    {/* Estrella central brillante */}
    <polygon
      points="100,40 106,62 128,62 110,76 118,98 100,84 82,98 90,76 72,62 94,62"
      fill="none"
      stroke={accent}
      strokeWidth="1.8"
    />
    <polygon
      points="100,50 104,62 118,62 107,72 112,88 100,78 88,88 93,72 82,62 96,62"
      fill={accent}
      opacity="0.15"
    />
    {/* Rayos de la estrella */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 100 + Math.cos(rad) * 32;
      const y1 = 70 + Math.sin(rad) * 32;
      const x2 = 100 + Math.cos(rad) * 45;
      const y2 = 70 + Math.sin(rad) * 45;
      return (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="0.5" opacity="0.3" />
      );
    })}
    {/* Estrellas pequeñas */}
    {[[45,50],[155,45],[40,90],[160,85],[50,130],[150,125]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="0.8" fill={accent} opacity={0.4 - i * 0.04} />
    ))}
    {/* Silueta de hombre en la tierra */}
    <circle cx="100" cy="185" r="6" fill={fg} opacity="0.4" />
    <line x1="100" y1="191" x2="100" y2="215" stroke={fg} strokeWidth="1.5" opacity="0.4" />
    <line x1="100" y1="198" x2="88" y2="208" stroke={fg} strokeWidth="1" opacity="0.35" />
    <line x1="100" y1="198" x2="112" y2="208" stroke={fg} strokeWidth="1" opacity="0.35" />
    <line x1="100" y1="215" x2="90" y2="230" stroke={fg} strokeWidth="1" opacity="0.35" />
    <line x1="100" y1="215" x2="110" y2="230" stroke={fg} strokeWidth="1" opacity="0.35" />
    {/* Tierra / horizonte */}
    <path d="M25,240 Q60,232 100,240 Q140,248 175,240" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    {/* Revólver en el suelo */}
    <path d="M125,225 L138,222 L140,225 L130,228 Z" fill={fg} opacity="0.25" />
  </svg>
);

export default StarCover;
