<?php
	// filename: process_manager_login.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Script processing management login. Does not generate any content.
?>

<?php
    // Check if required inputs are available. The submit input is to prevent direct access.
    if (!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["submit"])) {
        header("Location: manager_login.php");
        die();
    }

    // Sanitize the inputs.
    function sanitize($data) {
        return stripslashes(trim($data));
    }

    $username = sanitize($_POST["username"]);
    $password = sanitize($_POST["password"]);

    // Create the database connection.
    require_once("./settings.php");
    $connection = mysqli_connect($host, $user, $pwd, $sql_db);

    if (!$connection) {
        mysqli_close($connection);
        header("Location: manager_login.php?error=serverError");
    } else {
        // Check if the managers table exists. If not, create it.
        $table_check_query = "SHOW TABLES LIKE 'managers'";
        $table_check_result = mysqli_query($connection, $table_check_query);
        if (mysqli_num_rows($table_check_result) != 1) {
            mysqli_free_result($table_check_result);
            $table_create_query = "CREATE TABLE managers (
                                    manager_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                    username TEXT NOT NULL,
                                    password TEXT NOT NULL
                                    )";
            $table_create_result = mysqli_query($connection, $table_create_query);
            if (!$table_create_result) {
                mysqli_close($connection);
                header("Location: manager_login.php?error=serverError");
            }
        }

        // Check if the entered credentials exist in the database.
        $query = "SELECT * FROM managers WHERE username = '$username' AND password = '$password'";
        $result = mysqli_query($connection, $query);

        if (mysqli_num_rows($result) == 0) {
            // If the account does not exist, redirect to login.
            mysqli_free_result($result);
            mysqli_close($connection);
            header("Location: manager_login.php?error=wrongInfo");
        } else {
            // If the account exists, authenticate the manager and save necessary information in the session variables.
            session_start();
            $row = mysqli_fetch_assoc($result);
            $_SESSION["manager_id"] = $row["manager_id"];
            $_SESSION["manager_username"] = $row["username"];
            $_SESSION["manager_login_time"] = time();
            mysqli_free_result($result);
            mysqli_close($connection);
            header("Location: manager.php");
        }
    }
?>