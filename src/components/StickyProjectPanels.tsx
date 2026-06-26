import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

type Props = { items: Project[] };

export default function StickyProjectPanels({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const panels = containerRef.current.querySelectorAll<HTMLElement>(".sp-panel");

    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        const info = panel.querySelector<HTMLElement>(".sp-info");
        const visual = panel.querySelector<HTMLElement>(".sp-visual");

        if (!info || !visual) return;

        // Pin the info side while the visual scrolls
        ScrollTrigger.create({
          trigger: panel,
          start: "top 15%",
          end: "bottom 85%",
          pin: info,
          pinSpacing: false,
        });

        // Animate visual entrance
        gsap.fromTo(
          visual,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visual,
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced, items]);

  return (
    <div ref={containerRef}>
      {items.map((p, i) => (
        <div
          key={p.slug}
          className="sp-panel border-t border-border"
        >
          <Link
            to="/work/$slug"
            params={{ slug: p.slug }}
            data-cursor="hover"
            className="group grid min-h-[70vh] grid-cols-1 gap-8 px-6 py-16 md:grid-cols-12 md:gap-12 md:px-10 md:py-24"
          >
            {/* Info — sticky side */}
            <div className="sp-info flex flex-col justify-center md:col-span-5">
              <span className="eyebrow mb-4">/{p.index}</span>
              <h3 className="display-xl leading-none text-foreground transition-colors duration-500 group-hover:text-accent">
                {p.title}
                <span className="text-accent">.</span>
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                {p.tagline}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {p.role}
                </span>
                <span className="inline-block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-20 group-hover:bg-accent" />
              </div>
            </div>

            {/* Visual — scrolling side */}
            <div className="sp-visual flex items-center md:col-span-7">
              <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={`${p.title} — ${p.tagline}`}
                  width={1200}
                  height={750}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
