import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Pencil } from 'lucide-react';

// --- Mock Data and Icons (Recreated from missing files) ---

// Mock data for the bookings table
const bookingsData = [
  {
    id: 1,
    guest: { name: "Emma Thompson", email: "emma.t@example.com", avatar: "ET" },
    room: "Room 301",
    type: "Suite",
    checkIn: "2023-10-25",
    checkOut: "2023-10-28",
    status: "Confirmed",
    payment: "$657.00",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    guest: { name: "Michael Chen", email: "m.chen@example.com", avatar: "MC" },
    room: "Room 205",
    type: "Deluxe",
    checkIn: "2023-10-26",
    checkOut: "2023-10-27",
    status: "Pending",
    payment: "$149.00",
    paymentMethod: "PayPal",
  },
  {
    id: 3,
    guest: {
      name: "David Williams",
      email: "d.williams@example.com",
      avatar: "DW",
    },
    room: "Room 118",
    type: "Standard",
    checkIn: "2023-10-24",
    checkOut: "2023-10-25",
    status: "Confirmed",
    payment: "$99.00",
    paymentMethod: "Credit Card",
  },
  {
    id: 4,
    guest: {
      name: "Sophia Loren",
      email: "sophia.l@example.com",
      avatar: "SL",
    },
    room: "Room 302",
    type: "Suite",
    checkIn: "2023-11-01",
    checkOut: "2023-11-05",
    status: "Pending",
    payment: "$1036.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 5,
    guest: {
      name: "James Carter",
      email: "j.carter@example.com",
      avatar: "JC",
    },
    room: "Room 105",
    type: "Standard",
    checkIn: "2023-11-02",
    checkOut: "2023-11-03",
    status: "Confirmed",
    payment: "$99.00",
    paymentMethod: "Credit Card",
  },
];

// Inline SVG icons
const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
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

// --- Modal Components ---

const Modal = ({ children, closeModal, title }) => {
  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
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
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
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

// const ViewBookingModal = ({ booking, closeModal }) => (
//   <Modal
//     closeModal={closeModal}
//     title={`Booking Details: ${booking.guest.name}`}
//   >
//     <div className="space-y-4 text-sm">
//       <div className="flex justify-between border-b pb-2">
//         <span className="font-semibold text-gray-600">Guest:</span>
//         <span className="text-gray-800">
//           {booking.guest.name} ({booking.guest.email})
//         </span>
//       </div>
//       <div className="flex justify-between border-b pb-2">
//         <span className="font-semibold text-gray-600">Room:</span>
//         <span className="text-gray-800">
//           {booking.room} ({booking.type})
//         </span>
//       </div>
//       <div className="flex justify-between border-b pb-2">
//         <span className="font-semibold text-gray-600">Check-in:</span>
//         <span className="text-gray-800">{booking.checkIn}</span>
//       </div>
//       <div className="flex justify-between border-b pb-2">
//         <span className="font-semibold text-gray-600">Check-out:</span>
//         <span className="text-gray-800">{booking.checkOut}</span>
//       </div>
//       <div className="flex justify-between border-b pb-2">
//         <span className="font-semibold text-gray-600">Status:</span>
//         <span className="text-gray-800">{booking.status}</span>
//       </div>
//       <div className="flex justify-between">
//         <span className="font-semibold text-gray-600">Payment:</span>
//         <span className="text-gray-800">
//           {booking.payment} ({booking.paymentMethod})
//         </span>
//       </div>
//       <div className="flex justify-end pt-4">
//         <button
//           type="button"
//           onClick={closeModal}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </Modal>
// );

const ViewBookingModal = ({ isOpen, onClose, booking }) => {
  if (!booking) return null;

  const documentUrl = booking.document_file
    ? `http://localhost/HMS/backend/${booking.document_file}`
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Application Details
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Name:</strong> {booking.name}
              </p>
              <p>
                <strong>Email:</strong> {booking.email}
              </p>
              <p>
                <strong>Phone:</strong> {booking.phone}
              </p>
              <p>
                <strong>Room:</strong> {booking.room_name || "—"}
              </p>
              <p>
                <strong>City:</strong> {booking.city}
              </p>
              <p>
                <strong>Zip:</strong> {booking.zip_code}
              </p>
              <p>
                <strong>Preferences:</strong> {booking.preferences || "None"}
              </p>
              <p>
                <strong>Status:</strong>
                <span className="ml-2 px-2 py-1 rounded-full text-sm font-medium bg-gray-100">
                  {booking.status}
                </span>
              </p>
              {/* ✅ Document section */}
              {documentUrl ? (
                <p>
                  <strong>Document:</strong>{" "}
                  <a
                    href={documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Uploaded Document
                  </a>
                </p>
              ) : (
                <p>
                  <strong>Document:</strong> No document uploaded
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// const EditBookingModal = ({ booking, closeModal }) => (
//   <Modal closeModal={closeModal} title={`Edit Booking: ${booking.guest.name}`}>
//     <form className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Booking Status
//         </label>
//         <select
//           defaultValue={booking.status}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option>Confirmed</option>
//           <option>Pending</option>
//           <option>Cancelled</option>
//         </select>
//       </div>
//       <div className="flex space-x-4">
//         <div className="w-1/2">
//           <label className="block text-sm font-medium text-gray-700">
//             Check-in Date
//           </label>
//           <input
//             type="date"
//             defaultValue={booking.checkIn}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
//           />
//         </div>
//         <div className="w-1/2">
//           <label className="block text-sm font-medium text-gray-700">
//             Check-out Date
//           </label>
//           <input
//             type="date"
//             defaultValue={booking.checkOut}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
//           />
//         </div>
//       </div>
//       <div className="flex justify-end pt-4 space-x-2">
//         <button
//           type="button"
//           onClick={closeModal}
//           className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
//         >
//           Save Changes
//         </button>
//       </div>
//     </form>
//   </Modal>
// );

// --- User's Bookings Component ---

const EditBookingModal = ({ isOpen, onClose, booking, onUpdate }) => {
  const [status, setStatus] = useState(booking?.status || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!status) return alert("Please select a status");

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost/HMS/backend/Admin/update_application_status.php",
        { id: booking.id, status }
      );

      if (res.data.success) {
        onUpdate(booking.id, status);
        onClose();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Edit Application
            </h2>

            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {booking.name}
              </p>
              <p>
                <strong>Email:</strong> {booking.email}
              </p>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Bookings = () => {
  const [applications, setApplications] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view' or 'edit'

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost/HMS/backend/Admin/get_applications.php"
      );
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setModalType("view");
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setModalType("edit");
  };

  const openModal = (booking, type) => {
    setSelectedBooking(booking);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setModalType(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">APPLICATIONS</h2>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mt-8">
          MANAGE BOOKINGS
        </h3>
        <p className="text-gray-500 mb-4">
          View and manage all hostel bookings
        </p>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Applicant
                </th>
                <th scope="col" className="px-6 py-3">
                  Room
                </th>
                <th scope="col" className="px-6 py-3">
                  City
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="bg-white border-b hover:bg-gray-50 transition-colors"
                  >
                    {/* Applicant Info */}
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 font-semibold text-gray-600">
                          {app.name ? app.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          {app.name || "Unknown"}
                          <div className="text-xs text-gray-500">
                            {app.email || "No email"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Room Info */}
                    <td className="px-6 py-4">
                      {app.room_name ? `Room ${app.room_name}` : "—"}
                      <div className="text-xs text-gray-500">
                        #{app.room_id || "N/A"}
                      </div>
                    </td>

                    {/* City & Zip */}
                    <td className="px-6 py-4">
                      {app.city || "—"}
                      <div className="text-xs text-gray-500">
                        {app.zip_code || ""}
                      </div>
                    </td>

                    {/* Preferences */}
                    <td className="px-6 py-4">{app.phone}</td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-4 items-center flex space-x-2">
                      <button
                        onClick={() => handleView(app)}
                        className="pt-2 font-medium text-gray-600 hover:text-blue-600"
                      >
                       <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(app)}
                        className="pt-2 font-medium text-blue-600 hover:underline"
                      >
                        <Pencil size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalType === "view" && selectedBooking && (
          <ViewBookingModal
            isOpen={true}
            booking={selectedBooking}
            onClose={closeModal}
          />
        )}
        {modalType === "edit" && selectedBooking && (
          <EditBookingModal
            isOpen={true}
            booking={selectedBooking}
            onClose={closeModal}
            onUpdate={(id, newStatus) => {
              setApplications((prev) =>
                prev.map((app) =>
                  app.id === id ? { ...app, status: newStatus } : app
                )
              );
            }}
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
      <Bookings />
    </div>
  );
}
