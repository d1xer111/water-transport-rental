import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const navigate = useNavigate();

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
                Алекс
              </h2>
              <p className="text-sm mt-2">Премиум участник</p>
            </div>
          </div>

          <nav className="space-y-3">
            <button onClick={() => navigate("/profile")} className="w-full px-5 py-4 text-left">▦ Обзор</button>
            <button className="w-full bg-blue-100 text-blue-800 px-5 py-4 rounded-xl text-left font-semibold">⛵ Мои бронирования</button>
            <button
  onClick={() => navigate("/chat")}
  className="w-full px-5 py-4 rounded-xl text-left"
>
  ▤ Чат
</button>
          </nav>
        </div>

        <button onClick={() => navigate("/login")} className="text-red-600 font-semibold text-left px-5 py-4">
          ↪ Выйти
        </button>
      </aside>

      <main className="flex-1 px-14 py-14">
        <h1 className="text-5xl font-bold mb-3">Мои бронирования</h1>
        <p className="text-gray-600 mb-10">
          Управляйте вашими предстоящими рейсами и прошлыми приключениями.
        </p>

        <div className="flex gap-8 border-b mb-8 text-sm">
          <button className="text-blue-700 border-b-2 border-blue-700 pb-3 font-semibold">
            Активные (2)
          </button>
          <button className="pb-3">В ожидании (1)</button>
          <button className="pb-3">Завершенные (12)</button>
        </div>

        <div className="space-y-7 max-w-5xl">
          <BookingCard
            image="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=900&auto=format&fit=crop"
            title="Яхта Морской Бриз"
            date="12 Окт, 2024 - 14 Окт, 2024"
            place="Майами Марина, Флорида"
            guests="4 Гостя"
            price="245 000 ₽"
            status="Подтверждено"
            active
          />

          <BookingCard
            image="https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=900&auto=format&fit=crop"
            title="Береговой Катамаран"
            date="05 Ноя, 2024 - 07 Ноя, 2024"
            place="Гавань Нассау, Багамы"
            guests="6 Гостей"
            price="310 000 ₽"
            status="В ожидании"
          />
        </div>
      </main>
    </div>
  );
}

function BookingCard(props: {
  image: string;
  title: string;
  date: string;
  place: string;
  guests: string;
  price: string;
  status: string;
  active?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex gap-6 items-center">
      <div className="relative">
        <img src={props.image} className="w-36 h-40 object-cover rounded-lg" />
        <span className="absolute bottom-2 left-2 bg-[#09233f] text-white text-xs px-2 py-1 rounded">
          ★ 4.9
        </span>
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">{props.title}</h2>
          <span
            className={`text-xs font-bold px-4 py-2 rounded-full ${
              props.active ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {props.status}
          </span>
        </div>

        <div className="text-gray-600 mt-3 space-y-2">
          <p>▣ {props.date}</p>
          <p>⊙ {props.place}</p>
          <p>♙ {props.guests}</p>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div>
            <p className="text-sm text-gray-500">Итого</p>
            <p className="text-2xl font-bold">{props.price}</p>
          </div>

          <div className="flex gap-3">
            {props.active ? (
              <>
                <button className="border px-8 py-3 rounded-lg font-semibold">Сообщение владельцу</button>
                <button className="border px-8 py-3 rounded-lg font-semibold">Посмотреть квитанцию</button>
                <button className="text-red-500 font-semibold">Отменить</button>
              </>
            ) : (
              <>
                <span className="text-xs text-gray-500 self-center">(Ожидает одобрения)</span>
                <button className="border px-8 py-3 rounded-lg font-semibold">Сообщение владельцу</button>
                <button className="text-red-500 font-semibold">Отменить запрос</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}