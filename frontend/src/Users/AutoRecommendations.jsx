// import React, { useEffect, useState } from "react";
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
import logo from "./images/hms_logo.jpg";
import "./Styles/Main.css";

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

// Combined: real-data fetching + glassmorphism UI preview
// - Uses your backend API to fetch recommendations
// - Renders the glassmorphism UI with animations and optimized progress bar
// - Confirm button toggles local state; there's a commented place to call backend to persist

const API_URL = "http://localhost/HMS/backend/allocate_room.php"; // adjust if needed
const IMAGE_BASE = "http://localhost/HMS/backend/"; // adjust if needed

const container = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, when: "beforeChildren" },
  },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
};

function getLoggedInUserId() {
  const raw = localStorage.getItem("user");
  if (raw) {
    try {
      const obj = JSON.parse(raw);
      if (obj && obj.id) return obj.id;
    } catch (e) {
      console.error("Failed to parse localStorage.user", e);
    }
  }
  return (
    localStorage.getItem("user_id") ||
    localStorage.getItem("userId") ||
    localStorage.getItem("id") ||
    null
  );
}

export default function AutoRecommendations({ showHeader = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [showMaintenanceRequests, setShowMaintenanceRequests] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [confirmedRoomId, setConfirmedRoomId] = useState(null);
  const userId = getLoggedInUserId();

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    if (!userId) {
      setError("Not logged in — please sign in to see recommendations.");
      setLoading(false);
      return;
    }
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchRecommendations = async () => {
    setError("");
    setLoading(true);
    try {
      const payload = {
        student_id: Number(userId),
        application_id: null,
        budget: null,
      };
      const res = await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data?.suggestions && Array.isArray(res.data.suggestions)) {
        // normalize: ensure features is object and image path exists
        const normalized = res.data.suggestions.map((r) => ({
          ...r,
          features:
            typeof r.features === "string" && r.features.length
              ? safeJsonParse(r.features)
              : r.features || {},
          image: r.image
            ? r.image.startsWith("http")
              ? r.image
              : IMAGE_BASE + r.image
            : null,
          score: Number(r.score) || 0,
        }));
        setRooms(normalized);
      } else {
        setRooms([]);
        setError("No recommended rooms right now.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load recommendations. Try again later.");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const safeJsonParse = (s) => {
    try {
      return JSON.parse(s);
    } catch {
      return {};
    }
  };

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

  if (loading) {
    return (
      <div className="p-4 bg-white/60 backdrop-blur rounded-lg shadow-sm text-center">
        <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-2 text-sm text-slate-600">Loading recommendations…</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-yellow-800">
        You are not logged in. Please sign in to see room recommendations.
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm text-sm text-slate-600">
        No recommended rooms available right now.
      </div>
    );
  }

  const top = rooms[0];
  const roomLabel = (r) =>
    r.room_number ? `Room ${r.room_number}` : `Room #${r.room_id}`;

  const progressWidth = Math.max(6, Math.round((Number(top.score) || 0) * 100));

  const onConfirm = async (room) => {
    // toggle UI state
    setConfirmedRoomId((prev) => (prev === room.room_id ? null : room.room_id));

    // OPTIONAL: call backend to persist confirmation (uncomment and adjust API)
    // try {
    //   await axios.post('http://localhost/HMS/backend/confirm_allocation.php', { student_id: userId, room_id: room.room_id, application_id: null });
    // } catch (err) { console.error('Confirm API failed', err); }
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

      const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-[300px]">
      <main>
        {/* Heaader  */}
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

        {/* Recommendations  */}
        <main className="pt-5">
          <div className="min-h-screen py-20 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-6 flex items-start justify-center">
            <div className="w-full max-w-4xl">
              {showHeader && (
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      RECOMMENDED ROOMS
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Smart suggestions — based on your profile & preferences
                    </p>
                  </div>
                  <div className="text-sm text-slate-500">Auto-ranked</div>
                </div>
              )}

              {/* Top card: glassmorphism */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={item}
                whileHover={{
                  y: -6,
                  boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="relative rounded-2xl p-4 flex gap-4 items-center backdrop-blur-md bg-white/18 border border-white/20 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <div className="w-40 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50">
                  {top.image ? (
                    <motion.img
                      src={top.image}
                      alt={roomLabel(top)}
                      className="w-full h-full object-cover"
                      layoutId={`img-${top.room_id}`}
                      initial={{ scale: 1.03 }}
                      animate={{ scale: 1 }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-slate-200/90">Top match</div>
                      <div className="text-xl font-semibold text-slate-900 mt-1">
                        {roomLabel(top)}
                      </div>
                      <div className="text-sm text-slate-700 mt-1">
                        ₹{top.price} • Beds: {top.beds} • Cap: {top.capacity}
                      </div>
                    </div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className="flex flex-col items-center px-3 py-1 rounded-full"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))",
                      }}
                    >
                      <div className="text-[10px] uppercase tracking-wide text-emerald-700">
                        Score
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "easeInOut",
                        }}
                        className="text-lg font-bold text-emerald-700 mt-1"
                      >
                        {(Number(top.score) * 100).toFixed(0)}%
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 items-center">
                    <span className="px-3 py-1 bg-white/30 backdrop-blur rounded-full text-sm">
                      ₹{top.price}
                    </span>
                    <span className="px-3 py-1 bg-white/30 backdrop-blur rounded-full text-sm">
                      Beds: {top.beds}
                    </span>
                    <span className="px-3 py-1 bg-white/30 backdrop-blur rounded-full text-sm">
                      Cap: {top.capacity}
                    </span>
                    {top.features?.ac && (
                      <span className="px-3 py-1 bg-blue-50/30 rounded-full text-sm">
                        AC
                      </span>
                    )}
                    {top.features?.wifi && (
                      <span className="px-3 py-1 bg-indigo-50/30 rounded-full text-sm">
                        WiFi
                      </span>
                    )}
                  </div>

                  {/* optimized progress bar: uses percentage width with spring animation */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-slate-500">
                        Match strength
                      </div>
                      <div className="text-xs font-medium text-slate-700">
                        {(Number(top.score) * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressWidth}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 16,
                        }}
                        style={{
                          background: "linear-gradient(90deg,#34D399,#6EE7B7)",
                        }}
                      />
                    </div>

                    {/* micro ticks and labels below for context */}
                    <div className="mt-2 flex items-center text-[11px] text-slate-400 justify-between">
                      <div>Low</div>
                      <div>Medium</div>
                      <div>High</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onConfirm(top)}
                      className={`px-4 py-2 rounded-full font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-200 ${
                        confirmedRoomId === top.room_id
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "bg-white/20 text-emerald-700 border border-white/20"
                      }`}
                    >
                      {confirmedRoomId === top.room_id
                        ? "Confirmed"
                        : "Confirm"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Cards list with glass look */}
              <motion.div variants={item} className="mt-6 grid gap-3">
                {rooms.slice(1).map((r, i) => (
                  <motion.div
                    key={r.room_id}
                    variants={item}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.36 }}
                    whileHover={{
                      y: -4,
                      scale: 1.01,
                      boxShadow: "0 12px 30px rgba(2,6,23,0.10)",
                    }}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/20 backdrop-blur-md bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={r.image ? r.image : IMAGE_BASE + (r.image || "")}
                          alt={r.room_number}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {roomLabel(r)}
                        </div>
                        <div className="text-xs text-slate-700 mt-0.5">
                          ₹{r.price} • Beds: {r.beds} • Cap: {r.capacity}
                        </div>
                        <div className="mt-1 flex gap-2 text-xs text-slate-600">
                          {r.features?.ac && (
                            <span className="px-2 py-0.5 bg-white/20 rounded-full">
                              AC
                            </span>
                          )}
                          {r.features?.wifi && (
                            <span className="px-2 py-0.5 bg-white/20 rounded-full">
                              WiFi
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-500">Match</div>
                      <motion.div
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ repeat: Infinity, duration: 2.6 }}
                        className="font-bold text-slate-900"
                      >
                        {(Number(r.score) * 100).toFixed(0)}%
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
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
                &copy; {new Date().getFullYear()} HostelLite. All rights
                reserved.
              </p>
            </motion.div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
