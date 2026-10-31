import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { projectDetails } from "@/data/projectDetails";

// The list of case studies on /work. Content comes from data/projectDetails.js.
export default function WorkGrid() {
  return (
    <section className="border-t border-hair bg-background py-16 text-foreground">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {projectDetails.map((project, index) => (
            <Reveal key={project.slug} delay={index * 120} className="h-full">
              <Link
                href={`/work/${project.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-hair bg-surface p-6 transition-colors duration-500 hover:border-signal/50 sm:p-8"
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                  {project.client}
                </p>
                <h2 className="mt-4 text-2xl font-bold tracking-tight">
                  {project.title}
                </h2>
                <p className="mt-3 flex-1 text-muted">{project.goal}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-hair px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 text-sm font-medium text-signal transition group-hover:translate-x-1">
                  Read the case study &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
