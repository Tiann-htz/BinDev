import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/home/FinalCTA";
import { websiteTiers, customTiers, carePlan, pricingFaqs } from "@/data/pricing";

export const metadata = {
  title: "Pricing",
  description: "Website and software pricing. Starter sites from $175.",
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-background py-20 text-foreground">
        <Container>
          <Reveal>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Pricing
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Simple prices, no surprises.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              Prices in USD. Local clients can pay in PHP via GCash or bank
              transfer.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-hair bg-background py-16 text-foreground">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Websites</h2>
                <div className="mt-6 space-y-6">
                  {websiteTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`relative rounded-2xl border bg-surface p-6 ${
                        tier.recommended
                          ? "border-signal/50"
                          : "border-hair"
                      }`}
                    >
                      {tier.recommended && (
                        <span className="absolute -top-3 left-6 rounded-full bg-signal px-3 py-1 text-xs font-semibold text-signal-ink">
                          Recommended
                        </span>
                      )}
                      {tier.recommended && (
                        <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-signal" />
                      )}
                      <h3 className="text-xl font-semibold">{tier.name}</h3>
                      <p className="mt-2 font-mono text-2xl text-signal">
                        {tier.price}
                      </p>
                      <p className="mt-2 text-xs text-muted">
                        {tier.final ? "Final price" : "Suggested price"}
                      </p>
                      <p className="mt-4 text-muted">{tier.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Web apps and systems
                </h2>
                <div className="mt-6 space-y-6">
                  {customTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="rounded-2xl border border-hair bg-surface p-6"
                    >
                      <h3 className="text-xl font-semibold">{tier.name}</h3>
                      <p className="mt-2 font-mono text-2xl text-signal">
                        {tier.price}
                      </p>
                      <p className="mt-2 text-xs text-muted">Suggested pricing</p>
                      <p className="mt-4 text-muted">{tier.description}</p>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-hair bg-surface p-6">
                    <h3 className="text-xl font-semibold">{carePlan.name}</h3>
                    <p className="mt-2 font-mono text-2xl text-signal">
                      {carePlan.price}
                    </p>
                    <p className="mt-2 text-xs text-muted">Suggested range</p>
                    <p className="mt-4 text-muted">{carePlan.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">Pricing FAQ</h2>
            <div className="mt-6 divide-y divide-hair">
              {pricingFaqs.map((item) => (
                <div key={item.q} className="py-5">
                  <p className="font-semibold text-foreground">{item.q}</p>
                  <p className="mt-2 text-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
