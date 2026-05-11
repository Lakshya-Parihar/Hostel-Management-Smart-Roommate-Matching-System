<?php
// backend/allocate_room.php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
header('Content-Type: application/json');
require 'config.php'; // should create $conn (mysqli)

$input = json_decode(file_get_contents('php://input'), true);
$student_id    = $input['student_id']    ?? null;
$application_id= $input['application_id']?? null;
$budget        = isset($input['budget']) ? (float)$input['budget'] : null;

if (!$student_id) {
    http_response_code(400);
    echo json_encode(['error' => 'student_id required']);
    exit;
}

// 1) Load student + preferences
$stmt = $conn->prepare("
    SELECT u.id, u.gender, p.sleep, p.study, p.cleanliness, p.food, p.noise
    FROM users u
    LEFT JOIN preferences p ON p.student_id = u.id
    WHERE u.id = ?
");
$stmt->bind_param('i', $student_id);
$stmt->execute();
$student = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$student) {
    http_response_code(404);
    echo json_encode(['error' => 'Student not found']);
    exit;
}

// 2) Build candidate rooms (rule filters)
$rooms = [];
// include more fields for UI: room_number, image
$q = "SELECT id, room_number, price, beds, capacity, features, image
      FROM rooms
      WHERE status = 'available'";
$res = $conn->query($q);
while ($r = $res->fetch_assoc()) {
    if ($budget !== null && floatval($r['price']) > $budget) {
        continue; // over budget
    }

    $features = [];
    if (!empty($r['features'])) {
        $tmp = json_decode($r['features'], true);
        if (is_array($tmp)) $features = $tmp;
    }

    $rooms[] = [
        'id'          => (int)$r['id'],
        'room_number' => $r['room_number'],
        'price'       => floatval($r['price'] ?? 0),
        'beds'        => (int)($r['beds'] ?? 1),
        'capacity'    => (int)($r['capacity'] ?? 1),
        'features'    => $features,
        'image'       => $r['image'],  // e.g. "uploads/room1.jpg"
    ];
}
$res->close();

if (empty($rooms)) {
    echo json_encode(['suggestions' => [], 'ml_status' => 'no_rooms']);
    exit;
}

// 3) Try calling ML microservice
$ml_url  = 'http://127.0.0.1:5001/suggest';
$payload = json_encode(['student' => $student, 'rooms' => $rooms]);

$ch = curl_init($ml_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_TIMEOUT, 3); // seconds
$response  = curl_exec($ch);
$curl_err  = curl_error($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$suggestions = null;
if ($response && $http_code === 200) {
    $sug = json_decode($response, true);
    if (is_array($sug)) {
        $suggestions = $sug; // [{room_id, score}]
        $ml_status = 'ml_ok';
    }
}

if (!$suggestions) {
    $ml_status = 'ml_failed';

    // 4) Fallback: rule-based scoring
    $ranked = [];
    foreach ($rooms as $r) {
        $score = 0.0;

        if ($budget !== null) {
            $diff  = abs($budget - $r['price']);
            $score += max(0, 30 - ($diff / max(1, $budget) * 30));
        } else {
            $score += max(0, 10 - $r['price'] / 1000);
        }

        if ($r['capacity'] == 1) $score += 5;
        if (!empty($r['features']['ac']))   $score += 3;
        if (!empty($r['features']['wifi'])) $score += 2;
        if ($r['price'] > 8000) $score -= 3;

        $ranked[] = ['room_id' => $r['id'], 'score' => $score];
    }
    usort($ranked, fn($a, $b) => $b['score'] <=> $a['score']);
    $suggestions = $ranked;
}

// 5) Enhance suggestions with full room data from $rooms
$roomMap = [];
foreach ($rooms as $r) {
    $roomMap[$r['id']] = $r;
}

$enhanced = [];
foreach ($suggestions as $s) {
    $rid = (int)$s['room_id'];
    if (!isset($roomMap[$rid])) continue;
    $r = $roomMap[$rid];

    $enhanced[] = [
        'room_id'     => $rid,
        'score'       => $s['score'],
        'room_number' => $r['room_number'],
        'price'       => $r['price'],
        'beds'        => $r['beds'],
        'capacity'    => $r['capacity'],
        'features'    => $r['features'],
        'image'       => $r['image'],
    ];
}

// 6) Persist top suggestion (optional)
// if (!empty($enhanced)) {
//     $top = $enhanced[0];
//     $room_id = (int)$top['room_id'];
//     $stmt2 = $conn->prepare("
//         INSERT INTO allocation_history (application_id, student_id, room_id, allocated_by)
//         VALUES (?, ?, ?, 'system')
//     ");
//     $stmt2->bind_param('iii', $application_id, $student_id, $room_id);
//     $stmt2->execute();
//     $stmt2->close();
// }

echo json_encode([
    'suggestions' => $enhanced,
    'ml_status'   => $ml_status,
    'ml_err'      => $curl_err ?? null,
]);
