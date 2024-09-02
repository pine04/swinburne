/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The CardFooter subcomponent defines the footer of a Card, which
                contains content that appears at the bottom of a Card.
*/

export default function CardFooter({ children, className }) {
    return (
        <div className={`flex flex-wrap justify-between items-end gap-4 
                        ${className}`}>
            {children}
        </div>
    );
}