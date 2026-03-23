import { useState, useEffect, useCallback } from "react";
import { NOVELS, THEMES } from "./data.js";
import { COLORS } from "./theme.js";
import CoverArt from "./components/CoverArt.jsx";
import StatsBar from "./components/StatsBar.jsx";

const STORAGE_KEY = "dostoevsky-read";

export default function App() {
  const [readBooks, setReadBooks] = useState(new Set());
  const [activeThemes, setActiveThemes] = useState(new Set());
  const [selectedBook, setSelectedBook] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [sortBy, setSortBy] = useState("year");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReadBooks(new Set(JSON.parse(raw)));
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

  const saveRead = useCallback((newSet) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...newSet]));
    } catch {
      // storage unavailable
    }
  }, []);

  const toggleRead = (id) => {
    setReadBooks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveRead(next);
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

  const totalPages = NOVELS.reduce((s, n) => s + n.pages, 0);
  const readPages = NOVELS.filter((n) => readBooks.has(n.id)).reduce((s, n) => s + n.pages, 0);
  const readCount = readBooks.size;
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
          Biblioteca personal
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 16, maxWidth: 600, margin: "0 auto" }}>
          {[
            { label: "Novelas leídas", value: `${readCount}/${NOVELS.length}` },
            { label: "Páginas leídas", value: readPages.toLocaleString() },
            { label: "Páginas restantes", value: remainPages.toLocaleString() },
            { label: "Progreso", value: `${totalPages > 0 ? Math.round((readPages / totalPages) * 100) : 0}%` },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.gold }}>{value}</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 600, margin: "14px auto 0" }}>
          <StatsBar read={readPages} total={totalPages} />
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
          const isRead = readBooks.has(novel.id);
          return (
            <div
              key={novel.id}
              className="book-card"
              style={{ cursor: "pointer", transition: "transform 0.2s, opacity 0.2s, box-shadow 0.2s", opacity: isRead ? 1 : 0.75, animation: "fadeIn 0.3s ease" }}
              onClick={() => setSelectedBook(novel)}
            >
              <div style={{
                aspectRatio: "200/280",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: isRead ? "0 4px 20px rgba(212,168,83,0.15)" : "0 2px 10px rgba(0,0,0,0.3)",
                border: isRead ? `1px solid ${COLORS.borderRead}` : `1px solid ${COLORS.bgCardRead}`,
                position: "relative",
              }}>
                <CoverArt type={novel.cover} isRead={isRead} title={novel.title} />
                <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: 10, color: COLORS.textSecondary, letterSpacing: 1 }}>
                  {novel.year}
                </div>
                {isRead && (
                  <div style={{
                    position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%",
                    background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, color: COLORS.bgMain, fontWeight: 700,
                  }}>
                    ✓
                  </div>
                )}
              </div>
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: isRead ? COLORS.gold : COLORS.textBook, lineHeight: 1.3 }}>
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

      {/* Detail Modal */}
      {selectedBook && (
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
              background: COLORS.bgModal, borderRadius: 12, maxWidth: 480, width: "100%", padding: 28,
              border: `1px solid ${COLORS.border}`, maxHeight: "90vh", overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ width: 120, minWidth: 120 }}>
                <div style={{ aspectRatio: "200/280", borderRadius: 4, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
                  <CoverArt type={selectedBook.cover} isRead={readBooks.has(selectedBook.id)} title={selectedBook.title} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.gold, margin: "0 0 4px", lineHeight: 1.2 }}>
                  {selectedBook.title}
                </h2>
                <div style={{ fontSize: 13, color: COLORS.textSecondary, fontStyle: "italic", marginBottom: 8 }}>
                  {selectedBook.titleOrig} · {selectedBook.year}
                </div>
                <div style={{ fontSize: 13, color: COLORS.textBook, marginBottom: 12 }}>
                  {selectedBook.pages} páginas
                </div>
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

            <button
              onClick={() => toggleRead(selectedBook.id)}
              style={{
                width: "100%", padding: "12px", fontSize: 14, fontWeight: 600,
                border: readBooks.has(selectedBook.id) ? `1px solid ${COLORS.borderRead}` : `1px solid ${COLORS.gold}`,
                borderRadius: 8, cursor: "pointer", transition: "all 0.2s",
                background: readBooks.has(selectedBook.id) ? "transparent" : COLORS.gold,
                color: readBooks.has(selectedBook.id) ? COLORS.textSecondary : COLORS.bgMain,
              }}
            >
              {readBooks.has(selectedBook.id) ? "✓ Leído — Desmarcar" : "Marcar como leído"}
            </button>

            <button
              onClick={() => setSelectedBook(null)}
              style={{
                width: "100%", padding: "10px", fontSize: 13,
                border: "none", background: "transparent", color: COLORS.textMuted,
                cursor: "pointer", marginTop: 8,
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
