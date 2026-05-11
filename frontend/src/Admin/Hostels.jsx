import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------- ICON COMPONENTS ------------------------- */
const EyeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const PencilIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 11l6.768-6.768a2.5 2.5 0 113.536 3.536L12.536 14.5H9v-3.5z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

/* ------------------------- MAIN HOSTEL PAGE ------------------------- */
const HostelPage = () => {
  const [hostels, setHostels] = useState([]);
  const [modalState, setModalState] = useState({ type: null, data: null });

  // ✅ Backend API URL
  const API_URL = "http://localhost/HMS/backend/Admin/hostels.php";

  /* ------------------------- FETCH HOSTELS ------------------------- */
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

  /* ------------------------- ADD HOSTEL ------------------------- */
  const handleAddHostel = async (newHostel) => {
    try {
      await axios.post(API_URL, newHostel);
      fetchHostels();
      setModalState({ type: null, data: null });
    } catch (err) {
      console.error("Error adding hostel:", err);
    }
  };

  /* ------------------------- EDIT HOSTEL ------------------------- */
  const handleEditHostel = async (updatedHostel) => {
    try {
      await axios.put(API_URL, updatedHostel);
      fetchHostels();
      setModalState({ type: null, data: null });
    } catch (err) {
      console.error("Error updating hostel:", err);
    }
  };

  /* ------------------------- DELETE HOSTEL ------------------------- */
const handleDeleteHostel = async (hostel) => {
  if (!window.confirm(`Delete ${hostel.name}?`)) return;
  try {
    await axios({
      method: "delete",
      url: API_URL,
      data: JSON.stringify({ id: hostel.id }), // 👈 ensure it's a JSON string
      headers: { "Content-Type": "application/json" }, // 👈 force header
    });
    fetchHostels();
  } catch (err) {
    console.error("Error deleting hostel:", err);
  }
};


  /* ------------------------- MODAL FORM ------------------------- */
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

  /* ------------------------- MAIN RENDER ------------------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">HOSTEL MANAGEMENT</h1>
        <button
          onClick={() => setModalState({ type: "add", data: null })}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" /> Add Hostel
        </button>
      </div>

      {/* ------------------------- HOSTEL TABLE ------------------------- */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-blue-50 border-b">
              <th className="px-6 py-3 text-gray-600 font-semibold">ID</th>
              <th className="px-6 py-3 text-gray-600 font-semibold">Hostel Name</th>
              <th className="px-6 py-3 text-gray-600 font-semibold">Total Rooms</th>
              <th className="px-6 py-3 text-gray-600 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((hostel, idx) => (
              <tr
                key={hostel.id}
                className={`border-b hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">{hostel.id}</td>
                <td className="px-6 py-4">{hostel.name}</td>
                <td className="px-6 py-4">{hostel.total_rooms}</td>
                <td className="px-6 py-4 flex justify-center space-x-3">
                  <button
                    onClick={() => setModalState({ type: "edit", data: hostel })}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <PencilIcon className="w-7 h-7" />
                  </button>
                  <button
                    onClick={() => handleDeleteHostel(hostel)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {hostels.length === 0 && (
          <div className="text-center py-6 text-gray-500">No hostels found.</div>
        )}
      </div>

      {/* ------------------------- MODAL HANDLING ------------------------- */}
      <AnimatePresence>
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
    </motion.div>
  );
};

export default HostelPage;
