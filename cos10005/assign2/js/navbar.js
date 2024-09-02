/*
    Filename: navbar.js
    Author: Ta Quang Tung
    Description: Script for the navigation bar component.
*/

// Opens the side panel of the navigation bar (small screens only.)
function openSidePanel() {
    document.querySelector("#nav-opaque-overlay").classList.add("active");
    document.querySelector("#nav-container").classList.add("active");
}

// Closes the side panel of the navigation bar (small screens only.)
function closeSidePanel() {
    document.querySelector("#nav-opaque-overlay").classList.remove("active");
    document.querySelector("#nav-container").classList.remove("active");
}

// Highlights the menu item corresponding to the current page. Called on page load.
function highlightCurrentTab() {
    let pathname = document.location.pathname.split("/").pop();
    if (pathname === "index.html" || pathname === "") {
        document.querySelector("#link-home").classList.add("active");
    }
    if (pathname === "register.html") {
        document.querySelector("#link-register").classList.add("active");
    }
    if (pathname === "order.html") {
        document.querySelector("#link-order").classList.add("active");
    }
    if (pathname === "features.html") {
        document.querySelector("#link-features").classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    highlightCurrentTab();

    window.addEventListener("resize", closeSidePanel);

    document.querySelector("#nav-open").addEventListener("click", openSidePanel);
    document.querySelector("#nav-close").addEventListener("click", closeSidePanel);
    document.querySelector("#nav-opaque-overlay").addEventListener("click", closeSidePanel);
});