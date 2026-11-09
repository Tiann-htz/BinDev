import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services/websites", label: "Websites" },
      { href: "/services/web-apps", label: "Web apps" },
      { href: "/services/custom-software", label: "Custom software" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/work", label: "Work" },
      { href: "/pricing", label: "Pricing" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-hair bg-background text-foreground">
      <Container className="py-12">
        <div className="grid gap-10 pb-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            {/* Logo: mark on top, BinDev wordmark right below it.
                Sizes: mark h-14 (56px), wordmark h-6 (24px), gap-3. */}
            <Link
              href="/"
              aria-label="BinDev home"
              className="flex w-fit flex-col items-start gap-3"
            >
              <Image
                src="/brand/logo-mark.png"
                alt=""
                width={224}
                height={168}
                className="logo-adapt h-14 w-auto"
              />
              <Image
                src="/brand/logo-wordmark.png"
                alt="BinDev"
                width={526}
                height={84}
                className="logo-adapt h-6 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-muted">
              Websites, web apps, and custom software for small businesses.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-xs font-medium uppercase tracking-wide text-signal">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="no-glow text-sm text-muted transition hover:text-signal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-hair pt-6 text-sm text-muted">
          (c) 2026 BinDev. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
