import { Link, useParams } from "react-router-dom";
import { boats } from "../data/boats";

export default function BoatPage() {
  const { id } = useParams();
  const boat = boats.find((b) => b.id === Number(id));

  if (!boat) {
    return <div className="p-20 text-3xl">Транспорт не найден</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#071a3d]">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-12 py-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            АРЕНДА ВОДНОГО ТРАНСПОРТА
          </Link>

          <nav className="flex gap-10 text-xl font-medium">
            <Link to="/">Главная</Link>
            <Link to="/catalog" className="text-blue-700">Каталог</Link>
            <Link to="/about">О нас</Link>
          </nav>

          <Link to="/profile" className="text-blue-700 font-medium">
            Профиль
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-12 py-16">
        <img
          src={boat.image}
          alt={boat.title}
          className="w-full h-[520px] object-cover rounded-2xl shadow mb-12"
        />

        <div className="grid grid-cols-[1fr_420px] gap-12">
          <section>
            <span className="text-blue-700 font-semibold">
              {boat.type}
            </span>

            <h1 className="text-6xl font-bold mt-4 mb-6">
              {boat.title}
            </h1>

            <p className="text-xl text-gray-600 leading-9 max-w-3xl">
              Премиальный водный транспорт для отдыха, путешествий и
              незабываемых впечатлений. Идеально подходит для прогулок,
              мероприятий и luxury-отдыха.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <Info title="Вместимость" value="12 гостей" />
              <Info title="Размер" value="50 футов" />
              <Info title="Рейтинг" value="4.9 ★" />
            </div>
          </section>

          <aside className="bg-white rounded-2xl shadow-xl p-8 h-fit">
            <h2 className="text-4xl font-bold mb-6">
              Бронирование
            </h2>

            <p className="text-5xl font-bold text-blue-700 mb-8">
              от {boat.price.toLocaleString()} ₽
            </p>

            <div className="space-y-4 mb-8">
              <input type="date" className="w-full border rounded-xl px-5 py-4" />
              <input type="date" className="w-full border rounded-xl px-5 py-4" />
              <select className="w-full border rounded-xl px-5 py-4">
                <option>1-5 гостей</option>
                <option>6-12 гостей</option>
                <option>12+ гостей</option>
              </select>
            </div>

            <Link
              to={`/booking/${boat.id}`}
              className="block text-center w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-lg font-semibold"
            >
              Забронировать сейчас
            </Link>

            <div className="mt-8 space-y-3 text-gray-600">
              <p>✓ Мгновенное подтверждение</p>
              <p>✓ Проверенные владельцы</p>
              <p>✓ Поддержка 24/7</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500 mb-2">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}