import { COLORS, alpha } from "../theme.js";

const UI_FONT = "'Manrope', 'Avenir Next', 'Segoe UI', sans-serif";

const KIND_LABELS = {
  primary: "Primaria",
  reference: "Referencia",
  essay: "Ensayo",
};

function collectEntries(groups) {
  const merged = new Map();

  groups.forEach((group) => {
    if (!group?.items?.length) return;

    group.items.forEach((item) => {
      if (!item?.url) return;

      const existing = merged.get(item.url);
      if (existing) {
        existing.sections.add(group.label);
        return;
      }

      merged.set(item.url, {
        ...item,
        sections: new Set([group.label]),
      });
    });
  });

  return Array.from(merged.values());
}

function SourcesDisclosure({ title = "Fuentes", groups = [] }) {
  const availableGroups = groups.filter((group) => group?.items?.length);
  const entries = collectEntries(availableGroups);

  if (!entries.length) return null;

  return (
    <details
      style={{
        marginTop: 22,
        borderRadius: 20,
        border: `1px solid ${alpha(COLORS.border, 0.96)}`,
        background:
          `linear-gradient(180deg, ${alpha(COLORS.text, 0.03)} 0%, transparent 24%), ${alpha(COLORS.bgCard, 0.9)}`,
        overflow: "hidden",
      }}
    >
      <summary
        style={{
          listStyle: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
          padding: "14px 16px",
        }}
      >
        <span
          style={{
            fontFamily: UI_FONT,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.goldAccent,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: UI_FONT,
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: COLORS.textMuted,
          }}
        >
          {entries.length} enlaces
        </span>
      </summary>

      <div
        style={{
          padding: "0 16px 16px",
          display: "grid",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {availableGroups.map((group) => (
            <span
              key={group.label}
              style={{
                padding: "3px 8px",
                borderRadius: 999,
                border: `1px solid ${alpha(COLORS.border, 0.84)}`,
                background: alpha(COLORS.bgMain, 0.36),
                color: COLORS.textMuted,
                fontFamily: UI_FONT,
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {group.label}
            </span>
          ))}
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          {entries.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "grid",
                gap: 5,
                padding: "10px 12px",
                borderRadius: 14,
                border: `1px solid ${alpha(COLORS.border, 0.88)}`,
                background: alpha(COLORS.bgMain, 0.3),
                color: COLORS.textSecondary,
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ color: COLORS.textBook, fontSize: 13, lineHeight: 1.4 }}>{item.label}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: UI_FONT,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "3px 7px",
                    borderRadius: 999,
                    color: COLORS.goldAccent,
                    border: `1px solid ${alpha(COLORS.goldDim, 0.52)}`,
                    background: alpha(COLORS.gold, 0.1),
                  }}
                >
                  {KIND_LABELS[item.kind] || item.kind}
                </span>
              </div>

              <div style={{ fontSize: 11, color: COLORS.textMuted }}>{item.publisher}</div>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {Array.from(item.sections).map((section) => (
                  <span
                    key={`${item.url}-${section}`}
                    style={{
                      padding: "2px 7px",
                      borderRadius: 999,
                      background: alpha(COLORS.text, 0.05),
                      color: COLORS.textSecondary,
                      fontFamily: UI_FONT,
                      fontSize: 9,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {section}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}

export default SourcesDisclosure;
