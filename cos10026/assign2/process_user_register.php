<?php
	// filename: process_user_register.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Script processing user register. Does not generate any content.
?>

<?php
    // Check if required inputs are available. The submit input is to prevent direct access.
    if (!isset($_POST["first_name"]) || 
        !isset($_POST["last_name"]) ||
        !isset($_POST["email"]) || 
        !isset($_POST["phone"]) ||
        !isset($_POST["password"]) || 
        !isset($_POST["password_cf"]) ||
        !isset($_POST["street_address"]) ||
        !isset($_POST["suburb"]) ||
        !isset($_POST["state"]) ||
        !isset($_POST["postcode"]) ||
        !isset($_POST["submit"])) {
        header("Location: register.php");
        die();
    }

    // Sanitize the inputs.
    function sanitize($data) {
        return stripslashes(trim($data));
    }

    $first_name = sanitize($_POST["first_name"]);
    $last_name = sanitize($_POST["last_name"]);
    $email = sanitize($_POST["email"]);
    $phone = sanitize($_POST["phone"]);
    $password = sanitize($_POST["password"]);
    $password_cf = sanitize($_POST["password_cf"]);
    $street_address = sanitize($_POST["street_address"]);
    $suburb = sanitize($_POST["suburb"]);
    $state = sanitize($_POST["state"]);
    $postcode = sanitize($_POST["postcode"]);

    session_start();
    // Store the entered information into the session to reuse it when the user has to
    // resubmit the form.
    $_SESSION["register_first_name"] = $first_name;
    $_SESSION["register_last_name"] = $last_name;
    $_SESSION["register_email"] = $email;
    $_SESSION["register_phone"] = $phone;
    $_SESSION["register_street_address"] = $street_address;
    $_SESSION["register_suburb"] = $suburb;
    $_SESSION["register_state"] = $state;
    $_SESSION["register_postcode"] = $postcode;

    // Create an array for errors.
    $errors = array();

    if (!preg_match("/^[a-zA-Z]{1,25}$/", $first_name)) {
        array_push($errors, "first_name=false");
    }
    if (!preg_match("/^[a-zA-Z]{1,25}$/", $last_name)) {
        array_push($errors, "last_name=false");
    }
    if (!preg_match("/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z]{3,4}$/i", $email)) {
        array_push($errors, "email=false");
    }
    if (!preg_match("/^\d{10}$/", $phone)) {
        array_push($errors, "phone=false");
    }
    if (!preg_match("/^[a-zA-Z0-9@]{10,}$/i", $password)) {
        array_push($errors, "password=false");
    }
    if ($password != $password_cf) {
        array_push($errors, "password_cf=false");
    }
    if (strlen($street_address) <= 0 || strlen($street_address) > 40) {
        array_push($errors, "street_address=false");
    }
    if (strlen($suburb) <= 0 || strlen($suburb) > 20) {
        array_push($errors, "suburb=false");
    }
    if ($state == "") {
        array_push($errors, "state=false");
    }
    if (!preg_match("/^\d{4}$/", $postcode)) {
        array_push($errors, "postcode=false");
    }

    // If there is an error, redirect to register page.
    if (count($errors) != 0) {
        header("Location: register.php?" . implode("&", $errors));
        die();
    }

    // Create the database connection.
    require_once("./settings.php");
    $connection = mysqli_connect($host, $user, $pwd, $sql_db);

    if (!$connection) {
        mysqli_close($connection);
        header("Location: register.php?error=serverError");
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
                header("Location: register.php?error=serverError");
            }
        }

        // Check if the entered credentials already exist in the database.
        $email_check_query = "SELECT * FROM users WHERE email = '$email'";
        $email_check_result = mysqli_query($connection, $email_check_query);
        
        if (mysqli_num_rows($email_check_result) == 0) {
            // If the account does not exist, create it.
            mysqli_free_result($email_check_result);
            $account_create_query = "INSERT INTO users (first_name, last_name, email, phone, street_address, suburb, state, postcode, password) VALUES ('$first_name', '$last_name', '$email', '$phone', '$street_address', '$suburb', '$state', '$postcode', '$password')";
            $account_create_result = mysqli_query($connection, $account_create_query);
            
            mysqli_close($connection);
            if (!$account_create_result) {
                header("Location: register.php?error=serverError");
            } else {
                // Remove unnecessary variables stored in session.
                unset($_SESSION["register_first_name"],
                    $_SESSION["register_last_name"], 
                    $_SESSION["register_email"], 
                    $_SESSION["register_phone"], 
                    $_SESSION["register_street_address"], 
                    $_SESSION["register_suburb"],
                    $_SESSION["register_state"],
                    $_SESSION["register_postcode"]);
                unset($_SESSION["login_email"], $_SESSION["login_password"]);
                header("Location: login.php?message=registered");
            }
        } else {
            // If the account already exists, redirect to register page.
            mysqli_free_result($email_check_result);
            mysqli_close($connection);
            header("Location: register.php?error=emailUsed&email=false");
        }
    }
?>