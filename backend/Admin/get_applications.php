<?php
// backend/Admin/get_applications.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include("../config.php"); // your database connection

$sql = "
    SELECT 
        a.id,
        a.name,
        a.email,
        a.phone,
        a.street,
        a.city,
        a.zip_code,
        a.preferences,
        a.document_type,
        a.document_file,
        a.user_id,
        a.room_id,
        a.status,
        r.room_number AS room_name
    FROM applications a
    LEFT JOIN rooms r ON a.room_id = r.id
    ORDER BY a.id DESC
";
 
$result = $conn->query($sql);
$applications = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }
}

echo json_encode($applications);
$conn->close();
?>
