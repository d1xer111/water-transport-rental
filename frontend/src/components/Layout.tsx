import { Outlet, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useAuthStore } from "../store/authStore"

function Navbar() {
  const navigate = useNavigate()
  const { token, role, logout: storeLogout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const logout = () => {
    storeLogout()
    navigate("/login")
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl tracking-tight">
          АРЕНДА ВОДНОГО ТРАНСПОРТА
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/catalog" className="hover:text-blue-600 transition-colors">
            Каталог
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">
            О нас
          </Link>
          {token && (
            <Link to={role === "admin" ? "/admin" : "/profile"} className="hover:text-blue-600 transition-colors">
              Профиль
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              Выйти
            </button>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Войти
              </Link>
              <Link
                to="/register"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-3 text-sm font-medium">
          <Link to="/catalog" onClick={closeMenu} className="block py-2 text-gray-600 hover:text-blue-600">
            Каталог
          </Link>
          <Link to="/about" onClick={closeMenu} className="block py-2 text-gray-600 hover:text-blue-600">
            О нас
          </Link>
          {token && (
            <Link
              to={role === "admin" ? "/admin" : "/profile"}
              onClick={closeMenu}
              className="block py-2 text-gray-600 hover:text-blue-600"
            >
              Профиль
            </Link>
          )}
          <hr className="my-2" />
          {token ? (
            <button onClick={() => { logout(); closeMenu() }} className="block w-full text-left py-2 text-red-500 hover:text-red-600">
              Выйти
            </button>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link to="/login" onClick={closeMenu} className="flex-1 text-center py-2 border border-gray-200 rounded-lg text-gray-600 hover:text-blue-600">
                Войти
              </Link>
              <Link to="/register" onClick={closeMenu} className="flex-1 text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Регистрация
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="font-semibold text-gray-800 tracking-tight">
          АРЕНДА ВОДНОГО ТРАНСПОРТА
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-blue-600 transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Условия использования</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Поддержка</a>
        </div>
        <div>© 2024 Все права защищены</div>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
