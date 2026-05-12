import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const profileData = JSON.parse(localStorage.getItem("profileData"));

  if (!profileData) {
    return <Navigate to="/" replace />;
  }

  if (role && profileData.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
