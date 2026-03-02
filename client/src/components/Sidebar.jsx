import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ Added Link
import logo from "../assets/logo.png";
import { GoPlus } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import {
  IoTimeOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenu,
} from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi";
import { logout } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { icon: MdOutlineDashboard, label: "Overview", url: "/dashboard" },
  { icon: IoTimeOutline, label: "History", url: "/history" },
  { icon: HiOutlineDocumentText, label: "Statistics", url: "/statistics" },
  { icon: IoNotificationsOutline, label: "Notifications", url: "/notifications" },
  { icon: IoSettingsOutline, label: "Settings", url: "/settings" },
];

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const expanded = isOpen;
  const { setAccessToken } = useAuth();

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await logout(); // clears refresh cookie on backend
    } catch (error) {
      console.error("Logout API error:", error?.response?.data || error.message);
    } finally {
      setAccessToken(null); // clear memory token
      setLoading(false);
      navigate("/signin", { replace: true });
    }
  };

  return (
    <aside
      onClick={() => !isOpen && setIsOpen(true)}
      className={`fixed inset-y-0 left-0 z-50
        ${expanded ? "w-72" : "w-16"}
        bg-white border-r border-gray-200
        flex flex-col transition-all duration-300
        ${!isOpen ? "cursor-pointer" : ""}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </div>

        {expanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <IoMenu size={20} />
          </button>
        )}
      </div>

      {/* START BUTTON */}
      <div className="px-3">
        <button
          onClick={(e) => e.stopPropagation()}
          className={`w-full flex items-center
            ${expanded ? "justify-center gap-2" : "justify-center"}
            bg-primary text-white py-3 rounded-lg
            hover:bg-primary-dark transition`}
        >
          <GoPlus size={20} />
          {expanded && <span>Start Interview</span>}
        </button>
      </div>

      {/* NAVIGATION */}
      <div className="flex-1 overflow-y-auto mt-6 px-2">
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.url}   // ✅ Navigate using Link
                onClick={(e) => e.stopPropagation()}
                className={`flex items-center
                  ${expanded ? "gap-3 px-4 justify-start" : "justify-center"}
                  py-2.5 text-sm font-medium
                  rounded-lg hover:bg-gray-100 transition`}
              >
                <Icon size={20} />
                {expanded && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* PROFILE */}
      <div className="px-3 py-4 border-t border-gray-200">
        <div
          className={`flex items-center
            ${expanded ? "gap-3" : "justify-center"}`}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 rounded-full"
          />

          {expanded && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Jenny Wilson</p>
              <p className="text-xs text-gray-400 truncate">
                jen.wilson@example.com
              </p>
            </div>
          )}
        </div>

        {expanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-2
              py-2.5 text-sm font-medium
              rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <IoLogOutOutline size={20} />
            {loading ? "Logging out..." : "Log out"}
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;