<?php
	// filename: payment.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page allowing customers to order products.
?>

<?php
	// Generates a unique token, saves it in the session. This token is submitted to process_oder along with the other inputs.
	// Process_order will then compare the token in the session with the form-submitted token. If they are different, the
	// user is redirected to payment. This prevents direct access to process_order.php.
	session_start();
	$token = (string)rand();
	$_SESSION['token'] = $token;
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
    <meta name="author" content="Nguyen Quang Huy, Nguyen Tran Quang Minh">
    <meta name="description" content="Payment page">
    <meta name="keywords" content="maverick mates, payment, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment - Maverick Mates</title>
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
							<input type="text" id="fname" name="first_name" <?php if (isset($_SESSION["user_first_name"])) echo 'value="' . $_SESSION["user_first_name"] . '"';?>>
						</div>
						<div>
							<label for="lname">Last name:</label>
							<input type="text" id="lname" name="last_name" <?php if (isset($_SESSION["user_last_name"])) echo 'value="' . $_SESSION["user_last_name"] . '"';?>>
						</div>
						<div>
							<!--This is the email input-->
							<label for="email">Email: </label>
							<input type="email" id="email" name="email" <?php if (isset($_SESSION["user_email"])) echo 'value="' . $_SESSION["user_email"] . '"';?>>
						</div>
						<div>
							<!--This is the phone number input-->
							<label for="phonenum">Phone number:</label>
							<input type="text" id="phonenum" name="phone_number" placeholder="Enter your phone number" <?php if (isset($_SESSION["user_phone"])) echo 'value="' . $_SESSION["user_phone"] . '"';?>>
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
							<input type="text" id="street" name="street_address" <?php if (isset($_SESSION["user_street_address"])) echo 'value="' . $_SESSION["user_street_address"] . '"';?>>
						</div>
						<div>
							<label for="town">Surburb/Town:</label>
							<input type="text" id="town" name="town" <?php if (isset($_SESSION["user_suburb"])) echo 'value="' . $_SESSION["user_suburb"] . '"';?>>
						</div>
						<div>
							<label for="state">State:</label>
							<select name="state" id="state">
								<option value="">Please select your State</option>
								<option value="VIC" <?php if (isset($_SESSION["user_state"]) && $_SESSION["user_state"] == "VIC") echo 'selected="selected"';?>>VIC</option>
								<option value="NSW" <?php if (isset($_SESSION["user_state"]) && $_SESSION["user_state"] == "NSW") echo 'selected="selected"';?>>NSW</option>
								<option value="QLD" <?php if (isset($_SESSION["user_state"]) && $_SESSION["user_state"] == "QLD") echo 'selected="selected"';?>>QLD</option>
								<option value="NT" <?php if (isset($_SESSION["user_state"]) && $_SESSION["user_state"] == "NT") echo 'selected="selected"';?>>NT</option>
								<option value="WA" <?php if (isset($_SESSION["user_state"]) && $_SESSION["user_state"] == "WA") echo 'selected="selected"';?>>WA</option>
								<option value="SA" <?php if (isset($_SESSION["user_state"]) && $_SESSION["user_state"] == "SA") echo 'selected="selected"';?>>SA</option>
								<option value="TAS" <?php if (isset($_SESSION["user_state"]) && $_SESSION["user_state"] == "TAS") echo 'selected="selected"';?>>TAS</option>
								<option value="ACT" <?php if (isset($_SESSION["user_state"]) && $_SESSION["user_state"] == "ACT") echo 'selected="selected"';?>>ACT</option>
							</select>
						</div>
						<div>
							<label for="pcode">Postcode:</label>
							<input type="text" id="pcode" name="postcode" <?php if (isset($_SESSION["user_postcode"])) echo 'value="' . $_SESSION["user_postcode"] . '"'?>>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>
						<h2>Order</h2>
					</legend>
					<!--Div for products selection-->
					<label for="product">Product:</label>
					<select name="product" id="product">
						<option value="">
							Please select product you want to purchase
						</option>
						<option value="Maverick Mates Knot Ring">
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
					</select>

					<fieldset>
						<legend>
							<h3>Product feature:</h3>
						</legend>
						<!--About the product feature-->
						<div class="control-container">
							<div>
								<label>
									Color:
									<select name="color">
										<option value="red">Red</option>
										<option value="pink">Pink</option>
										<option value="brown">Brown</option>
										<option value="white">White</option>
										<option value="gold" selected>Gold</option>
										<option value="blue">Blue</option>
									</select>
								</label>
							</div>
							<div>
								<label>
									Material:
									<select name="material">
										<option value="tungsten">Tungsten</option>
										<option value="silver">Silver</option>
										<option value="gold" selected>Gold</option>
										<option value="platinum">Platinum</option>
										<option value="palladium">Palladium</option>
									</select>
								</label>
							</div>
							<div>
								<label>
									Gemstone:
									<select name="gemstone">
										<option value="topaz">Topaz</option>
										<option value="citrine">Citrine</option>
										<option value="sapphire">Sapphire</option>
										<option value="emerald">Emerald</option>
										<option value="ruby">Ruby</option>
										<option value="diamond" selected>Diamond</option>
									</select>
								</label>
							</div>
							<div>
								<label for="quantity">Quantity:</label>
								<input type="number" name="quantity" id="quantity">
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
							<select name="card_type" id="card-type">
								<option value="">Please select your credit card</option>
								<option value="visa">Visa</option>
								<option value="mastercard">Mastercard</option>
								<option value="american-express">American Express</option>
							</select>
						</div>
						<div>
							<label for="card_name">Card Holder Name:</label>
							<input type="text" name="card_name" id="card_name">
						</div>
						<div>
							<label for="card-number">Card Number:</label>
							<input type="text" name="card_number" id="card-number">
						</div>
						<div>
							<label for="cardexpiry">Expiry Date:</label>
							<input type="text" id="cardexpiry" name="card_expiry" placeholder="mm-yy">
						</div>
						<div>
							<label for="cvv">Card verification value (CVV):</label>
							<input type="text" id="cvv" name="cvv">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>
						<h2>Other Information:</h2>
					</legend>
					<!--The div for prefferd contact input-->
					<div>
						<p>Prefered Contact:</p>
						<p>
							<input type="radio" id="prefemail" name="preffered_contact" value="email">
							<label for="prefemail">Email</label>
						</p>
						<p>
							<input type="radio" id="prefpost" name="preffered_contact" value="post">
							<label for="prefpost">Post</label>
						</p>
						<p>
							<input type="radio" id="prefphone" name="preffered_contact" value="phone">
							<label for="prefphone">Phone</label>
						</p><br>
					</div>

					<!--The comment text area-->
					<label for="comment">Comment:</label><br>
					<textarea name="comment" id="comment" cols="50" rows="10"
						placeholder="Put your comment here..."></textarea>
				</fieldset>

				<!--The submit button-->
				<button type="submit" id="submitbtn">Checkout</button>

			</div>
		</form>
	</main>

	<?php include("./footer.inc") ?>
</body>

</html>