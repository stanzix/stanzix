interface ScaffoldLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function ScaffoldLine({
  orientation = "horizontal",
  className = "",
}: ScaffoldLineProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={`w-px h-full ${className}`}
        style={{
          background: "linear-gradient(180deg, transparent, #D4A04C, transparent)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`h-px w-full ${className}`}
      style={{
        background: "linear-gradient(90deg, transparent, #D4A04C, transparent)",
      }}
      aria-hidden="true"
    />
  );
}
