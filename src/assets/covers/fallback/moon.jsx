const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const MoonCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="38%" r="25%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#moonGlow)" />
    <Border dim={dim} />
    {/* Estrellas */}
    {[[35,45],[155,38],[170,70],[28,80],[165,110],[40,120]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="0.8" fill={accent} opacity="0.5" />
    ))}
    {[[60,55],[140,62],[80,72],[130,85]].map(([x,y],i) => (
      <circle key={i+10} cx={x} cy={y} r="0.5" fill={accent} opacity="0.35" />
    ))}
    {/* Luna creciente */}
    <circle cx="100" cy="90" r="28" fill="none" stroke={accent} strokeWidth="1.5" />
    <circle cx="115" cy="82" r="23" fill={bg} />
    {/* Reflejo lunar en el agua */}
    <line x1="100" y1="165" x2="100" y2="195" stroke={accent} strokeWidth="0.8" opacity="0.4" />
    <line x1="95" y1="170" x2="105" y2="170" stroke={accent} strokeWidth="0.5" opacity="0.3" />
    <line x1="93" y1="178" x2="107" y2="178" stroke={accent} strokeWidth="0.5" opacity="0.25" />
    <line x1="92" y1="186" x2="108" y2="186" stroke={accent} strokeWidth="0.5" opacity="0.2" />
    {/* Puente del Neva */}
    <path d="M30,155 Q65,135 100,155 Q135,135 170,155" fill="none" stroke={fg} strokeWidth="1.8" />
    <line x1="30" y1="155" x2="30" y2="175" stroke={fg} strokeWidth="1.2" />
    <line x1="170" y1="155" x2="170" y2="175" stroke={fg} strokeWidth="1.2" />
    {/* Pilares del puente */}
    <line x1="65" y1="150" x2="65" y2="168" stroke={fg} strokeWidth="1" opacity="0.6" />
    <line x1="100" y1="155" x2="100" y2="170" stroke={fg} strokeWidth="1" opacity="0.6" />
    <line x1="135" y1="150" x2="135" y2="168" stroke={fg} strokeWidth="1" opacity="0.6" />
    {/* Agua ondulante */}
    <path d="M20,175 Q50,168 80,175 Q110,182 140,175 Q160,170 180,175" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.4" />
    <path d="M20,185 Q55,178 90,185 Q120,192 155,185 Q168,181 180,185" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.3" />
    <path d="M20,195 Q60,190 100,195 Q140,200 180,195" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.2" />
    {/* Dos figuras en el puente */}
    <circle cx="82" cy="148" r="3.5" fill={fg} opacity="0.7" />
    <circle cx="90" cy="147" r="3.5" fill={accent} opacity="0.5" />
  </svg>
);

export default MoonCover;
