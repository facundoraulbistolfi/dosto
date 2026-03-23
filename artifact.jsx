import { useState, useEffect, useCallback } from “react”;

const THEMES = {
existencialismo: { label: “Existencialismo”, color: “#8B5CF6” },
redencion: { label: “Redención”, color: “#F59E0B” },
fe: { label: “Fe y moralidad”, color: “#3B82F6” },
amor: { label: “Amor”, color: “#EC4899” },
sociedad: { label: “Sociedad”, color: “#10B981” },
psicologia: { label: “Psicología”, color: “#EF4444” },
politica: { label: “Política”, color: “#6366F1” },
familia: { label: “Familia”, color: “#F97316” },
identidad: { label: “Identidad”, color: “#14B8A6” },
crimen: { label: “Crimen”, color: “#DC2626” },
soledad: { label: “Soledad”, color: “#6B7280” },
adiccion: { label: “Adicción”, color: “#A855F7” },
};

const NOVELS = [
{
id: “pobres-gentes”,
title: “Pobres gentes”,
titleOrig: “Бедные люди”,
year: 1846,
pages: 180,
themes: [“amor”, “sociedad”, “soledad”],
desc: “Intercambio epistolar entre un funcionario humilde y una joven costurera que revela la dignidad en la pobreza.”,
cover: “letter”,
},
{
id: “el-doble”,
title: “El doble”,
titleOrig: “Двойник”,
year: 1846,
pages: 140,
themes: [“identidad”, “psicologia”],
desc: “Un burócrata descubre que un doble idéntico invade su vida, precipitándolo hacia la locura.”,
cover: “double”,
},
{
id: “noches-blancas”,
title: “Noches blancas”,
titleOrig: “Белые ночи”,
year: 1848,
pages: 80,
themes: [“amor”, “soledad”],
desc: “Cuatro noches de encuentro entre un soñador solitario y una joven que espera a su amado en San Petersburgo.”,
cover: “moon”,
},
{
id: “humillados-y-ofendidos”,
title: “Humillados y ofendidos”,
titleOrig: “Униженные и оскорблённые”,
year: 1861,
pages: 350,
themes: [“sociedad”, “amor”, “redencion”],
desc: “Un escritor enfermo narra la destrucción de familias enteras por la crueldad de un aristócrata sin escrúpulos.”,
cover: “broken”,
},
{
id: “memorias-del-subsuelo”,
title: “Memorias del subsuelo”,
titleOrig: “Записки из подполья”,
year: 1864,
pages: 130,
themes: [“existencialismo”, “psicologia”, “soledad”],
desc: “El monólogo frenético de un hombre que rechaza la razón y la sociedad desde su agujero subterráneo.”,
cover: “stairs”,
},
{
id: “crimen-y-castigo”,
title: “Crimen y castigo”,
titleOrig: “Преступление и наказание”,
year: 1866,
pages: 580,
themes: [“crimen”, “redencion”, “psicologia”, “fe”],
desc: “Un estudiante asesina a una anciana usuraria convencido de su superioridad moral, pero la culpa lo consume.”,
cover: “axe”,
},
{
id: “el-jugador”,
title: “El jugador”,
titleOrig: “Игрок”,
year: 1867,
pages: 170,
themes: [“adiccion”, “amor”, “sociedad”],
desc: “Un tutor ruso se hunde en la fiebre de la ruleta en un casino alemán, atrapado entre el juego y una mujer.”,
cover: “roulette”,
},
{
id: “el-idiota”,
title: “El idiota”,
titleOrig: “Идиот”,
year: 1869,
pages: 640,
themes: [“fe”, “sociedad”, “amor”, “psicologia”],
desc: “El príncipe Myshkin, un hombre de bondad cristiana absoluta, es destruido por la sociedad petersburguesa.”,
cover: “halo”,
},
{
id: “el-eterno-marido”,
title: “El eterno marido”,
titleOrig: “Вечный муж”,
year: 1870,
pages: 160,
themes: [“psicologia”, “identidad”],
desc: “Un viudo busca al amante de su esposa fallecida en un duelo psicológico de humillación y dependencia.”,
cover: “ring”,
},
{
id: “los-demonios”,
title: “Los demonios”,
titleOrig: “Бесы”,
year: 1872,
pages: 700,
themes: [“politica”, “existencialismo”, “crimen”],
desc: “Una célula revolucionaria nihilista siembra el caos en una ciudad provinciana rusa, destruyendo todo a su paso.”,
cover: “flame”,
},
{
id: “el-adolescente”,
title: “El adolescente”,
titleOrig: “Подросток”,
year: 1875,
pages: 500,
themes: [“identidad”, “familia”, “sociedad”],
desc: “Un joven hijo ilegítimo busca poder y reconocimiento mientras descifra su relación con un padre ausente.”,
cover: “mirror”,
},
{
id: “los-hermanos-karamazov”,
title: “Los hermanos Karamázov”,
titleOrig: “Братья Карамазовы”,
year: 1880,
pages: 800,
themes: [“fe”, “familia”, “crimen”, “existencialismo”, “redencion”],
desc: “Tres hermanos enfrentan el parricidio, la fe, la razón y la lujuria en la obra cumbre de Dostoievski.”,
cover: “brothers”,
},
];

// Minimalist SVG covers
const CoverArt = ({ type, isRead }) => {
const bg = isRead ? “#1a1a2e” : “#0f0f1a”;
const fg = isRead ? “#d4a853” : “#8a7340”;
const accent = isRead ? “#e8c46a” : “#a08850”;

const covers = {
letter: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Envelope */}
<rect x="55" y="100" width="90" height="60" fill="none" stroke={fg} strokeWidth="1.5" />
<polyline points="55,100 100,135 145,100" fill="none" stroke={fg} strokeWidth="1.5" />
{/* Quill */}
<line x1="100" y1="80" x2="100" y2="55" stroke={accent} strokeWidth="1" />
<path d="M95,58 L100,45 L105,58" fill="none" stroke={accent} strokeWidth="1" />
{/* Lines */}
<line x1="70" y1="180" x2="130" y2="180" stroke={fg} strokeWidth="0.5" opacity="0.4" />
<line x1="75" y1="190" x2="125" y2="190" stroke={fg} strokeWidth="0.5" opacity="0.3" />
<line x1="80" y1="200" x2="120" y2="200" stroke={fg} strokeWidth="0.5" opacity="0.2" />
</svg>
),
double: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Two overlapping silhouettes */}
<circle cx="90" cy="110" r="18" fill="none" stroke={fg} strokeWidth="1.5" />
<line x1="90" y1="128" x2="90" y2="175" stroke={fg} strokeWidth="1.5" />
<line x1="90" y1="145" x2="70" y2="160" stroke={fg} strokeWidth="1.5" />
<line x1="90" y1="145" x2="110" y2="160" stroke={fg} strokeWidth="1.5" />
<circle cx="110" cy="110" r="18" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="3,3" />
<line x1="110" y1="128" x2="110" y2="175" stroke={accent} strokeWidth="1.5" strokeDasharray="3,3" />
<line x1="110" y1="145" x2="90" y2="160" stroke={accent} strokeWidth="1.5" strokeDasharray="3,3" />
<line x1="110" y1="145" x2="130" y2="160" stroke={accent} strokeWidth="1.5" strokeDasharray="3,3" />
</svg>
),
moon: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Crescent moon */}
<circle cx="100" cy="100" r="30" fill="none" stroke={accent} strokeWidth="1.5" />
<circle cx="112" cy="92" r="25" fill={bg} stroke="none" />
{/* Bridge */}
<path d="M40,190 Q70,160 100,190 Q130,160 160,190" fill="none" stroke={fg} strokeWidth="1.5" />
{/* Water reflection */}
<line x1="60" y1="205" x2="80" y2="205" stroke={fg} strokeWidth="0.5" opacity="0.3" />
<line x1="90" y1="210" x2="120" y2="210" stroke={fg} strokeWidth="0.5" opacity="0.2" />
<line x1="70" y1="215" x2="100" y2="215" stroke={fg} strokeWidth="0.5" opacity="0.15" />
</svg>
),
broken: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Broken figure */}
<circle cx="100" cy="90" r="15" fill="none" stroke={fg} strokeWidth="1.5" />
<line x1="100" y1="105" x2="100" y2="155" stroke={fg} strokeWidth="1.5" />
<line x1="100" y1="120" x2="75" y2="140" stroke={fg} strokeWidth="1.5" />
<line x1="100" y1="120" x2="125" y2="140" stroke={fg} strokeWidth="1.5" />
{/* Crack/break */}
<path d="M95,155 L90,175 L100,170 L95,195" stroke={accent} strokeWidth="1.5" fill="none" />
<path d="M105,155 L110,175 L100,170 L105,195" stroke={accent} strokeWidth="1.5" fill="none" />
</svg>
),
stairs: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Descending stairs */}
<path d="M50,80 L50,105 L75,105 L75,130 L100,130 L100,155 L125,155 L125,180 L150,180 L150,205" fill="none" stroke={fg} strokeWidth="1.5" />
{/* Figure at bottom */}
<circle cx="150" cy="215" r="5" fill={accent} opacity="0.6" />
{/* Darkness gradient lines */}
<line x1="40" y1="220" x2="160" y2="220" stroke={fg} strokeWidth="0.3" opacity="0.2" />
<line x1="35" y1="230" x2="165" y2="230" stroke={fg} strokeWidth="0.3" opacity="0.15" />
<line x1="30" y1="240" x2="170" y2="240" stroke={fg} strokeWidth="0.3" opacity="0.1" />
</svg>
),
axe: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Axe */}
<line x1="100" y1="70" x2="100" y2="200" stroke={fg} strokeWidth="2" />
<path d="M70,85 Q65,110 80,120 L100,100 L100,80 Z" fill="none" stroke={accent} strokeWidth="1.5" />
{/* Blood drop */}
<path d="M85,135 Q83,145 85,148 Q87,145 85,135" fill={accent} opacity="0.5" />
</svg>
),
roulette: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Roulette wheel */}
<circle cx="100" cy="130" r="45" fill="none" stroke={fg} strokeWidth="1.5" />
<circle cx="100" cy="130" r="35" fill="none" stroke={fg} strokeWidth="0.5" />
<circle cx="100" cy="130" r="5" fill={accent} />
{[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
<line key={i} x1={100 + 35 * Math.cos((a * Math.PI) / 180)} y1={130 + 35 * Math.sin((a * Math.PI) / 180)} x2={100 + 45 * Math.cos((a * Math.PI) / 180)} y2={130 + 45 * Math.sin((a * Math.PI) / 180)} stroke={fg} strokeWidth=“0.8” />
))}
{/* Ball */}
<circle cx={100 + 40 * Math.cos(0.8)} cy={130 + 40 * Math.sin(0.8)} r=“3” fill={accent} />
</svg>
),
halo: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Figure with halo */}
<ellipse cx="100" cy="80" rx="20" ry="6" fill="none" stroke={accent} strokeWidth="1.5" />
<circle cx="100" cy="100" r="16" fill="none" stroke={fg} strokeWidth="1.5" />
<line x1="100" y1="116" x2="100" y2="175" stroke={fg} strokeWidth="1.5" />
<line x1="100" y1="135" x2="75" y2="160" stroke={fg} strokeWidth="1.5" />
<line x1="100" y1="135" x2="125" y2="160" stroke={fg} strokeWidth="1.5" />
{/* Radiating light */}
{[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
<line key={i} x1={100 + 25 * Math.cos((a * Math.PI) / 180)} y1={80 + 10 * Math.sin((a * Math.PI) / 180)} x2={100 + 32 * Math.cos((a * Math.PI) / 180)} y2={80 + 13 * Math.sin((a * Math.PI) / 180)} stroke={accent} strokeWidth=“0.5” opacity=“0.4” />
))}
</svg>
),
ring: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Wedding ring */}
<ellipse cx="100" cy="130" rx="30" ry="40" fill="none" stroke={fg} strokeWidth="2" />
<ellipse cx="100" cy="100" rx="8" ry="4" fill="none" stroke={accent} strokeWidth="1.5" />
{/* Crack through ring */}
<path d="M85,110 L90,130 L82,150 L88,170" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6" />
</svg>
),
flame: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Flames */}
<path d="M100,70 Q85,100 90,130 Q95,110 100,120 Q105,110 110,130 Q115,100 100,70" fill="none" stroke={accent} strokeWidth="1.5" />
<path d="M80,90 Q70,120 80,150 Q90,130 80,90" fill="none" stroke={fg} strokeWidth="1" opacity="0.6" />
<path d="M120,90 Q130,120 120,150 Q110,130 120,90" fill="none" stroke={fg} strokeWidth="1" opacity="0.6" />
{/* City silhouette burning */}
<path d="M40,200 L40,180 L55,180 L55,170 L65,170 L65,185 L80,185 L80,165 L85,155 L90,165 L90,185 L110,185 L110,170 L120,170 L120,180 L135,180 L135,190 L145,190 L145,175 L155,175 L155,200" fill="none" stroke={fg} strokeWidth="1" />
</svg>
),
mirror: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Mirror frame */}
<ellipse cx="100" cy="120" rx="35" ry="50" fill="none" stroke={fg} strokeWidth="2" />
<ellipse cx="100" cy="120" rx="30" ry="45" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Reflection - young face */}
<circle cx="100" cy="110" r="8" fill="none" stroke={accent} strokeWidth="1" />
<circle cx="96" cy="108" r="1" fill={accent} opacity="0.5" />
<circle cx="104" cy="108" r="1" fill={accent} opacity="0.5" />
{/* Mirror stand */}
<line x1="100" y1="170" x2="100" y2="200" stroke={fg} strokeWidth="2" />
<line x1="80" y1="200" x2="120" y2="200" stroke={fg} strokeWidth="2" />
</svg>
),
brothers: (
<svg viewBox=“0 0 200 280” style={{ width: “100%”, height: “100%” }}>
<rect width="200" height="280" fill={bg} />
<rect x="15" y="15" width="170" height="250" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
{/* Three figures */}
{/* Dmitri - left, passionate */}
<circle cx="60" cy="100" r="12" fill="none" stroke={accent} strokeWidth="1.5" />
<line x1="60" y1="112" x2="60" y2="160" stroke={accent} strokeWidth="1.5" />
<line x1="60" y1="125" x2="45" y2="145" stroke={accent} strokeWidth="1.5" />
<line x1="60" y1="125" x2="75" y2="140" stroke={accent} strokeWidth="1.5" />
{/* Ivan - center, intellectual */}
<circle cx="100" cy="95" r="12" fill="none" stroke={fg} strokeWidth="1.5" />
<line x1="100" y1="107" x2="100" y2="160" stroke={fg} strokeWidth="1.5" />
<line x1="100" y1="120" x2="82" y2="140" stroke={fg} strokeWidth="1.5" />
<line x1="100" y1="120" x2="118" y2="140" stroke={fg} strokeWidth="1.5" />
{/* Alyosha - right, saintly */}
<circle cx="140" cy="100" r="12" fill="none" stroke={fg} strokeWidth="1.5" />
<line x1="140" y1="112" x2="140" y2="160" stroke={fg} strokeWidth="1.5" />
<line x1="140" y1="125" x2="125" y2="140" stroke={fg} strokeWidth="1.5" />
<line x1="140" y1="125" x2="155" y2="145" stroke={fg} strokeWidth="1.5" />
{/* Cross above Alyosha */}
<line x1="140" y1="78" x2="140" y2="86" stroke={accent} strokeWidth="1" opacity="0.5" />
<line x1="136" y1="81" x2="144" y2="81" stroke={accent} strokeWidth="1" opacity="0.5" />
{/* Connecting ground */}
<path d="M40,180 Q100,170 160,180" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.3" />
</svg>
),
};

return covers[type] || covers.axe;
};

// Stats bar component
const StatsBar = ({ read, total }) => {
const pct = total > 0 ? (read / total) * 100 : 0;
return (
<div style={{ width: “100%”, height: 6, background: “#1a1a2e”, borderRadius: 3, overflow: “hidden” }}>
<div
style={{
width: `${pct}%`,
height: “100%”,
background: “linear-gradient(90deg, #8a7340, #d4a853)”,
borderRadius: 3,
transition: “width 0.6s ease”,
}}
/>
</div>
);
};

export default function DostoevskyShelf() {
const [readBooks, setReadBooks] = useState(new Set());
const [activeThemes, setActiveThemes] = useState(new Set());
const [selectedBook, setSelectedBook] = useState(null);
const [loaded, setLoaded] = useState(false);
const [sortBy, setSortBy] = useState(“year”);

// Load from persistent storage
useEffect(() => {
(async () => {
try {
const result = await window.storage.get(“dostoevsky-read”);
if (result?.value) {
setReadBooks(new Set(JSON.parse(result.value)));
}
} catch (e) { /* first time */ }
setLoaded(true);
})();
}, []);

// Save to persistent storage
const saveRead = useCallback(async (newSet) => {
try {
await window.storage.set(“dostoevsky-read”, JSON.stringify([…newSet]));
} catch (e) { /* silent */ }
}, []);

const toggleRead = (id) => {
setReadBooks((prev) => {
const next = new Set(prev);
if (next.has(id)) next.delete(id);
else next.add(id);
saveRead(next);
return next;
});
};

const toggleTheme = (t) => {
setActiveThemes((prev) => {
const next = new Set(prev);
if (next.has(t)) next.delete(t);
else next.add(t);
return next;
});
};

const filtered = NOVELS.filter(
(n) => activeThemes.size === 0 || n.themes.some((t) => activeThemes.has(t))
).sort((a, b) => (sortBy === “year” ? a.year - b.year : sortBy === “pages” ? a.pages - b.pages : a.title.localeCompare(b.title)));

const totalPages = NOVELS.reduce((s, n) => s + n.pages, 0);
const readPages = NOVELS.filter((n) => readBooks.has(n.id)).reduce((s, n) => s + n.pages, 0);
const readCount = readBooks.size;
const remainPages = totalPages - readPages;

if (!loaded) return <div style={{ background: “#0a0a14”, minHeight: “100vh”, display: “flex”, alignItems: “center”, justifyContent: “center”, color: “#d4a853”, fontFamily: “‘EB Garamond’, Georgia, serif” }}>Cargando…</div>;

return (
<div style={{ background: “#0a0a14”, minHeight: “100vh”, fontFamily: “‘EB Garamond’, Georgia, serif”, color: “#c9b99a”, position: “relative” }}>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />

```
  {/* Header */}
  <div style={{ borderBottom: "1px solid #2a2a3e", padding: "28px 24px 20px", textAlign: "center" }}>
    <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: "#6a5d40", marginBottom: 8 }}>
      Biblioteca personal
    </div>
    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#d4a853", margin: "0 0 4px", lineHeight: 1.1 }}>
      Fiódor Dostoievski
    </h1>
    <div style={{ fontSize: 14, fontStyle: "italic", color: "#6a5d40" }}>
      Фёдор Михайлович Достоевский · 1821–1881
    </div>
  </div>

  {/* Stats Panel */}
  <div style={{ padding: "20px 24px", borderBottom: "1px solid #1a1a2e" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 600, margin: "0 auto" }}>
      {[
        { label: "Novelas leídas", value: `${readCount}/${NOVELS.length}` },
        { label: "Páginas leídas", value: readPages.toLocaleString() },
        { label: "Páginas restantes", value: remainPages.toLocaleString() },
        { label: "Progreso", value: `${totalPages > 0 ? Math.round((readPages / totalPages) * 100) : 0}%` },
      ].map(({ label, value }) => (
        <div key={label} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#d4a853" }}>{value}</div>
          <div style={{ fontSize: 11, color: "#6a5d40", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{label}</div>
        </div>
      ))}
    </div>
    <div style={{ maxWidth: 600, margin: "14px auto 0" }}>
      <StatsBar read={readPages} total={totalPages} />
    </div>
  </div>

  {/* Theme Filters */}
  <div style={{ padding: "16px 24px", borderBottom: "1px solid #1a1a2e" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
      <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#4a4a5e", marginRight: 4 }}>Filtrar:</span>
      {Object.entries(THEMES).map(([key, { label, color }]) => {
        const active = activeThemes.has(key);
        return (
          <button
            key={key}
            onClick={() => toggleTheme(key)}
            style={{
              padding: "4px 12px",
              fontSize: 12,
              border: `1px solid ${active ? color : "#2a2a3e"}`,
              borderRadius: 20,
              background: active ? color + "22" : "transparent",
              color: active ? color : "#5a5a6e",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
          >
            {label}
          </button>
        );
      })}
      {activeThemes.size > 0 && (
        <button
          onClick={() => setActiveThemes(new Set())}
          style={{ padding: "4px 10px", fontSize: 11, border: "none", background: "transparent", color: "#d4a853", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}
        >
          Limpiar
        </button>
      )}
    </div>
    {/* Sort */}
    <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 10 }}>
      <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#4a4a5e" }}>Ordenar:</span>
      {[
        { key: "year", label: "Año" },
        { key: "pages", label: "Páginas" },
        { key: "title", label: "Título" },
      ].map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setSortBy(key)}
          style={{
            fontSize: 12,
            border: "none",
            background: "transparent",
            color: sortBy === key ? "#d4a853" : "#5a5a6e",
            cursor: "pointer",
            fontFamily: "inherit",
            textDecoration: sortBy === key ? "underline" : "none",
            padding: "2px 4px",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  </div>

  {/* Books Grid */}
  <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 24, maxWidth: 900, margin: "0 auto" }}>
    {filtered.map((novel) => {
      const isRead = readBooks.has(novel.id);
      return (
        <div
          key={novel.id}
          style={{
            cursor: "pointer",
            transition: "transform 0.2s, opacity 0.2s",
            opacity: isRead ? 1 : 0.75,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          onClick={() => setSelectedBook(novel)}
        >
          {/* Cover */}
          <div style={{
            aspectRatio: "200/280",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: isRead ? "0 4px 20px rgba(212,168,83,0.15)" : "0 2px 10px rgba(0,0,0,0.3)",
            border: isRead ? "1px solid #3a3420" : "1px solid #1a1a2e",
            position: "relative",
          }}>
            <CoverArt type={novel.cover} isRead={isRead} />
            {/* Year badge */}
            <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: 10, color: "#6a5d40", letterSpacing: 1 }}>
              {novel.year}
            </div>
            {/* Read badge */}
            {isRead && (
              <div style={{
                position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%",
                background: "#d4a853", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: "#0a0a14", fontWeight: 700,
              }}>
                ✓
              </div>
            )}
          </div>
          {/* Title */}
          <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: isRead ? "#d4a853" : "#8a7a60", lineHeight: 1.3 }}>
            {novel.title}
          </div>
          <div style={{ fontSize: 11, color: "#4a4a5e", marginTop: 2 }}>
            {novel.pages} págs
          </div>
        </div>
      );
    })}
  </div>

  {filtered.length === 0 && (
    <div style={{ textAlign: "center", padding: 60, color: "#4a4a5e", fontStyle: "italic" }}>
      Ninguna novela coincide con los filtros seleccionados.
    </div>
  )}

  {/* Detail Modal */}
  {selectedBook && (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20,
        backdropFilter: "blur(4px)",
      }}
      onClick={() => setSelectedBook(null)}
    >
      <div
        style={{
          background: "#12121e", borderRadius: 12, maxWidth: 480, width: "100%", padding: 28,
          border: "1px solid #2a2a3e", maxHeight: "90vh", overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ width: 120, minWidth: 120 }}>
            <div style={{ aspectRatio: "200/280", borderRadius: 4, overflow: "hidden", border: "1px solid #2a2a3e" }}>
              <CoverArt type={selectedBook.cover} isRead={readBooks.has(selectedBook.id)} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#d4a853", margin: "0 0 4px", lineHeight: 1.2 }}>
              {selectedBook.title}
            </h2>
            <div style={{ fontSize: 13, color: "#6a5d40", fontStyle: "italic", marginBottom: 8 }}>
              {selectedBook.titleOrig} · {selectedBook.year}
            </div>
            <div style={{ fontSize: 13, color: "#8a7a60", marginBottom: 12 }}>
              {selectedBook.pages} páginas
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {selectedBook.themes.map((t) => (
                <span key={t} style={{
                  padding: "2px 10px", fontSize: 11, borderRadius: 12,
                  background: THEMES[t].color + "22", color: THEMES[t].color,
                  border: `1px solid ${THEMES[t].color}44`,
                }}>
                  {THEMES[t].label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#9a8a70", margin: "20px 0" }}>
          {selectedBook.desc}
        </p>

        <button
          onClick={() => toggleRead(selectedBook.id)}
          style={{
            width: "100%", padding: "12px", fontSize: 14, fontWeight: 600, fontFamily: "inherit",
            border: readBooks.has(selectedBook.id) ? "1px solid #3a3420" : "1px solid #d4a853",
            borderRadius: 8, cursor: "pointer", transition: "all 0.2s",
            background: readBooks.has(selectedBook.id) ? "transparent" : "#d4a853",
            color: readBooks.has(selectedBook.id) ? "#6a5d40" : "#0a0a14",
          }}
        >
          {readBooks.has(selectedBook.id) ? "✓ Leído — Desmarcar" : "Marcar como leído"}
        </button>

        <button
          onClick={() => setSelectedBook(null)}
          style={{
            width: "100%", padding: "10px", fontSize: 13, fontFamily: "inherit",
            border: "none", background: "transparent", color: "#4a4a5e",
            cursor: "pointer", marginTop: 8,
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  )}
</div>
```

);
}