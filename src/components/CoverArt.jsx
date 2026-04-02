import { memo, useState } from "react";
import { COLORS, alpha } from "../theme.js";
import fallbackCovers from "../assets/covers/fallback/index.js";

const MAIN_EXTS = ["jpg", "jpeg", "png", "webp", "svg"];

// Session-level cache: remembers the resolved ext index per cover type so
// remounts (e.g. after filter changes) skip the probing sequence entirely.
const resolvedExtCache = new Map();

const polishOverlayStyle = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 24%, rgba(0,0,0,0.10) 100%)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -34px 46px rgba(0,0,0,0.14)",
  opacity: 0.82,
  transition: "opacity 0.28s ease",
};

const CoverArt = ({ type, isRead, status, title }) => {
  const [extIndex, setExtIndex] = useState(() => resolvedExtCache.get(type) ?? 0);

  const effectiveStatus = status || (isRead ? "terminado" : "no-leido");
  const isTerminado = effectiveStatus === "terminado";
  const isEnProgreso = effectiveStatus === "en-progreso";
  const bg = isTerminado ? COLORS.bgCardRead : isEnProgreso ? COLORS.bgCardInProgress : COLORS.bgCard;
  const fg = isTerminado ? COLORS.gold : isEnProgreso ? COLORS.inProgress : COLORS.goldDim;
  const accent = isTerminado ? COLORS.goldAccent : isEnProgreso ? COLORS.inProgress : COLORS.goldAccentDim;
  const dim = isTerminado ? COLORS.decorDim : isEnProgreso ? COLORS.borderInProgress : COLORS.decorDimDark;

  const label = title ? `Portada de ${title}` : "Portada de novela";
  const base = import.meta.env.BASE_URL;
  const frameStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    background: bg,
    borderRadius: 10,
    boxShadow: `inset 0 0 0 1px ${alpha(dim, 0.26)}, inset 0 18px 26px ${alpha("#ffffff", 0.02)}`,
    transition: "transform 0.28s ease, box-shadow 0.28s ease",
  };
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.32s ease",
  };
  const auraStyle = {
    position: "absolute",
    inset: -18,
    pointerEvents: "none",
    background: `radial-gradient(circle at 50% 12%, ${alpha(accent, isEnProgreso ? 0.22 : 0.18)} 0%, transparent 52%)`,
    opacity: isTerminado ? 0.95 : isEnProgreso ? 0.86 : 0.72,
    mixBlendMode: "screen",
  };

  const handleError = () => {
    setExtIndex((i) => {
      const next = i + 1;
      if (next >= MAIN_EXTS.length) {
        resolvedExtCache.set(type, MAIN_EXTS.length);
      }
      return next;
    });
  };

  const handleLoad = () => {
    if (!resolvedExtCache.has(type)) {
      resolvedExtCache.set(type, extIndex);
    }
  };

  if (extIndex < MAIN_EXTS.length) {
    return (
      <div role="img" aria-label={label} className="cover-frame" style={frameStyle}>
        <img
          className="cover-media"
          src={`${base}covers/${type}.${MAIN_EXTS[extIndex]}`}
          alt={label}
          onError={handleError}
          onLoad={handleLoad}
          style={imageStyle}
        />
        <div className="cover-aura" style={auraStyle} />
        <div className="cover-polish" style={polishOverlayStyle} />
      </div>
    );
  }

  const FallbackSVG = fallbackCovers[type] || fallbackCovers.axe;
  return (
    <div role="img" aria-label={label} className="cover-frame" style={frameStyle}>
      <div className="cover-media" style={{ position: "absolute", inset: 0 }}>
        <FallbackSVG bg={bg} fg={fg} accent={accent} dim={dim} isRead={isTerminado} />
      </div>
      <div className="cover-aura" style={auraStyle} />
      <div className="cover-polish" style={polishOverlayStyle} />
    </div>
  );
};

export default memo(CoverArt);
