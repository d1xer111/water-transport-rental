import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import ToastContainer from "./components/Toast"

import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import About from "./pages/About"
import BoatPage from "./pages/BoatPage"
import Booking from "./pages/Booking"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import MyBookings from "./pages/MyBookings"
import Chat from "./pages/Chat"
import AdminDashboard from "./pages/AdminDashboard"
import AdminFleet from "./pages/AdminFleet"
import AdminBookings from "./pages/AdminBookings"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/boat/:id" element={<BoatPage />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/chat" element={<Chat />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/fleet" element={<AdminFleet />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
