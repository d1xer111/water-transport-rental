import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { transportsApi, type Transport } from "../services/api"

export default function BoatPage() {
  const { id } = useParams()
  const [transport, setTransport] = useState<Transport | null>(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <div className="py-20 text-center text-gray-500 text-lg">Загрузка...</div>
  }

  if (!transport) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Транспорт не найден</h2>
        <Link to="/catalog" className="text-blue-600 hover:underline">
          Вернуться в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <img
          src={`/images/${transport.id}.jpg`}
          alt={transport.name}
          className="w-full h-[400px] md:h-[520px] rounded-2xl shadow-sm mb-12 object-cover"
        />

        <div className="grid md:grid-cols-[1fr_380px] gap-12">
          <div>
            <h1 className="text-5xl font-bold mt-3 mb-6">{transport.name}</h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">{transport.description}</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Вместимость", value: `До ${transport.capacity} гостей` },
                { label: "Цена", value: `${transport.price_per_hour.toLocaleString()} ₽/час` },
                { label: "Рейтинг", value: "4.9 ★" },
              ].map((info) => (
                <div key={info.label} className="bg-white rounded-xl shadow-sm p-5">
                  <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                  <p className="text-lg font-bold">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 h-fit">
            <h2 className="text-2xl font-bold mb-4">Бронирование</h2>
            <p className="text-4xl font-bold text-blue-600 mb-8">
              от {transport.price_per_hour.toLocaleString()} ₽
            </p>
            <Link
              to={`/booking/${transport.id}`}
              className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium transition-colors"
            >
              Забронировать сейчас
            </Link>
            <div className="mt-6 space-y-2 text-sm text-gray-500">
              <p>✓ Мгновенное подтверждение</p>
              <p>✓ Проверенные владельцы</p>
              <p>✓ Поддержка 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
