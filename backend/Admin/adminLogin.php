<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require 'vendor/autoload.php'; // include Composer autoloader
use \Firebase\JWT\JWT;

$secretKey = "your_secret_key"; // Keep this secret

include "../config.php";
// ... (headers and includes same as above)

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["message" => "Email and Password are required", "success" => false]);
    exit();
}

$email = trim($data->email);
$password = $data->password;

// Use prepared statements
$stmt = $conn->prepare("SELECT id, username, email, password FROM admin WHERE email = ? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $admin = $result->fetch_assoc();

    // INSECURE: Plain text comparison (NOT recommended for production)
    if ($password === $admin['password']) {
        $payload = [
            "iss" => "http://localhost",
            "aud" => "http://localhost",
            "iat" => time(),
            "exp" => time() + (60 * 60),
            "data" => [
                "id" => $admin['id'],
                "username" => $admin['username'],
                "email" => $admin['email']
            ]
        ];

        $jwt = JWT::encode($payload, $secretKey, 'HS256');

        echo json_encode([
            "message" => "Login successful",
            "success" => true,
            "token" => $jwt,
            "id" => $admin['id'],
            "username" => $admin['username'], // 👈 added
            "email" => $admin['email']        // 👈 optional, good for display
        ]);

    } else {
        echo json_encode(["message" => "Invalid password", "success" => false]);
    }
} else {
    echo json_encode(["message" => "Admin not found", "success" => false]);
}

$stmt->close();
$conn->close();
?>