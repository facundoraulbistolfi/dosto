const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const HorseCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="horseGlow" cx="50%" cy="42%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#horseGlow)" />
    <Border dim={dim} />
    {/* Caballo al galope */}
    {/* Cabeza */}
    <path d="M130,65 Q140,55 138,45 Q135,40 130,42 Q128,48 125,55 Q122,60 125,65" fill="none" stroke={accent} strokeWidth="1.8" />
    {/* Oreja */}
    <path d="M134,44 L137,36 L132,42" fill="none" stroke={accent} strokeWidth="1" />
    {/* Crin */}
    <path d="M125,55 Q115,60 110,70 Q105,78 108,85" fill="none" stroke={fg} strokeWidth="1.2" opacity="0.5" />
    <path d="M128,50 Q118,55 113,65" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.4" />
    {/* Cuerpo */}
    <path d="M125,65 Q135,75 140,90 Q142,105 135,115 Q125,118 110,115 Q95,112 85,105 Q80,95 85,85 Q90,75 100,70 Q112,65 125,65" fill="none" stroke={accent} strokeWidth="1.5" />
    {/* Patas delanteras */}
    <path d="M120,115 L125,145 L128,150" fill="none" stroke={fg} strokeWidth="1.2" opacity="0.5" />
    <path d="M110,115 L105,140 L102,150" fill="none" stroke={fg} strokeWidth="1.2" opacity="0.5" />
    {/* Patas traseras */}
    <path d="M90,110 L82,140 L78,150" fill="none" stroke={fg} strokeWidth="1.2" opacity="0.5" />
    <path d="M95,112 L98,142 L100,150" fill="none" stroke={fg} strokeWidth="1.2" opacity="0.5" />
    {/* Cola */}
    <path d="M85,100 Q70,105 65,115 Q62,125 68,130" fill="none" stroke={fg} strokeWidth="1" opacity="0.4" />
    {/* Jinete pequeño (niño) */}
    <circle cx="108" cy="62" r="5" fill={fg} opacity="0.35" />
    <line x1="108" y1="67" x2="108" y2="80" stroke={fg} strokeWidth="1" opacity="0.3" />
    {/* Suelo */}
    <path d="M30,155 Q70,148 110,155 Q150,162 170,155" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.2" />
    {/* Flores silvestres */}
    {[[45,170],[70,175],[130,168],[155,172]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="1.5" fill={accent} opacity={0.2 + i * 0.03} />
    ))}
  </svg>
);

export default HorseCover;
