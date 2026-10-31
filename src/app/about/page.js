import PageHeader from "@/components/ui/PageHeader";
import AboutMission from "@/components/sections/about/AboutMission";
import TeamGrid from "@/components/sections/about/TeamGrid";
import FinalCTA from "@/components/sections/home/FinalCTA";

export const metadata = {
  title: "About | BinDev",
  description:
    "BinDev is a small team that helps businesses make their work easier and faster with websites, web apps, and custom software.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="About"
        title="A small team that helps your business work faster."
        intro="BinDev builds websites, web apps, and custom software that make your day-to-day work easier."
      />
      <AboutMission />
      <TeamGrid />
      <FinalCTA />
    </>
  );
}
