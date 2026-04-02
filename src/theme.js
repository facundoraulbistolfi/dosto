export const COLORS = {
  bgMain: "#080b12",
  bgCard: "#0f131d",
  bgCardRead: "#171b26",
  bgModal: "#0d1119",
  gold: "#dcb46d",
  goldDim: "#8e6f40",
  goldGradientStart: "#8d6b38",
  goldAccent: "#f1d29a",
  goldAccentDim: "#b48d52",
  text: "#f1e5d3",
  textSecondary: "#d0c0a7",
  textMuted: "#988a74",
  textLabel: "#b6a78f",
  border: "#364051",
  borderRead: "#5f5033",
  decorDim: "#5a472e",
  decorDimDark: "#31271c",
  textBook: "#ead8bd",
  textDesc: "#d8c7ad",
  inProgress: "#7fa48d",
  inProgressDim: "#4d685b",
  borderInProgress: "#365044",
  bgCardInProgress: "#10171a",
};

export function alpha(hex, opacity) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((char) => char + char).join("")
    : value;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
