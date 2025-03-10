import "server-only";
import { Metadata } from "next";
import { tools } from "@/app/data";
import ToolCard from "@/components/tool-card";
import { Icon } from "@iconify/react/dist/iconify.js";

export const metadata: Metadata = {
  title: "All Tools - Free Tools for Startups",
  description: "Explore our collection of free tools designed to help startups grow and succeed.",
};

export default function ToolsPage() {
  return (
    <div className="container mx-auto py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Free Tools for Startups</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of free tools designed to help your startup grow and succeed.
          All tools are completely free to use.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
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
      {tools.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Icon icon="lucide:tool" className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No tools available yet</h2>
          <p className="text-muted-foreground">
            We&apos;re working on adding new tools. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
