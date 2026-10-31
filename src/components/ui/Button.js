import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

const variants = {
  // The loudest button on any page. Use it for "Book a free call".
  primary:
    "bg-brand text-navy shadow-[0_0_24px_rgba(3,222,254,0.45)] hover:shadow-[0_0_32px_rgba(3,222,254,0.65)] hover:brightness-95",
  // Quiet button on white backgrounds.
  outline: "border border-navy/20 text-navy hover:border-navy hover:bg-navy/5",
  // Solid navy button on white backgrounds.
  dark: "bg-navy text-white hover:bg-navy/90",
  // Quiet button on navy backgrounds (Navbar, Footer, dark sections).
  light: "border border-white/30 text-white hover:bg-white/10",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
