import "./App.css";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/DashBoard/Dashboard";
import Profile from "./pages/Profile";
import Forms from "./pages/Forms/Forms";
import Todos from "./pages/Todo/Todos";
import Login from "./pages/Forms/Login";
import Register from "./pages/Forms/Register";
import MovieList from "./pages/MovieList/MovieList";
import MapPage from "./pages/MapPage/MapPage";

function App() {
  return (
    <Routes>
      {/* ---------- AUTH LAYOUT (no sidebar/navbar) ---------- */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ---------- MAIN LAYOUT (sidebar + navbar + footer) ---------- */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms"
          element={
            <ProtectedRoute>
              <Forms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <MovieList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
