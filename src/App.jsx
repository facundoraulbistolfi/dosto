import { useState, useEffect, useCallback } from "react";
import { NOVELS, THEMES, WORK_TYPES } from "./expandedData.js";
import { COLORS, alpha } from "./theme.js";
import CoverArt from "./components/CoverArt.jsx";
import StatsBar from "./components/StatsBar.jsx";
import RelationshipDiagram from "./components/RelationshipDiagram.jsx";
import Timeline from "./components/Timeline.jsx";

const STORAGE_KEY = "dostoevsky-read";
const UI_FONT = "'Manrope', 'Avenir Next', 'Segoe UI', sans-serif";

const APP_CSS = `
  .app-shell {
    padding: clamp(18px, 3.2vw, 36px);
  }

  .app-content {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .intro-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr);
    gap: 28px;
    align-items: end;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px;
    margin-top: 22px;
  }

  .reading-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }

  .reading-item {
    border: 1px solid rgba(54, 64, 81, 0.9);
    border-radius: 18px;
    background: rgba(9, 13, 20, 0.82);
    padding: 12px;
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    text-align: left;
    cursor: pointer;
    transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
  }

  .reading-item:hover {
    transform: translateY(-2px);
    border-color: rgba(127, 164, 141, 0.72);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
  }

  .filters-top {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 18px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }

  .filters-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .filter-line {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }

  .book-poster {
    position: relative;
    display: grid;
    grid-template-columns: minmax(154px, 182px) minmax(0, 1fr);
    gap: 18px;
    align-items: start;
    padding: 18px;
    border-radius: 24px;
    border: 1px solid rgba(54, 64, 81, 0.92);
    background:
      linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 22%),
      rgba(13, 17, 25, 0.92);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
    overflow: hidden;
  }

  .book-poster::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(255,255,255,0.04), transparent 40%);
    pointer-events: none;
  }

  .book-poster:hover {
    transform: translateY(-4px);
    border-color: rgba(220, 180, 109, 0.58);
    box-shadow: 0 24px 54px rgba(0, 0, 0, 0.28);
  }

  .book-poster:hover .cover-frame {
    transform: translateY(-3px) scale(1.012);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.04),
      0 18px 38px rgba(0, 0, 0, 0.28);
  }

  .book-poster:hover .cover-media {
    transform: scale(1.018);
  }

  .book-poster:hover .cover-polish {
    opacity: 1;
  }

  .book-cover-shell {
    width: 100%;
    aspect-ratio: 200 / 280;
    border-radius: 10px;
    overflow: hidden;
  }

  .book-title {
    font-size: clamp(24px, 2.3vw, 29px);
    line-height: 1.02;
    margin: 0;
    color: ${COLORS.textBook};
  }

  .book-description {
    margin: 0;
    font-size: 15px;
    line-height: 1.62;
    color: ${COLORS.textDesc};
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta-label {
    font-family: ${UI_FONT};
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: 24px;
    align-items: start;
  }

  .detail-section-title {
    font-family: ${UI_FONT};
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${COLORS.textMuted};
    margin-bottom: 10px;
  }

  @media (max-width: 1080px) {
    .intro-grid {
      grid-template-columns: 1fr;
    }

    .metrics-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .reading-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .catalog-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 760px) {
    .metrics-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .reading-grid {
      grid-template-columns: 1fr;
    }

    .book-poster {
      grid-template-columns: 1fr;
      padding: 16px;
      gap: 16px;
    }

    .book-cover-shell {
      width: min(220px, 100%);
      margin: 0 auto;
    }

    .detail-grid {
      grid-template-columns: 1fr;
    }
  }
`;

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

function MetricCard({ label, value, color = COLORS.gold }) {
  return (
    <div
      style={{
        padding: "14px 14px 12px",
        borderRadius: 18,
        border: `1px solid ${alpha(COLORS.border, 0.95)}`,
        background: alpha(COLORS.bgCard, 0.88),
        boxShadow: `inset 0 1px 0 ${alpha(COLORS.text, 0.03)}`,
      }}
    >
      <div style={{ fontSize: 26, lineHeight: 1, color, marginBottom: 6 }}>{value}</div>
      <div
        style={{
          fontFamily: UI_FONT,
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: COLORS.textMuted,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function truncate(text, maxLength = 190) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

export default function App() {
  const [bookStates, setBookStates] = useState({});
  const [activeThemes, setActiveThemes] = useState(new Set());
  const [activeTypes, setActiveTypes] = useState(new Set());
  const [selectedBook, setSelectedBook] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [sortBy, setSortBy] = useState("year");
  const [searchQuery, setSearchQuery] = useState("");
  const [noteText, setNoteText] = useState("");
  const [showTimeline, setShowTimeline] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const migrated = {};
          parsed.forEach((id) => {
            migrated[id] = { status: "terminado" };
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          setBookStates(migrated);
        } else {
          setBookStates(parsed);
        }
      }
    } catch {
      // first visit
    }
    setLoaded(true);
  }, []);

  const filtered = NOVELS.filter(
    (novel) =>
      (!searchQuery || novel.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeThemes.size === 0 || novel.themes.some((theme) => activeThemes.has(theme))) &&
      (activeTypes.size === 0 || activeTypes.has(novel.type)),
  ).sort((a, b) =>
    sortBy === "year"
      ? a.year - b.year
      : sortBy === "pages"
        ? a.pages - b.pages
        : a.title.localeCompare(b.title),
  );

  useEffect(() => {
    if (!selectedBook) return;

    document.body.style.overflow = "hidden";
    const handler = (event) => {
      if (event.key === "Escape") setSelectedBook(null);
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const index = filtered.findIndex((novel) => novel.id === selectedBook.id);
        if (index === -1) return;
        const nextIndex = event.key === "ArrowLeft" ? index - 1 : index + 1;
        if (nextIndex >= 0 && nextIndex < filtered.length) setSelectedBook(filtered[nextIndex]);
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [selectedBook, filtered]);

  const saveStates = useCallback((states) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    } catch {
      // storage unavailable
    }
  }, []);

  const getStatus = (id) => bookStates[id]?.status || "no-leido";
  const isFinished = (id) => getStatus(id) === "terminado";
  const isInProgress = (id) => getStatus(id) === "en-progreso";
  const getChapter = (id) => bookStates[id]?.chapter || null;

  const openBook = (novel) => {
    setSelectedBook(novel);
    setNoteText("");
  };

  const closeBook = () => {
    setSelectedBook(null);
    setNoteText("");
  };

  const setBookStatus = (id, status, chapter = null) => {
    setBookStates((prev) => {
      const next = { ...prev };
      if (status === "no-leido") {
        delete next[id];
      } else {
        const existing = prev[id] || {};
        next[id] = { ...existing, status };
        if (status === "en-progreso") {
          if (chapter != null) next[id].chapter = chapter;
          if (!existing.startedDate) next[id].startedDate = new Date().toISOString();
        }
        if (status === "terminado") {
          if (!existing.startedDate) next[id].startedDate = new Date().toISOString();
          next[id].finishedDate = new Date().toISOString();
        }
      }
      saveStates(next);
      return next;
    });
  };

  const addNote = (id, text) => {
    if (!text.trim()) return;
    setBookStates((prev) => {
      const next = { ...prev };
      const existing = prev[id] || { status: "no-leido" };
      const notes = existing.notes ? [...existing.notes] : [];
      notes.push({ text: text.trim(), date: new Date().toISOString() });
      next[id] = { ...existing, notes };
      saveStates(next);
      return next;
    });
  };

  const deleteNote = (id, noteIndex) => {
    setBookStates((prev) => {
      const next = { ...prev };
      const existing = prev[id];
      if (!existing?.notes) return prev;
      const notes = existing.notes.filter((_, index) => index !== noteIndex);
      next[id] = { ...existing, notes };
      saveStates(next);
      return next;
    });
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(bookStates, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dosto-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (fileEvent) => {
        try {
          const data = JSON.parse(fileEvent.target.result);
          if (typeof data !== "object" || Array.isArray(data)) return;
          const validIds = new Set(NOVELS.map((novel) => novel.id));
          const cleaned = {};
          for (const [key, value] of Object.entries(data)) {
            if (validIds.has(key) && value?.status) cleaned[key] = value;
          }
          setBookStates(cleaned);
          saveStates(cleaned);
        } catch {
          // invalid file
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const getProportionalPages = (novel) => {
    const chapter = getChapter(novel.id);
    if (!chapter || !novel.chapters) return 0;
    return Math.round((chapter / novel.chapters) * novel.pages);
  };

  const totalPages = NOVELS.reduce((sum, novel) => sum + novel.pages, 0);
  const finishedPages = NOVELS.filter((novel) => isFinished(novel.id)).reduce((sum, novel) => sum + novel.pages, 0);
  const inProgressPages = NOVELS.filter((novel) => isInProgress(novel.id)).reduce((sum, novel) => sum + getProportionalPages(novel), 0);
  const readPages = finishedPages + inProgressPages;
  const finishedCount = NOVELS.filter((novel) => isFinished(novel.id)).length;
  const inProgressCount = NOVELS.filter((novel) => isInProgress(novel.id)).length;
  const remainPages = totalPages - readPages;
  const readingPct = totalPages > 0 ? Math.round((readPages / totalPages) * 100) : 0;
  const hasActiveFilters = activeThemes.size > 0 || activeTypes.size > 0 || Boolean(searchQuery);

  const inProgressBooks = NOVELS.filter((novel) => isInProgress(novel.id))
    .sort((a, b) => {
      const dateA = bookStates[a.id]?.startedDate ? new Date(bookStates[a.id].startedDate).getTime() : 0;
      const dateB = bookStates[b.id]?.startedDate ? new Date(bookStates[b.id].startedDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3);

  const copyShareSummary = () => {
    const finished = NOVELS.filter((novel) => isFinished(novel.id));
    const inProgress = NOVELS.filter((novel) => isInProgress(novel.id));
    let text = `Mis lecturas de Dostoievski: ${finished.length}/${NOVELS.length} terminadas, ${inProgress.length} en progreso. Páginas: ${readPages.toLocaleString()}/${totalPages.toLocaleString()} (${readingPct}%).`;
    if (finished.length > 0) {
      text += `\nTerminadas: ${finished.map((novel) => novel.title).join(", ")}.`;
    }
    if (inProgress.length > 0) {
      text += `\nLeyendo: ${inProgress
        .map((novel) => {
          const chapter = getChapter(novel.id);
          return chapter ? `${novel.title} (cap. ${chapter}/${novel.chapters})` : novel.title;
        })
        .join(", ")}.`;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  const toggleTheme = (theme) => {
    setActiveThemes((prev) => {
      const next = new Set(prev);
      if (next.has(theme)) next.delete(theme);
      else next.add(theme);
      return next;
    });
  };

  const toggleType = (type) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const panelStyle = {
    background:
      `linear-gradient(180deg, ${alpha(COLORS.text, 0.018)} 0%, transparent 24%), ${alpha(COLORS.bgModal, 0.96)}`,
    border: `1px solid ${alpha(COLORS.border, 0.96)}`,
    borderRadius: 26,
    boxShadow: `0 18px 40px ${alpha("#000000", 0.22)}`,
    position: "relative",
    overflow: "hidden",
  };

  const actionButtonStyle = {
    padding: "10px 16px",
    fontSize: 12,
    fontFamily: UI_FONT,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    border: `1px solid ${alpha(COLORS.border, 0.92)}`,
    borderRadius: 999,
    background: alpha(COLORS.bgCard, 0.74),
    color: COLORS.textSecondary,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const getBookAccent = (status) => {
    if (status === "terminado") return COLORS.gold;
    if (status === "en-progreso") return COLORS.inProgress;
    return COLORS.textBook;
  };

  if (!loaded) {
    return (
      <div
        style={{
          background: COLORS.bgMain,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.gold,
        }}
      >
        Cargando…
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        color: COLORS.text,
        background:
          `radial-gradient(circle at top, ${alpha(COLORS.goldAccent, 0.06)} 0%, transparent 34%), ${COLORS.bgMain}`,
      }}
    >
      <style>{APP_CSS}</style>

      <div className="app-shell">
        <div className="app-content">
          <section style={{ ...panelStyle, padding: "24px clamp(18px, 3vw, 30px) 22px" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  `radial-gradient(circle at top right, ${alpha(COLORS.goldAccent, 0.1)} 0%, transparent 34%)`,
              }}
            />

            <div className="intro-grid" style={{ position: "relative", zIndex: 1 }}>
              <div>
                <SectionEyebrow>Biblioteca personal</SectionEyebrow>
                <h1
                  style={{
                    fontSize: "clamp(42px, 7vw, 64px)",
                    lineHeight: 0.95,
                    margin: "10px 0 10px",
                    color: COLORS.goldAccent,
                  }}
                >
                  Fiódor
                  <br />
                  Dostoievski
                </h1>
                <div
                  style={{
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: COLORS.textSecondary,
                    maxWidth: 560,
                  }}
                >
                  Un registro de lectura para recorrer novelas, novelas cortas y cuentos con más contexto, mejor seguimiento y una vista más clara en desktop.
                </div>
              </div>

              <div
                style={{
                  justifySelf: "stretch",
                  padding: "18px 18px 16px",
                  borderRadius: 22,
                  border: `1px solid ${alpha(COLORS.border, 0.88)}`,
                  background: alpha(COLORS.bgCard, 0.76),
                }}
              >
                <SectionEyebrow color={COLORS.textLabel}>Archivo</SectionEyebrow>
                <div style={{ fontSize: 27, color: COLORS.textBook, marginTop: 8 }}>
                  32 obras para leer con progreso, notas y contexto.
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: COLORS.textSecondary,
                  }}
                >
                  Vista rápida de lectura, línea temporal, relaciones entre personajes e importación/exportación de avances desde la misma página.
                </div>
              </div>
            </div>

            <div className="metrics-grid" style={{ position: "relative", zIndex: 1 }}>
              <MetricCard label="Terminadas" value={`${finishedCount}/${NOVELS.length}`} color={COLORS.goldAccent} />
              <MetricCard label="En progreso" value={inProgressCount} color={inProgressCount > 0 ? COLORS.inProgress : COLORS.textBook} />
              <MetricCard label="Páginas leídas" value={readPages.toLocaleString()} color={COLORS.textBook} />
              <MetricCard label="Páginas restantes" value={remainPages.toLocaleString()} color={COLORS.textSecondary} />
              <MetricCard label="Progreso" value={`${readingPct}%`} color={readingPct > 0 ? COLORS.gold : COLORS.textBook} />
            </div>

            <div style={{ position: "relative", zIndex: 1, marginTop: 18 }}>
              <StatsBar read={finishedPages} inProgress={inProgressPages} total={totalPages} />
            </div>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  fontFamily: UI_FONT,
                  fontSize: 12,
                  color: COLORS.textSecondary,
                  letterSpacing: "0.04em",
                }}
              >
                {finishedCount} terminadas, {inProgressCount} activas, {readingPct}% del archivo recorrido.
              </div>
              <button
                onClick={() => setShowTimeline((value) => !value)}
                style={{
                  ...actionButtonStyle,
                  color: showTimeline ? COLORS.goldAccent : COLORS.textSecondary,
                  borderColor: showTimeline ? alpha(COLORS.goldDim, 0.7) : alpha(COLORS.border, 0.92),
                }}
              >
                {showTimeline ? "Ocultar cronología" : "Mostrar cronología"}
              </button>
            </div>

            {inProgressBooks.length > 0 && (
              <div style={{ position: "relative", zIndex: 1, marginTop: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <SectionEyebrow color={COLORS.inProgress}>En lectura</SectionEyebrow>
                  <div
                    style={{
                      fontFamily: UI_FONT,
                      fontSize: 12,
                      color: COLORS.textSecondary,
                    }}
                  >
                    Hasta tres lecturas activas con acceso directo al detalle.
                  </div>
                </div>

                <div className="reading-grid">
                  {inProgressBooks.map((novel) => {
                    const chapter = getChapter(novel.id) || 1;
                    const chapterPct = novel.chapters ? Math.round((chapter / novel.chapters) * 100) : 0;

                    return (
                      <button
                        key={novel.id}
                        type="button"
                        className="reading-item"
                        onClick={() => openBook(novel)}
                        aria-label={`Abrir ${novel.title}`}
                        style={{ fontFamily: "inherit" }}
                      >
                        <div
                          style={{
                            aspectRatio: "200 / 280",
                            borderRadius: 10,
                            overflow: "hidden",
                            border: `1px solid ${alpha(COLORS.borderInProgress, 0.9)}`,
                            boxShadow: `0 10px 24px ${alpha("#000000", 0.25)}`,
                          }}
                        >
                          <CoverArt type={novel.cover} status="en-progreso" title={novel.title} />
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: 21,
                              lineHeight: 1.05,
                              color: COLORS.textBook,
                              marginBottom: 4,
                            }}
                          >
                            {novel.title}
                          </div>
                          <div
                            style={{
                              fontFamily: UI_FONT,
                              fontSize: 11,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: COLORS.inProgress,
                              marginBottom: 10,
                            }}
                          >
                            {WORK_TYPES[novel.type]?.label} · {novel.year}
                          </div>
                          <div style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 8 }}>
                            Capítulo {chapter} de {novel.chapters} · {chapterPct}% del libro
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: 6,
                              borderRadius: 999,
                              background: alpha(COLORS.border, 0.85),
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${chapterPct}%`,
                                height: "100%",
                                background: `linear-gradient(90deg, ${COLORS.inProgressDim}, ${COLORS.inProgress})`,
                                boxShadow: `0 0 14px ${alpha(COLORS.inProgress, 0.3)}`,
                              }}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {showTimeline && (
            <section style={{ ...panelStyle, padding: "16px 16px 18px" }}>
              <div style={{ padding: "0 8px 10px" }}>
                <SectionEyebrow>Cronología</SectionEyebrow>
                <div style={{ fontSize: 15, color: COLORS.textSecondary, marginTop: 6 }}>
                  Un mismo eje temporal para obras, vida y contexto ruso; el color separa categorías y el estado de lectura queda como señal secundaria en las obras.
                </div>
              </div>
              <Timeline novels={NOVELS} bookStates={bookStates} onSelectBook={openBook} />
            </section>
          )}

          <section style={{ ...panelStyle, padding: "18px clamp(18px, 2.8vw, 26px)" }}>
            <div className="filters-top">
              <div>
                <SectionEyebrow>Catálogo</SectionEyebrow>
                <div style={{ fontSize: 28, color: COLORS.textBook, marginTop: 6 }}>
                  {filtered.length} {filtered.length === 1 ? "obra visible" : "obras visibles"}
                </div>
              </div>

              <div style={{ width: "min(360px, 100%)" }}>
                <input
                  type="text"
                  aria-label="Buscar novelas por título"
                  placeholder="Buscar por título…"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    fontSize: 14,
                    fontFamily: UI_FONT,
                    background: alpha(COLORS.bgCard, 0.86),
                    border: `1px solid ${alpha(COLORS.border, 0.95)}`,
                    borderRadius: 16,
                    color: COLORS.text,
                    outline: "none",
                    boxShadow: `inset 0 1px 0 ${alpha(COLORS.text, 0.04)}`,
                  }}
                />
              </div>
            </div>

            <div className="filters-body">
              <div className="filter-line">
                <span className="meta-label" style={{ color: COLORS.textMuted, minWidth: 54 }}>
                  Tipo
                </span>
                {Object.entries(WORK_TYPES).map(([key, { label, color }]) => {
                  const active = activeTypes.has(key);
                  const count = NOVELS.filter((novel) => novel.type === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => toggleType(key)}
                      aria-pressed={active}
                      style={{
                        padding: "8px 12px",
                        fontSize: 12,
                        fontFamily: UI_FONT,
                        border: `1px solid ${active ? color : alpha(COLORS.border, 0.95)}`,
                        borderRadius: 999,
                        background: active ? alpha(color, 0.18) : "transparent",
                        color: active ? color : COLORS.textSecondary,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {label} ({count})
                    </button>
                  );
                })}
              </div>

              <div className="filter-line">
                <span className="meta-label" style={{ color: COLORS.textMuted, minWidth: 54 }}>
                  Tema
                </span>
                {Object.entries(THEMES).map(([key, { label, color }]) => {
                  const active = activeThemes.has(key);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleTheme(key)}
                      aria-pressed={active}
                      style={{
                        padding: "8px 12px",
                        fontSize: 12,
                        fontFamily: UI_FONT,
                        border: `1px solid ${active ? color : alpha(COLORS.border, 0.95)}`,
                        borderRadius: 999,
                        background: active ? alpha(color, 0.18) : "transparent",
                        color: active ? color : COLORS.textSecondary,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}

                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setActiveThemes(new Set());
                      setActiveTypes(new Set());
                      setSearchQuery("");
                    }}
                    style={{
                      ...actionButtonStyle,
                      padding: "8px 12px",
                      color: COLORS.goldAccent,
                      borderColor: alpha(COLORS.goldDim, 0.55),
                    }}
                  >
                    Limpiar
                  </button>
                )}
              </div>

              <div className="filter-line">
                <span className="meta-label" style={{ color: COLORS.textMuted, minWidth: 54 }}>
                  Orden
                </span>
                {[
                  { key: "year", label: "Año" },
                  { key: "pages", label: "Páginas" },
                  { key: "title", label: "Título" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    aria-pressed={sortBy === key}
                    style={{
                      padding: "8px 12px",
                      fontSize: 12,
                      fontFamily: UI_FONT,
                      border: `1px solid ${sortBy === key ? alpha(COLORS.goldDim, 0.7) : alpha(COLORS.border, 0.95)}`,
                      borderRadius: 999,
                      background: sortBy === key ? alpha(COLORS.gold, 0.14) : "transparent",
                      color: sortBy === key ? COLORS.goldAccent : COLORS.textSecondary,
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="catalog-grid">
            {filtered.map((novel) => {
              const status = getStatus(novel.id);
              const finished = status === "terminado";
              const inProgress = status === "en-progreso";
              const chapter = getChapter(novel.id);
              const chapterPct = inProgress && novel.chapters ? Math.round(((chapter || 1) / novel.chapters) * 100) : 0;
              const accent = getBookAccent(status);

              return (
                <article
                  key={novel.id}
                  className="book-poster"
                  role="button"
                  tabIndex={0}
                  aria-label={`${novel.title}, ${novel.year}, ${novel.pages} páginas, ${finished ? "terminado" : inProgress ? "en progreso" : "no leído"}`}
                  onClick={() => openBook(novel)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openBook(novel);
                    }
                  }}
                >
                  <div>
                    <div
                      className="book-cover-shell"
                      style={{
                        border: `1px solid ${
                          finished
                            ? alpha(COLORS.borderRead, 0.95)
                            : inProgress
                              ? alpha(COLORS.borderInProgress, 0.95)
                              : alpha(COLORS.border, 0.92)
                        }`,
                        boxShadow: finished
                          ? `0 16px 34px ${alpha(COLORS.gold, 0.16)}`
                          : inProgress
                            ? `0 16px 34px ${alpha(COLORS.inProgress, 0.16)}`
                            : `0 16px 30px ${alpha("#000000", 0.24)}`,
                      }}
                    >
                      <CoverArt type={novel.cover} status={status} title={novel.title} />
                    </div>
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        alignItems: "baseline",
                        marginBottom: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <h2 className="book-title" style={{ color: accent }}>
                        {novel.title}
                      </h2>
                      <div
                        style={{
                          fontFamily: UI_FONT,
                          fontSize: 12,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: COLORS.textMuted,
                        }}
                      >
                        {novel.year}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: UI_FONT,
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: WORK_TYPES[novel.type]?.color || COLORS.textSecondary,
                        }}
                      >
                        {WORK_TYPES[novel.type]?.label}
                      </span>
                      <span style={{ color: COLORS.textMuted }}>·</span>
                      <span
                        style={{
                          fontFamily: UI_FONT,
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: COLORS.textSecondary,
                        }}
                      >
                        {novel.pages} págs.
                      </span>
                      <span style={{ color: COLORS.textMuted }}>·</span>
                      <span
                        style={{
                          fontFamily: UI_FONT,
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: finished ? COLORS.gold : inProgress ? COLORS.inProgress : COLORS.textMuted,
                        }}
                      >
                        {finished ? "Terminado" : inProgress ? "En progreso" : "No leído"}
                      </span>
                    </div>

                    <p className="book-description">{truncate(novel.desc)}</p>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                      {novel.themes.map((theme) => (
                        <span
                          key={theme}
                          style={{
                            padding: "4px 10px",
                            borderRadius: 999,
                            border: `1px solid ${alpha(THEMES[theme].color, 0.34)}`,
                            background: alpha(THEMES[theme].color, 0.12),
                            color: THEMES[theme].color,
                            fontSize: 11,
                            fontFamily: UI_FONT,
                          }}
                        >
                          {THEMES[theme].label}
                        </span>
                      ))}
                    </div>

                    {inProgress && (
                      <div
                        style={{
                          marginTop: 16,
                          paddingTop: 14,
                          borderTop: `1px solid ${alpha(COLORS.borderInProgress, 0.5)}`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 12,
                            marginBottom: 8,
                            alignItems: "baseline",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: UI_FONT,
                              fontSize: 11,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: COLORS.inProgress,
                            }}
                          >
                            En lectura
                          </span>
                          <span style={{ fontSize: 13, color: COLORS.textSecondary }}>
                            Capítulo {chapter || 1} de {novel.chapters}
                          </span>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: 6,
                            borderRadius: 999,
                            background: alpha(COLORS.border, 0.82),
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${chapterPct}%`,
                              height: "100%",
                              background: `linear-gradient(90deg, ${COLORS.inProgressDim}, ${COLORS.inProgress})`,
                              boxShadow: `0 0 12px ${alpha(COLORS.inProgress, 0.3)}`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </section>

          {filtered.length === 0 && (
            <div
              style={{
                ...panelStyle,
                padding: "34px 24px",
                textAlign: "center",
                color: COLORS.textMuted,
                fontSize: 17,
                fontStyle: "italic",
              }}
            >
              Ninguna obra coincide con los filtros seleccionados.
            </div>
          )}

          <section
            style={{
              ...panelStyle,
              padding: "22px clamp(18px, 2.8vw, 30px)",
              display: "grid",
              gap: 18,
            }}
          >
            <div>
              <SectionEyebrow>Acerca de</SectionEyebrow>
              <div style={{ fontSize: 16, lineHeight: 1.75, color: COLORS.textSecondary, marginTop: 10 }}>
                Esta página reúne el seguimiento personal de lectura dedicado a la obra de{" "}
                <span style={{ color: COLORS.goldAccent }}>Fiódor Mijáilovich Dostoievski</span>, con contexto, notas y progreso persistente en el navegador.
              </div>
              <div style={{ marginTop: 12, fontSize: 14, color: COLORS.textMuted }}>
                Desarrollada por{" "}
                <a
                  href="https://github.com/facundoraulbistolfi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: COLORS.goldAccent, textDecoration: "underline" }}
                >
                  Facundo Raúl Bistolfi
                </a>
                .
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={exportData} style={actionButtonStyle}>
                Exportar datos
              </button>
              <button onClick={importData} style={actionButtonStyle}>
                Importar datos
              </button>
              <button
                onClick={copyShareSummary}
                style={{
                  ...actionButtonStyle,
                  borderColor: copyFeedback ? alpha(COLORS.goldDim, 0.78) : alpha(COLORS.border, 0.92),
                  color: copyFeedback ? COLORS.goldAccent : COLORS.textSecondary,
                }}
              >
                {copyFeedback ? "Copiado" : "Compartir resumen"}
              </button>
            </div>
          </section>
        </div>
      </div>

      {selectedBook && (() => {
        const status = getStatus(selectedBook.id);
        const chapter = getChapter(selectedBook.id);
        const selectedState = bookStates[selectedBook.id] || {};
        const selectedType = WORK_TYPES[selectedBook.type];
        const sliderValue = status === "terminado" ? selectedBook.chapters : status === "en-progreso" ? chapter || 1 : 0;
        const sliderPct = selectedBook.chapters > 0 ? (sliderValue / selectedBook.chapters) * 100 : 0;
        const activeColor = sliderValue === 0 ? COLORS.textLabel : sliderValue === selectedBook.chapters ? COLORS.gold : COLORS.inProgress;
        const statusLabel = sliderValue === 0 ? "No leído" : sliderValue === selectedBook.chapters ? "Terminado" : "En progreso";

        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle: ${selectedBook.title}`}
            style={{
              position: "fixed",
              inset: 0,
              background: alpha("#000000", 0.78),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              padding: 18,
              backdropFilter: "blur(6px)",
            }}
            onClick={closeBook}
          >
            <div
              style={{
                width: "min(920px, 100%)",
                maxHeight: "92vh",
                overflowY: "auto",
                background:
                  `linear-gradient(180deg, ${alpha(COLORS.text, 0.02)} 0%, transparent 26%), ${alpha(COLORS.bgModal, 0.98)}`,
                border: `1px solid ${alpha(COLORS.border, 0.98)}`,
                borderRadius: 28,
                padding: "22px clamp(18px, 3vw, 30px)",
                boxShadow: `0 28px 80px ${alpha("#000000", 0.42)}`,
              }}
              onClick={(event) => event.stopPropagation()}
            >
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
                    <CoverArt type={selectedBook.cover} status={status} title={selectedBook.title} />
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
                    <div className="detail-section-title">Estado de lectura</div>
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
                      max={selectedBook.chapters}
                      step={1}
                      value={sliderValue}
                      onChange={(event) => {
                        const value = parseInt(event.target.value, 10);
                        if (value === 0) {
                          setBookStatus(selectedBook.id, "no-leido");
                        } else if (value === selectedBook.chapters) {
                          setBookStatus(selectedBook.id, "terminado");
                        } else {
                          setBookStatus(selectedBook.id, "en-progreso", value);
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
                        {sliderValue} / {selectedBook.chapters} capítulos
                      </span>
                    </div>

                    {(selectedState.startedDate || selectedState.finishedDate) && (
                      <div style={{ display: "grid", gap: 6, marginTop: 12, fontSize: 12, color: COLORS.textMuted }}>
                        {selectedState.startedDate && (
                          <span>Iniciado: {new Date(selectedState.startedDate).toLocaleDateString()}</span>
                        )}
                        {selectedState.finishedDate && (
                          <span>Terminado: {new Date(selectedState.finishedDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <SectionEyebrow color={getBookAccent(status)}>Ficha</SectionEyebrow>
                  <h2 style={{ fontSize: "clamp(34px, 4vw, 42px)", lineHeight: 0.98, color: getBookAccent(status), margin: "8px 0 10px" }}>
                    {selectedBook.title}
                  </h2>
                  <div style={{ fontSize: 16, color: COLORS.textSecondary, fontStyle: "italic", marginBottom: 12 }}>
                    {selectedBook.titleOrig} · {selectedBook.year}
                  </div>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: 999,
                        border: `1px solid ${alpha(selectedType?.color || COLORS.textSecondary, 0.4)}`,
                        background: alpha(selectedType?.color || COLORS.textSecondary, 0.14),
                        color: selectedType?.color || COLORS.textSecondary,
                        fontFamily: UI_FONT,
                        fontSize: 11,
                      }}
                    >
                      {selectedType?.label}
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
                      {selectedBook.pages} páginas
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
                      {selectedBook.chapters} capítulos
                    </span>
                  </div>

                  {selectedBook.location && (
                    <div style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 16 }}>
                      Ambientación: {selectedBook.location}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                    {selectedBook.themes.map((theme) => (
                      <span
                        key={theme}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: `1px solid ${alpha(THEMES[theme].color, 0.34)}`,
                          background: alpha(THEMES[theme].color, 0.12),
                          color: THEMES[theme].color,
                          fontFamily: UI_FONT,
                          fontSize: 11,
                        }}
                      >
                        {THEMES[theme].label}
                      </span>
                    ))}
                  </div>

                  <p style={{ fontSize: 16, lineHeight: 1.78, color: COLORS.textDesc, margin: "0 0 20px" }}>
                    {selectedBook.desc}
                  </p>

                  {selectedBook.writtenContext && (
                    <div
                      style={{
                        marginBottom: 18,
                        padding: "14px 16px",
                        borderRadius: 18,
                        background: alpha(COLORS.bgCard, 0.84),
                        border: `1px solid ${alpha(COLORS.border, 0.95)}`,
                      }}
                    >
                      <div className="detail-section-title">Contexto histórico</div>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textSecondary, margin: 0, fontStyle: "italic" }}>
                        {selectedBook.writtenContext}
                      </p>
                    </div>
                  )}

                  {selectedBook.characters?.length > 0 && (
                    <div style={{ marginBottom: 18 }}>
                      <div className="detail-section-title">Personajes principales</div>
                      <div style={{ display: "grid", gap: 8 }}>
                        {selectedBook.characters.map((character) => (
                          <div key={character.name} style={{ fontSize: 14, lineHeight: 1.6 }}>
                            <span style={{ color: COLORS.goldAccent, fontWeight: 600 }}>{character.name}</span>
                            <span style={{ color: COLORS.textSecondary }}> — {character.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedBook.relationships?.length > 0 && (
                    <div style={{ marginBottom: 18 }}>
                      <div className="detail-section-title">Relaciones entre personajes</div>
                      <div
                        style={{
                          borderRadius: 18,
                          border: `1px solid ${alpha(COLORS.border, 0.95)}`,
                          background: alpha(COLORS.bgCard, 0.84),
                          overflow: "hidden",
                        }}
                      >
                        <RelationshipDiagram characters={selectedBook.characters} relationships={selectedBook.relationships} />
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: 22 }}>
                    <div className="detail-section-title">Notas personales</div>
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
                          addNote(selectedBook.id, noteText);
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

                    {selectedState.notes?.length > 0 && (
                      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                        {[...selectedState.notes].reverse().map((note, index) => {
                          const realIndex = selectedState.notes.length - 1 - index;
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
                                  onClick={() => deleteNote(selectedBook.id, realIndex)}
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
                </div>
              </div>

              <button
                onClick={closeBook}
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
            </div>
          </div>
        );
      })()}
    </div>
  );
}
