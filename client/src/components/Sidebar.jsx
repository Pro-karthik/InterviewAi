import React, { useState } from "react";
import logo from '../assets/logo.png'
import {
  GoPlus
} from "react-icons/go";
import {
  MdOutlineDashboard
} from "react-icons/md";
import {
  IoTimeOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenu
} from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaRobot } from "react-icons/fa";

const navItems = [
  { icon: MdOutlineDashboard, label: "Overview" },
  { icon: IoTimeOutline, label: "History" },
  { icon: HiOutlineDocumentText, label: "Statistics" },
  { icon: IoNotificationsOutline, label: "Notifications" },
  { icon: IoSettingsOutline, label: "Settings" },
];

function Sidebar({ isOpen, setIsOpen }) {
   const [isHovered, setIsHovered] = useState(false);

  const expanded = isOpen 

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

        {/* Logo wrapper (ONLY this triggers preview) */}
        <div
          className="flex items-center gap-3"
        >
          <img src={logo}/>
          {/* <FaRobot size={26} className="text-primary shrink-0" /> */}
          
        </div>

        {expanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
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
              <button
                key={index}
                onClick={(e) => e.stopPropagation()}
                className={`flex items-center
                  ${expanded ? "gap-3 px-4 justify-start" : "justify-center"}
                  py-2.5 text-sm font-medium
                  rounded-lg hover:bg-gray-100 transition`}
              >
                <Icon size={20} />
                {expanded && <span>{item.label}</span>}
              </button>
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
              <p className="text-sm font-semibold truncate">
                Jenny Wilson
              </p>
              <p className="text-xs text-gray-400 truncate">
                jen.wilson@example.com
              </p>
            </div>
          )}
        </div>

        {expanded && (
          <button
            onClick={(e) => e.stopPropagation()}
            className="mt-4 w-full flex items-center justify-center gap-2
              py-2.5 text-sm font-medium
              rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <IoLogOutOutline size={20} />
            Log out
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;