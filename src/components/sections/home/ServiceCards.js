import Link from "next/link";
import Container from "@/components/ui/Container";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { services } from "@/data/services";

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
              <ServiceIcon name={service.icon} />
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
