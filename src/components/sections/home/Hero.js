import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Soft cyan glow in the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_0%,rgba(3,222,254,0.18),transparent)]"
      />

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <p className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-brand">
          Websites, web apps &amp; custom software
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          We build websites and web apps that help your business grow.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/75">
          BinDev is a small team of developers. We build clean, fast, and
          reliable software for small businesses, from a simple website to a
          system made just for you.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" size="lg">
            Book a free call
          </Button>
          <Button href="/services" variant="light" size="lg">
            See our services
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Simple websites start at $175.
        </p>
      </Container>
    </section>
  );
}
