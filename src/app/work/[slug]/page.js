import { notFound } from "next/navigation";
import CaseStudy from "@/components/sections/work/CaseStudy";
import { projects } from "@/data/projects";

// Build one page for each project in data/projects.js
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | BinDev`,
    description: project.description,
    // Samples are placeholders, so keep them out of Google
    robots: project.isSample ? { index: false, follow: true } : undefined,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return <CaseStudy project={project} />;
}
