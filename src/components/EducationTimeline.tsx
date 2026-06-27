import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    id: "school",
    period: "2019 — 2021",
    place: "KIPS",
    label: "School",
    description: "Matriculation · Sciences",
    side: "right" as const,
  },
  {
    id: "college",
    period: "2021 — 2023",
    place: "GCU",
    label: "College",
    description: "FSc Pre-Engineering · Government College University, Lahore",
    side: "left" as const,
  },
  {
    id: "university",
    period: "2022 — 2026",
    place: "Bahria University",
    label: "University",
    description: "B.S. Computer Science · Graduating June 2026 · Lahore",
    side: "right" as const,
  },
];

export default function EducationTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Vertical line grows downward as you scroll through the section
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 1.2,
          },
        }
      );

      // Animate each node (dot + ring)
      const nodes = Array.from(
        containerRef.current!.querySelectorAll<HTMLElement>(".edu-node")
      );
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate content cards
      const contents = Array.from(
        containerRef.current!.querySelectorAll<HTMLElement>(".edu-content")
      );
      contents.forEach((content, i) => {
        const xFrom = content.dataset.side === "right" ? 24 : -24;
        gsap.fromTo(
          content,
          { opacity: 0, x: xFrom },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl">
      {/* ── Desktop layout (md+): vertical line in centre, content alternates ── */}
      <div className="hidden md:block">
        {/* Vertical line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ background: "var(--color-border)" }}
        >
          <div
            ref={lineRef}
            className="absolute inset-0 origin-top"
            style={{ background: "var(--color-accent)", opacity: 0.5 }}
          />
        </div>

        <div className="flex flex-col gap-32 py-8">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`relative flex items-center ${
                m.side === "right" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`edu-content w-[calc(50%-2.5rem)] flex items-stretch gap-6 ${
                  m.side === "right" ? "pr-8 text-right flex-row" : "pl-8 text-left flex-row-reverse"
                }`}
                data-side={m.side}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <p className="eyebrow mb-2 text-accent">{m.period}</p>
                  <h3 className="font-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
                    {m.place}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {m.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                    {m.description}
                  </p>
                </div>
                <div className="flex-1 rounded-md overflow-hidden border border-border bg-card min-h-[160px]">
                  <img
                    src={`https://picsum.photos/seed/${m.id}/400/400`}
                    alt={m.place}
                    className="h-full w-full object-cover opacity-80 grayscale transition-all hover:grayscale-0"
                  />
                </div>
              </div>

              {/* Node — sits on the centre line */}
              <div className="relative z-10 flex-shrink-0 w-20 flex justify-center">
                <div
                  className="edu-node flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-background"
                  style={{ opacity: 0 }}
                >
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </div>
              </div>

              {/* Empty spacer */}
              <div className="w-[calc(50%-2.5rem)]" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile layout: single column, line on the left ── */}
      <div className="md:hidden relative pl-12">
        {/* Vertical line on the left */}
        <div
          className="absolute left-5 top-0 bottom-0 w-px"
          style={{ background: "var(--color-border)" }}
        />

        <div className="flex flex-col gap-20 py-4">
          {milestones.map((m, i) => (
            <div key={m.id} className="relative">
              {/* Node on the line */}
              <div
                className="edu-node absolute -left-[1.85rem] top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-background"
                style={{ opacity: 0 }}
              >
                <div className="h-2 w-2 rounded-full bg-accent" />
              </div>

              {/* Content */}
              <div className="edu-content flex flex-col gap-6" data-side="right">
                <div>
                  <p className="eyebrow mb-1 text-accent">{m.period}</p>
                  <h3 className="font-display text-xl leading-tight tracking-tight text-foreground">
                    {m.place}
                  </h3>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {m.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                    {m.description}
                  </p>
                </div>
                <div className="h-40 rounded-md overflow-hidden border border-border bg-card w-full">
                  <img
                    src={`https://picsum.photos/seed/${m.id}/400/400`}
                    alt={m.place}
                    className="h-full w-full object-cover opacity-80 grayscale transition-all hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
