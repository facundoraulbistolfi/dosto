import { memo } from "react";
import { COLORS, alpha } from "../theme.js";

const StatsBar = ({ read, inProgress = 0, total }) => {
  const pctRead = total > 0 ? (read / total) * 100 : 0;
  const pctInProgress = total > 0 ? (inProgress / total) * 100 : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={read + inProgress}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Progreso de lectura: ${Math.round(pctRead)}% terminado, ${Math.round(pctInProgress)}% en progreso`}
      style={{
        width: "100%",
        height: 10,
        padding: 2,
        background: alpha(COLORS.bgCardRead, 0.95),
        border: `1px solid ${alpha(COLORS.border, 0.8)}`,
        borderRadius: 999,
        overflow: "hidden",
        display: "flex",
        boxShadow: `inset 0 1px 0 ${alpha(COLORS.text, 0.05)}`,
      }}
    >
      <div
        style={{
          width: `${pctRead}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${COLORS.goldGradientStart}, ${COLORS.goldAccent})`,
          borderRadius: 999,
          boxShadow: `0 0 18px ${alpha(COLORS.gold, 0.34)}`,
          transition: "width 0.6s ease",
        }}
      />
      <div
        style={{
          width: `${pctInProgress}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${COLORS.inProgressDim}, ${COLORS.inProgress})`,
          borderRadius: 999,
          boxShadow: `0 0 18px ${alpha(COLORS.inProgress, 0.26)}`,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
};

export default memo(StatsBar);
