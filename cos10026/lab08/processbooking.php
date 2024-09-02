<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Booking confirmation">
    <meta name="keywords" content="php, booking, validation">
    <title>Booking Confirmation</title>
</head>

<body>
    <?php
        function sanitise_input($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }
    ?>

    <h1>Rohirrim Tour Booking Confirmation</h1>

    <?php
        if (!isset($_POST["firstname"]) ||
            !isset($_POST["lastname"]) ||
            !isset($_POST["age"]) ||
            !isset($_POST["food"]) ||
            !isset($_POST["partySize"])) {
            header("Location: register.html");
        } else {
            $firstname = sanitise_input($_POST["firstname"]);
            $lastname = sanitise_input($_POST["lastname"]);
            $age = sanitise_input($_POST["age"]);
            $partySize = sanitise_input($_POST["partySize"]);
            $food = sanitise_input($_POST["food"]);
            if ($food == "") {
                $food = "None";
            }

            if (isset($_POST["species"])) {
                $species = $_POST["species"];
            } else {
                $species = "Unknown species";
            }

            $bookings = array();
            if (isset($_POST["1day"])) {
                array_push($bookings, $_POST["1day"]);
            }
            if (isset($_POST["4day"])) {
                array_push($bookings, $_POST["4day"]);
            }
            if (isset($_POST["10day"])) {
                array_push($bookings, $_POST["10day"]);
            }
            if (count($bookings) != 0) {
                $bookingStr = implode(", ", $bookings);
            } else {
                $bookingStr = "None";
            }

            $errMsg = "";
            if ($firstname == "") {
                $errMsg .= "<p>You must enter your first name.</p>";
            } else if (!preg_match("/^[a-zA-Z]*$/", $firstname)) {
                $errMsg .= "<p>Only alpha characters are allowed in your first name.</p>";
            }
            if ($lastname == "") {
                $errMsg .= "<p>You must enter your last name.</p>";
            } else if (!preg_match("/^[a-zA-Z_]*$/", $lastname)) {
                $errMsg .= "<p>Only alpha characters are allowed in your last name.</p>";
            }
            if (!is_numeric($age)) {
                $errMsg .= "<p>Your age must be a number.</p>";
            } else if (is_numeric($age) && ($age < 18 || $age > 10000)) {
                $errMsg .= "<p>Age must be between 18 and 10000.</p>";
            }
            if (!is_numeric($partySize)) {
                $errMsg .= "<p>Number of travellers must be a number.</p>";
            } else if (is_numeric($partySize) && $partySize < 1) {
                $errMsg .= "<p>Number of travellers must be at least 1.</p>";
            }

            if ($errMsg != "") {
                echo $errMsg;
            } else {
                echo "<p>Welcome $firstname $lastname!<br>" .
                    "Your bookings: $bookingStr <br>" .
                    "Species: $species <br>" .
                    "Age: $age <br>" .
                    "Meal preference: $food <br>" .
                    "Number of travellers: $partySize </p>";
            }
        }
    ?>
</body>

</html>