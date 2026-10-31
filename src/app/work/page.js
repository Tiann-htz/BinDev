import PageHeader from "@/components/ui/PageHeader";
import WorkGrid from "@/components/sections/work/WorkGrid";
import FinalCTA from "@/components/sections/home/FinalCTA";

export const metadata = {
  title: "Work | BinDev",
  description:
    "Websites, web apps, and custom software built by BinDev. Read how we solved real problems for real people and businesses.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        badge="Work"
        title="Things we have built."
        intro="Real projects, real problems. Open any project to see the goal, what we built, and how it turned out."
      />
      <WorkGrid />
      <FinalCTA />
    </>
  );
}
