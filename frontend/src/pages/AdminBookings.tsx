import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { bookingsApi, transportsApi, type Booking, type Transport } from "../services/api"
import { useAuthStore } from "../store/authStore"
import { useNotificationStore } from "../store/notificationStore"

export default function AdminBookings() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const addToast = useNotificationStore((s) => s.addToast)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [transports, setTransports] = useState<Transport[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    Promise.all([bookingsApi.getAll(), transportsApi.getAll()])
      .then(([bRes, tRes]) => {
        setBookings(bRes.data)
        setTransports(tRes.data)
      })
      .catch(() => {})
  }, [])

  const getTransportName = (id: number) => {
    const t = transports.find((t) => t.id === id)
    return t ? t.name : `#${id}`
  }

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter)

  const handleApprove = async (id: number) => {
    try {
      await bookingsApi.approve(id)
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "approved" } : b)))
      addToast("Бронирование одобрено", "success")
    } catch {
      addToast("Ошибка", "error")
    }
  }

  const handleReject = async (id: number) => {
    try {
      await bookingsApi.reject(id)
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)))
      addToast("Бронирование отклонено", "success")
    } catch {
      addToast("Ошибка", "error")
    }
  }

  const stats = [
    { title: "Подтверждено", value: bookings.filter((b) => b.status === "approved").length, active: filter === "approved", onClick: () => setFilter("approved") },
    { title: "В ожидании", value: bookings.filter((b) => b.status === "pending").length, active: filter === "pending", onClick: () => setFilter("pending") },
    { title: "Всего", value: bookings.length, active: filter === "all", onClick: () => setFilter("all") },
    { title: "Отменено", value: bookings.filter((b) => b.status === "cancelled").length, active: filter === "cancelled", onClick: () => setFilter("cancelled") },
  ]

  const doLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-60 bg-gray-900 text-white p-6 shrink-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img src="https://i.pravatar.cc/100?img=13" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold text-sm">Админ парка</p>
              <p className="text-xs text-gray-400">Системный контроллер</p>
            </div>
          </div>
          <nav className="space-y-1">
            {[
              { label: "Статистика", onClick: () => navigate("/admin") },
              { label: "Управление флотом", onClick: () => navigate("/admin/fleet") },
              { label: "Все бронирования", active: true, onClick: () => {} },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                  item.active ? "bg-blue-600 font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={doLogout} className="text-sm text-red-400 hover:text-red-300 px-4 py-2 text-left">
          Выйти
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">Управление бронированиями</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((s) => (
            <button
              key={s.title}
              onClick={s.onClick}
              className={`bg-white rounded-xl shadow-sm p-6 text-left transition-all ${
                s.active ? "ring-1 ring-blue-600" : ""
              }`}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{s.title}</p>
              <p className="text-3xl font-bold">{s.value}</p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                {["ID", "Транспорт", "Дата", "Часы", "Статус", "Действия"].map((h) => (
                  <th key={h} className="text-left px-6 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                    Нет бронирований
                  </td>
                </tr>
              ) : (
                filtered.map((b) => {
                  const statusClass =
                    b.status === "approved"
                      ? "bg-green-50 text-green-700"
                      : b.status === "cancelled"
                        ? "bg-red-50 text-red-700"
                        : "bg-yellow-50 text-yellow-700"

                  const statusLabel =
                    b.status === "approved"
                      ? "Подтверждено"
                      : b.status === "cancelled"
                        ? "Отменено"
                        : "В ожидании"

                  return (
                    <tr key={b.id} className="border-t">
                      <td className="px-6 py-5 font-semibold">#{b.id}</td>
                      <td className="px-6 py-5">{getTransportName(b.transport_id)}</td>
                      <td className="px-6 py-5 text-gray-500">
                        {new Date(b.booking_date).toLocaleDateString("ru-RU")}
                      </td>
                      <td className="px-6 py-5">{b.hours} ч.</td>
                      <td className="px-6 py-5">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusClass}`}>
                          ● {statusLabel}
                        </span>
                      </td>
                      <td className="px-6 py-5 space-x-2">
                        {b.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(b.id)}
                              className="bg-green-50 text-green-700 px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                            >
                              Одобрить
                            </button>
                            <button
                              onClick={() => handleReject(b.id)}
                              className="bg-red-50 text-red-700 px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                            >
                              Отклонить
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
