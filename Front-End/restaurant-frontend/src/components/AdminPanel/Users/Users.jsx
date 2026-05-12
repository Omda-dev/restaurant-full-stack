import { useEffect, useState } from "react";
import axiosConfig from "../../../api/axiosConfig";
import Loading from "../../Loading/Loading";
import "../../Loading/Loading.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        const updateData = {
          name: form.name,
          email: form.email,
          role: form.role,
        };
        if (form.password.trim() !== "") {
          updateData.password = form.password;
          updateData.password_confirmation = form.password;
        }
        await axiosConfig.put(`/users/${editingUser.id}`, updateData);
      } else {
        await axiosConfig.post("/users", form);
      }

      setForm({ name: "", email: "", password: "", role: "user" });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", password: "", role: "user" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosConfig.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="users-page p-4 sm:p-6 lg:p-10">

      <h2 className="mb-4 text-2xl sm:text-3xl font-semibold text-gray-800">
        {editingUser ? "Edit User" : "Manage Users"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-3 rounded-lg bg-gray-100 p-4 sm:p-6 shadow-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <input
          type="password"
          name="password"
          placeholder={editingUser ? "New Password (optional)" : "Password"}
          value={form.password}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          required={!editingUser}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            className="w-full sm:w-auto bg-gray-700 text-white p-2 rounded hover:bg-gray-800 transition-colors"
          >
            {editingUser ? "Update User" : "Add User"}
          </button>

          {editingUser && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="w-full sm:w-auto rounded bg-red-500 p-2 text-white hover:bg-red-600 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

<div className="relative w-full overflow-x-auto rounded-lg shadow-md min-h-[300px] sm:min-h-[400px]">
  
  {loading && (
    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-10">
      <Loading variant="fire" text="Loading users ..." />
    </div>
  )}

  <table className="w-full min-w-[650px] text-left border-collapse text-sm sm:text-base">
    <thead className="bg-gray-200 text-gray-700">
      <tr>
        <th className="p-2 sm:p-3 border-b whitespace-nowrap text-gray-600">Name</th>
        <th className="p-2 sm:p-3 border-b whitespace-nowrap text-gray-600">Email</th>
        <th className="p-2 sm:p-3 border-b whitespace-nowrap text-gray-600">Role</th>
        <th className="p-2 sm:p-3 border-b whitespace-nowrap text-gray-600">Actions</th>
      </tr>
    </thead>

    <tbody>
      {currentUsers.map((u) => (
        <tr key={u.id} className="hover:bg-gray-100 transition-colors">
          <td className="p-2 sm:p-3 border-b whitespace-nowrap">{u.name}</td>
          <td className="p-2 sm:p-3 border-b whitespace-nowrap">{u.email}</td>
          <td className="p-2 sm:p-3 border-b whitespace-nowrap">{u.role}</td>

          <td className="p-2 sm:p-3 border-b whitespace-nowrap">
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => {
                  setEditingUser(u);
                  setForm({
                    name: u.name,
                    email: u.email,
                    password: "",
                    role: u.role,
                  });
                }}
                className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(u.id)}
                className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default Users;