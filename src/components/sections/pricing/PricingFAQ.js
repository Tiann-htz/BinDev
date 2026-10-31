import Container from "@/components/ui/Container";
import CheckList from "@/components/ui/CheckList";
import { priceFactors, faqs } from "@/data/pricing";

export default function PricingFAQ() {
  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What changes the price
          </h2>
          <p className="mt-4 text-white/75">
            Every project is different. These are the things that matter most.
          </p>
          <CheckList items={priceFactors} className="mt-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-xl text-brand transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-white/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
