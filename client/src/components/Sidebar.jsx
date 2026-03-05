import React, { useState, useMemo, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { useAuth } from "../context/AuthContext";

const navItems = [
  { icon: MdOutlineDashboard, label: "Overview", url: "/dashboard" },
  { icon: IoTimeOutline, label: "History", url: "/history" },
  { icon: IoSettingsOutline, label: "Settings", url: "/settings" },
];

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, logout } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);

  const expanded = isOpen;

  // ✅ Proper logout handler
  const handleLogout = useCallback(async () => {
    try {
      setLoggingOut(true);
      await logout(); // call context logout (should clear auth + tokens)
      
      navigate("/signin", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  }, [logout, navigate]);

  const getInitial = (email = "") =>
    email?.charAt(0).toUpperCase() || "U";

  const getColorFromString = (str = "") => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-indigo-500",
    ];

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const extractNameFromEmail = (email) => {
    if (!email) return "User";
    const username = email.split("@")[0];
    const parts = username.split(/[._-]/);

    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const renderedNav = useMemo(() => {
    return navItems.map((item, index) => {
      const Icon = item.icon;
      const isActive = location.pathname === item.url;

      return (
        <Link
          key={index}
          to={item.url}
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center
            ${expanded ? "gap-3 px-4 justify-start" : "justify-center"}
            py-2.5 text-sm font-medium rounded-lg transition
            ${
              isActive
                ? "bg-gray-200 text-primary"
                : "hover:bg-gray-100"
            }`}
        >
          <Icon size={20} />
          {expanded && <span>{item.label}</span>}
        </Link>
      );
    });
  }, [expanded, location.pathname]);

  if (loading) return null;

  return (
    <aside
      onClick={() => !isOpen && setIsOpen(true)}
      className={`fixed inset-y-0 left-0 z-50
        ${expanded ? "w-72" : "w-16"}
        bg-white border-r border-gray-200
        flex flex-col transition-all duration-300
        ${!isOpen ? "cursor-pointer" : ""}`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-5">
        <img src={logo} alt="logo" className="w-8 object-contain" />

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
        <Link to="/interview/start"
          onClick={(e) => e.stopPropagation()}
          className={`w-full flex items-center
            ${expanded ? "justify-center gap-2" : "justify-center"}
            bg-primary text-white py-3 rounded-lg
            hover:bg-primary-dark transition`}
        >
          <GoPlus size={20} />
          {expanded && <span>Start Interview</span>}
        </Link>
      </div>

      {/* NAVIGATION */}
      <div className="flex-1 overflow-y-auto mt-6 px-2">
        <nav className="flex flex-col gap-1">{renderedNav}</nav>
      </div>

      {/* PROFILE SECTION */}
      <div className="px-3 py-4 border-t border-gray-200">
        <div
          className={`flex items-center ${
            expanded ? "gap-3" : "justify-center"
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold ${getColorFromString(
              user?.email || "user"
            )}`}
          >
            {getInitial(user?.email)}
          </div>

          {expanded && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {user?.name || extractNameFromEmail(user?.email)}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || ""}
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
            disabled={loggingOut}
            className="mt-4 w-full flex items-center justify-center gap-2
              py-2.5 text-sm font-medium
              rounded-lg bg-gray-100 hover:bg-gray-200 transition
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoLogOutOutline size={20} />
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;