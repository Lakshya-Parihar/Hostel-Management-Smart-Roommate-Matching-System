<?php
// EMS/backend/Admin/hostels.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

include "../config.php";

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // ✅ Fetch all hostels
        $query = "SELECT * FROM hostels ORDER BY id DESC";
        $result = $conn->query($query);
        $hostels = [];
        while ($row = $result->fetch_assoc()) {
            $hostels[] = $row;
        }
        echo json_encode($hostels);
        break;

    case 'POST':
        // ✅ Add a new hostel
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->name) && isset($data->total_rooms)) {
            $stmt = $conn->prepare("INSERT INTO hostels (name, total_rooms) VALUES (?, ?)");
            $stmt->bind_param("si", $data->name, $data->total_rooms);
            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Hostel added successfully."]);
            } else {
                echo json_encode(["success" => false, "message" => "Failed to add hostel."]);
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Invalid input."]);
        }
        break;

    case 'PUT':
        // ✅ Update hostel
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->id) && !empty($data->name)) {
            $stmt = $conn->prepare("UPDATE hostels SET name = ?, total_rooms = ? WHERE id = ?");
            $stmt->bind_param("sii", $data->name, $data->total_rooms, $data->id);
            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Hostel updated successfully."]);
            } else {
                echo json_encode(["success" => false, "message" => "Failed to update hostel."]);
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Invalid input."]);
        }
        break;

case 'DELETE':
    // ✅ Read JSON body
    $input = json_decode(file_get_contents("php://input"), true);

    if (!empty($input['id'])) {
        $stmt = $conn->prepare("DELETE FROM hostels WHERE id = ?");
        $stmt->bind_param("i", $input['id']);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Hostel deleted successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to delete hostel."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Invalid hostel ID."]);
    }
    break;

}

$conn->close();
?>