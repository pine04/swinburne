/*
	Name: Phan Sy Tuan
	Student ID: 104072029
	Description: Represents the website footer at the bottom of each page.
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faFacebook, 
	faXTwitter, 
	faInstagram, 
	faTiktok 
} from "@fortawesome/free-brands-svg-icons";

import FooterLink from "./FooterLink";

const socialMediaLinks = [
	{
		link: "https://facebook.com",
		icon: faFacebook
	},
	{
		link: "https://twitter.com",
		icon: faXTwitter
	},
	{
		link: "https://instagram.com",
		icon: faInstagram
	},
	{
		link: "https://tiktok.com",
		icon: faTiktok
	}
];

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gradient-to-t from-violet">

			<div className="max-w-6xl px-8 py-12 mx-auto flex flex-col gap-8 
							sm:flex-row sm:justify-between">

				{/* The company information section. */}
				<div className="max-w-sm flex flex-col gap-4">

					<h2 className="font-display text-2xl">DRIPPLE</h2>
					<p className="text-sm">
						© Copyright Maverick Mates {currentYear}
					</p>
					<p className="font-bold">
						Drip in style, trade in trends - Dripper NFTs, your 
						gateway to virtual couture!
					</p>

					<address className="flex gap-4">
						{
							socialMediaLinks.map((props, index) =>
								<a 
									key={index}
									href={props.link} 
									target="_blank"
									className="block text-xl hover:text-pink 
											   transition-colors"
								>
									<FontAwesomeIcon icon={props.icon} />
								</a>
							)
						}						
					</address>

				</div>
				
				{/* Three navigation columns. */}
				<nav className="flex flex-wrap justify-between gap-6 lg:gap-16">

					<ul className="list-none flex flex-col gap-2">
						<li className="font-bold mb-2">About</li>

						<FooterLink to="#">Contact</FooterLink>
						<FooterLink to="#">Careers</FooterLink>
						<FooterLink to="#">Who we are</FooterLink>
					</ul>

					<ul className="list-none flex flex-col gap-2">
						<li className="font-bold mb-2">Marketplace</li>

						<FooterLink to="/marketplace">Buy NFTs</FooterLink>
						<FooterLink to="/marketplace">Explore</FooterLink>
						<FooterLink to="/profile">Sell NFTs</FooterLink>
					</ul>

					<ul className="list-none flex flex-col gap-2">
						<li className="font-bold mb-2">Profile</li>

						<FooterLink to="/profile">Account</FooterLink>
						<FooterLink to="/profile">Wallet</FooterLink>
					</ul>

				</nav>

			</div>

		</footer>
	);
}