export const COLORS = {
  bgMain: "#040506",
  bgCard: "#0c0f13",
  bgCardRead: "#15110b",
  bgModal: "#090b0f",
  gold: "#d5a44a",
  goldDim: "#7e5b27",
  goldGradientStart: "#6e4b1a",
  goldAccent: "#f0cd87",
  goldAccentDim: "#b98635",
  text: "#f5ead6",
  textSecondary: "#dac8a8",
  textMuted: "#9c8765",
  textLabel: "#c5b08b",
  border: "#2b2f36",
  borderRead: "#5a4521",
  decorDim: "#513a1e",
  decorDimDark: "#261a0d",
  textBook: "#f1ddb4",
  textDesc: "#e2cfb0",
  inProgress: "#8ca994",
  inProgressDim: "#4f6755",
  borderInProgress: "#314036",
  bgCardInProgress: "#0d1310",
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
