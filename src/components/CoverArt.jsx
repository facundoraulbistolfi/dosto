import { memo, useState } from "react";
import { COLORS } from "../theme.js";
import fallbackCovers from "../assets/covers/fallback/index.js";

const CoverArt = ({ type, isRead, status, title }) => {
  const [useMain, setUseMain] = useState(true);

  const effectiveStatus = status || (isRead ? "terminado" : "no-leido");
  const isTerminado = effectiveStatus === "terminado";
  const isEnProgreso = effectiveStatus === "en-progreso";
  const bg = isTerminado ? COLORS.bgCardRead : isEnProgreso ? COLORS.bgCardInProgress : COLORS.bgCard;
  const fg = isTerminado ? COLORS.gold : isEnProgreso ? COLORS.inProgress : COLORS.goldDim;
  const accent = isTerminado ? COLORS.goldAccent : isEnProgreso ? COLORS.inProgress : COLORS.goldAccentDim;
  const dim = isTerminado ? COLORS.decorDim : isEnProgreso ? COLORS.borderInProgress : COLORS.decorDimDark;

  const label = title ? `Portada de ${title}` : "Portada de novela";
  const base = import.meta.env.BASE_URL;

  if (useMain) {
    return (
      <div role="img" aria-label={label} style={{ width: "100%", height: "100%" }}>
        <img
          src={`${base}covers/${type}.jpg`}
          alt={label}
          onError={() => setUseMain(false)}
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
