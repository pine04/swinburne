<?php
	// filename: process_change_password.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Script processing user requests to change password. Provides feedback if the password change is successful.
?>

<?php
    // Check if required inputs are available. The submit input is to prevent direct access.
    if (!isset($_POST["email"]) || !isset($_POST["password"]) || !isset($_POST["password_cf"]) || !isset($_POST["submit"])) {
        header("Location: change_password.php");
        die();
    }

    // Sanitize the inputs.
    function sanitize($data) {
        return stripslashes(trim($data));
    }

    $email = sanitize($_POST["email"]);
    $password = sanitize($_POST["password"]);
    $password_cf = sanitize($_POST["password_cf"]);

    session_start();
    // Store the entered information into the session to reuse it when the user has to
    // resubmit the form.
    $_SESSION["change_password_email"] = $email;

    // Create an array for errors.
    $errors = array();

    if (!preg_match("/^[a-zA-Z0-9@]{10,}$/i", $password)) {
        array_push($errors, "password=false");
    }
    if ($password != $password_cf) {
        array_push($errors, "password_cf=false");
    }

    // If there is an error, redirect to register page.
    if (count($errors) != 0) {
        header("Location: change_password.php?" . implode("&", $errors));
        die();
    }

    // Create the database connection.
    require_once("./settings.php");
    $connection = mysqli_connect($host, $user, $pwd, $sql_db);

    if (!$connection) {
        mysqli_close($connection);
        header("Location: change_password.php?error=serverError");
        die();
    } else {
        // Check if the users table exists. If not, create it.
        $table_check_query = "SHOW TABLES LIKE 'users'";
        $table_check_result = mysqli_query($connection, $table_check_query);
        if (mysqli_num_rows($table_check_result) != 1) {
            mysqli_free_result($table_check_result);
            $table_create_query = "CREATE TABLE users (
                                    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                    first_name VARCHAR(25) NOT NULL,
                                    last_name VARCHAR(25) NOT NULL,
                                    email TEXT NOT NULL,
                                    phone VARCHAR(10) NOT NULL,
                                    street_address VARCHAR(40) NOT NULL,
                                    suburb VARCHAR(20) NOT NULL,
                                    state ENUM('ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA') NOT NULL,
                                    postcode VARCHAR(4) NOT NULL,
                                    password TEXT NOT NULL
                                )";
            $table_create_result = mysqli_query($connection, $table_create_query);
            if (!$table_create_result) {
                mysqli_close($connection);
                header("Location: change_password.php?error=serverError");
            }
        }

        // Update the user password.
        $query = "UPDATE users SET password = '$password' WHERE email = '$email'";
        $result = mysqli_query($connection, $query);

        if (!$result) {
            mysqli_close($connection);
            header("Location: change_password.php?error=serverError");
            die();
        } else {
            // If the number of affected (changed) rows is not 1, the email does not exist.
            // If so, tell the user to reenter the correct information.
            if (mysqli_affected_rows($connection) != 1) {
                mysqli_close($connection);
                header("Location: change_password.php?email=false");
                die();
            } else {
                unset($_SESSION["change_password_email"]);
            }
        }
    }
    mysqli_close($connection);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Password change confirmation page">
    <meta name="keywords" content="maverick mates, password change confirmation, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Change Success - Maverick Mates</title>
	<link rel="icon" href="./images/logo.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/login.css">
</head>

<body>
    <?php include("./header.inc") ?>

    <main id="login">
        <h1>Success!</h1>
        <p>Password change successful. You can now <a href="./login.php">login</a> with the new password.</p>
    </main>

    <?php include("./footer.inc") ?>
</body>
</html>