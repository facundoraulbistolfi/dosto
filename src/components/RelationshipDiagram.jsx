import { memo, useState } from "react";
import { COLORS } from "../theme.js";

const RELATION_STYLES = {
  familia: { color: "#F97316", dash: "none", width: 2, label: "Familia" },
  amor: { color: "#EC4899", dash: "none", width: 2, label: "Amor" },
  "amor-no-correspondido": { color: "#EC4899", dash: "6 3", width: 1.5, label: "Amor no correspondido" },
  rivalidad: { color: "#EF4444", dash: "4 3", width: 2, label: "Rivalidad" },
  amistad: { color: "#10B981", dash: "none", width: 1.5, label: "Amistad" },
  manipulacion: { color: "#A855F7", dash: "5 3", width: 2, label: "Manipulación" },
  investigacion: { color: "#6366F1", dash: "4 3", width: 1.5, label: "Investigación" },
  mentor: { color: "#3B82F6", dash: "none", width: 1.5, label: "Mentor" },
};

function getShortName(name) {
  if (name.startsWith("El ") || name.startsWith("La ")) return name;
  const parts = name.replace(/\(.*?\)/g, "").trim().split(" ");
  if (parts.length === 1) return parts[0];
  // For "Goliadkin Jr." keep it
  if (name.includes("Jr.")) return "Goliadkin Jr.";
  // For single-word known names, return as-is
  // Otherwise return the last "main" name (surname), skipping patronymics
  // Patronymics typically end in -ovich/-ievna/-ovna
  const nonPatronymic = parts.filter(
    (p) => !/óvich$|ovich$|ievna$|ovna$|évich$|ávlovich$/.test(p)
  );
  if (nonPatronymic.length >= 2) return nonPatronymic[nonPatronymic.length - 1];
  return parts[parts.length - 1];
}

function clampText(text, maxLen) {
  return text.length > maxLen ? text.slice(0, maxLen - 1) + "…" : text;
}

// Compute intersection of line from center of rect to target point with rect boundary
function rectEdgePoint(cx, cy, hw, hh, tx, ty) {
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const scaleX = hw / Math.abs(dx || 0.001);
  const scaleY = hh / Math.abs(dy || 0.001);
  const scale = Math.min(scaleX, scaleY);
  return { x: cx + dx * scale, y: cy + dy * scale };
}

function RelationshipDiagram({ characters, relationships }) {
  const [hovered, setHovered] = useState(null);

  const n = characters.length;
  const W = 460;
  const legendH = 44;
  const diagramH = n <= 3 ? 220 : 280;
  const H = diagramH + legendH;
  const cx = W / 2;
  const cy = diagramH / 2 + 10;
  const rx = n <= 3 ? 130 : 160;
  const ry = n <= 3 ? 70 : 100;

  // Node positions (elliptical layout)
  const nodeW = 110;
  const nodeH = 32;
  const nodes = characters.map((c, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return {
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
      name: getShortName(c.name),
      fullName: c.name,
      index: i,
    };
  });

  // Collect unique relationship types used
  const usedTypes = [...new Set(relationships.map((r) => r.type))];

  // Edge midpoint offset to avoid overlapping labels
  const edgeLabelOffsets = {};
  relationships.forEach((rel, i) => {
    const key = [Math.min(rel.from, rel.to), Math.max(rel.from, rel.to)].join("-");
    if (!edgeLabelOffsets[key]) edgeLabelOffsets[key] = 0;
    else edgeLabelOffsets[key]++;
    rel._labelOffset = edgeLabelOffsets[key];
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width={W} height={H} fill={COLORS.bgCard} rx={8} />

      {/* Edges */}
      {relationships.map((rel, i) => {
        const style = RELATION_STYLES[rel.type] || RELATION_STYLES.amistad;
        const fromNode = nodes[rel.from];
        const toNode = nodes[rel.to];
        if (!fromNode || !toNode) return null;

        const hw = nodeW / 2 + 4;
        const hh = nodeH / 2 + 4;
        const p1 = rectEdgePoint(fromNode.x, fromNode.y, hw, hh, toNode.x, toNode.y);
        const p2 = rectEdgePoint(toNode.x, toNode.y, hw, hh, fromNode.x, fromNode.y);

        // Label at midpoint with perpendicular offset for duplicates
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const perpX = -dy / len;
        const perpY = dx / len;
        const offset = rel._labelOffset * 14;
        const lx = mx + perpX * offset;
        const ly = my + perpY * offset;

        const isActive = hovered === null || hovered === rel.from || hovered === rel.to;
        const opacity = isActive ? 1 : 0.15;

        const labelText = clampText(rel.label, 22);

        return (
          <g key={i} style={{ transition: "opacity 0.2s" }} opacity={opacity}>
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={style.color}
              strokeWidth={style.width}
              strokeDasharray={style.dash}
              strokeLinecap="round"
            />
            {/* Arrow at midpoint pointing toward "to" */}
            {(() => {
              const ax = (p1.x * 0.4 + p2.x * 0.6);
              const ay = (p1.y * 0.4 + p2.y * 0.6);
              const adx = p2.x - p1.x;
              const ady = p2.y - p1.y;
              const al = Math.sqrt(adx * adx + ady * ady) || 1;
              const ux = adx / al;
              const uy = ady / al;
              const sz = 5;
              return (
                <polygon
                  points={`${ax},${ay} ${ax - ux * sz + uy * sz * 0.6},${ay - uy * sz - ux * sz * 0.6} ${ax - ux * sz - uy * sz * 0.6},${ay - uy * sz + ux * sz * 0.6}`}
                  fill={style.color}
                />
              );
            })()}
            {/* Label background + text */}
            <rect
              x={lx - labelText.length * 3.2 - 4}
              y={ly - 7}
              width={labelText.length * 6.4 + 8}
              height={14}
              fill={COLORS.bgCard}
              rx={3}
              opacity={0.9}
            />
            <text
              x={lx}
              y={ly + 3.5}
              textAnchor="middle"
              fill={style.color}
              fontSize={9}
              fontFamily="EB Garamond, serif"
              opacity={0.9}
            >
              {labelText}
            </text>
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const isActive = hovered === null || hovered === node.index;
        const opacity = isActive ? 1 : 0.3;
        const displayName = clampText(node.name, 14);

        return (
          <g
            key={node.index}
            style={{ cursor: "pointer", transition: "opacity 0.2s" }}
            opacity={opacity}
            onMouseEnter={() => setHovered(node.index)}
            onMouseLeave={() => setHovered(null)}
          >
            <rect
              x={node.x - nodeW / 2}
              y={node.y - nodeH / 2}
              width={nodeW}
              height={nodeH}
              rx={6}
              fill={COLORS.bgModal}
              stroke={hovered === node.index ? COLORS.gold : COLORS.border}
              strokeWidth={hovered === node.index ? 1.5 : 1}
            />
            <text
              x={node.x}
              y={node.y + 4.5}
              textAnchor="middle"
              fill={hovered === node.index ? COLORS.gold : COLORS.text}
              fontSize={12}
              fontFamily="EB Garamond, serif"
              fontWeight={600}
            >
              {displayName}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform={`translate(0, ${diagramH})`}>
        <line x1={16} y1={4} x2={W - 16} y2={4} stroke={COLORS.border} strokeWidth={0.5} />
        {usedTypes.map((type, i) => {
          const style = RELATION_STYLES[type];
          if (!style) return null;
          const spacing = W / (usedTypes.length + 1);
          const lx = spacing * (i + 1);
          return (
            <g key={type} transform={`translate(${lx}, 26)`}>
              <line
                x1={-18}
                y1={0}
                x2={-4}
                y2={0}
                stroke={style.color}
                strokeWidth={style.width}
                strokeDasharray={style.dash}
                strokeLinecap="round"
              />
              <text
                x={2}
                y={3.5}
                fill={style.color}
                fontSize={9}
                fontFamily="EB Garamond, serif"
              >
                {style.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default memo(RelationshipDiagram);
