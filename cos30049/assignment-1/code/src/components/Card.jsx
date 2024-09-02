/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The Card component represents a generic card that appears
                throughout the website.
*/

import Gradient from "./Gradient";

export default function Card({ className, children }) {
    return (
        <Gradient className={`p-5 flex flex-col gap-4 ${className}`}>
            { children }
        </Gradient>   
    );
}