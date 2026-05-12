import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContextObject";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("profileData");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("profileData", JSON.stringify(userData));
    if (token) localStorage.setItem("token", token);
    setUser(userData);

    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const updateUser = (userData) => {
    localStorage.setItem("profileData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("profileData");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
