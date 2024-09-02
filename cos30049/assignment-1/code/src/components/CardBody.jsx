/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The CardBody subcomponent defines the body of a Card.
*/

export default function CardBody({ children, className }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}