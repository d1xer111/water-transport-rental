import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth } from "../services/api"
import { useAuthStore } from "../store/authStore"
import { useNotificationStore } from "../store/notificationStore"

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const addToast = useNotificationStore((s) => s.addToast)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await auth.login(email, password)
      login(data.token, data.username, data.role)
      addToast("Успешный вход!", "success")
      navigate(data.role === "admin" ? "/admin" : "/profile")
    } catch {
      addToast("Ошибка входа. Проверьте email и пароль.", "error")
    }
  }

  return (
    <div className="py-16 px-6 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Войти</h1>
        <p className="text-gray-500 text-center mb-8">Продолжите бронирование водного транспорта</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Электронная почта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nemo@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 h-12 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 h-12 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-medium transition-colors">
            Войти
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  )
}
