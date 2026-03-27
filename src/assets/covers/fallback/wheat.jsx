const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const WheatCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="wheatGlow" cx="50%" cy="50%" r="35%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#wheatGlow)" />
    <Border dim={dim} />
    {/* Espigas de trigo */}
    {[
      { x: 80, angle: -10 },
      { x: 100, angle: 0 },
      { x: 120, angle: 10 },
    ].map(({ x, angle }, idx) => (
      <g key={idx} transform={`rotate(${angle}, ${x}, 180)`} opacity={0.5 + idx * 0.1}>
        <line x1={x} y1={180} x2={x} y2={70} stroke={fg} strokeWidth="1.2" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <ellipse cx={x - 6} cy={80 + i * 16} rx="4" ry="7" fill="none" stroke={accent} strokeWidth="0.8" transform={`rotate(-20, ${x - 6}, ${80 + i * 16})`} />
            <ellipse cx={x + 6} cy={88 + i * 16} rx="4" ry="7" fill="none" stroke={accent} strokeWidth="0.8" transform={`rotate(20, ${x + 6}, ${88 + i * 16})`} />
          </g>
        ))}
      </g>
    ))}
    {/* Tierra */}
    <path d="M25,195 Q60,188 100,195 Q140,202 175,195" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    {/* Manos grandes de campesino */}
    <path d="M70,215 Q80,210 90,215 Q95,218 100,215 Q105,218 110,215 Q120,210 130,215" fill="none" stroke={fg} strokeWidth="1" opacity="0.25" />
    <path d="M70,215 Q68,225 72,230" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.2" />
    <path d="M130,215 Q132,225 128,230" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.2" />
    {/* Cruz ortodoxa distante */}
    <line x1="100" y1="242" x2="100" y2="262" stroke={fg} strokeWidth="0.8" opacity="0.15" />
    <line x1="93" y1="248" x2="107" y2="248" stroke={fg} strokeWidth="0.8" opacity="0.15" />
    <line x1="95" y1="256" x2="105" y2="256" stroke={fg} strokeWidth="0.6" opacity="0.12" />
  </svg>
);

export default WheatCover;
