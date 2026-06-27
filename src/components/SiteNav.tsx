import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const navContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.8 },
  },
};

const navItem = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SiteNav() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      variants={navContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <motion.div variants={navItem}>
          <MagneticButton>
            <Link
              to="/"
              data-cursor="hover"
              className="flex items-center gap-3 font-display text-lg tracking-tight text-foreground"
            >
              <span>
                Safi<span className="text-accent">.</span>
              </span>
              <span className="relative hidden h-1.5 w-1.5 sm:inline-flex" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
            </Link>
          </MagneticButton>
        </motion.div>

        <nav className="flex items-center gap-5 text-xs uppercase tracking-[0.22em] text-foreground md:gap-7">
          <motion.div variants={navItem}>
            <MagneticButton intensity={0.25}>
              <Link
                to="/work"
                data-cursor="hover"
                activeProps={{ className: "text-accent" }}
                className="transition-opacity hover:opacity-60"
              >
                Work
              </Link>
            </MagneticButton>
          </motion.div>
          <motion.div variants={navItem}>
            <MagneticButton intensity={0.25}>
              <Link
                to="/labs"
                data-cursor="hover"
                activeProps={{ className: "text-accent" }}
                className="transition-opacity hover:opacity-60"
              >
                Labs
              </Link>
            </MagneticButton>
          </motion.div>
          <motion.div variants={navItem}>
            <MagneticButton intensity={0.25}>
              <Link
                to="/contact"
                data-cursor="hover"
                activeProps={{ className: "text-accent" }}
                className="transition-opacity hover:opacity-60"
              >
                Contact
              </Link>
            </MagneticButton>
          </motion.div>
          <motion.span
            className="hidden h-3 w-px bg-foreground/40 md:inline-block"
            aria-hidden
            variants={navItem}
          />
          <motion.div variants={navItem}>
            <MagneticButton intensity={0.25}>
              <a
                href="https://github.com/Safi-ur-Rehman99"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="hidden transition-opacity hover:opacity-60 sm:inline"
              >
                GH
              </a>
            </MagneticButton>
          </motion.div>
          <motion.div variants={navItem}>
            <MagneticButton intensity={0.25}>
              <a
                href="https://www.linkedin.com/in/safi-ur-rehman99"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="hidden transition-opacity hover:opacity-60 sm:inline"
              >
                LI
              </a>
            </MagneticButton>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}

