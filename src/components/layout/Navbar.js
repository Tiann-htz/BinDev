"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <Container className="flex h-20 items-center justify-between">
        {/* Logo: the square logo.jpg is cropped to just the artwork */}
        <Link
          href="/"
          aria-label="BinDev home"
          onClick={() => setOpen(false)}
          className="relative block h-14 w-[91px] overflow-hidden sm:h-16 sm:w-[104px]"
        >
          <Image
            src="/logo.jpg"
            alt="BinDev"
            width={1024}
            height={1024}
            priority
            className="absolute max-w-none"
            style={{
              width: "130.3%",
              height: "211.6%",
              left: "-14.9%",
              top: "-55.8%",
            }}
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact">Book a free call</Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
        >
          <svg
            width="24"
            height="24"
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
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3"
            >
              Book a free call
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
