/*
	Name #1: Phan Sy Tuan
	Student ID #1: 104072029

    Name #2: Ta Quang Tung
	Student ID #2: 104222196

	Description: Represents the navigation bar on top of each page.
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    return (
        <header>
            <div className="max-w-6xl px-8 py-12 mx-auto flex justify-between 
                            items-center">
                
                {/* The project's logo. Links to the homepage. */}
                <Link to="/" className="block w-fit font-display text-2xl">
                    DRIPPLE
                </Link>

                {/* The button to open the navigation sidebar. 
                    Only visible for small screens. */}
                <button
                    className="block text-4xl md:hidden"
                    onClick={toggleSidebar}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
                
                {/* A clickable region on the screen to close the navigation 
                    sidebar. Only visible for small screens when the sidebar is 
                    open. */}
                <div 
                    onClick={toggleSidebar} 
                    className={`w-full h-dvh z-40 fixed top-0 left-0 
                                bg-navy/50 ${showSidebar ? 
                                "block pointer-events-auto" : 
                                "hidden pointer-events-none"}`}
                ></div>

                {/* The navigation tabs. For small screens, it is hidden by 
                    default and can be opened/closed. For large screens, it is 
                    always shown on top of the page.. */}
                <nav className={`w-80 h-dvh z-50 fixed top-0 right-0 
                                 ${showSidebar ? "pointer-events-auto" : 
                                 "pointer-events-none"} md:static md:w-fit 
                                 md:h-fit md:pointer-events-auto`}>

                    <ul className={`w-full h-full p-8 absolute left-0 top-0 flex
                                    flex-col gap-8 items-start bg-pink 
                                    transition-transform ${showSidebar ? 
                                    "translate-x-0" : "translate-x-full"} 
                                    md:flex-row md:gap-16 md:items-center 
                                    md:w-fit md:h-fit md:p-0 md:static 
                                    md:translate-x-0 md:transition-none 
                                    md:bg-transparent`}>
                        
                        <li className="mb-4 md:hidden">
                            <button 
                                className="block w-fit text-4xl" 
                                onClick={toggleSidebar}
                            >
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </li>
                        <li>
                            <Link 
                                to="/marketplace" 
                                className="block relative w-fit font-bold 
                                           text-2xl after:w-full after:h-0.5 
                                           after:absolute after:left-0 
                                           after:top-full after:scale-0 
                                           after:origin-left after:bg-white 
                                           after:transition-transform 
                                           hover:after:scale-100 md:text-base 
                                           md:after:content-none 
                                           md:hover:text-pink 
                                           md:transition-colors"
                            >
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/profile" 
                                className="block relative w-fit font-bold 
                                           text-2xl after:w-full after:h-0.5 
                                           after:absolute after:left-0 
                                           after:top-full after:scale-0 
                                           after:origin-left after:bg-white 
                                           after:transition-transform 
                                           hover:after:scale-100 md:text-base 
                                           md:after:content-none 
                                           md:hover:text-pink 
                                           md:transition-colors"
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/signup" 
                                className="block relative w-fit font-bold 
                                           text-2xl after:w-full after:h-0.5 
                                           after:absolute after:left-0 
                                           after:top-full after:scale-0 
                                           after:origin-left after:bg-white 
                                           after:transition-transform 
                                           hover:after:scale-100 md:text-base 
                                           md:after:content-none 
                                           md:hover:text-pink 
                                           md:transition-colors"
                            >
                                Sign up
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/profile" 
                                className="block relative w-fit font-bold 
                                           text-2xl after:w-full after:h-0.5 
                                           after:absolute after:left-0 
                                           after:top-full after:scale-0 
                                           after:origin-left after:bg-white 
                                           after:transition-transform 
                                           hover:after:scale-100 
                                           md:after:content-none
                                           md:px-6 md:py-2 md:text-base 
                                           md:border-2 md:border-pink 
                                           md:rounded-2xl md:hover:bg-pink 
                                           md:transition-colors"
                            >
                                Connect wallet
                            </Link>
                        </li>
                    
                    </ul>

                </nav>

            </div>
        </header>
    );
}
