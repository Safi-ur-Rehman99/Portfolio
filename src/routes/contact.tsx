import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/SiteNav";
import AvailabilityDot from "@/components/AvailabilityDot";
import SectionLabelSwap from "@/components/SectionLabelSwap";
import MagneticButton from "@/components/MagneticButton";
import KineticText from "@/components/KineticText";

const EMAIL = "syedsafi3414@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Safi Ur Rehman" },
      {
        name: "description",
        content:
          "Get in touch with Safi Ur Rehman — open to full-time roles, collaborations, and internships.",
      },
      { property: "og:title", content: "Contact — Safi Ur Rehman" },
      {
        property: "og:description",
        content:
          "Get in touch with Safi Ur Rehman — open to full-time roles, collaborations, and internships.",
      },
    ],
    links: [{ rel: "canonical", href: "https://safiurrehman.dev/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const updated = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-background text-foreground">
      <SiteNav />

      <section className="px-6 pt-32 pb-24 md:px-10 md:pt-44 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
          <div className="md:col-span-2">
            <Reveal>
              <SectionLabelSwap
                primary="A — Contact"
                secondary="say something."
              />
            </Reveal>
          </div>

          <div className="md:col-span-10">
            <Reveal>
              <h1 className="display-hero leading-[0.9]" aria-label="Let's build something worth shipping.">
                <KineticText className="inline">Let&apos;s build something</KineticText>
                <br />
                <KineticText className="inline">worth shipping</KineticText>
                <span className="text-accent">.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                The inbox is open. Pitch a role, a project, a half-formed idea
                you want a second pair of hands on. The spam filter is generous.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabelSwap
              primary="B — Email"
              secondary="the direct line."
            />
          </div>
          <div className="md:col-span-10">
            <MagneticButton>
              <button
                type="button"
                onClick={copy}
                data-cursor="hover"
                className="group flex items-baseline gap-6 text-left"
              >
                <span className="font-display text-3xl leading-tight transition-colors group-hover:text-accent md:text-5xl">
                  {EMAIL}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-foreground">
                  {copied ? "Copied ✓" : "Click to copy"}
                </span>
              </button>
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabelSwap
              primary="C — Elsewhere"
              secondary="other places."
            />
          </div>
          <div className="md:col-span-10 grid gap-10 md:grid-cols-2">
            <LinkBlock
              label="LinkedIn"
              href="https://www.linkedin.com/in/safi-ur-rehman99"
              note="The structured version — roles, education, recommendations. Best for recruiters and HR."
            />
            <LinkBlock
              label="GitHub"
              href="https://github.com/Safi-ur-Rehman99"
              note="Active repos, not just a profile. Read the commit messages — that's the real interview."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabelSwap
              primary="D — Status"
              secondary="where things stand."
            />
          </div>
          <div className="md:col-span-10">
            <AvailabilityDot label="Available — actively looking" />
            <p className="mt-6 max-w-xl font-display text-2xl leading-snug text-foreground md:text-3xl">
              Open to full-time roles, collaborations, and internship
              opportunities. Lahore-based, comfortable with remote.
            </p>
            <p className="mt-8 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              Last updated · {updated}
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          <span>© 2026 Safi Ur Rehman</span>
          <span>Lahore — 31.5204° N</span>
        </div>
      </footer>
    </div>
  );
}

function LinkBlock({
  label,
  href,
  note,
}: {
  label: string;
  href: string;
  note: string;
}) {
  return (
    <MagneticButton>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className="group block border-t border-border pt-8"
      >
        <div className="flex items-baseline justify-between">
          <span className="font-display text-3xl tracking-tight transition-colors group-hover:text-accent md:text-4xl">
            {label}
          </span>
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-accent">
            ↗
          </span>
        </div>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
          {note}
        </p>
      </a>
    </MagneticButton>
  );
}
