"use client";

import React from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { useLanguage } from "@/lib/i18n";

export function NotFoundContent() {
  const { t } = useLanguage();
  const notFound = t.notFound;

  return (
    <div className="flex flex-1 items-center justify-center py-24 sm:py-32">
      <Container className="text-center">
        <p className="text-base font-bold text-blue-600 uppercase tracking-wide">
          {notFound.badge}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {notFound.title}
        </h1>
        <p className="mt-4 text-base text-slate-600 max-w-md mx-auto">
          {notFound.description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
            {notFound.buttonHome}
          </Button>
          <Button href="/contact" variant="secondary" size="md" className="w-full sm:w-auto">
            {notFound.buttonContact}
          </Button>
        </div>
      </Container>
    </div>
  );
}
