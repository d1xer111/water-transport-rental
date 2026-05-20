import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111827] flex">
      <aside className="w-[250px] bg-[#020817] text-white min-h-screen px-6 py-8 flex flex-col justify-between">
        <div>
            <img
              src="https://i.pravatar.cc/100?img=13"
              className="w-12 h-12 rounded-full"
            />
          <h1 className="text-2xl font-bold leading-tight">
            Админ парка
          </h1>

          <p className="text-xs text-gray-400 mt-2 mb-10">
            Системный контроллер
          </p>

          <nav className="space-y-3">
            <button className="w-full bg-blue-700 px-5 py-4 rounded-xl text-left font-semibold">
              ✦ Статистика
            </button>

            <button
                onClick={() => navigate("/admin/fleet")}
                className="w-full px-5 py-4 text-left text-gray-300"
                >
                ⛵ Управление флотом
            </button>

            <button
                onClick={() => navigate("/admin/bookings")}
                className="w-full px-5 py-4 text-left text-gray-300"
                >
                ▤ Все бронирования
            </button>

          </nav>
        </div>

        <div>

          <button
            onClick={logout}
            className="w-full px-5 py-4 text-left text-red-400"
          >
            ↪ Выйти
          </button>
        </div>
      </aside>

      <main className="flex-1 px-10 py-10">
        <h1 className="text-3xl font-bold mb-2">
          Обзор панели управления
        </h1>

        <p className="text-gray-500 mb-8">
          Мониторинг состояния системы и операций флота.
        </p>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <Stat title="Общая выручка" value="124.5к ₽" icon="💳" text="+12.5% за этот месяц" />
          <Stat title="Новые пользователи" value="842" icon="👥" text="+5.2% за этот месяц" />
          <Stat title="Активные аренды" value="156" icon="⛵" text="70% загрузка флота" />
          <Stat title="Состояние системы" value="99.9%" icon="🛡️" text="Все сервисы работают" />
        </div>

        <div className="grid grid-cols-[1fr_280px] gap-8 mb-8">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Тренды выручки</h2>
              <button className="border px-4 py-2 rounded-lg text-sm">
                Последние 30 дней
              </button>
            </div>

            <div className="h-[230px] border rounded-xl bg-gradient-to-t from-blue-100 to-white flex items-center justify-center text-gray-400">
              / Интерактивная область графика /
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-8">
              Типы транспорта
            </h2>

            <div className="w-40 h-40 mx-auto rounded-full border-[18px] border-blue-700 border-r-gray-200 border-b-blue-400" />

            <div className="flex justify-center gap-4 mt-8 text-xs">
              <span>● Яхты</span>
              <span>● Катера</span>
              <span>● Парусники</span>
            </div>
          </section>
        </div>

        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Последние запросы на бронирование
            </h2>

            <button className="text-blue-700 font-semibold">
              Смотреть все →
            </button>
          </div>

          <table className="w-full text-left">
            <thead className="text-gray-500 text-sm">
              <tr>
                <th className="py-3">ID запроса</th>
                <th>Клиент</th>
                <th>Судно / Даты</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>

            <tbody>
              <Row
                id="#REQ-8902"
                name="Джон Доу"
                email="john.d@example.com"
                boat="Oceanic Explorer"
                date="12 окт - 15 окт, 2024"
              />

              <Row
                id="#REQ-8901"
                name="Сара Адамс"
                email="s.adams@corporate.com"
                boat="Azure Dream"
                date="10 окт, 2024"
              />
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

function Stat({
  title,
  value,
  icon,
  text,
}: {
  title: string;
  value: string;
  icon: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between">
        <p className="text-gray-500 uppercase text-sm font-semibold">
          {title}
        </p>
        <span>{icon}</span>
      </div>

      <h2 className="text-4xl font-bold mt-4">{value}</h2>

      <p className="text-green-700 text-sm mt-4">{text}</p>
    </div>
  );
}

function Row({
  id,
  name,
  email,
  boat,
  date,
}: {
  id: string;
  name: string;
  email: string;
  boat: string;
  date: string;
}) {
  return (
    <tr className="border-t">
      <td className="py-5 font-semibold">{id}</td>

      <td>
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500 text-sm">{email}</div>
      </td>

      <td>
        <div className="font-semibold">{boat}</div>
        <div className="text-gray-500 text-sm">{date}</div>
      </td>

      <td>
        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
          В ожидании
        </span>
      </td>

      <td className="space-x-2">
        <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
          Одобрить
        </button>

        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg">
          Отклонить
        </button>
      </td>
    </tr>
  );
}