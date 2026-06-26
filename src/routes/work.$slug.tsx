import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { projectBySlug, projects } from "@/lib/projects";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/SiteNav";
import MagneticButton from "@/components/MagneticButton";
import KineticText from "@/components/KineticText";
import ErrorBoundary from "@/components/ErrorBoundary";

const DistortionImage = lazy(() => import("@/components/DistortionImage"));

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Work — Safi Ur Rehman" }] };
    return {
      meta: [
        { title: `${p.title} — Safi Ur Rehman` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.title} — Safi Ur Rehman` },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: p.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.image },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://safiurrehman.dev/work/${p.slug}`,
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="eyebrow">∅ — Not found</p>
        <h1 className="display-xl mt-6">
          Project not found<span className="text-accent">.</span>
        </h1>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground hover:text-accent"
        >
          ← Back home
        </Link>
      </div>
    </div>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIdx + 1) % projects.length];

  return (
    <div className="bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="px-6 pt-32 pb-10 md:px-10 md:pt-44 md:pb-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <Reveal>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-accent"
              >
                ← Index
              </Link>
            </Reveal>
          </div>
          <div className="md:col-span-10">
            <Reveal>
              <p className="eyebrow">
                /{project.index} — {project.role}
              </p>
            </Reveal>
            <h1 className="display-hero mt-8">
              <Reveal as="span" className="block">
                <KineticText className="inline">
                  {project.title}
                </KineticText>
                <span className="text-accent">.</span>
              </Reveal>
            </h1>
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-2xl font-display text-2xl leading-snug text-foreground/80 md:text-3xl">
                {project.tagline}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Hero image — WebGL distortion on hover */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="px-6 md:px-10"
      >
        <div className="mx-auto max-w-7xl overflow-hidden bg-muted" style={{ aspectRatio: "16/9" }}>
          <ErrorBoundary
            fallback={
              <img
                src={project.image}
                alt={`${project.title} — ${project.tagline}`}
                width={1600}
                height={900}
                className="h-full w-full object-cover"
              />
            }
          >
            <Suspense
              fallback={
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.tagline}`}
                  width={1600}
                  height={900}
                  className="h-full w-full object-cover"
                />
              }
            >
              <DistortionImage
                imageUrl={project.image}
                alt={`${project.title} — ${project.tagline}`}
                className="h-full w-full"
                width={1600}
                height={900}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </motion.section>

      {/* Meta strip */}
      <section className="mt-32 border-t border-border px-6 py-12 md:mt-48 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
          <MetaItem
            label="Live"
            value={
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all hover:text-accent"
              >
                {project.live.replace(/^https?:\/\//, "")}
              </a>
            }
          />
          <MetaItem
            label="Source"
            value={
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all hover:text-accent"
              >
                github.com/Safi-ur-Rehman99
              </a>
            }
          />
          <MetaItem label="Role" value={project.role} />
        </div>
      </section>

      {/* Context */}
      <Chapter eyebrow="01 — Context" title="Why it exists.">
        {project.context}
      </Chapter>

      {/* What I built */}
      <section className="border-t border-border px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <p className="eyebrow">02 — What I built</p>
              <h2 className="display-lg mt-6">The work.</h2>
            </Reveal>
          </div>
          <ol className="md:col-span-8 md:col-start-5">
            {project.built.map((item: string, i: number) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="grid grid-cols-[3rem_1fr] gap-6 border-t border-border py-8 first:border-t-0 first:pt-0">
                  <span className="font-display text-sm text-accent">
                    /0{i + 1}
                  </span>
                  <p className="text-lg leading-relaxed text-foreground/85">
                    {item}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Hard */}
      <Chapter eyebrow="03 — The hard part" title="What I had to rebuild.">
        {project.hard}
      </Chapter>

      {/* Learned */}
      <Chapter eyebrow="04 — What I learned" title="The takeaway." accent>
        {project.learned}
      </Chapter>

      {/* Stack */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow">05 — Stack</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 md:col-span-8 md:col-start-5">
            {project.stack.map((s: string) => (
              <span
                key={s}
                className="font-display text-2xl text-foreground/90 md:text-3xl"
              >
                {s}
                <span className="text-muted-foreground">.</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Next case study</p>
          <MagneticButton>
            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              className="group mt-8 block"
            >
              <h2 className="display-xl transition-colors group-hover:text-accent">
                {next.title} →
              </h2>
              <p className="mt-6 max-w-xl text-base text-muted-foreground">
                {next.tagline}
              </p>
            </Link>
          </MagneticButton>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <Link to="/" className="hover:text-accent">
            ← Index
          </Link>
          <a
            href="mailto:syedsafi3414@gmail.com"
            className="hover:text-accent"
          >
            Start a conversation
          </a>
        </div>
      </footer>
    </div>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="md:col-span-4">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 text-sm text-foreground">{value}</p>
    </div>
  );
}

function Chapter({
  eyebrow,
  title,
  children,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
        <div className="md:col-span-3">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className={`display-lg mt-6 ${accent ? "text-accent" : ""}`}>
              {title}
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-8 md:col-start-5">
          <Reveal delay={0.1}>
            <p className="font-display text-2xl leading-snug text-foreground/90 md:text-3xl">
              {children}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
