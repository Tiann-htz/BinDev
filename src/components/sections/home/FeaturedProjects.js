import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured work
            </h2>
            <p className="mt-4 text-lg text-white/75">
              A few things we have built for real people and businesses.
            </p>
          </div>
          <Button href="/work" variant="light">
            See all work
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
