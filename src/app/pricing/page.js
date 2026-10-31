import PageHeader from "@/components/ui/PageHeader";
import PricingCards from "@/components/sections/pricing/PricingCards";
import PricingFAQ from "@/components/sections/pricing/PricingFAQ";
import FinalCTA from "@/components/sections/home/FinalCTA";

export const metadata = {
  title: "Pricing | BinDev",
  description:
    "Simple websites start at $175. Web apps and custom software are priced per project. Book a free call to get a quote.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        badge="Pricing"
        title="Simple, honest pricing."
        intro="Simple websites start at $175. Bigger projects are priced after a free call, so you always know the cost before we start."
      />
      <PricingCards />
      <PricingFAQ />
      <FinalCTA />
    </>
  );
}
