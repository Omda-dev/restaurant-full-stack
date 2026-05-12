import { useEffect, useState } from "react";
import axiosConfig from "../../../api/axiosConfig";

const statusOptions = [
  "pending",
  "accepted",
  "in_progress",
  "delivered",
  "rejected",
];

const statusColors = {
  pending: "bg-[#D4AF37] text-[#111827]",
  accepted: "bg-green-800 text-[#F9FAFB]",
  in_progress: "bg-blue-800 text-[#F9FAFB]",
  delivered: "bg-emerald-700 text-[#F9FAFB]",
  rejected: "bg-[#8B0000] text-[#F9FAFB]",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const handleSaveStatus = async (id, status) => {
    try {
      setSavingId(id);
      await axiosConfig.put(`/orders/${id}/status`, { status });
      await fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err.response?.data || err);
      alert("Failed to update order status");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-[#111827]">Manage Orders</h2>
        <p className="text-[#9CA3AF]">
          Review customer orders and update their delivery status.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[#D4AF37] bg-[#111827] p-8 text-center text-[#9CA3AF] shadow-2xl shadow-black/20">
          Loading orders...
        </div>
      ) : !orders.length ? (
        <div className="rounded-2xl border border-[#D4AF37] bg-[#111827] p-8 text-center text-[#9CA3AF] shadow-2xl shadow-black/20">
          No orders available yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-[#D4AF37] bg-[#111827] p-6 shadow-2xl shadow-black/20"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-[#F9FAFB]">
                      Order #{order.id}
                    </h3>
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        statusColors[order.status] || "bg-[#1F2937] text-[#F9FAFB]"
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="grid gap-2 text-sm text-[#9CA3AF]">
                    <p>
                      <span className="font-semibold text-[#F9FAFB]">Customer:</span>{" "}
                      {order.user?.name} ({order.user?.email})
                    </p>
                    <p>
                      <span className="font-semibold text-[#F9FAFB]">Phone:</span>{" "}
                      {order.phone}
                    </p>
                    <p>
                      <span className="font-semibold text-[#F9FAFB]">Address:</span>{" "}
                      {order.address}
                    </p>
                    <p>
                      <span className="font-semibold text-[#F9FAFB]">Payment:</span>{" "}
                      {order.payment_method?.toUpperCase()}
                    </p>
                    <p>
                      <span className="font-semibold text-[#F9FAFB]">Total:</span>{" "}
                      <span className="text-[#D4AF37]">
                        ${Number(order.total_price).toFixed(2)}
                      </span>
                    </p>
                    {order.notes && (
                      <p>
                        <span className="font-semibold text-[#F9FAFB]">Notes:</span>{" "}
                        {order.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-[#D4AF37] bg-[rgba(212,175,55,0.08)] p-4 lg:min-w-[220px]">
                  <label className="text-sm font-semibold text-[#F9FAFB]">
                    Update Status
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="rounded-xl border border-[#D4AF37] bg-[#111827] px-4 py-3 text-[#F9FAFB] outline-none transition focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleSaveStatus(order.id, order.status)}
                    disabled={savingId === order.id}
                    className="rounded-xl bg-[#8B0000] px-4 py-3 font-semibold text-[#F9FAFB] transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingId === order.id ? "Saving..." : "Save Status"}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="mb-4 text-lg font-bold text-[#D4AF37]">
                  Ordered Items
                </h4>
                <div className="grid gap-3">
                  {order.order_items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-2 rounded-xl border border-[#D4AF37] bg-[rgba(17,24,39,0.85)] p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="text-lg font-semibold text-[#F9FAFB]">
                          {item.menu_item?.name || "Menu Item"}
                        </p>
                        <p className="text-sm text-[#9CA3AF]">
                          Qty: {item.quantity} | Price: $
                          {Number(item.price).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-[#D4AF37]">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
