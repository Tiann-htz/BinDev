import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";

const featuredProjects = projects.filter(
  (project) => project.featured !== false
);

function ProjectImage({ project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        width={800}
        height={500}
        className="h-full w-full object-cover object-top"
      />
    );
  }

  // Placeholder until a real screenshot is added in data/projects.js
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(70%_70%_at_50%_0%,rgba(184,255,61,0.15),transparent)]">
      <span className="text-sm font-medium text-muted">
        Screenshot coming soon
      </span>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section className="border-t border-hair bg-background text-foreground">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured work
            </h2>
            <p className="mt-4 text-lg text-muted">
              A few things we have built for real people and businesses.
            </p>
          </div>
          <Button href="/work" variant="light">
            See all work
          </Button>
        </div>

        <Reveal delay={120} className={`mt-12 grid gap-6 ${
          featuredProjects.length <= 1
            ? "md:grid-cols-1 lg:grid-cols-1"
            : "md:grid-cols-2 lg:grid-cols-3"
        }`}>
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-hair bg-surface"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-hair bg-surface">
                <ProjectImage project={project} />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-signal">
                  {project.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 flex-1 text-muted">
                  {project.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80"
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
                    className="mt-6 text-sm font-medium text-signal hover:underline"
                  >
                    Visit site &rarr;
                  </a>
                )}
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

