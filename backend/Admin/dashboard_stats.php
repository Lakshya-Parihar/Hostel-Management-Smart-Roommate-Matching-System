<?php
// dashboard_stats.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Include database connection
include '../config.php';

$stats = [
    'total_users' => 0,
    'total_rooms' => 0,
    'available_rooms' => 0,
    'total_applications' => 0,
    'pending_applications' => 0,
    'open_tickets' => 0
];

try {
    // Single efficient query to get all counts
    $sql = "SELECT 
                (SELECT COUNT(id) FROM users) as total_users,
                (SELECT COUNT(id) FROM rooms) as total_rooms,
                (SELECT COUNT(id) FROM rooms WHERE status = 'available') as available_rooms,
                (SELECT COUNT(id) FROM applications) as total_applications,
                (SELECT COUNT(id) FROM applications WHERE status = 'pending') as pending_applications,
                (SELECT COUNT(id) FROM tickets WHERE status = 'open' OR status = 'pending') as open_tickets";
            
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        // Fetch the single row of data
        $stats = $result->fetch_assoc();
        
        // Ensure all values are integers
        $stats = array_map('intval', $stats);
    } else {
        throw new Exception('Failed to execute query or no data returned');
    }

    // Send success response
    echo json_encode([
        'success' => true, 
        'stats' => $stats,
        'last_updated' => date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    // Log the error for debugging
    error_log("Dashboard stats error: " . $e->getMessage());
    
    // Send error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Unable to load dashboard statistics: ' . $e->getMessage()
    ]);
} finally {
    // Close the connection
    if (isset($conn)) {
        $conn->close();
    }
}
?>