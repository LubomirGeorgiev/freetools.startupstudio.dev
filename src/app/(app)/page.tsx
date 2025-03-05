import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";
import { CardItem } from "@/components/card-item";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { getSessionFromCookie } from "@/utils/auth";
import { tools } from "../data";
import HeroCarousel from "@/components/hero-carousel";


export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default async function Home() {
  const session = await getSessionFromCookie();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroCarousel />
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Free AI Tools to Boost Your Productivity
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Access 100+ free AI-powered tools to automate workflows, optimize processes, and transform operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={{ pathname: "/tools" }}>
                  Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {!session && <Button size="lg" variant="outline" asChild>
                <Link href={{ pathname: "/sign-up" }}>
                  Sign Up Free <Zap className="ml-2 h-4 w-4" />
                </Link>
              </Button>}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Popular AI Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link href={{ pathname: `/tools/${tool.slug}` }} key={tool.slug}>
                <CardItem
                  title={tool.name}
                  description={tool.description}
                  category={tool.category}
                  image={tool.imageUrl}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Saving Time Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who are already using our AI tools to boost their productivity.
            </p>
            <Button size="lg" asChild>
              <Link href={{ pathname: "/sign-up" }}>
                Get Started Free
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
