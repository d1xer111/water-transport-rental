export default function About() {
  return (
    <div className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h1 className="text-5xl font-bold mb-6">Наше путешествие</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              Компания была основана с единственной целью: демократизировать доступ
              к самым премиальным морским развлечениям в мире.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Связывая взыскательных путешественников с проверенными владельцами судов,
              мы устраняем сложности традиционного чартера яхт.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1400&auto=format&fit=crop"
            className="w-full h-80 object-cover rounded-2xl shadow-sm"
          />
        </div>

        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">Бескомпромиссное качество</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-12">
            Каждое судно проходит строгие проверки для обеспечения безупречного опыта
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Проверка владельца", desc: "Комплексная проверка биографических данных и морских полномочий" },
              { title: "Технические проверки", desc: "Обязательные проверки два раза в год сертифицированными инженерами" },
              { title: "Эстетические стандарты", desc: "Строгое соблюдение протоколов премиум-класса" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold mb-6">
                  ✓
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center bg-white rounded-2xl p-12 shadow-sm mb-20">
          <img
            src="https://images.unsplash.com/photo-1517637633369-e4cc28755e01?q=80&w=1200&auto=format&fit=crop"
            className="w-full h-72 object-cover rounded-xl"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6">Безопасность превыше всего</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Мы сотрудничаем с ведущими мировыми страховщиками и морскими властями
            </p>
            <div className="space-y-6">
              {["Комплексное страхование", "Круглосуточная поддержка", "Полномочия капитана"].map((item) => (
                <div key={item}>
                  <h3 className="font-semibold mb-1">{item}</h3>
                  <p className="text-gray-400 text-sm">Подробная проверка и сопровождение каждого бронирования</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold mb-16">Прокладывая наш курс</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              ["2018", "Запуск", "Компания основана в Майами"],
              ["2020", "Глобальное расширение", "Операции расширяются на Средиземное море"],
              ["2022", "Технологическая интеграция", "Запуск платформы динамического ценообразования"],
              ["2024", "Важная веха", "Превышение 1500 проверенных роскошных судов"],
            ].map(([year, title, desc]) => (
              <div key={year} className="border-t pt-6">
                <div className="w-3 h-3 bg-blue-600 rounded-full -mt-[25px] mb-4" />
                <p className="text-blue-600 text-sm font-semibold mb-2">{year}</p>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
