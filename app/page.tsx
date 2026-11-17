import {
  HeroSection,
  ValuePillarsSection,
  ServicesOverviewSection,
  WorkingMethodologySection,
  ConversionCtaSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Core Value Pillars */}
      <ValuePillarsSection />

      {/* 3. Services Overview */}
      <ServicesOverviewSection />

      {/* 4. Working Methodology */}
      <WorkingMethodologySection />

      {/* 5. Conversion CTA Banner */}
      <ConversionCtaSection />
    </>
  );
}
