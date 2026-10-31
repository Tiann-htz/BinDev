import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import ServiceIcon from "@/components/ui/ServiceIcon";
import CheckList from "@/components/ui/CheckList";
import FinalCTA from "@/components/sections/home/FinalCTA";
import { services } from "@/data/services";

export default function ServiceDetail({ service }) {
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHeader
        badge={service.title}
        title={service.headline}
        intro={service.intro}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href="/contact" size="lg">
            Book a free call
          </Button>
          <span className="text-white/70">{service.note}</span>
        </div>
      </PageHeader>

      <section className="border-t border-white/10 bg-navy text-white">
        <Container className="grid gap-6 py-16 sm:py-20 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h2 className="text-xl font-semibold">What you get</h2>
            <CheckList items={service.included} className="mt-5" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Good for</h2>
            <CheckList items={service.goodFor} className="mt-5" />
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-navy text-white">
        <Container className="py-16 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight">
            Other services
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand/60 hover:bg-white/10"
              >
                <ServiceIcon name={item.icon} className="shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-white/75">{item.description}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-brand transition group-hover:translate-x-1">
                    Learn more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
