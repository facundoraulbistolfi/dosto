import { useState, useEffect, useCallback } from "react";
import { NOVELS, THEMES, WORK_TYPES } from "./expandedData.js";
import { COLORS, alpha } from "./theme.js";
import CoverArt from "./components/CoverArt.jsx";
import StatsBar from "./components/StatsBar.jsx";
import BookDetailModal from "./components/BookDetailModal.jsx";
import TimelineEventModal from "./components/TimelineEventModal.jsx";
import VerticalTimelinePage from "./components/VerticalTimelinePage.jsx";
import dostoevskyPortrait from "./assets/el_dostojpg.jpg";
import crimeAndPunishmentCover from "./assets/crimen.jpeg";
import manuscriptDraft from "./assets/Bkdraft.jpg";

const STORAGE_KEY = "dostoevsky-read";
const STORAGE_CACHE_KEY = "dostoevsky-read-cache";
const BACKUP_APP = "dosto";
const BACKUP_VERSION = 2;
const UI_FONT = "'Manrope', 'Avenir Next', 'Segoe UI', sans-serif";
const BOOKS_BY_ID = Object.fromEntries(NOVELS.map((novel) => [novel.id, novel]));
const VALID_BOOK_IDS = new Set(NOVELS.map((novel) => novel.id));
const DEFAULT_OWNERSHIP = "sin-ejemplar";
const VALID_STATUSES = new Set(["no-leido", "en-progreso", "terminado"]);
const OWNERSHIP_META = {
  "sin-ejemplar": { label: "Sin ejemplar", color: COLORS.textMuted },
  fisico: { label: "Físico", color: COLORS.goldAccent },
  digital: { label: "Digital", color: COLORS.inProgress },
  prestado: { label: "Prestado", color: COLORS.textSecondary },
};
const OWNERSHIP_OPTIONS = [
  { value: "sin-ejemplar", label: "No lo tengo" },
  { value: "fisico", label: "Lo tengo físico" },
  { value: "digital", label: "Lo tengo digital" },
  { value: "prestado", label: "Prestado" },
];
const VALID_OWNERSHIP = new Set(OWNERSHIP_OPTIONS.map((option) => option.value));
const readViewFromHash = () => (window.location.hash === "#cronologia" ? "timeline" : "library");

function hasEntries(value) {
  return !!value && Object.keys(value).length > 0;
}

function normalizeNotes(notes) {
  if (!Array.isArray(notes)) return [];

  return notes.flatMap((note) => {
    const text = typeof note?.text === "string" ? note.text.trim() : "";
    if (!text) return [];
    return [
      {
        text,
        date: typeof note?.date === "string" && note.date ? note.date : new Date().toISOString(),
      },
    ];
  });
}

function normalizeBookState(value, { trimStrings = true } = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const next = {};
  const status = VALID_STATUSES.has(value.status) ? value.status : "no-leido";
  const chapterValue = Number.parseInt(value.chapter, 10);
  const ownership = VALID_OWNERSHIP.has(value.ownership) ? value.ownership : DEFAULT_OWNERSHIP;
  const ratingValue = Number.parseInt(value.rating, 10);
  const loanedTo = typeof value.loanedTo === "string" ? (trimStrings ? value.loanedTo.trim() : value.loanedTo) : "";
  const review = typeof value.review === "string" ? (trimStrings ? value.review.trim() : value.review) : "";

  if (status !== "no-leido") next.status = status;
  if (status === "en-progreso" && Number.isInteger(chapterValue) && chapterValue > 0) next.chapter = chapterValue;
  if (typeof value.startedDate === "string" && value.startedDate) next.startedDate = value.startedDate;
  if (typeof value.finishedDate === "string" && value.finishedDate) next.finishedDate = value.finishedDate;

  if (ownership !== DEFAULT_OWNERSHIP || "loanedTo" in value) next.ownership = ownership;
  if (ownership === "prestado") {
    next.ownership = "prestado";
    if (loanedTo.length > 0) next.loanedTo = loanedTo;
  }

  if (Number.isInteger(ratingValue) && ratingValue >= 1 && ratingValue <= 5) next.rating = ratingValue;
  if (review.length > 0) next.review = review;

  const notes = normalizeNotes(value.notes);
  if (notes.length > 0) next.notes = notes;

  return Object.keys(next).length > 0 ? next : null;
}

function normalizeBookStates(value) {
  if (Array.isArray(value)) {
    return value.reduce((accumulator, id) => {
      if (VALID_BOOK_IDS.has(id)) accumulator[id] = { status: "terminado" };
      return accumulator;
    }, {});
  }

  if (!value || typeof value !== "object") return {};

  return Object.entries(value).reduce((accumulator, [id, state]) => {
    if (!VALID_BOOK_IDS.has(id)) return accumulator;
    const normalized = normalizeBookState(state);
    if (normalized) accumulator[id] = normalized;
    return accumulator;
  }, {});
}

function extractBookStatesPayload(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return value;

  if ("bookStates" in value) return value.bookStates;

  return value;
}

function normalizeImportedBookStates(value) {
  return normalizeBookStates(extractBookStatesPayload(value));
}

function readStoredBookStates(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return { exists: false, valid: true, states: {} };

    const parsed = JSON.parse(raw);
    return {
      exists: true,
      valid: true,
      states: normalizeImportedBookStates(parsed),
    };
  } catch {
    return { exists: true, valid: false, states: {} };
  }
}

function getOwnershipSummary(bookState) {
  const ownership = bookState?.ownership || DEFAULT_OWNERSHIP;
  if (ownership === "prestado") {
    const loanedTo = typeof bookState?.loanedTo === "string" ? bookState.loanedTo.trim() : "";
    return loanedTo ? `Prestado a ${loanedTo}` : OWNERSHIP_META.prestado.label;
  }
  return OWNERSHIP_META[ownership]?.label || OWNERSHIP_META[DEFAULT_OWNERSHIP].label;
}

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => (index < rating ? "★" : "☆")).join("");
}

const APP_CSS = `
  @keyframes heroRise {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .app-shell {
    padding: clamp(20px, 3.5vw, 40px);
  }

  html {
    scrollbar-width: thin;
    scrollbar-color: ${alpha(COLORS.goldDim, 0.72)} ${alpha(COLORS.bgMain, 0.92)};
  }

  body::-webkit-scrollbar,
  .editorial-scroll::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  body::-webkit-scrollbar-track,
  .editorial-scroll::-webkit-scrollbar-track {
    background: ${alpha(COLORS.bgCard, 0.82)};
    border-radius: 999px;
  }

  body::-webkit-scrollbar-thumb,
  .editorial-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, ${alpha(COLORS.goldAccent, 0.82)}, ${alpha(COLORS.goldDim, 0.88)});
    border: 2px solid ${alpha(COLORS.bgMain, 0.88)};
    border-radius: 999px;
  }

  body::-webkit-scrollbar-thumb:hover,
  .editorial-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, ${alpha(COLORS.goldAccent, 0.94)}, ${alpha(COLORS.gold, 0.94)});
  }

  .app-content {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .hero-panel {
    animation: heroRise 760ms ease both;
  }

  .hero-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 16% 12%, rgba(240, 205, 135, 0.14) 0%, transparent 26%),
      radial-gradient(circle at 84% 18%, rgba(213, 164, 74, 0.12) 0%, transparent 24%);
  }

  .surface-panel {
    backdrop-filter: blur(8px);
  }

  .intro-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr);
    gap: 28px;
    align-items: stretch;
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

  .author-lockup {
    display: flex;
    align-items: center;
    gap: 18px;
    margin: 10px 0 12px;
  }

  .author-cameo {
    flex: 0 0 auto;
    width: 96px;
    height: 124px;
    padding: 7px;
    border-radius: 999px;
    border: 1px solid rgba(112, 82, 34, 0.96);
    background:
      linear-gradient(180deg, rgba(240,205,135,0.2) 0%, rgba(117,85,34,0.14) 100%),
      rgba(14, 11, 8, 0.96);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.05),
      0 16px 34px rgba(0, 0, 0, 0.26);
  }

  .author-cameo img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center 16%;
    border-radius: 999px;
    filter: sepia(0.42) saturate(0.82) brightness(0.9);
  }

  .hero-aside {
    justify-self: stretch;
    padding: 18px 18px 16px;
    border-radius: 24px;
    border: 1px solid rgba(57, 47, 28, 0.92);
    background:
      radial-gradient(circle at top right, rgba(240,205,135,0.08) 0%, transparent 34%),
      linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 24%),
      rgba(10, 11, 13, 0.88);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.22);
  }

  .hero-aside-copy {
    display: grid;
    gap: 10px;
  }

  .hero-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .cta-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .timeline-filter-toolbar {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  .timeline-legend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    padding: 6px 4px 0;
  }

  .selection-meta-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .ownership-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .note-composer {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .relation-diagram-shell {
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 4px;
  }

  .archive-documents {
    display: grid;
    gap: 18px;
  }

  .archive-document {
    display: grid;
    grid-template-columns: minmax(168px, 220px) minmax(0, 1fr);
    gap: 22px;
    align-items: center;
    padding: 4px 0;
  }

  .archive-document + .archive-document {
    padding-top: 22px;
    border-top: 1px solid rgba(46, 45, 42, 0.94);
  }

  .archive-document-media {
    position: relative;
    overflow: hidden;
    border-radius: 26px;
    border: 1px solid rgba(61, 49, 30, 0.94);
    background: rgba(12, 10, 7, 0.96);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.26);
  }

  .archive-document-media img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .archive-document-copy {
    display: grid;
    gap: 8px;
    align-content: center;
  }

  .reading-item {
    border: 1px solid rgba(49, 64, 54, 0.94);
    border-radius: 18px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 18%),
      linear-gradient(135deg, rgba(140,169,148,0.06) 0%, rgba(12,15,19,0.96) 72%);
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
    transform: translateY(-3px);
    border-color: rgba(213, 164, 74, 0.38);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.3);
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
    border: 1px solid rgba(53, 43, 26, 0.92);
    background:
      radial-gradient(circle at top right, rgba(240,205,135,0.08) 0%, transparent 32%),
      linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 22%),
      rgba(12, 15, 19, 0.96);
    box-shadow: 0 22px 52px rgba(0, 0, 0, 0.28);
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

  .book-poster::after {
    content: "";
    position: absolute;
    left: 18px;
    right: 18px;
    top: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(240,205,135,0.5), transparent);
    pointer-events: none;
  }

  .book-poster:hover {
    transform: translateY(-6px);
    border-color: rgba(240, 205, 135, 0.42);
    box-shadow: 0 30px 64px rgba(0, 0, 0, 0.36);
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
    text-wrap: balance;
  }

  .book-description {
    margin: 0;
    font-size: 15px;
    line-height: 1.62;
    color: ${COLORS.textSecondary};
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

  .metric-card {
    position: relative;
    overflow: hidden;
  }

  .metric-card::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(240,205,135,0.06) 0%, rgba(255,255,255,0) 30%);
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

    .archive-document {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 760px) {
    .app-shell {
      padding: 16px;
    }

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

    .author-lockup {
      align-items: flex-start;
    }

    .author-cameo {
      width: 82px;
      height: 108px;
    }
  }

  @media (max-width: 520px) {
    .app-shell {
      padding: 12px;
    }

    .intro-grid,
    .hero-stats-grid,
    .metrics-grid,
    .ownership-grid {
      grid-template-columns: 1fr;
    }

    .cta-row > * {
      width: 100%;
      justify-content: center;
    }

    .timeline-legend-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .selection-meta-row {
      margin-bottom: 14px;
    }

    .note-composer > button,
    .note-composer > textarea {
      flex-basis: 100%;
    }

    .relation-diagram-shell {
      margin-inline: -4px;
      padding-inline: 4px;
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
      className="metric-card"
      style={{
        padding: "14px 14px 12px",
        borderRadius: 18,
        border: `1px solid ${alpha(COLORS.border, 0.95)}`,
        background:
          `radial-gradient(circle at top, ${alpha(color, 0.1)} 0%, transparent 40%), ${alpha(COLORS.bgCard, 0.94)}`,
        boxShadow: `inset 0 1px 0 ${alpha(COLORS.text, 0.04)}, 0 12px 26px ${alpha("#000000", 0.2)}`,
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

function HeroStatGroup({ items }) {
  return (
    <div
      style={{
        padding: "16px 16px 14px",
        borderRadius: 20,
        border: `1px solid ${alpha(COLORS.border, 0.95)}`,
        background:
          `linear-gradient(180deg, ${alpha(COLORS.text, 0.02)} 0%, transparent 24%), ${alpha(COLORS.bgCard, 0.94)}`,
        boxShadow: `inset 0 1px 0 ${alpha(COLORS.text, 0.04)}, 0 12px 26px ${alpha("#000000", 0.2)}`,
        display: "grid",
        gap: 12,
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          style={{
            display: "grid",
            gap: 4,
            paddingTop: index === 0 ? 0 : 12,
            borderTop: index === 0 ? "none" : `1px solid ${alpha(COLORS.border, 0.92)}`,
          }}
        >
          <div style={{ fontSize: 26, lineHeight: 1, color: item.color }}>{item.value}</div>
          <div
            style={{
              fontFamily: UI_FONT,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: COLORS.textMuted,
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineIcon({ color = "currentColor" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.7" opacity="0.92" />
      <path d="M12 7.5v4.9l3.3 1.9" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 4.7l-1.4-1.4M16 4.7l1.4-1.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.72" />
    </svg>
  );
}

function LibraryIcon({ color = "currentColor" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.8 5.2h4.2v13.6H4.8zM10.3 4.2h4.2v14.6h-4.2zM15.8 6.2H20v12.6h-4.2z" fill={color} opacity="0.92" />
      <path d="M4 19.6h16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.72" />
    </svg>
  );
}

function IconButton({ label, title, active = false, onClick, icon }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={title}
      onClick={onClick}
      style={{
        minHeight: 44,
        padding: "0 14px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        border: `1px solid ${active ? alpha(COLORS.goldDim, 0.72) : alpha(COLORS.border, 0.92)}`,
        background: active ? alpha(COLORS.gold, 0.12) : alpha(COLORS.bgCard, 0.62),
        color: active ? COLORS.goldAccent : COLORS.textSecondary,
        boxShadow: active ? `0 14px 30px ${alpha(COLORS.gold, 0.12)}` : `0 12px 26px ${alpha("#000000", 0.16)}`,
        cursor: "pointer",
        transition: "transform 0.2s ease, border-color 0.2s ease, background 0.2s ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {icon}
      <span
        style={{
          fontFamily: UI_FONT,
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </button>
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [sortBy, setSortBy] = useState("year");
  const [searchQuery, setSearchQuery] = useState("");
  const [noteText, setNoteText] = useState("");
  const [activeView, setActiveView] = useState(readViewFromHash);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [showRussianName, setShowRussianName] = useState(false);

  useEffect(() => {
    try {
      const primary = readStoredBookStates(STORAGE_KEY);
      const backup = readStoredBookStates(STORAGE_CACHE_KEY);

      let restoredStates = {};
      let shouldRewritePrimary = false;

      if (primary.valid && (hasEntries(primary.states) || (!backup.exists && primary.exists))) {
        restoredStates = primary.states;
      } else if (backup.valid && (hasEntries(backup.states) || backup.exists)) {
        restoredStates = backup.states;
        shouldRewritePrimary = true;
      } else if (primary.valid) {
        restoredStates = primary.states;
      }

      if (shouldRewritePrimary) {
        const serialized = JSON.stringify(restoredStates);
        localStorage.setItem(STORAGE_KEY, serialized);
      }

      if (primary.exists || backup.exists) {
        localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(restoredStates));
        setBookStates(restoredStates);
      }
    } catch {
      // first visit
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleHashChange = () => setActiveView(readViewFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
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
    if (!selectedBook && !selectedEvent) return;

    document.body.style.overflow = "hidden";
    const handler = (event) => {
      if (event.key === "Escape") {
        setSelectedBook(null);
        setSelectedEvent(null);
        setNoteText("");
        return;
      }
      if (!selectedBook) return;
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
  }, [selectedBook, selectedEvent, filtered]);

  const saveStates = useCallback((states) => {
    try {
      const normalized = normalizeBookStates(states);
      const serialized = JSON.stringify(normalized);
      localStorage.setItem(STORAGE_KEY, serialized);
      localStorage.setItem(STORAGE_CACHE_KEY, serialized);
    } catch {
      // storage unavailable
    }
  }, []);

  const updateBookState = useCallback((id, updater) => {
    setBookStates((prev) => {
      const current = prev[id] || {};
      const draft = updater(current);
      const normalized = normalizeBookState(draft, { trimStrings: false });

      if (!normalized) {
        if (!(id in prev)) return prev;
        const next = { ...prev };
        delete next[id];
        saveStates(next);
        return next;
      }

      const next = { ...prev, [id]: normalized };
      saveStates(next);
      return next;
    });
  }, [saveStates]);

  const getStatus = (id) => bookStates[id]?.status || "no-leido";
  const isFinished = (id) => getStatus(id) === "terminado";
  const isInProgress = (id) => getStatus(id) === "en-progreso";
  const getChapter = (id) => bookStates[id]?.chapter || null;

  const openBook = (novel) => {
    setSelectedEvent(null);
    setSelectedBook(novel);
    setNoteText("");
  };

  const closeBook = () => {
    setSelectedBook(null);
    setNoteText("");
  };

  const openTimelineEvent = (event) => {
    setSelectedBook(null);
    setSelectedEvent(event);
    setNoteText("");
  };

  const closeTimelineEvent = () => {
    setSelectedEvent(null);
  };

  const setBookStatus = (id, status, chapter = null) => {
    updateBookState(id, (existing) => {
      const next = { ...existing };

      if (status === "no-leido") {
        delete next.status;
        delete next.chapter;
        delete next.startedDate;
        delete next.finishedDate;
        return next;
      }

      next.status = status;

      if (status === "en-progreso") {
        if (chapter != null) next.chapter = chapter;
        else delete next.chapter;
        if (!existing.startedDate) next.startedDate = new Date().toISOString();
        delete next.finishedDate;
      }

      if (status === "terminado") {
        delete next.chapter;
        if (!existing.startedDate) next.startedDate = new Date().toISOString();
        next.finishedDate = new Date().toISOString();
      }

      return next;
    });
  };

  const setBookOwnership = (id, ownership) => {
    updateBookState(id, (existing) => {
      const next = { ...existing, ownership };
      if (ownership !== "prestado") delete next.loanedTo;
      return next;
    });
  };

  const setBookLoanedTo = (id, loanedTo) => {
    updateBookState(id, (existing) => {
      if ((existing.ownership || DEFAULT_OWNERSHIP) !== "prestado") return existing;
      return { ...existing, loanedTo };
    });
  };

  const setBookRating = (id, rating) => {
    updateBookState(id, (existing) => {
      const next = { ...existing };
      if (Number.isInteger(rating) && rating >= 1 && rating <= 5) next.rating = rating;
      else delete next.rating;
      return next;
    });
  };

  const setBookReview = (id, review) => {
    updateBookState(id, (existing) => ({ ...existing, review }));
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
    updateBookState(id, (existing) => {
      if (!existing?.notes) return existing;
      return {
        ...existing,
        notes: existing.notes.filter((_, index) => index !== noteIndex),
      };
    });
  };

  const exportData = () => {
    const payload = {
      app: BACKUP_APP,
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      bookStates: normalizeBookStates(bookStates),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
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
          const cleaned = normalizeImportedBookStates(data);
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
      `radial-gradient(circle at top, ${alpha(COLORS.goldAccent, 0.08)} 0%, transparent 24%), linear-gradient(180deg, ${alpha(COLORS.text, 0.018)} 0%, transparent 24%), ${alpha(COLORS.bgModal, 0.96)}`,
    border: `1px solid ${alpha(COLORS.border, 0.96)}`,
    borderRadius: 26,
    boxShadow: `0 24px 56px ${alpha("#000000", 0.34)}, inset 0 1px 0 ${alpha(COLORS.text, 0.04)}`,
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

  const switchView = (view) => {
    setActiveView(view);
    const nextHash = view === "timeline" ? "#cronologia" : "";
    const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
    window.history.replaceState(null, "", nextUrl);
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
          `radial-gradient(circle at top, ${alpha(COLORS.goldAccent, 0.12)} 0%, transparent 30%), radial-gradient(circle at 84% 12%, ${alpha(COLORS.gold, 0.08)} 0%, transparent 24%), linear-gradient(180deg, ${COLORS.bgMain} 0%, #06070a 42%, #08090d 100%)`,
      }}
    >
      <style>{APP_CSS}</style>

      <div className="app-shell">
        <div className="app-content">
          {activeView === "library" && (
            <>
              <section className="hero-panel surface-panel" style={{ ...panelStyle, padding: "24px clamp(18px, 3vw, 30px) 22px" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  `radial-gradient(circle at top right, ${alpha(COLORS.goldAccent, 0.16)} 0%, transparent 34%)`,
              }}
            />

            <div className="intro-grid" style={{ position: "relative", zIndex: 1 }}>
              <div>
                <SectionEyebrow>Ni idea, estaba leyendo a</SectionEyebrow>
                <div className="author-lockup">
                  <button
                    type="button"
                    className="author-cameo"
                    aria-label="Alternar nombre en ruso"
                    title="Easter egg: mostrar el nombre en ruso"
                    onClick={() => setShowRussianName((value) => !value)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={dostoevskyPortrait} alt="" />
                  </button>
                  <h1
                    style={{
                      fontSize: "clamp(42px, 7vw, 64px)",
                      lineHeight: 0.92,
                      margin: 0,
                      color: COLORS.goldAccent,
                      textShadow: `0 10px 30px ${alpha(COLORS.gold, 0.12)}`,
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontFamily: UI_FONT,
                        fontSize: "clamp(16px, 2vw, 22px)",
                        letterSpacing: "0.24em",
                        textTransform: "uppercase",
                        color: COLORS.textSecondary,
                        marginBottom: 10,
                      }}
                    >
                      {showRussianName ? "Фёдор Михайлович" : "Fiódor Mijáilovich"}
                    </span>
                    {showRussianName ? "Достоевский" : "Dostoievski"}
                  </h1>
                </div>
                <div
                  style={{
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: COLORS.textSecondary,
                    maxWidth: 560,
                  }}
                >
                  Un registro de lectura para recorrer novelas, novelas cortas y cuentos con más contexto, mejor seguimiento y referencias visuales ligadas a cada obra.
                </div>
              </div>

              <div className="hero-aside" style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 18,
                    flexWrap: "wrap",
                  }}
                >
                  <SectionEyebrow color={COLORS.textLabel}>Estado general</SectionEyebrow>
                  <IconButton
                    label="Ver cronología"
                    title="Abrir cronología de vida, contexto y obras"
                    onClick={() => switchView("timeline")}
                    icon={<TimelineIcon color={COLORS.goldAccent} />}
                  />
                </div>

                <div className="hero-stats-grid">
                  <HeroStatGroup
                    items={[
                      { label: "Terminadas", value: `${finishedCount}/${NOVELS.length}`, color: COLORS.goldAccent },
                      { label: "En progreso", value: inProgressCount, color: inProgressCount > 0 ? COLORS.inProgress : COLORS.textBook },
                    ]}
                  />
                  <HeroStatGroup
                    items={[
                      { label: "Páginas", value: `${readPages.toLocaleString()} / ${totalPages.toLocaleString()}`, color: COLORS.textBook },
                      { label: "Progreso", value: `${readingPct}%`, color: readingPct > 0 ? COLORS.gold : COLORS.textBook },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 1, marginTop: 18 }}>
              <StatsBar read={finishedPages} inProgress={inProgressPages} total={totalPages} />
            </div>

            <div
              style={{
                marginTop: 12,
                display: "flex",
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


          <section className="surface-panel" style={{ ...panelStyle, padding: "18px clamp(18px, 2.8vw, 26px)" }}>
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
              const bookState = bookStates[novel.id] || {};
              const status = getStatus(novel.id);
              const finished = status === "terminado";
              const inProgress = status === "en-progreso";
              const chapter = getChapter(novel.id);
              const chapterPct = inProgress && novel.chapters ? Math.round(((chapter || 1) / novel.chapters) * 100) : 0;
              const accent = getBookAccent(status);
              const ownership = bookState.ownership || DEFAULT_OWNERSHIP;
              const ownershipMeta = OWNERSHIP_META[ownership] || OWNERSHIP_META[DEFAULT_OWNERSHIP];
              const ownershipSummary = getOwnershipSummary(bookState);
              const rating = finished ? bookState.rating || null : null;
              const reviewExcerpt = finished && typeof bookState.review === "string" ? truncate(bookState.review.trim(), 120) : "";

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
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: `1px solid ${alpha(ownershipMeta.color, 0.35)}`,
                          background: alpha(ownershipMeta.color, 0.14),
                          color: ownershipMeta.color,
                          fontSize: 11,
                          fontFamily: UI_FONT,
                        }}
                      >
                        {ownershipSummary}
                      </span>
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

                    {rating && (
                      <div
                        style={{
                          marginTop: 14,
                          display: "grid",
                          gap: 6,
                        }}
                      >
                        <div
                          aria-label={`Valoración personal: ${rating} de 5 estrellas`}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            fontFamily: UI_FONT,
                            fontSize: 12,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: COLORS.goldAccent,
                          }}
                        >
                          <span style={{ fontSize: 15, letterSpacing: "0.1em" }}>{renderStars(rating)}</span>
                          Mi valoración
                        </div>

                        {reviewExcerpt && (
                          <div
                            style={{
                              fontSize: 13,
                              lineHeight: 1.4,
                              color: COLORS.textSecondary,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {reviewExcerpt}
                          </div>
                        )}
                      </div>
                    )}

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
            className="surface-panel"
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

            <div className="cta-row">
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
            </>
          )}

          {activeView === "timeline" && (
            <VerticalTimelinePage
              novels={NOVELS}
              bookStates={bookStates}
              themes={THEMES}
              workTypes={WORK_TYPES}
              onBackToLibrary={() => switchView("library")}
            />
          )}
        </div>
      </div>

      {selectedBook && activeView !== "timeline" && (
        <BookDetailModal
          key={selectedBook.id}
          book={selectedBook}
          booksById={BOOKS_BY_ID}
          bookState={bookStates[selectedBook.id] || {}}
          status={getStatus(selectedBook.id)}
          chapter={getChapter(selectedBook.id)}
          ownershipOptions={OWNERSHIP_OPTIONS}
          themes={THEMES}
          workType={WORK_TYPES[selectedBook.type]}
          noteText={noteText}
          setNoteText={setNoteText}
          setBookStatus={setBookStatus}
          setBookOwnership={setBookOwnership}
          setBookLoanedTo={setBookLoanedTo}
          setBookRating={setBookRating}
          setBookReview={setBookReview}
          addNote={addNote}
          deleteNote={deleteNote}
          getBookAccent={getBookAccent}
          actionButtonStyle={actionButtonStyle}
          onOpenBook={openBook}
          onClose={closeBook}
        />
      )}

      {selectedEvent && activeView !== "timeline" && (
        <TimelineEventModal
          event={selectedEvent}
          booksById={BOOKS_BY_ID}
          onOpenBook={openBook}
          onClose={closeTimelineEvent}
        />
      )}
    </div>
  );
}
