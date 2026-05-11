import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
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
// import Link from "next/link";
import logo from "../Users/images/hms_logo.jpg";
import suraj from "../Images/suraj-img.jpg";
import arjun from "../Images/arjun-img.png";
import lakshya from "../Images/lakshya-img.png";

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

const Team = () => {

    const navLinks = [
    { href: "/main#features", label: "FEATURES" },
    { href: "/main#how-it-works", label: "HOW IT WORKS" },
    { href: "/login", label: "PREFERENCES" },
    { href: "/main#rooms", label: "ROOMS" },
    { href: "/main#contact", label: "CONTACT" },
  ];

    const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

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

  return (
    <div className="min-h-screen mt-12 flex flex-col bg-white">
      {/* Navbar */}
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-black text-white border-b border-white/10 shadow-lg"
        >
          <div className="flex h-16 px-4 sm:px-8 py-4 md:h-20 items-center justify-between mx-auto">
            {/* Brand */}
            <a href="/" className="inline-flex items-center gap-3 group">
              <img
                src={logo}
                alt="Hostellite Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover"
              />
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
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
                  className="relative text-sm font-semibold tracking-wide text-gray-200 transition-colors duration-300 hover:text-white"
                >
                  <span className="hover-underline-animation">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="ml-auto md:ml-0 flex items-center gap-3">
              <Link to="/login">
                <button
                  aria-label="Profile"
                  className="p-2 rounded-full text-white ring-1 ring-white/10 hover:ring-fuchsia-400/50 transition-all hover:text-fuchsia-400"
                >
                  <UserCircleIcon className="h-6 w-6" />
                </button>
              </Link>
              <Link to="/login">
                <button className="inline-flex items-center px-4 py-2 rounded-xl text-white bg-white/5 ring-1 ring-white/20 hover:bg-white/10 hover:scale-105 shadow-lg transition-all font-semibold text-sm">
                  LOGIN
                </button>
              </Link>
              <Link to="/register">
                <button className="inline-flex items-center px-4 py-2 rounded-xl text-white bg-white/5 ring-1 ring-white/20 hover:bg-white/10 hover:scale-105 shadow-lg transition-all font-semibold text-sm">
                  REGISTER
                </button>
              </Link>
            </div>
          </div>
        </motion.header>

      {/* Main Content OurTeam */}
      <div className="min-h-screen bg-[#f5f4fa] flex flex-col items-center justify-start relative overflow-hidden px-4">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left w-full max-w-6xl mt-10 mb-14"
        >
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Build your <br /> dream team today.
          </h1>
          <p className="text-gray-600 mt-2 max-w-md">
            Unlock success with our handpicked dream team of experts. Hire now
            for unparalleled results.
          </p>
          <Link
            to={"/main#contact"}
            className="inline-block mt-3 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Hiring? Book a call
          </Link>
        </motion.div>

        {/* Grid Layout */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Mike Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 col-span-2 flex flex-col items-center text-center"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            viewport={{ once: true }}
          >
            <img
              src={suraj}
              alt="Suraj"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Suraj</h3>
            <p className="text-gray-500 text-sm">Frontend Dev</p>
          </motion.div>

          {/* Quick and Adaptable */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-green-100 rounded-xl shadow-md p-6"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold">Quick and adaptable</h4>
            <p className="text-sm text-gray-700 mt-2">
              Hire within a mere 72 hours. Easily adjust your team from month to
              month as required.
            </p>
          </motion.div>

          {/* Latisha Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            viewport={{ once: true }}
          >
            <img
              src={arjun}
              alt="arjun"
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">Arjun</h3>
            <p className="text-gray-500 text-sm">UI/UX </p>
          </motion.div>

          {/* Remote Talent Pool */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-purple-200 rounded-xl shadow-md p-6 col-span-2"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-2">Remote Talent Pool</h4>
            <p className="text-sm text-gray-700">
              Pre-vetted remote developers, designers, and product managers with
              world-class technical and communication skills.
            </p>
          </motion.div>

          {/* Asger Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            viewport={{ once: true }}
          >
            <img
              src={lakshya}
              alt="lakshya"
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">Lakshya</h3>
            <p className="text-gray-500 text-sm">Backend Dev</p>
          </motion.div>

          {/* No Fees Block */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-orange-200 rounded-xl shadow-md p-6"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            viewport={{ once: true }}
          >
            <h4 className="text-md font-semibold mb-2">Rest assured,</h4>
            <p className="text-sm text-gray-700">
              there are no crazy fees or legal hassle to worry about.
            </p>
          </motion.div>
        </div>
      </div>

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
                  <motion.a href="/main#features" whileHover={linkHover}>
                    ABOUT US
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/main#how-it-works" whileHover={linkHover}>
                    HOW IT WORKS
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/main#contact" whileHover={linkHover}>
                    CONTACT US
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/team" whileHover={linkHover}>
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
                  <motion.a href="/main#contact" whileHover={linkHover}>
                    SUPPORT
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/main#rooms" whileHover={linkHover}>
                    AVAILABLE ROOMS
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/main#faqs" whileHover={linkHover}>
                    FAQs
                  </motion.a>
                </li>
                <li>
                  <motion.a href="/main#features" whileHover={linkHover}>
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

export default Team;
