import { TutorialNavigation } from "@/components/tutorial-navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import FadeIn from "@/components/fadein-wrapper";

export default function ResponsesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <FadeIn duration={100}>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Handling Responses
            </h1>
          </FadeIn>

          <FadeIn duration={125}>
            <p className="text-muted-foreground">
              Learn to effectively process and handle API responses
            </p>
          </FadeIn>
        </div>

        <FadeIn duration={150}>
          <Tabs defaultValue="status" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="status">Status Codes</TabsTrigger>
              <TabsTrigger value="errors">Error Handling</TabsTrigger>
              <TabsTrigger value="formats">Response Formats</TabsTrigger>
              <TabsTrigger value="validation">Data Validation</TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>HTTP Status Codes</CardTitle>
                  <CardDescription>
                    Understanding common HTTP status codes and their meanings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {statusCodes.map((category) => (
                      <div key={category.range} className="space-y-3">
                        <h3 className="font-semibold text-lg">
                          {category.range} - {category.name}
                        </h3>
                        <div className="grid gap-2">
                          {category.codes.map((code) => (
                            <div
                              key={code.code}
                              className="p-3 border rounded-lg"
                            >
                              <div className="font-medium">
                                {code.code} {code.name}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {code.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Error Handling Patterns</CardTitle>
                  <CardDescription>
                    Best practices for handling API errors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Error Response Structure
                    </h3>
                    <CodeBlock
                      code={`// Error response format
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "The request payload is invalid",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}`}
                      language="json"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Error Handling Example
                    </h3>
                    <CodeBlock
                      code={`try {
  const response = await fetch('/api/users')
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  const data = await response.json()
  return data
} catch (error) {
  console.error('API Error:', error)
  // Handle error appropriately
}`}
                      language="javascript"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="formats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Response Formats</CardTitle>
                  <CardDescription>
                    Common API response formats and their usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">JSON Response</h3>
                    <CodeBlock
                      code={`{
  "data": {
    "id": "123",
    "type": "user",
    "attributes": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "relationships": {
      "posts": {
        "data": [
          { "id": "456", "type": "post" }
        ]
      }
    }
  },
  "meta": {
    "timestamp": "2024-02-28T12:00:00Z"
  }
}`}
                      language="json"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Collection Response</h3>
                    <CodeBlock
                      code={`{
  "data": [
    {
      "id": "123",
      "type": "user",
      "attributes": { ... }
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "per_page": 10
  },
  "links": {
    "self": "/api/users?page=1",
    "next": "/api/users?page=2",
    "last": "/api/users?page=10"
  }
}`}
                      language="json"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="validation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Validation</CardTitle>
                  <CardDescription>
                    Techniques for validating API response data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Schema Validation</h3>
                    <CodeBlock
                      code={`import { z } from 'zod'

// Define response schema
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0).optional()
})

// Validate response data
try {
  const data = await response.json()
  const user = UserSchema.parse(data)
  // Data is valid and typed
} catch (error) {
  // Handle validation error
}`}
                      language="typescript"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Type Guards</h3>
                    <CodeBlock
                      code={`// Type guard for API response
function isUserResponse(data: unknown): data is UserResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  )
}

// Usage
const data = await response.json()
if (isUserResponse(data)) {
  // Data is typed as UserResponse
} else {
  // Handle invalid response
}`}
                      language="typescript"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </FadeIn>
        
        <TutorialNavigation
          prevHref="/tutorials/requests"
          prevLabel="Making Requests"
          nextHref="/tutorials/authentication"
          nextLabel="Authentication"
        />
      </div>
    </div>
  );
}

const statusCodes = [
  {
    range: "2xx",
    name: "Success",
    codes: [
      {
        code: 200,
        name: "OK",
        description: "The request was successful",
      },
      {
        code: 201,
        name: "Created",
        description: "The request succeeded and a new resource was created",
      },
      {
        code: 204,
        name: "No Content",
        description: "The request succeeded but returns no content",
      },
    ],
  },
  {
    range: "4xx",
    name: "Client Errors",
    codes: [
      {
        code: 400,
        name: "Bad Request",
        description: "The request was malformed or invalid",
      },
      {
        code: 401,
        name: "Unauthorized",
        description: "Authentication is required and has failed",
      },
      {
        code: 403,
        name: "Forbidden",
        description: "The request was valid but the server refuses action",
      },
      {
        code: 404,
        name: "Not Found",
        description: "The requested resource could not be found",
      },
    ],
  },
  {
    range: "5xx",
    name: "Server Errors",
    codes: [
      {
        code: 500,
        name: "Internal Server Error",
        description: "The server encountered an unexpected condition",
      },
      {
        code: 503,
        name: "Service Unavailable",
        description: "The server is not ready to handle the request",
      },
    ],
  },
];
