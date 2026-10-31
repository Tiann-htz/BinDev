import Container from "@/components/ui/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function WorkGrid() {
  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
