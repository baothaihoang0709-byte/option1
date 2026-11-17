import type { Metadata } from "next";
import {
  AboutHero,
  CorporateProfile,
  CustomerCommitment,
  TechnicalStrengths,
  PartnershipCta,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about BIZWORKIT (S) PTE LTD — our mission to make technology accessible, corporate background in Singapore, and our Satisfaction Guaranteed commitment.",
};

export default function AboutPage() {
  return (
    <>
      {/* Section 1: About Hero */}
      <AboutHero />

      {/* Section 2: Corporate Profile */}
      <CorporateProfile />

      {/* Section 3: Customer Commitment */}
      <CustomerCommitment />

      {/* Section 4: Technical Core Strengths */}
      <TechnicalStrengths />

      {/* Section 5: Partnership CTA */}
      <PartnershipCta />
    </>
  );
}
