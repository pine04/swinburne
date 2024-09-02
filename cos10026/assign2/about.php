<?php
	// filename: about.php
	// author: Nguyen Tran Quang Minh
	// created: 02/04/23
	// last modified: 09/04/23
	// description: About page showing team members' information.
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="author" content="Nguyen Tran Quang Minh">
	<meta name="description" content="About us">
	<meta name="keywords" content="maverick mates, about, jewelry">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>About Us - Maverick Mates</title>
	<link rel="icon" href="./images/logo.ico">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="./styles/style.css">
	<link rel="stylesheet" href="./styles/about.css">
</head>

<body>
	<?php include("./header.inc") ?>

	<main id="about">
		<h1>About</h1>
		<nav>
			<p class="menu"><a href="#Tung">Quang Tung</a></p>
			<p class="menu"><a href="#Huy">Quang Huy</a></p>
			<p class="menu"><a href="#Trung">Thanh Trung</a></p>
			<p class="menu"><a href="#Manh">Hung Manh</a></p>
			<p class="menu"><a href="#Minh">Quang Minh</a></p>
		</nav>
		<hr>
		<section id="Tung">
			<h2>Personal Information</h2>
			<dl>
				<dt>Name:</dt>
				<dd>Quang Tung</dd>
				<dt>Student ID:</dt>
				<dd>104222196</dd>
				<dt>Course:</dt>
				<dd><a href="https://swinburne.instructure.com/courses/48290" target="_blank">COS10026</a></dd>
				<dt>Email:</dt>
				<dd><a href="mailto:104222196@student.swin.edu.au" target="_blank">104222196@student.swin.edu.au</a></dd>
			</dl>

			<figure class="photo-figure">
				<img src="./images/ta-quang-tung.jpg" alt="Tung">
				<figcaption></figcaption>
			</figure>

			<h2>Swinburne Timetable</h2>
			<table>
				<tr>
					<th>Time</th>
					<th>Sun</th>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
				</tr>
				<tr>
					<td>13h-16h</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td>COS10005</td>
					<td></td>
				</tr>
				<tr>
					<td>13h-17h</td>
					<td></td>
					<td></td>
					<td></td>
					<td>TNE10006</td>
					<td>COS10026</td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<h2>Demographic Information</h2>

			<ul>
				<li>Name: Ta Quang Tung</li>
				<li>Age: 18</li>
				<li>Gender: Male</li>
				<li>Occupation: Student</li>
				<li>Education: High School Graduation</li>
				<li>Location: Hanoi, Vietnam</li>
			</ul>

			<h2>Hometown</h2>
			<p>
				I was born and raised in Hanoi. As the bustling capital city of Vietnam,
				Hanoi keeps people moving constantly, whether physically or mentally.
				The city serves as one of the key economic centers of the nation as well
				as an important cultural hotspot for both locals and tourists alike. The
				city landscape reflects both the past and present, with modern high-rise
				towers coexisting with historical quarters.
			</p>

			<h2>Favorite Things</h2>

			<h3>Books</h3>
			<ul class="Favorite">
				<li>21 Lessons for the 21st Century by Yuval Noah Harari</li>
				<li>The Case Against Reality by Donald Hoffman</li>
				<li>The Interpretation of Dreams by Sigmund Freud</li>
			</ul>

			<h3>Music</h3>
			<ul class="Favorite">
				<li>All Too Well (Taylor's Version) by Taylor Swift</li>
				<li>Hard Feelings/Loveless by Lorde</li>
				<li>SAOKO by ROSALÍA</li>
			</ul>

			<h3>Films</h3>
			<ul class="Favorite">
				<li>The Haunting of Hill House</li>
				<li>Soul</li>
				<li>The Last Of Us</li>
			</ul>
		</section>
		<hr>
		<section id="Huy">
			<h2>Personal Information</h2>
			<dl>
				<dt>Name:</dt>
				<dd>Quang Huy</dd>
				<dt>Student ID:</dt>
				<dd>104169507</dd>
				<dt>Course:</dt>
				<dd><a href="https://swinburne.instructure.com/courses/48290" target="_blank">COS10026</a></dd>
				<dt>Email:</dt>
				<dd><a href="mailto:104169507@student.swin.edu.au" target="_blank">104169507@student.swin.edu.au</a></dd>
			</dl>

			<figure class="photo-figure">
				<img src="./images/nguyen-quang-huy.jpg" alt="Huy">
				<figcaption></figcaption>
			</figure>

			<h2>Swinburne Timetable</h2>
			<table>
				<tr>
					<th>Time</th>
					<th>Sun</th>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
				</tr>
				<tr>
					<td>13h-16h</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td>COS10005</td>
					<td></td>
				</tr>
				<tr>
					<td>13h-17h</td>
					<td></td>
					<td></td>
					<td></td>
					<td>TNE10006</td>
					<td>COS10026</td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<h2>Demographic Information</h2>

			<ul>
				<li>Name: Nguyen Quang Huy</li>
				<li>Age: 18</li>
				<li>Gender: Male</li>
				<li>Occupation: Student</li>
				<li>Education: High School Graduation</li>
				<li>Location: Hanoi, Vietnam</li>
			</ul>

			<h2>Hometown</h2>
			<p>
				My hometown is Hanoi, the capital city of Vietnam. I was born and have
				lived here for almost 19 years, so I am strongly connected with this
				city. Although Hanoi is always busy and crowded, it is undeniable that
				this place is a beautiful place for people to settle down. Lastly, Hanoi
				is not the most liveable place in Vietnam but for me, it is always the
				best place for me to come back to after a long trip.
			</p>

			<h2>Favorite Things</h2>

			<h3>Books</h3>
			<ul class="Favorite">
				<li>Totto-Chan: The Little Girl at the Window by Tetsuko Kuroyanagi</li>
				<li>The Alchemist by Paulo Coelho</li>
				<li>Sherlock Holmes by Conan Doyle</li>
			</ul>

			<h3>Music</h3>
			<ul class="Favorite">
				<li>Unstoppable by Sia</li>
				<li>Titanium by David Guetta</li>
				<li>Dreamer by Jungkook</li>
			</ul>

			<h3>Films</h3>
			<ul class="Favorite">
				<li>Titanic</li>
				<li>Avatar</li>
				<li>Avatar 2</li>
			</ul>
		</section>
		<hr>
		<section id="Trung">
			<h2>Personal Information</h2>
			<dl>
				<dt>Name:</dt>
				<dd>Thanh Trung</dd>
				<dt>Student ID:</dt>
				<dd>104060260</dd>
				<dt>Course:</dt>
				<dd><a href="https://swinburne.instructure.com/courses/48290" target="_blank">COS10026</a></dd>
				<dt>Email:</dt>
				<dd><a href="mailto:104060260@student.swin.edu.au" target="_blank">104060260@student.swin.edu.au</a></dd>
			</dl>

			<figure class="photo-figure">
				<img src="./images/nguyen-thanh-trung.jpg" alt="Trung">
				<figcaption></figcaption>
			</figure>

			<h2>Swinburne Timetable</h2>
			<table>
				<tr>
					<th>Time</th>
					<th>Sun</th>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
				</tr>
				<tr>
					<td>13h-16h</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td>COS10005</td>
					<td></td>
				</tr>
				<tr>
					<td>13h-17h</td>
					<td></td>
					<td></td>
					<td></td>
					<td>TNE10006</td>
					<td>COS10026</td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<h2>Demographic Information</h2>

			<ul>
				<li>Name: Nguyen Thanh Trung</li>
				<li>Age: 18</li>
				<li>Gender: Male</li>
				<li>Occupation: Student</li>
				<li>Education: High School Graduation</li>
				<li>Location: Hanoi, Vietnam</li>
			</ul>

			<h2>Hometown</h2>
			<p>
				My home town is in Dan Phuong. It is really peaceful. I enjoy walking
				around my hometown with my cousin. Very nice
			</p>

			<h2>Favorite Things</h2>

			<h3>Books</h3>
			<ul class="Favorite">
				<li>The devotion of suspect X by Keigo</li>
				<li>Tuổi thơ dữ dội by Phung Quan</li>
				<li>Diary of a wimpy kid by Jeff Kinney</li>
			</ul>

			<h3>Music</h3>
			<ul class="Favorite">
				<li>Harder, Better, Faster, Stronger by Daft Punk</li>
				<li>Ruthless by Marias</li>
				<li>New light by John Mayer</li>
			</ul>

			<h3>Films</h3>
			<ul class="Favorite">
				<li>Spiderman: No way home</li>
				<li>Glorious Basterds</li>
				<li>Pulp Fiction</li>
			</ul>
		</section>
		<hr>
		<section id="Manh">
			<h2>Personal Information</h2>
			<dl>
				<dt>Name:</dt>
				<dd>Hung Manh</dd>
				<dt>Student ID:</dt>
				<dd>104175232</dd>
				<dt>Course:</dt>
				<dd><a href="https://swinburne.instructure.com/courses/48290" target="_blank">COS10026</a></dd>
				<dt>Email:</dt>
				<dd><a href="mailto:104175232@student.swin.edu.au" target="_blank">104175232@student.swin.edu.au</a></dd>
			</dl>

			<figure class="photo-figure">
				<img src="./images/pham-hung-manh.jpg" alt="Manh">
				<figcaption></figcaption>
			</figure>

			<h2>Swinburne Timetable</h2>
			<table>
				<tr>
					<th>Time</th>
					<th>Sun</th>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
				</tr>
				<tr>
					<td>13h-17h</td>
					<td></td>
					<td></td>
					<td></td>
					<td>TNE10006</td>
					<td>COS10026</td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<h2>Demographic Information</h2>

			<ul>
				<li>Name: Pham Hung Manh</li>
				<li>Age: 18</li>
				<li>Gender: Male</li>
				<li>Occupation: Student</li>
				<li>Education: High School Graduation</li>
				<li>Location: Hanoi, Vietnam</li>
			</ul>

			<h2>Hometown</h2>
			<p>
				Located in Vietnam's northeast, Quang Ninh is a seaside province.
				Because of the sea, islands, plains, midlands, hills, and borders, Quang
				Ninh, which is bordered by China, is seen as a tiny version of Vietnam.
				Quang Ninh is included in both the northern major economic region and
				the northern coastline region, according to the economic development
				plan. This is Vietnam's primary coal-mining province. Quang Ninh is
				currently moving in the direction of making tourism a priority while
				also protecting the ecosystem on the islands. There are various
				historical sites in Quang Ninh, such as Yen Tu scenic area in Uong Bi
				city and Ha Long Bay in Ha Long city.
			</p>

			<h2>Favorite Things</h2>

			<h3>Books</h3>
			<ul class="Favorite">
				<li>The Picture of Dorian Gray by Oscar Wilde</li>
				<li>The Alchemist by Paulo Coelho</li>
				<li>Sapiens: A Brief History of Humankind by Yuval Noah Harari</li>
			</ul>

			<h3>Music</h3>
			<ul class="Favorite">
				<li>Happy for you by Lukas Graham</li>
				<li>Golden Hour by JVKE</li>
				<li>Unholy by Sam Smith</li>
			</ul>

			<h3>Films</h3>
			<ul class="Favorite">
				<li>The Grand Budapest Hotel</li>
				<li>Blade Runner</li>
				<li>Amélie</li>
			</ul>
		</section>
		<hr>
		<section id="Minh">
			<h2>Personal Information</h2>
			<dl>
				<dt>Name:</dt>
				<dd>Quang Minh</dd>
				<dt>Student ID:</dt>
				<dd>104179687</dd>
				<dt>Course:</dt>
				<dd><a href="https://swinburne.instructure.com/courses/48290" target="_blank">COS10026</a></dd>
				<dt>Email:</dt>
				<dd><a href="mailto:104179687@student.swin.edu.au" target="_blank">104179687@student.swin.edu.au</a></dd>
			</dl>

			<figure class="photo-figure">
				<img src="./images/nguyen-tran-quang-minh.jpg" alt="Minh">
				<figcaption></figcaption>
			</figure>

			<h2>Swinburne Timetable</h2>
			<table>
				<tr>
					<th>Time</th>
					<th>Sun</th>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
				</tr>
				<tr>
					<td>8h-12h</td>
					<td></td>
					<td></td>
					<td></td>
					<td>TNE10006</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>13h-17h</td>
					<td></td>
					<td></td>
					<td></td>
					<td>JOU10007</td>
					<td>COS10026</td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<h2>Demographic Information</h2>

			<ul>
				<li>Name: Nguyen Tran Quang Minh</li>
				<li>Age: 18</li>
				<li>Gender: Male</li>
				<li>Occupation: Student</li>
				<li>Education: High School Graduation</li>
				<li>Location: Hanoi, Vietnam</li>
			</ul>

			<h2>Hometown</h2>
			<p>
				Hanoi is the vibrant and bustling capital city of Vietnam, situated in
				the northern part of the country. It is known for its rich history,
				ancient architecture, and delicious street food. As you walk through the
				busy streets, you will see a blend of modern buildings and old French
				colonial buildings. The city is home to many museums, temples, and other
				cultural sites that offer a glimpse into Vietnam's past. The local
				people are friendly and welcoming, and there is always something
				exciting happening, from traditional festivals to trendy cafes and bars.
				Overall, Hanoi is a fascinating and exciting place to live, with a
				unique mix of tradition and modernity.
			</p>

			<h2>Favorite Things</h2>

			<h3>Books</h3>
			<ul class="Favorite">
				<li>The Great Gatsby by F. Scott Fitzgerald</li>
				<li>To Kill a Mockingbird by Harper Lee</li>
				<li>Animal Farm by George Orwell</li>
			</ul>

			<h3>Music</h3>
			<ul class="Favorite">
				<li>Stairway to Heaven by Led Zeppelin</li>
				<li>Bohemian Rhapsody by Queen</li>
				<li>Smells Like Teen Spirit by Nirvana</li>
			</ul>

			<h3>Films</h3>
			<ul class="Favorite">
				<li>The Godfather</li>
				<li>Star Wars: Episode IV - A New Hope</li>
				<li>The Shawshank Redemption</li>
			</ul>
		</section>
	</main>
	
	<?php include("./footer.inc") ?>
</body>

</html>