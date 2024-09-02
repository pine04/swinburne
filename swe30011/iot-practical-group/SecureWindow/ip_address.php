<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(404);
    exit();
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

if (!isset($input['ip_address'])) {
    echo "ip_address field missing.";
    exit();
}

$connection= mysqli_connect('localhost', 'root', 'pinetar@2004', 'assignment3_smarthome');
$table = "ip_address";
$ip_address = $input['ip_address'];

$sql = "INSERT INTO `$table` VALUES (1, '$ip_address', NOW()) ON DUPLICATE KEY UPDATE `ip_address` = '$ip_address', `time_recorded` = NOW()";

$result = mysqli_query($connection, $sql);
if ($result) {
    http_response_code(200);
} else {
    http_response_code(500);
}

mysqli_close($connection);
