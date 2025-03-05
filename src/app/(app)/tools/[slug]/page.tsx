import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "../../../data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2 } from "lucide-react";
import EmailInput from "@/components/email-input";

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const tool = tools.find((tool) => tool.slug === params.slug);

  if (!tool) {
    return {
      title: "Tool Not Found - Free Tools for Startups",
      description: "The requested tool could not be found.",
    };
  }

  return {
    title: `${tool.name} - Free Tools for Startups`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - Free Tools for Startups`,
      description: tool.description,
      images: [{ url: tool.imageUrl }],
    },
  };
}

export default async function ToolPage({
  params
}: {
  params: { slug: string }
}) {
  const tool = tools.find((tool) => tool.slug === params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="container py-12 space-y-8">
      {/* Back button */}
      <Link href="/tools" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all tools
      </Link>

      {/* Tool header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <Badge className="mb-2">{tool.category}</Badge>
          <h1 className="text-4xl font-bold tracking-tight">{tool.name}</h1>
          <p className="text-xl text-muted-foreground">{tool.description}</p>

          <div className="flex items-center space-x-4 pt-4">
            <EmailInput />
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={tool.imageUrl}
            alt={tool.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Tool content */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>About this tool</CardTitle>
            <CardDescription>Learn more about what this tool can do for your startup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This is a detailed description of the {tool.name} tool. It explains how the tool works,
              what problems it solves, and how it can benefit your startup.
            </p>
            <p>
              You can use this tool to improve your workflow, save time, and achieve better results
              for your business.
            </p>
          </CardContent>
        </Card>

        {/* Tool features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Simple interface designed for efficiency and productivity.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time-Saving</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Automates repetitive tasks to help you focus on what matters.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Powerful Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get professional-quality output with minimal effort.</p>
            </CardContent>
          </Card>
        </div>

        {/* Related tools */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools
              .filter((t) => t.category === tool.category && t.id !== tool.id)
              .slice(0, 3)
              .map((relatedTool) => (
                <Link key={relatedTool.slug} href={`/tools/${relatedTool.slug}`} className="block group">
                  <Card className="h-full transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="relative h-32 w-full mb-4 rounded-md overflow-hidden">
                        <Image
                          src={relatedTool.imageUrl}
                          alt={relatedTool.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardTitle className="text-lg">{relatedTool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{relatedTool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
