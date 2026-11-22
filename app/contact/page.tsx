import type { Metadata } from "next";
import { Container } from "@/components/common";
import {
  ContactHero,
  ContactInfo,
  ContactForm,
  WhatHappensNext,
  ContactClosingCta,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Drop us a line! Connect with BIZWORKIT (S) PTE LTD in Singapore for professional technology assistance, multi-OS support, and managed IT outsourcing.",
};

export default function ContactPage() {
  return (
    <>
      {/* Section 1: Contact Hero */}
      <ContactHero />

      {/* Sections 2 & 3: Corporate Info & Interactive Contact Form */}
      <section
        aria-labelledby="contact-form-heading"
        className="py-16 sm:py-24 bg-slate-50/50 border-y border-slate-200/80"
      >
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4: What Happens Next */}
      <WhatHappensNext />

      {/* Section 5: Closing CTA */}
      <ContactClosingCta />
    </>
  );
}
