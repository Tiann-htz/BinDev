import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-[100svh] flex-col justify-center overflow-hidden bg-background text-foreground">
      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Volumetric signal glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--signal) 0%, transparent 70%)" }}
      />

      <Container className="relative pb-16 pt-32 sm:pb-20 sm:pt-36">
        <Reveal delay={0}>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
            BinDev / software studio
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Websites and web apps that run your business.
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-8 max-w-2xl text-lg text-muted sm:text-xl">
            A small team building clean, fast, reliable software for small
            businesses, from a simple site to a system made just for you.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              Book a free call
            </Button>
            <Button href="/services" variant="outline" size="lg">
              See our services
            </Button>
          </div>
        </Reveal>

        <Reveal delay={480}>
          <p className="mt-6 font-mono text-sm text-muted">
            Simple websites start at $175.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
