import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  hitPadding?: number;
};

export default function MagneticButton({
  children,
  className = "",
}: Props) {
  return (
    <div className={`inline-flex ${className}`}>
      {children}
    </div>
  );
}

