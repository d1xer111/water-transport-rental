import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { transportsApi, type Transport } from "../services/api"

export default function Home() {
  const [transports, setTransports] = useState<Transport[]>([])

  useEffect(() => {
    transportsApi.getAll().then(({ data }) => setTransports(data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <>
      <section className="relative h-[90vh] bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Откройте водный мир
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mb-10">
            Аренда премиальных яхт, катеров и гидроциклов для незабываемых путешествий
          </p>
          <div className="flex gap-4">
            <Link
              to="/catalog"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Смотреть каталог
            </Link>
            <Link
              to="/about"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              О нас
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-3">Популярный флот</h2>
              <p className="text-gray-500 text-lg">Тщательно отобранные суда для незабываемых путешествий</p>
            </div>
            <Link to="/catalog" className="text-blue-600 hover:text-blue-700 font-medium hidden sm:block">
              Смотреть все →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {transports.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={`/images/${t.id}.jpg`}
                  alt={t.name}
                  className="h-64 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <span className="text-2xl font-bold">{t.price_per_hour.toLocaleString()} ₽</span>
                      <span className="text-gray-400 text-sm"> / час</span>
                    </div>
                    <Link
                      to={`/boat/${t.id}`}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                      Забронировать
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {transports.length === 0 && (
              <div className="col-span-3 text-center py-12 text-gray-400">Загрузка...</div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Почему выбирают нас?</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: "🛡️", title: "Безопасность", desc: "Каждое судно проходит строгие проверки безопасности" },
              { icon: "⚙️", title: "Надёжность", desc: "Сотрудничаем только с сертифицированными капитанами" },
              { icon: "⚡", title: "Мгновенно", desc: "Бронирование за считанные секунды через удобную платформу" },
            ].map((item) => (
              <div key={item.title}>
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Готовы отправиться в плавание?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Присоединяйтесь к нашему сервису и получите доступ к эксклюзивным предложениям
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-colors"
        >
          Зарегистрироваться
        </Link>
      </section>
    </>
  )
}
