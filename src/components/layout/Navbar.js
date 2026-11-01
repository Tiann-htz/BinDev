"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-20 w-full pt-6">
      {/* Header is 80px tall (h-20 = 24px top gap + 56px bar). The Hero pulls
          itself up by the same 80px (-mt-20) so its background reaches the top
          of the page. If you change this height, change the Hero too. */}
      <Container className="flex h-14 items-center justify-between rounded-full border border-hair bg-surface/60 px-6 backdrop-blur-xl">
        {/* Logo: mark on the left, BinDev wordmark right next to it.
            Images are trimmed copies in /public/brand (made from logo1.png and
            textlogo.png). Sizes: mark h-9 (36px), wordmark h-5 (20px), gap-2.5. */}
        <Link
          href="/"
          aria-label="BinDev home"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={224}
            height={168}
            priority
            className="logo-adapt h-9 w-auto"
          />
          <Image
            src="/brand/logo-wordmark.png"
            alt="BinDev"
            width={526}
            height={84}
            priority
            className="logo-adapt h-5 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: theme switch, then the call button (desktop) or the menu button (phone) */}
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />

          <div className="hidden md:block">
            <Button href="/contact" size="md">
              Book a free call
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground md:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <Container className="mt-3 flex flex-col gap-1 rounded-2xl border border-hair bg-surface/80 py-4 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 text-base font-medium text-foreground/90 hover:bg-surface hover:text-signal"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" onClick={() => setOpen(false)} className="mt-3">
            Book a free call
          </Button>
        </Container>
      )}
    </header>
  );
}
