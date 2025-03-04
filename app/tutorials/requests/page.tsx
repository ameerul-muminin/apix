"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequestDemo } from "@/components/request-demo";
import FadeIn from "@/components/fadein-wrapper";
import { useState, useEffect } from "react";

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("http-methods");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <FadeIn duration={100}>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Making API Requests
            </h1>
          </FadeIn>

          <FadeIn duration={125}>
            <p className="text-muted-foreground">
              Learn how to construct and send API requests to interact with web
              services
            </p>
          </FadeIn>
        </div>

        <FadeIn duration={150}>
          {isMobile ? (
            <div className="space-y-8">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="http-methods">HTTP Methods</SelectItem>
                  <SelectItem value="request-structure">Request Structure</SelectItem>
                  <SelectItem value="headers">Headers</SelectItem>
                  <SelectItem value="try-it">Try It!</SelectItem>
                </SelectContent>
              </Select>

              {activeTab === "http-methods" && (
                <div className="p-4 border rounded-md">
                  <h2 className="text-xl font-semibold mb-4">HTTP Methods</h2>
                  <p className="mb-4">
                    HTTP methods define the type of operation you want to perform on
                    a resource. The most common methods are:
                  </p>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium mb-1">GET</h3>
                      <p className="text-sm">
                        Used to retrieve data from a specified resource. GET
                        requests should only retrieve data and have no other effect.
                      </p>
                      <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                        GET /api/users
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium mb-1">POST</h3>
                      <p className="text-sm">
                        Used to submit data to be processed to a specified resource.
                        Often used for creating new resources.
                      </p>
                      <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                        POST /api/users
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium mb-1">PUT</h3>
                      <p className="text-sm">
                        Used to update a resource or create it if it doesn&apos;t exist
                        at the specified URL.
                      </p>
                      <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                        PUT /api/users/123
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium mb-1">DELETE</h3>
                      <p className="text-sm">
                        Used to delete a specified resource.
                      </p>
                      <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                        DELETE /api/users/123
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "request-structure" && (
                <div className="p-4 border rounded-md">
                  <h2 className="text-xl font-semibold mb-4">Request Structure</h2>
                  <p className="mb-4">
                    An API request typically consists of several components:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Base URL</h3>
                      <p className="text-sm mb-2">
                        The root URL for the API, such as https://api.example.com
                      </p>
                      <div className="p-2 bg-muted rounded text-sm font-mono">
                        https://api.example.com
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Endpoint</h3>
                      <p className="text-sm mb-2">
                        The specific path that points to the resource you want to
                        interact with
                      </p>
                      <div className="p-2 bg-muted rounded text-sm font-mono">
                        /users/123
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Query Parameters</h3>
                      <p className="text-sm mb-2">
                        Optional parameters added to the URL to filter, sort, or
                        paginate results
                      </p>
                      <div className="p-2 bg-muted rounded text-sm font-mono">
                        ?page=2&limit=10&sort=name
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Path Parameters</h3>
                      <p className="text-sm mb-2">
                        Variables embedded in the URL path, typically used to
                        identify specific resources
                      </p>
                      <div className="p-2 bg-muted rounded text-sm font-mono">
                        /users/{"{userId}"}/posts/{"{postId}"}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Complete URL Example</h3>
                      <div className="p-2 bg-muted rounded text-sm font-mono break-all">
                        https://api.example.com/users/123/posts?page=2&limit=10&sort=date
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "headers" && (
                <div className="p-4 border rounded-md">
                  <h2 className="text-xl font-semibold mb-4">Request Headers</h2>
                  <p className="mb-4">
                    Headers provide additional information about the request or the
                    client. Common API request headers include:
                  </p>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium mb-1">Content-Type</h3>
                      <p className="text-sm mb-1">
                        Specifies the format of the data being sent in the request
                        body
                      </p>
                      <div className="p-2 bg-muted rounded text-sm font-mono">
                        Content-Type: application/json
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium mb-1">Authorization</h3>
                      <p className="text-sm mb-1">
                        Contains credentials for authenticating the client with the
                        server
                      </p>
                      <div className="p-2 bg-muted rounded text-sm font-mono">
                        Authorization: Bearer
                        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium mb-1">Accept</h3>
                      <p className="text-sm mb-1">
                        Specifies the media types that the client is willing to
                        receive
                      </p>
                      <div className="p-2 bg-muted rounded text-sm font-mono">
                        Accept: application/json
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h3 className="font-medium mb-1">User-Agent</h3>
                      <p className="text-sm mb-1">
                        Identifies the client making the request
                      </p>
                      <div className="p-2 bg-muted rounded text-sm font-mono">
                        User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "try-it" && (
                <div className="p-4 border rounded-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Try Making a Request
                  </h2>
                  <p className="mb-4">
                    Use the interactive tool below to construct and send a real API
                    request to a public API.
                  </p>
                  <RequestDemo />
                </div>
              )}
            </div>
          ) : (
            <Tabs defaultValue="http-methods" className="mb-12">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="http-methods">HTTP Methods</TabsTrigger>
                <TabsTrigger value="request-structure">
                  Request Structure
                </TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="try-it">Try It!</TabsTrigger>
              </TabsList>
              <TabsContent
                value="http-methods"
                className="p-4 border rounded-md mt-2"
              >
                <h2 className="text-xl font-semibold mb-4">HTTP Methods</h2>
                <p className="mb-4">
                  HTTP methods define the type of operation you want to perform on
                  a resource. The most common methods are:
                </p>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium mb-1">GET</h3>
                    <p className="text-sm">
                      Used to retrieve data from a specified resource. GET
                      requests should only retrieve data and have no other effect.
                    </p>
                    <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                      GET /api/users
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium mb-1">POST</h3>
                    <p className="text-sm">
                      Used to submit data to be processed to a specified resource.
                      Often used for creating new resources.
                    </p>
                    <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                      POST /api/users
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium mb-1">PUT</h3>
                    <p className="text-sm">
                      Used to update a resource or create it if it doesn&apos;t exist
                      at the specified URL.
                    </p>
                    <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                      PUT /api/users/123
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium mb-1">DELETE</h3>
                    <p className="text-sm">
                      Used to delete a specified resource.
                    </p>
                    <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                      DELETE /api/users/123
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="request-structure"
                className="p-4 border rounded-md mt-2"
              >
                <h2 className="text-xl font-semibold mb-4">Request Structure</h2>
                <p className="mb-4">
                  An API request typically consists of several components:
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Base URL</h3>
                    <p className="text-sm mb-2">
                      The root URL for the API, such as https://api.example.com
                    </p>
                    <div className="p-2 bg-muted rounded text-sm font-mono">
                      https://api.example.com
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Endpoint</h3>
                    <p className="text-sm mb-2">
                      The specific path that points to the resource you want to
                      interact with
                    </p>
                    <div className="p-2 bg-muted rounded text-sm font-mono">
                      /users/123
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Query Parameters</h3>
                    <p className="text-sm mb-2">
                      Optional parameters added to the URL to filter, sort, or
                      paginate results
                    </p>
                    <div className="p-2 bg-muted rounded text-sm font-mono">
                      ?page=2&limit=10&sort=name
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Path Parameters</h3>
                    <p className="text-sm mb-2">
                      Variables embedded in the URL path, typically used to
                      identify specific resources
                    </p>
                    <div className="p-2 bg-muted rounded text-sm font-mono">
                      /users/{"{userId}"}/posts/{"{postId}"}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Complete URL Example</h3>
                    <div className="p-2 bg-muted rounded text-sm font-mono break-all">
                      https://api.example.com/users/123/posts?page=2&limit=10&sort=date
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="headers" className="p-4 border rounded-md mt-2">
                <h2 className="text-xl font-semibold mb-4">Request Headers</h2>
                <p className="mb-4">
                  Headers provide additional information about the request or the
                  client. Common API request headers include:
                </p>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium mb-1">Content-Type</h3>
                    <p className="text-sm mb-1">
                      Specifies the format of the data being sent in the request
                      body
                    </p>
                    <div className="p-2 bg-muted rounded text-sm font-mono">
                      Content-Type: application/json
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium mb-1">Authorization</h3>
                    <p className="text-sm mb-1">
                      Contains credentials for authenticating the client with the
                      server
                    </p>
                    <div className="p-2 bg-muted rounded text-sm font-mono">
                      Authorization: Bearer
                      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium mb-1">Accept</h3>
                    <p className="text-sm mb-1">
                      Specifies the media types that the client is willing to
                      receive
                    </p>
                    <div className="p-2 bg-muted rounded text-sm font-mono">
                      Accept: application/json
                    </div>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium mb-1">User-Agent</h3>
                    <p className="text-sm mb-1">
                      Identifies the client making the request
                    </p>
                    <div className="p-2 bg-muted rounded text-sm font-mono">
                      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="try-it" className="p-4 border rounded-md mt-2">
                <h2 className="text-xl font-semibold mb-4">
                  Try Making a Request
                </h2>
                <p className="mb-4">
                  Use the interactive tool below to construct and send a real API
                  request to a public API.
                </p>
                <RequestDemo />
              </TabsContent>
            </Tabs>
          )}
        </FadeIn>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="outline" asChild>
            <Link href="/tutorials/fundamentals">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Fundamentals
            </Link>
          </Button>
          <Button asChild>
            <Link href="/tutorials/responses">
              {" "}
              Responses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
