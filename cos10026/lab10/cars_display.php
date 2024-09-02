<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Lab 10">
    <meta name="keywords" content="PHP, MySQL">
    <title>Retrieving records to HTML</title>
	<link rel="stylesheet" href="./style.css">
</head>

<body>
    <h1>Computing Technology Inquiry Project - Lab 10</h1>
    <?php
    require_once("./settings.php");

    $conn = @mysqli_connect($host, $user, $pwd, $sql_db);

    if (!$conn) {
        echo "<p>Database connection unsuccessful!</p>\n";
    } else {
        $sql_table = "cars";
        $query = "SELECT make, model, price, yom FROM $sql_table ORDER BY make, model";
        $result = mysqli_query($conn, $query);

        if (!$result) {
            echo "<p>Something is wrong with $query</p>";
        } else {
            echo "<table>\n";
            echo "<tr>\n" .
                "<th scope=\"col\">Make</th>\n" .
                "<th scope=\"col\">Model</th>\n" .
                "<th scope=\"col\">Price</th>\n" .
                "</tr>\n";

            while ($row = mysqli_fetch_assoc($result)) {
                echo "<tr>\n";
                echo "<td>", $row["make"], "</td>\n";
                echo "<td>", $row["model"], "</td>\n";
                echo "<td>", $row["price"], "</td>\n";
                echo "</tr>\n";
            }
            echo "</table>\n";
            mysqli_free_result($result);
        }
        mysqli_close($conn);
    }
    ?>
</body>

</html>