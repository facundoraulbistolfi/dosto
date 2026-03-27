const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const JesterCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="jesterGlow" cx="50%" cy="35%" r="25%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#jesterGlow)" />
    <Border dim={dim} />
    {/* Gorro de bufón */}
    <path d="M70,90 Q65,55 55,40" fill="none" stroke={accent} strokeWidth="1.5" />
    <path d="M100,75 Q100,45 95,30" fill="none" stroke={accent} strokeWidth="1.5" />
    <path d="M130,90 Q135,55 145,40" fill="none" stroke={accent} strokeWidth="1.5" />
    {/* Cascabeles */}
    <circle cx="55" cy="38" r="4" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
    <circle cx="95" cy="28" r="4" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
    <circle cx="145" cy="38" r="4" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
    {/* Cara */}
    <ellipse cx="100" cy="105" rx="30" ry="25" fill="none" stroke={fg} strokeWidth="1.5" opacity="0.5" />
    {/* Ojos tristes */}
    <circle cx="88" cy="100" r="3" fill={fg} opacity="0.4" />
    <circle cx="112" cy="100" r="3" fill={fg} opacity="0.4" />
    <path d="M85,95 Q88,92 91,95" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    <path d="M109,95 Q112,92 115,95" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    {/* Sonrisa forzada */}
    <path d="M85,115 Q100,125 115,115" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.5" />
    {/* Lágrima */}
    <ellipse cx="88" cy="108" rx="1.2" ry="2" fill={accent} opacity="0.4" />
    {/* Cuello de volantes */}
    <path d="M70,130 Q80,138 90,130 Q100,138 110,130 Q120,138 130,130" fill="none" stroke={fg} strokeWidth="1" opacity="0.35" />
    {/* Manos gesticulando */}
    <path d="M60,160 Q55,170 60,180 Q65,175 70,180" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.25" />
    <path d="M140,160 Q145,170 140,180 Q135,175 130,180" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.25" />
  </svg>
);

export default JesterCover;
