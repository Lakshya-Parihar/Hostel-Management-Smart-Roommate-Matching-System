<?php
include "config.php";

$data = json_decode(file_get_contents("php://input"), true);

$student_id = $data['student_id'];
$room_id = $data['room_id'];

$sql = "INSERT INTO applications (student_id, room_id) VALUES ('$student_id', '$room_id')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Application submitted"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}
?>
