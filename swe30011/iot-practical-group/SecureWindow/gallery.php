<!DOCTYPE html>
<html>

<head>
	<title>Tripwire Window Photo Archive</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
	<p class="text-center my-4 fs-3"><a href="./window.php"><< Back to window control page</a></p>
	<h1 class="text-center fs-1 my-5">Tripwire Window Photo Archive</h1>

	<?php
	
	$image_extensions = array("png", "jpg", "jpeg");

	if (isset($_GET["delete"])) {
		$imageFileType = strtolower(pathinfo($_GET["delete"], PATHINFO_EXTENSION));
		if (file_exists($_GET["delete"]) && in_array($imageFileType, $image_extensions)) {
			echo "<p class='alert alert-success mx-5' role='alert'>Successfully deleted file: " . $_GET["delete"] . "</p>";
			unlink($_GET["delete"]);
		} else {
			echo "<p class='alert alert-danger mx-5' role='alert'>File not found - <a href='./gallery.php'>refresh</a></p>";
		}
	}
	
	$dir = './uploads/';
	if (is_dir($dir)) {
		echo '<div class="row">';
		$count = 1;
		$files = scandir($dir);
		rsort($files);
		foreach ($files as $file) {
			if ($file != '.' && $file != '..') { ?>
				<div class="col-lg-4 col-md-6" style="display: flex; flex-direction: column; align-items: center">
					<p>
						<a href="./gallery.php?delete=<?php echo $dir . $file; ?>">
						Delete photo
						</a> - <?php echo $file; ?>
					</p>
					<a href="<?php echo $dir . $file; ?>" style="display: block">
						<img src="<?php echo $dir . $file; ?>" class="img-fluid" loading="lazy"/>
					</a>
				</div>
				<?php
				$count++;
			}
		}
	}

	if ($count == 1) {
		echo "<p>No images found</p>";
	}
	?>
	</div>
</body>

</html>