const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const LockCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="lockGlow" cx="50%" cy="45%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#lockGlow)" />
    <Border dim={dim} />
    {/* Candado - arco */}
    <path d="M80,100 L80,75 Q80,50 100,50 Q120,50 120,75 L120,100" fill="none" stroke={accent} strokeWidth="2.5" />
    {/* Candado - cuerpo */}
    <rect x="72" y="100" width="56" height="45" rx="3" fill="none" stroke={accent} strokeWidth="2" />
    {/* Ojo de la cerradura */}
    <circle cx="100" cy="118" r="6" fill={fg} opacity="0.3" />
    <path d="M97,124 L95,138 L105,138 L103,124" fill={fg} opacity="0.25" />
    {/* Mano extendida (ladrón) */}
    <path d="M55,175 Q65,170 75,175 Q80,177 85,175" fill="none" stroke={fg} strokeWidth="1" opacity="0.3" />
    <line x1="55" y1="175" x2="48" y2="185" stroke={fg} strokeWidth="0.8" opacity="0.25" />
    {/* Objeto robado - pañuelo */}
    <path d="M130,170 Q140,165 145,172 Q148,180 142,185 Q135,182 130,170" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    {/* Lágrima de arrepentimiento */}
    <ellipse cx="100" cy="200" rx="2" ry="3" fill={accent} opacity="0.3" />
    <ellipse cx="100" cy="210" rx="1.5" ry="2.5" fill={accent} opacity="0.2" />
    {/* Cruz (redención) */}
    <line x1="100" y1="225" x2="100" y2="250" stroke={fg} strokeWidth="0.8" opacity="0.2" />
    <line x1="90" y1="235" x2="110" y2="235" stroke={fg} strokeWidth="0.8" opacity="0.2" />
  </svg>
);

export default LockCover;
