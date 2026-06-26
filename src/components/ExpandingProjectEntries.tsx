import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

type Props = { items: Project[] };

export default function ExpandingProjectEntries({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const entries = containerRef.current.querySelectorAll<HTMLElement>(".ep-entry");

    const ctx = gsap.context(() => {
      entries.forEach((entry) => {
        const details = entry.querySelector<HTMLElement>(".ep-details");
        if (!details) return;

        gsap.set(details, {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
        });

        gsap.to(details, {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 70%",
            end: "top 35%",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced, items]);

  return (
    <div ref={containerRef} className="border-t border-border">
      {items.map((p, i) => (
        <div key={p.slug} className="ep-entry border-b border-border">
          <Link
            to="/work/$slug"
            params={{ slug: p.slug }}
            data-cursor="hover"
            className="group block px-6 py-10 md:px-10 md:py-14"
          >
            {/* Always visible: index + title */}
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="font-display text-sm text-muted-foreground md:w-14">
                /{p.index}
              </span>
              <h3 className="display-xl leading-none text-foreground transition-[transform,color] duration-500 ease-out group-hover:translate-x-3 group-hover:text-accent">
                {p.title}
              </h3>
            </div>

            {/* Expanding details */}
            <div className="ep-details mt-6 grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-6 md:col-start-3">
                <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                  {p.tagline}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:col-span-3 md:col-start-10 md:items-end">
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {p.role}
                </span>
                <div className="flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="border border-border px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
