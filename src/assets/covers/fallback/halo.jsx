const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const HaloCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="haloGlow" cx="50%" cy="28%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.24" />
        <stop offset="52%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#haloGlow)" />
    <Border dim={dim} />

    <ellipse cx="100" cy="70" rx="28" ry="8" fill="none" stroke={accent} strokeWidth="2" opacity="0.92" />
    <ellipse cx="100" cy="70" rx="34" ry="10" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.32" />
    {Array.from({ length: 10 }, (_, index) => {
      const angle = (index * 36) * Math.PI / 180;
      return (
        <line
          key={index}
          x1={100 + 32 * Math.cos(angle)}
          y1={70 + 10 * Math.sin(angle)}
          x2={100 + 40 * Math.cos(angle)}
          y2={70 + 12 * Math.sin(angle)}
          stroke={accent}
          strokeWidth="0.7"
          opacity="0.46"
        />
      );
    })}

    <circle cx="100" cy="101" r="19" fill="none" stroke={fg} strokeWidth="1.8" />
    <path d="M84,150 Q100,134 116,150" fill="none" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="120" x2="100" y2="190" stroke={fg} strokeWidth="2" />
    <line x1="100" y1="142" x2="70" y2="170" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="142" x2="130" y2="170" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="190" x2="84" y2="222" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="190" x2="116" y2="222" stroke={fg} strokeWidth="1.8" />

    {[48, 62, 138, 152].map((x, index) => (
      <g key={x} opacity={index < 2 ? "0.26" : "0.2"}>
        <circle cx={x} cy={index < 2 ? 166 : 160} r="6.5" fill="none" stroke={fg} strokeWidth="0.8" />
        <line x1={x} y1={index < 2 ? 173 : 167} x2={x} y2="188" stroke={fg} strokeWidth="0.7" />
      </g>
    ))}

    <path d="M24,232 Q100,216 176,232" fill="none" stroke={dim} strokeWidth="1" opacity="0.34" />
    <path d="M34,244 Q100,236 166,244" fill="none" stroke={dim} strokeWidth="0.6" opacity="0.24" />
  </svg>
);

export default HaloCover;
