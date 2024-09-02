/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The Card component and its sub-components.
*/

import Gradient from "./Gradient";

// Represents a generic card that appears throughout the website.
export function Card({ className = "", children }) {
    return (
        <Gradient className={`p-5 flex flex-col gap-4 group ${className}`}>
            { children }
        </Gradient>   
    );
}

// Represents a showcase image on a card.
export function CardImage({ imageSrc, alt, className = "" }) {
    return (
        <img loading="lazy" src={imageSrc} alt={alt} className={`rounded-xl aspect-square object-cover ${className}`} />
    );
}

// Represents an animated showcase image on a card.
export function CardImageAnimated({ imageSrc, alt, className = "" }) {
    return (
        <div className="rounded-xl overflow-hidden">
            <img loading="lazy" src={imageSrc} alt={alt} className={`rounded-xl aspect-square object-cover group-hover:scale-110 transition-transform ${className}`} />
        </div>
    );
}

// Represents a card body.
export function CardBody({ children, className = "" }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

// Represents a card footer.
export function CardFooter({ children, className = "" }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

// Represents a card title.
export function CardTitle({ text, className = "" }) {
    return (
        <p className={`font-bold ${className}`}>
            {text}
        </p>
    );
}

// Represents a card subtitle.
export function CardSubtitle({ text, className = "" }) {
    return (
        <p className={`text-sm ${className}`}>
            {text}
        </p>
    );
}