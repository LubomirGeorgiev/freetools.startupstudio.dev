import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";
import { CardItem } from "@/components/card-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { tools } from "../data";
import HeroCarousel from "@/components/hero-carousel";


export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default async function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <HeroCarousel />


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
