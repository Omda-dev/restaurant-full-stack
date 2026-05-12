import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  CalendarDays,
  ShoppingBag,
  Menu,
} from "lucide-react";
import { useAuth } from "../Auth/useAuth";
import axiosConfig from "../../api/axiosConfig";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const { logout, user } = useAuth();

  const navLinks = [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/admin/users", label: "Users", icon: <Users size={20} /> },
    { to: "/admin/menu", label: "Menu", icon: <UtensilsCrossed size={20} /> },
    { to: "/admin/bookings", label: "Bookings", icon: <CalendarDays size={20} /> },
    { to: "/admin/orders", label: "Orders", icon: <ShoppingBag size={20} /> },
  ];

  useEffect(() => {
    setTimeout(() => setNavbarVisible(true), 100);
  }, []);

  const handleLogout = async () => {
    try {
      await axiosConfig.post("/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden py-20">

      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

<aside
  className={`
    fixed lg:static
    top-0 left-0 z-40
    h-full w-72 sm:w-64
    bg-[#111827] text-white
    flex flex-col
    py-5
    transition-transform duration-300

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

    lg:translate-x-0
  `}
>
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/20">
          <h1 className="text-lg sm:text-xl font-bold text-[#D4AF37]">
            🍴 Admin Panel
          </h1>

          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm sm:text-base
                ${
                  isActive
                    ? "bg-[#D4AF37] text-[#111827] font-semibold"
                    : "text-gray-200 hover:bg-white/10"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full bg-[#8B0000] hover:brightness-90 text-white py-2 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col w-full lg:ml-0">

        <header
          className={`h-16 flex items-center justify-between bg-[#111827] px-4 sm:px-6 shadow-md border-b border-[#D4AF37]
          transition-all duration-700
          ${
            navbarVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
          }`}
        >
          <button
            className=" text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6"/>
          </button>

          <div className="flex-1 text-center text-white text-sm sm:text-lg font-medium">
            <span className="text-[#D4AF37]">Welcome, </span>
            {user?.name || "Admin"} 👋
          </div>

          <div className="w-8 lg:hidden" />
        </header>

        <div className="flex-1 p-3 sm:p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;