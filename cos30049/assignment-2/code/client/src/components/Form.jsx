/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The custom Form component and its sub-components.
*/

import { forwardRef } from "react";

import Gradient from "./Gradient";

// A custom Dripple form.
export function Form({ onSubmit, isWaitingForResponse = false, waitingText = "Please wait...", hasCornerHighlights = false, className = "", children }) {
    // If the form request is being processed by the server, prevent further submissions.
    function handleSubmit(e) {
        e.preventDefault();
        if (!isWaitingForResponse) onSubmit(e);
    }
    
    return (
        <Gradient className={className}>
            <form className={`p-4 flex flex-col gap-4`} onSubmit={handleSubmit}>
                {children}
            </form>

            {
                isWaitingForResponse &&
                <div className="absolute left-0 top-0 w-full h-full bg-navy/70 z-50 rounded-2xl flex items-center justify-center">
                    <p className="font-bold h-fit text-2xl">{waitingText}</p>
                </div>
            }

            {/* Blur circle at the top left and bottom right corners of the form. */}
            {
                hasCornerHighlights &&
                <>
                    <div className="w-64 h-64 rounded-full absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 -z-10  bg-pink blur-[128px]"></div>
                    <div className="w-48 h-48 rounded-full absolute left-full top-full -translate-x-1/2 -translate-y-1/2 -z-10 bg-purple blur-[96px]"></div>
                </>
            }
        </Gradient>
    );
}

// Represents a Form title.
export function FormHeader({ className = "", children }) {
    return (
        <h2 className={`text-2xl font-bold ${className}`}>
            {children}
        </h2>
    );
}

// Represents a Form success/failure message.
export function FormStatusMessage({ message, isError, className = "" }) {
    if (message) {
        return <p className={`${isError ? "text-red-300" : "text-green-300"} ${className}`}>{message}</p>
    }
}

// Represents a Form text input element with label.
export function FormInputText({ label, value, onChange, required = false, placeholder = "", className = "" }) {
    return (
        <label className={`flex flex-col gap-1 font-bold ${className}`}>
            <span className={required ? "after:content-['*'] after:text-red-300" : ""}>
                {label}
            </span>
            <input 
                type="text"
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="px-2 py-1 border-2 border-pink rounded-2xl font-normal bg-pink/20 outline-none focus:outline-2 focus:outline-offset-2 focus:outline-pink"
            />
        </label>
    );
}

// Represents a Form number input element with label.
export function FormInputNumber({ label, value, onChange, min = undefined, max = undefined, step = 1, required = false, placeholder = "", className = "" }) {
    return (
        <label className={`flex flex-col gap-1 font-bold ${className}`}>
            <span className={required ? "after:content-['*'] after:text-red-300" : ""}>
                {label}
            </span>
            <input 
                type="number"
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                required={required}
                placeholder={placeholder}
                className="px-2 py-1 border-2 border-pink rounded-2xl font-normal bg-pink/20 outline-none focus:outline-2 focus:outline-offset-2 focus:outline-pink"
            />
        </label>
    );
}

// Represents a Form file input element with label.
export const FormInputFile = forwardRef(function FormInputFile({ label, onChange, accept = undefined, required = false, className = "" }, ref) {
    return (
        <label className={`flex flex-col gap-1 font-bold ${className}`}>
            <span className={required ? "after:content-['*'] after:text-red-300" : ""}>
                {label}
            </span>
            <input
                ref={ref}
                type="file"
                accept={accept}
                onChange={onChange}
                required={required}
                className="px-2 py-1 border-2 border-pink rounded-2xl font-normal bg-pink/20 outline-none focus:outline-2 focus:outline-offset-2 focus:outline-pink"
            />
        </label>
    );
});

// Represents a Form email input element with label.
export function FormInputEmail({ label, value, onChange, required = false, className = "" }) {
    return (
        <label className={`flex flex-col gap-1 font-bold ${className}`}>
            <span className={required ? "after:content-['*'] after:text-red-300" : ""}>
                {label}
            </span>
            <input 
                type="email"
                value={value}
                onChange={onChange}
                required={required}
                className="px-2 py-1 border-2 border-pink rounded-2xl font-normal bg-pink/20 outline-none focus:outline-2 focus:outline-offset-2 focus:outline-pink"
            />
        </label>
    );
}

// Represents a Form password input element with label.
export function FormInputPassword({ label, value, onChange, className = "" }) {
    return (
        <label className={`flex flex-col gap-1 font-bold ${className}`}>
            <span className="after:content-['*'] after:text-red-300">
                {label}
            </span>
            <input 
                type="password"
                value={value}
                onChange={onChange}
                className="px-2 py-1 border-2 border-pink rounded-2xl font-normal bg-pink/20 outline-none focus:outline-2 focus:outline-offset-2 focus:outline-pink"
            />
        </label>
    );
}

// Represents a Form select element with label.
export function FormSelect({ label, value, onChange, required = false, className = "", children }) {
    return (
        <label className={`flex flex-col gap-1 font-bold ${className}`}>
            <span className={required ? "after:content-['*'] after:text-red-300" : ""}>
                {label}
            </span>
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="px-2 py-1 border-2 border-pink rounded-2xl font-normal bg-pink/20 outline-none focus:outline-2 focus:outline-offset-2 focus:outline-pink"
            >
                {children}
            </select>
        </label>
    );
}

// Represents a Form option element with label.
export function FormSelectOption({ value, className = "", children }) {
    return (
        <option value={value} className={`bg-white text-navy ${className}`}>
            {children}
        </option>
    );
}

// Represents a Form text area element with label.
export function FormTextArea({ label, value, onChange, required = false, placeholder = "", className = "" }) {
    return (
        <label className={`flex flex-col gap-1 font-bold ${className}`}>
            <span className={required ? "after:content-['*'] after:text-red-300" : ""}>
                {label}
            </span>
            <textarea
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="px-2 py-1 border-2 border-pink rounded-2xl font-normal bg-pink/20 outline-none focus:outline-2 focus:outline-offset-2 focus:outline-pink"
            ></textarea>
        </label>
    );
}

// Represents a Form submit button element.
export function Button({ onClick, active = false, className = "", children }) {
    return (
        <button onClick={onClick} className={`w-fit px-6 py-2 rounded-2xl border-2 border-pink block font-bold transition-colors hover:bg-pink ${active ?  "bg-pink" : "bg-transparent"} ${className}`}>
            {children}
        </button>
    );
}