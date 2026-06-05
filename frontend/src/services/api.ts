import axios from "axios"

const USE_MOCK = true

const AUTH_API = axios.create({ baseURL: "http://localhost:8080", timeout: 5000 })
const BOOKING_API = axios.create({ baseURL: "http://localhost:8081", timeout: 5000 })

AUTH_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

BOOKING_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export type Transport = {
  id: number
  name: string
  description: string
  price_per_hour: number
  capacity: number
  created_at: string
}

export type Booking = {
  id: number
  user_id: number
  transport_id: number
  booking_date: string
  hours: number
  status: string
  created_at: string
}

export type User = {
  id: number
  username: string
  email: string
  role: string
}

const mockTransports: Transport[] = [
  { id: 1, name: "Океанская безмятежность", description: "Роскошная яхта премиум-класса для незабываемых путешествий.", price_per_hour: 15000, capacity: 12, created_at: "2026-01-01T00:00:00Z" },
  { id: 2, name: "Дух наветренной стороны", description: "Элегантная парусная лодка для любителей морских приключений.", price_per_hour: 8500, capacity: 6, created_at: "2026-01-01T00:00:00Z" },
  { id: 3, name: "Водная искра", description: "Скоростной гидроцикл для активного отдыха и водных развлечений.", price_per_hour: 3500, capacity: 2, created_at: "2026-01-01T00:00:00Z" },
  { id: 4, name: "Капитанский бриз", description: "Комфортабельный катер для семейных прогулок и рыбалки.", price_per_hour: 7000, capacity: 8, created_at: "2026-01-01T00:00:00Z" },
  { id: 5, name: "Морской дракон", description: "Эксклюзивная гоночная яхта для опытных мореплавателей.", price_per_hour: 22000, capacity: 10, created_at: "2026-01-01T00:00:00Z" },
  { id: 6, name: "Лазурный берег", description: "Просторный катамаран для путешествий большой компанией.", price_per_hour: 12000, capacity: 16, created_at: "2026-01-01T00:00:00Z" },
]

const mockBookings: Booking[] = [
  { id: 1, user_id: 1, transport_id: 2, booking_date: "2026-06-10", hours: 3, status: "approved", created_at: "2026-06-01T00:00:00Z" },
  { id: 2, user_id: 1, transport_id: 4, booking_date: "2026-06-15", hours: 5, status: "pending", created_at: "2026-06-02T00:00:00Z" },
  { id: 3, user_id: 1, transport_id: 6, booking_date: "2026-06-20", hours: 2, status: "cancelled", created_at: "2026-06-03T00:00:00Z" },
]

function mockDelay<T>(data: T): Promise<{ data: T }> {
  return new Promise((r) => setTimeout(() => r({ data }), 300))
}

export const auth = {
  login: (email: string, _password: string) => {
    if (!USE_MOCK) return AUTH_API.post<{ token: string; username: string; role: string }>("/auth/login", { email, password: _password })
    if (email.includes("admin")) return mockDelay({ token: "mock-token-admin", username: "Админ", role: "admin" })
    return mockDelay({ token: "mock-token-user", username: "Капитан Немо", role: "user" })
  },

  register: (_username: string, _email: string, _password: string) => {
    if (!USE_MOCK) return AUTH_API.post<{ token: string; username: string; role: string }>("/auth/register", { username: _username, email: _email, password: _password })
    return mockDelay({ token: "mock-token-user", username: _username, role: "user" })
  },

  profile: () => {
    if (!USE_MOCK) return AUTH_API.get<{ user_id: number; role: string }>("/api/profile")
    return mockDelay({ user_id: 1, role: localStorage.getItem("role") || "user" })
  },
}

export const transportsApi = {
  getAll: () => {
    if (!USE_MOCK) return BOOKING_API.get<Transport[]>("/transports")
    return mockDelay(mockTransports)
  },
  create: (data: { name: string; description: string; price_per_hour: number; capacity: number }) => {
    if (!USE_MOCK) return BOOKING_API.post("/transports", data)
    return mockDelay({ message: "transport created" })
  },
}

export const bookingsApi = {
  getAll: () => {
    if (!USE_MOCK) return BOOKING_API.get<Booking[]>("/bookings")
    return mockDelay(mockBookings)
  },
  create: (data: { user_id: number; transport_id: number; booking_date: string; hours: number }) => {
    if (!USE_MOCK) return BOOKING_API.post("/bookings", data)
    return mockDelay({ message: "booking created" })
  },
  approve: (id: number) => {
    if (!USE_MOCK) return BOOKING_API.patch(`/bookings/${id}/approve`)
    return mockDelay({ message: "booking approved" })
  },
  reject: (id: number) => {
    if (!USE_MOCK) return BOOKING_API.patch(`/bookings/${id}/reject`)
    return mockDelay({ message: "booking rejected" })
  },
}

export const WS_URL = USE_MOCK ? "" : "ws://localhost:8081/ws"
