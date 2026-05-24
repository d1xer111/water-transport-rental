import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Ошибка входа");
      }

      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch {
      alert("Ошибка входа");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#111827] flex flex-col">
      <header className="bg-white border-b">
        <div className="px-12 py-7 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            АРЕНДА ВОДНОГО ТРАНСПОРТА
          </Link>

          <Link to="/register" className="text-blue-700 font-medium">
            Регистрация
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-14 px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[470px] bg-white rounded-2xl shadow-xl px-8 py-10"
        >
          <h1 className="text-4xl font-bold text-center mb-4">
            Войти в аккаунт
          </h1>

          <p className="text-gray-600 text-center text-lg mb-10">
            Продолжите бронирование водного транспорта
          </p>

          <div className="space-y-6">
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
              <span className="block mb-2 font-medium">
                Пароль
              </span>

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

            <button className="w-full h-14 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold text-lg transition">
              Войти
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}