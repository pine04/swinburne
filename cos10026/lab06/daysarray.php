<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Variables, arrays, and operators in PHP.">
    <meta name="keywords" content="php, variables, arrays, operators">
    <title>Using PHP Variables, arrays and operators - Days of the week</title>
</head>

<body>
    <h1>PHP Variables, Arrays and Operators</h1>
    <?php
        $days = array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        
        echo "<p>The days of the week in English are: <br>";
        for ($i = 0; $i < count($days); $i++) {
            echo $days[$i];
            if ($i !== count($days) - 1) {
                echo ", ";
            } else {
                echo ".";
            }
        }
        echo "</p>";

        $days[0] = "Dimanche";
        $days[1] = "Lundi";
        $days[2] = "Mardi";
        $days[3] = "Mercredi";
        $days[4] = "Jeudi";
        $days[5] = "Vendredi";
        $days[6] = "Samedi";

        echo "<p>The days of the week in French are: <br>";
        for ($i = 0; $i < count($days); $i++) {
            echo $days[$i];
            if ($i !== count($days) - 1) {
                echo ", ";
            } else {
                echo ".";
            }
        }
        echo "</p>";
    ?>
</body>

</html>