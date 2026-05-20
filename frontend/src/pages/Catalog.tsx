import { Link } from "react-router-dom";

const boats = [
  {
    id: 1,
    title: "Элитная яхта 500",
    type: "Яхта",
    status: "Доступно",
    rating: "4.9",
    reviews: "120 отзывов",
    guests: "12 гостей",
    size: "50 футов",
    price: "45 000 ₽",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Скоростной катер Viper",
    type: "Катер",
    status: "Доступно",
    rating: "4.7",
    reviews: "85 отзывов",
    guests: "6 гостей",
    size: "28 футов",
    price: "25 000 ₽",
    image:
      "https://images.unsplash.com/photo-1562281302-809108fd533c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Катамаран Oceanis",
    type: "Катамаран",
    status: "Ожидается",
    rating: "4.9",
    reviews: "210 отзывов",
    guests: "14 гостей",
    size: "45 футов",
    price: "85 000 ₽",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Catalog() {
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#071a3d]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-12 py-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            АРЕНДА ВОДНОГО ТРАНСПОРТА
          </Link>

          <nav className="flex items-center gap-10 text-2xl font-semibold">
            <Link to="/catalog" className="text-blue-700 border-b-2 border-blue-700 pb-2">
              Каталог
            </Link>
            <Link to="/about" className="hover:text-blue-300 transition">
        О нас
      </Link>
          </nav>

          <div className="flex items-center gap-4">
  {token ? (
    <Link
      to={role === "admin" ? "/admin" : "/profile"}
      className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg transition"
    >
      Профиль
    </Link>
  ) : (
    <>
      <Link
        to="/login"
        className="text-sm hover:text-blue-600 transition"
      >
        Войти
      </Link>

      <Link
        to="/register"
        className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg transition"
      >
        Регистрация
      </Link>
    </>
  )}
</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-12 py-28 grid grid-cols-[280px_1fr] gap-8">
        <aside className="bg-white rounded-2xl shadow-xl p-6 h-fit">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Фильтры</h2>
            <span className="text-gray-500 text-xl">☷</span>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm mb-3">ЛОКАЦИЯ</p>
              <div className="border rounded-lg px-4 py-3 text-gray-700">
                📍 Майами, Флорида
              </div>
            </div>

            <div>
              <p className="text-sm mb-3">ТИП СУДНА</p>
              <div className="space-y-3 text-lg">
                <label className="block"><input type="checkbox" defaultChecked /> Яхта</label>
                <label className="block"><input type="checkbox" /> Лодка</label>
                <label className="block"><input type="checkbox" /> Катамаран</label>
                <label className="block"><input type="checkbox" /> Гидроцикл</label>
              </div>
            </div>

            <div>
              <p className="text-sm mb-3">ЦЕНА ЗА ДЕНЬ</p>
              <input type="range" className="w-full" />
              <div className="flex justify-between text-sm text-gray-500 mt-3">
                <span>10 000 ₽</span>
                <span>500 000+ ₽</span>
              </div>
            </div>

            <div>
              <p className="text-sm mb-3">ВМЕСТИМОСТЬ</p>
              <div className="grid grid-cols-3 gap-2">
                <button className="border border-blue-600 text-blue-700 py-2 rounded-lg">1-5</button>
                <button className="border py-2 rounded-lg">6-12</button>
                <button className="border py-2 rounded-lg">12+</button>
              </div>
            </div>

            <button className="w-full bg-blue-700 text-white py-4 rounded-lg font-semibold">
              Применить фильтры
            </button>
          </div>
        </aside>

        <section>
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-6xl font-bold mb-3">Доступный флот</h1>
              <p className="text-xl text-gray-600">
                Показано 24 премиальных судна в Майами, Флорида
              </p>
            </div>

            <button className="border border-gray-300 bg-white rounded-full px-6 py-3 text-gray-600">
              Сортировка: <b className="text-gray-900">Рекомендуемые</b>⌄
            </button>
          </div>

          <div className="grid grid-cols-3 gap-7">
            {boats.map((boat) => (
              <div key={boat.id} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="relative">
                  <img src={boat.image} alt={boat.title} className="w-full h-64 object-cover" />
                  <span
                    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold ${
                      boat.status === "Доступно"
                        ? "bg-green-500/80 text-green-100"
                        : "bg-orange-500/80 text-orange-100"
                    }`}
                  >
                    ⊙ {boat.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex justify-between gap-4">
                    <h2 className="text-2xl font-medium min-h-[64px]">{boat.title}</h2>
                    <span className="text-3xl text-gray-500">♡</span>
                  </div>

                  <p className="text-sm mt-2">
                    ⭐ <span className="text-orange-500">{boat.rating}</span>{" "}
                    <b>({boat.reviews})</b>
                  </p>

                  <div className="flex gap-5 text-sm text-gray-500 mt-4">
                    <span>♙ {boat.guests}</span>
                    <span>▥ {boat.size}</span>
                  </div>

                  <div className="border-t mt-10 pt-6 flex items-center justify-between">
                    <div>
                      <p className="text-2xl">{boat.price}/</p>
                      <p className="text-gray-500">день</p>
                    </div>

                    {boat.status === "Доступно" ? (
                      <Link
                        to={`/boat/${boat.id}`}
                        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                      >
                        Забронировать
                      </Link>
                    ) : (
                      <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg">
                        В лист ожидания
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-20">
            <button className="border-2 border-[#071a3d] px-10 py-4 rounded-full">
              Загрузить еще⌄
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t px-12 py-12">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-6">АРЕНДА ВОДНОГО ТРАНСПОРТА</h3>
            <p className="text-gray-600">
              © 2024 Аренда водного транспорта. Все права защищены.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-gray-700">
            <a>Политика конфиденциальности</a>
            <a>Условия использования</a>
            <a>Каталог флота</a>
            <a>Служба поддержки</a>
          </div>
        </div>
      </footer>
    </div>
  );
}