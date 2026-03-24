import { memo, useState } from "react";
import { COLORS } from "../theme.js";
import fallbackCovers from "../assets/covers/fallback/index.js";

const MAIN_EXTS = ["jpg", "jpeg", "png", "webp", "svg"];

const CoverArt = ({ type, isRead, status, title }) => {
  const [extIndex, setExtIndex] = useState(0);

  const effectiveStatus = status || (isRead ? "terminado" : "no-leido");
  const isTerminado = effectiveStatus === "terminado";
  const isEnProgreso = effectiveStatus === "en-progreso";
  const bg = isTerminado ? COLORS.bgCardRead : isEnProgreso ? COLORS.bgCardInProgress : COLORS.bgCard;
  const fg = isTerminado ? COLORS.gold : isEnProgreso ? COLORS.inProgress : COLORS.goldDim;
  const accent = isTerminado ? COLORS.goldAccent : isEnProgreso ? COLORS.inProgress : COLORS.goldAccentDim;
  const dim = isTerminado ? COLORS.decorDim : isEnProgreso ? COLORS.borderInProgress : COLORS.decorDimDark;

  const label = title ? `Portada de ${title}` : "Portada de novela";
  const base = import.meta.env.BASE_URL;

  if (extIndex < MAIN_EXTS.length) {
    return (
      <div role="img" aria-label={label} style={{ width: "100%", height: "100%" }}>
        <img
          src={`${base}covers/${type}.${MAIN_EXTS[extIndex]}`}
          alt={label}
          onError={() => setExtIndex((i) => i + 1)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }

  const FallbackSVG = fallbackCovers[type] || fallbackCovers.axe;
  return (
    <div role="img" aria-label={label}>
      <FallbackSVG bg={bg} fg={fg} accent={accent} dim={dim} isRead={isTerminado} />
    </div>
  );
};

export default memo(CoverArt);
