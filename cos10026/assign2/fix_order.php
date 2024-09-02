<?php
	// filename: fix_order.php
	// author: Nguyen Tran Quang Minh, Nguyen Quang Huy
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page prompting the user to reenter missing/invalid information during payment.
?>

<?php
	// Generates a unique token, saves it in the session. This token is submitted to process_oder along with the other inputs.
	// Process_order will then compare the token in the session with the form-submitted token. If they are different, the
	// user is redirected to payment. This prevents direct access to process_order.php.
	session_start();
	$token = (string)rand();
	$_SESSION['token'] = $token;

	// Fix_order can only be accessed through process_order.php. Process_order generates a boolean value in the session
	// when the input data is invalid. Fix_order should only be accessed if this variable exists and is false.
	if (isset($_SESSION["fix_order"]) && $_SESSION["fix_order"] !== true){
		header('Location: payment.php');
	}
	// The session variable is destroyed as soon as this page is entered. Refreshing this page will thus take the user back to payment.
	// This prevents the user from reopening this page multiple times later.
	unset($_SESSION["fix_order"]);
?>

<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
    <meta name="author" content="Nguyen Quang Huy, Nguyen Tran Quang Minh">
    <meta name="description" content="Fix payment page">
    <meta name="keywords" content="maverick mates, payment, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fix payment - Maverick Mates</title>
	<link rel="icon" href="./images/logo.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/payment.css">
</head>

<body>
	<?php include("./header.inc") ?>

	<main id="enquiry">
		<header>
			<h1>Order Form</h1>
			<p class="error-message">Some of the information is missing or incorrect. Please refer to the invalid fields in red.</p>
		</header>
		<form action="process_order.php" method="post" novalidate>
			<input type="hidden" name="token" value="<?php echo $token; ?>">
			<!--The container formset contain all the label and input-->
			<div id="container">
				<fieldset>
					<legend>
						<h2>General Information</h2>
					</legend>
					<div class="control-container">
						<div>
							<!--This div contain the first and last name input-->
							<label for="fname">First name:</label>
							<?php
							echo '<input type="text" id="fname" name="first_name" value="' . $_SESSION["first_name"] . '"';
							if (isset($_GET["first_name"]) && $_GET["first_name"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
						<div>
							<label for="lname">Last name:</label>
							<?php
							echo '<input type="text" id="lname" name="last_name" value="' . $_SESSION["last_name"] . '"';
							if (isset($_GET["last_name"]) && $_GET["last_name"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
						<div>
							<!--This is the email input-->
							<label for="email">Email: </label>
							<?php
							echo '<input type="text" id="email" name="email" value="' . $_SESSION["email"] . '"';
							if (isset($_GET["email"]) && $_GET["email"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
						<div>
							<!--This is the phone number input-->
							<label for="phonenum">Phone number:</label>
							<?php
							echo '<input type="text" id="phonenum" name="phone_number" placeholder="Enter your phone number" value="' . $_SESSION["phone_number"] . '"';
							if (isset($_GET["phone_number"]) && $_GET["phone_number"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<!--The fieldset for address-->
					<legend>
						<h2>Address</h2>
					</legend>
					<div class="control-container">
						<div>
							<label for="street">Street Address:</label>
							<?php
							echo '<input type="text" id="street" name="street_address" value="' . $_SESSION["street_address"] . '"';
							if (isset($_GET["street_address"]) && $_GET["street_address"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
						<div>
							<label for="town">Surburb/Town:</label>
							<?php
							echo '<input type="text" id="town" name="town" value="' . $_SESSION["town"] . '"';
							if (isset($_GET["town"]) && $_GET["town"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
						<div>
							<label for="state">State:</label>
							<?php
							echo '<select name="state" id="state"';
							if (isset($_GET["state"]) && $_GET["state"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							switch ($_SESSION["state"]) {
								case "VIC":
									echo '
										<option value="">Please select your State</option>
										<option value="VIC" selected>VIC</option>
										<option value="NSW">NSW</option>
										<option value="QLD">QLD</option>
										<option value="NT">NT</option>
										<option value="WA">WA</option>
										<option value="SA">SA</option>
										<option value="TAS">TAS</option>
										<option value="ACT">ACT</option>
									</select>';
									break;
								case "NSW":
									echo '
										<option value="">Please select your State</option>
										<option value="VIC">VIC</option>
										<option value="NSW" selected>NSW</option>
										<option value="QLD">QLD</option>
										<option value="NT">NT</option>
										<option value="WA">WA</option>
										<option value="SA">SA</option>
										<option value="TAS">TAS</option>
										<option value="ACT">ACT</option>
									</select>';
									break;
								case "QLD":
									echo '
										<option value="">Please select your State</option>
										<option value="VIC">VIC</option>
										<option value="NSW">NSW</option>
										<option value="QLD" selected>QLD</option>
										<option value="NT">NT</option>
										<option value="WA">WA</option>
										<option value="SA">SA</option>
										<option value="TAS">TAS</option>
										<option value="ACT">ACT</option>
									</select>';
									break;
								case "NT":
									echo '
										<option value="">Please select your State</option>
										<option value="VIC">VIC</option>
										<option value="NSW" >NSW</option>
										<option value="QLD">QLD</option>
										<option value="NT"selected>NT</option>
										<option value="WA">WA</option>
										<option value="SA">SA</option>
										<option value="TAS">TAS</option>
										<option value="ACT">ACT</option>
									</select>';
									break;
								case "WA":
									echo '
										<option value="">Please select your State</option>
										<option value="VIC">VIC</option>
										<option value="NSW" >NSW</option>
										<option value="QLD">QLD</option>
										<option value="NT">NT</option>
										<option value="WA"selected>WA</option>
										<option value="SA">SA</option>
										<option value="TAS">TAS</option>
										<option value="ACT">ACT</option>
									</select>';
									break;
								case "SA":
									echo '
										<option value="">Please select your State</option>
										<option value="VIC">VIC</option>
										<option value="NSW" >NSW</option>
										<option value="QLD">QLD</option>
										<option value="NT">NT</option>
										<option value="WA">WA</option>
										<option value="SA"selected>SA</option>
										<option value="TAS">TAS</option>
										<option value="ACT">ACT</option>
									</select>';
									break;
								case "TAS":
									echo '
										<option value="">Please select your State</option>
										<option value="VIC">VIC</option>
										<option value="NSW" >NSW</option>
										<option value="QLD">QLD</option>
										<option value="NT">NT</option>
										<option value="WA">WA</option>
										<option value="SA">SA</option>
										<option value="TAS"selected>TAS</option>
										<option value="ACT">ACT</option>
									</select>';
									break;
								case "ACT":
									echo '
										<option value="">Please select your State</option>
										<option value="VIC">VIC</option>
										<option value="NSW" >NSW</option>
										<option value="QLD">QLD</option>
										<option value="NT">NT</option>
										<option value="WA">WA</option>
										<option value="SA">SA</option>
										<option value="TAS">TAS</option>
										<option value="ACT"selected>ACT</option>
									</select>';
									break;
								default:
									echo '
										<option value=""selected>Please select your State</option>
										<option value="VIC">VIC</option>
										<option value="NSW" >NSW</option>
										<option value="QLD">QLD</option>
										<option value="NT">NT</option>
										<option value="WA">WA</option>
										<option value="SA">SA</option>
										<option value="TAS">TAS</option>
										<option value="ACT">ACT</option>
									</select>';
							}
							?>
						</div>
						<div>
							<label for="pcode">Postcode:</label>
							<?php
							echo '<input type="text" id="pcode" name="postcode" value="' . $_SESSION["postcode"] . '"';
							if (isset($_GET["postcode"]) && $_GET["postcode"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>
						<h2>Order</h2>
					</legend>
					<!--Div for products selection-->
					<label for="product">Product:</label>
					<?php
					echo '<select name="product" id="product"';
					if (isset($_GET["product"]) && $_GET["product"] == "false") {
						echo ' class="error"';
					}
					echo ">";
					switch ($_SESSION["product"]) {
						case "Maverick Mates Knot Ring":
							echo '
								<option value="">
									Please select product you want to purchase
								</option>
								<option value="Maverick Mates Knot Ring" selected>
									Maverick Mates Knot Ring ($3899)
								</option>
								<option value="Maverick Mates Infinity Earring">
									Maverick Mates Infinity Earring ($5240)
								</option>
								<option value="Maverick Mates Double Bracelet">
									Maverick Mates Double Bracelet ($3000)
								</option>
								<option value="Maverick Mates Gemstone Pendant">
									Maverick Mates Gemstone Pendant ($6900)
								</option>
							</select>';
							break;
						case "Maverick Mates Infinity Earring":
							echo '
								<option value="">
									Please select product you want to purchase
								</option>
								<option value="Maverick Mates Knot Ring" >
									Maverick Mates Knot Ring ($3899)
								</option>
								<option value="Maverick Mates Infinity Earring"selected>
									Maverick Mates Infinity Earring ($5240)
								</option>
								<option value="Maverick Mates Double Bracelet">
									Maverick Mates Double Bracelet ($3000)
								</option>
								<option value="Maverick Mates Gemstone Pendant">
									Maverick Mates Gemstone Pendant ($6900)
								</option>
							</select>';
							break;
						case "Maverick Mates Double Bracelet":
							echo '
								<option value="">
									Please select product you want to purchase
								</option>
								<option value="Maverick Mates Knot Ring" >
									Maverick Mates Knot Ring ($3899)
								</option>
								<option value="Maverick Mates Infinity Earring">
									Maverick Mates Infinity Earring ($5240)
								</option>
								<option value="Maverick Mates Double Bracelet"selected>
									Maverick Mates Double Bracelet ($3000)
								</option>
								<option value="Maverick Mates Gemstone Pendant">
									Maverick Mates Gemstone Pendant ($6900)
								</option>
							</select>';
							break;
						case "Maverick Mates Gemstone Pendant":
							echo '
								<option value="">
									Please select product you want to purchase
								</option>
								<option value="Maverick Mates Knot Ring" >
									Maverick Mates Knot Ring ($3899)
								</option>
								<option value="Maverick Mates Infinity Earring">
									Maverick Mates Infinity Earring ($5240)
								</option>
								<option value="Maverick Mates Double Bracelet">
									Maverick Mates Double Bracelet ($3000)
								</option>
								<option value="Maverick Mates Gemstone Pendant"selected>
									Maverick Mates Gemstone Pendant ($6900)
								</option>
							</select>';
							break;

						default:
							echo '
						<option value=""selected>
							Please select product you want to purchase
						</option>
						<option value="Maverick Mates Knot Ring" >
							Maverick Mates Knot Ring ($3899)
						</option>
						<option value="Maverick Mates Infinity Earring">
							Maverick Mates Infinity Earring ($5240)
						</option>
						<option value="Maverick Mates Double Bracelet">
							Maverick Mates Double Bracelet ($3000)
						</option>
						<option value="Maverick Mates Gemstone Pendant">
							Maverick Mates Gemstone Pendant ($6900)
						</option>
					</select>';
							break;
					}
					?>



					<fieldset>
						<legend>
							<h3>Product feature:</h3>
						</legend>
						<!--About the product feature-->
						<div class="control-container">
							<div>
								<label>
									<?php
									echo 'Color:
									<select name="color"';
									if (isset($_GET["color"]) && $_GET["color"] == "false") {
										echo ' class="error"';
									}
									echo ">";
									switch ($_SESSION["color"]) {
										case "red":
											echo '<option value="red" selected>Red</option>
										<option value="pink">Pink</option>
										<option value="brown">Brown</option>
										<option value="white">White</option>
										<option value="gold">Gold</option>
										<option value="blue">Blue</option>
									</select>';
											break;
										case "pink":
											echo '<option value="red" >Red</option>
											<option value="pink"selected>Pink</option>
											<option value="brown">Brown</option>
											<option value="white">White</option>
											<option value="gold">Gold</option>
											<option value="blue">Blue</option>
										</select>';
											break;
										case "brown":
											echo '<option value="red" >Red</option>
												<option value="pink">Pink</option>
												<option value="brown"selected>Brown</option>
												<option value="white">White</option>
												<option value="gold" >Gold</option>
												<option value="blue">Blue</option>
											</select>';
											break;
										case "white":
											echo '<option value="red" >Red</option>
													<option value="pink">Pink</option>
													<option value="brown">Brown</option>
													<option value="white"selected>White</option>
													<option value="gold" >Gold</option>
													<option value="blue">Blue</option>
												</select>';
											break;
										case "gold":
											echo '<option value="red" >Red</option>
											<option value="pink">Pink</option>
											<option value="brown">Brown</option>
											<option value="white">White</option>
											<option value="gold" selected>Gold</option>
											<option value="blue">Blue</option>
										</select>';
											break;
										case "blue":
											echo '<option value="red">Red</option>
												<option value="pink">Pink</option>
												<option value="brown">Brown</option>
												<option value="white">White</option>
												<option value="gold" >Gold</option>
												<option value="blue"selected>Blue</option>
											</select>';
											break;
									}
									?>
								</label>
							</div>
							<div>
								<label>
									<?php
									echo 'Material:
									<select name="material"';
									if (isset($_GET["material"]) && $_GET["material"] == "false") {
										echo ' class="error"';
									}
									echo ">";
									switch ($_SESSION["material"]) {
										case "tungsten":
											echo '<option value="tungsten"selected>Tungsten</option>
											<option value="silver">Silver</option>
											<option value="gold" >Gold</option>
											<option value="platinum">Platinum</option>
											<option value="palladium">Palladium</option>
										</select>';
											break;
										case "silver":
											echo '<option value="tungsten">Tungsten</option>
											<option value="silver"selected>Silver</option>
											<option value="gold" >Gold</option>
											<option value="platinum">Platinum</option>
											<option value="palladium">Palladium</option>
										</select>';
											break;
										case "gold":
											echo '<option value="tungsten">Tungsten</option>
											<option value="silver">Silver</option>
											<option value="gold" selected>Gold</option>
											<option value="platinum">Platinum</option>
											<option value="palladium">Palladium</option>
										</select>';
											break;
										case "platinum":
											echo '<option value="tungsten">Tungsten</option>
											<option value="silver">Silver</option>
											<option value="gold" >Gold</option>
											<option value="platinum"selected>Platinum</option>
											<option value="palladium">Palladium</option>
										</select>';
											break;
										case "palladium":
											echo '<option value="tungsten">Tungsten</option>
											<option value="silver">Silver</option>
											<option value="gold" >Gold</option>
											<option value="platinum">Platinum</option>
											<option value="palladium"selected>Palladium</option>
										</select>';
											break;
									}
									?>
								</label>
							</div>
							<div>
								<label>
									<?php
									echo 'Gemstone:
									<select name="gemstone"';
									if (isset($_GET["gemstone"]) && $_GET["gemstone"] == "false") {
										echo ' class="error"';
									}
									echo ">";
									switch ($_SESSION["gemstone"]) {
										case "topaz":
											echo '<option value="topaz"selected>Topaz</option>
											<option value="citrine">Citrine</option>
											<option value="sapphire">Sapphire</option>
											<option value="emerald">Emerald</option>
											<option value="ruby">Ruby</option>
											<option value="diamond" >Diamond</option>
										</select>';
											break;
										case "citrine":
											echo '<option value="topaz">Topaz</option>
											<option value="citrine"selected>Citrine</option>
											<option value="sapphire">Sapphire</option>
											<option value="emerald">Emerald</option>
											<option value="ruby">Ruby</option>
											<option value="diamond" >Diamond</option>
										</select>';
											break;
										case "sapphire":
											echo '<option value="topaz">Topaz</option>
											<option value="citrine">Citrine</option>
											<option value="sapphire"selected>Sapphire</option>
											<option value="emerald">Emerald</option>
											<option value="ruby">Ruby</option>
											<option value="diamond" >Diamond</option>
										</select>';
											break;
										case "emerald":
											echo '<option value="topaz">Topaz</option>
											<option value="citrine">Citrine</option>
											<option value="sapphire">Sapphire</option>
											<option value="emerald"selected>Emerald</option>
											<option value="ruby">Ruby</option>
											<option value="diamond" >Diamond</option>
										</select>';
											break;
										case "ruby":
											echo '<option value="topaz">Topaz</option>
											<option value="citrine">Citrine</option>
											<option value="sapphire">Sapphire</option>
											<option value="emerald">Emerald</option>
											<option value="ruby"selected>Ruby</option>
											<option value="diamond" >Diamond</option>
										</select>';
											break;
										case "diamond":
											echo '<option value="topaz">Topaz</option>
												<option value="citrine">Citrine</option>
												<option value="sapphire">Sapphire</option>
												<option value="emerald">Emerald</option>
												<option value="ruby">Ruby</option>
												<option value="diamond" selected>Diamond</option>
											</select>';
											break;
									}
									?>


								</label>
							</div>
							<div>
								<label for="quantity">Quantity:</label>
								<?php
								echo '<input type="number" id="quantity" name="quantity" value="' . $_SESSION["quantity"] . '"';
								if (isset($_GET["quantity"]) && $_GET["quantity"] == "false") {
									echo ' class="error"';
								}
								echo ">";
								?>
							</div>
						</div>
					</fieldset>
				</fieldset>
				<fieldset>
					<legend>
						<h2>Credit Card Information</h2>
					</legend>
					<div class="control-container">
						<div>
							<label>Credit Card Type</label>
							<?php
							echo '<select name="card_type" id="card-type"';
							if (isset($_GET["card_type"]) && $_GET["card_type"] == "false") {
								echo ' class="error"';
							}
							echo ">";
									echo '<option value=""selected>Please select your credit card</option>
											<option value="visa">Visa</option>
											<option value="mastercard">Mastercard</option>
											<option value="american-express">American Express</option>
										</select>';
							?>


						</div>
						<div>
							<label for="card_name">Card Holder Name:</label>
							<?php
							echo '<input type="text" id="card_name" name="card_name"';
							if (isset($_GET["card_name"]) && $_GET["card_name"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
						<div>
							<label for="card-number">Card Number:</label>
							<?php
							echo '<input type="text" id="card_number" name="card_number"';
							if (isset($_GET["card_number"]) && $_GET["card_number"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
						<div>
							<label for="cardexpiry">Expiry Date:</label>
							<?php
							echo '<input type="text" id="cardexpiry" name="card_expiry" ';
							if (isset($_GET["card_expiry"]) && $_GET["card_expiry"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
						<div>
							<label for="cvv">Card verification value (CVV):</label>
							<?php
							echo '<input type="text" id="cvv" name="cvv" ';
							if (isset($_GET["cvv"]) && $_GET["cvv"] == "false") {
								echo ' class="error"';
							}
							echo ">";
							?>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>
						<h2>Other Information:</h2>
					</legend>
					<!--The div for preffered contact input-->
					<div>
						<p>Prefered Contact:</p>
						<?php
						if (isset($_GET["preffered_contact"]) && $_GET["preffered_contact"] == "false") {
							echo ' <p>
										<input type="radio" id="prefemail" name="preffered_contact" value="email" >
										<label for="prefemail" class = "error">Email</label>
									</p>
									<p>
										<input type="radio" id="prefpost" name="preffered_contact" value="post" >
										<label for="prefpost" class = "error">Post</label>
									</p>
									<p>
										<input type="radio" id="prefphone" name="preffered_contact" value="phone" >
										<label for="prefphone" class = "error">Phone</label>
									</p><br>';
						}
						switch ($_SESSION["preffered_contact"]) {
							case "email":
								echo '<p>
								<input type="radio" id="prefemail" name="preffered_contact" value="email" checked>
								<label for="prefemail">Email</label>
							</p>
							<p>
								<input type="radio" id="prefpost" name="preffered_contact" value="post">
								<label for="prefpost">Post</label>
							</p>
							<p>
								<input type="radio" id="prefphone" name="preffered_contact" value="phone">
								<label for="prefphone">Phone</label>
							</p><br>';
								break;
							case "post":
								echo '<p>
								<input type="radio" id="prefemail" name="preffered_contact" value="email">
								<label for="prefemail">Email</label>
							</p>
							<p>
								<input type="radio" id="prefpost" name="preffered_contact" value="post" checked>
								<label for="prefpost">Post</label>
							</p>
							<p>
								<input type="radio" id="prefphone" name="preffered_contact" value="phone">
								<label for="prefphone">Phone</label>
							</p><br>';
								break;
							case "phone":
								echo '<p>
								<input type="radio" id="prefemail" name="preffered_contact" value="email">
								<label for="prefemail">Email</label>
							</p>
							<p>
								<input type="radio" id="prefpost" name="preffered_contact" value="post">
								<label for="prefpost">Post</label>
							</p>
							<p>
								<input type="radio" id="prefphone" name="preffered_contact" value="phone" checked>
								<label for="prefphone">Phone</label>
							</p><br>';
								break;
						}
						?>
					</div>

					<!--The comment text area-->
					<label for="comment">Comment:</label><br>
					<textarea name="comment" id="comment" cols="50" rows="10"
						placeholder="Put your comment here..." value = "<?php $_SESSION["cvv"] ?>"></textarea>
				</fieldset>
				<?php	$_SESSION["fix_order"] = false     ?>
				<!--The submit button-->
				<button type="submit" id="submitbtn">Checkout</button>

			</div>
		</form>
	</main>

	<?php include("./footer.inc") ?>
</body>

</html>