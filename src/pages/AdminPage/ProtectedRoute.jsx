import { Navigate } from "react-router-dom";
import { storageService } from "../services/storageService";

export default function ProtectedRoute({ children }) {
  const token = storageService.getToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}