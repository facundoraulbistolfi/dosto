import { memo, useState } from "react";
import { COLORS, alpha } from "../theme.js";
import { CONTEXT_EVENTS, LIFE_EVENTS } from "../data/timeline.js";

const UI_FONT = "'Manrope', 'Avenir Next', 'Segoe UI', sans-serif";

const CATEGORY_META = {
  work: { label: "Obras", color: COLORS.goldAccent, dim: COLORS.goldDim },
  life: { label: "Vida", color: "#89a5c8", dim: "#5f7696" },
  context: { label: "Rusia/contexto", color: "#ae707b", dim: "#7c4b56" },
};

const STATUS_LABELS = {
  terminado: "Terminado",
  "en-progreso": "En progreso",
  "no-leido": "No leído",
};

const TYPE_LABELS = {
  novela: "Novela",
  "novela-corta": "Novela corta",
  cuento: "Cuento",
};

const WORK_SHORT_LABELS = {
  "Pobres gentes": "Pobres gentes",
  "El doble": "El doble",
  "El señor Projarchin": "Projarchin",
  "Novela en nueve cartas": "Nueve cartas",
  "La patrona": "La patrona",
  "Noches blancas": "Noches blancas",
  "La mujer de otro y el marido debajo de la cama": "Marido debajo",
  "Un corazón débil": "Corazón débil",
  Polzunkov: "Polzunkov",
  "Un ladrón honrado": "Ladrón honrado",
  "El árbol de Navidad y la boda": "Navidad y boda",
  "Nétochka Nezvánova": "Nétochka",
  "Un pequeño héroe": "Pequeño héroe",
  "El sueño del tío": "Sueño del tío",
  "La aldea de Stepánchikovo": "Stepánchikovo",
  "Humillados y ofendidos": "Humillados",
  "Memorias de la casa muerta": "Casa muerta",
  "Una historia desagradable": "Historia desagrad.",
  "Memorias del subsuelo": "Subsuelo",
  "El cocodrilo": "Cocodrilo",
  "Crimen y castigo": "Crimen",
  "El jugador": "El jugador",
  "El idiota": "El idiota",
  "El eterno marido": "Eterno marido",
  "Los demonios": "Demonios",
  Bobok: "Bobok",
  "El adolescente": "Adolescente",
  "El niño en el árbol de Navidad de Cristo": "Niño de Navidad",
  "El mujik Maréi": "Mujik Maréi",
  "Una criatura dócil": "Criatura dócil",
  "El sueño de un hombre ridículo": "Hombre ridículo",
  "Los hermanos Karamázov": "Karamázov",
};

const WORK_STACK_OFFSETS = [-26, 26, -52, 52, -78, 78, -104, 104];
const TICK_YEARS = [1821, 1830, 1840, 1850, 1860, 1870, 1880];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatYearRange(year, endYear) {
  return endYear ? `${year}–${endYear}` : `${year}`;
}

function truncate(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

function assignRows(items, yearToX, rowCount, minGap) {
  const lastXs = Array(rowCount).fill(-Infinity);
  const rows = {};

  [...items]
    .sort((a, b) => a.year - b.year || (a.endYear || a.year) - (b.endYear || b.year))
    .forEach((item) => {
      const x = yearToX(item.year);
      let row = lastXs.findIndex((lastX) => x - lastX >= minGap);

      if (row === -1) {
        row = lastXs.indexOf(Math.min(...lastXs));
      }

      rows[item.id] = row;
      lastXs[row] = x;
    });

  return rows;
}

function getWorkStatus(bookStates, id) {
  return bookStates[id]?.status || "no-leido";
}

function getWorkVisual(status) {
  if (status === "terminado") {
    return {
      fill: CATEGORY_META.work.color,
      stroke: CATEGORY_META.work.color,
      halo: alpha(CATEGORY_META.work.color, 0.18),
      centerDot: null,
      opacity: 1,
      labelColor: COLORS.textBook,
    };
  }

  if (status === "en-progreso") {
    return {
      fill: alpha(CATEGORY_META.work.color, 0.16),
      stroke: CATEGORY_META.work.color,
      halo: alpha(COLORS.inProgress, 0.18),
      centerDot: COLORS.inProgress,
      opacity: 1,
      labelColor: COLORS.textSecondary,
    };
  }

  return {
    fill: COLORS.bgModal,
    stroke: alpha(CATEGORY_META.work.color, 0.74),
    halo: null,
    centerDot: null,
    opacity: 0.88,
    labelColor: COLORS.textMuted,
  };
}

function CategoryDot({ color }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 0 1px ${alpha(color, 0.35)}`,
        flex: "0 0 auto",
      }}
    />
  );
}

function LegendGroup({ title, children }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        minWidth: 220,
      }}
    >
      <div
        style={{
          fontFamily: UI_FONT,
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: COLORS.textMuted,
        }}
      >
        {title}
      </div>
      <div style={{ display: "grid", gap: 6 }}>{children}</div>
    </div>
  );
}

function LegendRow({ icon, label, tone = COLORS.textSecondary }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, color: tone, fontSize: 13 }}>
      <span style={{ width: 18, display: "inline-flex", justifyContent: "center" }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function TypePreview({ type }) {
  const stroke = CATEGORY_META.work.color;
  const fill = alpha(CATEGORY_META.work.color, 0.18);

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {type === "novela" && (
        <>
          <rect x="4" y="2" width="8" height="12" rx="1.2" fill={fill} stroke={stroke} strokeWidth="1.1" />
          <line x1="6.3" y1="4" x2="6.3" y2="12" stroke={alpha(COLORS.bgMain, 0.5)} strokeWidth="0.7" />
        </>
      )}
      {type === "novela-corta" && (
        <>
          <path d="M4 2.5H9.5L12 5v8.5H4Z" fill={fill} stroke={stroke} strokeWidth="1.1" />
          <path d="M9.5 2.5V5H12" fill="none" stroke={stroke} strokeWidth="0.9" />
        </>
      )}
      {type === "cuento" && (
        <circle cx="8" cy="8" r="4.2" fill={fill} stroke={stroke} strokeWidth="1.1" />
      )}
    </svg>
  );
}

function StatusPreview({ status }) {
  const style = getWorkVisual(status);

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="5" fill={style.fill} stroke={style.stroke} strokeWidth="1.1" />
      {style.centerDot && <circle cx="8" cy="8" r="1.8" fill={style.centerDot} />}
    </svg>
  );
}

function EventTooltip({ x, y, width, title, subtitle, accent }) {
  const tooltipWidth = 228;
  const tooltipHeight = 42;
  const tooltipX = clamp(x - tooltipWidth / 2, 16, width - tooltipWidth - 16);
  const tooltipY = clamp(y, 12, 348 - tooltipHeight - 12);

  return (
    <g pointerEvents="none">
      <rect
        x={tooltipX}
        y={tooltipY}
        width={tooltipWidth}
        height={tooltipHeight}
        rx="10"
        fill={alpha(COLORS.bgMain, 0.96)}
        stroke={alpha(accent, 0.56)}
        strokeWidth="0.8"
      />
      <text
        x={tooltipX + 12}
        y={tooltipY + 16}
        fill={COLORS.textBook}
        fontSize="10.5"
        fontFamily="EB Garamond, serif"
        fontWeight="600"
      >
        {truncate(title, 38)}
      </text>
      <text
        x={tooltipX + 12}
        y={tooltipY + 30}
        fill={COLORS.textSecondary}
        fontSize="8.5"
        fontFamily={UI_FONT}
      >
        {truncate(subtitle, 54)}
      </text>
    </g>
  );
}

function WorkMarker({ type, x, y, visual, active = false }) {
  const stroke = active ? COLORS.textBook : visual.stroke;
  const strokeWidth = active ? 1.6 : 1.15;

  return (
    <g opacity={visual.opacity}>
      {visual.halo && <circle cx={x} cy={y} r="8.6" fill={visual.halo} />}

      {type === "novela" && (
        <>
          <rect
            x={x - 5}
            y={y - 7}
            width="10"
            height="14"
            rx="1.5"
            fill={visual.fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <line x1={x - 1.4} y1={y - 5} x2={x - 1.4} y2={y + 5} stroke={alpha(COLORS.bgMain, 0.42)} strokeWidth="0.75" />
        </>
      )}

      {type === "novela-corta" && (
        <>
          <path
            d={`M${x - 5} ${y - 7}H${x + 1.5}L${x + 5} ${y - 3.5}V${y + 7}H${x - 5}Z`}
            fill={visual.fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <path
            d={`M${x + 1.5} ${y - 7}V${y - 3.5}H${x + 5}`}
            fill="none"
            stroke={alpha(COLORS.bgMain, 0.48)}
            strokeWidth="0.75"
          />
        </>
      )}

      {type === "cuento" && (
        <circle cx={x} cy={y} r="5" fill={visual.fill} stroke={stroke} strokeWidth={strokeWidth} />
      )}

      {visual.centerDot && <circle cx={x} cy={y} r="1.7" fill={visual.centerDot} />}
    </g>
  );
}

function Timeline({ novels, bookStates, onSelectBook, onSelectEvent }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [visible, setVisible] = useState({
    work: true,
    life: true,
    context: true,
  });

  const minYear = 1821;
  const maxYear = 1882;
  const width = 1320;
  const height = 348;
  const padX = 88;
  const contextBandY = 28;
  const contextBandH = 92;
  const contextAnchorY = 100;
  const axisY = 176;
  const lifeBandY = 214;
  const lifeBandH = 112;
  const lifeAnchorY = 244;

  const yearToX = (year) => padX + ((year - minYear) / (maxYear - minYear)) * (width - padX * 2);

  const contextPointRows = assignRows(
    CONTEXT_EVENTS.filter((event) => event.kind === "point"),
    yearToX,
    3,
    92,
  );
  const lifePointRows = assignRows(
    LIFE_EVENTS.filter((event) => event.kind === "point"),
    yearToX,
    3,
    88,
  );

  const sortedWorks = [...novels].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
  const yearGroups = {};
  sortedWorks.forEach((novel) => {
    if (!yearGroups[novel.year]) yearGroups[novel.year] = [];
    yearGroups[novel.year].push(novel);
  });

  const hasVisibleCategory = visible.work || visible.life || visible.context;
  const allSelected = visible.work && visible.life && visible.context;

  const toggleCategory = (key) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEventActivate = (event) => {
    onSelectEvent?.(event);
  };

  const getEventInteractionProps = (event) => ({
    role: "button",
    tabIndex: 0,
    "aria-label": `${event.label}. ${formatYearRange(event.year, event.endYear)}.`,
    onClick: () => handleEventActivate(event),
    onKeyDown: (interactionEvent) => {
      if (interactionEvent.key === "Enter" || interactionEvent.key === " ") {
        interactionEvent.preventDefault();
        handleEventActivate(event);
      }
    },
    onFocus: () => setHoveredId(event.id),
    onBlur: () => setHoveredId((current) => (current === event.id ? null : current)),
  });

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 14,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          role="toolbar"
          aria-label="Filtrar capas de la cronología"
          style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}
        >
          <button
            type="button"
            aria-pressed={allSelected}
            onClick={() => setVisible({ work: true, life: true, context: true })}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: `1px solid ${allSelected ? alpha(COLORS.goldDim, 0.72) : alpha(COLORS.border, 0.92)}`,
              background: allSelected ? alpha(COLORS.gold, 0.14) : "transparent",
              color: allSelected ? COLORS.goldAccent : COLORS.textSecondary,
              fontSize: 12,
              fontFamily: UI_FONT,
              cursor: "pointer",
            }}
          >
            Todos
          </button>

          {[
            { key: "work", label: `Obras (${novels.length})`, color: CATEGORY_META.work.color },
            { key: "life", label: `Vida (${LIFE_EVENTS.length})`, color: CATEGORY_META.life.color },
            { key: "context", label: `Rusia/contexto (${CONTEXT_EVENTS.length})`, color: CATEGORY_META.context.color },
          ].map(({ key, label, color }) => {
            const active = visible[key];
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => toggleCategory(key)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: `1px solid ${active ? alpha(color, 0.72) : alpha(COLORS.border, 0.92)}`,
                  background: active ? alpha(color, 0.16) : "transparent",
                  color: active ? color : COLORS.textSecondary,
                  fontSize: 12,
                  fontFamily: UI_FONT,
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: 12, color: COLORS.textSecondary, fontFamily: UI_FONT }}>
          Color por categoría; hacé hover para vista rápida y clic en vida/contexto para abrir el análisis.
        </div>
      </div>

      <div
        style={{
          overflowX: "auto",
          paddingBottom: 8,
          borderRadius: 18,
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: `${width}px`, height: "auto", display: "block" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width={width} height={height} fill={alpha(COLORS.bgCard, 0.96)} rx="18" />
          <rect x="0.5" y="0.5" width={width - 1} height={height - 1} fill="none" stroke={alpha(COLORS.border, 0.95)} rx="18" />

          <rect
            x={padX - 18}
            y={contextBandY}
            width={width - (padX - 18) * 2}
            height={contextBandH}
            rx="16"
            fill={alpha(CATEGORY_META.context.color, visible.context ? 0.09 : 0.035)}
            stroke={alpha(CATEGORY_META.context.color, visible.context ? 0.22 : 0.08)}
            strokeWidth="0.8"
          />
          <rect
            x={padX - 18}
            y={lifeBandY}
            width={width - (padX - 18) * 2}
            height={lifeBandH}
            rx="16"
            fill={alpha(CATEGORY_META.life.color, visible.life ? 0.085 : 0.03)}
            stroke={alpha(CATEGORY_META.life.color, visible.life ? 0.2 : 0.08)}
            strokeWidth="0.8"
          />

          <text x="24" y="26" fill={visible.context ? CATEGORY_META.context.color : COLORS.textMuted} fontSize="10" fontFamily={UI_FONT} letterSpacing="1.8">
            RUSIA / CONTEXTO
          </text>
          <text x="24" y={axisY - 20} fill={visible.work ? CATEGORY_META.work.color : COLORS.textMuted} fontSize="10" fontFamily={UI_FONT} letterSpacing="1.8">
            OBRAS
          </text>
          <text x="24" y={lifeBandY + 14} fill={visible.life ? CATEGORY_META.life.color : COLORS.textMuted} fontSize="10" fontFamily={UI_FONT} letterSpacing="1.8">
            VIDA DE DOSTOIEVSKI
          </text>

          {TICK_YEARS.map((year) => {
            const x = yearToX(year);
            return (
              <g key={year}>
                <line
                  x1={x}
                  y1={contextBandY}
                  x2={x}
                  y2={lifeBandY + lifeBandH}
                  stroke={alpha(COLORS.border, 0.5)}
                  strokeWidth="0.8"
                />
                <line x1={x} y1={axisY - 5} x2={x} y2={axisY + 5} stroke={COLORS.textMuted} strokeWidth="1" />
                <text
                  x={x}
                  y={axisY + 22}
                  textAnchor="middle"
                  fill={COLORS.textMuted}
                  fontSize="9"
                  fontFamily={UI_FONT}
                >
                  {year}
                </text>
              </g>
            );
          })}

          <line
            x1={padX}
            y1={axisY}
            x2={width - padX}
            y2={axisY}
            stroke={alpha(COLORS.border, 0.96)}
            strokeWidth="1.8"
          />

          {visible.context &&
            CONTEXT_EVENTS.filter((event) => event.kind === "range").map((event) => {
              const x1 = yearToX(event.year);
              const x2 = yearToX(event.endYear);
              const y = 48 + event.row * 20;
              const isHovered = hoveredId === event.id;
              const labelX = (x1 + x2) / 2;

              return (
                <g
                  key={event.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  {...getEventInteractionProps(event)}
                >
                  <rect
                    x={x1}
                    y={y}
                    width={x2 - x1}
                    height="14"
                    rx="7"
                    fill={alpha(CATEGORY_META.context.color, 0.18)}
                    stroke={alpha(CATEGORY_META.context.color, isHovered ? 0.72 : 0.42)}
                    strokeWidth={isHovered ? "1" : "0.8"}
                  />
                  <text
                    x={labelX}
                    y={y - 6}
                    textAnchor="middle"
                    fill={CATEGORY_META.context.color}
                    fontSize="8.2"
                    fontFamily={UI_FONT}
                  >
                    {event.shortLabel}
                  </text>
                  {isHovered && (
                    <EventTooltip
                      x={labelX}
                      y={contextBandY + 4}
                      width={width}
                      title={event.label}
                      subtitle={`${formatYearRange(event.year, event.endYear)} · ${event.detail}`}
                      accent={CATEGORY_META.context.color}
                    />
                  )}
                </g>
              );
            })}

          {visible.context &&
            CONTEXT_EVENTS.filter((event) => event.kind === "point").map((event) => {
              const x = yearToX(event.year);
              const row = contextPointRows[event.id] || 0;
              const labelY = 86 - row * 18;
              const isHovered = hoveredId === event.id;

              return (
                <g
                  key={event.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  {...getEventInteractionProps(event)}
                >
                  <line x1={x} y1={contextAnchorY} x2={x} y2={labelY + 6} stroke={alpha(CATEGORY_META.context.color, 0.42)} strokeWidth="0.9" />
                  <polygon
                    points={`${x},${contextAnchorY - 6} ${x + 6},${contextAnchorY} ${x},${contextAnchorY + 6} ${x - 6},${contextAnchorY}`}
                    fill={alpha(CATEGORY_META.context.color, 0.16)}
                    stroke={isHovered ? COLORS.textBook : CATEGORY_META.context.color}
                    strokeWidth={isHovered ? "1.5" : "1.05"}
                  />
                  <text
                    x={x}
                    y={labelY}
                    textAnchor="middle"
                    fill={CATEGORY_META.context.color}
                    fontSize="8.3"
                    fontFamily="EB Garamond, serif"
                  >
                    {truncate(event.shortLabel, 16)}
                  </text>
                  {isHovered && (
                    <EventTooltip
                      x={x}
                      y={labelY - 46}
                      width={width}
                      title={event.label}
                      subtitle={`${event.year} · ${event.detail}`}
                      accent={CATEGORY_META.context.color}
                    />
                  )}
                </g>
              );
            })}

          {visible.work &&
            sortedWorks.map((novel) => {
              const group = yearGroups[novel.year];
              const indexInGroup = group.findIndex((item) => item.id === novel.id);
              const offset = WORK_STACK_OFFSETS[indexInGroup] ?? ((indexInGroup + 1) * 26);
              const x = yearToX(novel.year);
              const y = axisY + offset;
              const status = getWorkStatus(bookStates, novel.id);
              const visual = getWorkVisual(status);
              const isHovered = hoveredId === novel.id;
              const shortLabel = WORK_SHORT_LABELS[novel.title] || truncate(novel.title, 14);
              const labelY = offset < 0 ? y - 10 : y + 17;

              return (
                <g
                  key={novel.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredId(novel.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectBook(novel)}
                >
                  <line x1={x} y1={axisY} x2={x} y2={y} stroke={alpha(CATEGORY_META.work.color, 0.34)} strokeWidth="0.8" />
                  <WorkMarker type={novel.type} x={x} y={y} visual={visual} active={isHovered} />
                  <text
                    x={x}
                    y={labelY}
                    textAnchor="middle"
                    fill={visual.labelColor}
                    fontSize="7.8"
                    fontFamily="EB Garamond, serif"
                  >
                    {truncate(shortLabel, 16)}
                  </text>
                  {isHovered && (
                    <EventTooltip
                      x={x}
                      y={offset < 0 ? y - 62 : y + 18}
                      width={width}
                      title={novel.title}
                      subtitle={`${novel.year} · ${TYPE_LABELS[novel.type]} · ${STATUS_LABELS[status]}`}
                      accent={CATEGORY_META.work.color}
                    />
                  )}
                </g>
              );
            })}

          {visible.life &&
            LIFE_EVENTS.filter((event) => event.kind === "range").map((event) => {
              const x1 = yearToX(event.year);
              const x2 = yearToX(event.endYear);
              const y = 262 + event.row * 20;
              const isHovered = hoveredId === event.id;
              const labelX = (x1 + x2) / 2;

              return (
                <g
                  key={event.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  {...getEventInteractionProps(event)}
                >
                  <rect
                    x={x1}
                    y={y}
                    width={x2 - x1}
                    height="14"
                    rx="7"
                    fill={alpha(CATEGORY_META.life.color, 0.18)}
                    stroke={alpha(CATEGORY_META.life.color, isHovered ? 0.72 : 0.42)}
                    strokeWidth={isHovered ? "1" : "0.8"}
                  />
                  <text
                    x={labelX}
                    y={y + 28}
                    textAnchor="middle"
                    fill={CATEGORY_META.life.color}
                    fontSize="8.2"
                    fontFamily={UI_FONT}
                  >
                    {event.shortLabel}
                  </text>
                  {isHovered && (
                    <EventTooltip
                      x={labelX}
                      y={y - 52}
                      width={width}
                      title={event.label}
                      subtitle={`${formatYearRange(event.year, event.endYear)} · ${event.detail}`}
                      accent={CATEGORY_META.life.color}
                    />
                  )}
                </g>
              );
            })}

          {visible.life &&
            LIFE_EVENTS.filter((event) => event.kind === "point").map((event) => {
              const x = yearToX(event.year);
              const row = lifePointRows[event.id] || 0;
              const labelY = 284 + row * 18;
              const isHovered = hoveredId === event.id;

              return (
                <g
                  key={event.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredId(event.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  {...getEventInteractionProps(event)}
                >
                  <line x1={x} y1={lifeAnchorY} x2={x} y2={labelY - 10} stroke={alpha(CATEGORY_META.life.color, 0.42)} strokeWidth="0.9" />
                  <circle
                    cx={x}
                    cy={lifeAnchorY}
                    r="5"
                    fill={alpha(CATEGORY_META.life.color, 0.18)}
                    stroke={isHovered ? COLORS.textBook : CATEGORY_META.life.color}
                    strokeWidth={isHovered ? "1.5" : "1.05"}
                  />
                  <text
                    x={x}
                    y={labelY}
                    textAnchor="middle"
                    fill={CATEGORY_META.life.color}
                    fontSize="8.3"
                    fontFamily="EB Garamond, serif"
                  >
                    {truncate(event.shortLabel, 16)}
                  </text>
                  {isHovered && (
                    <EventTooltip
                      x={x}
                      y={labelY - 56}
                      width={width}
                      title={event.label}
                      subtitle={`${event.year} · ${event.detail}`}
                      accent={CATEGORY_META.life.color}
                    />
                  )}
                </g>
              );
            })}

          {!hasVisibleCategory && (
            <g>
              <rect
                x={padX + 20}
                y={axisY - 24}
                width={width - padX * 2 - 40}
                height="48"
                rx="16"
                fill={alpha(COLORS.bgMain, 0.72)}
                stroke={alpha(COLORS.border, 0.85)}
              />
              <text
                x={width / 2}
                y={axisY - 2}
                textAnchor="middle"
                fill={COLORS.textSecondary}
                fontSize="12"
                fontFamily={UI_FONT}
              >
                Activá al menos una capa para ver la cronología.
              </text>
            </g>
          )}
        </svg>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
          padding: "2px 4px 0",
        }}
      >
        <LegendGroup title="Categoría">
          <LegendRow icon={<CategoryDot color={CATEGORY_META.work.color} />} label="Obras publicadas" tone={COLORS.textSecondary} />
          <LegendRow icon={<CategoryDot color={CATEGORY_META.life.color} />} label="Vida de Dostoievski" tone={COLORS.textSecondary} />
          <LegendRow icon={<CategoryDot color={CATEGORY_META.context.color} />} label="Rusia y contexto" tone={COLORS.textSecondary} />
        </LegendGroup>

        <LegendGroup title="Tipo de obra">
          <LegendRow icon={<TypePreview type="novela" />} label="Novela" />
          <LegendRow icon={<TypePreview type="novela-corta" />} label="Novela corta" />
          <LegendRow icon={<TypePreview type="cuento" />} label="Cuento" />
        </LegendGroup>

        <LegendGroup title="Estado de lectura">
          <LegendRow icon={<StatusPreview status="terminado" />} label="Terminado: marcador lleno y luminoso" />
          <LegendRow icon={<StatusPreview status="en-progreso" />} label="En progreso: dot verde interno" />
          <LegendRow icon={<StatusPreview status="no-leido" />} label="No leído: marcador en outline" />
        </LegendGroup>
      </div>
    </div>
  );
}

export default memo(Timeline);
