import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ToolNotFound() {
    return (
        <div className="container py-12 flex flex-col items-center justify-center text-center space-y-8">
            <div className="space-y-4 max-w-md">
                <h1 className="text-4xl font-bold tracking-tight">Tool Not Found</h1>
                <p className="text-xl text-muted-foreground">
                    We couldn&apos;t find the tool you&apos;re looking for. It may have been removed or you might have followed a broken link.
                </p>
                <div className="pt-4">
                    <Button asChild>
                        <Link href="/tools" className="inline-flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to all tools
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}