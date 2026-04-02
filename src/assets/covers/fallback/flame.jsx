const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const FlameCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="fireGlow" cx="50%" cy="54%" r="38%">
        <stop offset="0%" stopColor="#a63a0c" stopOpacity="0.26" />
        <stop offset="46%" stopColor="#742006" stopOpacity="0.1" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#fireGlow)" />
    <Border dim={dim} />

    <path d="M100,48 Q84,80 91,112 Q98,90 100,104 Q104,88 111,112 Q118,80 100,48" fill="none" stroke={accent} strokeWidth="2.1" />
    <path d="M84,70 Q72,102 81,136 Q91,113 84,70" fill="none" stroke={fg} strokeWidth="1.45" opacity="0.76" />
    <path d="M116,70 Q128,102 119,136 Q109,113 116,70" fill="none" stroke={fg} strokeWidth="1.45" opacity="0.76" />
    <path d="M61,94 Q52,118 60,142 Q68,124 61,94" fill="none" stroke={fg} strokeWidth="1.05" opacity="0.46" />
    <path d="M139,94 Q148,118 140,142 Q132,124 139,94" fill="none" stroke={fg} strokeWidth="1.05" opacity="0.46" />

    <path
      d="M18,204 L18,182 L30,182 L30,168 L42,168 L42,182 L50,182 L50,160 L58,148 L66,160 L66,178 L74,178 L74,166 L82,156 L90,166 L90,178 L98,178 L98,186 L108,186 L108,172 L116,158 L124,172 L124,186 L132,186 L132,170 L140,160 L148,170 L148,182 L158,182 L158,190 L170,190 L170,204"
      fill="none"
      stroke={fg}
      strokeWidth="1.3"
      opacity="0.66"
    />
    <path d="M18,212 Q54,200 90,208 Q126,216 170,210" fill="none" stroke={dim} strokeWidth="0.85" opacity="0.32" />

    {[[70, 60], [84, 44], [116, 50], [130, 64], [94, 38], [108, 34], [78, 52], [122, 58]].map(([x, y], index) => (
      <circle key={index} cx={x} cy={y} r={index < 4 ? "1" : "0.8"} fill={accent} opacity={0.34 + index * 0.05} />
    ))}
  </svg>
);

export default FlameCover;
