import { useNavigate } from "react-router-dom";

export default function Chat() {
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
            <button onClick={() => navigate("/profile")} className="w-full px-5 py-4 text-left">
              ▦ Обзор
            </button>
            <button onClick={() => navigate("/my-bookings")} className="w-full px-5 py-4 text-left">
              ⛵ Мои бронирования
            </button>
            <button className="w-full bg-blue-100 text-blue-800 px-5 py-4 rounded-xl text-left font-semibold">
              ▤ Чат
            </button>
          </nav>
        </div>

        <button onClick={() => navigate("/login")} className="text-red-600 font-semibold text-left px-5 py-4">
          ↪ Выйти
        </button>
      </aside>

      <main className="flex-1 p-10 grid grid-cols-[260px_1fr] gap-7">
        <section className="bg-white rounded-xl shadow-sm p-5">
          <h1 className="text-xl font-bold mb-4">Сообщения</h1>

          <input
            placeholder="🔍 Поиск диалогов..."
            className="w-full bg-gray-100 rounded-lg px-4 py-3 mb-5 outline-none"
          />

          <Dialog active name="Капитан Элиас Вэнс" text="Отлично, с нетерпением..." time="10:42" />
          <Dialog name="Океанские черепахи" text="Спасибо за ваш запрос..." time="Вчера" />
          <Dialog name="Поддержка платформы" text="Ваш счет был успешно..." time="Окт" />
        </section>

        <section className="bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">
          <header className="px-7 py-5 flex items-center justify-between border-b">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="w-12 h-12 rounded-full"
              />

              <div>
                <h2 className="text-2xl font-bold">Капитан Элиас Вэнс</h2>
                <p className="text-gray-500">⛵ Serenity · 45-футовый катамаран</p>
              </div>
            </div>

            <div className="text-2xl text-gray-500">☎ ⋮</div>
          </header>

          <div className="bg-blue-100 px-7 py-4 flex justify-between text-sm text-blue-900">
            <b>◎ Бронирование подтверждено: 15 ноября 2024 г.</b>
            <span className="font-semibold">Посмотреть детали</span>
          </div>

          <div className="flex-1 bg-[#f6f7f9] px-10 py-8 space-y-8 overflow-y-auto">
            <MessageLeft
              name="Элиас Вэнс"
              time="10:30"
              text="Здравствуйте! Я получил ваш запрос на бронирование на 15 ноября. Мы будем рады принять вас и вашу группу."
            />

            <MessageRight
              time="10:35"
              text="Здравствуйте, капитан Элиас. Мы очень взволнованы! У нас нет строгого маршрута. В основном мы хотим поплавать с маской и чистой воде."
            />

            <MessageLeft
              name="Элиас Вэнс"
              time="10:42"
              text="Отлично, с нетерпением жду возможности поприветствовать вас на борту Serenity."
            />
          </div>

          <footer className="p-5 bg-white border-t">
            <div className="flex items-center gap-4 border rounded-xl px-4 py-3">
              <button className="text-xl">⌘</button>

              <input
                placeholder="Введите ваше сообщение..."
                className="flex-1 outline-none"
              />

              <button className="bg-blue-700 text-white w-12 h-12 rounded-xl text-xl">
                ▶
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Нажмите Enter для отправки, Shift+Enter для новой строки
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}

function Dialog({
  name,
  text,
  time,
  active,
}: {
  name: string;
  text: string;
  time: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex gap-3 p-3 rounded-lg mb-2 ${
        active ? "bg-blue-50 border-l-4 border-blue-700" : ""
      }`}
    >
      <img src="https://i.pravatar.cc/80" className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="flex justify-between text-sm">
          <b>{name}</b>
          <span className="text-blue-700">{time}</span>
        </div>
        <p className="text-gray-500 text-sm truncate">{text}</p>
      </div>
    </div>
  );
}

function MessageLeft({
  name,
  time,
  text,
}: {
  name: string;
  time: string;
  text: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-2">
        {name} · {time}
      </p>

      <div className="bg-white rounded-xl p-5 max-w-[430px] shadow-sm">
        {text}
      </div>
    </div>
  );
}

function MessageRight({
  time,
  text,
}: {
  time: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-end">
      <p className="text-xs text-gray-500 mb-2">Вы · {time}</p>

      <div className="bg-blue-700 text-white rounded-xl p-5 max-w-[430px] shadow-sm">
        {text}
      </div>
    </div>
  );
}