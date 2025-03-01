import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";
import FadeIn from "@/components/fadein-wrapper";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FadeIn duration={100}>
            <Logo className="w-24 h-24 mx-auto mb-6" />
          </FadeIn>

          <FadeIn duration={125}>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Welcome to{" "}
              <span className="font-shadows-into-light text-[#FFB300]">
                Apix
              </span>
            </h1>
          </FadeIn>

          <FadeIn duration={150}>
            <p className="text-xl text-muted-foreground">
              Learn the art of API development and integration
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title}>
              <FadeIn duration={175}>
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground mb-4">
                      {section.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link href={section.href}>
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    title: "Fundamentals",
    description: "Master the core concepts of API development",
    href: "/tutorials/fundamentals",
    topics: [
      "RESTful architecture principles",
      "HTTP methods and status codes",
      "API design best practices",
      "Resource modeling and URL structure",
    ],
  },
  {
    title: "Handling Responses",
    description: "Learn to process and manage API responses effectively",
    href: "/tutorials/responses",
    topics: [
      "Status code interpretation",
      "Error handling patterns",
      "Response formatting",
      "Data validation techniques",
    ],
  },
  {
    title: "Authentication",
    description: "Implement secure authentication methods",
    href: "/tutorials/authentication",
    topics: [
      "OAuth 2.0 and OpenID Connect",
      "JWT implementation",
      "API key management",
      "Security best practices",
    ],
  },
  {
    title: "Advanced Topics",
    description: "Explore advanced API development concepts",
    href: "/tutorials/advanced",
    topics: [
      "Rate limiting and throttling",
      "Caching strategies",
      "API versioning",
      "Real-time APIs with WebSockets",
    ],
  },
];
