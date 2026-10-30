import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Normalise the base URL: a trailing slash ("…onrender.com/") produced
// "//chat/stream", and a value that already includes the route produced
// "/chat/stream/chat/stream". Both hit FastAPI as 404 {"detail":"Not Found"}.
const PYTHON_API_URL = (process.env.PYTHON_API_URL ?? "http://127.0.0.1:8000")
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/chat(\/stream)?$/, "")
const MAX_RETRIES = 6
const RETRY_DELAY_MS = 1500

function isConnRefused(err: unknown): boolean {
  const e = err as NodeJS.ErrnoException & { cause?: NodeJS.ErrnoException }
  return (
    e.code === "ECONNREFUSED" ||
    (e.cause as NodeJS.ErrnoException | undefined)?.code === "ECONNREFUSED"
  )
}

async function fetchWithRetry(message: string): Promise<Response> {
  let lastErr: unknown
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS))
      console.warn(`[chat] Python server not ready, retry ${attempt}/${MAX_RETRIES - 1}`)
    }
    try {
      return await fetch(`${PYTHON_API_URL}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
    } catch (err) {
      if (!isConnRefused(err)) throw err
      lastErr = err
    }
  }
  throw lastErr
}

export async function POST(req: Request) {
  const { message } = await req.json()

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 })
  }

  try {
    const response = await fetchWithRetry(message)

    if (!response.ok) {
      const err = await response.text()
      console.error("[chat] Python server error:", response.status, PYTHON_API_URL, err)
      // Keep upstream details in the logs; visitors get a readable message.
      return NextResponse.json(
        { error: "The assistant is having trouble right now. Please try again later." },
        { status: 502 }
      )
    }

    // Pipe the SSE stream directly to the client
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    })
  } catch (err) {
    console.error("[chat] Failed to reach Python server:", err)
    return NextResponse.json(
      { error: "Chat service unavailable. Please try again later." },
      { status: 503 }
    )
  }
}

