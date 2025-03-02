"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Play, Save } from "lucide-react"

const SAMPLE_APIS = [
  {
    name: "JSONPlaceholder - Posts",
    url: "https://jsonplaceholder.typicode.com/posts",
    description: "Fetch a list of posts",
  },
  {
    name: "JSONPlaceholder - Post by ID",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    description: "Fetch a single post",
  },
  {
    name: "JSONPlaceholder - Comments",
    url: "https://jsonplaceholder.typicode.com/comments",
    description: "Fetch comments",
  },
  {
    name: "Random User API",
    url: "https://randomuser.me/api/",
    description: "Generate random user data",
  },
  {
    name: "Open Weather Map",
    url: "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY",
    description: "Get weather data (requires API key)",
  },
  {
    name: "GitHub Users API",
    url: "https://api.github.com/users/octocat",
    description: "Get GitHub user information",
  },
]

type ApiResponse = {
  status: number
  statusText: string
  headers: Record<string, string>
  data: unknown
} | null

export function ApiPlayground() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts")
  const [method, setMethod] = useState("GET")
  const [headers, setHeaders] = useState("")
  const [body, setBody] = useState("")
  const [response, setResponse] = useState<ApiResponse>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedRequests, setSavedRequests] = useState<
    Array<{ name: string; url: string; method: string; headers: string; body: string }>
  >([])
  const [requestName, setRequestName] = useState("")

  const handleSendRequest = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const headerObj: Record<string, string> = {};

      if (headers) {
        headers.split("\n").forEach((line) => {
          const [key, value] = line.split(":").map((item) => item.trim())
          if (key && value) {
            headerObj[key] = value
          }
        })
      }

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headerObj,
        },
      }

      if (method !== "GET" && method !== "HEAD" && body) {
        options.body = body
      }

      const res = await fetch(url, options)
      const contentType = res.headers.get("content-type") || ""

      let data
      if (contentType.includes("application/json")) {
        data = await res.json()
      } else {
        data = await res.text()
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries([...res.headers.entries()]),
        data,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveRequest = () => {
    if (!requestName) return

    setSavedRequests([
      ...savedRequests,
      {
        name: requestName,
        url,
        method,
        headers,
        body,
      },
    ])

    setRequestName("")
  }

  const handleLoadRequest = (index: number) => {
    const request = savedRequests[index]
    setUrl(request.url)
    setMethod(request.method)
    setHeaders(request.headers)
    setBody(request.body)
  }

  const handleLoadSampleApi = (api: (typeof SAMPLE_APIS)[0]) => {
    setUrl(api.url)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Builder</CardTitle>
            <CardDescription>Construct your API request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-3">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://api.example.com/endpoint"
                  />
                </div>
                <div>
                  <Label htmlFor="method">Method</Label>
                  <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger id="method">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs defaultValue="headers" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="body" disabled={method === "GET" || method === "HEAD"}>
                    Body
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="headers" className="p-4 border rounded-md">
                  <Label htmlFor="headers">Headers (one per line, format: Key: Value)</Label>
                  <Textarea
                    id="headers"
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value)}
                    placeholder="Accept: application/json"
                    className="font-mono text-sm"
                  />
                </TabsContent>
                <TabsContent value="body" className="p-4 border rounded-md">
                  <Label htmlFor="body">Request Body (JSON)</Label>
                  <Textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='{"name": "John", "email": "john@example.com"}'
                    className="font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Request name"
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    className="w-48"
                  />
                  <Button variant="outline" onClick={handleSaveRequest} disabled={!requestName}>
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                </div>
                <Button onClick={handleSendRequest} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Send Request
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-md dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {response && (
          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
              <CardDescription>
                Status:{" "}
                <span className="font-mono">
                  {response.status} {response.statusText}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="response-body">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="response-body">Body</TabsTrigger>
                  <TabsTrigger value="response-headers">Headers</TabsTrigger>
                </TabsList>
                <TabsContent value="response-body" className="p-4 border rounded-md mt-2">
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono max-h-96">
                    {typeof response.data === "string" ? response.data : JSON.stringify(response.data, null, 2)}
                  </pre>
                </TabsContent>
                <TabsContent value="response-headers" className="p-4 border rounded-md mt-2">
                  <div className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono max-h-96">
                    {Object.entries(response.headers).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-semibold">{key}:</span> {value as string}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sample APIs</CardTitle>
            <CardDescription>Try these public APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {SAMPLE_APIS.map((api, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => handleLoadSampleApi(api)}
                >
                  <h3 className="font-medium text-sm">{api.name}</h3>
                  <p className="text-xs text-muted-foreground">{api.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {savedRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Saved Requests</CardTitle>
              <CardDescription>Your saved API requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedRequests.map((request, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleLoadRequest(index)}
                  >
                    <h3 className="font-medium text-sm">{request.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">{request.method}</span>
                      <span className="text-xs text-muted-foreground truncate">{request.url}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

