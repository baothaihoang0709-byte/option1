import type { Metadata } from "next";
import {
  ServicesHero,
  TechnicalSupportSection,
  ItOutsourcingSection,
  ValueComparisonSection,
  FaqAccordion,
  ServicesCta,
} from "@/components/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore BIZWORK-IT services: Technical Support across Windows and Linux systems, office network and database assistance, and High ROI IT management outsourcing.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Section 1: Services Hero */}
      <ServicesHero />

      {/* Section 2: Technical Support & Infrastructure Assistance */}
      <TechnicalSupportSection />

      {/* Section 3: IT Management Outsourcing */}
      <ItOutsourcingSection />

      {/* Section 4: Value Comparison Matrix */}
      <ValueComparisonSection />

      {/* Section 5: FAQ Accordion */}
      <FaqAccordion />

      {/* Section 6: Service Consultation CTA */}
      <ServicesCta />
    </>
  );
}
