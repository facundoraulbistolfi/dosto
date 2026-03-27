const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const BottleCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="bottleGlow" cx="50%" cy="45%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#bottleGlow)" />
    <Border dim={dim} />
    {/* Botella volcada */}
    <path d="M70,95 L70,70 Q70,60 80,60 L88,60 Q95,60 95,70 L95,95" fill="none" stroke={accent} strokeWidth="1.5" />
    <ellipse cx="82" cy="95" rx="13" ry="30" fill="none" stroke={accent} strokeWidth="1.5" transform="rotate(15, 82, 95)" />
    {/* Líquido derramándose */}
    <path d="M95,115 Q100,120 105,130 Q112,145 108,155" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
    <path d="M97,118 Q102,125 100,135" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.3" />
    {/* Charco */}
    <ellipse cx="110" cy="165" rx="20" ry="6" fill={accent} opacity="0.1" />
    <ellipse cx="110" cy="165" rx="20" ry="6" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.3" />
    {/* Copa volcada */}
    <path d="M130,140 L125,125 L145,125 L140,140" fill="none" stroke={fg} strokeWidth="1" opacity="0.35" />
    <line x1="135" y1="125" x2="135" y2="115" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <ellipse cx="135" cy="114" rx="6" ry="2" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.25" />
    {/* Sombrero caído */}
    <ellipse cx="70" cy="180" rx="18" ry="5" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <path d="M60,180 Q65,168 70,165 Q75,168 80,180" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.25" />
    {/* Máscara social rota */}
    <path d="M90,205 Q100,200 110,205 Q105,210 100,212 Q95,210 90,205" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.25" />
  </svg>
);

export default BottleCover;
