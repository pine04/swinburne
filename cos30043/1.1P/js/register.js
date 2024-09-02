/*
    Filename: register.js
    Author: Ta Quang Tung
    Description: Script for the register.html page. Contains form validation code.
*/

import {
    isValidEmail,
    isValidPhoneNumber,
    isValidPassword,
    isValidPostcode,
    isValidBirthyear,
    showErrorMessage,
    highlightInvalidInput
} from "./form_helpers.js";

// Validates the input fields of the registration form. Invalid inputs prevent form submission.
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

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let passwordCf = document.getElementById("password-cf").value;
    let birthyear = document.getElementById("birthyear").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let postcode = document.getElementById("postcode").value.trim();
    let newsletterYes = document.getElementById("yes").checked;
    let newsletterNo = document.getElementById("no").checked;

    if (username === "") {
        isCorrect = false;
        showErrorMessage("username-error", "Please enter a username.");
        highlightInvalidInput("username");
    }

    if (!isValidEmail(email)) {
        isCorrect = false;
        showErrorMessage("email-error", "Please enter a valid email.");
        highlightInvalidInput("email");
    }

    if (!isValidPassword(password)) {
        isCorrect = false;
        showErrorMessage("password-error", "Password must be at least 9 characters long.");
        highlightInvalidInput("password");
    }

    if (passwordCf !== password) {
        isCorrect = false;
        showErrorMessage("password-cf-error", "Passwords do not match.");
        highlightInvalidInput("password-cf");
    }

    if (!isValidBirthyear(birthyear)) {
        isCorrect = false;
        showErrorMessage("birthyear-error", "Please enter a valid birth year.");
        highlightInvalidInput("birthyear");
    }

    if (!isValidPhoneNumber(phone)) {
        isCorrect = false;
        showErrorMessage("phone-error", "Please enter a valid phone number.");
        highlightInvalidInput("phone");
    }

    if (!isValidPostcode(postcode)) {
        isCorrect = false;
        showErrorMessage("postcode-error", "Please enter a valid postcode (4 digits).");
        highlightInvalidInput("postcode");
    }

    if (!newsletterYes && !newsletterNo) {
        isCorrect = false;
        showErrorMessage("newsletter-error", "Please select an option.");
    }

    if (!isCorrect) {
        event.preventDefault();
        document.getElementById("register-form").scrollIntoView();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("register-form").addEventListener("submit", validateForm);
});