/*
    Name: Nguyen Quang Huy
    Student ID: 104169507
    Description: The Pagination component enables the user to switch between pages of content.
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Gradient from "./Gradient";

export default function Pagination({ page, maxPage, setPage, className }) {
    // Increases page count by 1 if not at the end.
    function incrementPage(e) {
        e.preventDefault();
        if (page < maxPage) setPage((prevPage) =>  prevPage + 1);
    }

    // Decreases page count by 1 if not at the start.
    function decrementPage(e) {
        e.preventDefault();
        if (page > 1) setPage((prevPage) =>  prevPage - 1);
    }

    return (
        <Gradient className={`w-fit flex justify-end ${className}`} gradientDirection="r">
            <button onClick={decrementPage} className="w-10 rounded-l-2xl border-r-2 border-pink/40 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-pink">
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            <span className="w-fit px-3 py-1 flex items-center justify-center">
                Page {page} of {maxPage}
            </span>

            <button onClick={incrementPage} className="w-10 rounded-r-2xl border-l-2 border-pink/40 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-pink">
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </Gradient>
    );
}

