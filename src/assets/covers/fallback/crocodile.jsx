const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const CrocodileCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="crocGlow" cx="50%" cy="45%" r="35%">
        <stop offset="0%" stopColor="#0a2a0a" stopOpacity="0.2" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#crocGlow)" />
    <Border dim={dim} />
    {/* Cocodrilo - mandíbula superior */}
    <path d="M45,110 Q50,95 70,90 Q100,85 130,90 Q150,95 155,110" fill="none" stroke={accent} strokeWidth="1.8" />
    {/* Mandíbula inferior */}
    <path d="M45,115 Q50,135 70,140 Q100,145 130,140 Q150,135 155,115" fill="none" stroke={accent} strokeWidth="1.8" />
    {/* Dientes superiores */}
    {[55, 68, 82, 96, 110, 124, 138, 148].map((x, i) => (
      <line key={`u${i}`} x1={x} y1={110} x2={x} y2={117} stroke={fg} strokeWidth="1" opacity="0.5" />
    ))}
    {/* Dientes inferiores */}
    {[60, 75, 89, 103, 117, 131, 144].map((x, i) => (
      <line key={`d${i}`} x1={x} y1={115} x2={x} y2={108} stroke={fg} strokeWidth="1" opacity="0.5" />
    ))}
    {/* Ojo */}
    <ellipse cx="140" cy="98" rx="6" ry="4" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
    <ellipse cx="141" cy="98" rx="2" ry="3.5" fill={accent} opacity="0.4" />
    {/* Escamas */}
    <path d="M155,105 Q165,100 170,108 Q175,115 170,120" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <path d="M170,108 Q178,105 180,112" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.25" />
    {/* Persona dentro (piernas asomando) */}
    <line x1="48" y1="112" x2="30" y2="125" stroke={fg} strokeWidth="1.5" opacity="0.4" />
    <line x1="48" y1="112" x2="32" y2="140" stroke={fg} strokeWidth="1.5" opacity="0.4" />
    {/* Zapatos */}
    <path d="M30,125 L24,127 L24,130" fill="none" stroke={fg} strokeWidth="1" opacity="0.3" />
    <path d="M32,140 L26,142 L26,145" fill="none" stroke={fg} strokeWidth="1" opacity="0.3" />
    {/* Cartel de exhibición */}
    <rect x="65" y="170" width="70" height="35" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <line x1="75" y1="180" x2="125" y2="180" stroke={fg} strokeWidth="0.5" opacity="0.2" />
    <line x1="80" y1="188" x2="120" y2="188" stroke={fg} strokeWidth="0.5" opacity="0.15" />
    <line x1="85" y1="196" x2="115" y2="196" stroke={fg} strokeWidth="0.5" opacity="0.1" />
  </svg>
);

export default CrocodileCover;
