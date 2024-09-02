<?php

$connection= mysqli_connect('localhost', 'root', 'pinetar@2004', 'assignment3_smarthome');
$table = "debug";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    if (!isset($input['message'])) {
        echo "message field missing.";
        exit();
    }

    $msg = $input['message'];
    
    $sql = "INSERT INTO `$table` (`message`, `time_recorded`) VALUES ('$msg', NOW())";
    
    $result = mysqli_query($connection, $sql);
    if ($result) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM `$table` ORDER BY `time_recorded` DESC";

    $result = mysqli_query($connection, $sql);
    $rows = $result->fetch_all(MYSQLI_ASSOC);
    foreach ($rows as $row) {
        echo "<p>" . $row["time_recorded"] . " - " . $row["message"] . "</p>";
    }
}


mysqli_close($connection);
