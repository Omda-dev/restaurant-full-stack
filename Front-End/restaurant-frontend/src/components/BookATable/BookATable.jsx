import { useState } from "react";
import axiosConfig from "../../api/axiosConfig";
import { useAuth } from "../Auth/useAuth";
import "./BookATable.css";

const BookATable = ({ show, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    booking_date: "",
    booking_time: "",
    guests: "1",
  });
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login before booking a table.");
      return;
    }

    try {
      setLoading(true);

      await axiosConfig.post("/bookings", {
        booking_date: formData.booking_date,
        booking_time: formData.booking_time,
        guests: Number(formData.guests),
      });

      alert("Booking confirmed successfully.");
      setFormData({
        booking_date: "",
        booking_time: "",
        guests: "1",
      });
      onClose();
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          JSON.stringify(error.response?.data?.errors) ||
          "Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <h2>Book A Table</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <label>
            Date
            <input
              type="date"
              name="booking_date"
              value={formData.booking_date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Time
            <select
              name="booking_time"
              value={formData.booking_time}
              onChange={handleChange}
              required
            >
              <option value="">Select time</option>
              <option value="18:00:00">06:00 PM</option>
              <option value="18:30:00">06:30 PM</option>
              <option value="19:00:00">07:00 PM</option>
              <option value="19:30:00">07:30 PM</option>
              <option value="20:00:00">08:00 PM</option>
            </select>
          </label>

          <label>
            Total Person
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="5">5 Persons</option>
              <option value="6">6+ Persons</option>
            </select>
          </label>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Booking..." : "Book A Table"}
          </button>
        </form>
        <button className="btn-close" onClick={onClose} aria-label="Close modal">
          x
        </button>
      </div>
    </>
  );
};

export default BookATable;
