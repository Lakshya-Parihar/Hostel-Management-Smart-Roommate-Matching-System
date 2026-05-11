<?php
// addRooms.php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Enable error reporting (for debugging)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database credentials
include "../config.php";

// Connect to database
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Check if form data is sent
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Extract and sanitize fields
    $hostelName = $conn->real_escape_string(trim($_POST['hostelName'] ?? ''));
    $beds = intval($_POST['beds'] ?? 1);
    $price = floatval($_POST['monthlyPrice'] ?? 0);
    $description = $conn->real_escape_string(trim($_POST['description'] ?? ''));
    $status = strtolower(trim($_POST['status'] ?? 'available'));
    $features = $conn->real_escape_string($_POST['facilities'] ?? '[]');

    // Basic validation
    if (empty($hostelName) || $beds < 1 || $price <= 0) {
        http_response_code(400);
        echo json_encode(["error" => "Required fields missing or invalid"]);
        exit;
    }

    // Get hostel_id from hostelName
    $sqlHostel = "SELECT id FROM hostels WHERE name='$hostelName' LIMIT 1";
    $result = $conn->query($sqlHostel);
    if ($result->num_rows == 0) {
        http_response_code(404);
        echo json_encode(["error" => "Hostel not found"]);
        exit;
    }
    $hostel = $result->fetch_assoc();
    $hostel_id = $hostel['id'];

    // Generate room_number automatically (e.g., HostelID + timestamp)
    $room_number = "R" . $hostel_id . time();

    // Handle image upload if exists
    $image_name = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $uploadDir = "../uploads/"; // Make sure this folder exists and is writable
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $image_name = "room_" . $room_number . "_" . time() . "." . $ext;
        $targetFile = $uploadDir . $image_name;

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to upload image"]);
            exit;
        }
    }

    // Insert room into rooms table
    $sqlInsert = "
        INSERT INTO rooms (hostel_id, room_number, beds, capacity, price, description, status, features, image)
        VALUES ('$hostel_id', '$room_number', '$beds', '$beds', '$price', '$description', '$status', '$features', '$image_name')
    ";

    if ($conn->query($sqlInsert) === TRUE) {
        echo json_encode([
            "success" => true,
            "message" => "Room added successfully",
            "room_number" => $room_number,
            "image" => $image_name
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $conn->error]);
    }

    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
