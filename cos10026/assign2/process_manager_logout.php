<?php
	// filename: process_manager_logout.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Script processing management logout. Does not generate any content.
?>

<?php
    session_start();
    // Unset the session variables associated with the manager and redirect to the home page.
    unset($_SESSION["manager_id"], $_SESSION["manager_username"], $_SESSION["manager_login_time"]);
    header("Location: index.php");            
?>