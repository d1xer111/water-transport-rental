import { useNavigate } from "react-router-dom";

export default function AdminBookings() {
  const navigate = useNavigate();

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
            <button
              onClick={() => navigate("/admin")}
              className="w-full px-5 py-4 text-left text-gray-300"
            >
              ⌁ Статистика
            </button>

            <button
              onClick={() => navigate("/admin/fleet")}
              className="w-full px-5 py-4 text-left text-gray-300"
            >
              🚢 Управление парком
            </button>

            <button className="w-full bg-blue-700 px-5 py-4 rounded-xl text-left font-semibold">
              ▤ Все бронирования
            </button>

          </nav>
        </div>

      </aside>

      <main className="flex-1 px-12 py-12">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-3">
              Управление
              <br />
              бронированиями
            </h1>

            <p className="text-gray-500">
              Просмотр и управление всеми бронированиями системы.
            </p>
          </div>

          <input
            placeholder="Поиск бронирований..."
            className="w-[360px] bg-white border rounded-lg px-6 py-4 outline-none"
          />
        </div>

        <div className="grid grid-cols-4 gap-7 mb-10">
          <StatusCard title="Подтверждено" value="1,248" active icon="◎" />
          <StatusCard title="В ожидании" value="86" icon="◴" />
          <StatusCard title="Завершено" value="8,932" icon="⌁" />
          <StatusCard title="Отменено" value="42" icon="×" />
        </div>

        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="text-gray-500 text-sm uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-5">ID бронирования</th>
                <th className="px-6 py-5">Пользователь</th>
                <th className="px-6 py-5">Транспорт</th>
                <th className="px-6 py-5">Даты</th>
                <th className="px-6 py-5">Сумма</th>
                <th className="px-6 py-5">Статус</th>
              </tr>
            </thead>

            <tbody>
              <BookingRow
                id="#BKG-8892"
                initials="JD"
                name="John Doe"
                email="john@example.com"
                boat="Ocean Explorer Yacht"
                date="12 ОКТ - 15 ОКТ, 2024"
                price="4 500.00 ₽"
                status="Подтверждено"
              />

              <BookingRow
                id="#BKG-8891"
                initials="SA"
                name="Sarah Adams"
                email="sarah.a@company.com"
                boat="Coastal Catamaran"
                date="18 ОКТ - 19 ОКТ, 2024"
                price="1,200.00 ₽"
                status="В ожидании"
              />

              <BookingRow
                id="#BKG-8890"
                initials="MR"
                name="Michael Ross"
                email="m.ross@firm.com"
                boat="Speedboat X-1"
                date="10 ОКТ, 2024"
                price="450.00 ₽"
                status="Отменено"
              />
            </tbody>
          </table>

          <div className="px-6 py-5 flex justify-between items-center text-gray-500 text-sm">
            <span>Показано от 1 до 10 из 2,456 записей</span>

            <div className="flex gap-2">
              <button className="border px-4 py-2 rounded">Назад</button>
              <button className="bg-blue-700 text-white px-4 py-2 rounded">1</button>
              <button className="border px-4 py-2 rounded">2</button>
              <button className="border px-4 py-2 rounded">3</button>
              <button className="border px-4 py-2 rounded">...</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusCard({
  title,
  value,
  icon,
  active,
}: {
  title: string;
  value: string;
  icon: string;
  active?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-7 border ${
        active ? "border-blue-600" : "border-transparent"
      }`}
    >
      <div className="flex justify-between text-gray-500 uppercase text-sm font-bold">
        <span>{title}</span>
        <span>{icon}</span>
      </div>

      <p className="text-4xl font-bold mt-5">{value}</p>
    </div>
  );
}

function BookingRow({
  id,
  initials,
  name,
  email,
  boat,
  date,
  price,
  status,
}: {
  id: string;
  initials: string;
  name: string;
  email: string;
  boat: string;
  date: string;
  price: string;
  status: string;
}) {
  const statusClass =
    status === "Подтверждено"
      ? "bg-blue-100 text-blue-700"
      : status === "В ожидании"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <tr className="border-t">
      <td className="px-6 py-7 font-bold">{id}</td>

      <td className="px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">
            {initials}
          </div>

          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-7 font-semibold">{boat}</td>

      <td className="px-6 py-7 text-gray-600">{date}</td>

      <td className="px-6 py-7 font-bold">{price}</td>

      <td className="px-6 py-7">
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusClass}`}>
          ● {status}
        </span>
      </td>
    </tr>
  );
}