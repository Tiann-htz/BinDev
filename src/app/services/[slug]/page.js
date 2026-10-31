import { notFound } from "next/navigation";
import ServiceDetail from "@/components/sections/services/ServiceDetail";
import { services } from "@/data/services";

// Build one page for each service in data/services.js
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} | BinDev`,
    description: service.intro,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
