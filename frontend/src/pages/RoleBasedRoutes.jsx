import { useAuth } from "@/context/AuthContext";
import { Navigate, Routes, Route } from "react-router-dom";
import AdminDashboard from "@/components/admin/AdminDashboard";
import HotelDashboard from "@/components/hotel/HotelDashboard";
import UserDashboard from "@/components/user/UserDashboard";
import RobinDashboard from "@/components/robin/RobinDashboard";
import WorkerDashboard from "@/components/worker/WorkerDashboard";

export default function RoleBasedRoutes() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  switch (user.role) {
    case "admin": return <AdminDashboard />;
    case "hotel": return <HotelDashboard />;
    case "user": return <UserDashboard />;
    case "robin": return <RobinDashboard />;
    case "worker": return <WorkerDashboard />;
    default: return <Navigate to="/" />;
  }
}
