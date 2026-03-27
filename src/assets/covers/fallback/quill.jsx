const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const QuillCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="quillGlow" cx="50%" cy="40%" r="30%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#quillGlow)" />
    <Border dim={dim} />
    {/* Pluma de escribir */}
    <path d="M120,50 Q105,90 90,140 Q85,155 80,170" fill="none" stroke={accent} strokeWidth="2" />
    <path d="M120,50 Q130,55 125,70 Q115,65 120,50" fill={accent} opacity="0.4" />
    {/* Barbas de la pluma */}
    <path d="M120,50 Q135,45 140,38" fill="none" stroke={fg} strokeWidth="1" opacity="0.5" />
    <path d="M118,58 Q132,52 138,46" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.4" />
    <path d="M115,68 Q128,62 135,55" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.35" />
    {/* Líneas de escritura */}
    <line x1="50" y1="190" x2="150" y2="190" stroke={fg} strokeWidth="0.6" opacity="0.3" />
    <line x1="55" y1="200" x2="145" y2="200" stroke={fg} strokeWidth="0.6" opacity="0.25" />
    <line x1="60" y1="210" x2="140" y2="210" stroke={fg} strokeWidth="0.6" opacity="0.2" />
    <line x1="65" y1="220" x2="120" y2="220" stroke={fg} strokeWidth="0.6" opacity="0.15" />
    {/* Gota de tinta */}
    <ellipse cx="80" cy="172" rx="4" ry="3" fill={accent} opacity="0.5" />
    <ellipse cx="83" cy="176" rx="2" ry="1.5" fill={accent} opacity="0.3" />
    {/* Silueta de niña */}
    <circle cx="100" cy="240" r="5" fill={fg} opacity="0.4" />
    <line x1="100" y1="245" x2="100" y2="258" stroke={fg} strokeWidth="1.2" opacity="0.4" />
    <line x1="100" y1="250" x2="94" y2="255" stroke={fg} strokeWidth="1" opacity="0.35" />
    <line x1="100" y1="250" x2="106" y2="255" stroke={fg} strokeWidth="1" opacity="0.35" />
  </svg>
);

export default QuillCover;
