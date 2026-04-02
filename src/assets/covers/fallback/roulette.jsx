const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const RouletteCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="rouletteGlow" cx="50%" cy="48%" r="38%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#rouletteGlow)" />
    <Border dim={dim} />

    <circle cx="100" cy="126" r="62" fill="none" stroke={fg} strokeWidth="1.8" />
    <circle cx="100" cy="126" r="50" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.46" />
    <circle cx="100" cy="126" r="34" fill="none" stroke={fg} strokeWidth="0.9" opacity="0.54" />
    <circle cx="100" cy="126" r="15" fill={dim} stroke={accent} strokeWidth="1.1" />
    <circle cx="100" cy="126" r="5" fill={accent} opacity="0.85" />

    {Array.from({ length: 18 }, (_, index) => {
      const angle = (-78 + index * 20) * Math.PI / 180;
      return (
        <line
          key={index}
          x1={100 + 34 * Math.cos(angle)}
          y1={126 + 34 * Math.sin(angle)}
          x2={100 + 62 * Math.cos(angle)}
          y2={126 + 62 * Math.sin(angle)}
          stroke={index % 3 === 0 ? accent : fg}
          strokeWidth={index % 3 === 0 ? "1" : "0.8"}
          opacity={index % 3 === 0 ? "0.5" : "0.38"}
        />
      );
    })}

    <path d="M46,126 A54,54 0 0 1 154,126" fill="none" stroke={accent} strokeWidth="0.85" opacity="0.36" strokeDasharray="2 5" />
    <path d="M52,126 A48,48 0 0 0 142,154" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.24" />
    <circle cx="130" cy="80" r="4.2" fill={accent} opacity="0.94" />
    <path d="M118,86 Q126,80 130,80" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4" />

    <g opacity="0.82">
      <circle cx="54" cy="216" r="8" fill="none" stroke={fg} strokeWidth="1.1" opacity="0.5" />
      <circle cx="54" cy="216" r="5.2" fill={dim} opacity="0.9" />
      <circle cx="70" cy="223" r="8" fill="none" stroke={accent} strokeWidth="1.1" opacity="0.52" />
      <circle cx="136" cy="220" r="8" fill="none" stroke={fg} strokeWidth="1.1" opacity="0.5" />
      <circle cx="148" cy="212" r="8" fill="none" stroke={accent} strokeWidth="1" opacity="0.46" />
    </g>

    <line x1="30" y1="236" x2="170" y2="236" stroke={dim} strokeWidth="0.8" opacity="0.34" />
  </svg>
);

export default RouletteCover;
