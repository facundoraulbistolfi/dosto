const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const MoonCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="34%" r="34%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
        <stop offset="48%" stopColor={accent} stopOpacity="0.08" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="nightFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={bg} />
        <stop offset="100%" stopColor="#060912" />
      </linearGradient>
      <linearGradient id="waterGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </linearGradient>
    </defs>

    <rect width="200" height="280" fill="url(#nightFade)" />
    <rect width="200" height="280" fill="url(#moonGlow)" />
    <Border dim={dim} />

    {[[28, 42], [50, 54], [145, 38], [167, 66], [42, 88], [157, 98], [128, 56], [70, 66]].map(([x, y], index) => (
      <circle key={index} cx={x} cy={y} r={index % 2 === 0 ? "0.9" : "0.6"} fill={accent} opacity={index % 2 === 0 ? "0.55" : "0.35"} />
    ))}

    <circle cx="100" cy="84" r="32" fill="none" stroke={accent} strokeWidth="1.7" />
    <circle cx="115" cy="76" r="26" fill="url(#nightFade)" />
    <circle cx="100" cy="84" r="40" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.24" />

    <path d="M26,154 Q64,132 100,152 Q137,133 174,154" fill="none" stroke={fg} strokeWidth="1.8" />
    <path d="M26,160 Q64,139 100,160 Q137,140 174,160" fill="none" stroke={dim} strokeWidth="0.7" opacity="0.45" />
    <line x1="26" y1="154" x2="26" y2="178" stroke={fg} strokeWidth="1.2" />
    <line x1="174" y1="154" x2="174" y2="178" stroke={fg} strokeWidth="1.2" />
    {[58, 78, 100, 122, 144].map((x) => (
      <line key={x} x1={x} y1="148" x2={x} y2="172" stroke={fg} strokeWidth="0.85" opacity="0.56" />
    ))}

    <path d="M18,176 Q52,168 84,176 Q118,184 152,176 Q168,172 182,176" fill="none" stroke={fg} strokeWidth="0.9" opacity="0.45" />
    <path d="M18,188 Q48,182 82,188 Q118,194 148,188 Q164,184 182,188" fill="none" stroke={fg} strokeWidth="0.7" opacity="0.32" />
    <path d="M18,200 Q58,194 100,200 Q142,206 182,200" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.24" />
    <rect x="89" y="144" width="22" height="70" fill="url(#waterGlow)" opacity="0.65" />
    <line x1="100" y1="146" x2="100" y2="210" stroke={accent} strokeWidth="0.9" opacity="0.45" />
    <line x1="93" y1="160" x2="107" y2="160" stroke={accent} strokeWidth="0.6" opacity="0.36" />
    <line x1="91" y1="172" x2="109" y2="172" stroke={accent} strokeWidth="0.55" opacity="0.28" />
    <line x1="90" y1="184" x2="110" y2="184" stroke={accent} strokeWidth="0.5" opacity="0.22" />

    <path d="M24,224 Q70,214 120,220 Q154,224 176,220" fill="none" stroke={dim} strokeWidth="0.8" opacity="0.38" />
    <line x1="72" y1="147" x2="72" y2="152" stroke={fg} strokeWidth="2.2" opacity="0.72" />
    <line x1="84" y1="146" x2="84" y2="152" stroke={accent} strokeWidth="2.2" opacity="0.66" />
  </svg>
);

export default MoonCover;
