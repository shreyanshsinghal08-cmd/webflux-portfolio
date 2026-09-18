import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type EyebrowProps = {
  index: string;
  label: string;
  className?: string;
};

export function Eyebrow({ index, label, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] uppercase text-mint-2/90",
        className,
      )}
    >
      <span className="h-px w-8 bg-mint/50" />
      <span>
        {index} <span className="text-mist/50">—</span> {label}
      </span>
    </div>
  );
}

type HeaderProps = {
  index: string;
  label: string;
  title: ReactNode;
  copy?: string;
  right?: ReactNode;
};

export function SectionHeader({ index, label, title, copy, right }: HeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-8">
      <div className="max-w-2xl space-y-5">
        <Eyebrow index={index} label={label} />
        <h2 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.06] tracking-[-0.02em] text-frost">
          {title}
        </h2>
        {copy && <p className="max-w-xl text-[15px] leading-relaxed text-mist">{copy}</p>}
      </div>
      {right}
    </div>
  );
}

type MintButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  large?: boolean;
};

export function MintButton({ children, href = "#book", className, large }: MintButtonProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-mint font-semibold text-ink transition-colors duration-300 hover:bg-mint-2",
        "shadow-[0_14px_44px_-10px_rgba(16,185,129,0.55)] hover:shadow-[0_18px_54px_-8px_rgba(16,185,129,0.65)]",
        large ? "px-8 py-4 text-[15px]" : "px-6 py-3 text-sm",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}

export function GhostButton({ children, href = "#courses", className }: MintButtonProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white/12 px-6 py-3 text-sm font-medium text-frost/90 backdrop-blur-sm transition-colors duration-300 hover:border-mint/50 hover:text-white",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
