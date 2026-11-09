import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import FinalCTA from "@/components/sections/home/FinalCTA";
import Team from "@/components/sections/about/Team";

export const metadata = {
  title: "About",
  description:
    "A small team in Davao building software for businesses anywhere.",
};

const values = [
  "Clear scope and clear prices",
  "Working software over big promises",
  "Straight communication, no jargon",
  "Support after launch",
];

const faqs = [
  {
    q: "How long does a project take?",
    a: "Starter websites about 1 week, business sites 2 to 4 weeks, custom systems depend on scope.",
  },
  {
    q: "Can I pay in PHP or GCash?",
    a: "Yes, local clients can pay in PHP via GCash or bank transfer.",
  },
  {
    q: "Do you offer hosting and support?",
    a: "Yes, through the monthly Care Plan.",
  },
  {
    q: "Who owns the code?",
    a: "To be defined in the contract.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-background py-20 text-foreground">
        <Container>
          <Reveal>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              About
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              A small team in Davao building software for businesses anywhere.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              BinDev is a team of friends and developers based in Davao City,
              Philippines. We build websites, web apps, and business systems, from
              the first page to the last line of backend code, for clients here and
              abroad. We work remotely, communicate clearly, and keep pricing
              simple.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-hair bg-background py-16 text-foreground">
        <Container>
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { value: 175, prefix: "$", label: "Starter site from" },
                { value: 7, suffix: " days", label: "Typical delivery" },
                { value: 24, suffix: "h", label: "Reply time" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-hair bg-surface p-6"
                >
                  <p className="font-mono text-3xl font-bold text-signal">
                    <Counter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-hair bg-background py-16 text-foreground">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">Values</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value} delay={index * 80}>
                <div className="rounded-2xl border border-hair bg-surface p-6">
                  <p className="text-foreground">{value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Team />

      <section className="border-t border-hair bg-background py-16 text-foreground">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
          </Reveal>
          <div className="mt-6 divide-y divide-hair">
            {faqs.map((item) => (
              <div key={item.q} className="py-5">
                <p className="font-semibold text-foreground">{item.q}</p>
                <p className="mt-2 text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
