import { COLORS, alpha } from "../theme.js";

const UI_FONT = "'Manrope', 'Avenir Next', 'Segoe UI', sans-serif";

const KIND_LABELS = {
  primary: "Primaria",
  reference: "Referencia",
  essay: "Ensayo",
};

function SectionSources({ title = "Fuentes", items }) {
  if (!items?.length) return null;

  return (
    <div
      style={{
        marginTop: 12,
        padding: "12px 14px",
        borderRadius: 16,
        border: `1px solid ${alpha(COLORS.border, 0.88)}`,
        background: alpha(COLORS.bgCard, 0.74),
        display: "grid",
        gap: 8,
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

      <div style={{ display: "grid", gap: 8 }}>
        {items.map((item) => (
          <a
            key={`${item.label}-${item.url}`}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "grid",
              gap: 4,
              color: COLORS.textSecondary,
              textDecoration: "none",
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ color: COLORS.textBook, fontSize: 14 }}>{item.label}</span>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: UI_FONT,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "3px 7px",
                  borderRadius: 999,
                  color: COLORS.goldAccent,
                  border: `1px solid ${alpha(COLORS.goldDim, 0.55)}`,
                  background: alpha(COLORS.gold, 0.08),
                }}
              >
                {KIND_LABELS[item.kind] || item.kind}
              </span>
            </div>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>
              {item.publisher}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SectionSources;
