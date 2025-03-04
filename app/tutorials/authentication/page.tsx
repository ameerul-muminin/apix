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
import { CodeBlock } from "@/components/code-block";
import FadeIn from "@/components/fadein-wrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function AuthenticationPage() {
  const [tab, setTab] = useState("oauth");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <FadeIn duration={100}>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Authentication
            </h1>
          </FadeIn>

          <FadeIn duration={125}>
            <p className="text-muted-foreground">
              Implement secure authentication methods in your API
            </p>
          </FadeIn>
        </div>

        <FadeIn duration={150}>
          {/* Mobile dropdown */}
          <div className="block lg:hidden mb-8">
            <Select value={tab} onValueChange={setTab}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oauth">OAuth 2.0</SelectItem>
                <SelectItem value="jwt">JWT</SelectItem>
                <SelectItem value="apikeys">API Keys</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={tab} onValueChange={setTab} className="space-y-8">
            {/* Desktop tabs */}
            <div className="hidden lg:block">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
                <TabsTrigger value="jwt">JWT</TabsTrigger>
                <TabsTrigger value="apikeys">API Keys</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="oauth" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>OAuth 2.0 Flow</CardTitle>
                  <CardDescription>
                    Understanding the OAuth 2.0 authorization framework
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Authorization Code Flow
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">
                          1. Authorization Request
                        </h4>
                        <CodeBlock
                          code={`// Redirect user to authorization endpoint
const authUrl = new URL('https://auth-server.com/authorize')
authUrl.searchParams.append('client_id', 'YOUR_CLIENT_ID')
authUrl.searchParams.append('redirect_uri', 'YOUR_REDIRECT_URI')
authUrl.searchParams.append('response_type', 'code')
authUrl.searchParams.append('scope', 'read write')

window.location.href = authUrl.toString()`}
                          language="javascript"
                        />
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">2. Token Exchange</h4>
                        <CodeBlock
                          code={`// Exchange authorization code for tokens
const response = await fetch('https://auth-server.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: 'AUTHORIZATION_CODE',
    redirect_uri: 'YOUR_REDIRECT_URI',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET'
  })
})`}
                          language="javascript"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Using Access Tokens</h3>
                    <CodeBlock
                      code={`// Making authenticated requests
const response = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer ' + accessToken
  }
})`}
                      language="javascript"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jwt" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>JSON Web Tokens (JWT)</CardTitle>
                  <CardDescription>
                    Implementation and usage of JWTs for authentication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">JWT Structure</h3>
                    <CodeBlock
                      code={`// JWT consists of three parts:
header.payload.signature

// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)`}
                      language="javascript"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">JWT Verification</h3>
                    <CodeBlock
                      code={`import { verify } from 'jsonwebtoken'

// Verify JWT token
export async function verifyToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Usage in API route
export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.split(' ')[1]
  if (!token) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const decoded = await verifyToken(token)
    // Process authenticated request
  } catch (error) {
    return new Response('Invalid token', { status: 401 })
  }
}`}
                      language="typescript"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="apikeys" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Key Authentication</CardTitle>
                  <CardDescription>
                    Managing and implementing API key authentication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">
                      API Key Implementation
                    </h3>
                    <CodeBlock
                      code={`// API key middleware
async function validateApiKey(request: Request) {
  const apiKey = request.headers.get('x-api-key')
  
  if (!apiKey) {
    throw new Error('API key is required')
  }

  // Validate API key (e.g., against database)
  const isValid = await validateKeyInDatabase(apiKey)
  if (!isValid) {
    throw new Error('Invalid API key')
  }

  return true
}

// Usage in API route
export async function GET(request: Request) {
  try {
    await validateApiKey(request)
    // Process authenticated request
  } catch (error) {
    return new Response('Unauthorized', { status: 401 })
  }
}`}
                      language="typescript"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      API Key Best Practices
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use strong random generation for API keys</li>
                      <li>Implement rate limiting per API key</li>
                      <li>Store API keys securely (hashed)</li>
                      <li>Rotate keys periodically</li>
                      <li>Monitor API key usage for security</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Best Practices</CardTitle>
                  <CardDescription>
                    Essential security measures for API authentication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">HTTPS</h3>
                    <p className="text-muted-foreground mb-4">
                      Always use HTTPS to encrypt data in transit. Never send
                      sensitive information over unencrypted connections.
                    </p>
                    <CodeBlock
                      code={`// Force HTTPS middleware
export function middleware(request: Request) {
  if (
    process.env.NODE_ENV === 'production' &&
    !request.headers.get('x-forwarded-proto')?.startsWith('https')
  ) {
    return Response.redirect(
      'https://' + request.headers.get('host') + request.url,
      301
    )
  }
  return Response.next()
}`}
                      language="typescript"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Rate Limiting</h3>
                    <CodeBlock
                      code={`import { rateLimit } from '@/lib/rate-limit'

// Rate limiting middleware
export async function middleware(request: Request) {
  try {
    await rateLimit.check(request)
    return Response.next()
  } catch {
    return new Response('Too Many Requests', { status: 429 })
  }
}`}
                      language="typescript"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Security Headers</h3>
                    <CodeBlock
                      code={`// Security headers middleware
export function middleware(request: Request) {
  const response = Response.next()
  
  // Set security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('Content-Security-Policy', "default-src 'self'")
  
  return response
}`}
                      language="typescript"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Input Validation</h3>
                    <CodeBlock
                      code={`import { z } from 'zod'

// Input validation schema
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
})

// Validate request body
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = UserSchema.parse(body)
    // Process validated data
  } catch (error) {
    return new Response('Invalid input', { status: 400 })
  }
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
          prevHref="/tutorials/responses"
          prevLabel="Responses"
          nextHref="/tutorials/advanced"
          nextLabel="Advanced Topics"
        />
      </div>
    </div>
  );
}
