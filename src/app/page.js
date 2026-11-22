import Hero from "@/components/sections/home/Hero";
import ServicesCinematic from "@/components/sections/home/ServicesCinematic";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import Process from "@/components/sections/home/Process";
import FinalCTA from "@/components/sections/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesCinematic />
      <FeaturedProjects />
      <Process />
      <FinalCTA />
    </>
  );
}


