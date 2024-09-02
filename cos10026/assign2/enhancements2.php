<?php
	// filename: enhancements2.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page listing enhancements made as part of assignment 2.
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="author" content="Ta Quang Tung">
	<meta name="description" content="Descriptions of enhancements made on the website as part of assignment 2.">
	<meta name="keywords" content="maverick mates, enhancements 2, jewelry">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Enhancements II - Maverick Mates</title>
	<link rel="icon" href="./images/logo.ico">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="./styles/style.css">
	<link rel="stylesheet" href="./styles/enhancements.css">
</head>

<body>
	<?php include("./header.inc") ?>

	<main id="enhancements">
		<h1>Enhancements II</h1>
		<p id="subtitle">This page presents two enhancements we have made as part of assignment 2.</p>
		<section>
			<h2>User authentication</h2>
			<p>
				The first enhancement enables users to sign up for a user account, granting them several benefits.
				These benefits include tracking their recent purchase history, seeing their top three 
				favorite items, and having their personal information automatically completed while filling 
				the payment form.
			</p>
			<figure>
				<a href="./images/enhancements-user-profile.png">
					<img src="./images/enhancements-user-profile.png" alt="User profile page">
				</a>
				<figcaption>
					The user profile page. Click on the image to see the full size.
				</figcaption>
			</figure>
			<figure>
				<a href="./images/enhancements-autofill-fields.png">
					<img src="./images/enhancements-autofill-fields.png" alt="Payment form with personal info auto-completed.">
				</a>
				<figcaption>
					The form with some fields auto-completed thanks to authentication. Click on the image to see the full size.
				</figcaption>
			</figure>
			<p>
				To store data related to the user, we created a <code>users</code> table with the following schema:
			</p>		
<pre>CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  email TEXT NOT NULL,
  phone VARCHAR(10) NOT NULL,
  street_address VARCHAR(40) NOT NULL,
  suburb VARCHAR(20) NOT NULL,
  state ENUM('ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA') NOT NULL,
  postcode VARCHAR(4) NOT NULL,
  password TEXT NOT NULL
);</pre>
			<p>
				When a user logs in, their <code>user_id</code> and personal information are stored as variables in a session. 
				Several pages will check for the presence of the <code>user_id</code> in the session to manage access.
			</p>
			<p>
				In order for users to see their purchases, they need to be linked with orders in the <code>orders</code> table.
				We decided against using a foreign key directly in the <code>orders</code> table to minimize impact should any 
				changes be made. We instead chose to create a separate table called <code>user_order</code> whose records consist 
				of three columns: <code>id</code> as the primary key, <code>user_id</code> which references the user, and <code>order_id</code> which references 
				the order. The schema for this table is as follows:
			</p>		
<pre>CREATE TABLE user_order (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);</pre>
			<p>
				In the PHP code, we queried for the most recent orders associated with a user with the following query:
			</p>	
<pre>SELECT * FROM user_order
INNER JOIN users ON user_order.user_id = users.user_id
INNER JOIN orders ON user_order.order_id = orders.order_id
WHERE users.user_id = '$user_id'
ORDER BY order_time DESC
LIMIT 25;</pre>
			<p>
				where <code>$user_id</code> is the ID of the logged-in user.
			</p>
			<p>
				The user's favorite items are based on the number of times they have bought them. The top three products 
				are listed.
			</p>	
<pre>SELECT product_name, COUNT(orders.order_id) AS count FROM user_order
INNER JOIN users ON user_order.user_id = users.user_id
INNER JOIN orders ON user_order.order_id = orders.order_id
WHERE users.user_id = '$user_id'
GROUP BY product_name
ORDER BY count DESC
LIMIT 3;</pre>
		</section>
		<section>
			<h2>
				Manager authentication
			</h2>
			<p>
				The second enhancement provides a low level of security for the management page. 
				This page is restricted to users with management accounts, which can only be created 
				with our secret security code. The secret code is a security measure to prevent guest 
				users from creating management accounts. This code can be obtained in the README.txt 
				file inside our zip submission. After logging in, the manager will be granted a 30 
				minute session in which they can access and modify the management page. When this 
				session expires, they will be logged out automatically and will need to log in again.
			</p>
			<figure>
				<a href="./images/enhancements-manage-auth.png">
					<img src="./images/enhancements-manage-auth.png" alt="The management page. Notice the time notice.">
				</a>
				<figcaption>
					The management page. Notice the time notice. Click on the image to see the full size.
				</figcaption>
			</figure>
			<p>
				To store information related to managers, we created a table with the following schema:
			</p>	
<pre>CREATE TABLE managers (
  manager_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);</pre>
			<p>
				After the manager logs in, the <code>manager_id</code>, username, and login time will be stored as 
				session variables. The presence of the <code>manager_id</code> is what determines whether the manager 
				is logged in or not. The login time is used to keep track of how much time the manager 
				has left before having to log in again.
			</p>
		</section>
	</main>

	<?php include("./footer.inc") ?>
</body>

</html>