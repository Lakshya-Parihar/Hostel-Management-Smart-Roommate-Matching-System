<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config.php";

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get POST data
$name = $_POST['fullName'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$street = $_POST['street'] ?? '';
$city = $_POST['city'] ?? '';
$zip = $_POST['zip'] ?? '';
$preferences = $_POST['preferences'] ?? '';
$document_type = $_POST['idType'] ?? '';
$user_id = $_POST['user_id'] ?? '';   // ✅ added
$room_id = $_POST['room_id'] ?? '';
$status = "pending";                  // ✅ default value
$document = '';


// 1️⃣ Check if user already has a pending or approved application
$checkQuery = "SELECT * FROM applications WHERE user_id = ? AND status IN ('pending', 'approved')";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "You already have an active application."]);
    exit;
}

// Handle file upload
if (isset($_FILES['document']) && $_FILES['document']['error'] === 0) {
    $uploadDir = '../uploads/documents/'; // ✅ Use proper relative path
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = time() . '_' . basename($_FILES['document']['name']);
    $targetFilePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['document']['tmp_name'], $targetFilePath)) {
        $document = 'uploads/documents/' . $fileName; // ✅ Store relative path
    }
}

// SQL insert query
$sql = "INSERT INTO applications 
(name, email, phone, street, city, zip_code, preferences, document_type, document_file, user_id, room_id, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssssssssssis", // ✅ corrected: 10 strings + 2 integers
    $name,
    $email,
    $phone,
    $street,
    $city,
    $zip,
    $preferences,
    $document_type,
    $document,
    $user_id,
    $room_id,
    $status
);

// Execute and respond
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Application submitted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error submitting application: " . $stmt->error]);
}

$conn->close();
?>
