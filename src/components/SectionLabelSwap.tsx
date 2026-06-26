import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      style={{ height: "1em", lineHeight: "1" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!hovered ? (
          <motion.p
            key="primary"
            className="eyebrow whitespace-nowrap"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {primary}
          </motion.p>
        ) : (
          <motion.p
            key="secondary"
            className="eyebrow whitespace-nowrap text-accent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {secondary}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
