import React, { useState } from "react";
import axios from "axios";

// Input, Textarea, Select, and Checkbox helpers remain the same
const InputField = ({ id, label, type, value, onChange, placeholder, required = true }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
    />
  </div>
);

const TextareaField = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="4"
      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
    ></textarea>
  </div>
);

const SelectField = ({ id, label, value, onChange, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
    >
      {children}
    </select>
  </div>
);

const CheckboxField = ({ id, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-900">{label}</label>
  </div>
);

function AddRoomForm() {
  const [hostelName, setHostelName] = useState("");
  const [beds, setBeds] = useState("1");
  const [hasWifi, setHasWifi] = useState(false);
  const [hasAc, setHasAc] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // NEW: Image state
  const [status] = useState("available");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("hostelName", hostelName);
    formData.append("beds", parseInt(beds));
    formData.append("facilities", JSON.stringify({ wifi: hasWifi, ac: hasAc }));
    formData.append("monthlyPrice", parseFloat(price));
    formData.append("description", description);
    formData.append("status", status);
    formData.append("addedOn", new Date().toISOString());
    if (image) formData.append("image", image); // append image if selected
 
    try {
      const res = await axios.post(
        "http://localhost/HMS/backend/Admin/addRooms.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        setMessage(`Room in ${hostelName} added successfully!`);
        setError("");

        // Reset form
        setHostelName("");
        setBeds("1");
        setHasWifi(false);
        setHasAc(false);
        setPrice("");
        setDescription("");
        setImage(null);

        setTimeout(() => setMessage(""), 5000);
      } else {
        setError(res.data.error || "Something went wrong.");
        setMessage("");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Server error");
      setMessage("");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">Add New Room</h2>
      <p className="text-gray-500 mb-6 text-center">
        Fill in the details below to add a new room to the system.
      </p>

      {message && <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg">{message}</div>}
      {error && <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="hostelName"
          label="Hostel Name"
          type="text"
          value={hostelName}
          onChange={(e) => setHostelName(e.target.value)}
          placeholder="e.g., 'Sunshine Boys Hostel'"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField id="beds" label="Number of Beds" value={beds} onChange={(e) => setBeds(e.target.value)}>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
            <option value="4">4 Beds</option>
          </SelectField>

          <InputField
            id="price"
            label="Monthly Price (₹)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 8500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
          <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg border">
            <CheckboxField id="wifi" label="WiFi Included" checked={hasWifi} onChange={(e) => setHasWifi(e.target.checked)} />
            <CheckboxField id="ac" label="Air Conditioned (AC)" checked={hasAc} onChange={(e) => setHasAc(e.target.checked)} />
          </div>
        </div>

        <TextareaField
          id="description"
          label="Room Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide a brief description of the room, its features, and any other relevant details."
        />

        {/* NEW: Image Upload Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Status:</span>
            <span className="ml-2 inline-block bg-green-200 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {status}
            </span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 duration-300"
        >
          Add Room
        </button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <AddRoomForm />
    </div>
  );
}
