import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "Алекс";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#050816] flex">
      <aside className="w-[280px] bg-white border-r min-h-screen px-6 py-8 flex flex-col justify-between">
        <div>
          <div className="flex gap-4 items-center mb-12">
            <img
              src="https://i.pravatar.cc/100"
              className="w-14 h-14 rounded-full"
            />

            <div>
              <h2 className="text-2xl font-bold leading-tight">
                {username}
              </h2>
              <p className="text-sm mt-2">Премиум участник</p>
            </div>
          </div>

          <nav className="space-y-4">
            <button className="w-full bg-blue-100 text-[#071a3d] px-5 py-4 rounded-xl text-left font-semibold">
              ▦ Обзор
            </button>

            <button
                    onClick={() => navigate("/my-bookings")}
                    className="w-full px-5 py-4 rounded-xl text-left"
>
                    ⛵ Мои бронирования
            </button>

            <button
  onClick={() => navigate("/chat")}
  className="w-full px-5 py-4 rounded-xl text-left"
>
  ▤ Чат
</button>


          </nav>
        </div>

        <button
          onClick={logout}
          className="text-red-600 font-semibold text-left px-5 py-4"
        >
          ↪ Выйти
        </button>
      </aside>

      <main className="flex-1 px-14 py-14">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-6xl font-bold leading-tight">
              Добро пожаловать на борт,
              <br />
              {username}.
            </h1>

            <p className="text-2xl text-gray-600 mt-6">
              Вот обзор вашего флота на сегодня.
            </p>
          </div>

          <Link
            to="/catalog"
            className="bg-blue-700 text-white px-9 py-5 rounded-lg font-semibold text-lg"
          >
            ⊙ Посмотреть флот
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-7 mb-16">
          <Stat title="Активные бронирования" value="2" icon="⛵" />
          <Stat title="Сохраненные" value="14" icon="♡" />
          <Stat title="Баллы лояльности" value="4,250" icon="☆" badge="+150" />
          <Stat title="Сообщения" value="3" icon="✉" dot />
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-10">
          <section>
            <h2 className="text-3xl font-bold mb-8">
              Предстоящее плавание
            </h2>

            <div className="bg-white rounded-2xl overflow-hidden shadow">
              <div
                className="h-[280px] bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1400&auto=format&fit=crop)",
                }}
              >
                <div className="absolute inset-0 bg-black/35" />

                <span className="absolute top-5 right-5 bg-green-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ● Подтверждено
                </span>

                <div className="absolute bottom-7 left-7 text-white">
                  <h3 className="text-4xl font-bold">
                    Oceanis 51.1 "Zephyr"
                  </h3>
                  <p className="text-xl mt-2">
                    ⊙ Порт Монако, Средиземное море
                  </p>
                </div>
              </div>

              <div className="p-7 flex justify-between items-center">
                <div className="flex gap-16">
                  <div>
                    <p className="text-sm font-semibold">ОТПРАВЛЕНИЕ</p>
                    <p className="text-xl mt-2">15 Окт, 09:00</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">ГОСТИ</p>
                    <p className="text-xl mt-2">6 Пассажиров</p>
                  </div>
                </div>

                <button className="border px-8 py-3 rounded-lg">
                  Смотреть детали
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-10 mb-7">
              <h2 className="text-3xl font-bold">Рекомендуем вам</h2>
              <Link to="/catalog" className="text-blue-700">
                Смотреть все
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-7">
              <MiniCard title="Lagoon 42" place="БВО, Карибы" price="От 85000₽/день" />
              <MiniCard title="Axopar 37" place="Майами, Флорида" price="От 60000₽/день" />
            </div>
          </section>

          <aside className="bg-white rounded-2xl shadow p-7 h-fit">
            <h2 className="text-3xl font-bold mb-8">
              Недавняя активность
            </h2>

            <Activity
              icon="⛴"
              title="Завершенная аренда: Sunseeker 65"
              text="Ибица, Испания · 3 дня"
              date="СЕН 12, 2023"
            />

            <Activity
              icon="▣"
              title="Платеж обработан"
              text="Залог за Oceanis 51.1"
              date="СЕН 05, 2023"
            />

            <Activity
              icon="☆"
              title="Оставлен отзыв"
              text="5 звезд для Капитана Рейнольдса"
              date="АВГ 28, 2023"
            />

            <button className="text-blue-700 font-semibold mt-8 w-full">
              Смотреть всю историю
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Stat({
  title,
  value,
  icon,
  badge,
  dot,
}: {
  title: string;
  value: string;
  icon: string;
  badge?: string;
  dot?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-7">
      <div className="flex justify-between text-lg">
        <p>{title}</p>
        <span className="text-blue-600">{icon}</span>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-4xl font-bold">{value}</span>
        {badge && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
        {dot && <span className="w-3 h-3 bg-red-600 rounded-full" />}
      </div>
    </div>
  );
}

function MiniCard({
  title,
  place,
  price,
}: {
  title: string;
  place: string;
  price: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex gap-5">
      <img
        src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=500&auto=format&fit=crop"
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p>{place}</p>
        <p className="text-blue-700 font-semibold mt-2">{price}</p>
      </div>
    </div>
  );
}

function Activity({
  icon,
  title,
  text,
  date,
}: {
  icon: string;
  title: string;
  text: string;
  date: string;
}) {
  return (
    <div className="flex gap-5 border-b py-6">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p>{text}</p>
        <span className="inline-block bg-gray-100 px-3 py-1 rounded mt-3 text-sm">
          {date}
        </span>
      </div>
    </div>
  );
}