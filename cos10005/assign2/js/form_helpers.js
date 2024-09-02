/*
    Filename: form_helpers.js
    Author: Ta Quang Tung
    Description: Contains functions to validate different kinds of input data and other helper functions to be reused by other scripts.
*/

// Checks if the given credit card number is valid or not, depending on the card type.
function isValidCardNumber(cardType, cardNumber) {
    let pattern = /^[0-9]{15,16}$/;
    if (!pattern.test(cardNumber)) {
        return false;
    }
    if ((cardType === "visa" || cardType === "mastercard") && (cardNumber.length === 16)) {
        return true;
    }
    if (cardType === "american-express" && cardNumber.length === 15) {
        return true;
    }
    return false;
}

// Checks if the given email is valid or not.
function isValidEmail(email) {
    let pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z]{3,4}$/;
    return pattern.test(email);
}

// Checks if the given phone number is valid or not.
function isValidPhoneNumber(number) {
    let pattern = /^[0-9]{10}$/;
    return pattern.test(number);
}

// Checks if the given password is valid or not.
function isValidPassword(password) {
    return password.length >= 9;
}

// Checks if the given postcode is valid or not.
function isValidPostcode(postcode) {
    let pattern = /^[0-9]{4}$/;
    return pattern.test(postcode);
}

// Checks if the given birthyear is valid or not.
function isValidBirthyear(birthyear) {
    let pattern = /^[0-9]{4}$/;
    return pattern.test(birthyear);
}

// Checks if the given amount is valid or not.
function isValidAmount(amount) {
    let pattern = /^[0-9]+$/;
    return pattern.test(amount);
}

// Displays the error message in the element specified by the id.
function showErrorMessage(id, message) {
    let messageElement = document.getElementById(id);
    messageElement.innerHTML = message;
    messageElement.classList.remove("hidden");
}

// Hides the element containing an error message specified by the id.
function hideErrorMessage(id) {
    document.getElementById(id).classList.add("hidden");
}

// Adds a red outline to the input element containing invalid data specified by the id.
function highlightInvalidInput(id) {
    document.getElementById(id).classList.add("error");
}

// Adds the red outline from the input element specified by the id.
function unhighlightInvalidInput(id) {
    document.getElementById(id).classList.remove("error");
}

// Disables the input element specified by the id.
function disableInput(id) {
    document.getElementById(id).setAttribute("disabled", "");
}

// Fades the label/paragraph associated with a disabled input element.
function disablePrompt(id) {
    document.getElementById(id).classList.add("disabled");
}

// Enables the input element specified by the id.
function enableInput(id) {
    document.getElementById(id).removeAttribute("disabled", "");
}

// Removes the fade from the label/paragraph associated with a disabled input element.
function enablePrompt(id) {
    document.getElementById(id).classList.remove("disabled");
}

export {
    isValidCardNumber,
    isValidEmail,
    isValidPhoneNumber,
    isValidPassword,
    isValidPostcode,
    isValidBirthyear,
    isValidAmount,
    showErrorMessage,
    hideErrorMessage,
    highlightInvalidInput,
    unhighlightInvalidInput,
    disableInput,
    disablePrompt,
    enableInput,
    enablePrompt
}