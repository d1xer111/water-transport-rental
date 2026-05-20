import { Link, useNavigate } from "react-router-dom"

export default function Header() {
  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")

    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <h1 className="text-2xl font-bold tracking-wide">
          Water Transport Rental
        </h1>

        <nav className="hidden gap-8 text-sm font-medium md:flex">
          <Link to="/" className="transition hover:text-purple-400">
            Главная
          </Link>

          <Link to="/catalog" className="transition hover:text-purple-400">
            Каталог
          </Link>

          <Link to="/booking" className="transition hover:text-purple-400">
            Бронирование
          </Link>

          <Link to="/profile" className="transition hover:text-purple-400">
            Профиль
          </Link>
        </nav>

        {token ? (
          <button
            onClick={logout}
            className="rounded-2xl bg-red-500 px-5 py-2 font-semibold transition hover:bg-red-600"
          >
            Выйти
          </button>
        ) : (
          <Link
            to="/login"
            className="rounded-2xl bg-gradient-to-r from-purple-500 to-violet-400 px-5 py-2 font-semibold shadow-lg shadow-purple-500/20 transition hover:scale-105"
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  )
}