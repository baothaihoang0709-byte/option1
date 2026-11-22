import type { Metadata } from "next";
import { NotFoundContent } from "@/components/common";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
