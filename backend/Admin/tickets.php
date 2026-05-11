<?php
// contact_us_admin_api.php
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

// Get the action from query parameter or request method
$action = $_GET['action'] ?? '';

// If no action specified, determine based on request method
if (empty($action)) {
    $action = ($_SERVER['REQUEST_METHOD'] == 'POST') ? 'update_status' : 'get_submissions';
}

switch ($action) {
    case 'get_submissions':
        handleGetSubmissions();
        break;
    
    case 'update_status':
        handleUpdateStatus();
        break;
    
    default:
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid action specified'
        ]);
        break;
}

/**
 * Handle fetching all contact form submissions
 */
function handleGetSubmissions() {
    global $conn;
    
    $submissions = [];
    
    try {
        // Prepare and execute the SQL query
        // We combine first_name and last_name into 'name'
        // We alias inquiry_type to 'subject'
        // We alias submission_date to 'submitted_at' to match React's expected fields
        $sql = "SELECT 
                    id, 
                    CONCAT(first_name, ' ', last_name) AS name, 
                    email, 
                    inquiry_type AS subject, 
                    phone_number,
                    organization,
                    message, 
                    created_at AS submitted_at, 
                    status 
                FROM tickets 
                ORDER BY created_at DESC";
                
        $result = $conn->query($sql);

        if ($result) {
            // Fetch all rows into an associative array
            while ($row = $result->fetch_assoc()) {
                $submissions[] = $row;
            }
        } else {
            throw new Exception('Failed to execute query: ' . $conn->error);
        }

        // Send success response
        echo json_encode(['success' => true, 'submissions' => $submissions]);

    } catch (Exception $e) {
        // Send error response
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

/**
 * Handle updating submission status
 */
function handleUpdateStatus() {
    global $conn;

    // Get the posted JSON data
    $data = json_decode(file_get_contents('php://input'));

    // Basic validation
    if (empty($data->id) || empty($data->status)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Invalid input: ID and status are required.']);
        exit();
    }

    $id = $data->id;
    $status = $data->status;

    // Validate status
    $allowed_statuses = ['pending', 'resolved'];
    if (!in_array($status, $allowed_statuses)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Invalid status value.']);
        exit();
    }

    try {
        // Use prepared statements to prevent SQL injection
        $stmt = $conn->prepare("UPDATE tickets SET status = ? WHERE id = ?");
        
        // 'si' means string type for status, integer type for id
        $stmt->bind_param("si", $status, $id);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Status updated successfully.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'No record found with that ID.']);
            }
        } else {
            throw new Exception('Failed to execute update: ' . $stmt->error);
        }

        // Close statement
        $stmt->close();

    } catch (Exception $e) {
        // Send error response
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

// Close the connection (will be called automatically at script end)
$conn->close();
?>