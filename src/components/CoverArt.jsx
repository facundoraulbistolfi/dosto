import { memo } from "react";
import { COLORS } from "../theme.js";

const CoverArt = ({ type, isRead, title }) => {
  const bg = isRead ? COLORS.bgCardRead : COLORS.bgCard;
  const fg = isRead ? COLORS.gold : COLORS.goldDim;
  const accent = isRead ? COLORS.goldAccent : COLORS.goldAccentDim;
  const dim = isRead ? COLORS.decorDim : COLORS.decorDimDark;

  const Border = () => (
    <rect x="10" y="10" width="180" height="260" fill="none" stroke={dim} strokeWidth="0.8" />
  );

  const covers = {
    // Pobres gentes — carta y pluma
    letter: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="bg-letter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bg} />
            <stop offset="100%" stopColor="#080810" />
          </linearGradient>
        </defs>
        <rect width="200" height="280" fill="url(#bg-letter)" />
        {/* Borde decorativo */}
        <Border />
        <rect x="14" y="14" width="172" height="252" fill="none" stroke={dim} strokeWidth="0.3" />
        {/* Sobre */}
        <rect x="45" y="90" width="110" height="78" rx="2" fill="none" stroke={fg} strokeWidth="1.5" />
        <polyline points="45,90 100,135 155,90" fill="none" stroke={fg} strokeWidth="1.5" />
        <line x1="45" y1="168" x2="80" y2="135" stroke={fg} strokeWidth="1" opacity="0.5" />
        <line x1="155" y1="168" x2="120" y2="135" stroke={fg} strokeWidth="1" opacity="0.5" />
        {/* Pluma */}
        <path d="M100,60 Q108,50 116,42 Q122,36 128,34" fill="none" stroke={accent} strokeWidth="1.2" />
        <path d="M100,60 Q94,52 90,44 Q88,38 90,34 Q96,36 100,44 Q106,54 100,60" fill={dim} stroke={accent} strokeWidth="1" />
        <line x1="100" y1="60" x2="100" y2="80" stroke={accent} strokeWidth="0.8" />
        {/* Líneas de texto */}
        <line x1="68" y1="190" x2="132" y2="190" stroke={fg} strokeWidth="0.6" opacity="0.5" />
        <line x1="72" y1="200" x2="128" y2="200" stroke={fg} strokeWidth="0.6" opacity="0.4" />
        <line x1="76" y1="210" x2="124" y2="210" stroke={fg} strokeWidth="0.6" opacity="0.3" />
        <line x1="80" y1="220" x2="120" y2="220" stroke={fg} strokeWidth="0.6" opacity="0.2" />
        {/* Sello */}
        <rect x="130" y="96" width="16" height="18" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4" />
        <rect x="132" y="98" width="12" height="14" fill={dim} />
      </svg>
    ),

    // El doble — espejo fracturado
    double: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="bg-double" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={bg} />
            <stop offset="100%" stopColor="#050510" />
          </linearGradient>
        </defs>
        <rect width="200" height="280" fill="url(#bg-double)" />
        <Border />
        {/* Línea de espejo central */}
        <line x1="100" y1="30" x2="100" y2="250" stroke={fg} strokeWidth="0.5" strokeDasharray="4,4" opacity="0.3" />
        {/* Figura izquierda — sólida */}
        <circle cx="75" cy="100" r="16" fill="none" stroke={fg} strokeWidth="2" />
        <line x1="75" y1="116" x2="75" y2="170" stroke={fg} strokeWidth="2" />
        <line x1="75" y1="132" x2="55" y2="155" stroke={fg} strokeWidth="1.8" />
        <line x1="75" y1="132" x2="95" y2="155" stroke={fg} strokeWidth="1.8" />
        <line x1="75" y1="170" x2="58" y2="200" stroke={fg} strokeWidth="1.8" />
        <line x1="75" y1="170" x2="92" y2="200" stroke={fg} strokeWidth="1.8" />
        {/* Figura derecha — fantasmal */}
        <circle cx="125" cy="100" r="16" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
        <line x1="125" y1="116" x2="125" y2="170" stroke={accent} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7" />
        <line x1="125" y1="132" x2="105" y2="155" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
        <line x1="125" y1="132" x2="145" y2="155" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
        <line x1="125" y1="170" x2="108" y2="200" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
        <line x1="125" y1="170" x2="142" y2="200" stroke={accent} strokeWidth="1.2" strokeDasharray="3,2" opacity="0.7" />
        {/* Fracturas en el espejo */}
        <path d="M100,50 L94,90 L106,120 L96,160 L104,200" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.3" />
      </svg>
    ),

    // Noches blancas — luna y canal
    moon: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="38%" r="25%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor={bg} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="280" fill={bg} />
        <rect width="200" height="280" fill="url(#moonGlow)" />
        <Border />
        {/* Estrellas */}
        {[[35,45],[155,38],[170,70],[28,80],[165,110],[40,120]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="0.8" fill={accent} opacity="0.5" />
        ))}
        {[[60,55],[140,62],[80,72],[130,85]].map(([x,y],i) => (
          <circle key={i+10} cx={x} cy={y} r="0.5" fill={accent} opacity="0.35" />
        ))}
        {/* Luna creciente */}
        <circle cx="100" cy="90" r="28" fill="none" stroke={accent} strokeWidth="1.5" />
        <circle cx="115" cy="82" r="23" fill={bg} />
        {/* Reflejo lunar en el agua */}
        <line x1="100" y1="165" x2="100" y2="195" stroke={accent} strokeWidth="0.8" opacity="0.4" />
        <line x1="95" y1="170" x2="105" y2="170" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        <line x1="93" y1="178" x2="107" y2="178" stroke={accent} strokeWidth="0.5" opacity="0.25" />
        <line x1="92" y1="186" x2="108" y2="186" stroke={accent} strokeWidth="0.5" opacity="0.2" />
        {/* Puente del Neva */}
        <path d="M30,155 Q65,135 100,155 Q135,135 170,155" fill="none" stroke={fg} strokeWidth="1.8" />
        <line x1="30" y1="155" x2="30" y2="175" stroke={fg} strokeWidth="1.2" />
        <line x1="170" y1="155" x2="170" y2="175" stroke={fg} strokeWidth="1.2" />
        {/* Pilares del puente */}
        <line x1="65" y1="150" x2="65" y2="168" stroke={fg} strokeWidth="1" opacity="0.6" />
        <line x1="100" y1="155" x2="100" y2="170" stroke={fg} strokeWidth="1" opacity="0.6" />
        <line x1="135" y1="150" x2="135" y2="168" stroke={fg} strokeWidth="1" opacity="0.6" />
        {/* Agua ondulante */}
        <path d="M20,175 Q50,168 80,175 Q110,182 140,175 Q160,170 180,175" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.4" />
        <path d="M20,185 Q55,178 90,185 Q120,192 155,185 Q168,181 180,185" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.3" />
        <path d="M20,195 Q60,190 100,195 Q140,200 180,195" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.2" />
        {/* Dos figuras en el puente */}
        <circle cx="82" cy="148" r="3.5" fill={fg} opacity="0.7" />
        <circle cx="90" cy="147" r="3.5" fill={accent} opacity="0.5" />
      </svg>
    ),

    // Humillados y ofendidos — figura caída
    broken: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <rect width="200" height="280" fill={bg} />
        <Border />
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
        {/* Título ruso decorativo */}
        <line x1="40" y1="235" x2="160" y2="235" stroke={dim} strokeWidth="0.5" opacity="0.5" />
        <line x1="40" y1="238" x2="160" y2="238" stroke={dim} strokeWidth="0.3" opacity="0.3" />
      </svg>
    ),

    // Memorias del subsuelo — escalera descendente
    stairs: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="bg-stairs" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bg} />
            <stop offset="100%" stopColor="#020208" />
          </linearGradient>
        </defs>
        <rect width="200" height="280" fill="url(#bg-stairs)" />
        <Border />
        {/* Perspectiva — punto de fuga */}
        <line x1="100" y1="40" x2="30" y2="230" stroke={dim} strokeWidth="0.3" opacity="0.2" />
        <line x1="100" y1="40" x2="170" y2="230" stroke={dim} strokeWidth="0.3" opacity="0.2" />
        {/* Escaleras descendentes con perspectiva */}
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
    ),

    // Crimen y castigo — hacha sobre rayas rojas
    axe: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="bloodGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a0a0a" stopOpacity="0" />
            <stop offset="100%" stopColor="#1a0505" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect width="200" height="280" fill={bg} />
        <rect width="200" height="280" fill="url(#bloodGrad)" />
        <Border />
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
    ),

    // El jugador — ruleta
    roulette: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="rouletteGlow" cx="50%" cy="48%" r="30%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.08" />
            <stop offset="100%" stopColor={bg} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="280" fill={bg} />
        <rect width="200" height="280" fill="url(#rouletteGlow)" />
        <Border />
        {/* Ruleta */}
        <circle cx="100" cy="128" r="55" fill="none" stroke={fg} strokeWidth="1.8" />
        <circle cx="100" cy="128" r="45" fill="none" stroke={fg} strokeWidth="0.6" opacity="0.4" />
        <circle cx="100" cy="128" r="30" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.5" />
        <circle cx="100" cy="128" r="12" fill={dim} stroke={accent} strokeWidth="1" />
        <circle cx="100" cy="128" r="5" fill={accent} opacity="0.8" />
        {/* Separadores radiales */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={100 + 30 * Math.cos(a)}
              y1={128 + 30 * Math.sin(a)}
              x2={100 + 55 * Math.cos(a)}
              y2={128 + 55 * Math.sin(a)}
              stroke={fg}
              strokeWidth="0.8"
              opacity="0.5"
            />
          );
        })}
        {/* Bolita */}
        <circle
          cx={100 + 48 * Math.cos(0.9)}
          cy={128 + 48 * Math.sin(0.9)}
          r="4"
          fill={accent}
          opacity="0.9"
        />
        {/* Fichas dispersas */}
        <circle cx="55" cy="215" r="6" fill="none" stroke={fg} strokeWidth="1" opacity="0.5" />
        <circle cx="55" cy="215" r="4" fill={dim} />
        <circle cx="70" cy="220" r="6" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
        <circle cx="135" cy="218" r="6" fill="none" stroke={fg} strokeWidth="1" opacity="0.5" />
        <circle cx="148" cy="212" r="6" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
        {/* Número 0 en verde */}
        <text x="100" y="132" textAnchor="middle" fontSize="8" fill={accent} opacity="0.5" fontFamily="serif">0</text>
      </svg>
    ),

    // El idiota — aureola
    halo: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="haloGlow" cx="50%" cy="32%" r="20%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor={bg} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="280" fill={bg} />
        <rect width="200" height="280" fill="url(#haloGlow)" />
        <Border />
        {/* Aureola */}
        <ellipse cx="100" cy="75" rx="24" ry="7" fill="none" stroke={accent} strokeWidth="2" opacity="0.9" />
        {/* Rayos de la aureola */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={100 + 28 * Math.cos(a)}
              y1={75 + 9 * Math.sin(a)}
              x2={100 + 36 * Math.cos(a)}
              y2={75 + 11 * Math.sin(a)}
              stroke={accent}
              strokeWidth="0.6"
              opacity="0.45"
            />
          );
        })}
        {/* Cabeza */}
        <circle cx="100" cy="100" r="18" fill="none" stroke={fg} strokeWidth="1.8" />
        {/* Cuerpo */}
        <line x1="100" y1="118" x2="100" y2="185" stroke={fg} strokeWidth="2" />
        <line x1="100" y1="138" x2="72" y2="165" stroke={fg} strokeWidth="1.8" />
        <line x1="100" y1="138" x2="128" y2="165" stroke={fg} strokeWidth="1.8" />
        <line x1="100" y1="185" x2="84" y2="215" stroke={fg} strokeWidth="1.8" />
        <line x1="100" y1="185" x2="116" y2="215" stroke={fg} strokeWidth="1.8" />
        {/* Multitud en torno */}
        <circle cx="52" cy="165" r="6" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
        <circle cx="148" cy="160" r="6" fill="none" stroke={fg} strokeWidth="0.8" opacity="0.3" />
        <circle cx="40" cy="150" r="5" fill="none" stroke={fg} strokeWidth="0.7" opacity="0.2" />
        <circle cx="160" cy="148" r="5" fill="none" stroke={fg} strokeWidth="0.7" opacity="0.2" />
        {/* Suelo de Petersburgo */}
        <path d="M25,235 L175,235" stroke={dim} strokeWidth="1" opacity="0.4" />
        <path d="M35,248 Q100,240 165,248" fill="none" stroke={dim} strokeWidth="0.5" opacity="0.2" />
      </svg>
    ),

    // El eterno marido — anillo y grieta
    ring: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <rect width="200" height="280" fill={bg} />
        <Border />
        {/* Anillo principal */}
        <ellipse cx="100" cy="125" rx="38" ry="52" fill="none" stroke={fg} strokeWidth="2.5" />
        <ellipse cx="100" cy="125" rx="32" ry="46" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
        {/* Joya en la parte superior */}
        <ellipse cx="100" cy="88" rx="9" ry="5" fill="none" stroke={accent} strokeWidth="1.8" />
        <ellipse cx="100" cy="88" rx="5" ry="3" fill={dim} stroke={accent} strokeWidth="0.8" />
        {/* Grieta vertical */}
        <path d="M88,100 L84,125 L90,148 L85,172" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.7" />
        {/* Reflejo en el anillo */}
        <path d="M68,105 Q60,125 68,145" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.3" />
        {/* Dos figuras dentro del anillo */}
        <circle cx="90" cy="120" r="6" fill="none" stroke={fg} strokeWidth="1" opacity="0.5" />
        <circle cx="110" cy="130" r="6" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" strokeDasharray="2,1" />
        {/* Base con sombra */}
        <ellipse cx="100" cy="230" rx="30" ry="6" fill={dim} opacity="0.5" />
        <line x1="100" y1="177" x2="100" y2="224" stroke={fg} strokeWidth="2" />
        <line x1="75" y1="224" x2="125" y2="224" stroke={fg} strokeWidth="2.5" />
      </svg>
    ),

    // Los demonios — llamas y ciudad
    flame: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="fireGlow" cx="50%" cy="55%" r="35%">
            <stop offset="0%" stopColor="#8B2500" stopOpacity="0.25" />
            <stop offset="100%" stopColor={bg} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="280" fill={bg} />
        <rect width="200" height="280" fill="url(#fireGlow)" />
        <Border />
        {/* Llama central */}
        <path d="M100,55 Q88,80 92,108 Q97,88 100,100 Q103,88 108,108 Q112,80 100,55" fill="none" stroke={accent} strokeWidth="2" />
        {/* Llamas laterales */}
        <path d="M76,75 Q68,100 75,128 Q82,108 76,75" fill="none" stroke={fg} strokeWidth="1.4" opacity="0.7" />
        <path d="M124,75 Q132,100 125,128 Q118,108 124,75" fill="none" stroke={fg} strokeWidth="1.4" opacity="0.7" />
        <path d="M55,95 Q50,115 58,135 Q63,118 55,95" fill="none" stroke={fg} strokeWidth="1" opacity="0.4" />
        <path d="M145,95 Q150,115 142,135 Q137,118 145,95" fill="none" stroke={fg} strokeWidth="1" opacity="0.4" />
        {/* Silueta ciudad ardiendo */}
        <path
          d="M20,200 L20,182 L32,182 L32,170 L44,170 L44,182 L52,182 L52,162 L58,152 L64,162 L64,178 L76,178 L76,165 L82,158 L88,165 L88,178 L96,178 L96,182 L104,182 L104,172 L110,162 L116,172 L116,182 L124,182 L124,170 L130,163 L136,170 L136,178 L148,178 L148,188 L158,188 L158,175 L164,175 L164,188 L172,188 L172,200"
          fill="none"
          stroke={fg}
          strokeWidth="1.2"
          opacity="0.6"
        />
        {/* Chispas */}
        {[[70,60],[85,45],[115,50],[130,65],[90,42],[110,38]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1" fill={accent} opacity={0.3 + i * 0.05} />
        ))}
        <line x1="20" y1="200" x2="172" y2="200" stroke={fg} strokeWidth="1.2" opacity="0.5" />
      </svg>
    ),

    // El adolescente — espejo de identidad
    mirror: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <rect width="200" height="280" fill={bg} />
        <Border />
        {/* Marco del espejo — oval elegante */}
        <ellipse cx="100" cy="118" rx="44" ry="62" fill="none" stroke={fg} strokeWidth="2.5" />
        <ellipse cx="100" cy="118" rx="38" ry="56" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
        {/* Decoración del marco */}
        <ellipse cx="100" cy="118" rx="48" ry="66" fill="none" stroke={dim} strokeWidth="0.8" strokeDasharray="3,4" />
        {/* Reflejo — rostro joven */}
        <circle cx="100" cy="100" r="12" fill="none" stroke={accent} strokeWidth="1.5" />
        <circle cx="96" cy="97" r="1.5" fill={accent} opacity="0.7" />
        <circle cx="104" cy="97" r="1.5" fill={accent} opacity="0.7" />
        <path d="M96,106 Q100,110 104,106" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
        {/* Torso en el espejo */}
        <line x1="100" y1="112" x2="100" y2="148" stroke={accent} strokeWidth="1.2" opacity="0.5" />
        <line x1="100" y1="122" x2="85" y2="138" stroke={accent} strokeWidth="1" opacity="0.5" />
        <line x1="100" y1="122" x2="115" y2="138" stroke={accent} strokeWidth="1" opacity="0.5" />
        {/* Sombra de lo que pudo ser */}
        <circle cx="100" cy="100" r="18" fill="none" stroke={dim} strokeWidth="1" strokeDasharray="2,3" opacity="0.4" />
        {/* Pie del espejo */}
        <line x1="100" y1="180" x2="100" y2="215" stroke={fg} strokeWidth="2.5" />
        <path d="M75,215 Q100,210 125,215" fill="none" stroke={fg} strokeWidth="2.5" />
        {/* Sombra al pie */}
        <ellipse cx="100" cy="225" rx="28" ry="4" fill={dim} opacity="0.5" />
      </svg>
    ),

    // Los hermanos Karamázov — tres figuras y cruz
    brothers: (
      <svg viewBox="0 0 200 280" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="bg-brothers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bg} />
            <stop offset="100%" stopColor="#08080f" />
          </linearGradient>
        </defs>
        <rect width="200" height="280" fill="url(#bg-brothers)" />
        <Border />
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
    ),
  };

  const cover = covers[type] || covers.axe;
  return (
    <div role="img" aria-label={title ? `Portada de ${title}` : "Portada de novela"}>
      {cover}
    </div>
  );
};

export default memo(CoverArt);
