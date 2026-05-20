import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <header className="border-b border-white/10 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-bold text-white"
        >
          Water Transport Rental
        </Link>

        <nav className="flex items-center gap-10 text-white font-medium">
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/booking">Бронирование</Link>

          {token && <Link to="/profile">Профиль</Link>}
        </nav>

        <div>
          {token ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-2xl text-white font-semibold"
            >
              Выйти
            </button>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="bg-violet-500 hover:bg-violet-600 transition px-6 py-3 rounded-2xl text-white font-semibold"
              >
                Войти
              </Link>

              <Link
                to="/register"
                className="border border-violet-500 px-6 py-3 rounded-2xl text-violet-400 font-semibold hover:bg-violet-500/10 transition"
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}