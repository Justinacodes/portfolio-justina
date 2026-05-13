import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const PYTHON_API_URL = process.env.PYTHON_API_URL ?? "http://127.0.0.1:8000"

export async function POST(req: Request) {
  const { message } = await req.json()

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`${PYTHON_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error("[chat] Python server error:", response.status, err)
      return NextResponse.json({ error: err }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error("[chat] Failed to reach Python server:", err)
    return NextResponse.json(
      { error: "Chat service unavailable. Please try again later." },
      { status: 503 }
    )
  }
}
