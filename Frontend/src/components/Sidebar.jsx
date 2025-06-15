import { NavLink } from "react-router-dom";
import { LogOut, LayoutDashboard, Package, ClipboardList } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", to: "/", icon: <LayoutDashboard size={18} /> },
    { label: "Products", to: "/products", icon: <Package size={18} /> },
    { label: "Orders", to: "/orders", icon: <ClipboardList size={18} /> },
  ];
  const { logout } = useAuthStore();

  return (
    <aside className="w-64 bg-white shadow-lg h-full border-r border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600">Bluegen Admin</h1>
      </div>

      <nav className="flex flex-col p-4 gap-2 text-gray-700">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all 
              ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`
            }
            end={to === "/"}
          >
            {icon}
            {label}
          </NavLink>
        ))}

        <NavLink
          to="/login"
          onClick={logout}
          className="mt-6 flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md"
        >
          <LogOut size={16} />
          Logout
        </NavLink>
      </nav>
    </aside>
  );
}
