import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-accent transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: hover ? 38 : 8,
          height: hover ? 38 : 8,
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          mixBlendMode: "difference",
          opacity: hover ? 0.85 : 1,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-foreground/30 transition-transform duration-700 ease-out"
        style={{
          width: 40,
          height: 40,
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${hover ? 0 : 1})`,
        }}
      />
    </>
  );
}
