"use client"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm Justina's AI assistant. Ask me anything about her skills, projects, or experience.",
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: "user", content: text }])
    setInput("")
    setLoading(true)

    // Add an empty assistant message that we'll fill incrementally
    const assistantIndex = messages.length + 1 // +1 for the user msg we just added
    setMessages((prev) => [...prev, { role: "assistant", content: "" }])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: "Something went wrong." }))
        setMessages((prev) => {
          const updated = [...prev]
          updated[assistantIndex] = {
            role: "assistant",
            content: errData.error ?? "Something went wrong.",
          }
          return updated
        })
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        setMessages((prev) => {
          const updated = [...prev]
          updated[assistantIndex] = {
            role: "assistant",
            content: "Failed to read response stream.",
          }
          return updated
        })
        return
      }

      let buffer = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Process complete SSE lines
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? "" // Keep the incomplete last line

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || !trimmed.startsWith("data: ")) continue
          const data = trimmed.slice(6) // Remove "data: " prefix
          if (data === "[DONE]") continue

          setMessages((prev) => {
            const updated = [...prev]
            updated[assistantIndex] = {
              ...updated[assistantIndex],
              content: updated[assistantIndex].content + data,
            }
            return updated
          })
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        if (updated[assistantIndex]) {
          updated[assistantIndex] = {
            role: "assistant",
            content:
              updated[assistantIndex].content ||
              "Connection error. Is the chat server running?",
          }
        } else {
          updated.push({
            role: "assistant",
            content: "Connection error. Is the chat server running?",
          })
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 transition-opacity duration-300 [body[data-menu-open]_&]:pointer-events-none [body[data-menu-open]_&]:opacity-0">
      {/* Chat panel */}
      {open && (
        <div className="w-[calc(100vw-3rem)] sm:w-96 bg-canvas rounded-2xl shadow-2xl border border-line flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-ink">
            <div className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-cream font-display font-bold text-sm">Justina&apos;s Assistant</p>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-cream/50">Ask me anything</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-cream/70 hover:text-peach transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 min-h-[200px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "assistant"
                      ? "bg-cream text-accent"
                      : "bg-ink/5 text-ink/60"
                  }`}
                >
                  {msg.role === "assistant" ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-cream text-ink rounded-tl-sm"
                      : "bg-ink text-cream rounded-tr-sm"
                  }`}
                >
                  {msg.role === "assistant" && msg.content === "" && loading ? (
                    <span className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-line">
            <div className="flex items-center gap-2 bg-cream rounded-full px-4 py-2.5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about skills, projects…"
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-ink placeholder-ink/40 outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="text-ink hover:text-accent disabled:opacity-30 transition-colors shrink-0"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 bg-ink text-cream rounded-full shadow-lg hover:bg-accent hover:scale-105 transition-all duration-300 ease-editorial flex items-center justify-center"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}
