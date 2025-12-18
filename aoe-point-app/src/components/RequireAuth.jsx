import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const authed = localStorage.getItem("authed") === "true";
  const location = useLocation();

  if (!authed) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
