import { useEffect, useRef } from "react";

export function ScrollLineV() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!lineRef.current) return;

      const max = document.documentElement.scrollHeight - window.innerHeight;

      const p = max > 0 ? window.scrollY / max : 0;

      lineRef.current.style.height = `${p * 100}vh`;
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        className="
          fixed left-0 top-0
          z-40
          pointer-events-none
        "
        style={{
          width: 2,
          height: "100vh",
          background: "rgba(255,255,255,.1)",
        }}
      />

      <div
        ref={lineRef}
        className="
          fixed left-0 top-0
          z-40
          pointer-events-none
        "
        style={{
          width: 2,
          height: 0,
          background: "var(--yellow-line)",
        }}
      />
    </>
  );
}
