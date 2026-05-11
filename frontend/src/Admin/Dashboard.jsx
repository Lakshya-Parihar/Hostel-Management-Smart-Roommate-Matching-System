import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const PlusIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4v16m8-8H4"
    />
  </svg>
);

// --- Inline SVG icons (same as before) ---
const UsersIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const BedIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 4v16" />
    <path d="M2 10h20" />
    <path d="M6 8v12" />
    <path d="M18 8v12" />
    <path d="M4 12h16" />
    <path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4Z" />
  </svg>
);
const FileTextIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const TagIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

// --- Original Icons (Still used by modals/actions) ---
const BookingsIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const GuestsIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
const PaymentsIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
const XIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Modal Components (same as before) ---
const Modal = ({ children, closeModal, title }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { y: "50px", opacity: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={closeModal}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <XIcon />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
};

const NewBookingModal = ({ closeModal }) => (
  <Modal closeModal={closeModal} title="New Booking">
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Guest Name
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Room Type
        </label>
        <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <option>Standard</option>
          <option>Deluxe</option>
          <option>Suite</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Check-in Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Check-out Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  </Modal>
);

const AddGuestModal = ({ closeModal }) => (
  <Modal closeModal={closeModal} title="Add New Guest">
    <form className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
        />
      </div>
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Add Guest
        </button>
      </div>
    </form>
  </Modal>
);

// --- User's Dashboard Component ---
const Dashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  //add hostels part starts
  const [hostels, setHostels] = useState([]);
  const [modalState, setModalState] = useState({ type: null, data: null });

  const API_URL = "http://localhost/HMS/backend/Admin/hostels.php";

  const fetchHostels = async () => {
    try {
      const res = await axios.get(API_URL);
      setHostels(res.data);
    } catch (err) {
      console.error("Error fetching hostels:", err);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleAddHostel = async (newHostel) => {
    try {
      await axios.post(API_URL, newHostel);
      fetchHostels();
      setModalState({ type: null, data: null });
    } catch (err) {
      console.error("Error adding hostel:", err);
    }
  };

    const handleEditHostel = async (updatedHostel) => {
    try {
      await axios.put(API_URL, updatedHostel);
      fetchHostels();
      setModalState({ type: null, data: null });
    } catch (err) {
      console.error("Error updating hostel:", err);
    }
  };


  const HostelFormModal = ({ closeModal, onSave, hostel }) => {
    const [formData, setFormData] = useState(
      hostel || { name: "", total_rooms: "" }
    );

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.name.trim() === "" || formData.total_rooms === "") {
        alert("Please fill all fields");
        return;
      }
      onSave({
        ...formData,
        total_rooms: parseInt(formData.total_rooms),
      });
    };
  //add hostels part ends


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl shadow-xl p-6 w-96"
        >
          <h2 className="text-xl font-semibold mb-4">
            {hostel ? "Edit Hostel" : "Add Hostel"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Hostel Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="total_rooms"
              placeholder="Total Rooms"
              value={formData.total_rooms}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  // Fetch stats from PHP API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost/HMS/backend/Admin/dashboard_stats.php"
        ); // Adjust path as needed

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
        } else {
          throw new Error(data.message || "Failed to fetch dashboard stats");
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Updated statCards array using real data from API
  const statCards = [
    {
      title: "Total Users",
      value: stats?.total_users || "0",
      subtext: "Registered users",
      icon: <UsersIcon className="w-7 h-7 text-blue-500" />,
    },
    {
      title: "Total Rooms",
      value: stats?.total_rooms || "0",
      subtext: `${stats?.available_rooms || "0"} currently available`,
      icon: <BedIcon className="w-7 h-7 text-green-500" />,
    },
    {
      title: "Applications",
      value: stats?.total_applications || "0",
      subtext: `${stats?.pending_applications || "0"} pending approval`,
      icon: <FileTextIcon className="w-7 h-7 text-yellow-500" />,
    },
    {
      title: "Open Tickets",
      value: stats?.open_tickets || "0",
      subtext: "Requiring attention",
      icon: <TagIcon className="w-7 h-7 text-red-500" />,
    },
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "checked in":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost/HMS/backend/Admin/get_applications.php"
        );
        setRecentBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 p-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 p-8 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <XIcon className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Failed to load dashboard</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 uppercase">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Filter by Date</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center space-x-2 shadow-md">
              <DownloadIcon />
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-md font-semibold text-gray-500">
                    {card.title}
                  </h3>
                  <div className="text-gray-400">{card.icon}</div>
                </div>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {card.value}
                </p>
              </div>
              {card.subtext && (
                <p className="text-sm text-gray-400 mt-1">{card.subtext}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="font-bold text-gray-800 mb-1">Recent Bookings</h3>
            <p className="text-sm text-gray-500 mb-4">
              You have {recentBookings.length} new bookings
            </p>
            <ul className="space-y-4">
              {recentBookings.map((booking, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-4 flex items-center justify-center font-bold text-gray-500">
                      {booking.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">
                        {booking.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.room_name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Contact: {booking.phone}
                  </p>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      booking.statusColor
                    )}`}
                  >
                    {booking.status}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="font-bold text-gray-800 mb-1">Quick Actions</h3>
            <p className="text-sm text-gray-500 mb-4">
              Common tasks and operations
            </p>
            <ul className="space-y-3">
              <li
                onClick={() => setModalState({ type: "add", data: null })}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-200 transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" /> Add Hostel
              </li>
              <li
                onClick={() => setActiveModal("addGuest")}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-200 transition-colors"
              >
                <GuestsIcon className="w-5 h-5 mr-3 text-gray-500" /> Add Guest
              </li>
              <li
                onClick={() => setActiveModal("roomStatus")}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-3 text-gray-500"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Room Status
              </li>
              <li
                onClick={() => setActiveModal("processPayment")}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer border border-gray-200 transition-colors"
              >
                <PaymentsIcon className="w-5 h-5 mr-3 text-gray-500" /> Process
                Payment
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeModal === "newBooking" && (
          <NewBookingModal closeModal={() => setActiveModal(null)} />
        )}
        {activeModal === "addGuest" && (
          <AddGuestModal closeModal={() => setActiveModal(null)} />
        )}
        {/* Add other modals here */}

        {modalState.type && (
          <HostelFormModal
            closeModal={() => setModalState({ type: null, data: null })}
            onSave={
              modalState.type === "add" ? handleAddHostel : handleEditHostel
            }
            hostel={modalState.data}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main App Component to Render the Preview ---
export default function App() {
  return (
    <div className="bg-gray-50 p-8">
      <Dashboard />
    </div>
  );
}
