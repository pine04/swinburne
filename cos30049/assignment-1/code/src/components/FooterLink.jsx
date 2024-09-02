/*
	Name #1: Phan Sy Tuan
	Student ID #1: 

    Name #2: Ta Quang Tung
	Student ID #2: 104222196

	Description: The FooterLink component represents a navigation link in one of
                the three columns of the footer.
*/

import { Link } from "react-router-dom";

export default function FooterLink({to, children}) {
	return (
		<li>
			<Link 
				to={to} 
				className="w-fit block hover:text-pink transition-colors"
			>
				{children}
			</Link>
		</li>
	);
}