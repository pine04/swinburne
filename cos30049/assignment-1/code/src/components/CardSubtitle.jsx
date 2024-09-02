/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The CardSubtitle subcomponent defines the subtitle of a Card.
*/

export default function CardSubtitle({ text, className }) {
    return (
        <p className={`text-sm ${className}`}>
            {text}
        </p>
    );
}