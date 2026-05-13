type Props = { fill?: string; position?: "top" | "bottom"; height?: number };

export function TornEdge({ fill = "#F5F0EA", position = "bottom", height = 60 }: Props) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    width: "100%",
    height,
    pointerEvents: "none",
    zIndex: 5,
    ...(position === "bottom" ? { bottom: -1 } : { top: -1, transform: "scaleY(-1)" }),
  };
  return (
    <svg style={style} viewBox="0 0 1200 60" preserveAspectRatio="none">
      <path
        d="M0,60 L0,28 C60,18 120,42 200,32 C280,22 340,46 420,30 C500,18 560,44 640,30 C720,18 780,42 860,28 C940,16 1000,40 1080,30 C1140,22 1180,38 1200,30 L1200,60 Z"
        fill={fill}
      />
    </svg>
  );
}
