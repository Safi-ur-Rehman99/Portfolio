import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Lab } from "@/lib/labs";

gsap.registerPlugin(ScrollTrigger);

type Props = { items: Lab[] };

const statusStyles: Record<Lab["status"], string> = {
  Shipped: "border-foreground/40 text-foreground",
  Live: "border-accent text-accent",
  Drafting: "border-muted-foreground text-muted-foreground",
};

export default function HorizontalLabsScroll({ items }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !trackRef.current) return;

    // Only enable horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current!;
      const cards = track.children;
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Stagger card entrance
      gsap.fromTo(
        cards,
        { opacity: 0.3, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalWidth * 0.5}`,
            scrub: 1,
          },
        }
      );
    });

    return () => mm.revert();
  }, [reduced, items]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-16 pb-8 md:px-10 md:pt-20 md:pb-10">
        <div className="mx-auto grid max-w-7xl grid-cols-12 items-baseline gap-4">
          <p className="eyebrow col-span-12 md:col-span-2">C — Labs</p>
          <p className="col-span-12 text-sm text-muted-foreground md:col-span-6 md:col-start-3">
            Smaller experiments and automations. Tools that began as a single
            curious question.
          </p>
          <div className="col-span-12 md:col-span-3 md:justify-self-end">
            <Link
              to="/labs"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground"
            >
              <span>Enter the lab</span>
              <span className="inline-block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-20 group-hover:bg-accent" />
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex gap-6 px-6 pb-16 md:gap-8 md:px-10 md:pb-20"
        style={{ width: "max-content" }}
      >
        {items.map((lab, i) => (
          <div
            key={lab.slug}
            className="group relative flex w-[85vw] flex-col border border-border bg-card p-8 md:w-[36rem] md:p-12"
            data-cursor="hover"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-display text-sm text-muted-foreground">
                /L0{i + 1}
              </span>
              <span
                className={`inline-flex items-center gap-2 border px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] ${statusStyles[lab.status]}`}
              >
                {lab.status === "Live" && (
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                )}
                {lab.status}
              </span>
            </div>

            <h2 className="mt-10 font-display text-4xl leading-tight tracking-tight transition-colors group-hover:text-accent md:text-5xl">
              {lab.title}
              <span className="text-accent">.</span>
            </h2>

            <p className="mt-6 max-w-2xl flex-1 text-base leading-relaxed text-muted-foreground">
              {lab.body}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {lab.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-border px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {lab.link ? (
                <a
                  href={lab.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
                >
                  <span>Source</span>
                  <span className="inline-block h-px w-10 bg-current" />
                </a>
              ) : (
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {lab.status === "Live" ? "No link — just notes" : "Internal tool"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
