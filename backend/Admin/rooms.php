<?php
// backend/Admin/rooms.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include '../config.php'; // go one level up from Admin to include config.php

$action = $_GET['action'] ?? $_POST['action'] ?? '';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $uploadDir = __DIR__ . '/../uploads/';
    $uploadWebPath = '/uploads/';

    // ✅ GET ALL ROOMS
    if ($action == 'get_rooms') {
        $stmt = $pdo->query("
            SELECT rooms.*, hostels.name AS hostel_name 
            FROM rooms 
            INNER JOIN hostels ON rooms.hostel_id = hostels.id 
            ORDER BY room_number
        ");
        $rooms = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($rooms as &$room) {
            $room = fixRoomImagePaths($room);
            if (!empty($room['features'])) {
                $decoded = json_decode($room['features'], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $room['features'] = $decoded;
                }
            }
        }

        echo json_encode([
            'success' => true,
            'data' => $rooms,
            'count' => count($rooms)
        ]);
        exit;
    }

    // ✅ UPDATE ROOM
    elseif ($action === 'update_room') {
        $id = $_POST['id'] ?? null;
        if (!$id) throw new Exception("Missing room ID");

        // Handle image
        $imagePath = $_POST['existing_image'] ?? '';
        if (!empty($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            if (!empty($imagePath) && file_exists($_SERVER['DOCUMENT_ROOT'] . $imagePath)) {
                unlink($_SERVER['DOCUMENT_ROOT'] . $imagePath);
            }

            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

            $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $fileName = uniqid('room_', true) . '.' . $ext;
            $filePath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $filePath)) {
                $imagePath = $uploadWebPath . $fileName;
            }
        }

        // ✅ Ensure features are valid JSON before saving
        $features = $_POST['features'] ?? '';
        if (is_array($features)) {
            $features = json_encode($features);
        } else {
            json_decode($features);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $features = json_encode($features);
            }
        }

        // 🧠 Update DB
        $stmt = $pdo->prepare("
            UPDATE rooms 
            SET room_number=?, description=?, price=?, status=?, beds=?, capacity=?, features=?, hostel_id=?, image=? 
            WHERE id=?");
        $stmt->execute([
            $_POST['room_number'],
            $_POST['description'],
            $_POST['price'],
            $_POST['status'],
            $_POST['beds'],
            $_POST['capacity'],
            $features,
            $_POST['hostel_id'] ?? 1,
            $imagePath,
            $id
        ]);

        echo json_encode(['success' => true, 'message' => 'Room updated successfully']);
        exit;
    }

    // ✅ CREATE ROOM
    elseif ($action === 'create_room') {
        $imagePath = '';

        if (!empty($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
            $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $fileName = uniqid('room_', true) . '.' . $ext;
            $filePath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $filePath)) {
                $imagePath = $uploadWebPath . $fileName;
            }
        }

        // ✅ Ensure features are stored as valid JSON
        $features = $_POST['features'] ?? '';
        if (is_array($features)) {
            $features = json_encode($features);
        } else {
            json_decode($features);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $features = json_encode($features);
            }
        }

        $stmt = $pdo->prepare("
            INSERT INTO rooms (room_number, description, price, status, beds, capacity, features, hostel_id, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $_POST['room_number'],
            $_POST['description'],
            $_POST['price'],
            $_POST['status'],
            $_POST['beds'],
            $_POST['capacity'],
            $features,
            $_POST['hostel_id'] ?? 1,
            $imagePath
        ]);

        echo json_encode(['success' => true, 'message' => 'Room created successfully']);
        exit;
    }

    // ✅ DELETE ROOM
    elseif ($action == 'delete_room') {
        $id = $_POST['id'] ?? null;
        if (!$id) {
            echo json_encode(['success' => false, 'message' => 'Missing room ID']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT image FROM rooms WHERE id = ?");
        $stmt->execute([$id]);
        $room = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($room && !empty($room['image'])) {
            $imagePath = dirname(__DIR__) . '/uploads/' . basename($room['image']);
            if (file_exists($imagePath)) unlink($imagePath);
        }

        $stmt = $pdo->prepare("DELETE FROM rooms WHERE id = ?");
        $stmt->execute([$id]);

        echo json_encode(['success' => true, 'message' => 'Room deleted successfully']);
        exit;
    }

    else {
        echo json_encode(['success' => false, 'message' => 'Invalid or missing action parameter']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

/**
 * Fix image paths for frontend
 */
function fixRoomImagePaths($room)
{
    if (!empty($room['image'])) {
        if (strpos($room['image'], 'http') === 0) {
            // already full URL
        } elseif (strpos($room['image'], '/backend/uploads/') === false) {
            $room['image'] = '/backend/uploads/' . basename($room['image']);
        }
    }
    return $room;
}
?>
