import { memo, useMemo, useState } from "react";
import Timeline from "./Timeline.jsx";
import CoverArt from "./CoverArt.jsx";
import SourcesDisclosure from "./SourcesDisclosure.jsx";
import { COLORS, alpha } from "../theme.js";

const UI_FONT = "'Manrope', 'Avenir Next', 'Segoe UI', sans-serif";

const CATEGORY_LABELS = {
  life: "Vida de Dostoievski",
  context: "Rusia y contexto",
};

function MetricPill({ label, value, color = COLORS.goldAccent }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: 18,
        border: `1px solid ${alpha(color, 0.26)}`,
        background:
          `radial-gradient(circle at top, ${alpha(color, 0.1)} 0%, transparent 44%), ${alpha(COLORS.bgCard, 0.82)}`,
        boxShadow: `0 14px 28px ${alpha("#000000", 0.22)}`,
      }}
    >
      <div
        style={{
          fontFamily: UI_FONT,
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: COLORS.textMuted,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 24, lineHeight: 1, color }}>{value}</div>
    </div>
  );
}

function DetailTitle({ children }) {
  return (
    <div
      style={{
        fontFamily: UI_FONT,
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: COLORS.textMuted,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function TextPanel({ title, body, italic = false }) {
  if (!body) return null;

  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 18,
        border: `1px solid ${alpha(COLORS.border, 0.92)}`,
        background: alpha(COLORS.bgCard, 0.82),
      }}
    >
      <DetailTitle>{title}</DetailTitle>
      <p
        style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 1.72,
          color: COLORS.textSecondary,
          whiteSpace: "pre-wrap",
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        {body}
      </p>
    </div>
  );
}

function QuestionPanel({ items }) {
  if (!items?.length) return null;

  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 18,
        border: `1px solid ${alpha(COLORS.border, 0.92)}`,
        background: alpha(COLORS.bgCard, 0.82),
      }}
    >
      <DetailTitle>Claves de lectura</DetailTitle>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: "10px 12px",
              borderRadius: 14,
              background: alpha(COLORS.bgMain, 0.24),
              color: COLORS.textDesc,
              fontSize: 14,
              lineHeight: 1.62,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatYearRange(year, endYear) {
  return endYear ? `${year}–${endYear}` : `${year}`;
}

function getBookStatus(bookStates, id) {
  return bookStates[id]?.status || "no-leido";
}

function BookSelectionPanel({ book, bookStates, themes, workTypes }) {
  const status = getBookStatus(bookStates, book.id);
  const chapter = bookStates[book.id]?.chapter || 0;
  const statusLabel = status === "terminado" ? "Terminado" : status === "en-progreso" ? "En progreso" : "No leído";
  const sourceGroups = [
    { label: "Resumen", items: book.sources?.summary },
    { label: "Cómo leerla", items: book.sources?.readingGuide },
    { label: "Contexto de escritura", items: book.sources?.context },
    { label: "Personajes", items: book.sources?.characters },
    { label: "Después de leer", items: book.sources?.afterReading },
  ];

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div className="detail-grid">
        <div>
          <div
            style={{
              width: "min(240px, 100%)",
              aspectRatio: "200 / 280",
              borderRadius: 14,
              overflow: "hidden",
              border: `1px solid ${alpha(COLORS.border, 0.95)}`,
              boxShadow: `0 20px 42px ${alpha("#000000", 0.28)}`,
            }}
          >
            <CoverArt type={book.cover} status={status} title={book.title} />
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: UI_FONT,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: status === "terminado" ? COLORS.goldAccent : status === "en-progreso" ? COLORS.inProgress : COLORS.textLabel,
            }}
          >
            Obra seleccionada
          </div>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 40px)", lineHeight: 0.98, color: COLORS.textBook, margin: "8px 0 8px" }}>
            {book.title}
          </h2>
          <div style={{ fontSize: 16, color: COLORS.textSecondary, fontStyle: "italic", marginBottom: 12 }}>
            {book.titleOrig} · {book.year}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <span
              style={{
                padding: "5px 10px",
                borderRadius: 999,
                border: `1px solid ${alpha(workTypes[book.type]?.color || COLORS.textSecondary, 0.36)}`,
                background: alpha(workTypes[book.type]?.color || COLORS.textSecondary, 0.14),
                color: workTypes[book.type]?.color || COLORS.textSecondary,
                fontFamily: UI_FONT,
                fontSize: 11,
              }}
            >
              {workTypes[book.type]?.label}
            </span>
            <span
              style={{
                padding: "5px 10px",
                borderRadius: 999,
                border: `1px solid ${alpha(COLORS.border, 0.92)}`,
                background: alpha(COLORS.bgCard, 0.72),
                color: status === "terminado" ? COLORS.goldAccent : status === "en-progreso" ? COLORS.inProgress : COLORS.textMuted,
                fontFamily: UI_FONT,
                fontSize: 11,
              }}
            >
              {statusLabel}
            </span>
            <span
              style={{
                padding: "5px 10px",
                borderRadius: 999,
                border: `1px solid ${alpha(COLORS.border, 0.92)}`,
                background: alpha(COLORS.bgCard, 0.72),
                color: COLORS.textSecondary,
                fontFamily: UI_FONT,
                fontSize: 11,
              }}
            >
              {book.pages} páginas
            </span>
            {book.goodreadsUrl && (
              <a
                href={book.goodreadsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "5px 10px",
                  borderRadius: 999,
                  border: `1px solid ${alpha(COLORS.goldDim, 0.66)}`,
                  background: alpha(COLORS.gold, 0.1),
                  color: COLORS.goldAccent,
                  fontFamily: UI_FONT,
                  fontSize: 11,
                  textDecoration: "none",
                }}
              >
                Ver en Goodreads
              </a>
            )}
          </div>

          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.76, color: COLORS.textDesc }}>
            {book.desc}
          </p>

          {status === "en-progreso" && (
            <div
              style={{
                marginTop: 16,
                padding: "12px 14px",
                borderRadius: 16,
                border: `1px solid ${alpha(COLORS.borderInProgress, 0.92)}`,
                background: alpha(COLORS.bgCardInProgress, 0.86),
              }}
            >
              <DetailTitle>Lectura actual</DetailTitle>
              <div style={{ fontSize: 14, color: COLORS.textSecondary }}>
                Capítulo {chapter || 1} de {book.chapters} · {Math.round((((chapter || 1) / book.chapters) || 0) * 100)}%
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        <TextPanel title="Cómo leerla" body={book.readingGuide} />
        <TextPanel title="Contexto de escritura" body={book.writtenContext} italic />
        <TextPanel title="Por qué importa" body={book.whyItMatters} />
        <QuestionPanel items={book.keyQuestions} />

        {book.characters?.length > 0 && (
          <div
            style={{
              padding: "14px 16px",
              borderRadius: 18,
              border: `1px solid ${alpha(COLORS.border, 0.92)}`,
              background: alpha(COLORS.bgCard, 0.82),
            }}
          >
            <DetailTitle>Personajes principales</DetailTitle>
            <div style={{ display: "grid", gap: 8 }}>
              {book.characters.slice(0, 6).map((character) => (
                <div key={character.name} style={{ fontSize: 14, lineHeight: 1.6 }}>
                  <span style={{ color: COLORS.goldAccent, fontWeight: 600 }}>{character.name}</span>
                  <span style={{ color: COLORS.textSecondary }}> — {character.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {book.themes.map((theme) => (
            <span
              key={theme}
              style={{
                padding: "5px 10px",
                borderRadius: 999,
                border: `1px solid ${alpha(themes[theme].color, 0.32)}`,
                background: alpha(themes[theme].color, 0.12),
                color: themes[theme].color,
                fontFamily: UI_FONT,
                fontSize: 11,
              }}
            >
              {themes[theme].label}
            </span>
          ))}
        </div>

        <SourcesDisclosure groups={sourceGroups} />
      </div>
    </div>
  );
}

function EventSelectionPanel({ event, novelsById, bookStates, workTypes, onSelectBook }) {
  const sourceGroups = [
    { label: "Qué pasó", items: event.sources?.event },
    { label: "Influencia en la obra", items: event.sources?.influence },
  ];
  const accent = event.category === "life" ? "#89a5c8" : "#ae707b";

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gap: 8 }}>
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
        <h2 style={{ fontSize: "clamp(30px, 4vw, 40px)", lineHeight: 0.98, color: COLORS.textBook, margin: 0 }}>
          {event.label}
        </h2>
        <div style={{ fontSize: 15, color: COLORS.textSecondary }}>
          {formatYearRange(event.year, event.endYear)}
        </div>
      </div>

      <TextPanel title="Qué pasó" body={event.fullDescription} />
      <TextPanel title="Cómo influyó en la obra de Dostoievski" body={event.influenceOnWork} />

      {event.relatedWorks?.length > 0 && (
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 18,
            border: `1px solid ${alpha(COLORS.border, 0.92)}`,
            background: alpha(COLORS.bgCard, 0.82),
          }}
        >
          <DetailTitle>Obras relacionadas</DetailTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {event.relatedWorks
              .map((bookId) => novelsById[bookId])
              .filter(Boolean)
              .map((book) => {
                const status = getBookStatus(bookStates, book.id);
                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => onSelectBook(book)}
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
                    {book.title} · {workTypes[book.type]?.label} · {status === "terminado" ? "Terminado" : status === "en-progreso" ? "En progreso" : "No leído"}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      <SourcesDisclosure groups={sourceGroups} />
    </div>
  );
}

function EmptySelectionPanel() {
  return (
    <div
      style={{
        padding: "26px clamp(18px, 3vw, 28px)",
        borderRadius: 26,
        border: `1px solid ${alpha(COLORS.border, 0.92)}`,
        background:
          `linear-gradient(180deg, ${alpha(COLORS.text, 0.02)} 0%, transparent 18%), ${alpha(COLORS.bgModal, 0.94)}`,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 22, color: COLORS.textBook, marginBottom: 8 }}>Seleccioná una obra o un evento</div>
      <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.textSecondary, maxWidth: 680, margin: "0 auto" }}>
        El detalle aparece acá abajo para que la cronología siga siendo parte de la misma página. En esta sección ya no usamos modales.
      </div>
    </div>
  );
}

function VerticalTimelinePage({ novels, bookStates, themes, workTypes }) {
  const [selection, setSelection] = useState(null);
  const novelsById = useMemo(() => Object.fromEntries(novels.map((novel) => [novel.id, novel])), [novels]);
  const finishedCount = novels.filter((novel) => bookStates[novel.id]?.status === "terminado").length;
  const inProgressCount = novels.filter((novel) => bookStates[novel.id]?.status === "en-progreso").length;

  return (
    <div style={{ display: "grid", gap: 22 }}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "28px clamp(18px, 3vw, 32px)",
          borderRadius: 30,
          border: `1px solid ${alpha(COLORS.border, 0.96)}`,
          background:
            `radial-gradient(circle at 18% 0%, ${alpha(COLORS.goldAccent, 0.16)} 0%, transparent 28%), radial-gradient(circle at 88% 14%, ${alpha("#89a5c8", 0.14)} 0%, transparent 24%), ${alpha(COLORS.bgModal, 0.97)}`,
          boxShadow: `0 32px 68px ${alpha("#000000", 0.36)}`,
        }}
      >
        <div style={{ position: "relative", zIndex: 1, display: "grid", gap: 18 }}>
          <div style={{ display: "grid", gap: 10, maxWidth: 820 }}>
            <div
              style={{
                fontFamily: UI_FONT,
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: COLORS.textLabel,
              }}
            >
              Cronología
            </div>
            <div style={{ fontSize: "clamp(36px, 6vw, 58px)", lineHeight: 0.94, color: COLORS.goldAccent }}>
              La visual completa de vida, contexto y obras.
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.72, color: COLORS.textSecondary }}>
              Hover para leer rápido, clic para fijar el detalle abajo y scroll con el mismo tono editorial que el resto de la biblioteca.
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
            }}
          >
            <MetricPill label="Obras" value={novels.length} />
            <MetricPill label="Terminadas" value={finishedCount} />
            <MetricPill label="En progreso" value={inProgressCount} color={COLORS.inProgress} />
            <MetricPill label="Detalle" value="Debajo" color={COLORS.textBook} />
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "18px clamp(12px, 2vw, 18px) 20px",
          borderRadius: 28,
          border: `1px solid ${alpha(COLORS.border, 0.96)}`,
          background:
            `linear-gradient(180deg, ${alpha(COLORS.text, 0.018)} 0%, transparent 18%), ${alpha(COLORS.bgModal, 0.96)}`,
          boxShadow: `0 24px 56px ${alpha("#000000", 0.3)}`,
        }}
      >
        <Timeline
          novels={novels}
          bookStates={bookStates}
          selectedId={selection?.payload?.id || null}
          onSelectBook={(book) => setSelection({ kind: "book", payload: book })}
          onSelectEvent={(event) => setSelection({ kind: "event", payload: event })}
        />
      </section>

      <section
        style={{
          padding: "20px clamp(16px, 2.6vw, 24px)",
          borderRadius: 28,
          border: `1px solid ${alpha(COLORS.border, 0.96)}`,
          background:
            `radial-gradient(circle at top, ${alpha(COLORS.goldAccent, 0.07)} 0%, transparent 24%), ${alpha(COLORS.bgModal, 0.97)}`,
          boxShadow: `0 24px 56px ${alpha("#000000", 0.3)}`,
        }}
      >
        {selection?.kind === "book" && (
          <BookSelectionPanel book={selection.payload} bookStates={bookStates} themes={themes} workTypes={workTypes} />
        )}
        {selection?.kind === "event" && (
          <EventSelectionPanel
            event={selection.payload}
            novelsById={novelsById}
            bookStates={bookStates}
            workTypes={workTypes}
            onSelectBook={(book) => setSelection({ kind: "book", payload: book })}
          />
        )}
        {!selection && <EmptySelectionPanel />}
      </section>
    </div>
  );
}

export default memo(VerticalTimelinePage);
