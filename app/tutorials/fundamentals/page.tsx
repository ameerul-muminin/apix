"use client";

import { TutorialNavigation } from "@/components/tutorial-navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeBlock } from "@/components/code-block";
import FadeIn from "@/components/fadein-wrapper";
import { useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener
    window.addEventListener("resize", checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}

export default function FundamentalsPage() {
  const [activeTab, setActiveTab] = useState("rest");
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <FadeIn duration={100}>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              API Fundamentals
            </h1>
          </FadeIn>

          <FadeIn duration={125}>
            <p className="text-muted-foreground">
              Master the core concepts and principles of API development
            </p>
          </FadeIn>
        </div>

        <FadeIn duration={150}>
          {isMobile ? (
            <div className="space-y-8">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent className="w-[calc(100vw-2rem)] sm:w-full">
                  <SelectItem value="rest">REST Principles</SelectItem>
                  <SelectItem value="methods">HTTP Methods</SelectItem>
                  <SelectItem value="resources">Resources</SelectItem>
                  <SelectItem value="urls">URL Structure</SelectItem>
                </SelectContent>
              </Select>

              {activeTab === "rest" && (
                <Card>
                  <CardHeader>
                    <CardTitle>RESTful Architecture</CardTitle>
                    <CardDescription>
                      Understanding the principles of Representational State
                      Transfer
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Key Principles</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Client-Server Architecture</li>
                        <li>Statelessness</li>
                        <li>Cacheability</li>
                        <li>Uniform Interface</li>
                        <li>Layered System</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Example REST Resource
                      </h3>
                      <CodeBlock
                        code={`// Resource: User
GET /api/users           // List users
GET /api/users/123       // Get specific user
POST /api/users          // Create user
PUT /api/users/123       // Update user
DELETE /api/users/123    // Delete user`}
                        language="javascript"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "methods" && (
                <Card>
                  <CardHeader>
                    <CardTitle>HTTP Methods</CardTitle>
                    <CardDescription>
                      Understanding the standard HTTP methods used in APIs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">GET</h3>
                        <p className="text-muted-foreground mb-3">
                          Retrieve a resource or collection of resources
                        </p>
                        <div className="max-w-full overflow-x-auto">
                          <CodeBlock
                            code={`// Retrieve a user
const response = await fetch('/api/users/123')
const user = await response.json()`}
                            language="javascript"
                          />
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">POST</h3>
                        <p className="text-muted-foreground mb-3">
                          Create a new resource
                        </p>
                        <div className="max-w-full overflow-x-auto">
                          <CodeBlock
                            code={`// Create a new user
const response = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' })
})`}
                            language="javascript"
                          />
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">PUT</h3>
                        <p className="text-muted-foreground mb-3">
                          Update or replace an existing resource
                        </p>
                        <div className="max-w-full overflow-x-auto">
                          <CodeBlock
                            code={`// Update a user
const response = await fetch('/api/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Smith' })
})`}
                            language="javascript"
                          />
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">DELETE</h3>
                        <p className="text-muted-foreground mb-3">
                          Remove a resource
                        </p>
                        <div className="max-w-full overflow-x-auto">
                          <CodeBlock
                            code={`// Delete a user
const response = await fetch('/api/users/123', {
  method: 'DELETE'
})`}
                            language="javascript"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "resources" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Modeling</CardTitle>
                    <CardDescription>
                      Best practices for modeling API resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Resource Naming</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use nouns for resources</li>
                        <li>Use plural forms for collections</li>
                        <li>Be consistent with naming conventions</li>
                        <li>Use lowercase letters and hyphens</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Resource Relationships
                      </h3>
                      <CodeBlock
                        code={`// Parent-Child Relationships
GET /api/users/123/posts           // Get user's posts
GET /api/posts/456/comments        // Get post's comments

// Resource Collections
GET /api/organizations/789/members // Get organization members
GET /api/teams/101/projects        // Get team projects`}
                        language="javascript"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "urls" && (
                <Card>
                  <CardHeader>
                    <CardTitle>URL Structure</CardTitle>
                    <CardDescription>
                      Guidelines for designing clear and consistent URLs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">URL Components</h3>
                      <CodeBlock
                        code={`https://api.example.com/v1/users?sort=name&order=asc
|------ base URL ------||ver|resource|- query parameters -|`}
                        language="plaintext"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Best Practices</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use versioning in the URL</li>
                        <li>Keep URLs readable and logical</li>
                        <li>Use query parameters for filtering and sorting</li>
                        <li>Follow hierarchical structure</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Examples</h3>
                      <CodeBlock
                        code={`// Good URL Structure
GET /api/v1/users
GET /api/v1/users/123
GET /api/v1/users/123/posts
GET /api/v1/posts?author=123&status=published

// Avoid
GET /api/v1/getUsers
GET /api/v1/user-by-id/123
GET /api/v1/listUserPosts/123`}
                        language="javascript"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Tabs defaultValue="rest" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="rest">REST Principles</TabsTrigger>
                <TabsTrigger value="methods">HTTP Methods</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="urls">URL Structure</TabsTrigger>
              </TabsList>

              <TabsContent value="rest" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>RESTful Architecture</CardTitle>
                    <CardDescription>
                      Understanding the principles of Representational State
                      Transfer
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Key Principles</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Client-Server Architecture</li>
                        <li>Statelessness</li>
                        <li>Cacheability</li>
                        <li>Uniform Interface</li>
                        <li>Layered System</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Example REST Resource
                      </h3>
                      <CodeBlock
                        code={`// Resource: User
GET /api/users           // List users
GET /api/users/123       // Get specific user
POST /api/users          // Create user
PUT /api/users/123       // Update user
DELETE /api/users/123    // Delete user`}
                        language="javascript"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="methods" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>HTTP Methods</CardTitle>
                    <CardDescription>
                      Understanding the standard HTTP methods used in APIs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">GET</h3>
                        <p className="text-muted-foreground mb-3">
                          Retrieve a resource or collection of resources
                        </p>
                        <div className="max-w-full overflow-x-auto">
                          <CodeBlock
                            code={`// Retrieve a user
const response = await fetch('/api/users/123')
const user = await response.json()`}
                            language="javascript"
                          />
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">POST</h3>
                        <p className="text-muted-foreground mb-3">
                          Create a new resource
                        </p>
                        <div className="max-w-full overflow-x-auto">
                          <CodeBlock
                            code={`// Create a new user
const response = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' })
})`}
                            language="javascript"
                          />
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">PUT</h3>
                        <p className="text-muted-foreground mb-3">
                          Update or replace an existing resource
                        </p>
                        <div className="max-w-full overflow-x-auto">
                          <CodeBlock
                            code={`// Update a user
const response = await fetch('/api/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Smith' })
})`}
                            language="javascript"
                          />
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">DELETE</h3>
                        <p className="text-muted-foreground mb-3">
                          Remove a resource
                        </p>
                        <div className="max-w-full overflow-x-auto">
                          <CodeBlock
                            code={`// Delete a user
const response = await fetch('/api/users/123', {
  method: 'DELETE'
})`}
                            language="javascript"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Modeling</CardTitle>
                    <CardDescription>
                      Best practices for modeling API resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Resource Naming</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use nouns for resources</li>
                        <li>Use plural forms for collections</li>
                        <li>Be consistent with naming conventions</li>
                        <li>Use lowercase letters and hyphens</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Resource Relationships
                      </h3>
                      <CodeBlock
                        code={`// Parent-Child Relationships
GET /api/users/123/posts           // Get user's posts
GET /api/posts/456/comments        // Get post's comments

// Resource Collections
GET /api/organizations/789/members // Get organization members
GET /api/teams/101/projects        // Get team projects`}
                        language="javascript"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="urls" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>URL Structure</CardTitle>
                    <CardDescription>
                      Guidelines for designing clear and consistent URLs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">URL Components</h3>
                      <CodeBlock
                        code={`https://api.example.com/v1/users?sort=name&order=asc
|------ base URL ------||ver|resource|- query parameters -|`}
                        language="plaintext"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Best Practices</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Use versioning in the URL</li>
                        <li>Keep URLs readable and logical</li>
                        <li>Use query parameters for filtering and sorting</li>
                        <li>Follow hierarchical structure</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Examples</h3>
                      <CodeBlock
                        code={`// Good URL Structure
GET /api/v1/users
GET /api/v1/users/123
GET /api/v1/users/123/posts
GET /api/v1/posts?author=123&status=published

// Avoid
GET /api/v1/getUsers
GET /api/v1/user-by-id/123
GET /api/v1/listUserPosts/123`}
                        language="javascript"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </FadeIn>
        <TutorialNavigation
          prevHref="/tutorials/introduction"
          prevLabel="Introduction"
          nextHref="/tutorials/requests"
          nextLabel="Requests"
        />
      </div>
    </div>
  );
}
