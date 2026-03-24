const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const DoubleCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="bg-double" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={bg} />
        <stop offset="100%" stopColor="#050510" />
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-double)" />
    <Border dim={dim} />
    {/* Línea de espejo central */}
    <line x1="100" y1="30" x2="100" y2="250" stroke={fg} strokeWidth="0.5" strokeDasharray="4,4" opacity="0.3" />
    {/* Figura izquierda — sólida */}
    <circle cx="75" cy="100" r="16" fill="none" stroke={fg} strokeWidth="2" />
    <line x1="75" y1="116" x2="75" y2="170" stroke={fg} strokeWidth="2" />
    <line x1="75" y1="132" x2="55" y2="155" stroke={fg} strokeWidth="1.8" />
    <line x1="75" y1="132" x2="95" y2="155" stroke={fg} strokeWidth="1.8" />
    <line x1="75" y1="170" x2="58" y2="200" stroke={fg} strokeWidth="1.8" />
    <line x1="75" y1="170" x2="92" y2="200" stroke={fg} strokeWidth="1.8" />
    {/* Figura derecha — fantasmal */}
    <circle cx="125" cy="100" r="16" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
    <line x1="125" y1="116" x2="125" y2="170" stroke={accent} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
    <line x1="125" y1="132" x2="105" y2="155" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
    <line x1="125" y1="132" x2="145" y2="155" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
    <line x1="125" y1="170" x2="108" y2="200" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
    <line x1="125" y1="170" x2="142" y2="200" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
    {/* Fracturas en el espejo */}
    <path d="M100,50 L94,90 L106,120 L96,160 L104,200" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.3" />
  </svg>
);

export default DoubleCover;
