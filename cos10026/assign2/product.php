<?php
	// filename: product.php
	// author: Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page showing all of Maverick Mates' products.
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="author" content="Pham Hung Manh, Ta Quang Tung">
    <meta name="description" content="Jewelry product page">
    <meta name="keywords" content="maverick mates, products, jewelry">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products - Maverick Mates</title>
	<link rel="icon" href="./images/logo.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/product.css">
</head>

<body>
    <?php include("./header.inc") ?>

    <main id="product">
        <aside>
            <h2>How to order a product</h2>
            <ol>
                <li><p>Shop around to find a product you like.</p></li>
                <li><p>Check the base price and the prices of customization options.</p></li>
                <li><p>Add it to <a href="./payment.php">cart</a>.</p></li>
            </ol>
            <h2>Customization options</h2>
            <p>Refer to the below table for additional customization costs. Simply add the cost of your desired custom
                feature to the base cost of the product.</p>
            <table>
                <tr>
                    <th></th>
                    <th>Tungsten</th>
                    <th>Silver</th>
                    <th>Gold</th>
                    <th>Platinum</th>
                    <th>Palladium</th>
                </tr>
                <tr>
                    <th>Topaz</th>
                    <td>$350</td>
                    <td>$450</td>
                    <td>$650</td>
                    <td>$850</td>
                    <td>$1050</td>
                </tr>
                <tr>
                    <th>Citrine</th>
                    <td>$450</td>
                    <td>$550</td>
                    <td>$750</td>
                    <td>$950</td>
                    <td>$1150</td>
                </tr>
                <tr>
                    <th>Sapphire</th>
                    <td>$550</td>
                    <td>$650</td>
                    <td>$850</td>
                    <td>$1050</td>
                    <td>$1250</td>
                </tr>
                <tr>
                    <th>Emerald</th>
                    <td>$700</td>
                    <td>$800</td>
                    <td>$1000</td>
                    <td>$1200</td>
                    <td>$1400</td>
                </tr>
                <tr>
                    <th>Ruby</th>
                    <td>$800</td>
                    <td>$900</td>
                    <td>$1100</td>
                    <td>$1300</td>
                    <td>$1500</td>
                </tr>
                <tr>
                    <th>Diamond</th>
                    <td>$900</td>
                    <td>$1000</td>
                    <td>$1200</td>
                    <td>$1400</td>
                    <td>$1600</td>
                </tr>
            </table>
        </aside>
        <article>
            <h1>Our products</h1>
            <section>
                <img src="./images/knot-ring.jpg" alt="Knot Ring picture. Courtesy of Tiffany Co.">
                <div>
                    <h2 id="knot-ring">Maverick Mates Knot Ring</h2>
                    <p>
                        Image credit: <a href="https://www.tiffany.com/jewelry/rings/tiffany-knot-ring-GRP11992">Tiffany</a>
                    </p>
                    <p>Drawing on themes of togetherness and inclusion, the knot represents the thread that binds us
                        into
                        one common humanity. It is a visual statement about the interpersonal bonds that define us. The
                        distinctive Maverick Mates pattern, which features intertwined ends, represents the strength of
                        human relationships. Each pattern is an intricate display of craftsmanship that strikes the
                        perfect
                        balance between power and grace. Crafted with yellow gold and draped in diamonds as the default
                        appearance, the ring offers a wide range of color, material, and gemstone customizations. Each
                        ring
                        is carefully hand-crafted, then hand-polished for a high gloss. Each round brilliant gemstone is
                        hand-set at exact angles to increase brilliance after being carefully selected to match Maverick
                        Mates's high standards. Crafted to be wearable by all genders, this ring can stand on its own or
                        be
                        paired with conventional silhouettes for a surprising combination.</p>
                    <p>Product features:</p>
                    <ul>
                        <li>Base price: $3899</li>
                        <li>Color option: Red, pink, brown, white, gold, blue.</li>
                        <li>Customizations: Material and attached gemstone.</li>
                    </ul>
                    <a class="order" href="./payment.php">Order</a>
                </div>
            </section>
            <section>
                <img src="./images/infinity-earring.jpg"
                    alt="Infinity Earring picture. Courtesy of Tiffany Co.">
                <div>
                    <h2 id="infinity-earring">Maverick Mates Infinity Earring</h2>
                    <p>
                        Image credit: <a href="https://www.tiffany.com/jewelry/earrings/tiffany-soleste-earrings-GRP09515">Tiffany</a>
                    </p>
                    <p>With hand-polished bezel-set gemstones that have been precisely matched for size, color, clarity,
                        and
                        presence, these earrings are a contemporary spin on traditional gemstone studs. The earring's
                        bezel-set stones completely altered the way that gemstones are used in fashion. Maverick Mates
                        Infinity Earring combines a special blend of cuts for a particularly romantic aesthetic, drawing
                        inspiration from the fire and shine of our exceptional gemstones. These elegant gemstone
                        earrings
                        have a traditional form that enhances the brilliant luster of the stones. Wear these gemstone
                        studs
                        by themselves or combine them with edgy drop earrings for a daring appearance. These earrings
                        come
                        standard in platinum and include diamonds and aquamarines.</p>
                    <p>Product features:</p>
                    <ul>
                        <li>Base price: $5240</li>
                        <li>Color option: Red, pink, brown, white, gold, blue.</li>
                        <li>Customizations: Material and attached gemstone.</li>
                    </ul>
                    <a class="order" href="./payment.php">Order</a>
                </div>
            </section>
            <section>
                <img src="./images/double-bracelet.jpg"
                    alt="Double Bracelet picture. Courtesy of Tiffany Co.">
                <div>
                    <h2 id="double-bracelet">Maverick Mates Double Bracelet</h2>
                    <p>
                        Image credit: <a href="https://www.tiffany.com/jewelry/bracelets/tiffany-solitaire-diamond-bracelet-GRP06969">Tiffany</a>
                    </p>
                    <p>The Maverick Mates Double Bracelet creates a stunning statement by reimagining gemstone jewelry
                        from
                        a modern perspective. The Double Bracelet was designed with a distinct romantic sensibility
                        using a
                        special blend of cuts that are inspired by the fire and shine of our exceptional gemstones. A
                        stunning gemstone with remarkable cut, color, clarity, and brilliance is the star of this
                        modernized
                        version of the line bracelet. This bracelet enables the gemstone to catch the light and make it
                        dance by striking a balance between simple lines and a stunning gemstone. The Double Bracelet is
                        a
                        concrete reminder of the connections we feel but can't always see. It is as multifaceted as it
                        is
                        iconic. Combine this bracelet with other styles for a look that is both contemporary and
                        elegant.
                        Comes in platinum and diamond by default.</p>
                    <p>Product features:</p>
                    <ul>
                        <li>Base price: $3000</li>
                        <li>Color option: Red, pink, brown, white, gold, blue.</li>
                        <li>Customizations: Material and attached gemstone.</li>
                    </ul>
                    <a class="order" href="./payment.php">Order</a>
                </div>
            </section>
            <section>
                <img src="./images/gemstone-pendant.jpg"
                    alt="Gemstone Pendant picture. Courtesy of Tiffany Co.">
                <div id="gemstone-pendant">
                    <h2>Maverick Mates Gemstone Pendant</h2>
                    <p>
                        Image credit: <a href="https://www.tiffany.com/jewelry/necklaces-pendants/tiffany-soleste-pendant-GRP09060">Tiffany</a>
                    </p>
                    <p>This pendant has a timeless appearance while remaining simple and elegant. The Maverick Mates
                        Gemstone Pendant personifies the most common action that brings people together and makes them
                        happy. Wearing the design serves to convey what is inside by symbolizing personal power and
                        indomitable strength. The centerpiece of this delicate and elegant pendant is a single
                        hand-polished
                        gemstone. The pendant's blend of fine, flowing chains, and bezel-set stones revolutionized the
                        use
                        of precious stones in clothing for all time. It hangs against the skin like a single drop of
                        light.
                        Layer this design with other pendants and necklaces of various lengths and metals for a look
                        that is
                        uniquely yours. Comes in platinum and diamond by default.</p>
                    <p>Product features:</p>
                    <ul>
                        <li>Base price: $6900</li>
                        <li>Color option: Red, pink, brown, white, gold, blue.</li>
                        <li>Customizations: Material and attached gemstone.</li>
                    </ul>
                    <a class="order" href="./payment.php">Order</a>    
                </div>
            </section>
        </article>
    </main>
    
    <?php include("./footer.inc") ?>
</body>

</html>