import Link from "next/link";
import ProjectImage from "@/components/ui/ProjectImage";

// One project card. Used on the Home page and the Work page.
export default function ProjectCard({ project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-white/5">
        <ProjectImage project={project} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-brand">
            {project.category}
          </p>
          {project.isSample && (
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/70">
              Sample
            </span>
          )}
        </div>

        <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
        <p className="mt-3 flex-1 text-white/75">{project.description}</p>

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

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <Link
            href={`/work/${project.slug}`}
            className="text-brand hover:underline"
          >
            Read case study &rarr;
          </Link>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-brand hover:underline"
            >
              Visit site &rarr;
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
