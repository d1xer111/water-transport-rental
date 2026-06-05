import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { bookingsApi, type Booking } from "../services/api"
import { useAuthStore } from "../store/authStore"
import { useNotificationStore } from "../store/notificationStore"
import ChatWidget from "../components/ChatWidget"

export default function Profile() {
  const navigate = useNavigate()
  const { username, logout: storeLogout } = useAuthStore()
  const addToast = useNotificationStore((s) => s.addToast)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bookingsApi.getAll().then(({ data }) => setBookings(data || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const logout = () => {
    storeLogout()
    addToast("Вы вышли из системы", "info")
    navigate("/login")
  }

  const displayName = username || "Пользователь"
  const activeBookings = (bookings || []).filter((b) => b.status === "pending" || b.status === "approved")
  const completedBookings = (bookings || []).filter((b) => b.status === "cancelled")

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        Загрузка профиля...
      </div>
    )
  }

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
              {displayName[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{displayName}</h1>
              <p className="text-gray-500">Премиум участник</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/my-bookings")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Мои бронирования
            </button>
            <button onClick={logout} className="text-red-500 hover:text-red-600 text-sm font-medium px-4">
              Выйти
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
              {[
                { title: "Активные бронирования", value: activeBookings.length.toString() },
                { title: "Завершенные", value: completedBookings.length.toString() },
                { title: "Всего", value: (bookings || []).length.toString() },
              ].map((stat) => (
                <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6">
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm">
              <div className="px-6 py-5 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">Последние бронирования</h2>
                <button
                  onClick={() => navigate("/my-bookings")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Смотреть все
                </button>
              </div>

              {!bookings || bookings.length === 0 ? (
                <div className="p-10 text-center text-gray-400">У вас пока нет бронирований</div>
              ) : (
                <div className="divide-y">
                  {bookings.slice(0, 5).map((b) => (
                    <div key={b.id} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          Транспорт #{b.transport_id} — {b.hours} ч.
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(b.booking_date).toLocaleDateString("ru-RU")}
                        </p>
                      </div>
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
                  ))}
                </div>
              )}
            </div>
          </div>

          <ChatWidget />
        </div>
      </div>
    </div>
  )
}
