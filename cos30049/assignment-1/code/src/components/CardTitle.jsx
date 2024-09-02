/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The CardTitle subcomponent defines the title of a Card.
*/

export default function CardTitle({ text, className }) {
    return (
        <p className={`font-bold ${className}`}>
            {text}
        </p>
    );
}