<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../config.php"; // Make sure this connects to your database

// Get the JSON data from POST
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['student_id'], $data['sleep'], $data['study'], 
          $data['cleanliness'], $data['food'], $data['noise'], $data['hobbies'])
) {
    $student_id = $data['student_id'];
    $sleep = $data['sleep'];
    $study = $data['study'];
    $cleanliness = $data['cleanliness'];
    $hobbies = $data['hobbies'] ?? "";
    $food = $data['food'];
    $noise = $data['noise'];

    // ✅ Check if this student has already submitted preferences
    $checkStmt = $conn->prepare("SELECT id FROM preferences WHERE student_id = ?");
    $checkStmt->bind_param("i", $student_id);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        // Already exists → Do not allow resubmission
        echo json_encode([
            "success" => false,
            "message" => "You have already submitted your preferences"
        ]);
        $checkStmt->close();
        $conn->close();
        exit;
    }
    $checkStmt->close();

    // Insert new preferences (first time only)
    $stmt = $conn->prepare("INSERT INTO preferences (student_id, sleep, study, cleanliness, hobbies, food, noise) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssss", $student_id, $sleep, $study, $cleanliness, $hobbies, $food, $noise);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Preferences submitted successfully"]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to submit preferences",
            "error" => $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
}

$conn->close();
?>
