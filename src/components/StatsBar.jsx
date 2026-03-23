import { memo } from "react";
import { COLORS } from "../theme.js";

const StatsBar = ({ read, total }) => {
  const pct = total > 0 ? (read / total) * 100 : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={read}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Progreso de lectura: ${Math.round(pct)}%`}
      style={{ width: "100%", height: 6, background: COLORS.bgCardRead, borderRadius: 3, overflow: "hidden" }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${COLORS.goldGradientStart}, ${COLORS.gold})`,
          borderRadius: 3,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
};

export default memo(StatsBar);
