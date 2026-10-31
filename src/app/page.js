import Hero from "@/components/sections/home/Hero";
import ServiceCards from "@/components/sections/home/ServiceCards";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import Process from "@/components/sections/home/Process";
import FinalCTA from "@/components/sections/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <FeaturedProjects />
      <Process />
      <FinalCTA />
    </>
  );
}
