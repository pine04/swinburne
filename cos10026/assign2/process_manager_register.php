<?php
	// filename: process_manager_register.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Script processing management register. Does not generate any content.
?>

<?php
    // Check if required inputs are available. The submit input is to prevent direct access.
    if (!isset($_POST["username"]) || 
        !isset($_POST["password"]) ||
        !isset($_POST["security_code"]) ||
        !isset($_POST["submit"])) {
        header("Location: manager_register.php");
        die();
    }

    // Sanitize the inputs.
    function sanitize($data) {
        return stripslashes(trim($data));
    }

    $username = sanitize($_POST["username"]);
    $password = sanitize($_POST["password"]);
    $security_code = sanitize($_POST["security_code"]);

    // Create an array to store errors.
    $errors = array();

    if ($username == "") {
        array_push($errors, "username=false");
    }
    if ($password == "") {
        array_push($errors, "password=false");
    }
    if ($security_code != "TTHMM") {
        array_push($errors, "code=false");
    }

    // Redirect to register page if there is an error.
    if (count($errors) != 0) {
        header("Location: manager_register.php?" . implode("&", $errors));
        die();
    }

    // Create the database connection.
    require_once("./settings.php");
    $connection = mysqli_connect($host, $user, $pwd, $sql_db);

    if (!$connection) {
        mysqli_close($connection);
        header("Location: manager_register.php?error=serverError");
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
                header("Location: manager_register.php?error=serverError");
            }
        }

        // Add the manager account into the database.
        $query = "INSERT INTO managers (username, password) VALUES ('$username', '$password')";
        $result = mysqli_query($connection, $query);
        
        mysqli_close($connection);
        if (!$result) {
            // If an error happened, redirect to register page.
            header("Location: manager_register.php?error=serverError");
        } else {
            // Otherwise, redirect to login.
            header("Location: manager_login.php?message=registered");
        }
    }
?>