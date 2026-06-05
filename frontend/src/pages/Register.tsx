import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth } from "../services/api"
import { useAuthStore } from "../store/authStore"
import { useNotificationStore } from "../store/notificationStore"

export default function Register() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const addToast = useNotificationStore((s) => s.addToast)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      addToast("Пароли не совпадают", "error")
      return
    }
    try {
      const { data } = await auth.register(username, email, password)
      login(data.token, data.username, data.role)
      addToast("Регистрация успешна!", "success")
      navigate("/profile")
    } catch (err: any) {
      addToast(err.response?.data?.error || "Ошибка регистрации", "error")
    }
  }

  return (
    <div className="py-16 px-6 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Создать аккаунт</h1>
        <p className="text-gray-500 text-center mb-8">Присоединяйтесь к нашему сервису</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Полное имя</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Капитан Немо"
              className="w-full border border-gray-200 rounded-xl px-4 h-12 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium mb-2">Подтверждение пароля</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 h-12 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-medium transition-colors">
            Зарегистрироваться
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Войти
          </Link>
        </p>
      </form>
    </div>
  )
}
