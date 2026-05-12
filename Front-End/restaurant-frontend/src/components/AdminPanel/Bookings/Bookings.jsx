import { useEffect, useState } from "react";
import axiosConfig from "../../../api/axiosConfig";
import Loading from "../../Loading/Loading";
import "../../Loading/Loading.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchBookings = async () => {
    try {
            setLoading(true);

      const res = await axiosConfig.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
       setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosConfig.put(`/bookings/${id}`, { status });
      fetchBookings();
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  const statusColors = {
    pending: "bg-[#D4AF37] text-[#111827]",
    accepted: "bg-green-800 text-[#F9FAFB]",
    rejected: "bg-[#8B0000] text-[#F9FAFB]",
  };

  const statusLabels = {
    pending: "Pending",
    accepted: "Confirmed",
    rejected: "Cancelled",
  };

return (
  <div className="flex flex-col gap-6 p-4 sm:p-6">

    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
        Manage Bookings
      </h2>

      <div className="min-h-[300px]">

        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loading variant="dual" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="rounded-xl border border-dashed border-[#D4AF37] p-6 text-sm text-gray-500">
              No bookings yet.
            </div>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-[720px] w-full bg-white rounded-xl shadow-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-700">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-700">
                      Guests
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b hover:bg-gray-50 transition text-black"
                    >
                      <td className="px-6 py-4">{b.user?.name || b.name}</td>
                      <td className="px-6 py-4">{b.booking_date}</td>
                      <td className="px-6 py-4">{b.guests}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full font-semibold ${
                            statusColors[b.status] ||
                            "bg-[#111827] text-[#F9FAFB]"
                          }`}
                        >
                          {statusLabels[b.status] || b.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusChange(b.id, "accepted")}
                            className="bg-green-800 text-white px-3 py-1 rounded-md hover:brightness-90"
                          >
                            Confirm
                          </button>

                          <button
                            onClick={() => handleStatusChange(b.id, "rejected")}
                            className="bg-[#8B0000] text-white px-3 py-1 rounded-md hover:brightness-90"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-4 md:hidden">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2"
                >
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">
                      {b.user?.name || b.name}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        statusColors[b.status] ||
                        "bg-[#111827] text-[#F9FAFB]"
                      }`}
                    >
                      {statusLabels[b.status] || b.status}
                    </span>
                  </div>

                  <div className="text-gray-600 text-sm">
                    Date: {b.booking_date}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Guests: {b.guests}
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleStatusChange(b.id, "accepted")}
                      className="bg-green-800 text-white px-3 py-2 rounded-md"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => handleStatusChange(b.id, "rejected")}
                      className="bg-[#8B0000] text-white px-3 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
};

export default Bookings;
