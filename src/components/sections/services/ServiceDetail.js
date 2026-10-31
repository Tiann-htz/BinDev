import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import FinalCTA from "@/components/sections/home/FinalCTA";

export default function ServiceDetail({ detail }) {
  return (
    <>
      <section className="bg-background py-20 text-foreground">
        <Container>
          <Reveal>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Services / {detail.title}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              {detail.title}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-lg text-muted">{detail.summary}</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-hair bg-background py-16 text-foreground">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight">Who it is for</h2>
              <p className="mt-4 text-muted">{detail.whoFor}</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="text-2xl font-bold tracking-tight">What is included</h2>
              <ul className="mt-4 space-y-3">
                {detail.included.map((item) => (
                  <li key={item} className="text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={240}>
              <h2 className="text-2xl font-bold tracking-tight">Typical timeline</h2>
              <p className="mt-4 text-muted">{detail.timeline}</p>
            </Reveal>
            <Reveal delay={360}>
              <h2 className="text-2xl font-bold tracking-tight">Price note</h2>
              <p className="mt-4 text-muted">{detail.priceNote}</p>
            </Reveal>
          </div>
          {detail.relatedProject && (
            <Reveal delay={480}>
              <div className="mt-12 rounded-2xl border border-hair bg-surface p-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  Related project
                </p>
                <p className="mt-2 text-foreground">{detail.relatedProject}</p>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
