import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function GrainTexture() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{ opacity: reduced ? 0.02 : 0.04 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
      <style>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          20% { transform: translate(3%, 1%); }
          30% { transform: translate(-1%, 4%); }
          40% { transform: translate(4%, -2%); }
          50% { transform: translate(-3%, 2%); }
          60% { transform: translate(2%, -4%); }
          70% { transform: translate(-4%, 1%); }
          80% { transform: translate(1%, 3%); }
          90% { transform: translate(3%, -1%); }
        }
        [aria-hidden] > svg {
          animation: grain-shift 8s steps(10) infinite;
          width: 120%;
          height: 120%;
          position: absolute;
          top: -10%;
          left: -10%;
        }
      `}</style>
    </div>
  );
}
