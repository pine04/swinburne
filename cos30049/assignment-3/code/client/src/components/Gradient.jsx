/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The Gradient component represents a generic container that has been stylized to have a linear gradient background and border.
*/

/***
 * `gradientDirection` controls the direction of the gradient. `r` for left to
 * right. Leave blank for default (top left to bottom right).
 */
export default function Gradient({ gradientDirection, className, children }) {
    return (
        <div className={`rounded-2xl relative 
                         ${gradientDirection === "r" ? "bg-gradient-to-r after:bg-gradient-to-r" : "bg-gradient-to-br after:bg-gradient-to-br"} 
                         from-pink/75 via-purple/30 to-violet/50
                         before:w-full before:h-full before:rounded-2xl 
                         before:absolute before:left-0 before:top-0 before:-z-10
                         before:bg-navy after:w-full after:h-full 
                         after:p-0.5 after:rounded-[18px] after:absolute
                         after:-left-0.5 after:-top-0.5 after:-z-20 
                         after:from-pink after:via-violet after:to-purple 
                         after:box-content ${className}`}>
            { children }
        </div>
    );
}