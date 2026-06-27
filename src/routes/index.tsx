import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/projects";
import { labs } from "@/lib/labs";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/SiteNav";
import AvailabilityDot from "@/components/AvailabilityDot";
import TextReveal from "@/components/TextReveal";
import HorizontalProjectScroll from "@/components/HorizontalProjectScroll";
import HorizontalLabsScroll from "@/components/HorizontalLabsScroll";
import SectionLabelSwap from "@/components/SectionLabelSwap";
import MagneticButton from "@/components/MagneticButton";
import KineticText from "@/components/KineticText";
import ErrorBoundary from "@/components/ErrorBoundary";
import EducationTimeline from "@/components/EducationTimeline";
import CertificateStack from "@/components/CertificateStack";
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
      <EducationSection />
      <ExperienceSection />
      <CertificatesSection />
      <LabsGateway />
      <ContactCTA />
      <Footer />
    </div>
  );
}

// ─── Hero entrance variants ───────────────────────────────────────────────────
const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.6 },
  },
};

const slideFromLeft = {
  hidden: { x: -120, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideFromRight = {
  hidden: { x: 120, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideFromBottom = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeScale = {
  hidden: { scale: 1.18, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !heroRef.current || !textRef.current || !sceneRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax: the 3D scene is pinned with position:fixed behavior
      // through translateY compensation — it scrolls at ~20% of normal speed
      gsap.to(sceneRef.current, {
        y: () => -(window.innerHeight * 0.15),
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Text scrolls at a faster rate so it leaves the scene behind
      gsap.to(textRef.current, {
        y: () => -(window.innerHeight * 0.45),
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* 3D scene background — fades + scales in slowly to hide loading delay */}
      <motion.div
        ref={sceneRef}
        className="pointer-events-auto absolute inset-0"
        style={{ willChange: "transform" }}
        variants={fadeScale}
        initial="hidden"
        animate="visible"
      >
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
      </motion.div>

      {/* Text content — staggered entrance from different directions */}
      <motion.div
        ref={textRef}
        className="pointer-events-none relative z-10 flex min-h-screen flex-col justify-between px-6 pt-32 pb-10 md:px-10 md:pt-40 md:pb-14"
        style={{ willChange: "transform" }}
        variants={heroStagger}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-10 md:grid-cols-12">
          {/* Eyebrow — slides from left */}
          <motion.div className="md:col-span-2" variants={slideFromLeft}>
            <p className="eyebrow">Index 001</p>
          </motion.div>

          {/* Name — first line from left, second from right */}
          <div className="md:col-span-10">
            <h1 className="display-hero text-foreground">
              <motion.span className="block" variants={slideFromLeft}>
                <KineticText className="inline">Safi Ur</KineticText>
              </motion.span>
              <motion.span className="block" variants={slideFromRight}>
                <KineticText className="inline">
                  Rehman
                </KineticText>
                <span className="text-accent">.</span>
              </motion.span>
            </h1>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:mt-0 md:grid-cols-12 md:items-end">
          {/* Bio — slides up from bottom */}
          <motion.div className="md:col-span-6 md:col-start-3" variants={slideFromBottom}>
            <p className="max-w-md text-base leading-relaxed text-foreground/80 md:text-lg">
              Full-stack developer in Lahore. I build MERN products that ship
              to real users, and a few small things that exist only because I
              got curious.
            </p>
            <div className="pointer-events-auto mt-6">
              <AvailabilityDot label="Available — full-time & collaborations" />
            </div>
          </motion.div>

          {/* CTA — slides from right */}
          <motion.div className="md:col-span-3 md:col-start-10 md:justify-self-end" variants={slideFromRight}>
            <MagneticButton>
              <Link
                to="/work"
                className="pointer-events-auto group inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground"
              >
                <span>Selected work</span>
                <span
                  className="inline-block h-px w-10 bg-foreground transition-all duration-500 group-hover:w-16 group-hover:bg-accent"
                  aria-hidden
                />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
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
  return <HorizontalProjectScroll items={featured} />;
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

// ─── Education (vertical timeline) ────────────────────────────────────────────
function EducationSection() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 md:grid md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabelSwap
              primary="D — Education"
              secondary="the path so far."
            />
          </div>
          <div className="mt-4 md:col-span-5 md:col-start-3 md:mt-0">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
                Three institutions,<br />
                <span className="text-muted-foreground">one direction.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <EducationTimeline />
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:grid md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabelSwap
              primary="E — Experience"
              secondary="where I've worked."
            />
          </div>
        </div>

        <Reveal>
          <div className="group relative overflow-hidden border border-border bg-card transition-colors duration-500 hover:border-accent/40">
            {/* Accent glow on hover */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,91,31,0.06), transparent 40%)",
              }}
            />

            <div className="grid gap-0 md:grid-cols-12">
              {/* Left — meta */}
              <div className="border-b border-border p-8 md:col-span-4 md:border-b-0 md:border-r md:p-12">
                <p className="eyebrow mb-4 text-accent">Internship</p>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  July — September 2025
                </p>
                <div className="mt-8">
                  <div className="h-px w-12 bg-accent/40" />
                </div>
                <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Software Productivity Strategists
                </p>
              </div>

              {/* Right — content */}
              <div className="p-8 md:col-span-8 md:p-12">
                <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
                  Web Developer Intern
                </h3>
                <p className="mt-8 max-w-lg text-base leading-relaxed text-foreground/80">
                  Shipped to a live production site in React and Tailwind. Rebuilt
                  static sections into animated, interactive ones. Applied SEO
                  practice across the codebase.
                </p>
                <div className="mt-10 flex flex-wrap gap-2">
                  {["React", "Tailwind CSS", "SEO", "Animation"].map((tag) => (
                    <span
                      key={tag}
                      className="border border-border px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Certificates (3D flip stack) ─────────────────────────────────────────────
function CertificatesSection() {
  return (
    <section className="border-t border-border px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabelSwap
              primary="F — Certificates"
              secondary="credentials earned."
            />
          </div>
          <div className="md:col-span-5 md:col-start-3">
            <Reveal>
              <p className="text-base leading-relaxed text-muted-foreground">
                Certifications and credentials. More are being added as I complete them.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="md:grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-3">
            <Reveal>
              <CertificateStack />
            </Reveal>
          </div>
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
          primary="G — Contact"
          secondary="say something."
        />
        <Reveal>
          <Link
            to="/contact"
            className="group mt-10 block"
          >
            <KineticText className="display-hero block leading-[0.92] text-foreground transition-colors duration-500 group-hover:text-accent">
              Got a project? Let's talk.
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
