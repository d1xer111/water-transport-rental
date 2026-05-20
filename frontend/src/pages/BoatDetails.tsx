import { Link, useParams } from "react-router-dom"
import { boats } from "../data/boats"

function BoatDetails() {
  const { id } = useParams()

  const boat = boats.find((b) => b.id === Number(id))

  if (!boat) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">
        Транспорт не найден
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-10 py-16">
      <div className="max-w-6xl mx-auto">
        <img
          src={boat.image}
          alt={boat.title}
          className="w-full h-[500px] object-cover rounded-3xl mb-10"
        />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-violet-400 mb-3 text-lg">
              {boat.type}
            </p>

            <h1 className="text-6xl font-bold mb-6">
              {boat.title}
            </h1>

            <p className="text-gray-300 text-xl leading-relaxed">
              Премиальный водный транспорт для отдыха,
              путешествий и незабываемых впечатлений.
              Идеально подходит для прогулок,
              мероприятий и luxury-отдыха.
            </p>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-10 h-fit">
            <h2 className="text-4xl font-bold mb-8">
              Бронирование
            </h2>

            <div className="text-5xl font-bold text-violet-400 mb-8">
              от {boat.price.toLocaleString()} ₽
            </div>

            <Link
              to={`/booking/${boat.id}`}
              className="block text-center w-full bg-violet-500 hover:bg-violet-600 transition py-5 rounded-2xl text-xl font-semibold"
            >
              Забронировать сейчас
            </Link>

            <div className="mt-8 text-gray-400 space-y-3">
              <p>✔ Мгновенное подтверждение</p>
              <p>✔ Проверенные владельцы</p>
              <p>✔ Поддержка 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoatDetails