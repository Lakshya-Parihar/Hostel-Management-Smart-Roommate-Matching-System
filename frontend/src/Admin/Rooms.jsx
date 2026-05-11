import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// --- ICONS ---
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
const RefreshCwIcon = () => (
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
      d="M20 11A8.1 8.1 0 004.5 9M4 5v4h4m-4 4a8.1 8.1 0 0015.5 2 8.1 8.1 0 00-2.5-5.5M20 15v4h-4"
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
const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
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
const BedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

// --- PHP BACKEND API SERVICE FUNCTIONS ---
const roomService = {
  async getRooms() {
    try {
      const response = await fetch(
        "http://localhost/HMS/backend/Admin/rooms.php?action=get_rooms"
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  },

  async createRoom(roomData) {
    const formData = new FormData();
    formData.append("action", "create_room");

    // Append all form fields
    Object.keys(roomData).forEach((key) => {
      if (key === "image" && roomData[key] instanceof File) {
        formData.append("image", roomData[key]);
      } else {
        formData.append(key, roomData[key]);
      }
    });

    const response = await fetch(
      "http://localhost/HMS/backend/Admin/rooms.php",
      {
        method: "POST",
        body: formData,
      }
    );
    return await response.json();
  },

  async updateRoom(id, roomData) {
    const formData = new FormData();
    formData.append("action", "update_room");
    formData.append("id", id);

    // Append all form fields
    Object.keys(roomData).forEach((key) => {
      if (key === "image" && roomData[key] instanceof File) {
        formData.append("image", roomData[key]);
      } else {
        formData.append(key, roomData[key]);
      }
    });

    const response = await fetch(
      "http://localhost/HMS/backend/Admin/rooms.php",
      {
        method: "POST",
        body: formData,
      }
    );
    return await response.json();
  },

  async deleteRoom(id) {
    const formData = new FormData();
    formData.append("action", "delete_room");
    formData.append("id", id);

    const response = await fetch(
      "http://localhost/HMS/backend/Admin/rooms.php",
      {
        method: "POST",
        body: formData,
      }
    );
    return await response.json();
  },
};

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // If it starts with /uploads, make it absolute to your server
  if (imagePath.startsWith("/uploads/")) {
    return `http://localhost/HMS${imagePath}`;
  }

  // If it's just a filename, assume it's in uploads/rooms
  if (!imagePath.includes("/")) {
    return `http://localhost/HMS/uploads/rooms/${imagePath}`;
  }

  // Default case - prepend base URL
  return `http://localhost/HMS/${imagePath}`;
};

// --- MODAL COMPONENTS ---
const Modal = ({ children, closeModal, title, size = "max-w-md" }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={closeModal}
  >
    <motion.div
      className={`bg-white rounded-xl shadow-2xl p-6 w-full ${size} relative max-h-[90vh] overflow-y-auto`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
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

const RoomFormModal = ({ closeModal, room, onSave, isSubmitting }) => {
  const [formData, setFormData] = useState(
    room || {
      room_number: "",
      description: "",
      price: "",
      status: "available",
      beds: 1,
      capacity: 1,
      hostel_id: 1,
      // features: "",
    }
  );

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    room?.image ? getImageUrl(room.image) : null
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTextAreaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.room_number.trim()) {
      newErrors.room_number = "Room number is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.beds || formData.beds <= 0) {
      newErrors.beds = "Number of beds is required";
    }

    if (!formData.capacity || formData.capacity <= 0) {
      newErrors.capacity = "Capacity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (imageFile) {
      data.append("image", imageFile);
    } else if (room?.image) {
      // keep the existing image name if no new image selected
      data.append("existing_image", room.image);
    }

    await onSave(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      title={room ? "Edit Room" : "Add New Room"}
      size="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Room preview"
                className="mt-2 h-28 w-28 rounded object-cover border"
              />
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
            {!imageFile && room?.image && (
              <p className="text-xs text-gray-500 mt-1">
                Current: {room.image.split("/").pop()}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Number *
            </label>
            <input
              name="room_number"
              value={formData.room_number}
              onChange={handleChange}
              type="text"
              required
              disabled={!!room}
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 disabled:bg-gray-100 ${
                errors.room_number ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 101, 201A"
            />
            {errors.room_number && (
              <p className="text-red-500 text-xs mt-1">{errors.room_number}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hostel ID
            </label>
            <input
              name="hostel_id"
              value={formData.hostel_id}
              onChange={handleChange}
              type="number"
              min="1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            required
            rows={3}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Room description, amenities, view, etc."
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Beds *
            </label>
            <input
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              type="number"
              min="1"
              required
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${
                errors.beds ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.beds && (
              <p className="text-red-500 text-xs mt-1">{errors.beds}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity *
            </label>
            <input
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              type="number"
              min="1"
              required
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${
                errors.capacity ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.capacity && (
              <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price per month (₹) *
            </label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              step="0.01"
              min="0"
              required
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          <textarea
            name="features"
            value={
              typeof formData.features === "object"
                ? JSON.stringify(formData.features)
                : formData.features
            }
            onChange={(e) => {
              let value = e.target.value;
              try {
                // Try to parse JSON if it’s valid
                const parsed = JSON.parse(value);
                setFormData({ ...formData, features: parsed });
              } catch {
                // If not valid JSON, store as plain text
                setFormData({ ...formData, features: value });
              }
            }}
            rows={2}
            disabled={!!room}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            placeholder='Enter features as JSON, e.g. {"wifi": true, "ac": true}'
          />
        </div>

        <div className="flex justify-end pt-4 space-x-2">
          <button
            type="button"
            onClick={closeModal}
            disabled={isSubmitting}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <span>{room ? "Update Room" : "Create Room"}</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const ViewDetailsModal = ({ closeModal, room, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    await onDelete(room.id);
    setShowDeleteConfirm(false);
    closeModal();
  };

  return (
    <Modal
      closeModal={closeModal}
      title={`Room ${room.room_number} Details`}
      size="max-w-lg"
    >
      {showDeleteConfirm ? (
        <div className="text-center py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="block mb-2">
              Are you sure you want to delete this room?
            </strong>
            <p className="text-sm">This action cannot be undone.</p>
          </div>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 flex items-center space-x-2"
            >
              <TrashIcon />
              <span>Delete Room</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4 text-gray-700">
            {room.image && (
              <div className="text-center">
                <img
                  src={getImageUrl(room.image)}
                  alt={`Room ${room.room_number}`}
                  className="h-40 w-full object-cover rounded-lg mx-auto"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong className="block text-sm text-gray-500">
                  Room Number
                </strong>
                <p className="font-semibold">{room.room_number}</p>
              </div>
            </div>

            <div>
              <strong className="block text-sm text-gray-500">
                Description
              </strong>
              <p>{room.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong className="block text-sm text-gray-500">Beds</strong>
                <p>{room.beds}</p>
              </div>
              <div>
                <strong className="block text-sm text-gray-500">
                  Capacity
                </strong>
                <p>{room.capacity} person(s)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong className="block text-sm text-gray-500">Price</strong>
                <p className="text-lg font-bold text-green-600">
                  ₹{room.price}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    / month
                  </span>
                </p>
              </div>
              <div>
                <strong className="block text-sm text-gray-500">Status</strong>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    room.status === "available"
                      ? "bg-green-100 text-green-800"
                      : room.status === "occupied"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>
            </div>

            {room.features && (
              <div>
                <strong className="block text-sm text-gray-500">
                  Features
                </strong>
                <p>{JSON.stringify(room.features)}</p>
              </div>
            )}

            {room.hostel_id && (
              <div>
                <strong className="block text-sm text-gray-500">
                  Hostel Name
                </strong>
                <p>{room.hostel_name}</p>
              </div>
            )}

            {room.created_at && (
              <div>
                <strong className="block text-sm text-gray-500">Created</strong>
                <p>{new Date(room.created_at).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-6 mt-6 border-t border-gray-200 space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 flex items-center space-x-2"
            >
              <TrashIcon />
              <span>Delete Room</span>
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

// --- MAIN ROOM MANAGEMENT COMPONENT ---
const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Rooms");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Load rooms on component mount
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError("");
      const roomsData = await roomService.getRooms();
      setRooms(roomsData);
    } catch (err) {
      setError("Failed to load rooms. Please try again.");
      console.error("Error loading rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const roomStats = useMemo(
    () => ({
      total: rooms.length,
      available: rooms.filter((r) => r.status === "available").length,
      occupied: rooms.filter((r) => r.status === "occupied").length,
      maintenance: rooms.filter((r) => r.status === "maintenance").length,
    }),
    [rooms]
  );

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.room_number.toString().includes(searchTerm) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "All Rooms" || room.type === typeFilter;
      const matchesStatus =
        statusFilter === "All Statuses" || room.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [rooms, searchTerm, typeFilter, statusFilter]);

  const openModal = (type, room = null) => {
    setModalType(type);
    setSelectedRoom(room);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRoom(null);
    setError("");
  };

  // const handleSaveRoom = async (roomData) => {
  //   try {
  //     setIsSubmitting(true);
  //     setError("");

  //     if (selectedRoom) {
  //       // Editing existing room
  //       const result = await roomService.updateRoom(selectedRoom.id, roomData);
  //       if (result.success) {
  //         setRooms((prev) =>
  //           prev.map((r) => (r.id === selectedRoom.id ? result.data : r))
  //         );
  //         setSuccess("Room updated successfully!");
  //       } else {
  //         throw new Error(result.message);
  //       }
  //     } else {
  //       // Creating new room
  //       const result = await roomService.createRoom(roomData);
  //       if (result.success) {
  //         setRooms((prev) => [result.data, ...prev]);
  //         setSuccess("Room created successfully!");
  //       } else {
  //         throw new Error(result.message);
  //       }
  //     }

  //     closeModal();
  //   } catch (err) {
  //     setError(err.message || "Failed to save room. Please try again.");
  //     console.error("Error saving room:", err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleSaveRoom = async (formData) => {
  //   try {
  //     setIsSubmitting(true);

  //     const response = await axios.post(
  //       "http://localhost/HMS/backend/Admin/rooms.php?action=update_room",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     if (response.data.success) {
  //       alert("Room updated successfully!");
  //       loadRooms(); // refresh list after update
  //       closeModal();
  //     } else {
  //       alert("Failed to update room: " + response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error updating room:", error);
  //     alert("Error updating room!");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSaveRoom = async (formData) => {
    try {
      setIsSubmitting(true);

      const isEdit = !!selectedRoom;

      const action = isEdit ? "update_room" : "create_room";

      const response = await axios.post(
        `http://localhost/HMS/backend/Admin/rooms.php?action=${action}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        alert(
          isEdit ? "Room updated successfully!" : "Room added successfully!"
        );
        loadRooms();
        closeModal();
      } else {
        alert("Operation failed: " + response.data.message);
      } 
    } catch (error) {
      console.error("Error saving room:", error);
      alert("Error saving room!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      setError("");
      const result = await roomService.deleteRoom(roomId);
      if (result.success) {
        setRooms((prev) => prev.filter((r) => r.id !== roomId));
        setSuccess("Room deleted successfully!");
      } else {
        throw new Error(result.message);
      }
      closeModal();
    } catch (err) {
      setError(err.message || "Failed to delete room. Please try again.");
      console.error("Error deleting room:", err);
    }
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setTypeFilter("All Rooms");
    setStatusFilter("All Statuses");
    setError("");
    setSuccess("");
    loadRooms();
  };

  // Auto-hide success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const getStatusColor = (status) =>
    ({
      available: "bg-green-100 text-green-800",
      occupied: "bg-blue-100 text-blue-800",
      maintenance: "bg-yellow-100 text-yellow-800",
      cleaning: "bg-purple-100 text-purple-800",
    }[status] || "bg-gray-100 text-gray-800");

  const getStatsBadgeColor = (color) =>
    ({
      green: "bg-green-100 text-green-800",
      blue: "bg-blue-100 text-blue-800",
      yellow: "bg-yellow-100 text-yellow-800",
      purple: "bg-purple-100 text-purple-800",
    }[color] || "bg-gray-100 text-gray-800");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{success}</span>
          <button
            onClick={() => setSuccess("")}
            className="absolute top-0 right-0 px-4 py-3"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setError("")}
            className="absolute top-0 right-0 px-4 py-3"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">ROOM MANAGEMENT</h2>
        <div className="flex items-center space-x-2">
          {/* <button className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 flex items-center space-x-2">
            <FilterIcon /> <span>Filter</span>
          </button> */}
          <button
            onClick={handleRefresh}
            className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 flex items-center space-x-2"
          >
            <RefreshCwIcon /> <span>Refresh</span>
          </button>
          <button
            onClick={() => openModal("add")}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center space-x-2 shadow-md"
          >
            <PlusIcon />
            <span>Add Room</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Rooms",
            value: roomStats.total,
            subtext: "All hotel rooms",
          },
          {
            label: "Available",
            value: roomStats.available,
            subtext: "Ready for booking",
            color: "green",
          },
          {
            label: "Occupied",
            value: roomStats.occupied,
            subtext: "Currently in use",
            color: "blue",
          },
          {
            label: "Maintenance",
            value: roomStats.maintenance,
            subtext: "Under repair",
            color: "yellow",
          },
        ].map((stat) => (
          <motion.div
            variants={itemVariants}
            key={stat.label}
            className="bg-white p-5 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-500">{stat.label}</h3>
              {stat.color && (
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatsBadgeColor(
                    stat.color
                  )}`}
                >
                  {stat.label}
                </span>
              )}
            </div>
            <p className="text-4xl font-bold text-gray-800 mt-2">
              {stat.value}
            </p>
            <p className="text-sm text-gray-400">{stat.subtext}</p>
          </motion.div>
        ))}
      </div>

      {/* Room List Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800">ROOM STATUS</h3>
        <p className="text-gray-500 mb-4">Manage and update rooms</p>

        {/* Filters and Search */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            {/* <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by room number or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div> */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Statuses</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Room Cards Grid */}
      {filteredRooms.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BedIcon className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600">
            No rooms found
          </h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <motion.div
              layout
              variants={itemVariants}
              key={room.id}
              className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <div className="absolute top-4 right-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    room.status
                  )}`}
                >
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>

              {/* Room Image/Placeholder */}
              <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 overflow-hidden">
                {room.image ? (
                  <img
                    src={getImageUrl(room.image)}
                    alt={`Room ${room.room_number}`}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    room.image ? "hidden" : "flex"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-gray-300"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {room.hostel_name}
                  </h4>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {room.description}
                  </p>
                </div>
                <span
                  className="px-2 py-1 text-xs font-semibold rounded-full bg-white
                 text-gray-700"
                >
                  {room.type}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                <span>
                  {room.beds} bed(s) • Capacity: {room.capacity}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">
                  ₹{room.price}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    / month
                  </span>
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModal("edit", room)}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <BedIcon /> <span>Manage</span>
                  </button>
                  <button
                    onClick={() => openModal("view", room)}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {(modalType === "add" || modalType === "edit") && (
          <RoomFormModal
            closeModal={closeModal}
            room={selectedRoom}
            onSave={handleSaveRoom}
            isSubmitting={isSubmitting}
          />
        )}
        {modalType === "view" && (
          <ViewDetailsModal
            closeModal={closeModal}
            room={selectedRoom}
            onDelete={handleDeleteRoom}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-gray-50 p-8">
      <Room />
    </div>
  );
}
