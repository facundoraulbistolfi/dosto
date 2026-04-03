import { COLORS, alpha } from "../theme.js";

function ModalShell({ ariaLabel, width = "min(920px, 100%)", onClose, children }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
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
      onClick={onClose}
    >
      <div
        style={{
          width,
          maxHeight: "92vh",
          overflowY: "auto",
          background:
            `radial-gradient(circle at top, ${alpha(COLORS.goldAccent, 0.08)} 0%, transparent 24%), linear-gradient(180deg, ${alpha(COLORS.text, 0.02)} 0%, transparent 26%), ${alpha(COLORS.bgModal, 0.985)}`,
          border: `1px solid ${alpha(COLORS.border, 0.98)}`,
          borderRadius: 28,
          padding: "22px clamp(18px, 3vw, 30px)",
          boxShadow: `0 34px 90px ${alpha("#000000", 0.52)}, inset 0 1px 0 ${alpha(COLORS.text, 0.04)}`,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalShell;
