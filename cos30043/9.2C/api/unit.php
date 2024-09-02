<?php

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents('php://input'), true);

$connection= mysqli_connect('localhost', 'root', 'GnutTung@04', 'cos30043_92C_104222196');
$table = "unit";

$id = array_shift($request);

if (($method == "PUT" || $method == "DELETE") && $id == null) {
	http_response_code(400);
	echo json_encode(array("message" => "ID is missing."));
	exit();
}

if (isset($input)) {
	$code = mysqli_escape_string($connection, $input["code"]);
	$desc = mysqli_escape_string($connection, $input["desc"]);
	$cp = mysqli_escape_string($connection, $input["cp"]);
	$type = mysqli_escape_string($connection, $input["type"]);
}

switch ($method) {
	case 'GET':
		$sql = "select * from `$table`";
		break;
	case 'PUT':
		$sql = "update `$table` set `code` = '$code', `desc` = '$desc', `cp` = '$cp', `type` = '$type' where `id` = '$id'";
		break;
	case 'POST':
		$sql = "insert into `$table` (`code`, `desc`, `cp`, `type`) values ('$code', '$desc', '$cp', '$type')";
		break;
	case 'DELETE':
		$sql = "delete from `$table` where id = '$id'";
		break;
}

$result = mysqli_query($connection, $sql);
if ($result) {
	if ($method == 'GET') {
		header('Content-Type: application/json');
		echo '[';
		for ($i = 0; $i < mysqli_num_rows($result); $i++) {
			echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
		}
		echo ']';
	} elseif ($method == 'POST') {
		echo json_encode(mysqli_insert_id($connection));
	} else {
		echo json_encode(mysqli_affected_rows($connection));
	}
}

mysqli_close($connection);