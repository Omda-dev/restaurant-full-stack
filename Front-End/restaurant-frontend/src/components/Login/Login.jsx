import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import { useAuth } from "../Auth/useAuth"; 
import "./Login.css";

const Login = ({ show, onClose, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/login", { email, password });
      const { user, access_token } = response.data;

      login(user, access_token); 

      onClose();

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button onClick={onRegisterClick} className="register-link">
          Register
        </button>
        <button onClick={onClose} className="close-modal">
          Close
        </button>
      </div>
    </div>
  );
};

export default Login;
