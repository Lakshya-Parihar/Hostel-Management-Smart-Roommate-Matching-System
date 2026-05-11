import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { UserStar } from "lucide-react";

// --- ICONS (Recreated from missing files) ---
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
const TrashIcon = () => (
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
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
const RestoreIcon = () => (
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
      d="M3 10v4a1 1 0 001 1h3l3 3V6L7 9H4a1 1 0 00-1 1zM15 8a6 6 0 010 8"
    />
  </svg>
);
const UploadCloudIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto h-10 w-10 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

// --- MODAL WRAPPER COMPONENT ---
const Modal = ({ children, closeModal, title, maxWidth = "max-w-md" }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={closeModal}
  >
    <motion.div
      className={`bg-white rounded-xl shadow-2xl p-6 w-full ${maxWidth} relative`}
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

// --- FUNCTIONAL MODALS ---
// const UserFormModal = ({ closeModal, user, onSave }) => {
//     const [formData, setFormData] = useState(
//         user || {
//             name: '', role: '', email: '', phone: '', status: 'Active',
//             address: { street: '', city: '', zip: '', country: '' },
//             preferences: [],
//             idVerification: { status: 'Not Submitted', documents: [] }
//         }
//     );
//      const [newDocument, setNewDocument] = useState({ type: 'Aadhar Card', file: null, fileName: '' });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleAddressChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({...prev, address: {...prev.address, [name]: value }}));
//     };

//     const handlePreferencesChange = (e) => {
//          setFormData(prev => ({...prev, preferences: e.target.value.split(',').map(p => p.trim()) }));
//     };

//     const handleFileChange = (e) => {
//         if (e.target.files[0]) {
//             setNewDocument(prev => ({ ...prev, file: e.target.files[0], fileName: e.target.files[0].name }));
//         }
//     };

//     const handleAddDocument = () => {
//         if (newDocument.fileName) {
//             setFormData(prev => ({
//                 ...prev,
//                 idVerification: {
//                     ...prev.idVerification,
//                     documents: [...prev.idVerification.documents, { type: newDocument.type, fileName: newDocument.fileName }]
//                 }
//             }));
//             setNewDocument({ type: 'Aadhar Card', file: null, fileName: '' });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSave(formData);
//     };

//     return (
//         <Modal closeModal={closeModal} title={user ? 'Edit User' : 'Add New User'} maxWidth="max-w-2xl">
//             <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
//                 {/* Personal Info */}
//                 <fieldset className="border p-4 rounded-lg">
//                     <legend className="text-lg font-semibold px-2">Personal Information</legend>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                             <input name="name" value={formData.name} onChange={handleChange} type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Role</label>
//                             <input name="role" value={formData.role} onChange={handleChange} type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Email Address</label>
//                             <input name="email" value={formData.email} onChange={handleChange} type="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                             <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//                         </div>
//                     </div>
//                 </fieldset>

//                 {/* Address Info */}
//                 <fieldset className="border p-4 rounded-lg">
//                      <legend className="text-lg font-semibold px-2">Address</legend>
//                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700">Street</label>
//                             <input name="street" value={formData.address.street} onChange={handleAddressChange} type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">City</label>
//                             <input name="city" value={formData.address.city} onChange={handleAddressChange} type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//                         </div>
//                          <div>
//                             <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
//                             <input name="zip" value={formData.address.zip} onChange={handleAddressChange} type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
//                         </div>
//                      </div>
//                 </fieldset>

//                 {/* Preferences */}
//                 <fieldset className="border p-4 rounded-lg">
//                     <legend className="text-lg font-semibold px-2">Preferences</legend>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Enter preferences (comma-separated)</label>
//                         <textarea onChange={handlePreferencesChange} value={formData.preferences.join(', ')} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"></textarea>
//                     </div>
//                 </fieldset>

//                 {/* ID Verification */}
//                 <fieldset className="border p-4 rounded-lg">
//                     <legend className="text-lg font-semibold px-2">ID Verification</legend>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Verification Status</label>
//                             <select name="status" value={formData.idVerification.status} onChange={(e) => setFormData(prev => ({...prev, idVerification: {...prev.idVerification, status: e.target.value}}))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
//                                 <option>Not Submitted</option>
//                                 <option>Pending</option>
//                                 <option>Verified</option>
//                                 <option>Rejected</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
//                             <div className="flex items-center space-x-2 mb-2">
//                                 <label htmlFor="docType" className="text-sm font-medium text-gray-700">Type:</label>
//                                 <select id="docType" value={newDocument.type} onChange={(e) => setNewDocument(prev => ({ ...prev, type: e.target.value }))} className="border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm">
//                                     <option>Aadhar Card</option>
//                                     <option>College ID</option>
//                                 </select>
//                             </div>
//                             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                                 <div className="space-y-1 text-center">
//                                     <UploadCloudIcon />
//                                     <div className="flex text-sm text-gray-600">
//                                         <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
//                                             <span>Upload a file</span>
//                                             <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
//                                         </label>
//                                         <p className="pl-1">or drag and drop</p>
//                                     </div>
//                                     <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
//                                     {newDocument.fileName && (
//                                         <div className="pt-2">
//                                             <span className="text-sm font-semibold text-gray-700">{newDocument.fileName}</span>
//                                             <button type="button" onClick={handleAddDocument} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-blue-700 text-xs">Add</button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <p className="text-sm font-medium text-gray-700">Submitted Documents:</p>
//                             <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
//                                 {formData.idVerification.documents.length > 0 ? (
//                                     formData.idVerification.documents.map((doc, index) => <li key={index}>{doc.fileName} ({doc.type})</li>)
//                                 ) : (
//                                     <li>No documents submitted.</li>
//                                 )}
//                             </ul>
//                         </div>
//                     </div>
//                 </fieldset>

//                 <div className="flex justify-end pt-4 space-x-2">
//                     <button type="button" onClick={closeModal} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
//                     <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Save</button>
//                 </div>
//             </form>
//         </Modal>
//     );
// };

const UserProfileModal = ({ closeModal, user }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(
          `http://localhost/HMS/backend/Admin/get_user_preferences.php?student_id=${user.id}`
        )
        .then((res) => setPreferences(res.data))
        .catch((err) => console.error("Error fetching preferences:", err));
    }
  }, [user]);

  if (!user) return null;

  return (
    <Modal closeModal={closeModal} title="User Profile" maxWidth="max-w-xl">
      <div className="space-y-4">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
            {user.avatar}
          </div>
          <div>
            <h4 className="text-2xl font-bold text-gray-800">{user.name}</h4>
            <p className="text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* Contact & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h5 className="text-sm font-semibold text-gray-500 mb-1">
              Contact
            </h5>
            <p className="text-gray-800">{user.email}</p>
            <p className="text-gray-800">{user.phone}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h5 className="text-sm font-semibold text-gray-500 mb-1">
              Address
            </h5>
            <p className="text-gray-800">
              {user.city}, {user.state}
            </p>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h5 className="font-semibold text-black mb-2">
            Preferences
          </h5>
          <div className="flex flex-wrap gap-2">
            {/* {user.preferences.length > 0 ? (
              user.preferences.map((pref) => (
                <span
                  key={pref}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  {pref}
                </span>
              )) */}

            {preferences ? (
              <div className="border-t pt-3">
                <p>
                  <strong>Sleep:</strong> {preferences.sleep}
                </p>
                <p>
                  <strong>Study:</strong> {preferences.study}
                </p>
                <p>
                  <strong>Cleanliness:</strong> {preferences.cleanliness}
                </p>
                <p>
                  <strong>Hobbies:</strong> {preferences.hobbies}
                </p>
                <p>
                  <strong>Food:</strong> {preferences.food}
                </p>
                <p>
                  <strong>Noise:</strong> {preferences.noise}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No preferences listed.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ConfirmationModal = ({ onConfirm, onCancel, userName }) => (
  <Modal closeModal={onCancel} title="Confirm Archival">
    <div className="space-y-4">
      <p>
        Are you sure you want to archive <strong>{userName}</strong>? They will
        be moved to the archived list.
      </p>
      <div className="flex justify-end pt-4 space-x-2">
        <button
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </Modal>
);

// --- USERS COMPONENT ---
const Users = () => {
  const [userList, setUserList] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'profile', 'confirmArchive'
  const [view, setView] = useState("active"); // 'active' or 'archived'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost/HMS/backend/Admin/get_users.php"
        );
        const formattedUsers = res.data.map((user) => ({
          ...user,
          avatar: user.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
            : "U",
          status: "Active", // you can change this if you have status in DB
          idVerification: { status: "Pending", documents: [] }, // optional placeholder
          address: { street: "", city: user.city, zip: "", country: "" },
          preferences: [],
        }));
        setUserList(formattedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
  };

  const handleSaveUser = (userData) => {
    if (userData.id) {
      // Editing existing user
      setUserList((prev) =>
        prev.map((u) => (u.id === userData.id ? { ...u, ...userData } : u))
      );
    } else {
      // Adding new user
      const newUser = {
        ...userData,
        id: Date.now(),
        avatar: userData.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
      };
      setUserList((prev) => [newUser, ...prev]);
    }
    closeModal();
  };

  const handleArchive = () => {
    if (selectedUser) {
      setUserList((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, status: "Archived" } : u
        )
      );
      closeModal();
    }
  };

  const handleRestore = (userToRestore) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === userToRestore.id ? { ...u, status: "Active" } : u
      )
    );
  };

  const getIdStatusColor = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const activeUsers = (userList || []).filter((u) => u.status !== "Archived");
  const archivedUsers = (userList || []).filter((u) => u.status === "Archived");
  const usersToDisplay = view === "active" ? activeUsers : archivedUsers;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex mb-8 items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800">USER MANAGEMENT</h2>
        {/* <button
          onClick={() => openModal("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center space-x-2 shadow-md transition-transform transform hover:scale-105"
        >
          <PlusIcon />
          <span>Add User</span>
        </button> */}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">USERS</h3>
          <p className="text-gray-500">View and manage user profiles</p>
        </div>
        <div className="flex items-center space-x-1 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setView("active")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
              view === "active" ? "bg-white shadow" : "text-gray-600"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setView("archived")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
              view === "archived" ? "bg-white shadow" : "text-gray-600"
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mr-3 font-semibold text-gray-600">
                      {user.avatar}
                    </div>
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  {user.email}
                  <div className="text-xs text-gray-500">{user.phone}</div>
                </td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4">{user.city}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                  <button
                    onClick={() => openModal("profile", user)}
                    className="font-medium text-gray-600 hover:text-blue-600"
                  >
                    <UserStar />
                  </button>
                  {view === "active" ? (
                    <button
                      onClick={() => openModal("confirmArchive", user)}
                      className="font-medium text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                    >
                      🗑
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRestore(user)}
                      className="font-medium text-green-500 hover:text-green-700 p-1 rounded-full hover:bg-green-100"
                    >
                      ♻️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {/* {(modalType === 'add' || modalType === 'edit') && <UserFormModal closeModal={closeModal} user={selectedUser} onSave={handleSaveUser} />} */}
        {modalType === "profile" && (
          <UserProfileModal closeModal={closeModal} user={selectedUser} />
        )}
        {modalType === "confirmArchive" && (
          <ConfirmationModal
            onConfirm={handleArchive}
            onCancel={closeModal}
            userName={selectedUser.name}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Main App component to render the Users page
export default function App() {
  return <Users />;
}
