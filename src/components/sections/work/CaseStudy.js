import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import CheckList from "@/components/ui/CheckList";
import FinalCTA from "@/components/sections/home/FinalCTA";

// One row of the case study: small label on the left, content on the right.
function Block({ number, title, children }) {
  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="grid gap-6 py-12 sm:py-16 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <p className="text-sm font-semibold text-brand">{number}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="text-lg text-white/75">{children}</div>
      </Container>
    </section>
  );
}

export default function CaseStudy({ project }) {
  return (
    <>
      <PageHeader
        badge={project.isSample ? `${project.category} (sample)` : project.category}
        title={project.title}
        intro={project.description}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/work" variant="light">
            &larr; All work
          </Button>
          {project.url && (
            <Button href={project.url} target="_blank" rel="noopener noreferrer">
              Visit live site
            </Button>
          )}
        </div>
      </PageHeader>

      <Block number="01" title="Client and goal">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium uppercase tracking-wide text-white/50">
              Client
            </dt>
            <dd className="mt-1 text-white">{project.client}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium uppercase tracking-wide text-white/50">
              Goal
            </dt>
            <dd className="mt-1 text-white">{project.goal}</dd>
          </div>
        </dl>
      </Block>

      <Block number="02" title="The problem">
        <p>{project.problem}</p>
      </Block>

      <Block number="03" title="What we built">
        <CheckList items={project.built} />
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Block>

      <Block number="04" title="The result">
        <CheckList items={project.result} />
      </Block>

      <section className="border-t border-white/10 bg-navy text-white">
        <Container className="py-12 sm:py-16">
          <p className="text-sm font-semibold text-brand">05</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Screenshots
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {project.screenshots.map((shot, index) => (
              <div
                key={`${shot.src}-${index}`}
                className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 1152px) 560px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/work" className="text-sm font-medium text-brand hover:underline">
              &larr; Back to all work
            </Link>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
