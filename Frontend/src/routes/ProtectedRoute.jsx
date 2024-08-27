import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("admin_token");

  if (!token) {
    return <Navigate to="/adminLogin" />;
  }

  return children;
};

export default ProtectedRoute;
