const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const AxeCover = ({ bg, fg, accent, dim, isRead }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="bloodGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a0a0a" stopOpacity="0" />
        <stop offset="100%" stopColor="#1a0505" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#bloodGrad)" />
    <Border dim={dim} />
    {/* Mango del hacha */}
    <line x1="100" y1="45" x2="104" y2="210" stroke={fg} strokeWidth="3" strokeLinecap="round" />
    {/* Hoja del hacha */}
    <path d="M62,70 Q55,100 68,122 L104,100 L100,65 Z" fill={dim} stroke={accent} strokeWidth="1.8" />
    <path d="M62,70 Q65,85 72,95" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4" />
    {/* Filo brillante */}
    <path d="M68,122 Q64,108 66,95" fill="none" stroke={isRead ? "#f0d080" : "#b09040"} strokeWidth="0.8" opacity="0.6" />
    {/* Gotas de sangre */}
    <ellipse cx="85" cy="148" rx="2.5" ry="3.5" fill="#8B0000" opacity={isRead ? 0.7 : 0.4} />
    <ellipse cx="92" cy="160" rx="1.8" ry="2.5" fill="#8B0000" opacity={isRead ? 0.6 : 0.3} />
    <ellipse cx="79" cy="165" rx="1.5" ry="2" fill="#8B0000" opacity={isRead ? 0.5 : 0.25} />
    <ellipse cx="88" cy="175" rx="1.2" ry="1.8" fill="#8B0000" opacity={isRead ? 0.4 : 0.2} />
    {/* Cruz de redención al fondo */}
    <line x1="100" y1="225" x2="100" y2="255" stroke={fg} strokeWidth="1" opacity="0.3" />
    <line x1="88" y1="234" x2="112" y2="234" stroke={fg} strokeWidth="1" opacity="0.3" />
    {/* Rayas del suelo */}
    <line x1="40" y1="215" x2="160" y2="215" stroke={dim} strokeWidth="0.5" opacity="0.4" />
    <line x1="40" y1="222" x2="160" y2="222" stroke={dim} strokeWidth="0.4" opacity="0.3" />
  </svg>
);

export default AxeCover;
