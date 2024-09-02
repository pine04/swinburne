<?php

$dir = "./uploads/";
$date = mktime(date('H') + 0, date('i'), date('s'), date('m'), date('d'), date('y'));
$outputFile = $dir . date('Y.m.d_H-i-s_', $date) . basename($_FILES["imageFile"]["name"]);
$ok = 1;
$imageFileType = strtolower(pathinfo($outputFile, PATHINFO_EXTENSION));

if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["imageFile"]["tmp_name"]);
    if ($check !== false) {
        echo "File is image - " . $check["mime"] . ".";
    } else {
        echo "File is not image.";
        $ok = 0;
    }
}

if (file_exists($outputFile)) {
    echo "Error: File exists.";
    $ok = 0;
}

if ($_FILES["imageFile"]["size"] > 500000) {
    echo "Error: File is too large.";
    $ok = 0;
}

$image_extensions = array("png", "jpg", "jpeg");

if (!in_array($imageFileType, $image_extensions)) {
    echo "Error: Unsupported file type. Only JPG, JPEG, PNG & GIF files are allowed.";
    $ok = 0;
}

if ($ok == 0) {
    echo "File was not uploaded.";
} else {
    if (move_uploaded_file($_FILES["imageFile"]["tmp_name"], $outputFile)) {
        echo "The file " . basename($_FILES["imageFile"]["name"]) . " has been uploaded.";
    } else {
        echo "An error happened while uploading your file.";
    }
}