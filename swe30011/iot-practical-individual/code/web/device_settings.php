<?php

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents('php://input'), true);

if ($method != "GET" && $method != "PUT") {
    http_response_code(404);
    exit();
}

$connection= mysqli_connect('localhost', 'admin', 'admin', 'assignment_2');
$table = "DeviceSettings";

if (isset($input)) {
    $lightManual = mysqli_escape_string($connection, $input["lightManual"]);
    $lightTmpThreshold = mysqli_escape_string($connection, $input["lightTmpThreshold"]);
    $lightOn = mysqli_escape_string($connection, $input["lightOn"]);
    $red = mysqli_escape_string($connection, $input["red"]);
    $green = mysqli_escape_string($connection, $input["green"]);
    $blue = mysqli_escape_string($connection, $input["blue"]);
    $fanManual = mysqli_escape_string($connection, $input["fanManual"]);
    $mediumTmpThreshold = mysqli_escape_string($connection, $input["mediumTmpThreshold"]);
    $highTmpThreshold = mysqli_escape_string($connection, $input["highTmpThreshold"]);
    $fanOn = mysqli_escape_string($connection, $input["fanOn"]);
    $fanSpeed = mysqli_escape_string($connection, $input["fanSpeed"]);
}

if ($method == "GET") {
    $sql = "SELECT * FROM `$table` WHERE SettingID = 1";
} else {
    $sql = "UPDATE DeviceSettings SET LightManual = '$lightManual', LightTmpThreshold = '$lightTmpThreshold', LightOn = '$lightOn', Red = '$red', Green = '$green', Blue = '$blue', FanManual = '$fanManual', MediumTmpThreshold = '$mediumTmpThreshold', HighTmpThreshold = '$highTmpThreshold', FanOn = '$fanOn', FanSpeed = '$fanSpeed'";
}

$result = mysqli_query($connection, $sql);
if ($result) {
    header('Content-Type: application/json');
    if ($method == "GET") {
        for ($i = 0; $i < mysqli_num_rows($result); $i++) {
            echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
        }
    } else {
        echo json_encode("Updated successfully!");
    }
}

mysqli_close($connection);