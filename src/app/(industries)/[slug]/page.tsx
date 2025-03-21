import "server-only";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { industries, tools } from "@/app/data";
import ToolCard from "@/components/tool-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Find the industry by slug
  const industry = industries.find((i) => i.slug === `/${slug}`);

  if (!industry) {
    return {
      title: "Industry Not Found",
      description: "The requested industry page could not be found.",
    };
  }

  return {
    title: `${industry.name} Tools - Free Tools for Startups`,
    description: `Explore our collection of free tools designed specifically for ${industry.name.toLowerCase()} startups.`,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  // Find the industry by slug
  const industry = industries.find((i) => i.slug === `/${slug}`);

  if (!industry) {
    notFound();
  }

  // Filter tools by industry
  const industryTools = tools.filter((tool) =>
    tool.industries.some((i) => i.toLowerCase() === industry.name.toLowerCase())
  );

  return (
    <div className="container mx-auto py-12">
      {/* Industry Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-950 mb-4">
          <Icon
            icon={getIndustryIcon(industry.name)}
            className="h-10 w-10 text-blue-800 dark:text-blue-100"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{industry.name} Tools</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of free tools designed specifically for {industry.name.toLowerCase()} startups.
          All tools are completely free to use.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industryTools.map((tool) => (
          <ToolCard
            key={tool.id}
            slug={tool.slug}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
          />
        ))}
      </div>

      {/* Empty State */}
      {industryTools.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Icon icon="lucide:tool" className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No tools available yet</h2>
          <p className="text-muted-foreground">
            We&apos;re working on adding new tools for the {industry.name} industry. Check back soon!
          </p>
        </div>
      )}

      {/* Related Industries Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Explore Other Industries</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries
            .filter((i) => i.id !== industry.id)
            .map((relatedIndustry) => (
              <a
                key={relatedIndustry.id}
                href={relatedIndustry.slug}
                className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center mb-2">
                  <Icon
                    icon={getIndustryIcon(relatedIndustry.name)}
                    className="h-6 w-6 text-blue-800 dark:text-blue-100"
                  />
                </div>
                <span className="text-sm font-medium">{relatedIndustry.name}</span>
                <span className="text-xs text-muted-foreground">{relatedIndustry.count} tools</span>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to get industry icon
function getIndustryIcon(industryName: string): string {
  switch (industryName.toLowerCase()) {
    case "marketing":
      return "solar:pie-chart-2-outline";
    case "legal":
      return "solar:chart-outline";
    case "e-commerce":
      return "solar:gift-linear";
    case "healthcare":
      return "solar:bill-list-outline";
    case "finance":
      return "solar:settings-outline";
    default:
      return "lucide:briefcase";
  }
}
