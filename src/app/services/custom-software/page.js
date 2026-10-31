import { serviceDetails } from "@/data/serviceDetails";
import ServiceDetail from "@/components/sections/services/ServiceDetail";

export const metadata = {
  title: "Custom software",
  description:
    "Business systems with admin and user portals, reports, and data import.",
};

export default function CustomSoftwarePage() {
  return <ServiceDetail detail={serviceDetails["custom-software"]} />;
}
