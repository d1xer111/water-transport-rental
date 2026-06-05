import { useEffect, useRef, useState } from "react"
import { WS_URL } from "../services/api"

export default function Chat() {
  const [messages, setMessages] = useState<{ text: string; from: "server" | "me" }[]>([])
  const [input, setInput] = useState("")
  const wsRef = useRef<WebSocket | null>(null)
  const [connected, setConnected] = useState(false)

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

  const send = () => {
    if (!input.trim() || !wsRef.current) return
    wsRef.current.send(input)
    setMessages((prev) => [...prev, { text: input, from: "me" }])
    setInput("")
  }

  return (
    <div className="py-8 px-6 h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Чат поддержки</h2>
            <p className="text-xs text-gray-500">
              {connected ? "● В сети" : "○ Не подключено"}
            </p>
          </div>
        </div>

        <div className="flex-1 bg-gray-50 p-6 space-y-4 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 py-16">
              {connected ? "Нет сообщений. Напишите что-нибудь!" : "Подключение к серверу..."}
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-md px-5 py-3 text-sm rounded-2xl ${
                  msg.from === "me"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white shadow-sm rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Введите ваше сообщение..."
              className="flex-1 border border-gray-200 rounded-xl px-5 py-3 outline-none text-sm focus:border-blue-500 transition-colors"
            />
            <button
              onClick={send}
              disabled={!connected || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
