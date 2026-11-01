import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/services";

const icons = {
  website: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  app: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  custom: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </>
  ),
};

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      {icons[name]}
    </svg>
  );
}

export default function ServiceCards() {
  return (
    <section className="border-t border-hair bg-background text-foreground">
      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What we can build
          </h2>
          <p className="mt-4 text-lg text-muted">
            Pick the size that fits. We help you choose the right scope.
          </p>
        </div>

        <Reveal delay={120} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-flow-dense lg:grid-cols-6">
          {services.map((service, i) => {
            const span =
              i === 0
                ? "md:col-span-2 lg:col-span-4 lg:row-span-2"
                : i === 1
                ? "lg:col-span-2"
                : "lg:col-span-2";
            const tone =
              i === 0
                ? "bg-[radial-gradient(80%_80%_at_0%_0%,color-mix(in_srgb,var(--signal)_12%,transparent),transparent)]"
                : "bg-surface";
            return (
              <Link
                key={service.slug}
                href={service.href}
                className={`group flex min-w-0 flex-col rounded-2xl border border-hair ${span} ${tone} p-6 transition hover:border-signal/40`}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-signal/10 text-signal">
                    <Icon name={service.icon} />
                  </span>
                  {i === 0 && (
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                      Most common
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-muted">{service.description}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
                  <span className="whitespace-nowrap text-muted">{service.note}</span>
                  <span className="whitespace-nowrap font-medium text-signal transition group-hover:translate-x-1">
                    Learn more -&gt;
                  </span>
                </div>
              </Link>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
