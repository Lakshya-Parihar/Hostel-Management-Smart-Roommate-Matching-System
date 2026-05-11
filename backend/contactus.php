<?php
// contactus.php — receives form data from React and inserts into MySQL

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php';

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Decode incoming JSON from React
$data = json_decode(file_get_contents("php://input"));

// Validate required fields
if (
    !empty($data->inquiry_type) &&
    !empty($data->first_name) &&
    !empty($data->last_name) &&
    !empty($data->email) &&
    !empty($data->organization) &&
    !empty($data->message)
) {
    // Extract and sanitize
    $inquiry_type = trim($data->inquiry_type);
    $first_name = trim($data->first_name);
    $last_name = trim($data->last_name);
    $email = trim($data->email);
    $phone_number = !empty($data->phone_number) ? trim($data->phone_number) : null;
    $organization = trim($data->organization);
    $message = trim($data->message);
    $status = "pending";

    // Prepare SQL query
    $stmt = $conn->prepare("
        INSERT INTO contactus (inquiry_type, first_name, last_name, email, phone_number, organization, message, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");

    if (!$stmt) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "SQL preparation failed: " . $conn->error
        ]);
        exit();
    }

    $stmt->bind_param(
        "ssssssss",
        $inquiry_type,
        $first_name,
        $last_name,
        $email,
        $phone_number,
        $organization,
        $message,
        $status
    );

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Your inquiry has been submitted successfully."
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Database error: " . $stmt->error
        ]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Error: Missing required fields."
    ]);
}

$conn->close();
?>
