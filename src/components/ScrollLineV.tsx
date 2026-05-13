import { useEffect } from "react";

export function ScrollLineV() {
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("scroll-line-v");
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.height = p * 100 + "vh";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 pointer-events-none"
        style={{ width: 2, height: "100vh", background: "rgba(255,255,255,0.1)" }}
      />
      <div
        id="scroll-line-v"
        className="fixed left-0 top-0 z-40 pointer-events-none"
        style={{ width: 2, height: 0, background: "var(--yellow-line)" }}
      />
    </>
  );
}
