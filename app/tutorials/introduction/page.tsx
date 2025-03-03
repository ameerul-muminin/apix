"use client"

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FadeIn from "@/components/fadein-wrapper";
import { useState, useEffect, SetStateAction } from "react";

export default function IntroductionPage() {
  const [activeTab, setActiveTab] = useState("what-is-api");
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleTabChange = (value: SetStateAction<string>) => {
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <FadeIn duration={100}>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Introduction to APIs
            </h1>
          </FadeIn>

          <FadeIn duration={125}>
            <p className="text-muted-foreground">
              Learn the fundamentals of APIs and why they&apos;re important in modern
              web development
            </p>
          </FadeIn>
        </div>

        <FadeIn duration={150}>
          <div className="mb-12">
            {/* Mobile Dropdown */}
            <div className={isMobile ? "block mb-2" : "hidden"}>
              <Select value={activeTab} onValueChange={handleTabChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="what-is-api">What is an API?</SelectItem>
                  <SelectItem value="why-use-apis">Why Use APIs?</SelectItem>
                  <SelectItem value="api-types">Types of APIs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Tabs */}
            <div className={isMobile ? "hidden" : "block"}>
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="what-is-api">What is an API?</TabsTrigger>
                  <TabsTrigger value="why-use-apis">Why Use APIs?</TabsTrigger>
                  <TabsTrigger value="api-types">Types of APIs</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Content (shared between mobile and desktop) */}
            <div className="p-4 border rounded-md mt-2">
              {activeTab === "what-is-api" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">What is an API?</h2>
                  <p className="mb-4">
                    An API (Application Programming Interface) is a set of rules and
                    protocols that allows different software applications to
                    communicate with each other. Think of it as a messenger that
                    takes your request, tells the system what you want to do, and
                    returns the response back to you.
                  </p>
                  <p className="mb-4">
                    In web development, APIs typically refer to web APIs that
                    provide access to resources and functionality via HTTP requests.
                    These APIs allow developers to access data and services from
                    external systems without needing to understand the internal
                    workings of those systems.
                  </p>
                  <div className="bg-muted p-4 rounded-md my-6">
                    <h3 className="font-medium mb-2">Real-world Analogy</h3>
                    <p>
                      Think of an API like a waiter at a restaurant. You (the
                      client) don&apos;t go directly into the kitchen (the server&apos;s
                      internal system) to prepare your meal. Instead, you give your
                      order to the waiter (the API), who takes it to the kitchen,
                      and then brings back your food (the response).
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === "why-use-apis" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Why Use APIs?</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-medium mb-2">Integration</h3>
                        <p>
                          APIs allow you to integrate third-party services and
                          functionality into your applications without having to
                          build everything from scratch.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-medium mb-2">Efficiency</h3>
                        <p>
                          By using APIs, you can leverage existing services and
                          focus on building your core functionality rather than
                          reinventing the wheel.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-medium mb-2">Scalability</h3>
                        <p>
                          APIs allow for modular architecture, making it easier to
                          scale specific components of your application
                          independently.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-medium mb-2">Specialization</h3>
                        <p>
                          Teams can specialize in different areas, with frontend
                          developers consuming APIs created by backend specialists.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              
              {activeTab === "api-types" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Types of APIs</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">REST APIs</h3>
                      <p>
                        Representational State Transfer (REST) APIs are the most
                        common type of web API. They use standard HTTP methods (GET,
                        POST, PUT, DELETE) and are stateless, meaning each request
                        contains all the information needed to complete it.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">GraphQL APIs</h3>
                      <p>
                        GraphQL is a query language for APIs that allows clients to
                        request exactly the data they need, making it possible to
                        get many resources in a single request.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">SOAP APIs</h3>
                      <p>
                        Simple Object Access Protocol (SOAP) is a protocol that uses
                        XML for message format and typically relies on HTTP or SMTP
                        for message transmission. It&apos;s more rigid and feature-rich
                        than REST.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">WebSocket APIs</h3>
                      <p>
                        WebSocket APIs provide full-duplex communication channels
                        over a single TCP connection, allowing for real-time data
                        transfer between client and server.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button asChild>
            <Link href="/tutorials/fundamentals">
              Next: API Fundamentals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}