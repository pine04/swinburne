<header id="navbar">
    <a href="./index.php" id="navbar-logo">
        <img src="./images/logo.png" alt="logo">
    </a>
    <button id="navbar-opener">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
    </button>
    <div id="nav-container" class="navbar">
        <nav>
            <ul>
                <li><a href="./index.php">Home</a></li>
                <li>
                    <div class="dropdown">
                        <a href="./product.php">Products</a>
                        <div class="dropdown-content">
                            <a href="./product.php#knot-ring">Knot Ring</a>
                            <a href="./product.php#infinity-earring">Infinity Earring </a>
                            <a href="./product.php#double-bracelet">Double Bracelet</a>
                            <a href="./product.php#gemstone-pendant">Gemstone Pendant</a>
                            <img src="./images/navpic.jpg" class="navpic" alt="jewelry">
                        </div>
                    </div>
                </li>
                <li><a href="./payment.php">Purchase</a></li>
                <li><a href="./manager.php">Manage</a></li>
                <li><a href="./about.php">About</a></li>
                <li><a href="./enhancements.php">Enhancements I</a></li>
                <li><a href="./enhancements2.php">Enhancements II</a></li>
                <?php
                    if (session_status() === PHP_SESSION_NONE) {
                        session_start();
                    }
                    if (isset($_SESSION["user_id"])) {
                        echo "<li><a href=\"./profile.php\">Profile</a></li>";
                        echo "<li><a href=\"./process_user_logout.php\">Log out</a></li>";
                    } else {
                        echo "<li><a href=\"./register.php\">Register</a></li>";
                        echo "<li><a href=\"./login.php\">Log in</a></li>";
                    }
                ?>
            </ul>
            <p>
                &#169; Copyright Maverick Mates 2023
            </p>
        </nav>
    </div>
</header>