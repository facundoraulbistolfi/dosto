const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const CandleCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="candleGlow" cx="50%" cy="30%" r="25%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="60%" stopColor={accent} stopOpacity="0.05" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#candleGlow)" />
    <Border dim={dim} />
    {/* Llama de la vela */}
    <path d="M100,40 Q94,55 96,70 Q100,58 104,70 Q106,55 100,40" fill={accent} opacity="0.3" />
    <path d="M100,48 Q97,58 99,65 Q100,56 101,65 Q103,58 100,48" fill={accent} opacity="0.2" />
    {/* Mecha */}
    <line x1="100" y1="68" x2="100" y2="75" stroke={fg} strokeWidth="1" opacity="0.5" />
    {/* Vela */}
    <rect x="92" y="75" width="16" height="60" fill="none" stroke={accent} strokeWidth="1.5" />
    {/* Cera derretida */}
    <path d="M92,78 Q88,82 90,88 Q92,84 92,78" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.3" />
    <path d="M108,80 Q112,85 110,92 Q108,87 108,80" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.3" />
    {/* Candelero */}
    <ellipse cx="100" cy="136" rx="12" ry="3" fill="none" stroke={fg} strokeWidth="1" opacity="0.4" />
    <line x1="100" y1="136" x2="100" y2="150" stroke={fg} strokeWidth="1.5" opacity="0.35" />
    <ellipse cx="100" cy="152" rx="18" ry="4" fill="none" stroke={fg} strokeWidth="1" opacity="0.35" />
    {/* Silueta de niño pequeño */}
    <circle cx="100" cy="185" r="5" fill={fg} opacity="0.3" />
    <line x1="100" y1="190" x2="100" y2="205" stroke={fg} strokeWidth="1.2" opacity="0.25" />
    <line x1="100" y1="205" x2="94" y2="218" stroke={fg} strokeWidth="1" opacity="0.2" />
    <line x1="100" y1="205" x2="106" y2="218" stroke={fg} strokeWidth="1" opacity="0.2" />
    {/* Copos de nieve */}
    {[[45,60],[155,55],[40,120],[160,110],[50,180],[150,175]].map(([x,y],i) => (
      <g key={i} opacity={0.2 + i * 0.02}>
        <line x1={x-3} y1={y} x2={x+3} y2={y} stroke={fg} strokeWidth="0.5" />
        <line x1={x} y1={y-3} x2={x} y2={y+3} stroke={fg} strokeWidth="0.5" />
      </g>
    ))}
  </svg>
);

export default CandleCover;
