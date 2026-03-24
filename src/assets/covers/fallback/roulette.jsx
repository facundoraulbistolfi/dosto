const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const RouletteCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="rouletteGlow" cx="50%" cy="48%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#rouletteGlow)" />
    <Border dim={dim} />
    {/* Ruleta */}
    <circle cx="100" cy="128" r="55" fill="none" stroke={fg} strokeWidth="1.8" />
    <circle cx="100" cy="128" r="45" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.4" />
    <circle cx="100" cy="128" r="30" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.5" />
    <circle cx="100" cy="128" r="12" fill={dim} stroke={accent} strokeWidth="1" />
    <circle cx="100" cy="128" r="5" fill={accent} opacity="0.8" />
    {/* Separadores radiales */}
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * 30 * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={100 + 30 * Math.cos(a)}
          y1={128 + 30 * Math.sin(a)}
          x2={100 + 55 * Math.cos(a)}
          y2={128 + 55 * Math.sin(a)}
          stroke={fg}
          strokeWidth="0.8"
          opacity="0.5"
        />
      );
    })}
    {/* Bolita */}
    <circle
      cx={100 + 48 * Math.cos(0.9)}
      cy={128 + 48 * Math.sin(0.9)}
      r="4"
      fill={accent}
      opacity="0.9"
    />
    {/* Fichas dispersas */}
    <circle cx="55" cy="215" r="6" fill="none" stroke={fg} strokeWidth="1" opacity="0.5" />
    <circle cx="55" cy="215" r="4" fill={dim} />
    <circle cx="70" cy="220" r="6" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
    <circle cx="135" cy="218" r="6" fill="none" stroke={fg} strokeWidth="1" opacity="0.5" />
    <circle cx="148" cy="212" r="6" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
    {/* Número 0 */}
    <text x="100" y="132" textAnchor="middle" fontSize="8" fill={accent} opacity="0.5" fontFamily="serif">0</text>
  </svg>
);

export default RouletteCover;
