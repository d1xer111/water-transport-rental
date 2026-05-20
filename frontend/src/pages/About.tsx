import { Link } from "react-router-dom";

export default function About() {
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111827]">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-12 py-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Аренда водного транспорта
          </Link>

          <nav className="flex gap-10 text-2xl font-medium">
            <Link to="/catalog">Каталог</Link>
            <Link to="/about" className="text-blue-700 border-b-2 border-blue-700 pb-2">
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

      <section className="max-w-7xl mx-auto px-12 py-16 grid grid-cols-2 gap-20 items-start">
        <div>
          <h1 className="text-4xl font-semibold mb-8">Наше путешествие</h1>

          <p className="text-gray-600 leading-7 mb-6">
            Компания была основана с единственной целью: демократизировать доступ
            к самым премиальным морским развлечениям в мире. Мы верим, что
            горизонт принадлежит всем.
          </p>

          <p className="text-gray-600 leading-7">
            Связывая взыскательных путешественников с тщательно проверенными
            владельцами судов, мы устраняем трения традиционного чартера яхт.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1400&auto=format&fit=crop"
          className="w-full h-[380px] object-cover rounded-xl shadow"
        />
      </section>

      <section className="max-w-7xl mx-auto px-12 py-20 text-center">
        <h2 className="text-4xl font-semibold mb-6">
          Бескомпромиссное качество флота
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Каждое судно проходит строгие физические проверки и непрерывный
          мониторинг для обеспечения безупречного опыта.
        </p>

        <div className="grid grid-cols-3 gap-8 text-left">
          {[
            ["◎", "Проверка владельца", "Комплексная проверка биографических данных и морских полномочий."],
            ["♙", "Технические проверки", "Обязательные физические проверки два раза в год сертифицированными инженерами."],
            ["▥", "Эстетические стандарты", "Строгое соблюдение протоколов премиум-класса."],
          ].map((item) => (
            <div className="bg-white rounded-xl p-10 shadow-sm" key={item[1]}>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mb-8">
                {item[0]}
              </div>

              <h3 className="text-2xl font-semibold mb-4">{item[1]}</h3>

              <p className="text-gray-600 leading-7">{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#eeeeee] py-24">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-20 items-center">
          <img
            src="https://images.unsplash.com/photo-1517637633369-e4cc28755e01?q=80&w=1200&auto=format&fit=crop"
            className="w-full h-[420px] object-cover rounded-xl"
          />

          <div>
            <h2 className="text-4xl font-semibold mb-6">
              Безопасность превыше всего
            </h2>

            <p className="text-gray-600 leading-7 mb-8">
              Мы сотрудничаем с ведущими мировыми страховщиками и морскими
              властями, чтобы гарантировать душевное спокойствие.
            </p>

            <div className="space-y-7">
              <Feature title="Комплексное страхование" />
              <Feature title="Круглосуточная поддержка консьержа" />
              <Feature title="Полномочия капитана" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-12 py-24">
        <h2 className="text-4xl font-semibold text-center mb-20">
          Прокладывая наш курс
        </h2>

        <div className="grid grid-cols-4 gap-10">
          {[
            ["2018", "Запуск", "Компания основана в Майами."],
            ["2020", "Глобальное расширение", "Операции расширяются на Средиземное море."],
            ["2022", "Технологическая интеграция", "Запуск платформы динамического ценообразования."],
            ["2024", "Важная веха", "Превышение 1500 проверенных роскошных судов."],
          ].map((item) => (
            <div key={item[0]} className="border-t pt-6">
              <div className="w-3 h-3 bg-blue-700 rounded-full -mt-[31px] mb-6" />
              <p className="text-blue-700 text-sm mb-4">{item[0]}</p>
              <h3 className="font-semibold mb-3">{item[1]}</h3>
              <p className="text-gray-600 leading-7">{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white px-12 py-10">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-5">Аренда водного транспорта</h3>
            <p className="text-gray-500">© 2024 Все права защищены.</p>
          </div>

          <div className="grid grid-cols-4 gap-10 text-gray-600">
            <a>Политика конфиденциальности</a>
            <a>Условия предоставления услуг</a>
            <a>Каталог флота</a>
            <a>Служба поддержки</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ title }: { title: string }) {
  return (
    <div>
      <h3 className="font-semibold mb-2 text-lg">☸ {title}</h3>
      <p className="text-gray-600 leading-7">
        Подробная проверка и сопровождение каждого бронирования.
      </p>
    </div>
  );
}