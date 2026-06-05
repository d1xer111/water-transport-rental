import axios from "axios"

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

// Auth
export const auth = {
  login: (email: string, password: string) =>
    AUTH_API.post<{ token: string; username: string; role: string }>("/auth/login", { email, password }),

  register: (username: string, email: string, password: string) =>
    AUTH_API.post<{ token: string; username: string; role: string }>("/auth/register", { username, email, password }),

  profile: () => AUTH_API.get<{ user_id: number; role: string }>("/api/profile"),
}

// Transports
export const transportsApi = {
  getAll: () => BOOKING_API.get<Transport[]>("/transports"),
  create: (data: { name: string; description: string; price_per_hour: number; capacity: number }) =>
    BOOKING_API.post("/transports", data),
}

// Bookings
export const bookingsApi = {
  getAll: () => BOOKING_API.get<Booking[]>("/bookings"),
  create: (data: { user_id: number; transport_id: number; booking_date: string; hours: number }) =>
    BOOKING_API.post("/bookings", data),
  approve: (id: number) => BOOKING_API.patch(`/bookings/${id}/approve`),
  reject: (id: number) => BOOKING_API.patch(`/bookings/${id}/reject`),
}

export const WS_URL = "ws://localhost:8081/ws"
