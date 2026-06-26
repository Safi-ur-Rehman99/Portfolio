import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  /** Italic closer text — rendered last with extra weight */
  closer?: string;
  className?: string;
};

export default function TextReveal({ children, closer, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll<HTMLSpanElement>(".tr-word");
    const closerEl = containerRef.current.querySelector<HTMLSpanElement>(".tr-closer");

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.12 });
      if (closerEl) gsap.set(closerEl, { opacity: 0.12 });

      gsap.to(words, {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      if (closerEl) {
        gsap.to(closerEl, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: closerEl,
            start: "top 65%",
            end: "top 40%",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  const words = children.split(/\s+/).filter(Boolean);

  return (
    <div ref={containerRef} className={className}>
      <p className="display-lg text-foreground">
        {words.map((word, i) => (
          <span key={i} className="tr-word inline-block" style={{ marginRight: "0.3em" }}>
            {word}
          </span>
        ))}
        {closer && (
          <>
            {" "}
            <span className="tr-closer inline-block font-display italic">
              {closer}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
