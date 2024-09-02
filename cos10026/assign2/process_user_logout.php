<?php
	// filename: process_user_logout.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Script processing user logout. Does not generate any content.
?>

<?php
    session_start();
    // Unset the session variables associated with the user and redirect to the home page.
    unset($_SESSION["user_id"],
        $_SESSION["user_first_name"],
        $_SESSION["user_last_name"],
        $_SESSION["user_email"], 
        $_SESSION["user_phone"],
        $_SESSION["user_street_address"],
        $_SESSION["user_suburb"],
        $_SESSION["user_state"],
        $_SESSION["user_postcode"]);
    header("Location: index.php");            
?>