import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { transportsApi, bookingsApi, type Transport } from "../services/api"
import { useAuthStore } from "../store/authStore"
import { useNotificationStore } from "../store/notificationStore"

const schema = z.object({
  date: z.string().min(1, "Выберите дату"),
  hours: z.coerce.number().min(1, "Минимум 1 час").max(8, "Максимум 8 часов"),
})

type FormData = z.infer<typeof schema>

export default function Booking() {
  const navigate = useNavigate()
  const { id } = useParams()
  const token = useAuthStore((s) => s.token)
  const addToast = useNotificationStore((s) => s.addToast)
  const [transport, setTransport] = useState<Transport | null>(null)
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hours: 2 },
  })

  const hours = watch("hours")

  useEffect(() => {
    transportsApi
      .getAll()
      .then(({ data }) => {
        const found = data.find((t) => t.id === Number(id))
        setTransport(found || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const onSubmit = async (data: FormData) => {
    if (!token) {
      addToast("Сначала войдите в систему", "error")
      navigate("/login")
      return
    }
    if (!transport) return

    try {
      await bookingsApi.create({
        user_id: 0,
        transport_id: transport.id,
        booking_date: data.date,
        hours: data.hours,
      })
      addToast("Бронирование отправлено!", "success")
      navigate("/my-bookings")
    } catch {
      addToast("Ошибка при создании бронирования", "error")
    }
  }

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Загрузка...</div>
  }

  if (!transport) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Транспорт не найден</h2>
        <Link to="/catalog" className="text-blue-600 hover:underline">Вернуться в каталог</Link>
      </div>
    )
  }

  const total = transport.price_per_hour * (hours || 2) + 2500

  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Оформление бронирования</h1>
        <p className="text-gray-500 mb-10">Заполните данные поездки и подтвердите аренду транспорта</p>

        <div className="grid md:grid-cols-[1fr_360px] gap-10">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Дата аренды</label>
              <input
                type="date"
                {...register("date")}
                className="w-full border border-gray-200 rounded-xl px-5 py-3 outline-none focus:border-blue-500 transition-colors"
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Количество часов</label>
              <select
                {...register("hours")}
                className="w-full border border-gray-200 rounded-xl px-5 py-3 outline-none focus:border-blue-500 bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                  <option key={h} value={h}>
                    {h} {h === 1 ? "час" : h < 5 ? "часа" : "часов"}
                  </option>
                ))}
              </select>
              {errors.hours && <p className="text-red-500 text-xs mt-1">{errors.hours.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Комментарий</label>
              <textarea
                placeholder="Маршрут, пожелания, особые условия..."
                className="w-full border border-gray-200 rounded-xl px-5 py-3 h-28 outline-none focus:border-blue-500 resize-none transition-colors"
              />
            </div>
            <button
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3.5 rounded-xl font-medium transition-colors"
            >
              {isSubmitting ? "Отправка..." : "Подтвердить бронирование"}
            </button>
          </form>

          <aside className="bg-white rounded-2xl shadow-sm p-7 h-fit">
            <h2 className="text-xl font-bold mb-4">{transport.name}</h2>
            <div className="border-t pt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Цена за час</span>
                <b>{transport.price_per_hour.toLocaleString()} ₽</b>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Часы</span>
                <b>{hours || 2}</b>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Сервисный сбор</span>
                <b>2 500 ₽</b>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Итого</span>
                <span className="text-blue-600">{total.toLocaleString()} ₽</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
