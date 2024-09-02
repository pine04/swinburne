<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Car search result">
    <meta name="keywords" content="PHP, MySQL">
    <title>Car search result</title>
	<link rel="stylesheet" href="./style.css">
</head>

<body>
    <h1>Car search result</h1>
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
        $make = sanitise($_GET["carmake"]);
        $model = sanitise($_GET["carmodel"]);
        $price = sanitise($_GET["price"]);
        $yom = sanitise($_GET["yom"]);

        $query = "SELECT make, model, price, yom FROM cars WHERE make LIKE '%$make%' AND model LIKE '%$model%'";
        if ($price != "") $query .= "AND price = $price";
        if ($yom != "") $query .= "AND yom = $yom";

        $result = mysqli_query($conn, $query);

        if (!$result) {
            echo "<p>Something is wrong with $query</p>";
        } else {
            if (mysqli_num_rows($result) == 0) {
                echo "<p>No cars match your query.</p>";
            } else {
                echo "<table>\n";
                echo "<tr>\n" .
                    "<th scope=\"col\">Make</th>\n" .
                    "<th scope=\"col\">Model</th>\n" .
                    "<th scope=\"col\">Price</th>\n" .
                    "<th scope=\"col\">Year of Manufacture</th>\n" .
                    "</tr>\n";
    
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<tr>\n";
                    echo "<td>", $row["make"], "</td>\n";
                    echo "<td>", $row["model"], "</td>\n";
                    echo "<td>", $row["price"], "</td>\n";
                    echo "<td>", $row["yom"], "</td>\n";
                    echo "</tr>\n";
                }
                echo "</table>\n";
            }
            mysqli_free_result($result);
        }
        mysqli_close($conn);
    }
    ?>
</body>

</html>