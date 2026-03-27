const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const LanternCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="lanternGlow" cx="50%" cy="38%" r="25%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="60%" stopColor={accent} stopOpacity="0.05" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#lanternGlow)" />
    <Border dim={dim} />
    {/* Farol */}
    <rect x="88" y="55" width="24" height="8" fill="none" stroke={fg} strokeWidth="1" opacity="0.5" />
    <path d="M85,63 L82,105 L118,105 L115,63" fill="none" stroke={accent} strokeWidth="1.5" />
    <line x1="100" y1="55" x2="100" y2="42" stroke={fg} strokeWidth="1.2" opacity="0.4" />
    {/* Llama */}
    <path d="M100,72 Q96,80 98,90 Q100,82 102,90 Q104,80 100,72" fill={accent} opacity="0.3" />
    <ellipse cx="100" cy="88" rx="3" ry="5" fill={accent} opacity="0.15" />
    {/* Vidrios del farol */}
    <line x1="88" y1="63" x2="85" y2="105" stroke={fg} strokeWidth="0.5" opacity="0.2" />
    <line x1="112" y1="63" x2="115" y2="105" stroke={fg} strokeWidth="0.5" opacity="0.2" />
    {/* Cono de luz */}
    <path d="M82,105 L55,200 L145,200 L118,105" fill={accent} opacity="0.04" />
    {/* Silueta femenina misteriosa */}
    <circle cx="100" cy="155" r="6" fill={fg} opacity="0.35" />
    <path d="M100,161 Q95,175 88,195 L112,195 Q105,175 100,161" fill={fg} opacity="0.25" />
    {/* Sombras */}
    <path d="M60,200 Q80,195 100,200 Q120,205 140,200" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.2" />
    {/* Edificios oscuros a los lados */}
    <rect x="25" y="130" width="25" height="70" fill={fg} opacity="0.1" />
    <rect x="150" y="140" width="25" height="60" fill={fg} opacity="0.1" />
    <rect x="28" y="145" width="6" height="8" fill={accent} opacity="0.08" />
    <rect x="40" y="150" width="6" height="8" fill={accent} opacity="0.06" />
  </svg>
);

export default LanternCover;
