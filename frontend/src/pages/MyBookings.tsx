import { useEffect, useState } from "react"
import { bookingsApi, transportsApi, type Booking, type Transport } from "../services/api"

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [transports, setTransports] = useState<Transport[]>([])
  const [tab, setTab] = useState(0)

  useEffect(() => {
    Promise.all([bookingsApi.getAll(), transportsApi.getAll()])
      .then(([bRes, tRes]) => {
        setBookings(bRes.data || [])
        setTransports(tRes.data)
      })
      .catch(() => {})
  }, [])

  const getTransportName = (id: number) => {
    const t = transports.find((t) => t.id === id)
    return t ? t.name : `Транспорт #${id}`
  }

  const all = bookings || []
  const filtered =
    tab === 0
      ? all.filter((b) => b.status === "pending" || b.status === "approved")
      : tab === 1
        ? all.filter((b) => b.status === "pending")
        : all.filter((b) => b.status === "cancelled" || b.status === "approved")

  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Мои бронирования</h1>
        <p className="text-gray-500 mb-10">Управляйте вашими рейсами</p>

        <div className="flex gap-6 border-b mb-8">
          {[
            `Активные (${all.filter((b) => b.status === "pending" || b.status === "approved").length})`,
            `В ожидании (${all.filter((b) => b.status === "pending").length})`,
            `Завершенные (${all.filter((b) => b.status !== "pending").length})`,
          ].map((label, i) => (
            <button
              key={label}
              onClick={() => setTab(i)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                i === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-lg">Нет бронирований</div>
        ) : (
          <div className="space-y-5">
            {filtered.map((b) => (
              <div key={b.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold">{getTransportName(b.transport_id)}</h2>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        b.status === "approved"
                          ? "bg-green-50 text-green-700"
                          : b.status === "cancelled"
                            ? "bg-red-50 text-red-700"
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {b.status === "approved"
                        ? "Подтверждено"
                        : b.status === "cancelled"
                          ? "Отменено"
                          : "В ожидании"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 mb-4">
                    <p>Дата: {new Date(b.booking_date).toLocaleDateString("ru-RU")}</p>
                    <p>Длительность: {b.hours} ч.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
