import Container from "@/components/ui/Container";
import { processSteps } from "@/data/process";

export default function Process() {
  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How we work
          </h2>
          <p className="mt-4 text-lg text-white/75">
            A simple process, so you always know what happens next.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-navy">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-white/75">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
