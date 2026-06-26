import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";
import { labs } from "@/lib/labs";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/SiteNav";
import AvailabilityDot from "@/components/AvailabilityDot";
import TextReveal from "@/components/TextReveal";
import StickyProjectPanels from "@/components/StickyProjectPanels";
import HorizontalLabsScroll from "@/components/HorizontalLabsScroll";
import SectionLabelSwap from "@/components/SectionLabelSwap";
import MagneticButton from "@/components/MagneticButton";
import KineticText from "@/components/KineticText";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = lazy(() => import("@/components/HeroScene"));
const LabsVisual = lazy(() => import("@/components/LabsVisual"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Safi Ur Rehman — Full-stack developer" },
      {
        name: "description",
        content:
          "Full-stack developer based in Lahore. Selected work, labs, and short experiments.",
      },
      {
        property: "og:title",
        content: "Safi Ur Rehman — Full-stack developer",
      },
      {
        property: "og:description",
        content:
          "Full-stack developer based in Lahore. Selected work, labs, and short experiments.",
      },
    ],
    links: [{ rel: "canonical", href: "https://safiurrehman.dev/" }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav />
      <Hero />
      <Statement />
      <WorkGateway />
      <LabsGateway />
      <Background />
      <ContactCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !heroRef.current || !textRef.current || !sceneRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax: text moves at 1× speed, 3D scene at 0.3×
      gsap.to(textRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(sceneRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      <div ref={sceneRef} className="pointer-events-auto absolute inset-0">
        <ErrorBoundary
          fallback={
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at 60% 50%, #ff5b1f22 0%, #0a0a0a 55%)",
              }}
            />
          }
        >
          <Suspense
            fallback={
              <div
                className="h-full w-full"
                style={{
                  background:
                    "radial-gradient(circle at 60% 50%, #ff5b1f22 0%, #0a0a0a 55%)",
                }}
              />
            }
          >
            <HeroScene />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div
        ref={textRef}
        className="pointer-events-none relative z-10 flex min-h-screen flex-col justify-between px-6 pt-32 pb-10 md:px-10 md:pt-40 md:pb-14"
      >
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <Reveal>
              <p className="eyebrow">Index 001</p>
            </Reveal>
          </div>
          <div className="md:col-span-10">
            <h1 className="display-hero text-foreground">
              <Reveal as="span" className="block">
                <KineticText className="inline">Safi Ur</KineticText>
              </Reveal>
              <Reveal as="span" delay={0.1} className="block">
                <KineticText className="inline">
                  Rehman
                </KineticText>
                <span className="text-accent">.</span>
              </Reveal>
            </h1>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:mt-0 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6 md:col-start-3">
            <Reveal delay={0.25}>
              <p className="max-w-md text-base leading-relaxed text-foreground/80 md:text-lg">
                Full-stack developer in Lahore. I build MERN products that ship
                to real users, and a few small things that exist only because I
                got curious.
              </p>
              <div className="pointer-events-auto mt-6">
                <AvailabilityDot label="Available — full-time & collaborations" />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-3 md:col-start-10 md:justify-self-end">
            <Reveal delay={0.4}>
              <MagneticButton>
                <Link
                  to="/work"
                  data-cursor="hover"
                  className="pointer-events-auto group inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground"
                >
                  <span>Selected work</span>
                  <span
                    className="inline-block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-16 group-hover:bg-accent"
                    aria-hidden
                  />
                </Link>
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-2">
          <SectionLabelSwap
            primary="A — Note"
            secondary="the short version."
          />
        </div>
        <div className="md:col-span-9">
          <TextReveal
            closer="The work is the resume."
          >
            I just graduated. I&apos;ve already shipped to real users, built three live products, and spent the in-between hours writing automations nobody asked for.
          </TextReveal>
        </div>
      </div>
    </section>
  );
}

function WorkGateway() {
  const featured = projects.slice(0, 3);
  return (
    <section id="work" className="border-t border-border">
      <div className="grid grid-cols-12 items-baseline gap-4 px-6 py-10 md:px-10">
        <div className="col-span-12 md:col-span-2">
          <SectionLabelSwap
            primary="B — Selected work"
            secondary="three of them. more coming."
          />
        </div>
        <p className="col-span-12 text-sm text-muted-foreground md:col-span-6 md:col-start-3">
          A curated index. Hover to glimpse, click through for the full list.
        </p>
        <div className="col-span-12 md:col-span-3 md:justify-self-end">
          <MagneticButton>
            <Link
              to="/work"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground"
            >
              <span>All work</span>
              <span className="inline-block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-20 group-hover:bg-accent" />
            </Link>
          </MagneticButton>
        </div>
      </div>

      <StickyProjectPanels items={featured} />
    </section>
  );
}

function LabsGateway() {
  return (
    <section
      id="labs"
      className="border-t border-border"
    >
      {/* Labs visual — contained to this section */}
      <div className="pointer-events-none relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <ErrorBoundary>
            <Suspense fallback={null}>
              <LabsVisual />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="relative z-10">
          <HorizontalLabsScroll items={labs} />
        </div>
      </div>
    </section>
  );
}

function Background() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
        <div className="md:col-span-2">
          <SectionLabelSwap
            primary="D — Background"
            secondary="where I've been."
          />
        </div>

        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6">Internship</p>
            <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
              Web Developer Intern
              <br />
              <span className="text-muted-foreground">
                Software Productivity Strategists
              </span>
            </h3>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              July — September 2025
            </p>
            <p className="mt-8 max-w-md text-base leading-relaxed text-foreground/80">
              Shipped to a live production site in React and Tailwind. Rebuilt
              static sections into animated, interactive ones. Applied SEO
              practice across the codebase.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-6">Education</p>

            <div>
              <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
                B.S. Computer Science
                <br />
                <span className="text-muted-foreground">Bahria University</span>
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Graduating June 2026 · Lahore
              </p>
            </div>

            <div className="mt-10 border-t border-border pt-10">
              <h3 className="font-display text-2xl leading-tight tracking-tight md:text-3xl">
                FSc Pre-Engineering
                <br />
                <span className="text-muted-foreground">
                  Government College University (GCU)
                </span>
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                July 2021 — July 2023
              </p>
            </div>

            <p className="mt-10 max-w-md text-sm leading-relaxed text-muted-foreground">
              <span className="text-foreground">Certification</span> · Full
              Stack Web Development, NAVTTC, Lahore.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative border-t border-border px-6 py-32 md:px-10 md:py-48"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabelSwap
          primary="E — Contact"
          secondary="say something."
        />
        <Reveal>
          <Link
            to="/contact"
            data-cursor="hover"
            className="group mt-10 block"
          >
            <KineticText className="display-hero block leading-[0.92] text-foreground transition-colors duration-500 group-hover:text-accent">
              Tell me what you're building.
            </KineticText>
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-3">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Open to full-time roles, collaborations, and internship
              opportunities. Lahore-based, comfortable with remote.
            </p>
            <div className="mt-6">
              <AvailabilityDot />
            </div>
          </div>
          <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.22em] md:col-span-3 md:col-start-10 md:items-end">
            <MagneticButton>
              <Link
                to="/contact"
                data-cursor="hover"
                className="text-foreground transition-colors hover:text-accent"
              >
                Contact page →
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://www.linkedin.com/in/safi-ur-rehman99"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="text-foreground transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://github.com/Safi-ur-Rehman99"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="text-foreground transition-colors hover:text-accent"
              >
                GitHub ↗
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <span>© 2026 Safi Ur Rehman</span>
        <span>Lahore — 31.5204° N</span>
        <span>Designed &amp; built in-house</span>
      </div>
    </footer>
  );
}
