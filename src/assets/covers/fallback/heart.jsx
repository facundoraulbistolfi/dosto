const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const HeartCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="heartGlow" cx="50%" cy="40%" r="28%">
        <stop offset="0%" stopColor="#8B0000" stopOpacity="0.15" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#heartGlow)" />
    <Border dim={dim} />
    {/* Corazón grande */}
    <path
      d="M100,130 C100,130 60,95 60,75 C60,55 80,45 100,65 C120,45 140,55 140,75 C140,95 100,130 100,130"
      fill="none"
      stroke={accent}
      strokeWidth="2"
    />
    {/* Grieta en el corazón */}
    <path d="M100,70 L96,85 L104,95 L98,110 L100,130" fill="none" stroke={fg} strokeWidth="1.2" opacity="0.5" />
    {/* Latidos débiles (línea de ECG) */}
    <path
      d="M35,170 L70,170 L78,170 L82,155 L86,185 L90,160 L94,175 L98,170 L165,170"
      fill="none"
      stroke={accent}
      strokeWidth="1"
      opacity="0.4"
    />
    {/* Gotas cayendo */}
    <ellipse cx="100" cy="145" rx="2" ry="3" fill={accent} opacity="0.3" />
    <ellipse cx="97" cy="155" rx="1.5" ry="2.5" fill={accent} opacity="0.25" />
    <ellipse cx="103" cy="162" rx="1.2" ry="2" fill={accent} opacity="0.2" />
    {/* Silueta encorvada */}
    <circle cx="100" cy="210" r="5" fill={fg} opacity="0.3" />
    <path d="M100,215 Q95,225 92,240" fill="none" stroke={fg} strokeWidth="1.2" opacity="0.25" />
    <path d="M100,220 Q94,222 88,225" fill="none" stroke={fg} strokeWidth="1" opacity="0.2" />
    <path d="M100,220 Q106,222 112,225" fill="none" stroke={fg} strokeWidth="1" opacity="0.2" />
  </svg>
);

export default HeartCover;
