import { memo, useState } from "react";
import { COLORS } from "../theme.js";

const LIFE_EVENTS = [
  { year: 1849, label: "Arresto" },
  { year: 1850, label: "Exilio en Siberia", endYear: 1859 },
  { year: 1881, label: "Muerte" },
];

function Timeline({ novels, bookStates, onSelectBook }) {
  const [hovered, setHovered] = useState(null);

  const minYear = 1844;
  const maxYear = 1883;
  const W = 700;
  const H = 160;
  const padX = 40;
  const lineY = 80;

  const yearToX = (year) => padX + ((year - minYear) / (maxYear - minYear)) * (W - padX * 2);

  // Group novels by year to offset vertically
  const yearGroups = {};
  novels.forEach((n) => {
    if (!yearGroups[n.year]) yearGroups[n.year] = [];
    yearGroups[n.year].push(n);
  });

  const getStatus = (id) => bookStates[id]?.status || "no-leido";
  const getColor = (id) => {
    const s = getStatus(id);
    return s === "terminado" ? COLORS.gold : s === "en-progreso" ? COLORS.inProgress : COLORS.textMuted;
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width={W} height={H} fill={COLORS.bgCard} rx={8} />

      {/* Life events */}
      {LIFE_EVENTS.map((evt) => {
        if (evt.endYear) {
          const x1 = yearToX(evt.year);
          const x2 = yearToX(evt.endYear);
          return (
            <g key={evt.label}>
              <rect x={x1} y={lineY - 18} width={x2 - x1} height={36} fill={COLORS.border} opacity={0.4} rx={4} />
              <text
                x={(x1 + x2) / 2} y={lineY + 30}
                textAnchor="middle" fill={COLORS.textMuted} fontSize={8}
                fontFamily="EB Garamond, serif" fontStyle="italic"
              >
                {evt.label}
              </text>
            </g>
          );
        }
        const x = yearToX(evt.year);
        return (
          <g key={evt.label}>
            <line x1={x} y1={lineY - 14} x2={x} y2={lineY + 14} stroke={COLORS.textMuted} strokeWidth={1} strokeDasharray="3 2" />
            <text
              x={x} y={lineY + 28}
              textAnchor="middle" fill={COLORS.textMuted} fontSize={8}
              fontFamily="EB Garamond, serif" fontStyle="italic"
            >
              {evt.label} ({evt.year})
            </text>
          </g>
        );
      })}

      {/* Main timeline line */}
      <line x1={padX} y1={lineY} x2={W - padX} y2={lineY} stroke={COLORS.border} strokeWidth={1.5} />

      {/* Decade ticks */}
      {[1850, 1860, 1870, 1880].map((yr) => (
        <g key={yr}>
          <line x1={yearToX(yr)} y1={lineY - 4} x2={yearToX(yr)} y2={lineY + 4} stroke={COLORS.textMuted} strokeWidth={1} />
          <text
            x={yearToX(yr)} y={lineY + 16}
            textAnchor="middle" fill={COLORS.textMuted} fontSize={9}
            fontFamily="EB Garamond, serif"
          >
            {yr}
          </text>
        </g>
      ))}

      {/* Novel dots */}
      {novels.map((novel) => {
        const group = yearGroups[novel.year];
        const indexInGroup = group.indexOf(novel);
        const offset = (indexInGroup - (group.length - 1) / 2) * 16;
        const cx = yearToX(novel.year);
        const cy = lineY + offset - (group.length > 1 ? 0 : 0);
        const yOffset = group.length > 1 ? offset : 0;
        const dotY = lineY + yOffset;
        const color = getColor(novel.id);
        const isHovered = hovered === novel.id;
        const r = isHovered ? 7 : 5;

        return (
          <g
            key={novel.id}
            style={{ cursor: "pointer", transition: "opacity 0.2s" }}
            opacity={hovered === null || isHovered ? 1 : 0.4}
            onMouseEnter={() => setHovered(novel.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelectBook(novel)}
          >
            <circle cx={cx} cy={dotY} r={r} fill={color} stroke={isHovered ? COLORS.goldAccent : "none"} strokeWidth={isHovered ? 2 : 0} />
            {group.length > 1 && (
              <line x1={cx} y1={lineY} x2={cx} y2={dotY} stroke={COLORS.border} strokeWidth={0.5} />
            )}
            {isHovered && (
              <>
                <rect
                  x={cx - 50} y={dotY - 34}
                  width={100} height={20}
                  fill={COLORS.bgModal} rx={4}
                  stroke={COLORS.border} strokeWidth={0.5}
                />
                <text
                  x={cx} y={dotY - 20}
                  textAnchor="middle" fill={COLORS.gold} fontSize={10}
                  fontFamily="EB Garamond, serif" fontWeight={600}
                >
                  {novel.title} ({novel.year})
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default memo(Timeline);
