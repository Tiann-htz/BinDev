import Link from "next/link";
import Container from "@/components/ui/Container";
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
      strokeWidth="1.8"
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
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What we can build for you
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Pick the size that fits your business. We will help you choose.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={service.href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand/60 hover:bg-white/10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon name={service.icon} />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 flex-1 text-white/75">{service.description}</p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-white/60">{service.note}</span>
                <span className="font-medium text-brand transition group-hover:translate-x-1">
                  Learn more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
