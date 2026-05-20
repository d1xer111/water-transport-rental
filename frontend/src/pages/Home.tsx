import { Link } from "react-router-dom";

const boats = [
  {
    id: 1,
    title: "Океанская безмятежность",
    type: "Роскошная яхта",
    price: "250 000 ₽",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Дух наветренной стороны",
    type: "Парусная лодка",
    price: "85 000 ₽",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Водная искра",
    type: "Гидроцикл",
    price: "30 000 ₽",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Home() {
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
  return (
    <div className="bg-[#f5f5f5] text-black">
      {/* HERO */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2000&auto=format&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10">
          {/* NAVBAR */}
<header className="absolute top-0 left-0 w-full z-20">
  <div className="max-w-7xl mx-auto px-10 py-6 flex items-center justify-between text-white">
    <Link to="/" className="text-2xl font-bold">
      АРЕНДА ВОДНОГО ТРАНСПОРТА
    </Link>

    <nav className="flex gap-10 text-lg">
      <Link to="/catalog" className="hover:text-blue-300 transition">
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

          {/* HERO CONTENT */}
          <div className="flex flex-col items-center justify-center text-center h-[80vh] px-6">




            {/* SEARCH */}
            <div className="mt-12 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-4 w-full max-w-5xl">
              <input
                type="text"
                placeholder="Куда вы отправляетесь?"
                className="flex-1 border-r px-4 py-3 outline-none"
              />

              <select className="flex-1 border-r px-4 py-3 outline-none bg-transparent">
                <option>Тип судна</option>
                <option>Яхта</option>
                <option>Катер</option>
                <option>Гидроцикл</option>
              </select>

              <input
                type="date"
                className="flex-1 px-4 py-3 outline-none"
              />

              <button className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-3 rounded-xl transition">
                Поиск
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="px-16 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-5xl font-bold mb-3">
              Популярный флот
            </h2>

            <p className="text-gray-500">
              Тщательно отобранные суда для незабываемых
              путешествий.
            </p>
          </div>

          <Link
            to="/catalog"
            className="text-blue-700 hover:underline"
          >
            Смотреть все →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {boats.map((boat) => (
            <div
              key={boat.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition"
            >
              <img
                src={boat.image}
                alt={boat.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {boat.type}
                </span>

                <h3 className="text-3xl font-semibold mt-5">
                  {boat.title}
                </h3>

                <div className="flex items-center justify-between mt-8">
                  <div>
                    <p className="text-3xl font-bold">
                      {boat.price}
                    </p>

                    <span className="text-gray-500">
                      / день
                    </span>
                  </div>

                  <Link
                    to={`/boat/${boat.id}`}
                    className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition px-6 py-3 rounded-xl"
                  >
                    Забронировать
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section
        id="about"
        className="px-16 py-24 bg-white"
      >
        <h2 className="text-5xl font-bold text-center mb-20">
          Почему Аренда водного транспорта?
        </h2>

        <div className="grid grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto flex items-center justify-center text-4xl">
              🛡️
            </div>

            <h3 className="text-3xl font-semibold mt-8">
              Бескомпромиссная безопасность
            </h3>

            <p className="text-gray-500 mt-4 leading-8">
              Каждое судно проходит строгие проверки
              безопасности, чтобы обеспечить ваше
              спокойствие на воде.
            </p>
          </div>

          <div>
            <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto flex items-center justify-center text-4xl">
              ⚙️
            </div>

            <h3 className="text-3xl font-semibold mt-8">
              Проверенные владельцы
            </h3>

            <p className="text-gray-500 mt-4 leading-8">
              Мы сотрудничаем исключительно с
              сертифицированными капитанами и
              владельцами судов.
            </p>
          </div>

          <div>
            <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto flex items-center justify-center text-4xl">
              ⚡
            </div>

            <h3 className="text-3xl font-semibold mt-8">
              Мгновенное бронирование
            </h3>

            <p className="text-gray-500 mt-4 leading-8">
              Забронируйте судно за считанные секунды
              через удобную платформу.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#031d44] text-white py-28 px-16 text-center">
        <h2 className="text-6xl font-bold mb-8">
          Присоединяйтесь к флоту
        </h2>

        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Получите эксклюзивный доступ к частным
          предложениям, раннему бронированию и
          персональному консьерж-сервису.
        </p>

        <div className="flex items-center justify-center gap-4 mt-12">
          <input
            type="email"
            placeholder="Введите ваш email"
            className="w-[400px] px-6 py-4 rounded-xl bg-[#0b254f] border border-gray-700 outline-none"
          />

          <button className="bg-blue-700 hover:bg-blue-800 px-8 py-4 rounded-xl transition">
            Запросить доступ
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white px-16 py-10 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-2xl">
            АРЕНДА ВОДНОГО ТРАНСПОРТА
          </h3>

          <p className="text-gray-500 mt-4">
            © 2024 Аренда водного транспорта.
            Все права защищены
          </p>
        </div>

        <div className="flex gap-10 text-gray-600">
          <a href="#">Политика конфиденциальности</a>
          <a href="#">Условия использования</a>
          <a href="#">Каталог флота</a>
          <a href="#">Служба поддержки</a>
        </div>
      </footer>
    </div>
  );
}