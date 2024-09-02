<?php
	// filename: receipt.php
	// author: Nguyen Quang Huy, Nguyen Tran Quang Minh
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page showing the order receipt.
?>

<?php
	session_start();
	// Receipt.php can only be accessed through process_order.php. Process_order generates a boolean value in the session
	// when the order is successfully created. Receipt.php should only be accessed if this variable exists and is true.
	if ($_SESSION["receipt"] != true){
		header('Location: payment.php');
		die();
	}
	// The session variable is destroyed as soon as this page is entered. Refreshing this page will thus take the user back to payment.
	// This prevents the user from reopening this page multiple times later.
	unset($_SESSION["receipt"]);

	// Queries the order identified by order_id. Order_id is the ID of the last order created. It is stored in session.
	require_once("settings.php");
	$connection = mysqli_connect($host, $user, $pwd, $sql_db);

	if (!$connection) {
		echo "An error happened.";
		die();
	} else {
		$query = "SELECT * FROM orders WHERE order_id = '" . $_SESSION["order_id"] . "'";
		$result = mysqli_query($connection, $query);

		if (mysqli_num_rows($result) != 1) {
			echo "An error happened.";
			die();
		} else {
			$row = mysqli_fetch_assoc($result);
			$order_id = $row["order_id"];
			$first_name = $row["first_name"];
			$last_name = $row["last_name"];
			$street_address = $row["street_address"];
			$suburb = $row["suburb"];
			$state = $row["state"];
			$postcode = $row["postcode"];
			$order_time = $row["order_time"];
			$order_status = $row["order_status"];
			$product = $row["product_name"];
			$quantity = $row["product_amount"];
			$total_cost = $row["order_cost"];
			$card_name = $row["card_name"];
			$card_number = $row["card_number"];
			$card_owner = $row["card_owner"];
			$card_expiry = $row["card_expiry"];
			$cvv = $row["cvv"];
		}
	}
	mysqli_close($connection);
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
    <meta name="author" content="Nguyen Quang Huy, Nguyen Tran Quang Minh">
    <meta name="description" content="Receipt page">
    <meta name="keywords" content="maverick mates, receipt, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt - Maverick Mates</title>
	<link rel="icon" href="./images/logo.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/receipt.css">
</head>

<body>
	<?php include("./header.inc"); ?>

	<main id="receipt">
		<div class="container">
			<header>
				<h1>Receipt</h1>
			</header>
			<div class="description">
				<p>Thank you for your order! We hope you enjoy your new jewelry.</p>
				<hr>
			</div>
			<h3>Your Order</h3>
			<p>Order ID: <?php echo $order_id; ?></p>
			<p>Order Status: <?php echo $order_status; ?></p>
			<p>Order Time: <?php echo $order_time; ?></p>

			<br><hr>

			<h3>Order Details</h3>
			<p>Item: <?php echo $product;?></p>
			<p>Quantity: <?php echo $quantity;?></p>
			<p>Total price: <?php echo $total_cost;?></p>

			<br><hr>

			<h3>Delivery Information</h3>
			<p>Name: <?php echo $first_name . " " . $last_name;?></p>
			<p>Address: <?php echo $street_address;?></p>
			<p>Surburn/Town: <?php echo $suburb;?></p>
			<p>State: <?php echo $state;?></p>
			<p>Postcode: <?php echo $postcode;?></p>

			<br><hr>

			<h3>Payment Information</h3>
			<p>Card Holder Name: <?php echo $card_owner;?></p>
			<p>Card Type: <?php echo $card_name;?></p>
			<p>Card Number: <?php echo str_repeat("*", strlen($card_number));?></p>
			<p>Expiration Date: <?php echo $card_expiry;?></p>
			<p>CVV: ***</p>

			<br><hr>
		
			<div class="description">
				<p>See you again!</p>
			</div>
		</div>
	</main>
	
	<?php include("./footer.inc"); ?>
</body>

</html>

