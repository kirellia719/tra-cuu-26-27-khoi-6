import { Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/AdminPage/AdminLayout";
import AdminLogin from "./pages/AdminPage/AdminLogin";
import ProtectedRoute from "./pages/AdminPage/ProtectedRoute";
import SearchPageCheck from "./pages/SearchPage/SearchPageCheck";

export default function App() {
  return (
    <Routes>
      {/* Trang tra cứu công khai */}
      <Route path="/" element={<SearchPageCheck />} />

      {/* Trang Login Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Bọc toàn bộ phần Admin vào ProtectedRoute và dùng dấu /* */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}