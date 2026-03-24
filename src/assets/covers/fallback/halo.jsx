const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const HaloCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="haloGlow" cx="50%" cy="32%" r="20%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#haloGlow)" />
    <Border dim={dim} />
    {/* Aureola */}
    <ellipse cx="100" cy="75" rx="24" ry="7" fill="none" stroke={accent} strokeWidth="2" opacity="0.9" />
    {/* Rayos de la aureola */}
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i * 45 * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={100 + 28 * Math.cos(a)}
          y1={75 + 9 * Math.sin(a)}
          x2={100 + 36 * Math.cos(a)}
          y2={75 + 11 * Math.sin(a)}
          stroke={accent}
          strokeWidth="0.6"
          opacity="0.45"
        />
      );
    })}
    {/* Cabeza */}
    <circle cx="100" cy="100" r="18" fill="none" stroke={fg} strokeWidth="1.8" />
    {/* Cuerpo */}
    <line x1="100" y1="118" x2="100" y2="185" stroke={fg} strokeWidth="2" />
    <line x1="100" y1="138" x2="72" y2="165" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="138" x2="128" y2="165" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="185" x2="84" y2="215" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="185" x2="116" y2="215" stroke={fg} strokeWidth="1.8" />
    {/* Multitud en torno */}
    <circle cx="52" cy="165" r="6" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <circle cx="148" cy="160" r="6" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <circle cx="40" cy="150" r="5" fill="none" stroke={fg} strokeWidth="0.7" opacity="0.2" />
    <circle cx="160" cy="148" r="5" fill="none" stroke={fg} strokeWidth="0.7" opacity="0.2" />
    {/* Suelo de Petersburgo */}
    <path d="M25,235 L175,235" stroke={dim} strokeWidth="1" opacity="0.4" />
    <path d="M35,248 Q100,240 165,248" fill="none" stroke={dim} strokeWidth="0.5" opacity="0.2" />
  </svg>
);

export default HaloCover;
