const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const PinetreeCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="treeGlow" cx="50%" cy="50%" r="35%">
        <stop offset="0%" stopColor="#0a3a0a" stopOpacity="0.2" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#treeGlow)" />
    <Border dim={dim} />
    {/* Árbol de Navidad */}
    <polygon points="100,40 65,100 75,100 50,155 65,155 35,210 165,210 135,155 150,155 125,100 135,100" fill="none" stroke={accent} strokeWidth="1.5" />
    {/* Tronco */}
    <rect x="92" y="210" width="16" height="20" fill="none" stroke={fg} strokeWidth="1" opacity="0.4" />
    {/* Estrella en la punta */}
    <polygon points="100,35 102,42 110,42 104,47 106,55 100,50 94,55 96,47 90,42 98,42" fill={accent} opacity="0.5" />
    {/* Adornos */}
    <circle cx="85" cy="90" r="3" fill={accent} opacity="0.35" />
    <circle cx="115" cy="110" r="3" fill={accent} opacity="0.3" />
    <circle cx="75" cy="140" r="3" fill={accent} opacity="0.3" />
    <circle cx="120" cy="155" r="3" fill={accent} opacity="0.25" />
    <circle cx="90" cy="170" r="3" fill={accent} opacity="0.25" />
    <circle cx="60" cy="195" r="3" fill={accent} opacity="0.2" />
    <circle cx="140" cy="190" r="3" fill={accent} opacity="0.2" />
    {/* Anillos de boda (tema de la boda) */}
    <ellipse cx="92" cy="250" rx="8" ry="6" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <ellipse cx="108" cy="250" rx="8" ry="6" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
  </svg>
);

export default PinetreeCover;
