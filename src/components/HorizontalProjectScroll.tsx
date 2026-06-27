import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/lib/projects";
import SectionLabelSwap from "@/components/SectionLabelSwap";

gsap.registerPlugin(ScrollTrigger);

type Props = { items: Project[] };

export default function HorizontalProjectScroll({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (reduced) return;

    const cards = gsap.utils.toArray(".project-card");
    if (cards.length > 0 && window.innerWidth > 768) {
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: projectsWrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + (projectsWrapperRef.current?.offsetWidth || 0),
        },
      });
    }
  }, { scope: containerRef });

  const projectsData = [...items, { slug: "explore-more", isExploreMore: true }];

  return (
    <div ref={containerRef}>
      <section ref={projectsWrapperRef} id="work" className="py-10 relative overflow-visible border-t border-border">
        {/* Section heading goes here, ABOVE the scroll container */}
        <div className="grid grid-cols-12 items-baseline gap-4 px-6 mb-10 md:px-10">
          <div className="col-span-12 md:col-span-2">
            <SectionLabelSwap
              primary="B — Selected work"
              secondary="three of them. more coming."
            />
          </div>
          <p className="col-span-12 text-sm text-muted-foreground md:col-span-6 md:col-start-3">
            A curated index. Scroll sideways through the highlights.
          </p>
        </div>

        {/* This div must be wider than the viewport */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{ width: `${projectsData.length * 100}vw` }}
          >
            {projectsData.map((project: any, index) => (
              <div
                key={index}
                className="project-card flex-shrink-0 px-6 md:px-10"
                style={{ width: `100vw` }} // Using 100vw instead of 100/length vw to keep full-width slides correctly
              >
                {!project.isExploreMore ? (
                  <div className="group relative flex h-full min-h-[70vh] flex-col overflow-hidden border border-border bg-card transition-colors duration-500 hover:border-accent/40 lg:flex-row">
                    {/* Image Side */}
                    <div className="relative w-full overflow-hidden border-b border-border bg-muted lg:w-1/2 lg:border-b-0 lg:border-r">
                      <Link
                        to="/work/$slug"
                        params={{ slug: project.slug }}
                        className="block h-full w-full"
                      >
                        <div className="aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
                          <img
                            src={project.image}
                            alt={`${project.title} — ${project.tagline}`}
                            width={1200}
                            height={750}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Content Side */}
                    <div className="flex flex-1 flex-col justify-between p-8 md:p-10 lg:w-1/2 lg:p-12 xl:p-16">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="eyebrow text-muted-foreground">/{project.index}</span>
                          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                            {project.role}
                          </span>
                        </div>
                        
                        <h3 className="mt-6 font-display text-3xl leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent md:text-4xl lg:text-5xl">
                          {project.title}
                          <span className="text-accent">.</span>
                        </h3>
                        
                        <p className="mt-4 text-base font-medium leading-relaxed text-foreground/90 md:text-lg">
                          {project.tagline}
                        </p>
                        
                        <p className="mt-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:line-clamp-4">
                          {project.context}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-2">
                          {project.stack.map((s: string) => (
                            <span
                              key={s}
                              className="border border-border px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-accent/40"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-12 flex flex-wrap items-center gap-6 sm:mt-auto sm:gap-8 lg:pt-8">
                        <Link
                          to="/work/$slug"
                          params={{ slug: project.slug }}
                          className="group/btn inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
                        >
                          <span className="inline-block h-px w-8 bg-current transition-all duration-300 group-hover/btn:w-12 group-hover/btn:bg-accent" />
                          View Case Study
                        </Link>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
                          >
                            Live Site ↗
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
                          >
                            Source ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="group relative flex h-full min-h-[70vh] flex-col items-center justify-center overflow-hidden border border-border bg-card transition-all duration-500 hover:border-accent/40">
                    <Link
                      to="/work"
                      className="flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-24 text-center lg:py-16"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/5">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-accent transition-transform duration-500 group-hover:translate-x-2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-display text-3xl leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent md:text-4xl">
                          Explore more<span className="text-accent">.</span>
                        </h3>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                          These are just the highlights. See the full project index for
                          everything I've shipped.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground transition-colors duration-300 group-hover:text-accent">
                        <span className="inline-block h-px w-10 bg-current transition-all duration-500 group-hover:w-16" />
                        Project Archive
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
