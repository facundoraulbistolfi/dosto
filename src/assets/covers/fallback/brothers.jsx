const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const BrothersCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="brothersFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={bg} />
        <stop offset="100%" stopColor="#070910" />
      </linearGradient>
      <radialGradient id="brothersGlow" cx="50%" cy="30%" r="38%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.14" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="200" height="280" fill="url(#brothersFade)" />
    <rect width="200" height="280" fill="url(#brothersGlow)" />
    <Border dim={dim} />

    <line x1="100" y1="34" x2="100" y2="66" stroke={accent} strokeWidth="1.9" opacity="0.74" />
    <line x1="87" y1="45" x2="113" y2="45" stroke={accent} strokeWidth="1.9" opacity="0.74" />
    <line x1="91" y1="57" x2="109" y2="57" stroke={accent} strokeWidth="1.2" opacity="0.54" />

    <g opacity="0.9">
      <circle cx="58" cy="104" r="13" fill="none" stroke={accent} strokeWidth="2" />
      <line x1="58" y1="118" x2="58" y2="172" stroke={accent} strokeWidth="2" />
      <line x1="58" y1="136" x2="38" y2="158" stroke={accent} strokeWidth="1.8" />
      <line x1="58" y1="136" x2="78" y2="154" stroke={accent} strokeWidth="1.8" />
      <line x1="58" y1="172" x2="44" y2="204" stroke={accent} strokeWidth="1.8" />
      <line x1="58" y1="172" x2="72" y2="204" stroke={accent} strokeWidth="1.8" />
    </g>

    <g opacity="0.92">
      <circle cx="100" cy="98" r="13" fill="none" stroke={fg} strokeWidth="2" />
      <line x1="100" y1="111" x2="100" y2="172" stroke={fg} strokeWidth="2" />
      <line x1="100" y1="130" x2="80" y2="152" stroke={fg} strokeWidth="1.8" />
      <line x1="100" y1="130" x2="120" y2="152" stroke={fg} strokeWidth="1.8" />
      <line x1="100" y1="172" x2="86" y2="204" stroke={fg} strokeWidth="1.8" />
      <line x1="100" y1="172" x2="114" y2="204" stroke={fg} strokeWidth="1.8" />
    </g>

    <g opacity="0.9">
      <circle cx="142" cy="104" r="13" fill="none" stroke={fg} strokeWidth="2" />
      <ellipse cx="142" cy="88" rx="15" ry="4.5" fill="none" stroke={accent} strokeWidth="1" opacity="0.72" />
      <line x1="142" y1="118" x2="142" y2="172" stroke={fg} strokeWidth="2" />
      <line x1="142" y1="136" x2="122" y2="158" stroke={fg} strokeWidth="1.8" />
      <line x1="142" y1="136" x2="162" y2="158" stroke={fg} strokeWidth="1.8" />
      <line x1="142" y1="172" x2="128" y2="204" stroke={fg} strokeWidth="1.8" />
      <line x1="142" y1="172" x2="156" y2="204" stroke={fg} strokeWidth="1.8" />
    </g>

    <path d="M58,120 Q78,108 100,118 Q124,128 142,120" fill="none" stroke={dim} strokeWidth="0.7" opacity="0.34" />
    <path d="M22,218 Q100,208 178,218" fill="none" stroke={fg} strokeWidth="0.9" opacity="0.4" />
    <path d="M28,230 Q100,222 172,230" fill="none" stroke={dim} strokeWidth="0.6" opacity="0.26" />
  </svg>
);

export default BrothersCover;
