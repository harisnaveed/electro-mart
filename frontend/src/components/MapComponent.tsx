function MapComponent({ height = "h-40", className = "" }) {
  const address = import.meta.env.VITE_MAP_ADDRESS;
  return (
    <div className={`relative w-full ${height} ${className}`}>
      <iframe
        src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
        className="w-full h-full rounded-lg border-0"
        loading="lazy"
      />

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-lg dark:bg-black/40 dark:bg-black/50"></div>
    </div>
  );
}

export default MapComponent;
