<?php
	// filename: manager.php
	// author: Nguyen Thanh Trung, Pham Hung Manh
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page allowing managers to keep track of orders.
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
    // Calculates the amount of time the manager has left to display on the page.
    $time_remaining = 1800 - (time() - $_SESSION["manager_login_time"]);
    $minutes = (int)($time_remaining / 60); 
    $seconds = $time_remaining - $minutes * 60;

    // Connect to the dataset server
    require_once("settings.php");
    $conn = @mysqli_connect($host, $user, $pwd, $sql_db);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // a parameter to get value from the dataset
    function get_query($value, $default_value)
    {
        return isset($_GET[$value]) ? $_GET[$value] : $default_value;
    }
    
    // getting data
    $sort = get_query("sort", "desc");
    $first_name = get_query("first_name", ""); 
    $last_name = get_query("last_name", ""); 
    $product_name = get_query("product_name", ""); 
    $order_status = get_query("order_status", ""); 
    $order_id = get_query("order_id","");

    $query = "SELECT * FROM orders";

    // To check if the data is not null and for later sorting method
    $continue = false;

    if ($first_name != "") {
        $query .= " WHERE first_name LIKE '%$first_name%'";
        $continue = true;
    }

    if ($order_status != "") {
        if ($continue)
            $query .= " AND";
        else
            $query .= " WHERE";

        $query .= " order_status = '$order_status'";

        $continue = true;
    }

    if ($product_name != "") {
        if ($continue)
            $query .= " AND";
        else
            $query .= " WHERE";

        $query .= " product_name LIKE '%$product_name%'";
    }

    $query .= " ORDER BY order_cost $sort";

    $orders = $conn->query($query);
    
    mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
	<meta name="author" content="Nguyen Thanh Trung, Pham Hung Manh">
	<meta name="description" content="Manager page">
	<meta name="keywords" content="maverick mates, manager, jewelry">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Manage - Maverick Mates</title>
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

    <main id="manage">
        <h1 id="title">Manage orders</h1>
        <p>You are logged in as <?php echo $_SESSION["manager_username"]; ?>. You will be automatically logged out in <?php echo $minutes; ?> minute(s) and <?php echo $seconds; ?> second(s). <a href="./process_manager_logout.php">Log out</a>.</p>
        <!-- The sorting options for names, product, cost, status -->
        <form action="manager.php" method="get">
            <div id="container">
                <div class="Sorting">
                    <label for="first_name">First name: </label>
                    <input type="text" name="first_name" id="first_name" value="<?= $first_name ?>">
                </div>

                <div class="Sorting">
                    <label for="sort">Sort order cost: </label>
                    <select name="sort" id="sort">
                        <option value="desc" <?= $sort === "desc" ? 'selected' : '' ?>>Descending</option>
                        <option value="asc" <?= $sort === "asc" ? 'selected' : '' ?>>Ascending</option>
                    </select>
                </div>

                <div class="Sorting">
                    <label for="product_name">Product:</label>
                    <select name="product_name" id="product_name">
                        <option value="" selected>-- ALL --</option>
                        <option value="Maverick Mates Knot Ring" <?= $product_name == 'Maverick Mates Knot Ring' ? 'selected' : '' ?>>Maverick Mates Knot Ring</option>
                        <option value="Maverick Mates Infinity Earring" <?= $product_name == 'Maverick Mates Infinity Earring' ? 'selected' : '' ?>>Maverick Mates Infinity Earring</option>
                        <option value="Maverick Mates Double Bracelet" <?= $product_name == 'Maverick Mates Double Bracelet' ? 'selected' : '' ?>>Maverick Mates Double Bracelet</option>
                        <option value="Maverick Mates Gemstone Pendant" <?= $product_name == 'Maverick Mates Gemstone Pendant' ? 'selected' : '' ?>>Maverick Mates Gemstone Pendant</option>
                    </select>
                </div>

                <div class="Sorting">
                    <label for="order_status">Status:</label>
                    <select name="order_status" id="order_status">
                        <option value="" selected>-- ALL --</option>
                        <option value="PENDING" <?= $order_status == 'PENDING' ? 'selected' : '' ?>>PENDING</option>
                    </select>
                </div>

                <input class='confirmButton' type="submit" value="Search">
            </div>
        </form>

        <!-- Check if there is data for the information being searched for -->
        <?php if ($orders->num_rows == 0) { ?>
            <p class="error">No entries were found.</p>
        <?php } else { ?>
            <table class="data_table">
                <tr>
                    <th>ID</th>
                    <th>Date of order</th>
                    <th>Product</th>
                    <th>Total cost</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Status</th>
                    <th>Change Status</th>
                    <th>Delete</th>
                </tr>
                <!-- Create a new sorted table -->
                <?php while ($row = mysqli_fetch_assoc($orders)) { ?>
                    <tr>
                        <td><?= $row['order_id']; ?></td>
                        <td><?= $row['order_time']; ?></td>
                        <td><?= $row['product_name']; ?></td>
                        <td><?= $row['order_cost']; ?></td>
                        <td><?= $row['first_name']; ?></td>
                        <td><?= $row['last_name']; ?></td>
                        <td><?= $row['order_status']; ?></td>
                        <td>
                            <!-- Send the user to the edit page through order_id -->
                            <a class="update_btn" href="edit_order.php?id=<?= $row['order_id'] ?>">Update status</a>
                        </td>
                        <td>
                            <!-- Delete order by uploading data to delete_order.php (This option is unselectable if the order status is PENDING) -->
                            <form action="delete_order.php" method="post">
                                <input type="hidden" name="id" value="<?= $row['order_id'] ?>">
                                <input <?= $row['order_status'] !== 'PENDING' ? "disabled" : "" ?> class="deleteButton" type="submit" value="Cancel order">
                            </form>
                        </td>
                    </tr>
                <?php } ?>
            </table>
        <?php } ?>
    </main>

    <?php include("./footer.inc"); ?>
</body>

</html>