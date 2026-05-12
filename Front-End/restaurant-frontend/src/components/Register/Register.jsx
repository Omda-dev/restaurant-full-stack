import { useState } from "react";
import axios from "../../api/axiosConfig";
import { useAuth } from "../Auth/useAuth"; 
import logo404 from "../../assets/logo404.png";
import "./Register.css";

const DEFAULT_AVATAR = logo404;

const Register = ({ isOpen, onClose, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    imageFile: null,
    imagePreview: DEFAULT_AVATAR,
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); 

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: DEFAULT_AVATAR,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("password_confirmation", formData.confirmPassword);
      if (formData.phone) data.append("phone", formData.phone);
      if (formData.address) data.append("address", formData.address);
      if (formData.imageFile) data.append("image", formData.imageFile);

      const response = await axios.post("/register", data);
      console.log("Register Response:", response.data);

      const { user, access_token, token } = response.data;

      login(user, access_token || token);

      onClose?.();
    } catch (error) {
      console.error("Register Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          JSON.stringify(error.response?.data?.errors) ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Create Account</h2>

        <div className="image-preview-wrapper">
          <label htmlFor="profileImage" className="clickable-label">
            <img
              src={formData.imagePreview}
              alt="Profile Preview"
              className="profile-preview"
            />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          {formData.imagePreview !== DEFAULT_AVATAR && (
            <button
              type="button"
              className="remove-image-btn"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="switch-auth">
          Already have an account?{" "}
          <button
            type="button"
            className="link-btn"
            onClick={(e) => {
              e.preventDefault();
              onBackToLogin?.();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
