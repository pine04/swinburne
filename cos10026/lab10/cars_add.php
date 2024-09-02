<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Add record to table">
    <meta name="keywords" content="PHP, MySQL">
    <title>Adding record to table</title>
	<link rel="stylesheet" href="./style.css">
</head>

<body>
    <h1>Record creation result</h1>
    <?php
    require_once("./settings.php");

    function sanitise($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $conn = @mysqli_connect($host, $user, $pwd, $sql_db);

    if (!$conn) {
        echo "<p>Cannot connect to the database.</p>\n";
    } else {
        $make = sanitise($_POST["carmake"]);
        $model = sanitise($_POST["carmodel"]);
        $price = sanitise($_POST["price"]);
        $yom = sanitise($_POST["yom"]);

        $query = "INSERT INTO cars (make, model, price, yom) VALUES ('$make', '$model', '$price', '$yom')";

        $result = mysqli_query($conn, $query);
        if (!$result) {
            echo "<p class=\"wrong\">Something is wrong with $query</p>\n";
        } else {
            echo "<p class=\"ok\">Successfully added a new car record.<p>\n";
        }
        mysqli_close($conn);
    }
    ?>
</body>

</html>