import PageHeader from "@/components/ui/PageHeader";
import ServiceList from "@/components/sections/services/ServiceList";
import FinalCTA from "@/components/sections/home/FinalCTA";

export const metadata = {
  title: "Services | BinDev",
  description:
    "BinDev builds websites, web apps, and custom software for small businesses. See what you get with each service.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="Services"
        title="Websites, web apps, and custom software."
        intro="Whatever size your business is, we have a simple way to help. Not sure which one you need? Book a free call and we will tell you honestly."
      />
      <ServiceList />
      <FinalCTA />
    </>
  );
}
