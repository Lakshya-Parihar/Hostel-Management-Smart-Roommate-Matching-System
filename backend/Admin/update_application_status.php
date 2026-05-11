<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../config.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"]) || !isset($data["status"])) {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
    exit;
}

$id = $data["id"];
$status = $data["status"];

$sql = "UPDATE applications SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
