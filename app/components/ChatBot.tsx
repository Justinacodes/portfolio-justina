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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response ?? data.error ?? "Something went wrong.",
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Is the chat server running?" },
      ])
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Justina's Assistant</p>
              <p className="text-indigo-200 text-xs">Ask me anything</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
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
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {msg.role === "assistant" ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-gray-50 text-gray-800 rounded-tl-sm"
                      : "bg-indigo-600 text-white rounded-tr-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-indigo-600" />
                </div>
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3">
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about skills, projects…"
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="text-indigo-600 hover:text-indigo-700 disabled:opacity-30 transition-colors shrink-0"
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
        className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}
