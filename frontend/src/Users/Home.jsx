import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Rss,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import heroimg1 from "./images/hero_img_1.jpg";
import heroimg2 from "./images/hero_img_2.jpg";
import heroimg3 from "./images/hero_img_3.jpg";
import heroimg4 from "./images/hero_img_4.jpg";
import heroimg5 from "./images/hero_img_5.jpg";
import heroimg6 from "./images/hero_img_6.jpg";
import logo from "./images/hms_logo.jpg";
import "./Styles/Main.css";

// --- ICONS ---
const ChevronDownIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// A simple illustrative SVG for the header
const ContactIllustration = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 350 180"
    className="text-gray-400"
  >
    <defs>
      <linearGradient
        id="illustrationGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" style={{ stopColor: "#8B5CF6", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#D946EF", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    {/* Main building structure */}
    <path
      d="M40 160 L40 70 L100 30 L160 70 L160 160 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="65"
      y="120"
      width="30"
      height="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="60"
      y="80"
      width="40"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Person icon */}
    <circle
      cx="210"
      cy="115"
      r="15"
      fill="none"
      stroke="url(#illustrationGradient)"
      strokeWidth="2.5"
    />
    <path
      d="M185 160 C185 140, 235 140, 235 160 Z"
      fill="none"
      stroke="url(#illustrationGradient)"
      strokeWidth="2.5"
    />

    {/* Message bubble */}
    <path
      d="M250 80 C250 60, 330 60, 330 80 C330 100, 250 100, 250 80 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M280 100 L260 115"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Lines connecting elements */}
    <path
      d="M160 100 C180 80, 220 80, 240 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="4"
    />
  </svg>
);

// Icons as inline SVG for a single-file app
const BoltIcon = () => (
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
    className="lucide lucide-bolt"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="m3.27 6.77 1.28 2.55A1 1 0 0 0 5.5 10h13a1 1 0 0 0 .95-.68l1.28-2.55" />
    <path d="m12 10v12" />
    <path d="M12 10l6-4" />
    <path d="M12 10-6-4" />
  </svg>
);

const UserCheckIcon = () => (
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
    className="lucide lucide-user-check"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

const LineChartIcon = () => (
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
    className="lucide lucide-line-chart"
  >
    <path d="M3 3v18h18" />
    <path d="m18 17-6-6-6 6" />
    <path d="m12 12 6-6 4 4" />
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

//Faq Section
const PlusMinusIcon = ({ isOpen }) => {
  return (
    <motion.svg
      key="icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Vertical line of the plus icon */}
      <motion.path
        d="M10 5V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Horizontal line, rotates to form the minus */}
      <motion.path
        d="M5 10H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          rotate: isOpen ? 90 : 0,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      />
    </motion.svg>
  );
};

// --- Accordion Item Component ---
// This component represents a single question and answer in the FAQ.
const AccordionItem = ({ i, expanded, setExpanded, question, answer }) => {
  const isOpen = i === expanded;

  return (
    <motion.div
      className="border-b border-gray-200"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {/* The clickable header for the question */}
      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="flex justify-between items-center cursor-pointer py-5 px-6"
      >
        <h3 className="font-semibold text-lg text-gray-800">{question}</h3>
        <div
          className={`transition-colors duration-300 ${
            isOpen ? "text-indigo-600" : "text-gray-500"
          }`}
        >
          <PlusMinusIcon isOpen={isOpen} />
        </div>
      </motion.header>

      {/* The collapsible answer section with animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-6 px-6 text-gray-600 leading-relaxed">{answer}</p>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main App component
const App = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMaintenanceRequests, setShowMaintenanceRequests] = useState(false);
  const [newRequest, setNewRequest] = useState("");
  const [maintenanceRequests, setMaintenanceRequests] = useState(
    initialMaintenanceRequests
  );
  const images = [heroimg1, heroimg2, heroimg3, heroimg4, heroimg5, heroimg6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const features = [
    {
      title: "AI-Powered Room Allocation",
      description:
        "Our intelligent algorithm automatically allocates rooms based on customizable criteria like student preferences, academic year, and social compatibility, ensuring a perfect match every time.",
      icon: <BoltIcon />,
    },
    {
      title: "Real-Time Tracking & Analytics",
      description:
        "Gain deep insights with real-time dashboards. Monitor room occupancy, track maintenance requests, and analyze trends to optimize hostel operations with ease.",
      icon: <LineChartIcon />,
    },
    {
      title: "Student Self-Service Portal",
      description:
        "Empower students with a user-friendly portal. They can view their room details, submit maintenance requests, and even request room changes, all from their devices.",
      icon: <UserCheckIcon />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.2 } },
  };
 
  const navLinks = [
    { href: "#features", label: "FEATURES" },
    { href: "#how-it-works", label: "HOW IT WORKS" },
    { href: "/preference", label: "PREFERENCES" },
    { href: "/rooms", label: "ROOMS" },
    { href: "/recommendation", label: "RECOMMENDATIONS" },
    { href: "#ticket", label: "TICKET" },
  ];

  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    wifi: false,
    ac: false,
    nonAc: false,
    minPrice: 0,
    maxPrice: 10000,
  });

  // Fetch rooms based on filters
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.post(
          "http://localhost/HMS/backend/getRooms.php",
          filters,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, [filters]);
  const filteredRooms = rooms.filter((room) => {
    const features =
      typeof room.features === "string"
        ? JSON.parse(room.features)
        : room.features || {};

    // --- WiFi filter ---
    if (filters.wifi && !features.wifi) return false;

    // --- AC filter ---
    if (filters.ac && !features.ac) return false;

    // --- Non-AC filter ---
    if (filters.nonAc && features.ac) return false;

    // --- Price filter ---
    if (room.price > filters.maxPrice) return false;

    return true;
  });

  //footer
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

  //Contact Form
  const [formData, setFormData] = useState({
    inquiry_type: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    organization: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const key = name || id;
    setFormData((prev) => ({
      ...prev,
      [key]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Merge user_id into formData
    const dataToSend = {
      ...formData,
      user_id: user?.id,
    };

    try {
      const res = await axios.post(
        "http://localhost/HMS/backend/User/tickets.php",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setResponseMsg(res.data.message || "Form submitted successfully!");
      // Show SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        html: `
        <p class="text-gray-600">
          Thanks for reaching out, <strong>${formData.first_name}</strong>!
          <br/>Your <strong>${formData.inquiry_type}</strong> inquiry has been successfully received.
        </p>
        <p class="mt-4 text-sm text-gray-500">We aim to respond within 48 hours.</p>
      `,
        customClass: {
          confirmButton:
            "bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/25 transition-all",
        },
        buttonsStyling: false,
      });

      // Reset form after success
      setFormData({
        inquiry_type: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        organization: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMsg("There was an error submitting the form.");
      // Show error popup
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please enter details correctly!!",
        customClass: {
          confirmButton:
            "bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all",
        },
        buttonsStyling: false,
      });
    }
  };
  // Add this useEffect to auto-clear the success message
  useEffect(() => {
    if (
      responseMsg === "Form submitted successfully!" ||
      responseMsg.includes("successfully")
    ) {
      const timer = setTimeout(() => {
        setResponseMsg("");
      }, 3000); // Clear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [responseMsg]);

  // Faq Section
  const [expanded, setExpanded] = useState(false);

  // Data for the FAQ section
  const faqData = [
    {
      question: "How do I book a room?",
      answer:
        "Booking a room is simple! Just browse our available rooms, select the one you like, and click the 'Apply' button. This will open a details pop-up where you can click 'Book Now' to open the application form. Fill out the required details and submit it. You'll receive a confirmation once everything is processed.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), as well as digital payment options like PayPal and Google Pay. All transactions are securely processed through our encrypted payment gateway.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can. Our cancellation policy allows for a full refund if you cancel at least 48 hours before your scheduled check-in time. For cancellations made within 48 hours, a one-night fee will be charged.",
    },
    {
      question: "Are amenities like Wi-Fi and AC included?",
      answer:
        "Most of our rooms include complimentary high-speed Wi-Fi and air conditioning. You can check the specific features listed on each room's description card to see exactly what's included before you book.",
    },
    {
      question: "What documents are required for ID verification?",
      answer:
        "For verification, we accept government-issued photo IDs such as an Aadhar Card, Passport, or Driver's License. You will be prompted to upload a digital copy of your ID during the application process.",
    },
  ];

  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800">
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

      <main className="pt-20">
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

        {/* Hero Section with background image */}
        <main>
          {/* Hero Section with background image slider */}
          <section className="h-[84vh] relative flex items-center justify-center m-2 text-center overflow-hidden mt-1">
            <AnimatePresence>
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4"
                >
                  Where Hostel Life Meets
                  <br />
                  Comfort & Simplicity
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
                >
                  Connect with the right roommates, manage your rooms easily,
                  and enjoy a seamless hostel experience.
                </motion.p>
                <motion.a
                  variants={itemVariants}
                  href="#rooms"
                  className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 duration-300
                items-center bg-gradient-to-r from-indigo-600 to-fuchsia-600  transform hover:scale-105
              hover:from-indigo-500 hover:to-fuchsia-500 shadow-indigo-500/25
              transition-all text-md"
                >
                  EXPLORE ROOMS
                </motion.a>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                CORE FEATURES
              </h3>
              <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
                Smart roommate matching that pairs students based on
                preferences, lifestyle, and compatibility for a better living
                experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-indigo-600 mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Room Allocation Explained */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900  mb-4">
              HOW OUR AI ROOM ALLOCATION WORKS
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Our AI considers a multitude of factors to ensure an optimal and
              fair outcome for every student.
            </p>
          </div>
          <div className="container mx-2 px-4 grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3">
                    1
                  </span>
                  <span>
                    Students submit preferences for roommates,
                    hobbies/interests, sleep schedule, cleanliness preference,
                    food preference, study habit through the portal.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3">
                    2
                  </span>
                  <span>
                    The AI analyzes all submitted data, along with
                    administrative rules, to generate the most efficient and
                    satisfying allocation plan.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3">
                    3
                  </span>
                  <span>
                    Students are instantly notified of their new room and
                    roommate, and can start preparing for move-in day.
                  </span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-8 md:mt-0"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 rounded-xl shadow-lg relative"
                >
                  <div className="text-indigo-600 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-50 mb-4">
                    {features[activeFeature].icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">
                    {features[activeFeature].title}
                  </h4>
                  <p className="text-gray-600">
                    {features[activeFeature].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Room Listings Section with Filter Sidebar */}
        <section id="rooms" className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-4 flex flex-col md:flex-row">
            {/* --- Filter Sidebar (No changes needed here) --- */}
            <div className="hidden md:block w-full md:w-1/4 pr-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold mb-6">Filters</h4>
                <div className="space-y-4">
                  {/* Amenities Filter */}
                  <div>
                    <h5 className="font-semibold text-lg mb-2">Amenities</h5>
                    {/* WiFi */}
                    <label className="flex items-center space-x-2 mb-1">
                      <input
                        type="checkbox"
                        checked={filters.wifi}
                        onChange={(e) =>
                          setFilters({ ...filters, wifi: e.target.checked })
                        }
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>WiFi</span>
                    </label>
                    {/* AC */}
                    <label className="flex items-center space-x-2 mb-1">
                      <input
                        type="checkbox"
                        checked={filters.ac}
                        onChange={(e) =>
                          setFilters({ ...filters, ac: e.target.checked })
                        }
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>AC</span>
                    </label>
                    {/* Non-AC */}
                    <label className="flex items-center space-x-2 mb-1">
                      <input
                        type="checkbox"
                        checked={filters.nonAc}
                        onChange={(e) =>
                          setFilters({ ...filters, nonAc: e.target.checked })
                        }
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Non-AC</span>
                    </label>
                  </div>
                  {/* Price Range Filter */}
                  <div>
                    <h5 className="font-semibold text-lg mb-2">Price Range</h5>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          maxPrice: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm mt-1">
                      <span>₹0</span>
                      <span>₹{filters.maxPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Rooms Grid --- */}
            <div className="w-full md:w-3/4 md:pl-8 mt-8 md:mt-0 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                AVAILABLE ROOMS
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* KEY CHANGE: We now check and map 'rooms' directly */}
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h4 className="text-xl font-bold text-gray-900 mb-1">
                        {room.name}
                      </h4>
                      <p className="text-gray-600 mb-2">{room.description}</p>
                      <div className="text-xl font-bold text-indigo-600 mb-2">
                        ₹{room.price}
                        <span className="text-sm font-normal text-gray-500">
                          {" "}
                          / month
                        </span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold text-gray-600 mb-4">
                        {/* Your amenity mapping logic here is still perfect */}
                        {room.amenities.map((a) => (
                          <span
                            key={a}
                            className="bg-gray-200 px-2 py-1 rounded-lg"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                      <div className="text-center">
                        <Link to="/rooms">
                          <button
                            className="w-52 py-2 inline-block bg-indigo-600 text-white font-bold px-8 rounded-lg shadow-lg hover:bg-indigo-700 duration-300
                items-center bg-gradient-to-r from-indigo-600 to-fuchsia-600  transform hover:scale-105
              hover:from-indigo-500 hover:to-fuchsia-500 shadow-indigo-500/25
              transition-all text-lg"
                          >
                            APPLY
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center col-span-full text-gray-500">
                    No rooms match your filter criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="ticket">
          <div className="bg-white text-gray-800 min-h-screen font-sans pt-24 sm:pt-32">
            <motion.div
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* --- Top Section --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                  variants={itemVariants}
                  className="w-full max-w-md mx-auto md:max-w-none"
                >
                  <ContactIllustration />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight mb-4">
                    GET IN TOUCH
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Thanks for your interest in Hostellite. Choose from the
                    options below and we’ll connect you with the right person.
                  </p>
                  <a href="#contact-form">
                    <button className="inline-flex items-center px-6 py-3 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 hover:scale-105 shadow-lg shadow-indigo-500/25 transition-all font-semibold text-base">
                      Send a message
                    </button>
                  </a>
                </motion.div>
              </div>

              {/* --- Contact Form Section --- */}
              <motion.div id="contact-form" variants={itemVariants}>
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-3 text-center">
                    CONTACT US
                  </h2>
                  <p className="text-base text-gray-600 mb-10 text-center">
                    Please provide the following information and we’ll put you
                    in touch with the right person.
                  </p>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* --- Form Fields --- */}
                    <div className="relative">
                      <label
                        htmlFor="inquiry-type"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Inquiry Type*
                      </label>
                      <select
                        id="inquiry-type"
                        name="inquiry_type"
                        value={formData.inquiry_type}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 text-black rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                      >
                        <option>Select a value</option>
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Billing Question</option>
                        <option>Partnership</option>
                        <option>Feedback</option>
                      </select>
                      <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-4 top-11 pointer-events-none" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          First name*
                        </label>
                        <input
                          type="text"
                          id="first-name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-300 text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Last name*
                        </label>
                        <input
                          type="text"
                          id="last-name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-300 text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number (Please include country code)
                      </label>
                      <input
                        type="number"
                        id="phone"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Hostel/Organization*
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        How can we help you?*
                      </label>
                      <textarea
                        id="message"
                        rows="5"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                      ></textarea>
                    </div>

                    {/* --- Agreement & Submit --- */}
                    <div className="flex items-start text-center">
                      <input
                        id="agreement"
                        type="checkbox"
                        className="h-4 w-4 mt-1 rounded border-gray-300 bg-gray-100 text-fuchsia-600 focus:ring-fuchsia-500"
                      />
                      <div className="ml-3 text-sm">
                        <label htmlFor="agreement" className="text-gray-600">
                          I agree to the use or processing of my personal
                          information by Hostellite for the purpose of
                          fulfilling this request and in accordance with{" "}
                          <a
                            href="#"
                            className="font-medium text-fuchsia-600 hover:underline"
                          >
                            Hostellite's Privacy Statement
                          </a>
                          .
                        </label>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 hover:scale-105 shadow-lg shadow-indigo-500/25 transition-all font-semibold text-base"
                      >
                        Submit
                      </button>
                    </div>
                      {/* Success message that appears at the bottom */}
                      {responseMsg && (
                        <div
                          className={`text-center p-3 rounded-xl font-medium transition-all duration-300 ${
                            responseMsg === "Form submitted successfully!"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {responseMsg}
                        </div>
                      )}
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Faq Section */}
        <section id="faqs">
          <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-3xl">
              {/* Header section with animation */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  Frequently Asked Questions
                </h1>
                <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                  Have questions? We're here to help. Find answers to common
                  queries about HostelLite below.
                </p>
              </motion.div>

              {/* Accordion container with staggered animations for its children */}
              <motion.div
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {faqData.map((item, i) => (
                  <AccordionItem
                    key={i}
                    i={i}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </motion.div>
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
                  <motion.a href="#features" whileHover={linkHover}>
                    ABOUT US
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#how-it-works" whileHover={linkHover}>
                    HOW IT WORKS
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#ticket" whileHover={linkHover}>
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
                  <motion.a href="#ticket" whileHover={linkHover}>
                    SUPPORT
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#rooms" whileHover={linkHover}>
                    AVAILABLE ROOMS
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#faqs" whileHover={linkHover}>
                    FAQs
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#features" whileHover={linkHover}>
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

export default App;
