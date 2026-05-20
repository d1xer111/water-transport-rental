import { useState } from "react"
import { useParams } from "react-router-dom"
import { boats } from "../data/boats"

function CreateBooking() {
  const { id } = useParams()

  const boat = boats.find((b) => b.id === Number(id))

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleBooking = () => {
    alert(
      `Бронирование отправлено!\n\nТранспорт: ${boat?.title}\nС: ${startDate}\nПо: ${endDate}`
    )
  }

  if (!boat) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center text-3xl">
        Транспорт не найден
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-10 py-16">
      <div className="max-w-3xl mx-auto bg-[#0f172a] border border-white/10 rounded-3xl p-10">
        <h1 className="text-5xl font-bold mb-10">
          Бронирование
        </h1>

        <div className="mb-8">
          <p className="text-violet-400 mb-2">
            Транспорт
          </p>

          <h2 className="text-3xl font-bold">
            {boat.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block mb-3 text-gray-400">
              Дата начала
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl px-5 py-4"
            />
          </div>

          <div>
            <label className="block mb-3 text-gray-400">
              Дата окончания
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl px-5 py-4"
            />
          </div>
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-violet-500 hover:bg-violet-600 transition py-5 rounded-2xl text-xl font-semibold"
        >
          Подтвердить бронирование
        </button>
      </div>
    </div>
  )
}

export default CreateBooking