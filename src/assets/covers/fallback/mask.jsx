const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const MaskCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="maskGlow" cx="50%" cy="40%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#maskGlow)" />
    <Border dim={dim} />
    {/* Máscara teatral */}
    <path
      d="M65,80 Q65,55 100,50 Q135,55 135,80 Q135,120 100,135 Q65,120 65,80"
      fill="none"
      stroke={accent}
      strokeWidth="2"
    />
    {/* Ojos de la máscara */}
    <ellipse cx="82" cy="85" rx="10" ry="7" fill={bg} stroke={fg} strokeWidth="1.2" />
    <ellipse cx="118" cy="85" rx="10" ry="7" fill={bg} stroke={fg} strokeWidth="1.2" />
    {/* Pupilas maliciosas */}
    <circle cx="85" cy="85" r="2.5" fill={accent} opacity="0.6" />
    <circle cx="121" cy="85" r="2.5" fill={accent} opacity="0.6" />
    {/* Cejas arqueadas */}
    <path d="M72,75 Q82,68 92,75" fill="none" stroke={fg} strokeWidth="1" opacity="0.6" />
    <path d="M108,75 Q118,68 128,75" fill="none" stroke={fg} strokeWidth="1" opacity="0.6" />
    {/* Sonrisa siniestra */}
    <path d="M82,108 Q100,122 118,108" fill="none" stroke={accent} strokeWidth="1.5" />
    {/* Hilos de marioneta */}
    <line x1="100" y1="50" x2="100" y2="25" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <line x1="75" y1="60" x2="65" y2="30" stroke={fg} strokeWidth="0.6" opacity="0.25" />
    <line x1="125" y1="60" x2="135" y2="30" stroke={fg} strokeWidth="0.6" opacity="0.25" />
    {/* Barra de marioneta */}
    <line x1="60" y1="28" x2="140" y2="28" stroke={fg} strokeWidth="1" opacity="0.3" />
    {/* Figuras sometidas abajo */}
    {[70, 100, 130].map((x, i) => (
      <g key={i} opacity={0.3 + i * 0.05}>
        <circle cx={x} cy={195} r="4" fill={fg} />
        <line x1={x} y1={199} x2={x} y2={215} stroke={fg} strokeWidth="1" />
        <path d={`M${x},215 L${x-5},225 M${x},215 L${x+5},225`} fill="none" stroke={fg} strokeWidth="0.8" />
      </g>
    ))}
  </svg>
);

export default MaskCover;
