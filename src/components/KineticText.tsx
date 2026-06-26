import { useRef, useCallback, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function KineticText({ children, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [chars, setChars] = useState<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || reduced) return;
    const spans = Array.from(
      containerRef.current.querySelectorAll<HTMLSpanElement>(".kt-char")
    );
    setChars(spans);
  }, [reduced, children]);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || chars.length === 0) return;
      const { clientX, clientY } = e;

      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 8;
          const angle = Math.atan2(dy, dx);
          const tx = -Math.cos(angle) * force;
          const ty = -Math.sin(angle) * force;
          char.style.transform = `translate(${tx}px, ${ty}px)`;
          char.style.transition = "transform 0.15s ease-out";
        } else {
          char.style.transform = "translate(0, 0)";
          char.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
        }
      });
    },
    [chars, reduced]
  );

  const handleLeave = useCallback(() => {
    chars.forEach((char) => {
      char.style.transform = "translate(0, 0)";
      char.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    });
  }, [chars]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  // Split text children into characters
  const text = typeof children === "string" ? children : "";

  if (!text) {
    return (
      <div ref={containerRef} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="kt-char inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
