import { services } from "@/data/services";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/home/FinalCTA";

export const metadata = {
  title: "Services",
  description: "Websites, web apps, and custom software for small businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-background py-20 text-foreground">
        <Container>
          <Reveal>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Services
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              What we can build
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              Pick the size that fits your business. We will help you choose.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-hair bg-background py-16 text-foreground">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 100}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-hair bg-surface p-6 transition hover:border-signal/40"
                >
                  <h2 className="text-xl font-semibold">{service.title}</h2>
                  <p className="mt-3 flex-1 text-muted">{service.description}</p>
                  <span className="mt-6 text-sm font-medium text-signal">
                    {service.note}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
