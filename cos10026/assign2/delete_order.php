<?php
	// filename: delete_order.php
	// author: Nguyen Thanh Trung, Pham Hung Manh
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Script to delete an order from the database. Does not generate content.
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

    // Abort if id not set
    if(!isset($_POST['id'])) {
        mysqli_close($conn);
        header('Location: manager.php');
        exit;
    }

    // Delete the order, then redirect to manager.php page.
    $id = $_POST['id'];
    $res = $conn->query("DELETE FROM orders WHERE order_id = " . $id);
    mysqli_close($conn); 

    header('Location: manager.php');
?>