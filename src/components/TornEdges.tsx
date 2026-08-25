type TornEdgeProps = {
  /** Color of the section that follows below the torn edge. */
  fill?: string;
  className?: string;
};

export function TornEdge({ fill = "var(--cream)", className = "" }: TornEdgeProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 ${className}`}
    >
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-8 w-full sm:h-12">
        <path
          fill={fill}
          d="M0 30L48 22L96 34L144 20L192 32L240 24L288 36L336 22L384 30L432 18L480 32L528 24L576 34L624 20L672 30L720 22L768 34L816 24L864 32L912 20L960 30L1008 22L1056 34L1104 24L1152 32L1200 20L1248 30L1296 22L1344 34L1392 24L1440 32V48H0Z"
        />
      </svg>
    </div>
  );
}

export default TornEdge;
