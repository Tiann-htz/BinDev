import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";

const base =
  "group inline-flex items-center justify-between gap-3 rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal active:scale-[0.98]";

const variants = {
  primary:
    "bg-signal text-signal-ink shadow-[0_0_24px_color-mix(in_srgb,var(--signal)_25%,transparent)] hover:shadow-[0_0_36px_color-mix(in_srgb,var(--signal)_45%,transparent)] hover:bg-[color-mix(in_srgb,var(--signal)_92%,white)]",
  outline:
    "border border-hair text-foreground hover:border-signal hover:bg-signal/10 hover:text-signal",
  dark: "bg-surface text-foreground border border-hair hover:border-signal hover:bg-signal/5 hover:text-signal",
  light: "border border-hair text-foreground hover:border-signal hover:bg-signal/10 hover:text-signal",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

function TrailingIcon() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
  );
}

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (href) {
    const link = (
      <Link href={href} className={classes} {...props}>
        <span>{children}</span>
        <TrailingIcon />
      </Link>
    );
    return variant === "primary" ? <Magnetic>{link}</Magnetic> : link;
  }

  const button = (
    <button type="button" className={classes} {...props}>
      <span>{children}</span>
      <TrailingIcon />
    </button>
  );
  return variant === "primary" ? <Magnetic>{button}</Magnetic> : button;
}
