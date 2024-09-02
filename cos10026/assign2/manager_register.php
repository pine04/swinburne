<?php
	// filename: manager_register.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page allowing managers to register.
?>

<?php
    session_start();
    // This page is only accessible to authenticated managers. Authentication for management lasts 30 minutes only.
    // If the logged-in manager has exceeded this time limit, log them out automatically.
    if (isset($_SESSION["manager_login_time"]) && time() - $_SESSION["manager_login_time"] > 1800) {
        unset($_SESSION["manager_id"], $_SESSION["manager_username"], $_SESSION["manager_login_time"]);
    }
    // If the manager is logged in, as indicated by the presence of the manager_id session variable, take
    // them to the manager page.
    if (isset($_SESSION["manager_id"])) {
        header("Location: manager.php");
        die();
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Management registration page">
    <meta name="keywords" content="maverick mates, anagement registration, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Management Register - Maverick Mates</title>
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
        <h1>Management register</h1>
        <p>This page is for authorized use only.</p>
        <?php
            if (isset($_GET["error"]) && $_GET["error"] == "serverError") {
                echo '<p class="error">An error happened on the server.</p>';
            }
        ?>
        <form method="post" action="./process_manager_register.php">
            <label>
                Username
                <input type="text" name="username" 
                    <?php 
                        if (isset($_GET["username"]) && $_GET["username"] == "false") echo 'class="error"';
                    ?>
                >
            </label>
            <p
                <?php
                    if (isset($_GET["username"]) && $_GET["username"] == "false") {
                        echo 'class="error-message"';
                    } else {
                        echo 'class="hidden"';
                    }
                ?>
            >
                Please enter a username.
            </p>
            <label>
                Password
                <input type="password" name="password" 
                    <?php 
                        if (isset($_GET["password"]) && $_GET["password"] == "false") echo 'class="error"';
                    ?>
                >
            </label>
            <p
                <?php
                    if (isset($_GET["password"]) && $_GET["password"] == "false") {
                        echo 'class="error-message"';
                    } else {
                        echo 'class="hidden"';
                    }
                ?>
            >
                Please enter a password.
            </p>
            <label>
                Organization security code
                <input type="text" name="security_code" 
                    <?php 
                        if (isset($_GET["code"]) && $_GET["code"] == "false") echo 'class="error"';
                    ?>
                >
            </label>
            <p
                <?php
                    if (isset($_GET["code"]) && $_GET["code"] == "false") {
                        echo 'class="error-message"';
                    } else {
                        echo 'class="hidden"';
                    }
                ?>
            >
                The security code you entered is incorrect.
            </p>
            <p>Check the README.txt file to find the security code.</p>
            <input type="submit" name="submit" value="Register">
        </form>
        <p><a href="./manager_login.php">Login</a> as a manager.</p>
    </main>

    <?php include("./footer.inc") ?>
</body>
</html>