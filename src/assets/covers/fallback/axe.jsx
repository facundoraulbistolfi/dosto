const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const AxeCover = ({ bg, fg, accent, dim, isRead }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="axeBlood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#35070a" stopOpacity="0" />
        <stop offset="100%" stopColor="#120305" stopOpacity="0.86" />
      </linearGradient>
      <radialGradient id="axeGlow" cx="42%" cy="40%" r="46%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.14" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#axeBlood)" />
    <rect width="200" height="280" fill="url(#axeGlow)" />
    <Border dim={dim} />

    <path d="M126,34 L110,220" fill="none" stroke={dim} strokeWidth="6" opacity="0.18" strokeLinecap="round" />
    <line x1="102" y1="38" x2="108" y2="218" stroke={fg} strokeWidth="3.3" strokeLinecap="round" />
    <line x1="100" y1="38" x2="106" y2="218" stroke={accent} strokeWidth="0.5" opacity="0.32" strokeLinecap="round" />

    <path d="M60,66 Q48,98 67,127 L108,102 L103,58 Z" fill={dim} stroke={accent} strokeWidth="1.8" />
    <path d="M65,74 Q61,95 69,110 L102,98" fill="none" stroke={accent} strokeWidth="0.9" opacity="0.42" />
    <path d="M67,126 Q60,111 64,94" fill="none" stroke={isRead ? "#f1d49c" : accent} strokeWidth="1" opacity="0.68" />
    <path d="M60,66 Q71,82 83,84" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.28" />

    <path d="M84,138 C83,147 88,151 86,159 C85,165 80,168 81,173" fill="none" stroke="#7f0b11" strokeWidth="1.2" opacity={isRead ? "0.74" : "0.48"} />
    <ellipse cx="87" cy="146" rx="2.6" ry="3.8" fill="#8e0f14" opacity={isRead ? "0.72" : "0.44"} />
    <ellipse cx="90" cy="160" rx="2" ry="2.8" fill="#8e0f14" opacity={isRead ? "0.6" : "0.34"} />
    <ellipse cx="82" cy="171" rx="1.5" ry="2.2" fill="#8e0f14" opacity={isRead ? "0.5" : "0.28"} />

    <path d="M30,216 Q100,194 170,216" fill="none" stroke={dim} strokeWidth="0.9" opacity="0.34" />
    <path d="M40,225 L160,225" fill="none" stroke={dim} strokeWidth="0.6" opacity="0.26" />
    <line x1="100" y1="220" x2="100" y2="255" stroke={fg} strokeWidth="1" opacity="0.28" />
    <line x1="88" y1="232" x2="112" y2="232" stroke={fg} strokeWidth="1" opacity="0.28" />

    <path d="M148,60 L170,82" fill="none" stroke={dim} strokeWidth="0.9" opacity="0.24" />
    <path d="M140,76 L170,108" fill="none" stroke={dim} strokeWidth="0.7" opacity="0.18" />
  </svg>
);

export default AxeCover;
