<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Photo uploading website">
    <meta name="keywords" content="aws, photo uploading">
    <title>Photo Uploader</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&family=Wix+Madefor+Text:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles.css">
</head>

<body>
    <main class="main-content">
        <div class="content-left">
            <h1 class="title">
                Photo
                <br class="title-break">
                uploader
            </h1>
        </div>
        <div class="content-right">
            <form class="form">
                <div class="form-fields">
                    <label>
                        Photo title
                        <input type="text" name="title">
                    </label>
                    <label>
                        Photo description
                        <input type="text" name="description">
                    </label>
                    <label>
                        Date taken
                        <input type="date" name="date">
                    </label>
                    <label>
                        Keywords (comma-separated)
                        <input type="text" name="keywords" placeholder="E.g.: family, fun, vacation">
                    </label>
                    <label>
                        File upload
                        <input type="file" name="photo">
                    </label>
                </div>
                <input type="submit" value="Upload">
                <p class="link-text">Go to <a href="./photolookup.php">photo lookup</a>.</p>
            </form>
        </div>
    </main>
</body>

</html>