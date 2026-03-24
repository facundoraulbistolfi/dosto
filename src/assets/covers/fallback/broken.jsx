const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const BrokenCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <rect width="200" height="280" fill={bg} />
    <Border dim={dim} />
    {/* Figura de pie — aristócrata */}
    <circle cx="140" cy="80" r="12" fill="none" stroke={fg} strokeWidth="1.5" />
    <line x1="140" y1="92" x2="140" y2="145" stroke={fg} strokeWidth="1.8" />
    <line x1="140" y1="108" x2="120" y2="128" stroke={fg} strokeWidth="1.5" />
    <line x1="140" y1="108" x2="158" y2="122" stroke={fg} strokeWidth="1.5" />
    <line x1="140" y1="145" x2="128" y2="175" stroke={fg} strokeWidth="1.5" />
    <line x1="140" y1="145" x2="152" y2="175" stroke={fg} strokeWidth="1.5" />
    {/* Figura caída — humillada */}
    <circle cx="72" cy="155" r="10" fill="none" stroke={accent} strokeWidth="1.5" />
    <path d="M72,165 Q60,175 50,185 Q60,190 72,195" fill="none" stroke={accent} strokeWidth="1.5" />
    <line x1="72" y1="172" x2="90" y2="165" stroke={accent} strokeWidth="1.2" />
    <line x1="72" y1="180" x2="88" y2="188" stroke={accent} strokeWidth="1.2" />
    {/* Grieta en el suelo */}
    <path d="M50,210 L65,205 L80,215 L95,208 L110,218 L130,210" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.5" />
    {/* Lágrimas / gotas */}
    <circle cx="68" cy="143" r="1.2" fill={accent} opacity="0.6" />
    <circle cx="63" cy="148" r="0.8" fill={accent} opacity="0.5" />
    <circle cx="70" cy="151" r="0.6" fill={accent} opacity="0.4" />
    {/* Líneas decorativas */}
    <line x1="40" y1="235" x2="160" y2="235" stroke={dim} strokeWidth="0.5" opacity="0.5" />
    <line x1="40" y1="238" x2="160" y2="238" stroke={dim} strokeWidth="0.3" opacity="0.3" />
  </svg>
);

export default BrokenCover;
