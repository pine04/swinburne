/*
    Filename: order.js
    Author: Ta Quang Tung
    Description: Script for the order.html page. Contains form validation code.
*/

import { 
    isValidCardNumber,
    isValidEmail,
    isValidPhoneNumber,
    isValidAmount,
    showErrorMessage,
    hideErrorMessage,
    highlightInvalidInput,
    unhighlightInvalidInput,
    disableInput,
    disablePrompt,
    enableInput,
    enablePrompt
} from "./form_helpers.js";

let productCounter = 2;

// Adds a product to the product list.
function addProduct(event) {
    event.preventDefault();

    let newProduct = document.createElement("div");
    newProduct.innerHTML = `<label for="product-${productCounter}" class="prompt">Product ${productCounter}</label>` +
                        `<select id="product-${productCounter}" name="product-${productCounter}">` +
                        `<option value="vanilla">Vanilla ice cream</option>` +
                        `<option value="chocolate">Chocolate ice cream</option>` +
                        `<option value="strawberry">Strawberry ice cream</option>` +
                        `<option value="coconut">Coconut ice cream</option>` +
                        `<option value="cookies and cream">Cookies and cream ice cream</option>` +
                        `</select>` +
                        `<label for="product-${productCounter}-amount" class="prompt required">Amount</label>` +
                        `<input type="text" id="product-${productCounter}-amount" name="product-${productCounter}-amount">` +
                        `<p id="product-${productCounter}-error" class="error-message hidden"></p>`;

    document.getElementById("product-list").appendChild(newProduct);
    productCounter += 1;
}

// Event handler for the click event of the "same as delivery address" checkbox.
// Attaches or removes event handlers of the address input boxes.
function handleSameAddress(event) {
    if (event.target.checked) {
        let deliveryAddress = document.getElementById("delivery-address").value.trim();

        if (deliveryAddress === "") {
            showErrorMessage("delivery-address-error", "Please enter your delivery address first!");
            highlightInvalidInput("delivery-address");
        } else {
            document.getElementById("billing-address").value = deliveryAddress;
        }

        document.getElementById("delivery-address").addEventListener("input", synchronizeAddresses);
        document.getElementById("billing-address").addEventListener("input", synchronizeAddresses);
    } else {
        document.getElementById("delivery-address").removeEventListener("input", synchronizeAddresses);
        document.getElementById("billing-address").removeEventListener("input", synchronizeAddresses);
    }
}

// Event handler for the input event of the address input boxes.
// Updates the value of the other input box if one changes.
function synchronizeAddresses(event) {
    let address = event.target.value.trim();

    if (event.target.getAttribute("id") === "delivery-address") {
        document.getElementById("billing-address").value = address;
    } else {
        document.getElementById("delivery-address").value = address;
    }

    if (address === "") {
        showErrorMessage("delivery-address-error", "Please enter your delivery address.");
        highlightInvalidInput("delivery-address");
        showErrorMessage("billing-address-error", "Please enter your billing address.");
        highlightInvalidInput("billing-address");
    }
}

// Event handler for the click event of the "delivery" radio option.
// Enables the delivery address input and the "same as delivery address" checkbox.
function enableDeliveryAddress() {
    enableInput("delivery-address");
    enablePrompt("delivery-address-label");
    enableInput("same-address");
    enablePrompt("same-address-label");
}

// Event handler for the click event of the "pickup" radio option.
// Disables the delivery address input and the "same as delivery address" checkbox.
function disableDeliveryAddress() {
    hideErrorMessage("delivery-address-error");
    unhighlightInvalidInput("delivery-address");

    disableInput("delivery-address");
    disablePrompt("delivery-address-label");
    disableInput("same-address");
    disablePrompt("same-address-label");
}

// Event handler for the click event of the "pay online" radio option.
// Enables the credit card select element and the card number input.
function enableCreditCardInformation() {
    enableInput("credit-card");
    enablePrompt("credit-card-label");
    enableInput("card-number");
    enablePrompt("card-number-label");
}

// Event handler for the click event of the "pay on pickup" radio option.
// Disables the credit card select element and the card number input.
function disableCreditCardInformation() {
    hideErrorMessage("card-number-error");
    unhighlightInvalidInput("card-number");

    disableInput("credit-card");
    disablePrompt("credit-card-label");
    disableInput("card-number");
    disablePrompt("card-number-label");
}

// Validates the input fields of the order form. Invalid inputs prevent form submission.
function validateForm(event) {
    let isCorrect = true;

    let errorInputs = document.getElementsByClassName("error");
    for (let i = errorInputs.length - 1; i >= 0; i--) {
        errorInputs[i].classList.remove("error");
    }

    let errorMsgs = document.getElementsByClassName("error-message");
    for (let i = errorMsgs.length - 1; i >= 0; i--) {
        errorMsgs[i].classList.add("hidden");
    }

    for (let i = 1; i < productCounter; i++) {
        let amount = document.getElementById(`product-${i}-amount`).value;
        if (!isValidAmount(amount)) {
            isCorrect = false;
            showErrorMessage(`product-${i}-error`, "Please specify a valid amount.");
            highlightInvalidInput(`product-${i}-amount`);
        }
    }

    let isDelivery = document.getElementById("delivery").checked;
    let isPickup = document.getElementById("pickup").checked;
    let deliveryAddress = document.getElementById("delivery-address").value.trim();
    let billingAddress = document.getElementById("billing-address").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let isPayOnPickup = document.getElementById("on-pickup").checked;
    let isPayOnline = document.getElementById("online").checked;
    let card = document.getElementById("credit-card").value;
    let cardNumber = document.getElementById("card-number").value.trim();

    if (!isDelivery && !isPickup) {
        isCorrect = false;
        showErrorMessage("retrieval-error", "Please select an option.");
    }

    if (isDelivery && deliveryAddress === "") {
        isCorrect = false;
        showErrorMessage("delivery-address-error", "Please enter your delivery address.");
        highlightInvalidInput("delivery-address");
    }

    if (billingAddress === "") {
        isCorrect = false;
        showErrorMessage("billing-address-error", "Please enter your billing address.");
        highlightInvalidInput("billing-address");
    }

    if (!isValidPhoneNumber(phone)) {
        isCorrect = false;
        showErrorMessage("phone-error", "Please enter a valid number (10 digits).");
        highlightInvalidInput("phone");
    }

    if (!isValidEmail(email)) {
        isCorrect = false;
        showErrorMessage("email-error", "Please enter a valid email.");
        highlightInvalidInput("email");
    }

    if (!isPayOnPickup && !isPayOnline) {
        isCorrect = false;
        showErrorMessage("payment-error", "Please select an option.");
    }

    if (isPayOnline && !isValidCardNumber(card, cardNumber)) {
        isCorrect = false;
        showErrorMessage("card-number-error", "Please enter a valid card number.");
        highlightInvalidInput("card-number");
    }
    
    if (!isCorrect) {
        event.preventDefault();
        document.getElementById("order-form").scrollIntoView();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("product-add").addEventListener("click", addProduct);

    document.getElementById("delivery").addEventListener("click", enableDeliveryAddress);
    document.getElementById("pickup").addEventListener("click", disableDeliveryAddress);
    document.getElementById("same-address").addEventListener("click", handleSameAddress);

    document.getElementById("online").addEventListener("click", enableCreditCardInformation);
    document.getElementById("on-pickup").addEventListener("click", disableCreditCardInformation);

    document.getElementById("order-form").addEventListener("submit", validateForm);
});