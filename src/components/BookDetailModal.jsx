import CoverArt from "./CoverArt.jsx";
import RelationshipDiagram from "./RelationshipDiagram.jsx";
import ModalShell from "./ModalShell.jsx";
import SourcesDisclosure from "./SourcesDisclosure.jsx";
import { COLORS, alpha } from "../theme.js";

const UI_FONT = "'Manrope', 'Avenir Next', 'Segoe UI', sans-serif";

function SectionEyebrow({ children, color = COLORS.textMuted }) {
  return (
    <div
      style={{
        fontFamily: UI_FONT,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </div>
  );
}

function DetailSectionTitle({ children }) {
  return (
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
      {children}
    </div>
  );
}

function TextBlock({ title, body, italic = false }) {
  if (!body) return null;

  return (
    <div
      style={{
        marginBottom: 18,
        padding: "14px 16px",
        borderRadius: 18,
        background: alpha(COLORS.bgCard, 0.84),
        border: `1px solid ${alpha(COLORS.border, 0.95)}`,
      }}
    >
      <DetailSectionTitle>{title}</DetailSectionTitle>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.72,
          color: COLORS.textSecondary,
          margin: 0,
          fontStyle: italic ? "italic" : "normal",
          whiteSpace: "pre-wrap",
        }}
      >
        {body}
      </p>
    </div>
  );
}

function QuestionList({ items }) {
  if (!items?.length) return null;

  return (
    <div style={{ marginBottom: 18 }}>
      <DetailSectionTitle>Claves de lectura</DetailSectionTitle>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: "10px 12px",
              borderRadius: 14,
              background: alpha(COLORS.bgCard, 0.8),
              border: `1px solid ${alpha(COLORS.border, 0.88)}`,
              fontSize: 14,
              lineHeight: 1.6,
              color: COLORS.textDesc,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function SpoilerBlock({ body }) {
  if (!body) return null;

  return (
    <details
      style={{
        marginBottom: 18,
        borderRadius: 18,
        border: `1px solid ${alpha(COLORS.border, 0.95)}`,
        background: alpha(COLORS.bgCard, 0.84),
        padding: "14px 16px",
      }}
    >
      <summary
        style={{
          cursor: "pointer",
          color: COLORS.goldAccent,
          fontFamily: UI_FONT,
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Después de leer / con spoilers
      </summary>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: 14,
          lineHeight: 1.72,
          color: COLORS.textSecondary,
          whiteSpace: "pre-wrap",
        }}
        >
        {body}
      </p>
    </details>
  );
}

function BookDetailModal({
  book,
  bookState,
  status,
  chapter,
  themes,
  workType,
  noteText,
  setNoteText,
  setBookStatus,
  addNote,
  deleteNote,
  getBookAccent,
  actionButtonStyle,
  onClose,
}) {
  const sliderValue = status === "terminado" ? book.chapters : status === "en-progreso" ? chapter || 1 : 0;
  const sliderPct = book.chapters > 0 ? (sliderValue / book.chapters) * 100 : 0;
  const activeColor = sliderValue === 0 ? COLORS.textLabel : sliderValue === book.chapters ? COLORS.gold : COLORS.inProgress;
  const statusLabel = sliderValue === 0 ? "No leído" : sliderValue === book.chapters ? "Terminado" : "En progreso";
  const sourceGroups = [
    { label: "Resumen", items: book.sources?.summary },
    { label: "Cómo leerla", items: book.sources?.readingGuide },
    { label: "Contexto de escritura", items: book.sources?.context },
    { label: "Por qué importa", items: book.sources?.readingGuide },
    { label: "Claves de lectura", items: book.sources?.readingGuide },
    book.characters?.length > 0 || book.relationships?.length > 0
      ? { label: "Personajes y relaciones", items: book.sources?.characters }
      : null,
    { label: "Después de leer", items: book.sources?.afterReading },
  ].filter(Boolean);

  return (
    <ModalShell ariaLabel={`Detalle: ${book.title}`} onClose={onClose}>
      <div className="detail-grid">
        <div>
          <div
            style={{
              aspectRatio: "200 / 280",
              borderRadius: 14,
              overflow: "hidden",
              border: `1px solid ${alpha(COLORS.border, 0.95)}`,
              boxShadow: `0 20px 42px ${alpha("#000000", 0.26)}`,
            }}
          >
            <CoverArt type={book.cover} status={status} title={book.title} />
          </div>

          <div
            style={{
              marginTop: 16,
              padding: "14px 14px 12px",
              borderRadius: 18,
              border: `1px solid ${alpha(COLORS.border, 0.95)}`,
              background: alpha(COLORS.bgCard, 0.84),
            }}
          >
            <DetailSectionTitle>Estado de lectura</DetailSectionTitle>
            <style>{`
              input[type="range"].reading-slider {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 6px;
                border-radius: 999px;
                outline: none;
                cursor: pointer;
              }
              input[type="range"].reading-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                border: 2px solid currentColor;
                background: ${COLORS.bgMain};
                cursor: pointer;
                margin-top: -8px;
              }
              input[type="range"].reading-slider::-moz-range-thumb {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                border: 2px solid currentColor;
                background: ${COLORS.bgMain};
                cursor: pointer;
              }
            `}</style>
            <input
              type="range"
              className="reading-slider"
              min={0}
              max={book.chapters}
              step={1}
              value={sliderValue}
              onChange={(event) => {
                const value = parseInt(event.target.value, 10);
                if (value === 0) {
                  setBookStatus(book.id, "no-leido");
                } else if (value === book.chapters) {
                  setBookStatus(book.id, "terminado");
                } else {
                  setBookStatus(book.id, "en-progreso", value);
                }
              }}
              style={{
                background: `linear-gradient(to right, ${activeColor} ${sliderPct}%, ${COLORS.border} ${sliderPct}%)`,
                color: activeColor,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <span style={{ fontSize: 14, color: activeColor }}>{statusLabel}</span>
              <span style={{ fontSize: 13, color: COLORS.textSecondary }}>
                {sliderValue} / {book.chapters} capítulos
              </span>
            </div>

            {(bookState.startedDate || bookState.finishedDate) && (
              <div style={{ display: "grid", gap: 6, marginTop: 12, fontSize: 12, color: COLORS.textMuted }}>
                {bookState.startedDate && (
                  <span>Iniciado: {new Date(bookState.startedDate).toLocaleDateString()}</span>
                )}
                {bookState.finishedDate && (
                  <span>Terminado: {new Date(bookState.finishedDate).toLocaleDateString()}</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <SectionEyebrow color={getBookAccent(status)}>Ficha</SectionEyebrow>
          <h2 style={{ fontSize: "clamp(34px, 4vw, 42px)", lineHeight: 0.98, color: getBookAccent(status), margin: "8px 0 10px" }}>
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
                border: `1px solid ${alpha(workType?.color || COLORS.textSecondary, 0.4)}`,
                background: alpha(workType?.color || COLORS.textSecondary, 0.14),
                color: workType?.color || COLORS.textSecondary,
                fontFamily: UI_FONT,
                fontSize: 11,
              }}
            >
              {workType?.label}
            </span>
            <span
              style={{
                padding: "5px 10px",
                borderRadius: 999,
                border: `1px solid ${alpha(COLORS.border, 0.95)}`,
                background: alpha(COLORS.bgCard, 0.72),
                color: COLORS.textSecondary,
                fontFamily: UI_FONT,
                fontSize: 11,
              }}
            >
              {book.pages} páginas
            </span>
            <span
              style={{
                padding: "5px 10px",
                borderRadius: 999,
                border: `1px solid ${alpha(COLORS.border, 0.95)}`,
                background: alpha(COLORS.bgCard, 0.72),
                color: COLORS.textSecondary,
                fontFamily: UI_FONT,
                fontSize: 11,
              }}
            >
              {book.chapters} capítulos
            </span>
            {book.goodreadsUrl && (
              <a
                href={book.goodreadsUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                style={{
                  padding: "5px 10px",
                  borderRadius: 999,
                  border: `1px solid ${alpha(COLORS.goldDim, 0.7)}`,
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

          {book.location && (
            <div style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 16 }}>
              Ambientación: {book.location}
            </div>
          )}

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {book.themes.map((theme) => (
              <span
                key={theme}
                style={{
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: `1px solid ${alpha(themes[theme].color, 0.34)}`,
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

          <p style={{ fontSize: 16, lineHeight: 1.78, color: COLORS.textDesc, margin: "0 0 8px" }}>
            {book.desc}
          </p>

          <TextBlock title="Cómo leerla" body={book.readingGuide} />
          <TextBlock title="Contexto de escritura" body={book.writtenContext} italic />
          <TextBlock title="Por qué importa" body={book.whyItMatters} />
          <QuestionList items={book.keyQuestions} />

          {book.characters?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <DetailSectionTitle>Personajes principales</DetailSectionTitle>
              <div style={{ display: "grid", gap: 8 }}>
                {book.characters.map((character) => (
                  <div key={character.name} style={{ fontSize: 14, lineHeight: 1.6 }}>
                    <span style={{ color: COLORS.goldAccent, fontWeight: 600 }}>{character.name}</span>
                    <span style={{ color: COLORS.textSecondary }}> — {character.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {book.relationships?.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <DetailSectionTitle>Relaciones entre personajes</DetailSectionTitle>
              <div
                style={{
                  borderRadius: 18,
                  border: `1px solid ${alpha(COLORS.border, 0.95)}`,
                  background: alpha(COLORS.bgCard, 0.84),
                  overflow: "hidden",
                }}
              >
                <RelationshipDiagram characters={book.characters} relationships={book.relationships} />
              </div>
            </div>
          )}

          <SpoilerBlock body={book.afterReading} />

          <div style={{ marginTop: 22 }}>
            <DetailSectionTitle>Notas personales</DetailSectionTitle>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <textarea
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
                placeholder="Escribe una nota, cita o reflexión…"
                rows={3}
                style={{
                  flex: "1 1 320px",
                  padding: "10px 12px",
                  fontSize: 14,
                  fontFamily: "inherit",
                  background: alpha(COLORS.bgCard, 0.86),
                  border: `1px solid ${alpha(COLORS.border, 0.95)}`,
                  borderRadius: 16,
                  color: COLORS.text,
                  resize: "vertical",
                  outline: "none",
                  minHeight: 80,
                }}
              />
              <button
                onClick={() => {
                  addNote(book.id, noteText);
                  setNoteText("");
                }}
                disabled={!noteText.trim()}
                style={{
                  minWidth: 120,
                  padding: "10px 16px",
                  fontSize: 12,
                  fontFamily: UI_FONT,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: noteText.trim() ? COLORS.gold : COLORS.border,
                  color: noteText.trim() ? COLORS.bgMain : COLORS.textMuted,
                  border: "none",
                  borderRadius: 16,
                  cursor: noteText.trim() ? "pointer" : "default",
                  alignSelf: "flex-end",
                }}
              >
                Guardar
              </button>
            </div>

            {bookState.notes?.length > 0 && (
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                {[...bookState.notes].reverse().map((note, index) => {
                  const realIndex = bookState.notes.length - 1 - index;
                  return (
                    <div
                      key={index}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 16,
                        background: alpha(COLORS.bgCard, 0.84),
                        border: `1px solid ${alpha(COLORS.border, 0.95)}`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          alignItems: "center",
                          marginBottom: 6,
                        }}
                      >
                        <span style={{ fontSize: 11, color: COLORS.textMuted }}>
                          {new Date(note.date).toLocaleDateString()} ·{" "}
                          {new Date(note.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <button
                          onClick={() => deleteNote(book.id, realIndex)}
                          style={{
                            fontSize: 10,
                            border: "none",
                            background: "transparent",
                            color: COLORS.textMuted,
                            cursor: "pointer",
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                      <div style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.textDesc, whiteSpace: "pre-wrap" }}>
                        {note.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <SourcesDisclosure groups={sourceGroups} />
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          ...actionButtonStyle,
          marginTop: 20,
          width: "100%",
          justifyContent: "center",
          color: COLORS.textMuted,
        }}
      >
        Cerrar
      </button>
    </ModalShell>
  );
}

export default BookDetailModal;
