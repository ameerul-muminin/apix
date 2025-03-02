"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Play } from "lucide-react";

interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
}

export function RequestDemo() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const headerObj: Record<string, string> = {};
      if (headers) {
        headers.split("\n").forEach((line) => {
          const [key, value] = line.split(":").map((item) => item.trim());
          if (key && value) {
            headerObj[key] = value;
          }
        });
      }

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headerObj,
        },
      };

      if (method !== "GET" && method !== "HEAD" && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const data = await res.json();

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries([...res.headers.entries()]),
        data,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="headers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger
            value="body"
            disabled={method === "GET" || method === "HEAD"}
          >
            Body
          </TabsTrigger>
        </TabsList>
        <TabsContent value="headers" className="p-4 border rounded-md">
          <Label htmlFor="headers">
            Headers (one per line, format: Key: Value)
          </Label>
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

      <div className="flex justify-center">
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

      {error && (
        <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-md dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {response && (
        <div className="mt-6 border rounded-md">
          <div className="p-3 bg-muted font-medium border-b">Response</div>
          <div className="p-4">
            <div className="mb-4">
              <p className="text-sm font-medium">
                Status:{" "}
                <span className="font-mono">
                  {response.status} {response.statusText}
                </span>
              </p>
            </div>
            <Tabs defaultValue="response-body">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="response-body">Body</TabsTrigger>
                <TabsTrigger value="response-headers">Headers</TabsTrigger>
              </TabsList>
              <TabsContent
                value="response-body"
                className="p-4 border rounded-md mt-2"
              >
                <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </TabsContent>
              <TabsContent
                value="response-headers"
                className="p-4 border rounded-md mt-2"
              >
                <div className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono">
                  {Object.entries(response.headers).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-semibold">{key}:</span>{" "}
                      {value as string}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
