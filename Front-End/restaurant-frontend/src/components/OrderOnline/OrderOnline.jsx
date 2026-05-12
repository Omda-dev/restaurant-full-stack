import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import { useAuth } from "../Auth/useAuth";
import { useCart } from "../Cart/useCart";

const OrderOnline = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  const [formData, setFormData] = useState({
    address: "",
    phone: user?.phone || "",
    notes: "",
    payment_method: "cod",
  });
  const [loading, setLoading] = useState(false);

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login before placing an order.");
      return;
    }

    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      await axiosConfig.post("/orders", {
        address: formData.address,
        phone: formData.phone,
        notes: formData.notes,
        payment_method: formData.payment_method,
        items: cart.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      setFormData({
        address: "",
        phone: user?.phone || "",
        notes: "",
        payment_method: "cod",
      });
      alert("Order placed successfully.");
      navigate("/");
    } catch (error) {
      console.error("Order error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          JSON.stringify(error.response?.data?.errors) ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] px-4 py-24 text-[#F9FAFB]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#F9FAFB]">Order Online</h1>
            <p className="mt-2 text-[#9CA3AF]">
              Review your cart, add delivery details, and place your order.
            </p>
          </div>
          <button
            onClick={() => navigate("/OurMenu")}
            className="rounded-lg bg-[#8B0000] px-5 py-3 font-semibold text-[#F9FAFB] shadow-lg shadow-black/20 transition hover:brightness-90"
          >
            Continue Shopping
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr]">
          <section className="rounded-2xl border border-[#D4AF37] bg-[#111827] p-6 shadow-2xl shadow-black/20">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Your Cart</h2>
              <span className="rounded-full bg-[rgba(212,175,55,0.14)] px-4 py-2 text-sm font-semibold text-[#F9FAFB]">
                {totalItems} item{totalItems === 1 ? "" : "s"}
              </span>
            </div>

            {!cart.length ? (
              <div className="rounded-xl border border-dashed border-[#D4AF37] p-10 text-center">
                <p className="text-lg font-medium text-[#F9FAFB]">
                  Your cart is empty.
                </p>
                <p className="mt-2 text-sm text-[#9CA3AF]">
                  Add dishes from the menu to start your order.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-xl border border-[#D4AF37] bg-[rgba(17,24,39,0.8)] p-4 md:flex-row md:items-center"
                  >
                    <img
                      src={item.image_path}
                      alt={item.name}
                      className="h-24 w-full rounded-lg object-cover md:w-24"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#F9FAFB]">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#9CA3AF]">
                        ${Number(item.price).toFixed(2)} each
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-lg border border-[#D4AF37]">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-3 py-2 text-lg font-semibold text-[#F9FAFB] transition hover:bg-[rgba(212,175,55,0.14)]"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 font-semibold text-[#F9FAFB]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-3 py-2 text-lg font-semibold text-[#F9FAFB] transition hover:bg-[rgba(212,175,55,0.14)]"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-lg bg-[#8B0000] px-4 py-2 text-sm font-semibold text-[#F9FAFB] transition hover:brightness-90"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right text-lg font-bold text-[#D4AF37]">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-[#D4AF37] bg-[#111827] p-6 shadow-2xl shadow-black/20">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Checkout</h2>

            <div className="mt-6 space-y-3 rounded-xl border border-[#D4AF37] bg-[rgba(212,175,55,0.08)] p-4">
              <div className="flex items-center justify-between text-sm text-[#9CA3AF]">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold text-[#F9FAFB]">
                <span>Total</span>
                <span className="text-[#D4AF37]">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#F9FAFB]">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter delivery address"
                  className="w-full rounded-xl border border-[#D4AF37] bg-[#111827] px-4 py-3 text-[#F9FAFB] outline-none transition focus:ring-2 focus:ring-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#F9FAFB]">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-[#D4AF37] bg-[#111827] px-4 py-3 text-[#F9FAFB] outline-none transition focus:ring-2 focus:ring-[#D4AF37]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#F9FAFB]">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Add any extra notes"
                  className="w-full rounded-xl border border-[#D4AF37] bg-[#111827] px-4 py-3 text-[#F9FAFB] outline-none transition focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-[#F9FAFB]">
                  Payment Method
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { value: "cod", label: "Cash On Delivery" },
                    { value: "card", label: "Card" },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                        formData.payment_method === method.value
                          ? "border-[#D4AF37] bg-[rgba(212,175,55,0.14)] text-[#F9FAFB]"
                          : "border-[#D4AF37] bg-[#111827] text-[#9CA3AF]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.value}
                        checked={formData.payment_method === method.value}
                        onChange={handleChange}
                        className="h-4 w-4 accent-[#D4AF37]"
                      />
                      <span className="font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !cart.length}
                className="w-full rounded-xl bg-[#8B0000] px-5 py-3 font-semibold text-[#F9FAFB] shadow-lg shadow-black/20 transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderOnline;
