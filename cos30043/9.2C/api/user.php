<?php

$method = $_SERVER['REQUEST_METHOD'];
$inputs = json_decode(file_get_contents('php://input'), true);

$connection = mysqli_connect('localhost', 'root', 'GnutTung@04', 'cos30043_92C_104222196');
$table = "user";

if ($method == "POST") {
	$sql = "select * from `$table` WHERE username='" . $inputs['username'] . "' and password ='" . $inputs['password'] . "'";
}

$result = mysqli_query($connection, $sql);
if ($result) {
	if ($method == 'POST') {
		echo json_encode(mysqli_fetch_object($result));
	}
}

mysqli_close($connection);