import { serviceDetails } from "@/data/serviceDetails";
import ServiceDetail from "@/components/sections/services/ServiceDetail";

export const metadata = {
  title: "Websites",
  description:
    "Clean, fast websites from $175. Starter and business sites for small businesses.",
};

export default function WebsitesPage() {
  return <ServiceDetail detail={serviceDetails.websites} />;
}
