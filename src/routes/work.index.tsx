import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/SiteNav";
import ExpandingProjectEntries from "@/components/ExpandingProjectEntries";
import SectionLabelSwap from "@/components/SectionLabelSwap";
import MagneticButton from "@/components/MagneticButton";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Safi Ur Rehman" },
      {
        name: "description",
        content:
          "Selected projects by Safi Ur Rehman — full-stack work, shipped to real users.",
      },
      { property: "og:title", content: "Work — Safi Ur Rehman" },
      {
        property: "og:description",
        content:
          "Selected projects by Safi Ur Rehman — full-stack work, shipped to real users.",
      },
    ],
    links: [{ rel: "canonical", href: "https://safiurrehman.dev/work" }],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav />

      <section className="px-6 pt-32 pb-16 md:px-10 md:pt-44 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <Reveal>
              <SectionLabelSwap
                primary="A — Index of work"
                secondary="everything so far."
              />
            </Reveal>
          </div>
          <div className="md:col-span-10">
            <Reveal>
              <h1 className="display-hero">
                The work<span className="text-accent">.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-xl font-display text-2xl leading-snug text-foreground/80 md:text-3xl">
                A growing index. Each entry is something I shipped, broke,
                rebuilt, or learned to ship better. Hover for a glimpse, click
                for the long version.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <ExpandingProjectEntries items={projects} />

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-7xl items-baseline justify-between">
          <SectionLabelSwap
            primary="B — More soon"
            secondary="always building."
          />
          <MagneticButton>
            <Link
              to="/labs"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground"
            >
              <span>Detour to the labs</span>
              <span className="inline-block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-20 group-hover:bg-accent" />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
