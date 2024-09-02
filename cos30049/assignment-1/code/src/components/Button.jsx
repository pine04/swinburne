export default function Button({ onClick, active, className, children }) {
    return (
        <button 
            onClick={onClick} 
            className={`w-fit px-6 py-2 rounded-2xl border-2 border-pink block
                        font-bold transition-colors hover:bg-pink ${active ? 
                        "bg-pink" : "bg-transparent"} ${className}`}
        >
            {children}
        </button>
    );
}