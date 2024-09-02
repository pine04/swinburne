<?php
	// filename: login.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page allowing users to log in.
?>

<?php
    session_start();

    // This page should not be accessed if the user is already logged in, as indicated
    // by the presence of the user_id session variable.
    if (isset($_SESSION["user_id"])) {
        header("Location: profile.php");
        die();
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Login page">
    <meta name="keywords" content="maverick mates, login, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Maverick Mates</title>
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
        <h1>Login</h1>
        <p>Already have an account? Log in.</p>
        <?php
            if (isset($_GET["error"])) {
                $error = $_GET["error"];
                if ($error == "serverError") {
                    echo '<p class="error">An error happened on the server.</p>';
                } else if ($error == "wrongInfo") {
                    echo '<p class="error">You entered the wrong login information.</p>';
                }
            }

            if (isset($_GET["message"])) {
                $message = $_GET["message"];
                if ($message == "registered") {
                    echo '<p class="success">You have successfully created your account.</p>';
                }
            }
        ?>
        <form method="post" action="./process_user_login.php">
            <label>
                Email
                <input type="text" name="email" <?php if (isset($_SESSION["login_email"])) echo 'value="' . $_SESSION["login_email"] . '"'; ?>>
            </label>
            <label>
                Password
                <input type="password" name="password">
            </label>
            <input type="submit" name="submit" value="Login">
        </form>
        <p>Doesn't have an account? <a href="./register.php">Register</a>.</p>
        <p>I want to <a href="./change_password.php">change my password</a>.</p>
    </main>

    <?php include("./footer.inc") ?>
</body>
</html>