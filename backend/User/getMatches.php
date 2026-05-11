<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include "config.php";

$data = json_decode(file_get_contents("php://input"), true);
$student_id = $data["student_id"] ?? null;

if (!$student_id) {
    echo json_encode(["error" => "No student_id provided"]);
    exit;
}

// Fetch current student with preferences
$studentQuery = $conn->prepare("
    SELECT u.id, u.name, u.gender, u.email, p.sleep, p.study, p.cleanliness, p.hobbies, p.food, p.noise
    FROM users u
    JOIN preferences p ON u.id = p.student_id
    WHERE u.id = ?
");
$studentQuery->bind_param("i", $student_id);
$studentQuery->execute();
$studentResult = $studentQuery->get_result();
$student = $studentResult->fetch_assoc();

if (!$student) {
    echo json_encode(["error" => "Student not found"]);
    exit;
}

// Fetch other students with preferences
$othersQuery = $conn->prepare("
    SELECT u.id, u.name, u.gender, u.email, p.sleep, p.study, p.cleanliness, p.hobbies, p.food, p.noise
    FROM users u
    JOIN preferences p ON u.id = p.student_id
    WHERE u.id != ?
");
$othersQuery->bind_param("i", $student_id);
$othersQuery->execute();
$othersResult = $othersQuery->get_result();

$others = [];
while ($row = $othersResult->fetch_assoc()) {
    $others[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "gender" => $row["gender"],
        "email" => $row["email"],
        "sleep" => $row["sleep"],
        "study" => $row["study"],
        "cleanliness" => $row["cleanliness"],
        "hobbies" => $row["hobbies"],
        "food" => $row["food"],
        "noise" => $row["noise"]
    ];
}

file_put_contents("debug_request.json", json_encode($requestData, JSON_PRETTY_PRINT));

// Prepare request to ML API
$requestData = [
    "student" => [
        "sleep" => $student["sleep"],
        "study" => $student["study"],
        "cleanliness" => $student["cleanliness"],
        "food" => $student["food"],
        "noise" => $student["noise"],
        "hobbies" => $student["hobbies"]
    ],
    "others" => $others
];

$ch = curl_init("http://localhost:5000/predict");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));

$response = curl_exec($ch);
if ($response === false) {
    echo json_encode(["error" => "Failed to connect to ML API"]);
    exit;
}
curl_close($ch);

echo $response;
?>
