/*
    Name: Nguyen Quang Huy
    Student ID: 
    Description: 
*/

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Gradient from "./Gradient";
import Pagination from "./Pagination";

export default function SearchBar() {
    const [focus, setFocus] = useState(false);

    return (
        <div>
            <form action="" method="GET" className="block">

                <Gradient 
                    gradientDirection="r" 
                    className={`flex items-center outline outline-2 
                                outline-offset-4 ${focus ? "outline-pink" : 
                                "outline-none"}`}
                >
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="w-4 h-4 absolute left-6 pointer-events-none"
                    />
                    <input
                        name="searchBar"
                        placeholder="Search"
                        className="w-full pl-14 pr-3 py-2 bg-transparent 
                                 placeholder-white/50 rounded-xl outline-none"
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    />
                    <div className="w-48 h-48 rounded-full absolute left-0 
                                    top-0 -translate-x-1/2 -translate-y-1/2 
                                    -z-10 bg-pink blur-[96px]"></div>
                </Gradient>

                <div className="my-6 flex flex-wrap gap-6">

                    <Gradient className="w-fit" gradientDirection="r">
                        <select 
                            name="sort" 
                            className="block h-full px-2 py-1 rounded-2xl 
                                       text-center bg-transparent focus:outline 
                                       focus:outline-2 focus:outline-offset-4 
                                       focus:outline-pink"
                        >
                            <option className="text-navy" value="">
                                Sort by
                            </option>
                            <option className="text-navy" value="1">1</option>
                            <option className="text-navy" value="2">2</option>
                            <option className="text-navy" value="3">3</option>
                            <option className="text-navy" value="4">4</option>
                        </select>
                    </Gradient>
                    
                    <Gradient className="w-fit" gradientDirection="r">
                        <select 
                            name="filter" 
                            className="block h-full px-2 py-1 rounded-2xl 
                                       text-center bg-transparent focus:outline 
                                       focus:outline-2 focus:outline-offset-4 
                                       focus:outline-pink"
                        >
                            <option className="text-navy" value="">
                                Filter by
                            </option>
                            <option className="text-navy" value="1">1</option>
                            <option className="text-navy" value="2">2</option>
                            <option className="text-navy" value="3">3</option>
                            <option className="text-navy" value="4">4</option>
                        </select>
                    </Gradient>

                    <Pagination></Pagination>

                </div>

            </form>

            <p className="font-bold">Showing 80 results</p>
        </div>
    );
}
