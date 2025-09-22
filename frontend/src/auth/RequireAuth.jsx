import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) return null; // o un spinner

    const isLoggedIn = currentUser;

    if (isLoggedIn) {
        // Usuario autenticado: permite acceso
        return <Outlet />;
    }

    // Usuario NO autenticado
    if (location.pathname === "/login") {
        // Ya está en login, permite acceso
        return <Outlet />;
    }

    // Redirige a login si intenta acceder a otra ruta
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;