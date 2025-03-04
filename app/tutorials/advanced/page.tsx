"use client"

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

export default function AdvancedPage() {
  const [activeTab, setActiveTab] = useState("caching");
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <FadeIn duration={100}>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Advanced Topics
            </h1>
          </FadeIn>

          <FadeIn duration={125}>
            <p className="text-muted-foreground">
              Explore advanced API development concepts and techniques
            </p>
          </FadeIn>
        </div>

        <FadeIn duration={150}>
          {isMobile ? (
            <div className="space-y-8">
              <Select
                value={activeTab}
                onValueChange={(value) => setActiveTab(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="caching">Caching</SelectItem>
                  <SelectItem value="rate-limiting">Rate Limiting</SelectItem>
                  <SelectItem value="websockets">WebSockets</SelectItem>
                  <SelectItem value="versioning">Versioning</SelectItem>
                </SelectContent>
              </Select>

              <Tabs value={activeTab} className="space-y-8">
                <TabsContent value="caching" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Caching Strategies</CardTitle>
                      <CardDescription>
                        Implementing effective caching for API responses
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">HTTP Cache Headers</h3>
                        <CodeBlock
                          code={`// Setting cache headers
export async function GET(request: Request) {
  const data = await getData()
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'ETag': generateETag(data)
    }
  })
}

// Handling conditional requests
export async function GET(request: Request) {
  const etag = request.headers.get('if-none-match')
  const data = await getData()
  const currentETag = generateETag(data)
  
  if (etag === currentETag) {
    return new Response(null, { status: 304 })
  }
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'ETag': currentETag
    }
  })
}`}
                          language="typescript"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Redis Caching</h3>
                        <CodeBlock
                          code={`import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

export async function GET(request: Request) {
  const cacheKey = request.url
  
  // Try to get from cache
  const cached = await redis.get(cacheKey)
  if (cached) {
    return new Response(cached as string, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // Get fresh data
  const data = await getData()
  
  // Cache for 1 hour
  await redis.set(cacheKey, JSON.stringify(data), { ex: 3600 })
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}`}
                          language="typescript"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rate-limiting" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Rate Limiting Implementation</CardTitle>
                      <CardDescription>
                        Protecting your API with rate limiting
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">
                          Token Bucket Algorithm
                        </h3>
                        <CodeBlock
                          code={`import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

async function rateLimit(ip: string, limit: number, window: number) {
  const key = \`rate-limit:\${ip}\`
  const now = Date.now()
  
  const pipeline = redis.pipeline()
  pipeline.zremrangebyscore(key, 0, now - window)
  pipeline.zcard(key)
  pipeline.zadd(key, now, now.toString())
  pipeline.expire(key, window / 1000)
  
  const [, count] = await pipeline.exec()
  
  return count < limit
}

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  
  // Allow 100 requests per minute
  const isAllowed = await rateLimit(ip, 100, 60 * 1000)
  
  if (!isAllowed) {
    return new Response('Too Many Requests', { status: 429 })
  }
  
  return Response.next()
}`}
                          language="typescript"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Rate Limit Headers</h3>
                        <CodeBlock
                          code={`function setRateLimitHeaders(
  response: Response,
  limit: number,
  remaining: number,
  reset: number
) {
  response.headers.set('X-RateLimit-Limit', limit.toString())
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  response.headers.set('X-RateLimit-Reset', reset.toString())
  return response
}`}
                          language="typescript"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="websockets" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Real-time APIs with WebSockets</CardTitle>
                      <CardDescription>
                        Implementing real-time communication using WebSockets
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">WebSocket Server</h3>
                        <CodeBlock
                          code={`import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  console.log('Client connected')
  
  ws.on('message', (message) => {
    // Handle incoming messages
    const data = JSON.parse(message.toString())
    // Process data and broadcast to other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  })
  
  ws.on('close', () => {
    console.log('Client disconnected')
  })
})`}
                          language="typescript"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">WebSocket Client</h3>
                        <CodeBlock
                          code={`'use client'

import { useEffect, useState } from 'react'

export function WebSocketComponent() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    
    ws.onopen = () => {
      console.log('Connected to WebSocket')
    }
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMessages((prev) => [...prev, data])
    }
    
    ws.onclose = () => {
      console.log('Disconnected from WebSocket')
    }
    
    setSocket(ws)
    
    return () => {
      ws.close()
    }
  }, [])
  
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  )
}`}
                          language="typescript"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="versioning" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Versioning Strategies</CardTitle>
                      <CardDescription>
                        Managing API versions and backwards compatibility
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">URL Versioning</h3>
                        <CodeBlock
                          code={`// app/api/v1/users/route.ts
export async function GET(request: Request) {
  // V1 implementation
}

// app/api/v2/users/route.ts
export async function GET(request: Request) {
  // V2 implementation with new features
}`}
                          language="typescript"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Header Versioning</h3>
                        <CodeBlock
                          code={`export async function GET(request: Request) {
  const version = request.headers.get('api-version')
  
  switch (version) {
    case '2':
      return handleV2Request()
    case '1':
    default:
      return handleV1Request()
  }
}

// Client usage
const response = await fetch('/api/users', {
  headers: {
    'api-version': '2'
  }
})`}
                          language="typescript"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Version Migration</h3>
                        <CodeBlock
                          code={`// Graceful deprecation
export async function GET(request: Request) {
  const version = request.headers.get('api-version')
  
  if (version === '1') {
    // Add deprecation warning header
    const response = await handleV1Request()
    response.headers.set(
      'Warning',
      '299 - "This version will be deprecated soon. Please migrate to v2"'
    )
    return response
  }
  
  return handleV2Request()
}`}
                          language="typescript"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Tabs defaultValue="caching" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="caching">Caching</TabsTrigger>
                <TabsTrigger value="rate-limiting">Rate Limiting</TabsTrigger>
                <TabsTrigger value="websockets">WebSockets</TabsTrigger>
                <TabsTrigger value="versioning">Versioning</TabsTrigger>
              </TabsList>

              <TabsContent value="caching" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>API Caching Strategies</CardTitle>
                    <CardDescription>
                      Implementing effective caching for API responses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">HTTP Cache Headers</h3>
                      <CodeBlock
                        code={`// Setting cache headers
export async function GET(request: Request) {
  const data = await getData()
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'ETag': generateETag(data)
    }
  })
}

// Handling conditional requests
export async function GET(request: Request) {
  const etag = request.headers.get('if-none-match')
  const data = await getData()
  const currentETag = generateETag(data)
  
  if (etag === currentETag) {
    return new Response(null, { status: 304 })
  }
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'ETag': currentETag
    }
  })
}`}
                        language="typescript"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Redis Caching</h3>
                      <CodeBlock
                        code={`import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

export async function GET(request: Request) {
  const cacheKey = request.url
  
  // Try to get from cache
  const cached = await redis.get(cacheKey)
  if (cached) {
    return new Response(cached as string, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // Get fresh data
  const data = await getData()
  
  // Cache for 1 hour
  await redis.set(cacheKey, JSON.stringify(data), { ex: 3600 })
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}`}
                        language="typescript"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rate-limiting" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Rate Limiting Implementation</CardTitle>
                    <CardDescription>
                      Protecting your API with rate limiting
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Token Bucket Algorithm
                      </h3>
                      <CodeBlock
                        code={`import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

async function rateLimit(ip: string, limit: number, window: number) {
  const key = \`rate-limit:\${ip}\`
  const now = Date.now()
  
  const pipeline = redis.pipeline()
  pipeline.zremrangebyscore(key, 0, now - window)
  pipeline.zcard(key)
  pipeline.zadd(key, now, now.toString())
  pipeline.expire(key, window / 1000)
  
  const [, count] = await pipeline.exec()
  
  return count < limit
}

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  
  // Allow 100 requests per minute
  const isAllowed = await rateLimit(ip, 100, 60 * 1000)
  
  if (!isAllowed) {
    return new Response('Too Many Requests', { status: 429 })
  }
  
  return Response.next()
}`}
                        language="typescript"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Rate Limit Headers</h3>
                      <CodeBlock
                        code={`function setRateLimitHeaders(
  response: Response,
  limit: number,
  remaining: number,
  reset: number
) {
  response.headers.set('X-RateLimit-Limit', limit.toString())
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  response.headers.set('X-RateLimit-Reset', reset.toString())
  return response
}`}
                        language="typescript"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="websockets" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Real-time APIs with WebSockets</CardTitle>
                    <CardDescription>
                      Implementing real-time communication using WebSockets
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">WebSocket Server</h3>
                      <CodeBlock
                        code={`import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  console.log('Client connected')
  
  ws.on('message', (message) => {
    // Handle incoming messages
    const data = JSON.parse(message.toString())
    // Process data and broadcast to other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  })
  
  ws.on('close', () => {
    console.log('Client disconnected')
  })
})`}
                        language="typescript"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">WebSocket Client</h3>
                      <CodeBlock
                        code={`'use client'

import { useEffect, useState } from 'react'

export function WebSocketComponent() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    
    ws.onopen = () => {
      console.log('Connected to WebSocket')
    }
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMessages((prev) => [...prev, data])
    }
    
    ws.onclose = () => {
      console.log('Disconnected from WebSocket')
    }
    
    setSocket(ws)
    
    return () => {
      ws.close()
    }
  }, [])
  
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  )
}`}
                        language="typescript"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="versioning" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>API Versioning Strategies</CardTitle>
                    <CardDescription>
                      Managing API versions and backwards compatibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">URL Versioning</h3>
                      <CodeBlock
                        code={`// app/api/v1/users/route.ts
export async function GET(request: Request) {
  // V1 implementation
}

// app/api/v2/users/route.ts
export async function GET(request: Request) {
  // V2 implementation with new features
}`}
                        language="typescript"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Header Versioning</h3>
                      <CodeBlock
                        code={`export async function GET(request: Request) {
  const version = request.headers.get('api-version')
  
  switch (version) {
    case '2':
      return handleV2Request()
    case '1':
    default:
      return handleV1Request()
  }
}

// Client usage
const response = await fetch('/api/users', {
  headers: {
    'api-version': '2'
  }
})`}
                        language="typescript"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Version Migration</h3>
                      <CodeBlock
                        code={`// Graceful deprecation
export async function GET(request: Request) {
  const version = request.headers.get('api-version')
  
  if (version === '1') {
    // Add deprecation warning header
    const response = await handleV1Request()
    response.headers.set(
      'Warning',
      '299 - "This version will be deprecated soon. Please migrate to v2"'
    )
    return response
  }
  
  return handleV2Request()
}`}
                        language="typescript"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </FadeIn>

        <TutorialNavigation
          prevHref="/tutorials/authentication"
          prevLabel="Authentication"
          nextHref="/tutorials/playground"
          nextLabel="API Playground"
        />
      </div>
    </div>
  );
}
