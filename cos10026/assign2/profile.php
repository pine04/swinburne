<?php
	// filename: profile.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page showing the user profile.
?>

<?php
    session_start();

    // This page should not be accessed if the user is not logged in, as indicated
    // by the absence of the user_id session variable.
    if (!isset($_SESSION["user_id"])) {
        header("Location: login.php");
        die();
    }
            
    require_once("./settings.php");
    $connection = mysqli_connect($host, $user, $pwd, $sql_db);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="User profile page">
    <meta name="keywords" content="maverick mates, profile, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <?php echo $_SESSION["user_first_name"] . " " . $_SESSION["user_last_name"] . "'s"; ?>
        Profile - Maverick Mates
    </title>
	<link rel="icon" href="./images/logo.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/profile.css">
</head>

<body>
    <?php include("./header.inc") ?>

    <main id="profile">
        <?php echo "<h1>" . $_SESSION["user_first_name"] . " " . $_SESSION["user_last_name"] . "'s Profile</h1>\n"; ?>
        <div>
            <div id="info">
                <h2>Your information</h2>
                <?php
                    echo "<p>Email: " . $_SESSION["user_email"] . "</p>";
                    echo "<p>Phone: " . $_SESSION["user_phone"] . "</p>";
                    echo "<p>Address: " . $_SESSION["user_street_address"] . ", " . $_SESSION["user_suburb"] . ", " . $_SESSION["user_state"] . ", " . $_SESSION["user_postcode"] . "</p>";
                ?>
                <p><a href="./process_user_logout.php">Log out</a></p>
            </div>
            <div id="favorites">
                <h2>Your top items</h2>
                <div>
                <?php
                    if (!$connection) {
                        echo "<p>Your top items cannot be retrieved at the moment. Please try again later.</p>";
                    } else {
                        $table_check_query = "SHOW TABLES LIKE 'user_order'";
                        $table_check_result = mysqli_query($connection, $table_check_query);
                        if (mysqli_num_rows($table_check_result) != 1) {
                            mysqli_free_result($table_check_result);
                            $table_create_query = "CREATE TABLE user_order (
                                                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                                    user_id INT NOT NULL,
                                                    order_id INT NOT NULL,
                                                    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                                                    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
                                                )";
                            $table_create_result = mysqli_query($connection, $table_create_query);
                            if (!$table_create_result) {
                                mysqli_close($connection);
                                header("Location: index.php");
                            }
                        }

                        $user_id = $_SESSION["user_id"];
                        $query = "SELECT product_name, COUNT(orders.order_id) AS count FROM user_order
                                    INNER JOIN users ON user_order.user_id = users.user_id
                                    INNER JOIN orders ON user_order.order_id = orders.order_id
                                    WHERE users.user_id = '$user_id'
                                    GROUP BY product_name
                                    ORDER BY count DESC
                                    LIMIT 3";
                        $result = mysqli_query($connection, $query);
                        if (!$result) {
                            echo "<p>Your top items cannot be retrieved at the moment. Please try again later.</p>";
                        } else {
                            if (mysqli_num_rows($result) == 0) {
                                echo "<p>You have not bought anything yet. Make a purchase <a href=\"payment.php\">here.</a></p>";
                            } else {
                                $i = 1;
                                while ($row = mysqli_fetch_assoc($result)) {
                                    echo '<div class="card">';
                                    echo '<p class="favorite-name">#' . $i . " - " . $row["product_name"] . '</p>';
                                    echo '<p>You have purchased ' . $row["count"] . ' time(s).</p>';
                                    echo '</div>';
                                    $i++;
                                }
                            }
                            mysqli_free_result($result);
                        }
                    }
                ?>
                </div>
            </div>
            <div id="history">
                <h2>Purchase history</h2>
                <p>Your most recent purchases will appear here.</p>
                <div>
                    <?php
                        if (!$connection) {
                            echo "<p>Your purchase history cannot be retrieved at the moment. Please try again later.</p>";
                        } else {
                            $user_id = $_SESSION["user_id"];
                            $query = "SELECT orders.order_id, orders.first_name, orders.last_name, product_name, product_amount, order_cost, orders.street_address, orders.suburb, orders.state, orders.postcode, order_time, order_status FROM user_order
                                    INNER JOIN users ON user_order.user_id = users.user_id
                                    INNER JOIN orders ON user_order.order_id = orders.order_id
                                    WHERE users.user_id = '$user_id'
                                    ORDER BY order_time DESC
                                    LIMIT 25";
                            $result = mysqli_query($connection, $query);
                            if (!$result) {
                                echo "<p>Your purchase history cannot be retrieved at the moment. Please try again later.</p>";
                            } else {
                                if (mysqli_num_rows($result) == 0) {
                                    echo "<p>Your purchase history is empty. Make a purchase <a href=\"payment.php\">here.</a></p>";
                                } else {
                                    while ($row = mysqli_fetch_assoc($result)) {
                                        echo '<div class="card">';
                                        echo '<p class="order-cost">$' . $row["order_cost"] . '</p>';
                                        echo '<p class="order-product">' . $row["product_name"] . ' x' . $row["product_amount"] . '</p>';
                                        echo '<p class="order-id">Order ID: ' . $row["order_id"] . '</p>';
                                        $status = $row["order_status"];
                                        echo '<p>Status: <span';
                                        if ($status == "PENDING") {
                                            echo ' class="yellow"';
                                        } else if ($status == "FULFILLED" || $status == "PAID") {
                                            echo ' class="green"';
                                        }
                                        echo ">" . $status . "</span></p>\n";
                                        $date = date_format(date_create_from_format("Y-m-d H:i:s", $row["order_time"]), "M j Y H:i:s");
                                        echo "<p>Ordered at: " . $date . " (UTC Time)</p>\n";
                                        echo "<p>Ordered as: " . $row["first_name"] . " " . $row["last_name"] . "</p>\n";
                                        echo "<p>Delivery address: " . $row["street_address"] . ", " . $row["suburb"] . ", " . $row["state"] . ", " . $row["postcode"] . "</p>\n";
                                        echo "</div>\n";
                                    }
                                }
                                mysqli_free_result($result);
                            }
                        }
                    ?>
                </div>
            </div>
        </div>
    </main>

    <?php include("./footer.inc") ?>
</body>
</html>

<?php mysqli_close($connection); ?>