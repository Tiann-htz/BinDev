import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import WorkGrid from "@/components/sections/work/WorkGrid";
import FinalCTA from "@/components/sections/home/FinalCTA";

export const metadata = {
  title: "Work",
  description:
    "Websites and web apps BinDev has built for real people and businesses. Read the case studies.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-background py-20 text-foreground">
        <Container>
          <Reveal>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Work
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Things we have built.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              A few real projects, with what we built and why. Open one to read
              the full case study.
            </p>
          </Reveal>
        </Container>
      </section>

      <WorkGrid />
      <FinalCTA />
    </>
  );
}
