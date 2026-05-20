import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка регистрации");
      }

      navigate("/login");
    } catch {
      alert("Ошибка регистрации");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#111827] flex flex-col">
      <header className="bg-white border-b">
        <div className="px-12 py-7 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            АРЕНДА ВОДНОГО ТРАНСПОРТА
          </Link>

          <Link to="/login" className="text-blue-700 font-medium">
            Войти
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-14 px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[470px] bg-white rounded-2xl shadow-xl px-8 py-10"
        >
          <h1 className="text-4xl font-bold text-center mb-4">
            Создать аккаунт
          </h1>

          <p className="text-gray-600 text-center text-lg mb-10">
            Присоединяйтесь к нашему сервису
          </p>

          <div className="space-y-6">
            <label className="block">
              <span className="block mb-2 font-medium">Полное имя</span>
              <div className="flex items-center border rounded-xl px-4 h-14">
                <span className="text-gray-500 mr-3">♙</span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Капитан Немо"
                  className="w-full outline-none text-lg"
                />
              </div>
            </label>

            <label className="block">
              <span className="block mb-2 font-medium">
                Электронная почта
              </span>
              <div className="flex items-center border rounded-xl px-4 h-14">
                <span className="text-gray-500 mr-3">✉</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nemo@example.com"
                  className="w-full outline-none text-lg"
                />
              </div>
            </label>

            <label className="block">
              <span className="block mb-2 font-medium">Пароль</span>
              <div className="flex items-center border rounded-xl px-4 h-14">
                <span className="text-gray-500 mr-3">▣</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full outline-none text-lg"
                />
              </div>
            </label>

            <label className="block">
              <span className="block mb-2 font-medium">
                Подтверждение пароля
              </span>
              <div className="flex items-center border rounded-xl px-4 h-14">
                <span className="text-gray-500 mr-3">▣</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full outline-none text-lg"
                />
              </div>
            </label>

            <button className="w-full h-14 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold text-lg transition">
              Зарегистрироваться
            </button>
          </div>

          <div className="flex items-center gap-4 my-8 text-gray-500 text-sm">
            <div className="h-px bg-gray-200 flex-1" />
            или продолжить с
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="border rounded-xl py-3 font-semibold">
              🇬 Google
            </button>

            <button type="button" className="border rounded-xl py-3 font-semibold">
              🍎 Apple
            </button>
          </div>

          <p className="text-center mt-9 text-lg">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-blue-700 font-semibold">
              Войти
            </Link>
          </p>
        </form>
      </main>

      <footer className="bg-white border-t px-12 py-10 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-5">
            АРЕНДА ВОДНОГО ТРАНСПОРТА
          </h2>

          <p className="text-gray-600">
            © 2024 Аренда водного транспорта. Все права защищены.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-gray-700 text-lg">
          <a>Политика конфиденциальности</a>
          <a>Условия использования</a>
          <a>Каталог транспорта</a>
          <a>Служба поддержки</a>
        </div>
      </footer>
    </div>
  );
}