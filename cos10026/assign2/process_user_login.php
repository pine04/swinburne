<?php
	// filename: process_user_login.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Script processing user login. Does not generate any content.
?>

<?php
    // Check if required inputs are available. The submit input is to prevent direct access.
    if (!isset($_POST["email"]) || !isset($_POST["password"]) || !isset($_POST["submit"])) {
        header("Location: login.php");
        die();
    }

    // Sanitize the inputs.
    function sanitize($data) {
        return stripslashes(trim($data));
    }

    $email = sanitize($_POST["email"]);
    $password = sanitize($_POST["password"]);
    
    session_start();
    // Store the email into the session to reuse it when the user has to
    // resubmit the form.
    $_SESSION["login_email"] = $email;

    // Create the database connection.
    require_once("./settings.php");
    $connection = mysqli_connect($host, $user, $pwd, $sql_db);

    if (!$connection) {
        mysqli_close($connection);
        header("Location: login.php?error=serverError");
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
                header("Location: login.php?error=serverError");
            }
        }

        // Check if the entered credentials exist in the database.
        $query = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
        $result = mysqli_query($connection, $query);

        if (mysqli_num_rows($result) == 0) {
            // If the account does not exist, redirect to login.
            mysqli_free_result($result);
            mysqli_close($connection);
            header("Location: login.php?error=wrongInfo");
        } else {
            // If the account exists, authenticate the user and save necessary information in the session variables.
            $row = mysqli_fetch_assoc($result);
            $_SESSION["user_id"] = $row["user_id"];
            $_SESSION["user_first_name"] = $row["first_name"];
            $_SESSION["user_last_name"] = $row["last_name"];
            $_SESSION["user_email"] = $row["email"];
            $_SESSION["user_phone"] = $row["phone"];
            $_SESSION["user_street_address"] = $row["street_address"];
            $_SESSION["user_suburb"] = $row["suburb"];
            $_SESSION["user_state"] = $row["state"];
            $_SESSION["user_postcode"] = $row["postcode"];
            mysqli_free_result($result);

            // Remove unnecessary variables stored in session.
            unset($_SESSION["register_first_name"],
                $_SESSION["register_last_name"], 
                $_SESSION["register_email"], 
                $_SESSION["register_phone"], 
                $_SESSION["register_street_address"], 
                $_SESSION["register_suburb"],
                $_SESSION["register_state"],
                $_SESSION["register_postcode"]);
            unset($_SESSION["login_email"]);
            mysqli_close($connection);
            header("Location: profile.php");
        }
    }
?>