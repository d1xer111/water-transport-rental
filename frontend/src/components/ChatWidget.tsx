import { useEffect, useRef, useState } from "react"
import { WS_URL } from "../services/api"

export default function ChatWidget() {
  const [messages, setMessages] = useState<{ text: string; from: "server" | "me" }[]>([])
  const [input, setInput] = useState("")
  const wsRef = useRef<WebSocket | null>(null)
  const [connected, setConnected] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => setConnected(true)
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setMessages((prev) => [...prev, { text: data.message || event.data, from: "server" }])
      } catch {
        setMessages((prev) => [...prev, { text: event.data, from: "server" }])
      }
    }
    ws.onclose = () => setConnected(false)

    return () => ws.close()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = () => {
    if (!input.trim() || !wsRef.current) return
    wsRef.current.send(input)
    setMessages((prev) => [...prev, { text: input, from: "me" }])
    setInput("")
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm flex flex-col h-[500px]">
      <div className="px-6 py-4 border-b flex items-center justify-between shrink-0">
        <div>
          <h3 className="font-bold">Чат поддержки</h3>
          <p className="text-xs text-gray-500">
            {connected ? "● В сети" : "○ Нет подключения"}
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50/50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-16 text-sm">
            {connected ? "Напишите нам!" : "Подключение..."}
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2.5 text-sm rounded-2xl ${
                msg.from === "me"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white shadow-sm rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t shrink-0">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Сообщение..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm focus:border-blue-500"
          />
          <button
            onClick={send}
            disabled={!connected || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}
