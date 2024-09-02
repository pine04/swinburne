/*
    Name: Nguyen Quang Huy
    Student ID: 104169507
    Description: The SearchDropdown and SearchDropdownOption components.
*/

import Gradient from "./Gradient";

// Custom select element with gradient for the Marketplace page.
export function SearchDropdown({ name, value, setValue, children }) {
    return (
        <Gradient className="w-fit" gradientDirection="r">
            <select 
                name={name}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="block h-full px-2 py-1 rounded-2xl bg-transparent focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-pink"
            >
                {children}
            </select>
        </Gradient>
    );
}

// Custom option element for the Marketplace page.
export function SearchDropdownOption({ value, children }) {
    return (
        <option value={value} className="text-navy">
            {children}
        </option>
    );
}