import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { labs, type Lab } from "@/lib/labs";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/SiteNav";
import SectionLabelSwap from "@/components/SectionLabelSwap";
import MagneticButton from "@/components/MagneticButton";
import ErrorBoundary from "@/components/ErrorBoundary";

const LabsVisual = lazy(() => import("@/components/LabsVisual"));

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs — Safi Ur Rehman" },
      {
        name: "description",
        content:
          "Experiments, automations, and side projects by Safi Ur Rehman.",
      },
      { property: "og:title", content: "Labs — Safi Ur Rehman" },
      {
        property: "og:description",
        content:
          "Experiments, automations, and side projects by Safi Ur Rehman.",
      },
    ],
    links: [{ rel: "canonical", href: "https://safiurrehman.dev/labs" }],
  }),
  component: LabsPage,
});

const statusStyles: Record<Lab["status"], string> = {
  Shipped: "border-foreground/40 text-foreground",
  Live: "border-accent text-accent",
  Drafting: "border-muted-foreground text-muted-foreground",
};

function LabsPage() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav />

      <section className="relative px-6 pt-32 pb-16 md:px-10 md:pt-44 md:pb-24">
        {/* Background visual */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
          <ErrorBoundary>
            <Suspense fallback={null}>
              <LabsVisual />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <Reveal>
              <SectionLabelSwap
                primary="A — Labs"
                secondary="the curious stuff."
              />
            </Reveal>
          </div>
          <div className="md:col-span-10">
            <Reveal>
              <h1 className="display-hero">
                Side<br />quests<span className="text-accent">.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-xl font-display text-2xl leading-snug text-foreground/80 md:text-3xl">
                Tools I made because I was curious. Some shipped, some are still
                running, some are notes I haven&apos;t finished arguing with.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-16 md:px-10 md:py-24">
        <ul className="mx-auto flex max-w-7xl flex-col gap-8">
          {labs.map((lab, i) => {
            const rotate = i % 2 === 0 ? -0.4 : 0.5;
            return (
              <motion.li
                key={lab.slug}
                initial={{ opacity: 0, y: 30, rotate: rotate * 2 }}
                whileInView={{ opacity: 1, y: 0, rotate }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ rotate: 0, scale: 1.005 }}
                className="group relative border border-border bg-card p-8 md:p-12"
                data-cursor="hover"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
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

                <h2 className="mt-10 font-display text-4xl leading-tight tracking-tight md:text-6xl">
                  {lab.title}
                  <span className="text-accent">.</span>
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
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
                      {lab.status === "Live"
                        ? "No link — just notes"
                        : "Internal tool"}
                    </span>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-7xl items-baseline justify-between">
          <SectionLabelSwap
            primary="B — Back to the index"
            secondary="the main work."
          />
          <MagneticButton>
            <Link
              to="/work"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground"
            >
              <span>Selected work</span>
              <span className="inline-block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-20 group-hover:bg-accent" />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
