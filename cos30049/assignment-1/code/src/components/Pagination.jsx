/*
    Name: Nguyen Quang Huy
    Student ID: 
    Description: 
*/

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Gradient from "./Gradient";

export default function Pagination() {
    const [page, setPage] = useState(1);

    function incrementPage(e) {
        e.preventDefault();
        if (page < 4) setPage((prevPage) =>  prevPage + 1);
    }

    function decrementPage(e) {
        e.preventDefault();
        if (page > 1) setPage((prevPage) =>  prevPage - 1);
    }

    return (
        <Gradient className="ml-auto flex justify-end" gradientDirection="r">

            <button 
                onClick={decrementPage}
                className="w-10 rounded-l-2xl border-r-2 border-pink/40 
                           focus:outline focus:outline-2 focus:outline-offset-4
                           focus:outline-pink" 
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            <span className="w-fit px-3 py-1 flex items-center justify-center">
                Page {page} of 4
            </span>

            <button 
                onClick={incrementPage}
                className="w-10 rounded-r-2xl border-l-2 border-pink/40 
                           focus:outline focus:outline-2 focus:outline-offset-4 
                           focus:outline-pink" 
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </button>

        </Gradient>
    );
}

