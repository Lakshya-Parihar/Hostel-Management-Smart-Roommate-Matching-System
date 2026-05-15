-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2025 at 03:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hostel_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`) VALUES
(1, 'Admin', 'admin@gmail.com', 'admin123'),
(2, 'Test1', 'test1@gmail.com', 'test123');

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `street` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `preferences` text DEFAULT NULL,
  `document_type` enum('aadhar','passport','driving_license','other') NOT NULL,
  `document_file` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `name`, `email`, `phone`, `street`, `city`, `zip_code`, `preferences`, `document_type`, `document_file`, `user_id`, `room_id`, `status`) VALUES
(4, 'Lakshya Parihar', 'lakshyaparihar36@gmail.com', '9023367397', 'Mansarovar Road', 'Ahmedabad', '382424', 'No Noise', 'aadhar', 'uploads/documents/1760299564_CS_Awareness_Poster_2404070100003_LakshyaParihar.jpg', 1, 2, 'approved'),
(6, 'Lakshya Parihar', 'lakshyaparihar36@gmail.com', '9023367397', 'Mansarovar Road', 'Ahmedabad', '382424', 'Kal', 'aadhar', 'uploads/documents/1760334352_test (1).sql', 1, 2, 'rejected'),
(8, 'Arjun Acharya', 'arjun@gmail.com', '1234567890', 'Jantanagar', 'Chandkheda', '382424', 'Quiet room', 'driving_license', 'uploads/documents/1761590846_miles-morales-spider-man-into-the-spider-verse-5k-8k-black-3840x2160-672.jpg', 3, 5, 'pending'),
(9, 'Suraj Vishvakarma', 'suraj@gmail.com', '1234567890', 'Narol', 'Narol', '382405', 'Cleanliness', 'passport', 'uploads/documents/1761592585_pexels-bess-hamiti-83687-36487.jpg', 4, 10, 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL,
  `inquiry_type` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `organization` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`id`, `inquiry_type`, `first_name`, `last_name`, `email`, `phone_number`, `organization`, `message`, `submission_date`, `status`) VALUES
(1, 'General Inquiry', 'Lakshya', 'Parihar', 'lakshyaparihar36@gmail.com', '09023367397', 'asdad', 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq', '2025-10-10 21:39:42', 'pending'),
(2, 'Support', 'Lakshya', 'Parihar', 'lakshyaparihar36@gmail.com', '09023367397', 'ABCSEESFSD', 'sdfh;sdf;dsif odf oeifoeid eiuf e9 uew9u f', '2025-10-10 21:45:26', 'pending'),
(3, 'General Inquiry', 'dsd', 'asda', 'lakshyaparihar36@gmail.com', '0987654321', 'asd', 'ssss fgsdjnf eiweur w weyr weyr w8ye  AOSEYFDHALISD', '2025-10-11 17:01:37', 'resolved'),
(4, 'General Inquiry', 'Test1', 'User', 'test1@gmail.com', '09876543210', 'Sunshine Boys Hostel', 'dsfdsf dsfds fs garg arg', '2025-10-12 17:53:57', 'pending'),
(5, 'General Inquiry', 'Lala', 'Bihar', 'lala@gmail.com', '1234567890', 'DreamStay Hostel', 'Contact', '2025-10-12 18:15:15', 'resolved'),
(6, 'Billing Question', 'Test1', 'User', 'test1@gmail.com', '09876543210', 'Sunshine Boys Hostel', 'How does the payment process works?', '2025-10-12 18:54:31', 'pending'),
(7, 'General Inquiry', 'Test1', 'User', 'test1@gmail.com', '09876543210', 'Sunshine Boys Hostel', 'sda re re  grrrrrrr ret ewrt ewrtwert wertwe', '2025-10-12 18:59:39', 'pending'),
(8, 'Technical Support', 'Suraj', 'Bihar', 'suraj@gmail.com', '987654321', 'Silver Oak Hostel', 'Paisa wapas deo saara.', '2025-10-12 19:01:38', 'pending'),
(9, 'Billing Question', 'Arjun', 'Acharya', 'arjun@gmail.com', '911234567890', 'Sunshine Boys Hostel', 'Need a callback.', '2025-10-29 18:26:49', 'resolved'),
(10, 'Technical Support', 'Suraj', 'Vishvakarma', 'suraj@gmail.com', '01234567890', 'Sunshine Boys Hostel', 'Not good', '2025-10-29 18:37:13', 'resolved');

-- --------------------------------------------------------

--
-- Table structure for table `hostels`
--

CREATE TABLE `hostels` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `total_rooms` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hostels`
--

INSERT INTO `hostels` (`id`, `name`, `total_rooms`) VALUES
(1, 'Sunshine Boys Hostel', 30),
(2, 'GreenLeaf Hostel', 15),
(3, 'BlueMoon Hostel', 10),
(4, 'Sunrise Girls Hostel', 25),
(5, 'DreamStay Hostel', 10),
(6, 'MetroView Hostel', 15),
(7, 'CityHeights Hostel', 20),
(8, 'ComfortStay Hostel', 25),
(9, 'GreenNest Hostel', 15),
(10, 'EliteStay Hostel', 15),
(11, 'LakeView Hostel', 10),
(12, 'UrbanNest Hostel', 25),
(13, 'BrightHome Hostel', 5),
(14, 'RoyalStay Hostel', 7),
(15, 'GreenHeaven Hostel', 5),
(17, 'The Fountain', 50);

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE `preferences` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `sleep` enum('early','late') DEFAULT NULL,
  `study` enum('group','alone') DEFAULT NULL,
  `cleanliness` enum('low','medium','high') DEFAULT NULL,
  `hobbies` varchar(255) DEFAULT NULL,
  `food` enum('veg','non-veg') DEFAULT NULL,
  `noise` enum('low','high') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `preferences`
--

INSERT INTO `preferences` (`id`, `student_id`, `sleep`, `study`, `cleanliness`, `hobbies`, `food`, `noise`) VALUES
(1, 1, 'late', 'alone', 'medium', 'gaming, reading', 'veg', 'high'),
(2, 2, 'early', 'group', 'medium', 'gaming', 'veg', 'low'),
(3, 3, 'late', 'group', 'high', 'gaming, eating, running', 'non-veg', 'high');

-- --------------------------------------------------------

--
-- Table structure for table `roommate_requests`
--

CREATE TABLE `roommate_requests` (
  `id` int(11) NOT NULL,
  `requester_id` int(11) DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `hostel_id` int(11) DEFAULT NULL,
  `room_number` varchar(50) NOT NULL,
  `beds` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `capacity` int(11) DEFAULT 2,
  `status` enum('available','occupied') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `hostel_id`, `room_number`, `beds`, `price`, `description`, `features`, `image`, `created_at`, `capacity`, `status`) VALUES
(1, 1, '101', 2, 4200.00, 'Spacious non-AC room with 2 beds, perfect for budget students.', '{\"wifi\":true,\"ac\":false}', '/backend/uploads/1.jpg', '2025-10-09 07:25:55', 2, 'available'),
(2, 2, 'R21760105499', 1, 6500.00, 'Premium single AC room with attached bathroom and study table.', '{\"wifi\":true,\"ac\":true}', 'uploads/2.jpg', '2025-10-10 14:11:39', 1, 'available'),
(3, 3, 'R31760105660', 3, 3800.00, 'Comfortable triple-sharing room with balcony view and fast WiFi.', '{\"wifi\":true,\"ac\":false}', '/uploads/room_68fe837414d365.33605534.jpg', '2025-10-10 14:14:20', 3, 'available'),
(4, 4, 'R41760105683', 2, 5000.00, 'Air-conditioned 2-bed room with private lockers and study space.', '{\"wifi\":false,\"ac\":true}', '/uploads/room_68ff05afc76891.71480294.jpg', '2025-10-10 14:14:43', 2, 'available'),
(5, 5, 'R51760105705', 1, 7200.00, 'Single luxury room with both WiFi and AC, best for working professionals.', '{\"wifi\":true,\"ac\":true}', '/uploads/room_68fe8519b63d82.72677952.jpg', '2025-10-10 14:15:05', 1, 'available'),
(6, 6, 'R61760105730', 2, 5600.00, 'Bright 2-bed room near metro station with AC and WiFi facilities.', '{\"wifi\":true,\"ac\":true}', '/uploads/room_68ff063c17c8a5.84349168.jpg', '2025-10-10 14:15:30', 2, 'available'),
(8, 10, 'R101760105823', 1, 7800.00, 'Premium single occupancy AC room with private workspace and balcony.', '{\"wifi\":true,\"ac\":true}', '/uploads/room_68ff06066b0c54.06489429.jpg', '2025-10-10 14:17:03', 1, 'available'),
(9, 7, 'R71760105848', 2, 4700.00, 'Spacious shared room with WiFi, large windows, and comfortable beds.', '{\"wifi\":true,\"ac\":false}', '/uploads/room_68ff05bf8001d0.09037908.jpeg', '2025-10-10 14:17:28', 2, 'available'),
(10, 8, 'R81760105876', 3, 5200.00, 'Well-furnished triple room with WiFi, AC, and attached washroom.', '{\"wifi\":true,\"ac\":true}', '/uploads/room_68ff0650a12960.61576480.jpeg', '2025-10-10 14:17:56', 3, 'available'),
(11, 11, 'R111760106129', 2, 6000.00, 'Peaceful 2-bed AC room overlooking the lake, perfect for relaxing and studying.', '{\"wifi\":true,\"ac\":true}', '/uploads/room_68ff0613697279.88592936.jpg', '2025-10-10 14:22:09', 2, 'available'),
(12, 12, 'R121760106155', 1, 4800.00, 'Single-bed non-AC room with fast WiFi and modern furniture near the city center.', '{\"wifi\":true,\"ac\":false}', '/uploads/room_68ff05ce5fb3d5.34099350.jpeg', '2025-10-10 14:22:35', 1, 'available'),
(13, 13, 'R131760106176', 3, 5300.00, 'Triple-sharing AC room with a balcony and common kitchen access.', '{\"wifi\":false,\"ac\":true}', '/uploads/room_68ff05f9663118.10074307.jpg', '2025-10-10 14:22:56', 3, 'available'),
(14, 14, 'R141760106197', 1, 8200.00, 'Luxurious single AC room with smart TV, high-speed WiFi, and attached washroom.', '{\"wifi\":true,\"ac\":true}', '/uploads/room_68ff062605bb53.78204160.jpeg', '2025-10-10 14:23:17', 1, 'available'),
(15, 15, 'R151760106219', 2, 4500.00, 'Eco-friendly shared room surrounded by greenery, includes WiFi and lockers.', '{\"wifi\":true,\"ac\":false}', '/uploads/room_68ff05e24110f5.81624780.jpg', '2025-10-10 14:23:39', 2, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `inquiry_type` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(30) NOT NULL,
  `organization` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `user_id`, `inquiry_type`, `first_name`, `last_name`, `email`, `phone_number`, `organization`, `message`, `created_at`, `status`) VALUES
(3, 1, 'General Inquiry', 'Lakshya', 'Parihar', 'lakshyaparihar36@gmail.com', '9023367397', 'Sunshine Boys Hostel', 'I want to know more about this hostel.', '2025-10-11 16:37:44', 'resolved'),
(4, 1, 'General Inquiry', 'Lakshya', 'Parihar', 'lakshyaparihar36@gmail.com', '9023367397', 'GreenLeaf Hostel', 'I also want to know more about GreenLeaf Hostel.', '2025-10-11 16:44:18', 'pending'),
(5, 1, 'General Inquiry', 'Lakshya', 'Parihar', 'lakshyaparihar36@gmail.com', '9023367397', 'BlueMoon Hostel', 'I want to know more about BlueMoon Hostel.', '2025-10-11 16:46:42', 'pending'),
(6, 3, 'Feedback', 'Arjun', 'Acharya', 'arjun@gmail.com', '01234567890', 'Sunshine Boys Hostel', 'good', '2025-10-29 18:35:19', 'pending'),
(8, 3, 'Billing Question', 'Arjun', 'Acharya', 'arjun@gmail.com', '01234567890', 'Sunshine Boys Hostel', 'i want refund.', '2025-10-29 18:45:56', 'pending'),
(12, 3, 'General Inquiry', 'Arjun', 'Acharya', 'arjun@gmail.com', '01234567890', 'Sunshine Boys Hostel', 'change hostel.', '2025-10-29 18:58:11', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `role` enum('student','admin') DEFAULT 'student'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `gender`, `email`, `password`, `phone`, `city`, `state`, `role`) VALUES
(1, 'Lakshya Parihar', 'Male', 'lakshyaparihar36@gmail.com', '$2y$10$UkNxGvlJmBkPRHbMLFAJGuvGTNwGzUQ7itq0RGJ5/KcnV8nAXu0nm', '9023367397', 'Ahmedabad', 'Gujarat', 'student'),
(2, 'Test1', 'Male', 'test1@gmail.com', '$2y$10$0dJyzSFSKK0fr8GZ8anhEO6fV5j8h.Qo3ac18yU49uv/IYnoCKgrC', '09876543210', 'Ahmedabad', 'Gujarat', 'student'),
(3, 'arjun', 'Male', 'arjun@gmail.com', '$2y$10$zp.1bxjOeiJkbEpRPTdv0uXJgLLuPKKL.76FTvi.9qWFt3.eWM/C.', '9999998888', 'Kerala', 'Kerala', 'student'),
(4, 'Suraj Vishvakarma', 'Male', 'suraj@gmail.com', '$2y$10$xVhjQLLoitoBGyCJhudlJ.oKCyFa82s0rKHjZEeMtMRFQH1wsDXu6', '1234567890', 'Ayodhya', 'Uttar Pradesh', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_applications_user_id` (`user_id`),
  ADD KEY `fk_applications_room_id` (`room_id`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hostels`
--
ALTER TABLE `hostels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `roommate_requests`
--
ALTER TABLE `roommate_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requester_id` (`requester_id`),
  ADD KEY `target_id` (`target_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hostel_room` (`hostel_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `hostels`
--
ALTER TABLE `hostels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `preferences`
--
ALTER TABLE `preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roommate_requests`
--
ALTER TABLE `roommate_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_applications_room_id` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_applications_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `preferences`
--
ALTER TABLE `preferences`
  ADD CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `roommate_requests`
--
ALTER TABLE `roommate_requests`
  ADD CONSTRAINT `roommate_requests_ibfk_1` FOREIGN KEY (`requester_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `roommate_requests_ibfk_2` FOREIGN KEY (`target_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_hostel_room` FOREIGN KEY (`hostel_id`) REFERENCES `hostels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`hostel_id`) REFERENCES `hostels` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
