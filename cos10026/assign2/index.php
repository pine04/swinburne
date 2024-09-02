<?php
	// filename: index.php
	// author: Nguyen Thanh Trung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Index page showing introductory information of Maverick Mates.
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Nguyen Thanh Trung">
    <meta name="description" content="Index page">
    <meta name="keywords" content="maverick mates, index, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Maverick Mates</title>
	<link rel="icon" href="./images/logo.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/index.css">
</head>

<body>
    <main id="home">
        <div class="container">
            <?php include("./header.inc") ?>
            <div class="container3">
                <div class="des">
                    <h1>Maverick: a person who is not afraid <br> of being themselves.</h1>
                    <p>Jewelry that makes you always feel true hearted & authentic</p><br>
                    <a class="product" href="./product.php">In Stock Products</a>
                </div>

                <div class="des2">
                    <p>Get started with an <a href="./payment.php">order</a> here!</p>
                    <p>While you're at it, watch our <a href="https://youtu.be/3ebya7UZICE" target="_blank">video</a>!</p>
                </div>
            </div>
        </div>
        <div class="thumbnail-section">
            <div class="container2">
                <a href="./product.php#double-bracelet">
                    <img src="./images/double-bracelet.jpg" class="item-thumbnail" alt="item1">
                </a>
                <a href="./product.php#gemstone-pendant">
                    <img src="./images/gemstone-pendant.jpg" class="item-thumbnail" alt="item2">
                </a>
                <a href="./product.php#infinity-earring">
                    <img src="./images/infinity-earring.jpg" class="item-thumbnail" alt="item3">
                </a>
            </div>
        </div>
    </main>

    <?php include("./footer.inc") ?>
</body>

</html>