<?php
	// filename: process_order.php
	// author: Nguyen Tran Quang Minh, Nguyen Quang Huy
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Script processing customer orders. Does not generate any content.
?>

<?php
	if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
		header('Location: payment.php');
	} else {
		session_start();
		if (!isset($_POST['token']) || ($_POST['token'] !== $_SESSION['token'])) {
			header('Location: payment.php');
		} else {

			// form has been submitted, process form data
			// Function to sanitize input values
			function sanitize_input($value) {
				$value = trim($value);
				$value = stripslashes($value);
				$value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
				return $value;
			}

			// Sanitize input values
			$first_name = sanitize_input($_POST['first_name']);
			$last_name = sanitize_input($_POST['last_name']);
			$email = sanitize_input($_POST['email']);
			$phone_number = sanitize_input($_POST['phone_number']);
			$preffered_contact = sanitize_input($_POST['preffered_contact']);
			$street_address = sanitize_input($_POST['street_address']);
			$town = sanitize_input($_POST['town']);
			$state = sanitize_input($_POST['state']);
			$postcode = sanitize_input($_POST['postcode']);
			$product = sanitize_input($_POST['product']);
			$color = sanitize_input($_POST['color']);
			$material = sanitize_input($_POST['material']);
			$gemstone = sanitize_input($_POST['gemstone']);
			$quantity = sanitize_input($_POST['quantity']);
			$card_type = sanitize_input($_POST['card_type']);
			$card_name = sanitize_input($_POST['card_name']);
			$card_number = sanitize_input($_POST['card_number']);
			$card_expiry = sanitize_input($_POST['card_expiry']);
			$cvv = sanitize_input($_POST['cvv']);
			$comment = sanitize_input($_POST['comment']);

			//initialise an array to store the errors
			$error = array();

			//check if the first name is not empty, contain at least 25 character and text only
			if ($first_name == "" || strlen($first_name) > 25 || ctype_alpha($first_name) == false) {
				array_push($error, "first_name=false");
			}
			//check if the last name is not empty, contain at least 25 character and text only
			if ($last_name == "" || strlen($last_name) > 25 || ctype_alpha($last_name) == false) {
				array_push($error, "last_name=false");
			}
			//check if the email have the @ character
			if (strpos($email, '@') == false) {
				array_push($error, "email=false");
			}
			//check if the phone number contain only number and less than 10 digits
			if (ctype_digit($phone_number) == false || strlen($first_name) > 10) {
				array_push($error, "phone_number=false");
			}
			// check if the field is not blank
			if ($preffered_contact == "") {
				array_push($error, "preffered_contact=false");
			}
			// check the field is not blank and max 40 chars
			if ($street_address == "" || strlen($street_address) > 40) {
				array_push($error, "street_address=false");
			}
			// check the field is not blank and max 40 chars
			if ($town == "" || strlen($town) > 40) {
				array_push($error, "town=false");
			}
			// check the field is not blank
			if ($state == "") {
				array_push($error, "state=false");
			}
			// check the postcode have exactly 4 digit
			if (strlen($postcode) != 4 || ctype_digit($postcode) == false) {
				array_push($error, "postcode=false");
			}
			// check the product field is not empty
			if ($product == "") {
				array_push($error, "product=false");
			}
			// check the color is not empty
			if ($color == "") {
				array_push($error, "color=false");
			}
			// check the field is not empty
			if ($material == "") {
				array_push($error, "material=false");
			}
			//check the field is not empty
			if ($gemstone == "") {
				array_push($error, "gemstone=false");
			}
			//check the quantity input is not empty and contain only number
			if (ctype_digit($quantity) == false) {
				array_push($error, "quantity=false");
			}
			//check the card type is choosen
			if ($card_type == "") {
				array_push($error, "card_type=false");
				array_push($error, "card_number=false");
			}
			//check if the input card owner have the right format
			if (preg_match("/^[a-zA-Z ]{2,50}$/", $card_name) == false) {
				array_push($error, "card_name=false");
			}
			//check the visa have 16 digits and start with 4
			if ($card_type == "visa") {
				if (strlen($card_number) != 16 || strpos($card_number, '4') != 0 || ctype_digit($card_number) == false) {
					array_push($error, "card_number=false");
				}
			}
			//check the mastercard have 16 digits and start with 51 to 55
			if ($card_type == "mastercard") {
				if (strlen($card_number) != 16 || !in_array(substr($card_number, 0, 2), range(51, 55)) || ctype_digit($card_number) == false) {
					array_push($error, "card_number=false");
				}
			}
			//check the american expresscard have 15 digits and start with either 34 or 37
			if ($card_type == "american-express") {
				if (strlen($card_type) != 15 || in_array(substr($card_number, 0, 2), array("34", "37")) || ctype_digit($card_number) == false) {
					array_push($error, "card_number=false");
				}
			}
			//check the expiry date match the requested format
			if (preg_match("/^(0[1-9]|1[0-2])-(\d{2})$/", $card_expiry) == false) {
				array_push($error, "card_expiry=false");
			}
			//check the quantity is not blank
			if ($cvv == "" || ctype_digit($quantity) == false) {
				array_push($error, "cvv=false");
			}

			if (count($error) != 0) {
				// One or more inputs are invalid. Save everything in session and redirect to fix_order page.
				$_SESSION["first_name"] = $first_name;
				$_SESSION["last_name"] = $last_name;
				$_SESSION["email"] = $email;
				$_SESSION["phone_number"] = $phone_number;
				$_SESSION["preffered_contact"] = $preffered_contact;
				$_SESSION["street_address"] = $street_address;
				$_SESSION["town"] = $town;
				$_SESSION["state"] = $state;
				$_SESSION["postcode"] = $postcode;
				$_SESSION["product"] = $product;
				$_SESSION["color"] = $color;
				$_SESSION["material"] = $material;
				$_SESSION["gemstone"] = $gemstone;
				$_SESSION["quantity"] = $quantity;
				$_SESSION["card_type"] = $card_type;
				$_SESSION["card_name"] = $card_name;
				$_SESSION["card_number"] = $card_number;
				$_SESSION["card_expiry"] = $card_expiry;
				$_SESSION["cvv"] = $cvv;
				$_SESSION["comment"] = $comment;
				$_SESSION["fix_order"] = true;
				header("Location: fix_order.php?" . implode("&", $error));
			} else {
				// If everything is correct, save order into database.
				require_once("settings.php");
				$conn = @mysqli_connect($host, $user, $pwd, $sql_db);

				if (!$conn) {
					header('Location: payment.php');
				} else {
					// Check if orders table exist. If it doesn't, create it.
					$result = $conn->query("SHOW TABLES LIKE 'orders'");
					if ($result->num_rows != 1) {
						$sqlString = "CREATE TABLE orders (
									order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
									first_name VARCHAR(25) NOT NULL,
									last_name VARCHAR(25) NOT NULL,
									email TEXT NOT NULL,
									phone VARCHAR(10) NOT NULL,
									product_name TEXT NOT NULL,
									product_amount INT NOT NULL,
									order_cost FLOAT NOT NULL,
									card_name ENUM('American Express', 'Mastercard', 'Visa') NOT NULL,
									card_number VARCHAR(16) NOT NULL,
									card_owner TEXT NOT NULL,
									card_expiry VARCHAR(5) NOT NULL,
									cvv VARCHAR(3) NOT NULL,
									street_address VARCHAR(40) NOT NULL,
									suburb VARCHAR(20) NOT NULL,
									state ENUM('ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA') NOT NULL,
									postcode VARCHAR(4) NOT NULL,
									order_time DATETIME NOT NULL,
									order_status ENUM('ARCHIVED', 'FULFILLED', 'PAID', 'PENDING') NOT NULL
									);";
						$queryResult = @mysqli_query($conn, $sqlString);
					}

					// Calculates the order cost.
					$total_cost = 0;
					switch ($product) {
						case 'Maverick Mates Knot Ring':
							$total_cost += 3899;
							break;
						case 'Maverick Mates Infinity Earring':
							$total_cost += 5240;
							break;
						case 'Maverick Mates Double Bracelet':
							$total_cost += 3000;
							break;
						case 'Maverick Mates Gemstone Pendant':
							$total_cost += 6900;
							break;
					}
					switch ($material) {
						case 'tungsten':
							$total_cost += 150;
							break;
						case 'silver':
							$total_cost += 250;
							break;
						case 'gold':
							$total_cost += 450;
							break;
						case 'platinum':
							$total_cost += 650;
							break;
						case 'palladium':
							$total_cost += 850;
							break;
					}
					switch ($gemstone) {
						case 'topaz':
							$total_cost += 200;
							break;
						case 'citrine':
							$total_cost += 300;
							break;
						case 'sapphire':
							$total_cost += 400;
							break;
						case 'emerald':
							$total_cost += 550;
							break;
						case 'ruby':
							$total_cost += 650;
							break;
						case 'diamond':
							$total_cost += 750;
							break;
					}
					$total_cost *= (int) $quantity;
					// generates a date/time string in the format 'YYYY-MM-DD HH:MM:SS' for the record.
					$order_time = date('Y-m-d H:i:s'); 
					$order_status = 'PENDING';

					$sql = "INSERT INTO orders (first_name, last_name, email, phone,
												product_name, product_amount, order_cost, 
          										card_name, card_number, card_owner, card_expiry, cvv,
												street_address, suburb, state, postcode,
												order_time, order_status)
          								VALUES ('$first_name', '$last_name', '$email', '$phone_number',
												'$product (" . $color . ", " . $material . ", " . $gemstone . ")', '$quantity', '$total_cost',
												'$card_type', '$card_number', '$card_name', '$card_expiry', '$cvv',
												'$street_address', '$town', '$state', '$postcode',
												'$order_time', '$order_status')";
					$sqlResult = mysqli_query($conn, $sql);
					if (!$sqlResult) {
						mysqli_close($conn);
						header('Location: payment.php');
						die();
					}

					// Get the auto generated ID of the last order.
					$order_id = mysqli_insert_id($conn);

					// If the user is logged in, link the order with their user ID.
					if (isset($_SESSION["user_id"])) {
						// Check if the user_order table exists. If not, create it.
						$table_check_query = "SHOW TABLES LIKE 'user_order'";
						$table_check_result = mysqli_query($conn, $table_check_query);

						if (mysqli_num_rows($table_check_result) != 1) {
							mysqli_free_result($table_check_result);
							$table_create_query = "CREATE TABLE user_order (
													id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
													user_id INT NOT NULL,
													order_id INT NOT NULL,
													FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
													FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
													)";
							$table_create_result = mysqli_query($conn, $table_create_query);
							if (!$table_create_result) {
								$_SESSION["receipt"] = true;
								$_SESSION["order_id"] = $order_id;
								mysqli_close($conn);
								header("Location: receipt.php");
								die();
							}
						}

						// Link the order ID with the user ID.
						$user_id = $_SESSION["user_id"];
						$link_query = "INSERT INTO user_order (user_id, order_id) VALUES ($user_id, $order_id)";
						$link_result = mysqli_query($conn, $link_query);

						if (!$link_result) {
							$_SESSION["receipt"] = true;
							$_SESSION["order_id"] = $order_id;
							mysqli_close($conn);
							header("Location: receipt.php");
							die();
						}
					}

					$_SESSION["receipt"] = true;
					$_SESSION["order_id"] = $order_id;
					mysqli_close($conn);
					header("Location: receipt.php");
				}
			}
		}
	}
?>