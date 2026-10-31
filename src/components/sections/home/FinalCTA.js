import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-navy text-white">
      {/* Soft cyan glow, same style as the Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_100%,rgba(3,222,254,0.15),transparent)]"
      />

      <Container className="relative py-16 text-center sm:py-24">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
          Tell us what you need. The first call is free.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact" size="lg">
            Book a free call
          </Button>
        </div>
      </Container>
    </section>
  );
}
