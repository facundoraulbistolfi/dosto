const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const KeyholeCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="keyholeGlow" cx="50%" cy="42%" r="20%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#keyholeGlow)" />
    <Border dim={dim} />
    {/* Puerta */}
    <rect x="55" y="40" width="90" height="195" fill="none" stroke={fg} strokeWidth="1.5" opacity="0.4" />
    {/* Paneles de la puerta */}
    <rect x="65" y="50" width="70" height="60" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.2" />
    <rect x="65" y="120" width="70" height="60" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.2" />
    {/* Ojo de cerradura */}
    <circle cx="100" cy="100" r="12" fill="none" stroke={accent} strokeWidth="2" />
    <circle cx="100" cy="96" r="6" fill={accent} opacity="0.15" />
    <path d="M96,102 L93,120 L107,120 L104,102" fill={accent} opacity="0.12" />
    {/* Luz escapando por la cerradura */}
    <line x1="100" y1="88" x2="100" y2="75" stroke={accent} strokeWidth="0.5" opacity="0.3" />
    <line x1="90" y1="95" x2="82" y2="88" stroke={accent} strokeWidth="0.5" opacity="0.25" />
    <line x1="110" y1="95" x2="118" y2="88" stroke={accent} strokeWidth="0.5" opacity="0.25" />
    {/* Sombra de alguien espiando */}
    <circle cx="100" cy="96" r="3" fill={fg} opacity="0.5" />
    {/* Zapatos asomando debajo de la cama */}
    <path d="M75,210 L80,210 Q82,210 82,208 L82,205" fill="none" stroke={fg} strokeWidth="1" opacity="0.3" />
    <path d="M120,210 L125,210 Q127,210 127,208 L127,205" fill="none" stroke={fg} strokeWidth="1" opacity="0.3" />
    {/* Línea de piso */}
    <line x1="40" y1="235" x2="160" y2="235" stroke={fg} strokeWidth="0.8" opacity="0.25" />
  </svg>
);

export default KeyholeCover;
