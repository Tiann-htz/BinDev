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
            <Link
              href="/"
              aria-label="BinDev home"
              className="relative block h-10 w-[64px] overflow-hidden"
            >
              <Image
                src="/logo.jpg"
                alt="BinDev"
                width={1024}
                height={1024}
                className="absolute max-w-none"
                style={{
                  width: "130.3%",
                  height: "211.6%",
                  left: "-14.9%",
                  top: "-55.8%",
                }}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
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
                      className="text-sm text-muted transition hover:text-foreground"
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
