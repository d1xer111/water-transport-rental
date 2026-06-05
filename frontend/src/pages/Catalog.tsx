import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { transportsApi, type Transport } from "../services/api"

export default function Catalog() {
  const [transports, setTransports] = useState<Transport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    transportsApi
      .getAll()
      .then(({ data }) => setTransports(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="py-20 text-center text-gray-500 text-lg">Загрузка флота...</div>
  }

  if (transports.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-2xl font-bold mb-4">Флот временно недоступен</p>
        <p className="text-gray-500 mb-8">Попробуйте обновить страницу позже</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
        >
          Обновить
        </button>
      </div>
    )
  }

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3">Каталог флота</h1>
          <p className="text-lg text-gray-500">
            Показано {transports.length} премиальных судов
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {transports.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={`/images/${t.id}.jpg`}
                alt={t.name}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{t.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{t.description}</p>
                <div className="flex gap-4 text-xs text-gray-400 mb-4">
                  <span>До {t.capacity} гостей</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-xl font-bold">{t.price_per_hour.toLocaleString()} ₽</span>
                    <span className="text-gray-400 text-sm"> / час</span>
                  </div>
                  <Link
                    to={`/boat/${t.id}`}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    Забронировать
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
