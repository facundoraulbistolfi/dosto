import ModalShell from "./ModalShell.jsx";
import SourcesDisclosure from "./SourcesDisclosure.jsx";
import { COLORS, alpha } from "../theme.js";

const UI_FONT = "'Manrope', 'Avenir Next', 'Segoe UI', sans-serif";

const CATEGORY_LABELS = {
  life: "Vida de Dostoievski",
  context: "Rusia y contexto",
};

function formatYearRange(year, endYear) {
  return endYear ? `${year}–${endYear}` : `${year}`;
}

function TimelineEventModal({ event, booksById, onOpenBook, onClose }) {
  const accent = event.category === "life" ? "#89a5c8" : "#ae707b";
  const sourceGroups = [
    { label: "Qué pasó", items: event.sources?.event },
    { label: "Influencia en la obra", items: event.sources?.influence },
  ];

  return (
    <ModalShell ariaLabel={`Evento: ${event.label}`} width="min(760px, 100%)" onClose={onClose}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 18,
          alignItems: "start",
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: UI_FONT,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {CATEGORY_LABELS[event.category]}
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", lineHeight: 1.02, margin: "8px 0 8px", color: COLORS.textBook }}>
            {event.label}
          </h2>
          <div style={{ fontSize: 15, color: COLORS.textSecondary }}>
            {formatYearRange(event.year, event.endYear)}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: `1px solid ${alpha(COLORS.border, 0.95)}`,
            background: alpha(COLORS.bgCard, 0.8),
            color: COLORS.textMuted,
            cursor: "pointer",
            fontFamily: UI_FONT,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Cerrar
        </button>
      </div>

      <div style={{ display: "grid", gap: 18 }}>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 18,
            border: `1px solid ${alpha(COLORS.border, 0.95)}`,
            background: alpha(COLORS.bgCard, 0.82),
          }}
        >
          <div
            style={{
              fontFamily: UI_FONT,
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              marginBottom: 10,
            }}
          >
            Qué pasó
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: COLORS.textDesc, whiteSpace: "pre-wrap" }}>
            {event.fullDescription}
          </p>
        </div>

        <div
          style={{
            padding: "14px 16px",
            borderRadius: 18,
            border: `1px solid ${alpha(COLORS.border, 0.95)}`,
            background: alpha(COLORS.bgCard, 0.82),
          }}
        >
          <div
            style={{
              fontFamily: UI_FONT,
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              marginBottom: 10,
            }}
          >
            Cómo influyó en la obra de Dostoievski
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: COLORS.textDesc, whiteSpace: "pre-wrap" }}>
            {event.influenceOnWork}
          </p>
        </div>

        {event.relatedWorks?.length > 0 && (
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 18,
              border: `1px solid ${alpha(COLORS.border, 0.95)}`,
              background: alpha(COLORS.bgCard, 0.82),
            }}
          >
            <div
              style={{
                fontFamily: UI_FONT,
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.textMuted,
                marginBottom: 10,
              }}
            >
              Obras relacionadas
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {event.relatedWorks
                .map((bookId) => booksById[bookId])
                .filter(Boolean)
                .map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => onOpenBook(book)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      border: `1px solid ${alpha(COLORS.goldDim, 0.56)}`,
                      background: alpha(COLORS.gold, 0.08),
                      color: COLORS.goldAccent,
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    {book.title}
                  </button>
                ))}
            </div>
          </div>
        )}

        <SourcesDisclosure groups={sourceGroups} />
      </div>
    </ModalShell>
  );
}

export default TimelineEventModal;
