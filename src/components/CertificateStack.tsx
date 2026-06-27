import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credential?: string;
};

const defaultCertificates: Certificate[] = [
  {
    id: "navttc",
    title: "Full Stack Web Development",
    issuer: "NAVTTC",
    date: "2024",
    credential: "Lahore, Pakistan",
  },
  // Placeholder cards to demonstrate the stack effect
  // Replace with real certificates as you earn them
  {
    id: "placeholder-1",
    title: "Coming Soon",
    issuer: "—",
    date: "2025",
    credential: "Next certification",
  },
  {
    id: "placeholder-2",
    title: "Coming Soon",
    issuer: "—",
    date: "2025",
    credential: "In progress",
  },
];

type Props = {
  items?: Certificate[];
};

const PEEK_OFFSET = 10; // px each stacked card peeks
const PEEK_SCALE = 0.04; // scale reduction per card in stack
const PEEK_ROTATE = 3; // deg rotation per card in stack

export default function CertificateStack({ items = defaultCertificates }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reduced = useReducedMotion();

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  if (reduced) {
    return (
      <div className="space-y-4">
        {items.map((cert) => (
          <div key={cert.id} className="border border-border p-6">
            <p className="eyebrow text-accent">{cert.issuer}</p>
            <h3 className="mt-2 font-display text-xl">{cert.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{cert.date}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="select-none">
      {/* Stack container */}
      <div
        className="relative mx-auto"
        style={{
          height: "clamp(220px, 35vw, 320px)",
          maxWidth: "min(100%, 480px)",
        }}
      >
        {/* Render peeking cards behind (non-active) */}
        {items.map((cert, i) => {
          if (i === activeIndex) return null;

          // How many positions behind?
          const offset =
            ((i - activeIndex + items.length) % items.length);
          const clamped = Math.min(offset, 3); // max 3 cards visible behind

          return (
            <div
              key={cert.id}
              className="absolute inset-0 cursor-pointer"
              style={{
                transform: `
                  translateY(${clamped * PEEK_OFFSET}px)
                  scale(${1 - clamped * PEEK_SCALE})
                  rotate(${(i % 2 === 0 ? 1 : -1) * clamped * PEEK_ROTATE}deg)
                `,
                zIndex: items.length - clamped,
                transformOrigin: "bottom center",
                transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
              onClick={goNext}
              aria-hidden
            >
              <div
                className="h-full w-full border border-border bg-card"
                style={{ opacity: 0.5 + 0.15 * (3 - clamped) }}
              />
            </div>
          );
        })}

        {/* Active card — flip-in animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            className="absolute inset-0"
            style={{ zIndex: items.length + 1, perspective: 1000 }}
            initial={{ rotateY: direction * 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: direction * -90, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-full w-full border border-accent/40 bg-card p-8 md:p-10">
              {/* Card index */}
              <span className="eyebrow text-muted-foreground">
                {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>

              {/* Issuer badge */}
              <div className="mt-6 inline-flex items-center gap-2 border border-accent/30 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[0.65rem] uppercase tracking-[0.22em] text-accent">
                  {items[activeIndex].issuer}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
                {items[activeIndex].title}
              </h3>

              {/* Meta */}
              <div className="mt-auto flex items-end justify-between pt-8">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {items[activeIndex].credential}
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {items[activeIndex].date}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {items.length > 1 && (
        <div className="mt-8 flex items-center gap-6">
          <button
            type="button"
            onClick={goPrev}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Previous certificate"
          >
            <span className="inline-block h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
            Prev
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > activeIndex ? 1 : -1);
                  setActiveIndex(i);
                }}
                className="h-px transition-all duration-300"
                style={{
                  width: i === activeIndex ? "2rem" : "0.75rem",
                  background:
                    i === activeIndex
                      ? "var(--color-accent)"
                      : "var(--color-border)",
                }}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Next certificate"
          >
            Next
            <span className="inline-block h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
          </button>
        </div>
      )}

      {/* Hint */}
      <p className="mt-4 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/50">
        Click card or use arrows to cycle
      </p>
    </div>
  );
}
