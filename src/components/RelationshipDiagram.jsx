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
  protector: { color: "#22C55E", dash: "none", width: 1.5, label: "Protector" },
};

function getShortName(name) {
  if (name.startsWith("El ") || name.startsWith("La ")) return name;
  const parts = name.replace(/\(.*?\)/g, "").trim().split(" ");
  if (parts.length === 1) return parts[0];
  if (name.includes("Jr.")) return "Goliadkin Jr.";
  // Skip patronymics (end in -ovich/-ievna/-ovna variants)
  const nonPatronymic = parts.filter(
    (p) => !/óvich$|ovich$|ievna$|ovna$|évich$|ávlovich$|éievna$/.test(p)
  );
  if (nonPatronymic.length >= 2) return nonPatronymic[nonPatronymic.length - 1];
  return parts[parts.length - 1];
}

function clampText(text, maxLen) {
  return text.length > maxLen ? text.slice(0, maxLen - 1) + "…" : text;
}

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

  // Dynamic sizing based on character count
  let W, diagramH, rx, ry, nodeW, nodeH, fontSize, labelSize, nameClamp;
  if (n <= 4) {
    W = 460; diagramH = 230; rx = 130; ry = 75; nodeW = 110; nodeH = 32; fontSize = 12; labelSize = 9; nameClamp = 14;
  } else if (n <= 6) {
    W = 480; diagramH = 300; rx = 160; ry = 110; nodeW = 110; nodeH = 32; fontSize = 12; labelSize = 9; nameClamp = 14;
  } else if (n <= 8) {
    W = 540; diagramH = 370; rx = 190; ry = 140; nodeW = 100; nodeH = 28; fontSize = 11; labelSize = 8; nameClamp = 13;
  } else if (n <= 11) {
    W = 600; diagramH = 430; rx = 220; ry = 165; nodeW = 95; nodeH = 26; fontSize = 10; labelSize = 7.5; nameClamp = 12;
  } else {
    W = 640; diagramH = 480; rx = 240; ry = 185; nodeW = 90; nodeH = 25; fontSize = 9.5; labelSize = 7; nameClamp = 11;
  }

  // Legend sizing
  const usedTypes = [...new Set(relationships.map((r) => r.type))];
  const legendRows = usedTypes.length > 4 ? 2 : 1;
  const legendH = legendRows === 2 ? 64 : 44;
  const H = diagramH + legendH;
  const cxCenter = W / 2;
  const cyCenter = diagramH / 2 + 10;

  // Node positions (elliptical layout)
  const nodes = characters.map((c, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return {
      x: cxCenter + rx * Math.cos(angle),
      y: cyCenter + ry * Math.sin(angle),
      name: getShortName(c.name),
      fullName: c.name,
      index: i,
    };
  });

  // Edge midpoint offset to avoid overlapping labels
  const edgeLabelOffsets = {};
  relationships.forEach((rel) => {
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

        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const perpX = -dy / len;
        const perpY = dx / len;
        const offset = rel._labelOffset * (labelSize + 4);
        const lx = mx + perpX * offset;
        const ly = my + perpY * offset;

        const isActive = hovered === null || hovered === rel.from || hovered === rel.to;
        const opacity = isActive ? 1 : 0.12;

        const labelText = clampText(rel.label, n > 8 ? 18 : 22);
        const charW = labelSize * 0.62;

        return (
          <g key={i} style={{ transition: "opacity 0.2s" }} opacity={opacity}>
            <line
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={style.color}
              strokeWidth={style.width}
              strokeDasharray={style.dash}
              strokeLinecap="round"
            />
            {/* Arrow */}
            {(() => {
              const ax = p1.x * 0.4 + p2.x * 0.6;
              const ay = p1.y * 0.4 + p2.y * 0.6;
              const al = Math.sqrt(dx * dx + dy * dy) || 1;
              const ux = dx / al;
              const uy = dy / al;
              const sz = n > 8 ? 4 : 5;
              return (
                <polygon
                  points={`${ax},${ay} ${ax - ux * sz + uy * sz * 0.6},${ay - uy * sz - ux * sz * 0.6} ${ax - ux * sz - uy * sz * 0.6},${ay - uy * sz + ux * sz * 0.6}`}
                  fill={style.color}
                />
              );
            })()}
            {/* Label */}
            <rect
              x={lx - labelText.length * charW / 2 - 3}
              y={ly - labelSize / 2 - 2}
              width={labelText.length * charW + 6}
              height={labelSize + 4}
              fill={COLORS.bgCard}
              rx={2}
              opacity={0.92}
            />
            <text
              x={lx} y={ly + labelSize * 0.35}
              textAnchor="middle"
              fill={style.color}
              fontSize={labelSize}
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
        const opacity = isActive ? 1 : 0.25;
        const displayName = clampText(node.name, nameClamp);

        return (
          <g
            key={node.index}
            style={{ cursor: "pointer", transition: "opacity 0.2s" }}
            opacity={opacity}
            onMouseEnter={() => setHovered(node.index)}
            onMouseLeave={() => setHovered(null)}
          >
            <rect
              x={node.x - nodeW / 2} y={node.y - nodeH / 2}
              width={nodeW} height={nodeH}
              rx={5}
              fill={COLORS.bgModal}
              stroke={hovered === node.index ? COLORS.gold : COLORS.border}
              strokeWidth={hovered === node.index ? 1.5 : 1}
            />
            <text
              x={node.x} y={node.y + fontSize * 0.35}
              textAnchor="middle"
              fill={hovered === node.index ? COLORS.gold : COLORS.text}
              fontSize={fontSize}
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
          const row = legendRows === 2 ? Math.floor(i / Math.ceil(usedTypes.length / 2)) : 0;
          const itemsInRow = legendRows === 2
            ? (row === 0 ? Math.ceil(usedTypes.length / 2) : usedTypes.length - Math.ceil(usedTypes.length / 2))
            : usedTypes.length;
          const indexInRow = legendRows === 2
            ? (row === 0 ? i : i - Math.ceil(usedTypes.length / 2))
            : i;
          const spacing = W / (itemsInRow + 1);
          const lx = spacing * (indexInRow + 1);
          const ly = 22 + row * 22;
          return (
            <g key={type} transform={`translate(${lx}, ${ly})`}>
              <line
                x1={-18} y1={0} x2={-4} y2={0}
                stroke={style.color}
                strokeWidth={style.width}
                strokeDasharray={style.dash}
                strokeLinecap="round"
              />
              <text
                x={2} y={3.5}
                fill={style.color}
                fontSize={8.5}
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
