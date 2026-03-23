import { memo } from "react";
import { COLORS } from "../theme.js";

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
      style={{ width: "100%", height: 6, background: COLORS.bgCardRead, borderRadius: 3, overflow: "hidden", display: "flex" }}
    >
      <div
        style={{
          width: `${pctRead}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${COLORS.goldGradientStart}, ${COLORS.gold})`,
          transition: "width 0.6s ease",
        }}
      />
      <div
        style={{
          width: `${pctInProgress}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${COLORS.inProgressDim}, ${COLORS.inProgress})`,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
};

export default memo(StatsBar);
