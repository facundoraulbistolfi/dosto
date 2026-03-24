const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const MirrorCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <rect width="200" height="280" fill={bg} />
    <Border dim={dim} />
    {/* Marco del espejo — oval elegante */}
    <ellipse cx="100" cy="118" rx="44" ry="62" fill="none" stroke={fg} strokeWidth="2.5" />
    <ellipse cx="100" cy="118" rx="38" ry="56" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
    {/* Decoración del marco */}
    <ellipse cx="100" cy="118" rx="48" ry="66" fill="none" stroke={dim} strokeWidth="0.8" strokeDasharray="3,4" />
    {/* Reflejo — rostro joven */}
    <circle cx="100" cy="100" r="12" fill="none" stroke={accent} strokeWidth="1.5" />
    <circle cx="96" cy="97" r="1.5" fill={accent} opacity="0.7" />
    <circle cx="104" cy="97" r="1.5" fill={accent} opacity="0.7" />
    <path d="M96,106 Q100,110 104,106" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
    {/* Torso en el espejo */}
    <line x1="100" y1="112" x2="100" y2="148" stroke={accent} strokeWidth="1.2" opacity="0.5" />
    <line x1="100" y1="122" x2="85" y2="138" stroke={accent} strokeWidth="1" opacity="0.5" />
    <line x1="100" y1="122" x2="115" y2="138" stroke={accent} strokeWidth="1" opacity="0.5" />
    {/* Sombra de lo que pudo ser */}
    <circle cx="100" cy="100" r="18" fill="none" stroke={dim} strokeWidth="1" strokeDasharray="2,3" opacity="0.4" />
    {/* Pie del espejo */}
    <line x1="100" y1="180" x2="100" y2="215" stroke={fg} strokeWidth="2.5" />
    <path d="M75,215 Q100,210 125,215" fill="none" stroke={fg} strokeWidth="2.5" />
    {/* Sombra al pie */}
    <ellipse cx="100" cy="225" rx="28" ry="4" fill={dim} opacity="0.5" />
  </svg>
);

export default MirrorCover;
