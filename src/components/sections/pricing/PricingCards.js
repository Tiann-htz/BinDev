import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ServiceIcon from "@/components/ui/ServiceIcon";
import CheckList from "@/components/ui/CheckList";
import { pricing } from "@/data/pricing";
import { services } from "@/data/services";

export default function PricingCards() {
  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {pricing.map((item) => {
            const service = services.find((s) => s.slug === item.slug);
            if (!service) return null;

            return (
              <article
                key={item.slug}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
              >
                <ServiceIcon name={service.icon} />
                <h2 className="mt-5 text-xl font-semibold">{service.title}</h2>
                <p className="mt-2 text-white/75">{item.blurb}</p>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-sm text-white/60">{item.priceLabel}</p>
                  <p className="mt-1 text-4xl font-bold tracking-tight text-white">
                    {item.price}
                  </p>
                </div>

                <CheckList items={service.included} className="mt-6 flex-1" />

                <Button
                  href="/contact"
                  className="mt-8 w-full"
                  variant={item.slug === "websites" ? "primary" : "light"}
                >
                  Book a free call
                </Button>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
