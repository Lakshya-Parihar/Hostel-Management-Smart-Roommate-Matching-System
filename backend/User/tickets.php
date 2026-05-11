<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

include "../config.php";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Only POST method is allowed.']);
    exit;
}

// Read and decode JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate required fields
$required = [
    'inquiry_type',
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'organization',
    'message'
];
$missing = [];
foreach ($required as $field) {
    if (empty($data[$field]))
        $missing[] = $field;
}
if ($missing) {
    http_response_code(400);
    echo json_encode(['message' => 'Please fill all required fields.', 'missing' => $missing]);
    exit;
}
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid email address.']);
    exit;
}

// Sanitize data
foreach ($data as $k => $v) {
    $data[$k] = mysqli_real_escape_string($conn, $v);
}

$sql = "INSERT INTO tickets
    (user_id, inquiry_type, first_name, last_name, email, phone_number, organization, message, status)
    VALUES (
        '{$data['user_id']}',
        '{$data['inquiry_type']}',
        '{$data['first_name']}',
        '{$data['last_name']}',
        '{$data['email']}',
        '{$data['phone_number']}',
        '{$data['organization']}',
        '{$data['message']}',
        'pending'
    )";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['message' => 'Form submitted successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Insert failed: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>