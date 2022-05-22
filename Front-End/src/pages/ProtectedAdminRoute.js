import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
import { isAdminValid } from "../isAdminValid";

const ProtectedAdminRoute = ({ children }) => {
  const { isAdmin, user } = useAppContext();
  if (user) {
    return isAdmin !== isAdminValid ? <Navigate to="/" /> : children;
  } else {
    return !user || isAdmin == "null" ? <Navigate to="/landing" /> : children;
  }
};

export default ProtectedAdminRoute;
