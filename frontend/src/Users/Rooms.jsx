import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Rss,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroimg1 from "./images/hero_img_1.jpg";
import heroimg2 from "./images/hero_img_2.jpg";
import heroimg3 from "./images/hero_img_3.jpg";
import heroimg4 from "./images/hero_img_4.jpg";
import heroimg5 from "./images/hero_img_5.jpg";
import heroimg6 from "./images/hero_img_6.jpg";
import logo from "./images/hms_logo.jpg";
import "./Styles/Main.css";

// --- SVG Icons ---
const WifiIcon = () => (
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
    className="h-5 w-5"
  >
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

const AcIcon = () => (
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
    className="h-5 w-5"
  >
    <path d="M12 2a1 1 0 0 1 1 1v5.32a1 1 0 0 0 1.61.79l3.54-2.05a1 1 0 0 1 1.37.91v4.06a1 1 0 0 0 .59.91l3.4 1.61a1 1 0 0 1 0 1.84l-3.4 1.61a1 1 0 0 0-.59.91v4.06a1 1 0 0 1-1.37.91l-3.54-2.05a1 1 0 0 0-1.61.79V21a1 1 0 0 1-2 0v-1.32a1 1 0 0 0-1.61-.79l-3.54 2.05a1 1 0 0 1-1.37-.91v-4.06a1 1 0 0 0-.59-.91l-3.4-1.61a1 1 0 0 1 0-1.84l3.4-1.61a1 1 0 0 0 .59-.91V5.41a1 1 0 0 1 1.37-.91l3.54 2.05A1 1 0 0 0 11 7.32V3a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const NewBedIcon = () => (
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
    className="h-5 w-5"
  >
    <path d="M2 4v16h20V4" />
    <path d="M2 10h20" />
    <path d="M6 14h2" />
    <path d="M10 14h6" />
    <path d="M8 18h8" />
  </svg>
);

const initialApplicationData = {
  fullName: "",
  studentId: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  zip: "",
  preferences: "",
  idType: "Aadhar Card",
  document: null,
};

const HamburgerIcon = () => (
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
    className="h-6 w-6"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
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
    className="h-6 w-6"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const FilterIcon = () => (
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
    className="lucide lucide-filter"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const BellIcon = () => (
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
    className="lucide lucide-bell"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.33 21a1.94 1.94 0 0 0 3.34 0" />
  </svg>
);

// --- Animated SVG Icons for Filter ---
const PriceIcon = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ scale: 0, rotate: -90 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </motion.svg>
);

const FeaturesIcon = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial="hidden"
    animate="visible"
    transition={{ delay: 0.3 }}
  >
    <motion.path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1, transition: { duration: 1 } },
      }}
    />
  </motion.svg>
);

const NewAnimatedBedIconFilter = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial="hidden"
    animate="visible"
  >
    <motion.path
      d="M2 4v16h20V4"
      variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
      transition={{ duration: 0.7, delay: 0.4 }}
    />
    <motion.path
      d="M2 10h20"
      variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1 } }}
      transition={{ duration: 0.5, delay: 0.8 }}
    />
    <motion.path
      d="M6 14h2"
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
    />
  </motion.svg>
);

const UserIcon = () => (
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
    className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const MailIcon = () => (
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
    className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  >
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);
const PhoneIcon = () => (
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
    className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const UserCircleIcon = () => (
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
    className="lucide lucide-user-circle"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);

const UploadCloudIcon = () => (
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
    className="h-10 w-10 text-gray-500"
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

// --- Toggle Button Component ---
const ToggleButton = ({ isOn, handleToggle }) => {
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        isOn ? "bg-indigo-600 justify-end" : "bg-gray-300 justify-start"
      }`}
      onClick={handleToggle}
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md"
        layout
        transition={spring}
      />
    </div>
  );
};
const BookingModal = ({ selectedRoom, onClose, bookingStatus, onConfirm }) => {
  if (!selectedRoom) return null;
  return (
    <AnimatePresence>
      <motion.div /* ...overlay props... */ onClick={onClose}>
        <motion.div
          /* ...modal props... */ onClick={(e) => e.stopPropagation()}
        >
          {/* modal body */}
          <motion.button
            onClick={onConfirm}
            disabled={bookingStatus === "confirming"}
            className={`font-bold py-3 px-8 rounded-lg transition-colors text-white ${
              bookingStatus === "confirming"
                ? "bg-yellow-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {bookingStatus === "confirming" ? "Confirming..." : "Book Now"}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMaintenanceRequests, setShowMaintenanceRequests] = useState(false);
  const images = [heroimg1, heroimg2, heroimg3, heroimg4, heroimg5, heroimg6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [applicationData, setApplicationData] = useState(
    initialApplicationData
  );

  //Booking
  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus("confirming");

    // ✅ Get user from localStorage and extract ID
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.id : null;

    if (!userId) {
      alert("User not found. Please log in again.");
      setBookingStatus("idle");
      return;
    }

    if (!selectedRoom) {
      alert("No room selected!");
      setBookingStatus("idle");
      return;
    }

    const formData = new FormData();

    // ✅ Append all application fields
    Object.entries(applicationData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // ✅ Add extra fields
    formData.append("room_id", selectedRoom.id);
    formData.append("user_id", userId);
    console.log("idType sending to backend:", applicationData.idType);
    try {
      const res = await axios.post(
        "http://localhost/HMS/backend/User/submit_app.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        setBookingStatus("confirmed");
        setIsApplicationFormOpen(false);
        alert("Application submitted successfully!");
      } else {
        alert(res.data.message || "Submission failed.");
        setBookingStatus("idle");
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to submit application.");
      setBookingStatus("idle");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const [filters, setFilters] = useState({
    maxPrice: 10000,
    wifi: false,
    ac: false,
    nonAc: false,
    beds: 0,
  });

  const handlePriceChange = (e) => {
    setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const handleToggleChange = (name) => {
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleBedChange = (numBeds) => {
    setFilters((prev) => ({ ...prev, beds: numBeds }));
  };

  const handleApplyClick = (room) => {
    setSelectedRoom(room);
  };

  const handleFinalBooking = () => {
    setIsApplicationFormOpen(true);
  };

  const handleApplicationInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setApplicationData((prev) => ({ ...prev, document: e.target.files[0] }));
    }
  };

  // const handleApplicationSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     !applicationData.studentId.trim() ||
  //     !applicationData.fullName.trim() ||
  //     !applicationData.email.trim()
  //   ) {
  //     alert(
  //       "Please fill in all required fields: Student ID, Full Name, and Email."
  //     );
  //     return;
  //   }
  //   setBookingStatus("confirming");
  //   console.log("Submitting application:", {
  //     ...applicationData,
  //     document: applicationData.document?.name || "No file uploaded", // Just logging the name for demo
  //     room_id: selectedRoom.id,
  //     status: "pending",
  //   });
  //   setTimeout(() => {
  //     setIsApplicationFormOpen(false);
  //     setSelectedRoom(null);
  //     setBookingStatus("confirmed");
  //     setApplicationData(initialApplicationData); // Reset form
  //     setTimeout(() => {
  //       setBookingStatus(null);
  //     }, 3000);
  //   }, 1500);
  // };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const navLinks = [
    { href: "/home#features", label: "FEATURES" },
    { href: "/home#how-it-works", label: "HOW IT WORKS" },
    { href: "/preference", label: "PREFERENCES" },
    { href: "/rooms", label: "ROOMS" },
    { href: "/recommendation", label: "RECOMMENDATIONS" },
    { href: "/home#ticket", label: "TICKET" },
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.2 } },
  };

  // footer
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const linkHover = {
    color: "#FFFFFF",
    transition: { type: "spring", stiffness: 300 },
  };

  const iconHover = {
    scale: 1.2,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    transition: { type: "spring", stiffness: 400 },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
    },
  };

  const socialLinks = [
    { icon: <Facebook size={16} />, href: "#" },
    { icon: <Twitter size={16} />, href: "#" },
    { icon: <Instagram size={16} />, href: "#" },
    { icon: <Linkedin size={16} />, href: "#" },
    { icon: <Rss size={16} />, href: "#" },
  ];

  // Fetch rooms from backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost/HMS/backend/getRooms.php",
          filters,
          { headers: { "Content-Type": "application/json" } }
        );

        const toArray = (val) => {
          if (Array.isArray(val))
            return val.map((x) => String(x).toLowerCase());
          if (typeof val === "string") {
            try {
              const parsed = JSON.parse(val);
              return Array.isArray(parsed)
                ? parsed.map((x) => String(x).toLowerCase())
                : [];
            } catch {
              return [];
            }
          }
          return [];
        };

        const normalized = (Array.isArray(data) ? data : []).map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description ?? "",
          imageUrl: r.imageUrl || r.image || "",
          price: Number(r.price ?? 0),
          beds: Number(r.beds ?? r.bed_count ?? 1),
          features: toArray(r.features ?? r.amenities),
        }));

        setRooms(normalized);
      } catch (e) {
        console.error("Error fetching rooms:", e);
      }
    };
    fetchRooms();
  }, [filters]);
 
  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800">
      <main>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-black text-white border-b border-white/10 shadow-lg"
        >
          <div className="flex h-16 px-8 py-4 md:h-20 container mx-auto justify-between items-center">
            {/* Brand */}
            <a
              href="/home"
              className="inline-flex h-14 w-14 items-center gap-2 group"
            >
              <img src={logo} alt="HMS" className="rounded-lg" />
              <span className="text-3xl md:text-3xl font-extrabold tracking-tight text-white">
                HOSTELLITE
              </span>
              <span className="sr-only">Home</span>
            </a>
            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-sm font-semibold tracking-wide text-white transition-colors duration-200"
                >
                  <span className="hover-underline-animation">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotification(!showNotification)}
                  className="text-white hover:scale-110 transition duration-300"
                >
                  <BellIcon />
                </button>
                <AnimatePresence>
                  {showNotification && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={popupVariants}
                      className="absolute right-0 mt-2 w-64 border border-white bg-black text-white rounded-lg shadow-xl overflow-hidden z-20"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <p className="font-semibold text-sm">Notifications</p>
                      </div>
                      <ul className="divide-y divide-gray-200">
                        <li className="px-4 py-2 text-white transition hover:bg-white hover:text-black text-sm">
                          New room available for booking.
                        </li>
                        <li className="px-4 py-2 text-white transition hover:bg-white hover:text-black text-sm">
                          Maintenance request for room 101 submitted.
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-400">
                          No new notifications.
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="text-white hover:scale-110 transition duration-300"
                >
                  <UserCircleIcon />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={popupVariants}
                      className="absolute right-0 mt-2 w-48 border border-white bg-black rounded-lg shadow-xl overflow-hidden z-20"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <p className="font-semibold text-sm">
                          {user?.name || "User"}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {user?.email || ""}
                        </p>
                      </div>
                      <ul>
                        <li>
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              setShowMaintenanceRequests(true);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black transition duration-200"
                          >
                            Maintenance Requests
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-red-500 hover:text-white transition duration-200"
                          >
                            Log out
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-300 md:hidden"
              >
                <FilterIcon />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <section>
          <div className="bg-gray-50 min-h-screen mt-16 font-sans text-gray-800">
            <div className="container mx-auto px-4 py-8 md:py-12">
              <header className="text-center mb-10">
                <motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                >
                  FIND YOUR PERFECT ROOM
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto"
                >
                  Filter by price, features, and sleeping arrangements to match
                  your needs.
                </motion.p>
              </header>

              {/* --- Filter Toggle Button --- */}
              <div className="mb-8 flex justify-end">
                <motion.button
                  onClick={() => setIsFilterOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-semibold border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <HamburgerIcon />
                  <span className="ml-2">Filter</span>
                </motion.button>
              </div>

              {/* --- Filter Panel --- */}
              <AnimatePresence>
                {isFilterOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-0 bg-black bg-opacity-50 z-40"
                      onClick={() => setIsFilterOpen(false)}
                    />
                    <motion.div
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 p-6 flex flex-col"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-6 pb-4 border-b">
                        <h3 className="text-2xl font-bold text-gray-800">
                          Filters
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsFilterOpen(false)}
                          className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                        >
                          <CloseIcon />
                        </motion.button>
                      </div>

                      <div className="flex-grow overflow-y-auto pr-2">
                        {/* Price Filter */}
                        <div className="space-y-3 mb-8">
                          <label
                            htmlFor="price"
                            className="flex items-center font-semibold text-gray-700 text-lg"
                          >
                            <PriceIcon />
                            <span className="ml-2">
                              Max Price:{" "}
                              <span className="text-indigo-600 font-bold">
                                ₹{filters.maxPrice}
                              </span>
                            </span>
                          </label>
                          <input
                            type="range"
                            id="price"
                            name="price"
                            min="0"
                            max="10000"
                            step="500"
                            value={filters.maxPrice}
                            onChange={handlePriceChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                          <div className="flex justify-between text-sm mt-1 text-gray-500">
                            <span>₹0</span>
                            <span>₹10000</span>
                          </div>
                        </div>

                        {/* Features Filter */}
                        <div className="space-y-3 mb-8">
                          <p className="flex items-center font-semibold text-gray-700 text-lg">
                            <FeaturesIcon />
                            <span className="ml-2">Features</span>
                          </p>
                          <div className="flex flex-col space-y-4 pl-8">
                            <div className="flex items-center justify-between text-base">
                              <span className="text-gray-600">Wi-Fi</span>
                              <ToggleButton
                                isOn={filters.wifi}
                                handleToggle={() => handleToggleChange("wifi")}
                              />
                            </div>
                            <div className="flex items-center justify-between text-base">
                              <span className="text-gray-600">AC</span>
                              <ToggleButton
                                isOn={filters.ac}
                                handleToggle={() => handleToggleChange("ac")}
                              />
                            </div>
                            <div className="flex items-center justify-between text-base">
                              <span className="text-gray-600">Non-AC</span>
                              <ToggleButton
                                isOn={filters.nonAc}
                                handleToggle={() => handleToggleChange("nonAc")}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Beds Filter */}
                        {/* <div className="space-y-3">
                          <p className="flex items-center font-semibold text-gray-700 text-lg">
                            <NewAnimatedBedIconFilter />
                            <span className="ml-2">Beds</span>
                          </p>
                          <div className="grid grid-cols-4 gap-2 pl-8">
                            {[0, 1, 2, 4].map((num) => (
                              <button
                                key={num}
                                onClick={() => handleBedChange(num)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                  filters.beds === num
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                              >
                                {num === 0 ? "All" : num}
                              </button>
                            ))}
                          </div>
                        </div> */}
                      </div>

                      <div className="mt-auto pt-6 border-t">
                        <motion.button
                          onClick={() => setIsFilterOpen(false)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                        >
                          Apply Filters
                        </motion.button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {selectedRoom && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
                    onClick={() =>
                      !isApplicationFormOpen && setSelectedRoom(null)
                    }
                  >
                    {/* --- Application Form Modal --- */}
                    <AnimatePresence>
                      {isApplicationFormOpen && (
                        <motion.div
                          initial={{ scale: 0.9, y: 20, opacity: 0 }}
                          animate={{ scale: 1, y: 0, opacity: 1 }}
                          exit={{ scale: 0.9, y: 20, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                          className="absolute z-50 bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl" // Increased width
                          onClick={(e) => e.stopPropagation()}
                        >
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Application for {selectedRoom.name}
                          </h3>
                          <form
                            onSubmit={handleApplicationSubmit}
                            className="max-h-[80vh] overflow-y-auto pr-2"
                          >
                            {/* Personal Information */}
                            <fieldset className="mb-6">
                              <legend className="text-xl font-semibold text-gray-700 mb-3">
                                Personal Information
                              </legend>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                  <UserIcon />
                                  <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={applicationData.fullName}
                                    onChange={handleApplicationInputChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                    required
                                  />
                                </div>
                                <div className="relative">
                                  <MailIcon />
                                  <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={applicationData.email}
                                    onChange={handleApplicationInputChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                    required
                                  />
                                </div>
                                <div className="relative">
                                  <PhoneIcon />
                                  <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={applicationData.phone}
                                    onChange={handleApplicationInputChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                  />
                                </div>
                              </div>
                            </fieldset>
                            {/* Address */}
                            <fieldset className="mb-6">
                              <legend className="text-xl font-semibold text-gray-700 mb-3">
                                Address
                              </legend>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  name="street"
                                  placeholder="Street"
                                  value={applicationData.street}
                                  onChange={handleApplicationInputChange}
                                  className="w-full px-4 py-2 border rounded-lg md:col-span-2"
                                />
                                <input
                                  type="text"
                                  name="city"
                                  placeholder="City"
                                  value={applicationData.city}
                                  onChange={handleApplicationInputChange}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                                <input
                                  type="text"
                                  name="zip"
                                  placeholder="ZIP Code"
                                  value={applicationData.zip}
                                  onChange={handleApplicationInputChange}
                                  className="w-full px-4 py-2 border rounded-lg"
                                />
                              </div>
                            </fieldset>
                            {/* Preferences */}
                            <fieldset className="mb-6">
                              <legend className="text-xl font-semibold text-gray-700 mb-3">
                                Preferences
                              </legend>
                              <textarea
                                name="preferences"
                                placeholder="e.g., High floor, Quiet room"
                                value={applicationData.preferences}
                                onChange={handleApplicationInputChange}
                                className="w-full px-4 py-2 border rounded-lg h-24"
                              ></textarea>
                            </fieldset>
                            {/* ID Verification */}
                            <fieldset>
                              <legend className="text-xl font-semibold text-gray-700 mb-3">
                                ID Verification
                              </legend>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <select
                                  name="idType"
                                  value={applicationData.idType}
                                  onChange={handleApplicationInputChange}
                                  className="w-full px-4 py-2 border rounded-lg bg-white"
                                >
                                  <option value="Aadhar Card">
                                    Aadhar Card
                                  </option>
                                  <option value="Passport">Passport</option>
                                  <option value="Driver's License">
                                    Driver's License
                                  </option>
                                </select>
                                <label
                                  htmlFor="file-upload"
                                  className="w-full flex flex-col items-center justify-center px-4 py-6 bg-gray-50 text-gray-600 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100"
                                >
                                  <UploadCloudIcon />
                                  <span className="mt-2 text-base leading-normal">
                                    {applicationData.document
                                      ? applicationData.document.name
                                      : "Upload a file"}
                                  </span>
                                  <input
                                    id="file-upload"
                                    name="document"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                            </fieldset>

                            <div className="mt-8 flex justify-end gap-4">
                              <motion.button
                                type="button"
                                onClick={() => setIsApplicationFormOpen(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="font-bold py-2 px-6 rounded-lg bg-gray-200 text-gray-800"
                              >
                                Cancel
                              </motion.button>
                              <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={bookingStatus === "confirming"}
                                className={`font-bold py-2 px-6 rounded-lg text-white ${
                                  bookingStatus === "confirming"
                                    ? "bg-yellow-500 cursor-wait"
                                    : "bg-green-500 hover:bg-green-600"
                                }`}
                              >
                                {bookingStatus === "confirming"
                                  ? "Submitting..."
                                  : "Submit Application"}
                              </motion.button>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* --- Booking Details Modal (Blurred Background) --- */}
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{
                        scale: 1,
                        y: 0,
                        filter: isApplicationFormOpen
                          ? "blur(8px)"
                          : "blur(0px)",
                      }}
                      exit={{ scale: 0.9, y: 20, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
                      onClick={(e) => {
                        if (isApplicationFormOpen) return;
                        e.stopPropagation();
                      }}
                    >
                      <img
                        src={selectedRoom.imageUrl}
                        alt={selectedRoom.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {selectedRoom.name}
                        </h2>
                        <p className="text-gray-600 mb-6">
                          {selectedRoom.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-gray-700 mb-6">
                          <span className="flex items-center space-x-2">
                            <NewBedIcon />{" "}
                            <span>
                              {selectedRoom.beds} Bed
                              {selectedRoom.beds > 1 ? "s" : ""}
                            </span>
                          </span>
                          {selectedRoom.features.includes("wifi") && (
                            <span className="flex items-center space-x-2">
                              <WifiIcon /> <span>Wi-Fi Included</span>
                            </span>
                          )}
                          {selectedRoom.features.includes("ac") && (
                            <span className="flex items-center space-x-2">
                              <AcIcon /> <span>Air Conditioned</span>
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                          <p className="text-3xl font-extrabold text-indigo-600">
                            ₹{selectedRoom.price}
                            <span className="text-base font-medium text-gray-500">
                              /month
                            </span>
                          </p>
                          <motion.button
                            onClick={handleFinalBooking}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="font-bold py-3 px-8 rounded-lg transition-colors text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Book Now
                          </motion.button>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedRoom(null)}
                        className="absolute top-4 right-4 p-2 rounded-full text-gray-600 bg-white/70 hover:bg-white transition"
                      >
                        <CloseIcon />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* --- Booking Confirmation Toast --- */}
              <AnimatePresence>
                {bookingStatus === "confirmed" && (
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.5 }}
                    className="fixed bottom-10 right-10 z-50 bg-green-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-3"
                  >
                    <CheckIcon />
                    <span className="font-semibold">Applied Successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* --- Room Cards Grid --- */}
              <AnimatePresence>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <motion.div
                        key={room.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -50 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group"
                      >
                        <div className="overflow-hidden">
                          <motion.img
                            src={room.imageUrl}
                            alt={room.name}
                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+Error";
                            }}
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {room.name}
                          </h2>
                          <p className="text-gray-600 mb-4 flex-grow">
                            {room.description}
                          </p>

                          <div className="flex items-center space-x-4 text-gray-500 mb-4">
                            <span className="flex items-center space-x-1">
                              <NewBedIcon />{" "}
                              <span>
                                {room.beds} Bed{room.beds > 1 ? "s" : ""}
                              </span>
                            </span>
                            {room.features.includes("wifi") && (
                              <span className="flex items-center space-x-1">
                                <WifiIcon /> <span>Wi-Fi</span>
                              </span>
                            )}
                            {room.features.includes("ac") && (
                              <span className="flex items-center space-x-1">
                                <AcIcon /> <span>AC</span>
                              </span>
                            )}
                          </div>

                          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                            <p className="text-2xl font-extrabold text-indigo-600">
                              ₹{room.price}
                              <span className="text-sm font-medium text-gray-500">
                                /month
                              </span>
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedRoom(room)}
                              className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300"
                            >
                              Apply
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="md:col-span-2 lg:col-span-3 text-center py-16"
                    >
                      <p className="text-xl text-gray-500">
                        No rooms match your criteria. Try adjusting your
                        filters!
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <motion.footer
        className="bg-black text-gray-400 py-16 px-4 sm:px-6 lg:px-8 font-sans"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            {/* Column 1: Brand */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <h3 className="text-lg font-bold text-white tracking-widest">
                HOSTELLITE
              </h3>
              <p className="mt-2 text-xs tracking-wider uppercase">
                YOUR ADVENTURE AWAITS
              </p>
            </motion.div>

            {/* Column 2: Company */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h4 className="font-bold text-lg tracking-wider text-white uppercase">
                COMPANY
              </h4>
              <ul className="space-y-3">
                <li>
                  <motion.a href="/home#features" whileHover={linkHover}>
                    ABOUT US
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/home#how-it-works" whileHover={linkHover}>
                    HOW IT WORKS
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/home#ticket" whileHover={linkHover}>
                    CONTACT US
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/user-team" whileHover={linkHover}>
                    OUR TEAM
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            {/* Column 3: Customer */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h4 className="font-bold text-lg tracking-wider text-white uppercase">
                CUSTOMER
              </h4>
              <ul className="space-y-3">
                <li>
                  <motion.a href="/home#ticket" whileHover={linkHover}>
                    SUPPORT
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/rooms" whileHover={linkHover}>
                    AVAILABLE ROOMS
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/home#faqs" whileHover={linkHover}>
                    FAQs
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/home#features" whileHover={linkHover}>
                    FEATURES
                  </motion.a>
                </li>
              </ul>
            </motion.div>

            {/* Column 4: Contact Info */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h4 className="font-bold text-lg tracking-wider text-white uppercase">
                CONTACT INFO
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Mail size={16} />
                  <span>info@hostellite.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={16} />
                  <span>+123 456 7890</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>123 Event St, City, Country</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Separator Line */}
          <motion.div className="mt-16 mb-8" variants={itemVariants}>
            <motion.hr
              className="border-gray-700 origin-center"
              variants={lineVariants}
            />
          </motion.div>

          {/* Social Icons & Copyright */}
          <motion.div className="text-center" variants={itemVariants}>
            <div className="flex justify-center space-x-4 mb-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-600 transition-colors"
                  whileHover={iconHover}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} HostelLite. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
