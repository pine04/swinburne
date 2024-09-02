<?php
	// filename: edit_order.php
	// author: Nguyen Thanh Trung, Pham Hung Manh
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page to modify the status of an order.
?>

<?php
    session_start();
    // This page is only accessible to authenticated managers. Authentication for management lasts 30 minutes only.
    // If the logged-in manager has exceeded this time limit, log them out automatically.
    if (isset($_SESSION["manager_login_time"]) && time() - $_SESSION["manager_login_time"] > 1800) {
        unset($_SESSION["manager_id"], $_SESSION["manager_username"], $_SESSION["manager_login_time"]);
    }
    // If the manager is not logged in, as indicated by the absence of the manager_id session variable, take
    // them to the login page.
    if (!isset($_SESSION["manager_id"])) {
        header("Location: manager_login.php");
        die();
    }

    // Create the database connection.
    require_once("settings.php");
    $conn = @mysqli_connect($host, $user, $pwd, $sql_db);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // When the user enters this file from manager.php, this part of the code does not run yet.
    // It only runs when edit_order.php submits to itself via the form below.
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $conn->query("UPDATE orders SET order_status = '" . $_POST['order_status'] . "' WHERE order_id = " . $_POST['id']);
        mysqli_close($conn);
        header('Location: manager.php');
        exit;
    }

    // This part of the code is run when the user enters edit_order.php via manage.php.
    // It won't be run when edit_order.php submits to itself.
    // Abort if the order id is not set in the query string.
    if (!isset($_GET['id'])) {
        header('Location: manager.php');
        exit;
    }
    $id = $_GET['id'];
    $res = $conn->query("SELECT * FROM orders WHERE order_id = " . $id);
    $order = mysqli_fetch_assoc($res);
    mysqli_free_result($res);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
	<meta name="author" content="Nguyen Thanh Trung, Pham Hung Manh">
	<meta name="description" content="Edit order status page">
	<meta name="keywords" content="maverick mates, edit status, jewelry">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Edit status - Maverick Mates</title>
	<link rel="icon" href="./images/logo.ico">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="./styles/style.css">
	<link rel="stylesheet" href="./styles/manager.css">
</head>

<body>
    <?php include("./header.inc") ?>

    <main>
        <h1 class="update_title">Updating order #<?= $order['order_id'] ?></h1>
    
        <form class="container_edit" action="edit_order.php" method="post">
            <input type="hidden" name="id" value="<?= $order['order_id'] ?>">
            <label for="order_status">Status</label>
            <select name="order_status" id="order_status">
                <option value="PENDING" <?= $order['order_status'] == 'PENDING' ? 'selected' : '' ?>>PENDING</option>
                <option value="FULFILLED" <?= $order['order_status'] == 'FULFILLED' ? 'selected' : '' ?>>FULFILLED</option>
                <option value="PAID" <?= $order['order_status'] == 'PAID' ? 'selected' : '' ?>>PAID</option>
                <option value="ARCHIVED" <?= $order['order_status'] == 'ARCHIVED' ? 'selected' : '' ?>>ARCHIVED</option>
            </select>
    
            <div class='btn_edit'>
                <a class="cancel_link" href="manager.php">Back</a>
                <input class="confirmButton" type="submit" value="Save">
            </div>
        </form>
    </main>

    <?php include("./footer.inc") ?>
</body>

</html>

<?php mysqli_close($conn); ?>