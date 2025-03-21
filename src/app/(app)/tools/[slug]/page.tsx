import "server-only";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { tools } from "@/app/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found - Free Tools for Startups",
      description: "The requested tool could not be found.",
    };
  }

  return {
    title: `${tool.name} - Free Tools for Startups`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link
          href="/tools"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Link>
        <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-100 rounded-lg p-3 mb-6">
          <Icon icon={tool.icon} className="text-4xl" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{tool.name}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.industries.map((industry) => (
            <Badge key={industry} variant="secondary">
              {industry}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground text-lg">{tool.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <Icon icon={tool.icon} className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Ready to Use?</h2>
                <Button size="lg" className="px-8">
                  Try Tool Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Icon icon="lucide:zap" className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Fast & Efficient</h3>
                    <p className="text-muted-foreground text-sm">
                      Get results in seconds with our optimized processing pipeline.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon icon="lucide:shield-check" className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Secure</h3>
                    <p className="text-muted-foreground text-sm">
                      Your data is encrypted and processed securely in the cloud.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon icon="lucide:infinity" className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Unlimited Usage</h3>
                    <p className="text-muted-foreground text-sm">
                      Use the tool as many times as you need, completely free.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Input Your Data</h3>
                <p className="text-muted-foreground text-center">
                  Upload or enter your data in the format required by the tool.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Process</h3>
                <p className="text-muted-foreground text-center">
                  Our AI-powered system processes your data automatically.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Results</h3>
                <p className="text-muted-foreground text-center">
                  Download or copy your processed results instantly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Tool Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <p className="text-muted-foreground mb-1">Processing Time</p>
              <p className="text-2xl font-bold">30s</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <p className="text-muted-foreground mb-1">File Size Limit</p>
              <p className="text-2xl font-bold">10MB</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <p className="text-muted-foreground mb-1">Usage</p>
              <p className="text-2xl font-bold">Free</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
