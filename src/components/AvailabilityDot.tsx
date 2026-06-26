type Props = { label?: string; className?: string };

export default function AvailabilityDot({
  label = "Available for work",
  className = "",
}: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground ${className}`}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      {label}
    </span>
  );
}
