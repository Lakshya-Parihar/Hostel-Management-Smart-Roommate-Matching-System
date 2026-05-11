<?php
include "config.php";

$sql = "SELECT a.id, u.name as student, r.room_no, h.name as hostel, a.status
        FROM applications a
        JOIN users u ON a.student_id = u.id
        JOIN rooms r ON a.room_id = r.id
        JOIN hostels h ON r.hostel_id = h.id";

$result = $conn->query($sql);
$apps = [];

while ($row = $result->fetch_assoc()) {
    $apps[] = $row;
}

echo json_encode($apps);
?>
