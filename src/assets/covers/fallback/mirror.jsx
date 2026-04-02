const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const MirrorCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="mirrorGlow" cx="50%" cy="44%" r="34%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.14" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#mirrorGlow)" />
    <Border dim={dim} />

    <ellipse cx="100" cy="118" rx="46" ry="64" fill="none" stroke={fg} strokeWidth="2.5" />
    <ellipse cx="100" cy="118" rx="40" ry="58" fill="none" stroke={fg} strokeWidth="0.7" opacity="0.34" />
    <ellipse cx="100" cy="118" rx="50" ry="68" fill="none" stroke={dim} strokeWidth="0.8" strokeDasharray="3 4" opacity="0.46" />

    <circle cx="100" cy="98" r="13" fill="none" stroke={accent} strokeWidth="1.45" />
    <circle cx="96" cy="95" r="1.4" fill={accent} opacity="0.7" />
    <circle cx="104" cy="95" r="1.4" fill={accent} opacity="0.7" />
    <path d="M96,106 Q100,110 104,106" fill="none" stroke={accent} strokeWidth="0.95" opacity="0.58" />
    <line x1="100" y1="112" x2="100" y2="148" stroke={accent} strokeWidth="1.1" opacity="0.56" />
    <line x1="100" y1="122" x2="86" y2="138" stroke={accent} strokeWidth="0.95" opacity="0.48" />
    <line x1="100" y1="122" x2="114" y2="138" stroke={accent} strokeWidth="0.95" opacity="0.48" />

    <circle cx="100" cy="98" r="19" fill="none" stroke={dim} strokeWidth="1" strokeDasharray="2 3" opacity="0.42" />
    <path d="M102,74 L96,98 L103,124 L95,150" fill="none" stroke={fg} strokeWidth="0.85" opacity="0.38" />

    <line x1="100" y1="184" x2="100" y2="218" stroke={fg} strokeWidth="2.5" />
    <path d="M76,218 Q100,212 124,218" fill="none" stroke={fg} strokeWidth="2.4" />
    <ellipse cx="100" cy="228" rx="30" ry="4.5" fill={dim} opacity="0.5" />
  </svg>
);

export default MirrorCover;
