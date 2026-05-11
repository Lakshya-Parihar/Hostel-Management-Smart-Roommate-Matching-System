<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "config.php";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the posted data
$input = json_decode(file_get_contents("php://input"), true);

// Debug logging
error_log("Received filters: " . print_r($input, true));

// Initialize response array
$response = [];

try {
    // --- 1. Define Filters and Parameters ---
    $sql = "SELECT r.id, r.price, r.description, r.features, r.beds, r.status, r.image, h.name AS hostel_name
            FROM rooms r
            JOIN hostels h ON r.hostel_id = h.id
            WHERE r.status = 'available'";

    $params = [];
    $types = "";

    // --- 2. Dynamically Build the SQL Query ---

    // Price Filter (Always applied)
    $minPrice = isset($input['minPrice']) ? (float)$input['minPrice'] : 0;
    $maxPrice = isset($input['maxPrice']) ? (float)$input['maxPrice'] : 10000;
    $sql .= " AND r.price BETWEEN ? AND ?";
    $params[] = $minPrice;
    $params[] = $maxPrice;
    $types .= "dd";

    // WiFi Filter
    if (!empty($input['wifi'])) {
        $sql .= " AND JSON_EXTRACT(r.features, '$.wifi') = true";
    }

    // AC Filter
    if (!empty($input['ac'])) {
        $sql .= " AND JSON_EXTRACT(r.features, '$.ac') = true";
    }

    // Non-AC Filter - IMPROVED VERSION
    if (!empty($input['nonAc'])) {
        $sql .= " AND (JSON_EXTRACT(r.features, '$.ac') = false OR JSON_EXTRACT(r.features, '$.ac') IS NULL)";
    }

    // Debug the final SQL query
    error_log("Final SQL: " . $sql);
    error_log("Params: " . print_r($params, true));

    // --- 3. Prepare and Execute the Final Query ---
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("SQL prepare failed: " . $conn->error);
    }

    // Bind all collected parameters securely
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }

    if (!$stmt->execute()) {
        throw new Exception("SQL execute failed: " . $stmt->error);
    }

    $result = $stmt->get_result();

    // --- 4. Format the Output ---
    $rooms = [];
    while ($row = $result->fetch_assoc()) {
        $features = json_decode($row['features'], true) ?: []; 
        $amenities = [];

        // Build the simple amenities array for the frontend
        if (!empty($features['wifi'])) $amenities[] = "WIFI";
        if (!empty($features['ac'])) $amenities[] = "AC";
        // This logic correctly adds the "Non-AC" tag for the frontend display
        if (empty($features['ac'])) $amenities[] = "Non-AC";

        // IMPROVED IMAGE HANDLING - FIXED: removed $this->
        $image_url = getRoomImageUrl($row["image"], $row["hostel_name"]);
        
        // Check if image file actually exists (for local files)
        if (filter_var($image_url, FILTER_VALIDATE_URL) && strpos($image_url, 'localhost') !== false) {
            $local_path = str_replace("http://localhost/HMS/backend/uploads/", "", $image_url);
            $full_local_path = __DIR__ . "/uploads/" . $local_path;
            if (!file_exists($full_local_path)) {
                // If image doesn't exist, use placeholder - FIXED: removed $this->
                $image_url = getPlaceholderImage($row["hostel_name"]);
            }
        }

        $rooms[] = [
            "id" => (int)$row["id"],
            "name" => $row["hostel_name"] ?: "Unnamed Hostel",
            "price" => (float)$row["price"],
            "description" => $row["description"] ?: "Comfortable room with essential amenities",
            "amenities" => $amenities,
            "beds" => (int)$row["beds"],
            "status" => $row["status"],
            "image" => $image_url,
            "features" => $features // Include full features for debugging
        ];
    }

    // Debug output count
    error_log("Found rooms: " . count($rooms));
    
    $response = $rooms;

} catch (Exception $e) {
    error_log("Error in getRooms.php: " . $e->getMessage());
    $response = ["error" => "Database error: " . $e->getMessage()];
} finally {
    // Close connections
    if (isset($stmt)) $stmt->close();
    if (isset($conn)) $conn->close();
}

echo json_encode($response);
exit();

/**
 * Get proper room image URL
 */
function getRoomImageUrl($image, $hostel_name) {
    // If image is empty or null, return placeholder
    if (empty($image)) {
        return getPlaceholderImage($hostel_name);
    }
    
    // If it's already a full URL, return as is
    if (filter_var($image, FILTER_VALIDATE_URL)) {
        return $image;
    }
    
    // If it's just a filename, construct full URL
    $base_url = "http://localhost/HMS/backend/uploads/";
    
    // Remove any existing path to avoid duplicates
    $clean_image = basename($image);
    
    return $base_url . $clean_image;
}

/**
 * Get placeholder image URL
 */
function getPlaceholderImage($hostel_name) {
    $room_types = ['Single', 'Double', 'Suite', 'Deluxe', 'Standard'];
    $random_type = $room_types[array_rand($room_types)];
    $encoded_name = urlencode($hostel_name ?: $random_type . ' Room');
    
    return "https://placehold.co/600x400/4f46e5/ffffff?text=" . $encoded_name;
}
?>