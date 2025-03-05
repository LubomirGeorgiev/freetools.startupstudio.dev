import "server-only";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { industries, tools } from "@/app/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = industries.find((industry) => industry.slug === `/${params.slug}`);

  if (!industry) {
    return {
      title: "Industry Not Found",
      description: "The requested industry page could not be found.",
    };
  }

  return {
    title: `${industry.name} Tools - Free Tools for Startups`,
    description: `Discover our collection of free tools for the ${industry.name} industry to help your startup grow and succeed.`,
  };
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = params;
  const industry = industries.find((industry) => industry.slug === `/${slug}`);

  if (!industry) {
    notFound();
  }

  // Filter tools by industry (assuming we need to match the slug without the leading slash)
  const industrySpecificTools = tools.filter((tool) => {
    // For now, we'll just check if the tool has a category
    // In a real implementation, you would have a proper relationship between tools and industries
    return tool.category !== undefined;
  });

  // Group tools by category
  const toolsByCategory = industrySpecificTools.reduce((acc: Record<string, typeof tools>, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  const categories = Object.keys(toolsByCategory).sort();

  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{industry.name} Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our collection of powerful tools designed specifically for the {industry.name} industry to help your startup grow and succeed.
        </p>
        <div className="text-sm text-muted-foreground">
          {industry.count} tool{industry.count !== 1 ? 's' : ''} available
        </div>
      </div>

      {categories.length > 0 ? (
        categories.map((category) => (
          <section key={category} className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsByCategory[category].map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="block group">
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
                        <Image
                          src={tool.imageUrl}
                          alt={tool.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <Badge className="mb-2 w-fit">{tool.category}</Badge>
                      <CardTitle>{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center text-sm text-primary font-medium">
                        Try it now <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4">No tools available yet</h2>
          <p className="text-muted-foreground">
            We&apos;re currently working on adding tools for the {industry.name} industry. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
