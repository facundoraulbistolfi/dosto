const Border = ({ dim }) => (
  <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
);

const CoinsCover = ({ bg, fg, accent, dim }) => (
  <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
    <defs>
      <radialGradient id="coinsGlow" cx="50%" cy="50%" r="35%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
        <stop offset="100%" stopColor={bg} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="280" fill={bg} />
    <rect width="200" height="280" fill="url(#coinsGlow)" />
    <Border dim={dim} />
    {/* Monedas apiladas */}
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse key={`s${i}`} cx={100} cy={160 - i * 8} rx="30" ry="8" fill="none" stroke={accent} strokeWidth="1.2" opacity={0.4 + i * 0.1} />
    ))}
    {/* Monedas sueltas */}
    <ellipse cx="60" cy="180" rx="18" ry="5" fill="none" stroke={fg} strokeWidth="1" opacity="0.4" />
    <ellipse cx="145" cy="175" rx="15" ry="4" fill="none" stroke={fg} strokeWidth="1" opacity="0.35" />
    <ellipse cx="55" cy="200" rx="12" ry="3.5" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
    {/* Moneda grande central (detalle) */}
    <circle cx="100" cy="90" r="25" fill="none" stroke={accent} strokeWidth="1.8" />
    <circle cx="100" cy="90" r="20" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.4" />
    <text x="100" y="96" textAnchor="middle" fill={accent} fontSize="18" fontFamily="serif" opacity="0.5">₽</text>
    {/* Mano agarrando */}
    <path d="M68,210 Q75,205 85,210 Q90,212 95,210 Q100,208 105,210" fill="none" stroke={fg} strokeWidth="1" opacity="0.3" />
    <path d="M68,210 Q65,220 70,225" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.25" />
  </svg>
);

export default CoinsCover;
