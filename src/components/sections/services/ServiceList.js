import Link from "next/link";
import Container from "@/components/ui/Container";
import ServiceIcon from "@/components/ui/ServiceIcon";
import CheckList from "@/components/ui/CheckList";
import { services } from "@/data/services";

// Overview: one wide row per service, with what is included.
export default function ServiceList() {
  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="space-y-6 py-16 sm:py-20">
        {services.map((service) => (
          <article
            key={service.slug}
            className="grid gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:gap-12"
          >
            <div className="flex flex-col">
              <ServiceIcon name={service.icon} />
              <h2 className="mt-5 text-2xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-white/75">{service.description}</p>
              <p className="mt-4 text-sm font-medium text-brand">
                {service.note}
              </p>
              <Link
                href={service.href}
                className="mt-6 text-sm font-medium text-brand hover:underline"
              >
                Learn more about {service.title.toLowerCase()} &rarr;
              </Link>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                What you get
              </h3>
              <CheckList items={service.included} className="mt-4" />
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}
