<?php
	// filename: enhancements.php
	// author: Nguyen Quang Huy, Ta Quang Tung
	// created: 02/04/23
	// last modified: 09/04/23
	// description: Page listing enhancements made as part of assignment 1.
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="author" content="Nguyen Quang Huy, Ta Quang Tung">
	<meta name="description" content="Descriptions of enhancements made on the website.">
	<meta name="keywords" content="maverick mates, enhancements, jewelry">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Enhancements I - Maverick Mates</title>
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
		<h1>Enhancements I</h1>
		<p id="subtitle">This page presents two enhancements we have made as part of assignment 1.</p>
		<section>
			<h2>Responsive navigation bar</h2>
			<p>
				Our website features a responsive navigation bar that links all of our pages together. It features a
				logo, which takes the user to the home page when clicked on, as well as five navigation links to the
				different pages of our website. For large screens (more than 704px, or 44em), the navigation links are
				laid out horizontally in a block. For smaller screen sizes, a button will appear in place of
				these links. Hovering on the button will make a panel containing the links to slide in from the right
				side of the screen. Moving the mouse outside of this panel will automatically collapse it.
			</p>
			<figure>
				<a href="./images/enhancements-navbar-large-screen.jpg">
					<img src="./images/enhancements-navbar-large-screen.jpg" alt="Large screen navigation bar appearance">
				</a>
				<figcaption>The navigation bar appearance for large screens. Click on the image to see the full size.
				</figcaption>
			</figure>
			<figure>
				<a href="./images/enhancements-navbar-small-screen.jpg">
					<img src="./images/enhancements-navbar-small-screen.jpg" alt="Small screen navigation bar appearance">
				</a>
				<figcaption>The navigation bar appearance for small screens. Click on the image to see the full size.
				</figcaption>
			</figure>
			<p>
				The HTML markup for the responsive navigation bar.
			</p>
			<pre>
&lt;header id=&quot;navbar&quot;&gt;
  &lt;a href=&quot;./index.html&quot; id=&quot;navbar-logo&quot;&gt;
	&lt;img src=&quot;./images/logo.png&quot; alt=&quot;logo&quot;&gt;
  &lt;/a&gt;
  &lt;button id=&quot;navbar-opener&quot;&gt;
	&lt;!-- The following SVG is the solid Bars icon taken from the FontAweseome library. Link: https://fontawesome.com/icons/bars?s=solid&f=classic --&gt;
	&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 448 512&quot;&gt;
	  &lt;!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --&gt;
	  &lt;path
		d=&quot;M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z&quot; /&gt;
	&lt;/svg&gt;
  &lt;/button&gt;
  &lt;div id=&quot;nav-container&quot;&gt;
	&lt;nav&gt;
	  &lt;ul&gt;
		&lt;li&gt;&lt;a href=&quot;./index.html&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;
		&lt;li&gt;&lt;a href=&quot;./product.html&quot;&gt;Products&lt;/a&gt;&lt;/li&gt;
		&lt;li&gt;&lt;a href=&quot;./enquire.html&quot;&gt;Enquiry&lt;/a&gt;&lt;/li&gt;
		&lt;li&gt;&lt;a href=&quot;./about.html&quot;&gt;About&lt;/a&gt;&lt;/li&gt;
		&lt;li&gt;&lt;a href=&quot;./enhancements.html&quot;&gt;Enhancements&lt;/a&gt;&lt;/li&gt;
	  &lt;/ul&gt;
	  &lt;p&gt;
		&#169; Copyright Maverick Mates 2023
	  &lt;/p&gt;
	&lt;/nav&gt;
  &lt;/div&gt;
&lt;/header&gt;
	  		</pre>
			<p>
				The CSS for the responsive navigation bar. Only key rulesets and
				properties needed for the responsivity of the navigation bar is
				included for the sake of brevity.
			</p>
			<pre>
#navbar #navbar-opener {
  display: none;
}

#navbar #nav-container {
  width: fit-content;
}

#navbar #nav-container nav ul {
  display: flex;
  list-style: none;
  gap: 2em;
}

@media screen and (max-width: 44em) {
  #navbar #nav-container {
	position: fixed;
	top: 0;
	right: 0;
	width: 70%;
	height: 100vh;
	overflow: hidden;
	/* On small screens, this nav container will be on top of the trigger button. */
	/* pointer-events: none tells the browser to ignore mouse events on the container, allowing hover events on the button to be fired. */
	pointer-events: none;
  }

  #navbar #nav-container nav {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	transform: translate(100%);
	transition: all 0.2s ease-in-out;
  }

  #navbar #nav-container nav ul {
	display: block;
  }

  #navbar #navbar-opener {
	display: block;
  }

  /* 
	This ruleset is applied to the nav container (which is a div) when: 
	- The trigger button is hovered on.
	- The nav container is hovered on.
  */
  #navbar #navbar-opener:hover + #nav-container,
  #navbar #nav-container:hover {
	pointer-events: all;
  }

  /* 
	This ruleset is applied to the nav element itself when: 
	- The trigger button is hovered on.
	- The nav container is hovered on.
  */
  #navbar #navbar-opener:hover + #nav-container nav,
  #navbar #nav-container:hover nav {
	transform: none;
  }
}
	  		</pre>
			<p>
				This navigation bar is present at the top of all the pages of our website, including this page. Change
				the screen dimensions to see how it works!
			</p>
		</section>
		<section>
			<h2>
				Additional CSS to create mobile-specific layouts
			</h2>
			<p>
				For this website, in addition to the layouts specified by the assignment
				requirements, we have also added additional CSS to create layouts specific
				to mobile devices. This allows users to browse our site on smaller screens
				without compromising the user experience.
			</p>
			<p>
				To achieve this responsivity, we have included a viewport meta tag in each of our
				HTML pages and CSS media queries to apply additional rulesets at specific breakpoints.
			</p>
			<pre>
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;				
	  		</pre>
			<p>
				Example CSS on the <a href="./product.html">product.html</a> page to achieve responsivity.
			</p>
			<pre>
@media screen and (max-width: 768px) {
  #product aside,
  #product article {
	float: none;
	width: auto;
  }
  
  #product aside {
	margin: 2em;
  }
  
  #product section {
	display: block;
	/* Removes the grid layout for small enough screens. */
  }
  
  /* Adds a bottom border for all sections except the last one. */
  #product section:not(:last-child) {
	padding-bottom: 2em;
	margin-bottom: 2em;
	border-bottom: solid 1px #ADB5BD;
  }
  
  #product section img {
	max-width: 280px;
	margin: 0 auto;
  }
  
  #product section div {
	border-left: none;
	margin-left: 0;
	padding-left: 0;
  }
  
  #product section h2 {
	text-align: center;
  }
}	
	  		</pre>
			<p>
				Responsive design is done throughout our website but is most noticeable on our
				<a href="./index.html">index.html</a> and <a href="./product.html">product.html</a>
				pages. Change the dimensions of your browser window on these pages and pay attention
				to the layout changes.
			</p>
		</section>
	</main>

	<?php include("./footer.inc") ?>
</body>

</html>