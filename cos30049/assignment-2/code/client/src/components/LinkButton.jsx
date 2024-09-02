/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The LinkButton component represents a clickable link stylized as a pink-bordered button.
*/

import { Link } from "react-router-dom";

export default function LinkButton({ to, className, children }) {
    return (
        <Link to={to} className={`block w-fit px-6 py-2 rounded-2xl border-2 border-pink font-bold hover:bg-pink transition-colors ${className}`}>
            {children}
        </Link>
    );
}