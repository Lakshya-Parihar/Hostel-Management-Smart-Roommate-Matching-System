import React, { useState } from "react";
import axios from "axios";
import logo from "./images/hms_logo.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

// Framer Motion Variants for smooth interaction
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -20 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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

const XIcon = () => (
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
    className="lucide lucide-x"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const initialMaintenanceRequests = [
  { id: 1, request: "Leaky faucet in the bathroom.", status: "Completed" },
  { id: 2, request: "Lightbulb in room is out.", status: "In Progress" },
  { id: 3, request: "Broken chair in common area.", status: "Pending" },
];

// Form sections data matching your original field names
const formSections = [
  {
    key: "sleep",
    title: "Sleep Schedule",
    icon: "🌙",
    options: [
      { label: "Early Bird", value: "early", emoji: "🌅" },
      { label: "Night Owl", value: "late", emoji: "🦉" },
    ],
  },
  {
    key: "study",
    title: "Study Habit",
    icon: "📚",
    options: [
      { label: "Group Study", value: "group", emoji: "🧑‍🤝‍🧑" },
      { label: "Study Alone", value: "alone", emoji: "🧘" },
    ],
  },
  {
    key: "cleanliness",
    title: "Cleanliness",
    icon: "✨",
    options: [
      { label: "Tidy-ish", value: "low", emoji: "🧹" },
      { label: "Neat", value: "medium", emoji: "✨" },
      { label: "Spotless", value: "high", emoji: "🌟" },
    ],
  },
  {
    key: "food",
    title: "Food Preference",
    icon: "🍽️",
    options: [
      { label: "Vegetarian", value: "veg", emoji: "🥦" },
      { label: "Non-Vegetarian", value: "non-veg", emoji: "🥩" },
    ],
  },
  {
    key: "noise",
    title: "Noise Tolerance",
    icon: "🎧",
    options: [
      { label: "Quiet Please", value: "low", emoji: "🤫" },
      { label: "Flexible/Noisy", value: "high", emoji: "🔊" },
    ],
  },
];

// Option Button Component with "fill from bottom" animation
const OptionButton = ({ label, emoji, isSelected, onClick }) => {
  const hoverProps = {
    scale: 1.03,
    boxShadow: "0 8px 15px rgba(100, 116, 139, 0.4)",
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  const fillVariants = {
    unselected: { height: "0%" },
    selected: { height: "100%" },
  };

  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      whileHover={!isSelected ? hoverProps : {}}
      whileTap={{ scale: 0.98 }}
      className={`
        relative flex items-center justify-center p-4 rounded-xl cursor-pointer 
        font-medium w-full overflow-hidden border-2
        transition-all duration-300 ease-in-out
        ${
          isSelected
            ? "border-blue-500 ring-4 ring-blue-200 shadow-xl"
            : "bg-white border-gray-200 hover:border-blue-400"
        }
      `}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-blue-600 z-0"
        variants={fillVariants}
        initial="unselected"
        animate={isSelected ? "selected" : "unselected"}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
      <div className="relative z-10 flex items-center justify-center">
        <span className="text-2xl mr-2">{emoji}</span>
        <span
          className={`transition-colors duration-300 ${
            isSelected ? "text-white" : "text-gray-800"
          }`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
};

// Preference Section Component
const PreferenceSection = ({
  icon,
  title,
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            emoji={option.emoji}
            isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Summary screen after submission - UPDATED WITH GO BACK BUTTON
const SubmissionSummary = ({ preferences, onGoBack }) => {
  const summaryItems = Object.keys(preferences)
    .map((key) => {
      if (key === "hobbies" || key === "student_id") return null;

      const section = formSections.find((s) => s.key === key);
      if (!section) return null;

      const option = section.options.find((o) => o.value === preferences[key]);
      return {
        title: section.title,
        icon: section.icon,
        selection: `${option.emoji} ${option.label}`,
      };
    })
    .filter((item) => item !== null);

  return (
    <motion.div
      key="summary"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-green-500">
          Thank You! ✅
        </h2>
        <p className="text-gray-600 mt-2">
          Your preferences have been saved. Here's a summary:
        </p>
      </div>

      <div className="space-y-4">
        {summaryItems.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
          >
            <div className="flex items-center font-semibold text-gray-700">
              <span className="text-xl mr-3">{item.icon}</span>
              {item.title}
            </div>
            <div className="font-bold text-gray-900 bg-gray-200 px-3 py-1 rounded-full text-sm">
              {item.selection}
            </div>
          </motion.div>
        ))}
        {preferences.hobbies && (
          <motion.div
            variants={itemVariants}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
          >
            <div className="flex items-center font-semibold text-gray-700">
              <span className="text-xl mr-3">🎯</span>
              Hobbies / Interests
            </div>
            <div className="font-bold text-gray-900 bg-gray-200 px-3 py-1 rounded-full text-sm max-w-xs truncate">
              {preferences.hobbies}
            </div>
          </motion.div>
        )}
      </div>

      {/* UPDATED: Go Back to Main Page Button */}
      <motion.button
        className="w-full mt-8 py-3 text-lg font-bold bg-blue-600 text-white rounded-xl shadow-lg"
        whileHover={{ scale: 1.02, backgroundColor: "#2563eb" }}
        whileTap={{ scale: 0.98 }}
        onClick={onGoBack}
      >
        Go Back to Main Page
      </motion.button>
    </motion.div>
  );
};

const user = JSON.parse(localStorage.getItem("user"));

const PreferenceForm = ({ studentId, onGoBack }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_id: user?.id,
    sleep: "",
    study: "",
    cleanliness: "",
    hobbies: "",
    food: "",
    noise: "",
  });
  const [newRequest, setNewRequest] = useState("");
  const [maintenanceRequests, setMaintenanceRequests] = useState(
    initialMaintenanceRequests
  );

  const handleLogout = () => {
    // 🧹 Clear stored data
    localStorage.removeItem("user");

    // 🚫 Prevent navigating back to protected pages
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };

    // 🔄 Redirect to login/home page
    navigate("/");
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    if (newRequest.trim()) {
      const newId =
        maintenanceRequests.length > 0
          ? Math.max(...maintenanceRequests.map((req) => req.id)) + 1
          : 1;
      setMaintenanceRequests([
        ...maintenanceRequests,
        { id: newId, request: newRequest, status: "Pending" },
      ]);
      setNewRequest("");
    }
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

  const navLinks = [
    { href: "/home#features", label: "FEATURES" },
    { href: "/home#how-it-works", label: "HOW IT WORKS" },
    { href: "/preference", label: "PREFERENCES" },
    { href: "/rooms", label: "ROOMS" },
    { href: "/recommendation", label: "RECOMMENDATIONS" },
    { href: "/home#ticket", label: "TICKET" },
  ];
  const [showNotification, setShowNotification] = useState(false);
  const [showMaintenanceRequests, setShowMaintenanceRequests] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePreference = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting:", formData);
      const response = await axios.post(
        "http://localhost/HMS/backend/User/add_preferences.php",
        formData
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Error submitting preferences. Please try again.");
    }
  };

  // Handle going back to main page
  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack(); // Use the prop if provided
    } else {
      // Default behavior - you can customize this
      window.location.href = "/home"; // Redirect to home page
      // Or use navigate if you're using React Router:
      // navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 justify-center items-center font-sans bg-gradient-to-br from-blue-50 via-white to-blue-50">
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
                <span className="hover-underline-animation">{item.label}</span>
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

      <main className="pt-10">
        {/* Maintenance Requests Pop-up */}
        <AnimatePresence>
          {showMaintenanceRequests && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={popupVariants}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
            >
              <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 md:w-1/2 lg:w-1/3 relative">
                <button
                  onClick={() => setShowMaintenanceRequests(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  <XIcon />
                </button>
                <h4 className="text-2xl font-bold mb-6 text-center">
                  Your Maintenance Requests
                </h4>

                {/* Form to submit a new request */}
                <form onSubmit={handleAddRequest} className="mb-6 space-y-4">
                  <textarea
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Enter your maintenance request..."
                    value={newRequest}
                    onChange={(e) => setNewRequest(e.target.value)}
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                  >
                    Submit New Request
                  </button>
                </form>

                {/* List of existing requests */}
                {maintenanceRequests.length > 0 ? (
                  <ul className="space-y-4">
                    {maintenanceRequests.map((req) => (
                      <li key={req.id} className="bg-gray-100 rounded-lg p-4">
                        <p className="font-semibold mb-1">{req.request}</p>
                        <div className="flex items-center text-sm">
                          <span className="font-medium mr-2">Status:</span>
                          <span
                            className={`${
                              req.status === "Completed"
                                ? "text-green-500"
                                : req.status === "In Progress"
                                ? "text-yellow-500"
                                : "text-gray-500"
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center">
                    You have no maintenance requests.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preference Form */}
        <div className="w-full max-w-2xl mx-auto my-10 px-4">
          {/* Header */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-8 pt-4 pb-6"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700">
              ROOMMATE PREFERENCES{" "}
              <span role="img" aria-label="home">
                🏠
              </span>
            </h1>
            <p className="text-gray-500 mt-1">
              Help us find your perfect match by setting your living
              preferences.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
              >
                {formSections.map((section) => (
                  <PreferenceSection
                    key={section.key}
                    icon={section.icon}
                    title={section.title}
                    options={section.options}
                    selectedValue={formData[section.key]}
                    onSelect={(value) => updatePreference(section.key, value)}
                  />
                ))}

                {/* Hobbies / Interests - Text Input */}
                <motion.div
                  variants={itemVariants}
                  className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Hobbies / Interests
                  </h3>
                  <input
                    type="text"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    placeholder="e.g., gaming, reading, running, cooking"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Separate multiple hobbies with commas
                  </p>
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full py-4 text-xl font-bold bg-green-600 text-white rounded-xl shadow-lg mt-6"
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "#16a34a",
                    boxShadow: "0 15px 25px rgba(22, 163, 74, 0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Submit Preferences
                </motion.button>
              </motion.form>
            ) : (
              <SubmissionSummary
                preferences={formData}
                onGoBack={handleGoBack}
              />
            )}
          </AnimatePresence>
        </div>
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
};

export default PreferenceForm;
