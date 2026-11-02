import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ImageFader from "@/components/ui/ImageFader";
import FinalCTA from "@/components/sections/home/FinalCTA";

// One case study page. `project` is an entry from data/projectDetails.js.
export default function CaseStudy({ project }) {
  return (
    <>
      <section className="bg-background py-20 text-foreground">
        <Container>
          <Reveal>
            <Link
              href="/work"
              className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted transition hover:text-signal"
            >
              &larr; All work
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-lg text-muted">{project.goal}</p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Client: {project.client}
            </p>
          </Reveal>
        </Container>
      </section>

      {(project.images?.length > 0 || project.image) && (
        <section className="bg-background pb-16 text-foreground">
          <Container>
            <Reveal>
              {project.images?.length > 0 ? (
                // Several screenshots fading one after another. The box keeps
                // the same shape as a single screenshot (about 2:1).
                <div className="relative aspect-[1900/940] overflow-hidden rounded-2xl border border-hair bg-surface">
                  <ImageFader
                    images={project.images}
                    alt={`${project.title} screenshot`}
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    priority
                  />
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-hair bg-surface">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    width={1600}
                    height={1000}
                    className="h-auto w-full"
                  />
                </div>
              )}
            </Reveal>
          </Container>
        </section>
      )}

      <section className="border-t border-hair bg-background py-16 text-foreground">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight">The problem</h2>
              <p className="mt-4 text-muted">{project.problem}</p>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="text-2xl font-bold tracking-tight">
                What we built
              </h2>
              <ul className="mt-4 space-y-3">
                {project.built.map((item) => (
                  <li key={item} className="text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240}>
              <h2 className="text-2xl font-bold tracking-tight">The result</h2>
              <p className="mt-4 text-muted">{project.result}</p>
            </Reveal>

            <Reveal delay={360}>
              <h2 className="text-2xl font-bold tracking-tight">Built with</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-hair px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-sm font-medium text-signal hover:underline"
                >
                  Visit site &rarr;
                </a>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
