<?php
	// filename: register.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page allowing users to register.
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
    <meta name="description" content="Register page">
    <meta name="keywords" content="maverick mates, register, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Maverick Mates</title>
	<link rel="icon" href="./images/logo.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/register.css">
</head>

<body>
    <?php include("./header.inc") ?>

    <main id="register">
        <h1>Register</h1>
        <p>Create an account to keep track of your purchase history and see your favorite purchases!</p>
        <?php
            if (isset($_GET["error"])) {
                $error = $_GET["error"];
                if ($error == "serverError") {
                    echo '<p class="error">An error happened on the server. Please try again later.</p>';
                } else if ($error == "emailUsed") {
                    echo '<p class="error">This email has already been used.</p>';
                }
            }
        ?>
        <form method="post" action="./process_user_register.php">
            <fieldset>
                <legend>Account information</legend>
                <div>
                    <div>
                        <label>
                            First name
                            <input type="text" name="first_name" 
                                <?php 
                                    if (isset($_SESSION["register_first_name"])) echo 'value="' . $_SESSION["register_first_name"] . '" ';
                                    if (isset($_GET["first_name"]) && $_GET["first_name"] == "false") echo 'class="error"';
                                ?>
                            >
                        </label>
                        <p
                            <?php
                                if (isset($_GET["first_name"]) && $_GET["first_name"] == "false") {
                                    echo 'class="error-message"';
                                } else {
                                    echo 'class="hidden"';
                                }
                            ?>
                        >
                            Your first name must comprise letters only and be at most 25 characters long.
                        </p>
                    </div>
                    <div>
                        <label>
                            Last name
                            <input type="text" name="last_name" 
                                <?php 
                                    if (isset($_SESSION["register_last_name"])) echo 'value="' . $_SESSION["register_last_name"] . '" ';
                                    if (isset($_GET["last_name"]) && $_GET["last_name"] == "false") echo 'class="error"';
                                ?>
                            >
                        </label>
                        <p
                            <?php
                                if (isset($_GET["last_name"]) && $_GET["last_name"] == "false") {
                                    echo 'class="error-message"';
                                } else {
                                    echo 'class="hidden"';
                                }
                            ?>
                        >
                            Your last name must comprise letters only and be at most 25 characters long.
                        </p>
                    </div>
                    <div>
                        <label>
                            Email
                            <input type="text" name="email" 
                                <?php 
                                    if (isset($_SESSION["register_email"])) echo 'value="' . $_SESSION["register_email"] . '" ';
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
                            Please enter a valid unused email.
                        </p>
                    </div>
                    <div>
                        <label>
                            Phone
                            <input type="text" name="phone" placeholder="E.g. 0123456789"
                                <?php 
                                    if (isset($_SESSION["register_phone"])) echo 'value="' . $_SESSION["register_phone"] . '" ';
                                    if (isset($_GET["phone"]) && $_GET["phone"] == "false") echo 'class="error"';
                                ?>
                            >
                        </label>
                        <p
                            <?php
                                if (isset($_GET["phone"]) && $_GET["phone"] == "false") {
                                    echo 'class="error-message"';
                                } else {
                                    echo 'class="hidden"';
                                }
                            ?>
                        >
                            Phone number must be exactly 10 digits.
                        </p>
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Address information</legend>
                <div>
                    <div>
                        <label>
                            Street address
                            <input type="text" name="street_address" 
                                <?php 
                                    if (isset($_SESSION["register_street_address"])) echo 'value="' . $_SESSION["register_street_address"] . '" ';
                                    if (isset($_GET["street_address"]) && $_GET["street_address"] == "false") echo 'class="error"';
                                ?>
                            >
                        </label>
                        <p
                            <?php
                                if (isset($_GET["street_address"]) && $_GET["street_address"] == "false") {
                                    echo 'class="error-message"';
                                } else {
                                    echo 'class="hidden"';
                                }
                            ?>
                        >
                            Please enter a street address of at most 40 characters.
                        </p>
                    </div>
                    <div>
                        <label>
                            Suburb/town
                            <input type="text" name="suburb" 
                                <?php 
                                    if (isset($_SESSION["register_suburb"])) echo 'value="' . $_SESSION["register_suburb"] . '" ';
                                    if (isset($_GET["suburb"]) && $_GET["suburb"] == "false") echo 'class="error"';
                                ?>
                            >
                        </label>
                        <p
                            <?php
                                if (isset($_GET["suburb"]) && $_GET["suburb"] == "false") {
                                    echo 'class="error-message"';
                                } else {
                                    echo 'class="hidden"';
                                }
                            ?>
                        >
                            Please enter a street address of at most 20 characters.
                        </p>
                    </div>
                    <div>
                        <label>
                            State
                            <select name="state"
                                <?php 
                                    if (isset($_GET["state"]) && $_GET["state"] == "false") echo 'class="error"';
                                ?>
                            >
                                <option value="" <?php if (isset($_SESSION["register_state"]) && $_SESSION["register_state"] == "") echo 'selected="selected"'; ?>>Please select</option>
                                <option value="ACT" <?php if (isset($_SESSION["register_state"]) && $_SESSION["register_state"] == "ACT") echo 'selected="selected"'; ?>>ACT</option>
                                <option value="NSW" <?php if (isset($_SESSION["register_state"]) && $_SESSION["register_state"] == "NSW") echo 'selected="selected"'; ?>>NSW</option>
                                <option value="NT" <?php if (isset($_SESSION["register_state"]) && $_SESSION["register_state"] == "NT") echo 'selected="selected"'; ?>>NT</option>
                                <option value="QLD" <?php if (isset($_SESSION["register_state"]) && $_SESSION["register_state"] == "QLD") echo 'selected="selected"'; ?>>QLD</option>
                                <option value="SA" <?php if (isset($_SESSION["register_state"]) && $_SESSION["register_state"] == "SA") echo 'selected="selected"'; ?>>SA</option>
                                <option value="TAS" <?php if (isset($_SESSION["register_state"]) && $_SESSION["register_state"] == "TAS") echo 'selected="selected"'; ?>>TAS</option>
                                <option value="VIC" <?php if (isset($_SESSION["register_state"]) && $_SESSION["register_state"] == "VIC") echo 'selected="selected"'; ?>>VIC</option>
                                <option value="WA" <?php if (isset($_SESSION["register_state"]) && $_SESSION["register_state"] == "WA") echo 'selected="selected"'; ?>>WA</option>
                            </select>
                        </label>
                        <p
                            <?php
                                if (isset($_GET["state"]) && $_GET["state"] == "false") {
                                    echo 'class="error-message"';
                                } else {
                                    echo 'class="hidden"';
                                }
                            ?>
                        >
                            Please select a state.
                        </p>
                    </div>
                    <div>
                        <label>
                            Postcode
                            <input type="text" name="postcode" placeholder="XXXX" 
                                <?php 
                                    if (isset($_SESSION["register_postcode"])) echo 'value="' . $_SESSION["register_postcode"] . '" ';
                                    if (isset($_GET["postcode"]) && $_GET["postcode"] == "false") echo 'class="error"';
                                ?>
                            >
                        </label>
                        <p
                            <?php
                                if (isset($_GET["postcode"]) && $_GET["postcode"] == "false") {
                                    echo 'class="error-message"';
                                } else {
                                    echo 'class="hidden"';
                                }
                            ?>
                        >
                            Your postcode must be exactly 4 digits.
                        </p>
                    </div>
                </div>
            </fieldset>
            <input type="submit" name="submit" value="Register">
        </form>
        <p>Already have an account? <a href="./login.php">Login</a>.</p>
    </main>

    <?php include("./footer.inc") ?>
</body>
</html>