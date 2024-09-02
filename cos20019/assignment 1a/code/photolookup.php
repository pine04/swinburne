<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Ta Quang Tung">
    <meta name="description" content="Photo lookup website">
    <meta name="keywords" content="aws, photo lookup">
    <title>Photo Lookup</title>
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
                lookup
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
                        Keywords (comma-separated)
                        <input type="text" name="keywords" placeholder="E.g.: family, fun, vacation">
                    </label>
                    <label>
                        From
                        <input type="date" name="from">
                    </label>
                    <label>
                        To
                        <input type="date" name="to">
                    </label>
                </div>
                <input type="submit" value="Search">
                <p class="link-text">Go to <a href="./photouploader.php">photo uploader</a>.</p>
            </form>
        </div>
    </main>
</body>

</html>