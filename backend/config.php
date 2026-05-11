<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'hostel_db'); // Your database name
define('DB_USER', 'root');         // Your database username
define('DB_PASS', '');

$host = "localhost";
$user = "root";
$pass = "";
$db = "hostel_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>