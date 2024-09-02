<?php

$method = $_SERVER['REQUEST_METHOD'];
if ($method != "GET") {
    http_response_code(404);
    exit();
}

$connection= mysqli_connect('localhost', 'admin', 'admin', 'assignment_2');
$table = "HumanPresenceReading";

$sql = "SELECT * FROM `$table` ORDER BY `FromTime` DESC LIMIT 10";

$result = mysqli_query($connection, $sql);
if ($result) {
    header('Content-Type: application/json');
    echo '[';
    for ($i = 0; $i < mysqli_num_rows($result); $i++) {
        echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    }
    echo ']';
}

mysqli_close($connection);