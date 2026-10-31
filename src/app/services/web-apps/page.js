import { serviceDetails } from "@/data/serviceDetails";
import ServiceDetail from "@/components/sections/services/ServiceDetail";

export const metadata = {
  title: "Web apps",
  description:
    "Custom web apps for booking, inventory, portals, and billing, priced per project.",
};

export default function WebAppsPage() {
  return <ServiceDetail detail={serviceDetails["web-apps"]} />;
}
