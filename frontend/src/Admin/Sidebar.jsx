import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Admin/Dashboard";
import AdminRooms from "../Admin/Rooms";
import AdminUsers from "../Admin/Users";
import ViewBookings from "../Admin/ViewBookings";
import ContactUs from "../Admin/ContactUsAdmin";
import Tickets from "../Admin/Tickets";
import Hostels from "../Admin/Hostels";

// --- ICONS (Recreated for a complete, runnable component with explicit sizing) ---
const DashboardIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);
const GuestsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8v6M23 11h-6" />
  </svg>
);
const PaymentsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const RoomsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    <path d="M9 10a1 1 0 112 0 1 1 0 01-2 0zM15 10a1 1 0 112 0 1 1 0 01-2 0z" />
  </svg>
);
const StaffIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const UsersIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ViewBookingsIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v2H6.5A2.5 2.5 0 0 1 4 16.5v-11A2.5 2.5 0 0 1 6.5 3H20v2H6.5A2.5 2.5 0 0 1 4 5.5v11zM18 7H10v10h8V7z" />
  </svg>
);
const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const BellIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.73 21a2 2 0 01-3.46 0"
    />
  </svg>
);
const SunIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);
const UserCircleIcon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props} // ✅ This line makes onClick, title, etc. work
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// --- PLACEHOLDER PAGE COMPONENTS ---
const PlaceholderComponent = ({ title }) => (
  <div className="p-8">
    <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
    <p className="mt-2 text-gray-600">
      This is a placeholder for the {title} page content.
    </p>
  </div>
);

// const Dashboard = () => <PlaceholderComponent title="Dashboard" />;
// const Guests = () => <PlaceholderComponent title="Guests" />;
// const Payments = () => <PlaceholderComponent title="Payments" />;
// const Rooms = () => <PlaceholderComponent title="Rooms" />;
// const Staff = () => <PlaceholderComponent title="Staff" />;
// const Users = () => <PlaceholderComponent title="Users" />;
// const ViewBookings = () => <PlaceholderComponent title="View Bookings" />;

// --- MAIN ADMIN PAGE SHELL ---
const AdminPage = () => {
  const adminName = sessionStorage.getItem("adminName") || "Admin";

  const [activePage, setActivePage] = useState("dashboard");

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "rooms":
        return <AdminRooms />;
      case "users":
        return <AdminUsers />;
      case "view-bookings":
        return <ViewBookings />;
      case "contactus":
        return <ContactUs />;
      case "tickets":
        return <Tickets />;
      case "hostels":
        return <Hostels />;
      default:
        return <Dashboard />;
    }
  };

  const NavLink = ({ page, label, icon, activePage, setActivePage }) => (
    <li>
      <button
        onClick={() => setActivePage(page)}
        className={`w-full flex items-center p-3 rounded-lg font-semibold transition-all duration-200 ${
          activePage === page
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {icon} {label}
      </button>
    </li>
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    // 🧹 Clear stored admin token
    // sessionStorage.removeItem("adminToken"); // ✅ Recommended (auto-clears on browser close)
    localStorage.removeItem("adminToken"); // if you’re still using localStorage

    // 🚫 Prevent navigating back to protected pages after logout
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };

    // 🔄 Redirect to admin login
    navigate("/admin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-white shadow-lg flex flex-col flex-shrink-0">
        <div className="p-6 text-center border-b">
          <h1 className="text-3xl font-bold text-gray-800">
            HOSTEL<span className="text-blue-600">LITE</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-2">
            <NavLink
              page="dashboard"
              label="DASHBOARD"
              icon={<DashboardIcon className="mr-3" />}
              activePage={activePage}
              setActivePage={setActivePage}
            />
            <NavLink
              page="rooms"
              label="ROOMS"
              icon={<RoomsIcon className="mr-3" />}
              activePage={activePage}
              setActivePage={setActivePage}
            />
            <NavLink
              page="users"
              label="USERS"
              icon={<UsersIcon className="mr-3" />}
              activePage={activePage}
              setActivePage={setActivePage}
            />
            <NavLink
              page="view-bookings"
              label="APPLICATIONS"
              icon={<ViewBookingsIcon className="mr-3" />}
              activePage={activePage}
              setActivePage={setActivePage}
            />
            <NavLink
              page="contactus"
              label="FEEDBACK"
              icon={<BellIcon className="mr-3" />}
              activePage={activePage}
              setActivePage={setActivePage}
            />
            <NavLink
              page="tickets"
              label="TICKETS"
              icon={<StaffIcon className="mr-3" />}
              activePage={activePage}
              setActivePage={setActivePage}
            />
            <NavLink
              page="hostels"
              label="HOSTELS"
              icon={<StaffIcon className="mr-3" />}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="relative bg-white shadow-sm p-4 flex justify-end items-end z-10 flex-shrink-0">
          {/* <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}
          <div className="flex items-center space-x-5">
            {/* <div className="relative">
              <BellIcon className="text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </div> */}
            {/* <SunIcon className="text-gray-600 cursor-pointer" /> */}
            <UserCircleIcon
              className="text-gray-600 cursor-pointer hover:text-blue-600 transition z-[100] relative pointer-events-auto"
              title="Admin Menu"
              onClick={() => {
                setIsPopupOpen((prev) => !prev);
              }}
            />
          </div>
          {/* Popup */}
          <AnimatePresence>
            {isPopupOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10000"
              >
                <div className="p-4 text-gray-800">
                  <p className="font-semibold text-center text-blue-600">
                    {adminName}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    {sessionStorage.getItem("adminEmail")}
                  </p>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition text-sm"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return <AdminPage />;
}
