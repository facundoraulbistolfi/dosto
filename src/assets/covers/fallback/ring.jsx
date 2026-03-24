const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const RingCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <rect width="200" height="280" fill={bg} />
    <Border dim={dim} />
    {/* Anillo principal */}
    <ellipse cx="100" cy="125" rx="38" ry="52" fill="none" stroke={fg} strokeWidth="2.5" />
    <ellipse cx="100" cy="125" rx="32" ry="46" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
    {/* Joya en la parte superior */}
    <ellipse cx="100" cy="88" rx="9" ry="5" fill="none" stroke={accent} strokeWidth="1.8" />
    <ellipse cx="100" cy="88" rx="5" ry="3" fill={dim} stroke={accent} strokeWidth="0.8" />
    {/* Grieta vertical */}
    <path d="M88,100 L84,125 L90,148 L85,172" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.7" />
    {/* Reflejo en el anillo */}
    <path d="M68,105 Q60,125 68,145" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.3" />
    {/* Dos figuras dentro del anillo */}
    <circle cx="90" cy="120" r="6" fill="none" stroke={fg} strokeWidth="1" opacity="0.5" />
    <circle cx="110" cy="130" r="6" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" strokeDasharray="2,1" />
    {/* Base con sombra */}
    <ellipse cx="100" cy="230" rx="30" ry="6" fill={dim} opacity="0.5" />
    <line x1="100" y1="177" x2="100" y2="224" stroke={fg} strokeWidth="2" />
    <line x1="75" y1="224" x2="125" y2="224" stroke={fg} strokeWidth="2.5" />
  </svg>
);

export default RingCover;
