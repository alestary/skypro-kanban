import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuth }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;