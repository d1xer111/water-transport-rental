import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { boats } from "../data/boats";

export default function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();

  const boat = boats.find((b) => b.id === Number(id));

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("1-5 гостей");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Бронирование отправлено!");
    navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#071a3d]">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-12 py-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            АРЕНДА ВОДНОГО ТРАНСПОРТА
          </Link>

          <nav className="flex gap-10 text-xl font-medium">
            <Link to="/">Главная</Link>
            <Link to="/catalog" className="text-blue-700">
              Каталог
            </Link>
            <Link to="/about">О нас</Link>
          </nav>

          <Link to="/profile" className="text-blue-700 font-medium">
            Профиль
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-12 py-16">
        <h1 className="text-6xl font-bold mb-4">
          Оформление бронирования
        </h1>

        <p className="text-gray-600 text-xl mb-12">
          Заполните данные поездки и подтвердите аренду транспорта.
        </p>

        <div className="grid grid-cols-[1fr_380px] gap-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            <label className="block">
              <span className="block mb-2 font-medium">Ваше имя</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Капитан Немо"
                className="w-full border rounded-xl px-5 py-4 outline-none"
              />
            </label>

            <label className="block">
              <span className="block mb-2 font-medium">Дата аренды</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-xl px-5 py-4 outline-none"
              />
            </label>

            <label className="block">
              <span className="block mb-2 font-medium">Количество гостей</span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border rounded-xl px-5 py-4 outline-none bg-white"
              >
                <option>1-5 гостей</option>
                <option>6-12 гостей</option>
                <option>12+ гостей</option>
              </select>
            </label>

            <label className="block">
              <span className="block mb-2 font-medium">Комментарий</span>
              <textarea
                placeholder="Маршрут, пожелания, особые условия..."
                className="w-full border rounded-xl px-5 py-4 h-32 outline-none resize-none"
              />
            </label>

            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-lg font-semibold">
              Подтвердить бронирование
            </button>
          </form>

          <aside className="bg-white rounded-2xl shadow-xl p-7 h-fit">
            {boat && (
              <>
                <img
                  src={boat.image}
                  alt={boat.title}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />

                <p className="text-blue-700 font-semibold mb-2">
                  {boat.type}
                </p>

                <h2 className="text-3xl font-bold mb-6">
                  {boat.title}
                </h2>

                <div className="border-t pt-6 space-y-4 text-gray-600">
                  <div className="flex justify-between">
                    <span>Цена за день</span>
                    <b className="text-[#071a3d]">
                      {boat.price.toLocaleString()} ₽
                    </b>
                  </div>

                  <div className="flex justify-between">
                    <span>Сервисный сбор</span>
                    <b className="text-[#071a3d]">2 500 ₽</b>
                  </div>

                  <div className="flex justify-between text-xl border-t pt-5">
                    <span>Итого</span>
                    <b className="text-blue-700">
                      {(boat.price + 2500).toLocaleString()} ₽
                    </b>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}