import Container from "@/components/ui/Container";

export default function AboutMission() {
  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="grid gap-8 py-16 sm:py-20 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Our mission
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Make work flow faster.
          </h2>
        </div>

        <div className="space-y-4 text-lg text-white/75">
          <p>
            We help businesses and teams make their work easier and faster by
            improving how things flow, from the first request to the final
            result.
          </p>
          <p>
            Whether it is a simple website or a system built just for you, our
            goal is the same: less slow, manual work for you, and more time for
            what matters.
          </p>
        </div>
      </Container>
    </section>
  );
}
