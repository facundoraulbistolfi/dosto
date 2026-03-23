const StatsBar = ({ read, total }) => {
  const pct = total > 0 ? (read / total) * 100 : 0;
  return (
    <div style={{ width: "100%", height: 6, background: "#1a1a2e", borderRadius: 3, overflow: "hidden" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: "linear-gradient(90deg, #8a7340, #d4a853)",
          borderRadius: 3,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
};

export default StatsBar;
