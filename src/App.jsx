import { useState, useEffect, useCallback } from "react";
import { NOVELS, THEMES } from "./data.js";
import { COLORS } from "./theme.js";
import CoverArt from "./components/CoverArt.jsx";
import StatsBar from "./components/StatsBar.jsx";

const STORAGE_KEY = "dostoevsky-read";

export default function App() {
  const [bookStates, setBookStates] = useState({});
  const [activeThemes, setActiveThemes] = useState(new Set());
  const [selectedBook, setSelectedBook] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [sortBy, setSortBy] = useState("year");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Migration: old format was array of IDs → all "terminado"
          const migrated = {};
          parsed.forEach((id) => { migrated[id] = { status: "terminado" }; });
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

  useEffect(() => {
    if (!selectedBook) return;
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") setSelectedBook(null); };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [selectedBook]);

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

  const setBookStatus = (id, status, chapter = null) => {
    setBookStates((prev) => {
      const next = { ...prev };
      if (status === "no-leido") {
        delete next[id];
      } else {
        next[id] = { status };
        if (status === "en-progreso" && chapter != null) {
          next[id].chapter = chapter;
        }
      }
      saveStates(next);
      return next;
    });
  };

  const toggleTheme = (t) => {
    setActiveThemes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const filtered = NOVELS.filter(
    (n) => (!searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()))
      && (activeThemes.size === 0 || n.themes.some((t) => activeThemes.has(t)))
  ).sort((a, b) =>
    sortBy === "year"
      ? a.year - b.year
      : sortBy === "pages"
      ? a.pages - b.pages
      : a.title.localeCompare(b.title)
  );

  const getProportionalPages = (novel) => {
    const ch = getChapter(novel.id);
    if (!ch || !novel.chapters) return 0;
    return Math.round((ch / novel.chapters) * novel.pages);
  };

  const totalPages = NOVELS.reduce((s, n) => s + n.pages, 0);
  const finishedPages = NOVELS.filter((n) => isFinished(n.id)).reduce((s, n) => s + n.pages, 0);
  const inProgressPages = NOVELS.filter((n) => isInProgress(n.id)).reduce((s, n) => s + getProportionalPages(n), 0);
  const readPages = finishedPages + inProgressPages;
  const finishedCount = NOVELS.filter((n) => isFinished(n.id)).length;
  const inProgressCount = NOVELS.filter((n) => isInProgress(n.id)).length;
  const remainPages = totalPages - readPages;

  if (!loaded) {
    return (
      <div style={{ background: COLORS.bgMain, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.gold }}>
        Cargando…
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.bgMain, minHeight: "100vh", color: COLORS.text }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${COLORS.border}`, padding: "28px 24px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: COLORS.textSecondary, marginBottom: 8 }}>
          ni idea, estaba leyendo a
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: COLORS.gold, margin: "0 0 4px", lineHeight: 1.1 }}>
          Fiódor Dostoievski
        </h1>
        <div style={{ fontSize: 14, fontStyle: "italic", color: COLORS.textSecondary }}>
          Фёдор Михайлович Достоевский · 1821–1881
        </div>
      </div>

      {/* Stats Panel */}
      <div style={{ padding: "20px 24px", borderBottom: `1px solid ${COLORS.bgCardRead}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 16, maxWidth: 700, margin: "0 auto" }}>
          {[
            { label: "Terminadas", value: `${finishedCount}/${NOVELS.length}` },
            { label: "En progreso", value: inProgressCount, color: inProgressCount > 0 ? COLORS.inProgress : undefined },
            { label: "Páginas leídas", value: readPages.toLocaleString() },
            { label: "Páginas restantes", value: remainPages.toLocaleString() },
            { label: "Progreso", value: `${totalPages > 0 ? Math.round((readPages / totalPages) * 100) : 0}%` },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: color || COLORS.gold }}>{value}</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 700, margin: "14px auto 0" }}>
          <StatsBar read={finishedPages} inProgress={inProgressPages} total={totalPages} />
        </div>
      </div>

      {/* Search + Theme Filters */}
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${COLORS.bgCardRead}` }}>
        <div style={{ maxWidth: 400, margin: "0 auto 12px" }}>
          <input
            type="text"
            placeholder="Buscar por título…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%", padding: "8px 14px", fontSize: 14,
              background: COLORS.bgModal, border: `1px solid ${COLORS.border}`, borderRadius: 8,
              color: COLORS.text, outline: "none", fontFamily: "inherit",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textMuted, marginRight: 4 }}>Filtrar:</span>
          {Object.entries(THEMES).map(([key, { label, color }]) => {
            const active = activeThemes.has(key);
            return (
              <button
                key={key}
                onClick={() => toggleTheme(key)}
                aria-pressed={active}
                style={{
                  padding: "4px 12px",
                  fontSize: 12,
                  border: `1px solid ${active ? color : COLORS.border}`,
                  borderRadius: 20,
                  background: active ? color + "22" : "transparent",
                  color: active ? color : COLORS.textLabel,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            );
          })}
          {(activeThemes.size > 0 || searchQuery) && (
            <button
              onClick={() => { setActiveThemes(new Set()); setSearchQuery(""); }}
              style={{ padding: "4px 10px", fontSize: 11, border: "none", background: "transparent", color: COLORS.gold, cursor: "pointer", textDecoration: "underline" }}
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Sort */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 10 }}>
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textMuted }}>Ordenar:</span>
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
                fontSize: 12,
                border: "none",
                background: "transparent",
                color: sortBy === key ? COLORS.gold : COLORS.textLabel,
                cursor: "pointer",
                textDecoration: sortBy === key ? "underline" : "none",
                padding: "2px 4px",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 24, maxWidth: 900, margin: "0 auto" }}>
        {filtered.map((novel) => {
          const status = getStatus(novel.id);
          const finished = status === "terminado";
          const inProg = status === "en-progreso";
          return (
            <div
              key={novel.id}
              className="book-card"
              style={{ cursor: "pointer", transition: "transform 0.2s, opacity 0.2s, box-shadow 0.2s", opacity: finished ? 1 : inProg ? 0.9 : 0.75, animation: "fadeIn 0.3s ease" }}
              onClick={() => setSelectedBook(novel)}
            >
              <div style={{
                aspectRatio: "200/280",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: finished
                  ? "0 4px 20px rgba(212,168,83,0.15)"
                  : inProg
                  ? "0 4px 16px rgba(90,138,106,0.15)"
                  : "0 2px 10px rgba(0,0,0,0.3)",
                border: finished
                  ? `1px solid ${COLORS.borderRead}`
                  : inProg
                  ? `1px solid ${COLORS.borderInProgress}`
                  : `1px solid ${COLORS.bgCardRead}`,
                position: "relative",
              }}>
                <CoverArt type={novel.cover} status={status} title={novel.title} />
                <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: 10, color: COLORS.textSecondary, letterSpacing: 1 }}>
                  {novel.year}
                </div>
                {finished && (
                  <div style={{
                    position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%",
                    background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, color: COLORS.bgMain, fontWeight: 700,
                  }}>
                    ✓
                  </div>
                )}
                {inProg && (
                  <div style={{
                    position: "absolute", top: 8, right: 8, minWidth: 20, height: 20, borderRadius: 10,
                    background: COLORS.inProgress, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, color: "#fff", fontWeight: 700, padding: "0 4px",
                  }}>
                    {getChapter(novel.id) ? `${getChapter(novel.id)}/${novel.chapters}` : "…"}
                  </div>
                )}
              </div>
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: finished ? COLORS.gold : inProg ? COLORS.inProgress : COLORS.textBook, lineHeight: 1.3 }}>
                {novel.title}
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>
                {novel.pages} págs
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, color: COLORS.textMuted, fontStyle: "italic" }}>
          Ninguna novela coincide con los filtros seleccionados.
        </div>
      )}

      {/* Acerca de */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "40px 24px", maxWidth: 700, margin: "20px auto 0" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 16, textAlign: "center" }}>
          Acerca de
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.8, color: COLORS.textSecondary }}>
          <p style={{ margin: "0 0 12px" }}>
            Esta página es un registro personal de lectura dedicado a la obra de <span style={{ color: COLORS.gold }}>Fiódor Mijáilovich Dostoievski</span> (1821–1881), considerado uno de los más grandes novelistas de la literatura universal. Su exploración de la psicología humana, la moralidad y el sufrimiento sigue siendo profundamente relevante.
          </p>
          <p style={{ margin: "0 0 12px" }}>
            Desarrollada por{" "}
            <a
              href="https://github.com/facundoraulbistolfi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: COLORS.gold, textDecoration: "underline" }}
            >
              Facundo Raúl Bistolfi
            </a>.
          </p>
          <p style={{ margin: 0, fontSize: 12, color: COLORS.textMuted, fontStyle: "italic" }}>
            Hecha con Claude Code.
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBook && (() => {
        const status = getStatus(selectedBook.id);
        const chapter = getChapter(selectedBook.id);
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle: ${selectedBook.title}`}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex",
              alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20,
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setSelectedBook(null)}
          >
            <div
              style={{
                background: COLORS.bgModal, borderRadius: 12, maxWidth: 520, width: "100%", padding: 28,
                border: `1px solid ${COLORS.border}`, maxHeight: "90vh", overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ width: 120, minWidth: 120 }}>
                  <div style={{ aspectRatio: "200/280", borderRadius: 4, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
                    <CoverArt type={selectedBook.cover} status={status} title={selectedBook.title} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.gold, margin: "0 0 4px", lineHeight: 1.2 }}>
                    {selectedBook.title}
                  </h2>
                  <div style={{ fontSize: 13, color: COLORS.textSecondary, fontStyle: "italic", marginBottom: 8 }}>
                    {selectedBook.titleOrig} · {selectedBook.year}
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.textBook, marginBottom: 4 }}>
                    {selectedBook.pages} páginas · {selectedBook.chapters} capítulos
                  </div>
                  {selectedBook.location && (
                    <div style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 12 }}>
                      Ambientación: {selectedBook.location}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {selectedBook.themes.map((t) => (
                      <span key={t} style={{
                        padding: "2px 10px", fontSize: 11, borderRadius: 12,
                        background: THEMES[t].color + "22", color: THEMES[t].color,
                        border: `1px solid ${THEMES[t].color}44`,
                      }}>
                        {THEMES[t].label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textDesc, margin: "20px 0" }}>
                {selectedBook.desc}
              </p>

              {/* Written Context */}
              {selectedBook.writtenContext && (
                <div style={{ margin: "16px 0", padding: "12px 16px", background: COLORS.bgCard, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 6 }}>
                    Contexto histórico
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: COLORS.textSecondary, margin: 0, fontStyle: "italic" }}>
                    {selectedBook.writtenContext}
                  </p>
                </div>
              )}

              {/* Characters */}
              {selectedBook.characters?.length > 0 && (
                <div style={{ margin: "16px 0" }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 10 }}>
                    Personajes principales
                  </div>
                  {selectedBook.characters.map((c) => (
                    <div key={c.name} style={{ marginBottom: 8, fontSize: 13, lineHeight: 1.5 }}>
                      <span style={{ color: COLORS.gold, fontWeight: 600 }}>{c.name}</span>
                      <span style={{ color: COLORS.textSecondary }}> — {c.desc}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Reading state slider */}
              <div style={{ margin: "20px 0 0" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textMuted, marginBottom: 10 }}>
                  Estado de lectura
                </div>
                {(() => {
                  const maxCh = selectedBook.chapters;
                  const sliderValue = status === "terminado" ? maxCh : status === "en-progreso" ? (chapter || 1) : 0;
                  const pct = maxCh > 0 ? (sliderValue / maxCh) * 100 : 0;
                  const activeColor = sliderValue === 0 ? COLORS.textLabel : sliderValue === maxCh ? COLORS.gold : COLORS.inProgress;
                  const statusLabel = sliderValue === 0 ? "No leído" : sliderValue === maxCh ? "Terminado" : "En progreso";
                  return (
                    <>
                      <div style={{ position: "relative", padding: "8px 0" }}>
                        <style>{`
                          input[type="range"].reading-slider {
                            -webkit-appearance: none;
                            appearance: none;
                            width: 100%;
                            height: 6px;
                            border-radius: 3px;
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
                            cursor: pointer;
                            margin-top: -1px;
                          }
                          input[type="range"].reading-slider::-moz-range-thumb {
                            width: 22px;
                            height: 22px;
                            border-radius: 50%;
                            border: 2px solid currentColor;
                            cursor: pointer;
                          }
                        `}</style>
                        <input
                          type="range"
                          className="reading-slider"
                          min={0}
                          max={maxCh}
                          step={1}
                          value={sliderValue}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (val === 0) {
                              setBookStatus(selectedBook.id, "no-leido");
                            } else if (val === maxCh) {
                              setBookStatus(selectedBook.id, "terminado");
                            } else {
                              setBookStatus(selectedBook.id, "en-progreso", val);
                            }
                          }}
                          style={{
                            background: `linear-gradient(to right, ${activeColor} ${pct}%, ${COLORS.border} ${pct}%)`,
                            color: activeColor,
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: activeColor }}>
                          {sliderValue === maxCh ? "✓ " : ""}{statusLabel}
                        </span>
                        <span style={{ fontSize: 12, color: COLORS.textMuted }}>
                          {sliderValue} / {maxCh} capítulos
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <button
                onClick={() => setSelectedBook(null)}
                style={{
                  width: "100%", padding: "10px", fontSize: 13,
                  border: "none", background: "transparent", color: COLORS.textMuted,
                  cursor: "pointer", marginTop: 16, fontFamily: "inherit",
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
