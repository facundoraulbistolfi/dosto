const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const FlameCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="fireGlow" cx="50%" cy="55%" r="35%">
        <stop offset="0%" stopColor="#8B2500" stopOpacity="0.25" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#fireGlow)" />
    <Border dim={dim} />
    {/* Llama central */}
    <path d="M100,55 Q88,80 92,108 Q97,88 100,100 Q103,88 108,108 Q112,80 100,55" fill="none" stroke={accent} strokeWidth="2" />
    {/* Llamas laterales */}
    <path d="M76,75 Q68,100 75,128 Q82,108 76,75" fill="none" stroke={fg} strokeWidth="1.4" opacity="0.7" />
    <path d="M124,75 Q132,100 125,128 Q118,108 124,75" fill="none" stroke={fg} strokeWidth="1.4" opacity="0.7" />
    <path d="M55,95 Q50,115 58,135 Q63,118 55,95" fill="none" stroke={fg} strokeWidth="1" opacity="0.4" />
    <path d="M145,95 Q150,115 142,135 Q137,118 145,95" fill="none" stroke={fg} strokeWidth="1" opacity="0.4" />
    {/* Silueta ciudad ardiendo */}
    <path
      d="M20,200 L20,182 L32,182 L32,170 L44,170 L44,182 L52,182 L52,162 L58,152 L64,162 L64,178 L76,178 L76,165 L82,158 L88,165 L88,178 L96,178 L96,182 L104,182 L104,172 L110,162 L116,172 L116,182 L124,182 L124,170 L130,163 L136,170 L136,178 L148,178 L148,188 L158,188 L158,175 L164,175 L164,188 L172,188 L172,200"
      fill="none"
      stroke={fg}
      strokeWidth="1.2"
      opacity="0.6"
    />
    {/* Chispas */}
    {[[70,60],[85,45],[115,50],[130,65],[90,42],[110,38]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="1" fill={accent} opacity={0.3 + i * 0.05} />
    ))}
    <line x1="20" y1="200" x2="172" y2="200" stroke={fg} strokeWidth="1.2" opacity="0.5" />
  </svg>
);

export default FlameCover;
