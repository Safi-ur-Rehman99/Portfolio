import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  primary: string;
  secondary: string;
  className?: string;
};

export default function SectionLabelSwap({
  primary,
  secondary,
  className = "",
}: Props) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  if (reduced) {
    return <p className={`eyebrow ${className}`}>{primary}</p>;
  }

  return (
    <div
      className={`group inline-block cursor-default ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
    >
      {/* Label text — primary fades slightly, secondary fades in underneath */}
      <p
        className="eyebrow whitespace-nowrap transition-colors duration-300"
        style={{ color: hovered ? "var(--color-accent)" : undefined }}
      >
        {primary}
      </p>

      {/* Secondary label — slides down from hidden */}
      <motion.p
        className="eyebrow whitespace-nowrap text-accent/70 overflow-hidden"
        initial={false}
        animate={{
          height: hovered ? "auto" : 0,
          opacity: hovered ? 1 : 0,
          marginTop: hovered ? 2 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {secondary}
      </motion.p>

      {/* Underline bloom — scaleX from left */}
      <div className="relative mt-1 h-px w-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--color-border)" }} />
        <motion.div
          className="absolute inset-0 origin-left"
          style={{ background: "var(--color-accent)" }}
          initial={false}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
