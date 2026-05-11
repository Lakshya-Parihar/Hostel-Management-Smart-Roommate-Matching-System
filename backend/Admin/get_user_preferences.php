<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include '../config.php';

if (!isset($_GET['student_id'])) {
    echo json_encode(["error" => "Missing student_id"]);
    exit;
}

$student_id = intval($_GET['student_id']);

$sql = "SELECT * FROM preferences WHERE student_id = $student_id";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(null);
}
?>
