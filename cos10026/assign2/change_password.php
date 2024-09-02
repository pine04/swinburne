<?php
	// filename: change_password.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page for changing users' password.
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Password change page">
    <meta name="keywords" content="maverick mates, password change, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change Password - Maverick Mates</title>
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
        <h1>Change password</h1>
        <?php
            if (isset($_GET["error"]) && $_GET["error"] == "serverError") {
                echo '<p class="error">An error happened on the server.</p>';
            }
        ?>
        <form method="post" action="./process_change_password.php">
            <label>
                Email
                <input type="text" name="email" 
                    <?php 
                        if (isset($_SESSION["change_password_email"])) echo 'value="' . $_SESSION["change_password_email"] . '"';
                        if (isset($_GET["email"]) && $_GET["email"] == "false") echo 'class="error"';
                    ?>
                >
            </label>
            <p
                <?php
                    if (isset($_GET["email"]) && $_GET["email"] == "false") {
                        echo 'class="error-message"';
                    } else {
                        echo 'class="hidden"';
                    }
                ?>
            >
                The email you entered does not exist.
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
                Your password must be at least 10 characters long and comprise only letters, digits, and @ symbols.
            </p>
            <label>
                Confirm password
                <input type="password" name="password_cf"
                    <?php 
                        if (isset($_GET["password_cf"]) && $_GET["password_cf"] == "false") echo 'class="error"';
                    ?>
                >
            </label>
            <p
                <?php
                    if (isset($_GET["password_cf"]) && $_GET["password_cf"] == "false") {
                        echo 'class="error-message"';
                    } else {
                        echo 'class="hidden"';
                    }
                ?>
            >
                Your passwords don't match.
            </p>
            <input type="submit" name="submit" value="Confirm">
        </form>
    </main>

    <?php include("./footer.inc") ?>
</body>
</html>