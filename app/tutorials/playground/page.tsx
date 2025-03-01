import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiPlayground } from "@/components/api-playground";
import FadeIn from "@/components/fadein-wrapper";

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <FadeIn duration={100}>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              API Playground
            </h1>
          </FadeIn>

          <FadeIn duration={125}>
            <p className="text-muted-foreground">
              Test your API skills with this interactive playground. Experiment
              with different APIs, methods, and parameters.
            </p>
          </FadeIn>
        </div>

        <FadeIn duration={150}>
          <ApiPlayground />
        </FadeIn>
        <div className="flex justify-between items-center pt-6 border-t">
          <Button asChild>
            <Link href="/tutorials/advanced">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Advanced Topics
            </Link>
          </Button>
          <Button variant="outline" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
