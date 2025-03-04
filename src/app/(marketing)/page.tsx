import { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <div className="container mx-auto">
      <Hero />
      <Hero />
    </div>
  );
}
