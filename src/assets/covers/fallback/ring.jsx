const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const RingCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="ringGlow" cx="50%" cy="44%" r="36%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#ringGlow)" />
    <Border dim={dim} />

    <ellipse cx="100" cy="124" rx="42" ry="56" fill="none" stroke={fg} strokeWidth="2.6" />
    <ellipse cx="100" cy="124" rx="35" ry="49" fill="none" stroke={fg} strokeWidth="0.75" opacity="0.32" />
    <ellipse cx="100" cy="124" rx="48" ry="63" fill="none" stroke={dim} strokeWidth="0.8" strokeDasharray="3 5" opacity="0.42" />

    <ellipse cx="100" cy="84" rx="10" ry="6" fill="none" stroke={accent} strokeWidth="1.8" />
    <ellipse cx="100" cy="84" rx="5" ry="3" fill={dim} stroke={accent} strokeWidth="0.8" />
    <path d="M92,98 L86,126 L91,150 L84,178" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.74" />
    <path d="M71,104 Q63,125 71,145" fill="none" stroke={accent} strokeWidth="0.7" opacity="0.34" />
    <path d="M130,104 Q137,126 129,146" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.18" />

    <circle cx="90" cy="122" r="6.5" fill="none" stroke={fg} strokeWidth="0.95" opacity="0.56" />
    <circle cx="111" cy="132" r="6.5" fill="none" stroke={accent} strokeWidth="0.95" opacity="0.44" strokeDasharray="2 2" />

    <line x1="100" y1="182" x2="100" y2="224" stroke={fg} strokeWidth="2.2" />
    <path d="M76,224 Q100,219 124,224" fill="none" stroke={fg} strokeWidth="2.4" />
    <ellipse cx="100" cy="233" rx="34" ry="6" fill={dim} opacity="0.48" />
  </svg>
);

export default RingCover;
