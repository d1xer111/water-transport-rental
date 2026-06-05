import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { transportsApi, type Transport } from "../services/api"
import { useAuthStore } from "../store/authStore"
import { useNotificationStore } from "../store/notificationStore"

export default function AdminFleet() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const addToast = useNotificationStore((s) => s.addToast)
  const [transports, setTransports] = useState<Transport[]>([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [capacity, setCapacity] = useState("")

  useEffect(() => {
    transportsApi.getAll().then(({ data }) => setTransports(data)).catch(() => {})
  }, [])

  const addTransport = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await transportsApi.create({
        name,
        description,
        price_per_hour: Number(price),
        capacity: Number(capacity),
      })
      setName("")
      setDescription("")
      setPrice("")
      setCapacity("")
      setShowForm(false)
      const { data } = await transportsApi.getAll()
      setTransports(data)
      addToast("Транспорт добавлен", "success")
    } catch {
      addToast("Ошибка при добавлении", "error")
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
              { label: "Статистика", onClick: () => navigate("/admin") },
              { label: "Управление флотом", active: true, onClick: () => {} },
              { label: "Все бронирования", onClick: () => navigate("/admin/bookings") },
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Управление флотом</h1>
            <p className="text-gray-500 text-sm mt-1">Всего судов: {transports.length}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            {showForm ? "Отмена" : "+ Добавить транспорт"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={addTransport} className="bg-white rounded-xl shadow-sm p-6 mb-6 grid grid-cols-2 gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название"
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm focus:border-blue-500"
              required
            />
            <input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              placeholder="Вместимость (чел.)"
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm focus:border-blue-500"
              required
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              step="0.01"
              placeholder="Цена за час (₽)"
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm focus:border-blue-500"
              required
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание"
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm focus:border-blue-500"
            />
            <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-medium transition-colors">
              Сохранить
            </button>
          </form>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                {["Название", "Описание", "Цена/час", "Вместимость", "Статус"].map((h) => (
                  <th key={h} className="text-left px-6 py-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    Флот пуст. Добавьте первый транспорт.
                  </td>
                </tr>
              ) : (
                transports.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="px-6 py-4 font-semibold">{t.name}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{t.description}</td>
                    <td className="px-6 py-4">{t.price_per_hour.toLocaleString()} ₽</td>
                    <td className="px-6 py-4">{t.capacity} чел.</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                        ● Активен
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
