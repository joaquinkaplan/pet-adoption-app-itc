import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  return !user ? <Navigate to="/landing" /> : children;
};

export default ProtectedRoute;
