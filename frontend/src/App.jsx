import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Abonnements from './pages/Abonnements'
import Payment from './pages/Payment'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'

const isAuthenticated = () => !!localStorage.getItem('token')
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.role === 'admin'
}

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />
}

const AdminRoute = ({ children }) => {
  return isAuthenticated() && isAdmin() ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/abonnements"
          element={
            <PrivateRoute>
              <Abonnements />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/paiement"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
