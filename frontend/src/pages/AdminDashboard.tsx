import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { bookingsApi, transportsApi, type Booking, type Transport } from "../services/api"
import { useAuthStore } from "../store/authStore"
import { useNotificationStore } from "../store/notificationStore"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const addToast = useNotificationStore((s) => s.addToast)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [transports, setTransports] = useState<Transport[]>([])

  useEffect(() => {
    Promise.all([bookingsApi.getAll(), transportsApi.getAll()])
      .then(([bRes, tRes]) => {
        setBookings(bRes.data)
        setTransports(tRes.data)
      })
      .catch(() => {})
  }, [])

  const pendingBookings = bookings.filter((b) => b.status === "pending")
  const approvedBookings = bookings.filter((b) => b.status === "approved")

  const handleApprove = async (id: number) => {
    try {
      await bookingsApi.approve(id)
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "approved" } : b)))
      addToast("Бронирование одобрено", "success")
    } catch {
      addToast("Ошибка при одобрении", "error")
    }
  }

  const handleReject = async (id: number) => {
    try {
      await bookingsApi.reject(id)
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)))
      addToast("Бронирование отклонено", "success")
    } catch {
      addToast("Ошибка при отклонении", "error")
    }
  }

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
              { label: "Статистика", active: true, onClick: () => {} },
              { label: "Управление флотом", active: false, onClick: () => navigate("/admin/fleet") },
              { label: "Все бронирования", active: false, onClick: () => navigate("/admin/bookings") },
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
        <h1 className="text-3xl font-bold mb-8">Обзор панели управления</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { title: "Всего судов", value: transports.length.toString() },
            { title: "Всего бронирований", value: bookings.length.toString() },
            { title: "Подтверждено", value: approvedBookings.length.toString() },
            { title: "В ожидании", value: pendingBookings.length.toString() },
          ].map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">
            Запросы на бронирование ({pendingBookings.length})
          </h2>
          {pendingBookings.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Нет ожидающих запросов</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="text-left py-3 font-medium">ID</th>
                    <th className="text-left py-3 font-medium">ID транспорта</th>
                    <th className="text-left py-3 font-medium">Дата</th>
                    <th className="text-left py-3 font-medium">Часы</th>
                    <th className="text-right py-3 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingBookings.map((b) => (
                    <tr key={b.id} className="border-b last:border-0">
                      <td className="py-4 font-semibold">#{b.id}</td>
                      <td className="py-4">#{b.transport_id}</td>
                      <td className="py-4">{new Date(b.booking_date).toLocaleDateString("ru-RU")}</td>
                      <td className="py-4">{b.hours} ч.</td>
                      <td className="py-4 text-right space-x-2">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
