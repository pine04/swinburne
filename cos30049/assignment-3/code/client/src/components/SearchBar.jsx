/*
    Name: Nguyen Quang Huy
    Student ID: 104169507
    Description: The SearchBar component features a search box where the user can enter text to look for specific assets.
*/

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Gradient from "./Gradient";

export default function SearchBar({ searchText, setSearchText }) {
    const [focus, setFocus] = useState(false);

    return (
        <Gradient gradientDirection="r" className={`flex items-center outline outline-2 outline-offset-4 ${focus ? "outline-pink" : "outline-none"}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 absolute left-6 pointer-events-none" />
            <input
                name="searchBar"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className="w-full pl-14 pr-3 py-2 bg-transparent placeholder-white/50 rounded-xl outline-none"
            />
            {/* A blur circle on the left of the search bar. */}
            <div className="w-48 h-48 rounded-full absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 -z-10 bg-pink blur-[96px]"></div>
        </Gradient>
    );
}
