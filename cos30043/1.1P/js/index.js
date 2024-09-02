/*
    Filename: index.js
    Author: Ta Quang Tung
    Description: Script for the index.html page.
*/

// Updates the menu section to display the specified ice cream information.
function changeIceCreamInformation(name, creditText, creditLink, description, ingredients, priceEatIn, priceTakeaway) {
    document.getElementById("ice-cream-name").innerHTML = name;
    document.getElementById("ice-cream-credit").children[0].innerHTML = creditText;
    document.getElementById("ice-cream-credit").children[0].setAttribute("href", creditLink);
    document.getElementById("ice-cream-description").innerHTML = description;
    document.getElementById("ice-cream-ingredients").innerHTML = ingredients;
    document.getElementById("ice-cream-price-eat-in").innerHTML = `Eat-in/Takeaway: ${priceEatIn}`;
    document.getElementById("ice-cream-price-takeaway").innerHTML = `Takeaway/Delivery: ${priceTakeaway}`;
}

// Removes the "active" class from all ice cream images in the menu section.
function deactivateAllImages() {
    let images = document.getElementsByClassName("ice-cream-button");
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove("active");
    }
}

// Adds the "active" class to an ice cream image in the menu section.
function activateImage(image) {
    image.classList.add("active");
}

// Converts the rem unit to the pixel unit.
function toPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// Calculates the maximum number of ice cream images that can fit the menu section.
function calculateMaximumImages() {
    const containerWidth = document.getElementById("ice-cream-images").clientWidth;
    let numberOfImages = Math.floor((containerWidth + toPixels(3)) / toPixels(13));
    if (numberOfImages < 5) {
        numberOfImages = Math.floor((containerWidth - toPixels(9)) / toPixels(13));
    }
    if (numberOfImages == 0) {
        return 1;
    }
    return numberOfImages;
}

let startPosition = 0;

// Updates the layout of the ice cream images in the menu section. Called every time the window is resized.
function updateContainerLayout() {
    startPosition = 0;

    let images = document.getElementsByClassName("ice-cream-button");

    document.getElementById("previous").classList.remove("inactive");
    document.getElementById("next").classList.remove("inactive");

    for (let i = 0; i < 5; i++) {
        images[i].classList.remove("hidden");
    }

    let numberOfImages = calculateMaximumImages();

    if (numberOfImages < 5) {
        document.getElementById("previous").classList.add("inactive");
        document.getElementById("previous").classList.remove("hidden");
        document.getElementById("next").classList.remove("hidden");
    } else {        
        document.getElementById("previous").classList.add("hidden");
        document.getElementById("next").classList.add("hidden");
    }

    for (let i = numberOfImages; i < 5; i++) {
        images[i].classList.add("hidden");
    }
}

// Shifts the range of displayed ice cream images left or right by the specified amount.
// Negative values shift the range to the left. Positive values shift the range to the right.
function shiftContainer(amount) {
    let images = document.getElementsByClassName("ice-cream-button");

    if (startPosition === 0 && amount === -1) return;
    if (startPosition + calculateMaximumImages() > 4 && amount === 1) return;

    document.getElementById("previous").classList.remove("inactive");
    document.getElementById("next").classList.remove("inactive");

    startPosition += amount;

    for (let i = 0; i < 5; i++) {
        images[i].classList.add("hidden");
    }

    for (let i = startPosition; i < startPosition + calculateMaximumImages(); i++) {
        images[i].classList.remove("hidden");
    }

    if (startPosition === 0) document.getElementById("previous").classList.add("inactive");
    if (startPosition + calculateMaximumImages() > 4) document.getElementById("next").classList.add("inactive");
}

document.addEventListener("DOMContentLoaded", () => {
    updateContainerLayout();

    window.addEventListener("resize", updateContainerLayout);

    document.getElementById("previous").addEventListener("click", () => shiftContainer(-1));

    document.getElementById("next").addEventListener("click", () => shiftContainer(1));

    document.getElementById("vanilla").addEventListener("click", (e) => {
        deactivateAllImages();
        activateImage(e.currentTarget);
        changeIceCreamInformation(
            "Vanilla ice cream",
            "PNGKit",
            "https://www.pngkit.com/bigpic/u2w7q8a9q8r5e6q8/",
            "A classic frozen dessert that is beloved for its creamy texture and subtle, yet comforting, flavor.",
            "Milk, cream, sugar, egg yolks, and vanilla extract.",
            "$1 per cone or cup (not including additional toppings.)",
            "$5 per pint of 500 grams."
        );
    });

    document.getElementById("chocolate").addEventListener("click", (e) => {
        deactivateAllImages();
        activateImage(e.currentTarget);
        changeIceCreamInformation(
            "Chocolate ice cream",
            "Kapiti",
            "https://www.kapitiicecream.co.nz/product/kapiti-chocolate-brownie-scoop",
            "A rich and indulgent frozen dessert that combines the velvety texture of ice cream with the decadent flavor of chocolate.",
            "Milk, cream, sugar, egg yolks, cocoa powder, chocolate, and vanilla extract.",
            "$2 per cone or cup (not including additional toppings.)",
            "$7 per pint of 500 grams."
        );
    });
    
    document.getElementById("strawberry").addEventListener("click", (e) => {
        deactivateAllImages();
        activateImage(e.currentTarget);
        changeIceCreamInformation(
            "Strawberry ice cream",
            "Adobe Stock",
            "https://stock.adobe.com/sg/images/strawberry-strawberry-ice-cream-scoop-top-view-isolated-on-white-backgroundice-cream/235894256",
            "A refreshing and fruity frozen dessert that showcases the sweet and tart flavors of fresh strawberries.",
            "Fresh strawberries, milk, cream, sugar, egg yolks, and vanilla extract.",
            "$2 per cone or cup (not including additional toppings.)",
            "$7 per pint of 500 grams."
        );
    });
    
    document.getElementById("coconut").addEventListener("click", (e) => {
        deactivateAllImages();
        activateImage(e.currentTarget);
        changeIceCreamInformation(
            "Coconut ice cream",
            "PNGKit",
            "https://www.pngkit.com/bigpic/u2w7q8a9q8r5e6q8/",
            "A tropical and creamy frozen dessert that is made with coconut milk and shredded coconut for a unique and delicious flavor.",
            "Milk, cream, sugar, egg yolks, shredded coconut, and vanilla extract.",
            "$1 per cone or cup (not including additional toppings.)",
            "$5 per pint of 500 grams."
        );
    });
    
    document.getElementById("cookies").addEventListener("click", (e) => {
        deactivateAllImages();
        activateImage(e.currentTarget);
        changeIceCreamInformation(
            "Cookies and cream ice cream",
            "TipTop",
            "https://www.tiptop.co.nz/scoops/cookies-and-cream",
            "A classic frozen dessert that combines rich and creamy vanilla ice cream with chunks of chocolate sandwich cookies for a delightful and indulgent treat.",
            "Milk, cream, sugar, egg yolks, vanilla extract, and chocolate sandwich cookies.",
            "$2 per cone or cup (not including additional toppings.)",
            "Not available."
        );
    });
});
