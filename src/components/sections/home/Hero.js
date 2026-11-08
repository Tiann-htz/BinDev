import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import DeviceShowcase from "@/components/ui/DeviceShowcase";

export default function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-[100svh] flex-col justify-center overflow-hidden bg-background text-foreground">
      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Volumetric signal glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-12%] h-[700px] w-[700px] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--signal) 0%, transparent 68%)" }}
      />

      <Container className="relative pb-16 pt-32 sm:pb-20 sm:pt-36 xl:grid xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:items-center xl:gap-6">
        <div>
          <Reveal>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted">
              BinDev / software studio
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-7 max-w-4xl text-[clamp(3rem,6vw,5.25rem)] xl:text-[clamp(2.75rem,4.2vw,4.75rem)] font-bold leading-[0.96] tracking-tight text-foreground">
              Websites and web apps{" "}
              <span className="inline-block h-[0.78em] w-[2.4em] translate-y-[0.08em] rounded-full align-middle bg-[linear-gradient(135deg,var(--signal),color-mix(in_srgb,var(--signal)_40%,transparent))]" />{" "}
              that run your business.
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              A small team building clean, fast, reliable software for small
              businesses, from a simple site to a system made just for you.
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact" size="lg">
                Book a free call
              </Button>
              <Button href="/services" variant="outline" size="lg">
                See our services
              </Button>
            </div>
          </Reveal>

          <Reveal delay={460}>
            <p className="mt-8 font-mono text-sm text-muted">
              Simple websites start at $175.
            </p>
          </Reveal>
        </div>
        {/* REMOVABLE: floating 3D phone/laptop (also remove the import + the xl: grid classes on Container) */}
        <div className="hidden xl:block">
          <DeviceShowcase />
        </div>
      </Container>
    </section>
  );
}
