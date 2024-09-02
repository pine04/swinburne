/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The CardImage subcomponent defines the banner image of a Card.
*/

export default function CardImage({ imageSrc, alt, className }) {
    return (
        <img src={imageSrc} alt={alt} className={`rounded-xl ${className}`} />
    );
}