const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const ChainsCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="chainsGlow" cx="50%" cy="50%" r="40%">
        <stop offset="0%" stopColor="#2a1a0a" stopOpacity="0.3" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#chainsGlow)" />
    <Border dim={dim} />
    {/* Cadena izquierda */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <ellipse
        key={`l${i}`}
        cx={70}
        cy={50 + i * 28}
        rx="8"
        ry="12"
        fill="none"
        stroke={i % 2 === 0 ? accent : fg}
        strokeWidth="1.8"
        opacity={0.5 + i * 0.05}
      />
    ))}
    {/* Cadena derecha */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <ellipse
        key={`r${i}`}
        cx={130}
        cy={64 + i * 28}
        rx="8"
        ry="12"
        fill="none"
        stroke={i % 2 === 0 ? fg : accent}
        strokeWidth="1.8"
        opacity={0.5 + i * 0.05}
      />
    ))}
    {/* Ventana con barrotes */}
    <rect x="85" y="55" width="30" height="40" fill="none" stroke={fg} strokeWidth="1.2" opacity="0.5" />
    <line x1="92" y1="55" x2="92" y2="95" stroke={fg} strokeWidth="0.8" opacity="0.4" />
    <line x1="100" y1="55" x2="100" y2="95" stroke={fg} strokeWidth="0.8" opacity="0.4" />
    <line x1="108" y1="55" x2="108" y2="95" stroke={fg} strokeWidth="0.8" opacity="0.4" />
    {/* Luz tenue desde la ventana */}
    <path d="M88,95 L80,130 L120,130 L112,95" fill={accent} opacity="0.06" />
    {/* Cruz distante en la ventana */}
    <line x1="100" y1="62" x2="100" y2="82" stroke={accent} strokeWidth="0.8" opacity="0.35" />
    <line x1="92" y1="72" x2="108" y2="72" stroke={accent} strokeWidth="0.8" opacity="0.35" />
  </svg>
);

export default ChainsCover;
