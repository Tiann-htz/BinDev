import { notFound } from "next/navigation";
import CaseStudy from "@/components/sections/work/CaseStudy";
import { projectDetails } from "@/data/projectDetails";

// Build one page for each case study in data/projectDetails.js
export function generateStaticParams() {
  return projectDetails.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectDetails.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.goal,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = projectDetails.find((item) => item.slug === slug);

  if (!project) notFound();

  return <CaseStudy project={project} />;
}
