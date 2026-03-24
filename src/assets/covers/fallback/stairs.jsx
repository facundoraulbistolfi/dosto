const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const StairsCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="bg-stairs" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={bg} />
        <stop offset="100%" stopColor="#020208" />
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-stairs)" />
    <Border dim={dim} />
    {/* Perspectiva — punto de fuga */}
    <line x1="100" y1="40" x2="30" y2="230" stroke={dim} strokeWidth="0.3" opacity="0.2" />
    <line x1="100" y1="40" x2="170" y2="230" stroke={dim} strokeWidth="0.3" opacity="0.2" />
    {/* Escaleras descendentes */}
    <path d="M42,70 L42,95 L67,95 L67,120 L92,120 L92,145 L117,145 L117,170 L142,170 L142,195 L158,195" fill="none" stroke={fg} strokeWidth="2" />
    {/* Paredes del subsuelo */}
    <line x1="42" y1="70" x2="42" y2="230" stroke={fg} strokeWidth="1" opacity="0.4" />
    <line x1="158" y1="195" x2="158" y2="230" stroke={fg} strokeWidth="1" opacity="0.4" />
    {/* Suelo */}
    <line x1="42" y1="230" x2="158" y2="230" stroke={fg} strokeWidth="1.2" opacity="0.5" />
    {/* Figura pequeña al fondo */}
    <circle cx="148" cy="215" r="5" fill={accent} opacity="0.5" />
    <line x1="148" y1="220" x2="148" y2="232" stroke={accent} strokeWidth="1" opacity="0.4" />
    {/* Sombras progresivas */}
    <line x1="42" y1="240" x2="158" y2="240" stroke={fg} strokeWidth="0.5" opacity="0.2" />
    <line x1="42" y1="248" x2="158" y2="248" stroke={fg} strokeWidth="0.4" opacity="0.15" />
    <line x1="42" y1="255" x2="158" y2="255" stroke={fg} strokeWidth="0.3" opacity="0.1" />
    {/* Telaraña en esquina */}
    <path d="M165,20 L180,20 M165,20 L180,35 M165,20 L165,35" fill="none" stroke={dim} strokeWidth="0.5" opacity="0.5" />
    <path d="M170,20 Q175,25 174,30" fill="none" stroke={dim} strokeWidth="0.4" opacity="0.4" />
  </svg>
);

export default StairsCover;
