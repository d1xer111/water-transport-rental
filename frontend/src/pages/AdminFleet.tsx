import { useNavigate } from "react-router-dom";

export default function AdminFleet() {
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

            <button className="w-full bg-blue-700 px-5 py-4 rounded-xl text-left font-semibold">
              🚢 Управление флотом
            </button>

            <button
                onClick={() => navigate("/admin/bookings")}
                className="w-full px-5 py-4 text-left text-gray-300"
                >
                ▤ Все бронирования
            </button>

          </nav>
        </div>


      </aside>

      <main className="flex-1 px-12 py-12">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-5xl font-bold mb-3">
              Управление флотом
            </h1>

            <p className="text-gray-500">
              Управляйте и отслеживайте весь активный транспорт.
            </p>
          </div>

          <button className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow">
            + Добавить новый транспорт
          </button>
        </div>

        <section className="bg-white rounded-xl shadow-sm p-5 mb-8">
          <input
            placeholder="🔍  Поиск по имени, типу или владельцу..."
            className="w-full border rounded-lg px-5 py-4 outline-none mb-4"
          />

          <div className="flex gap-4">
            <button className="border rounded-lg px-6 py-3 text-gray-600">
              Все типы ⌄
            </button>

            <button className="border rounded-lg px-6 py-3 text-gray-600">
              Все статусы ⌄
            </button>

            <button className="bg-gray-100 rounded-lg px-6 py-3 text-gray-700">
              ≡ Больше фильтров
            </button>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="text-gray-500 text-sm uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-5">Транспорт</th>
                <th className="px-6 py-5">Владелец</th>
                <th className="px-6 py-5">Доступность</th>
                <th className="px-6 py-5">Статус</th>
                <th className="px-6 py-5">Действия</th>
              </tr>
            </thead>

            <tbody>
              <FleetRow
                image="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=500&auto=format&fit=crop"
                name="Ocean Breeze V"
                type="Роскошная яхта • 85 футов"
                owner="Elena Rodriguez"
                email="elena.r@example.com"
                active
                status="Активен"
              />

              <FleetRow
                image="https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=500&auto=format&fit=crop"
                name="Twin Sails"
                type="Катамаран • 45 футов"
                owner="Marcus Chen"
                email="m.chen@marine.net"
                status="Обслуживание"
              />

              <FleetRow
                image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=500&auto=format&fit=crop"
                name="Silver Dart"
                type="Катер • 28 футов"
                owner="John Doe"
                email="j.doe@example.com"
                active
                status="Активен"
              />
            </tbody>
          </table>

          <div className="px-6 py-5 flex justify-between items-center text-gray-500 text-sm">
            <span>Показано от 1 до 3 из 42 записей</span>

            <div className="flex gap-2">
              <button className="border px-3 py-2 rounded">‹</button>
              <button className="bg-blue-700 text-white px-4 py-2 rounded">1</button>
              <button className="border px-4 py-2 rounded">2</button>
              <button className="border px-4 py-2 rounded">3</button>
              <button className="border px-3 py-2 rounded">›</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FleetRow({
  image,
  name,
  type,
  owner,
  email,
  active,
  status,
}: {
  image: string;
  name: string;
  type: string;
  owner: string;
  email: string;
  active?: boolean;
  status: string;
}) {
  return (
    <tr className="border-t">
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <img
            src={image}
            className="w-16 h-12 object-cover rounded-lg"
          />

          <div>
            <p className="font-bold">{name}</p>
            <p className="text-gray-500 text-sm">{type}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/80"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-semibold">{owner}</p>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div
          className={`w-12 h-7 rounded-full p-1 ${
            active ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full ${
              active ? "ml-auto" : ""
            }`}
          />
        </div>
      </td>

      <td className="px-6 py-5">
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            status === "Активен"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          ● {status}
        </span>
      </td>

      <td className="px-6 py-5 text-gray-400 text-2xl">
        ⋯
      </td>
    </tr>
  );
}