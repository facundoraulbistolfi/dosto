const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const BrothersCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="bg-brothers" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={bg} />
        <stop offset="100%" stopColor="#08080f" />
      </linearGradient>
    </defs>
    <rect width="200" height="280" fill="url(#bg-brothers)" />
    <Border dim={dim} />
    {/* Cruz ortodoxa al centro-arriba */}
    <line x1="100" y1="38" x2="100" y2="65" stroke={accent} strokeWidth="1.8" opacity="0.7" />
    <line x1="88" y1="47" x2="112" y2="47" stroke={accent} strokeWidth="1.8" opacity="0.7" />
    <line x1="92" y1="57" x2="108" y2="57" stroke={accent} strokeWidth="1.2" opacity="0.5" />
    {/* Dmitri — izquierda, apasionado */}
    <circle cx="58" cy="105" r="13" fill="none" stroke={accent} strokeWidth="2" />
    <line x1="58" y1="118" x2="58" y2="172" stroke={accent} strokeWidth="2" />
    <line x1="58" y1="136" x2="38" y2="158" stroke={accent} strokeWidth="1.8" />
    <line x1="58" y1="136" x2="78" y2="155" stroke={accent} strokeWidth="1.8" />
    <line x1="58" y1="172" x2="44" y2="205" stroke={accent} strokeWidth="1.8" />
    <line x1="58" y1="172" x2="72" y2="205" stroke={accent} strokeWidth="1.8" />
    {/* Ivan — centro, intelectual */}
    <circle cx="100" cy="98" r="13" fill="none" stroke={fg} strokeWidth="2" />
    <line x1="100" y1="111" x2="100" y2="172" stroke={fg} strokeWidth="2" />
    <line x1="100" y1="130" x2="80" y2="152" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="130" x2="120" y2="152" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="172" x2="86" y2="205" stroke={fg} strokeWidth="1.8" />
    <line x1="100" y1="172" x2="114" y2="205" stroke={fg} strokeWidth="1.8" />
    {/* Alyosha — derecha, santo */}
    <circle cx="142" cy="105" r="13" fill="none" stroke={fg} strokeWidth="2" />
    <ellipse cx="142" cy="88" rx="15" ry="4.5" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
    <line x1="142" y1="118" x2="142" y2="172" stroke={fg} strokeWidth="2" />
    <line x1="142" y1="136" x2="122" y2="158" stroke={fg} strokeWidth="1.8" />
    <line x1="142" y1="136" x2="162" y2="158" stroke={fg} strokeWidth="1.8" />
    <line x1="142" y1="172" x2="128" y2="205" stroke={fg} strokeWidth="1.8" />
    <line x1="142" y1="172" x2="156" y2="205" stroke={fg} strokeWidth="1.8" />
    {/* Línea del horizonte */}
    <path d="M20,218 Q100,210 180,218" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.4" />
    <path d="M25,228 Q100,222 175,228" fill="none" stroke={dim} strokeWidth="0.5" opacity="0.3" />
  </svg>
);

export default BrothersCover;
