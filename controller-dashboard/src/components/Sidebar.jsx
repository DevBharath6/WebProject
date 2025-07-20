import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaSitemap,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaChartLine,
  FaBullhorn,
  FaImages,
  FaTools,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggleSidebar}
        className="hamburger-btn"
        aria-label="Toggle sidebar"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <a href="/" className="sidebar-brand" onClick={closeSidebar}>
            <FaChartLine className="me-2" />
            Dashboard
          </a>
        </div>
        <div className="sidebar-menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaChartLine />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/navbar"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaSitemap />
            <span>Navbar Manager</span>
          </NavLink>

          <NavLink
            to="/header"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaSitemap />
            <span>Header Manager</span>
          </NavLink>

          <NavLink
            to="/announcements"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaBullhorn />
            <span>Announcements</span>
          </NavLink>

          <NavLink
            to="/carousel"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaImages />
            <span>Carousel Manager</span>
          </NavLink>

          <NavLink
            to="/footer"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaFileAlt />
            <span>Footer Manager</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <FaTools />
            <span>Settings</span>
          </NavLink>

          <a href="/logout" className="sidebar-item" onClick={closeSidebar}>
            <FaSignOutAlt />
            <span>Logout</span>
          </a>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
