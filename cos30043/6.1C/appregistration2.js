Vue.createApp({
    data() {
        return {
            formData: {
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                cfPassword: "",
                email: "",
                streetAddress: "",
                suburb: "",
                postcode: "",
                mobile: ""
            },
            showTAC: false,
            errors: []
        }
    },
    methods: {
        toggleTAC() {
            this.showTAC = !this.showTAC;
        },
        handleSubmit(e) {
            this.errors = [];

            if (!isValidFirstName(this.formData.firstName)) {
                this.errors.push("First name is required and must contain letters only.");
            }
            if (!isValidLastName(this.formData.lastName)) {
                this.errors.push("Last name is required and must contain letters only.");
            }
            if (!isValidUsername(this.formData.username)) {
                this.errors.push("Username is required and must contain at least 3 characters.");
            }
            if (!isValidPassword(this.formData.password)) {
                this.errors.push("Password must contain at least 8 characters and at least one special character ($, %, ^, &, or *).");
            }
            if (this.password !== this.formData.cfPassword) {
                this.errors.push("Passwords don't match.");
            }
            if (!isValidEmail(this.formData.email)) {
                this.errors.push("Email is invalid.");
            }
            if (!isValidStreetAddress(this.formData.streetAddress)) {
                this.errors.push("Street address is at most 40 characters.");
            }
            if (!isValidSuburb(this.formData.suburb)) {
                this.errors.push("Suburb is at most 20 characters.");
            }
            if (!isValidPostcode(this.formData.postcode)) {
                this.errors.push("Postcode must be exactly 4 digits.");
            }
            if (!isValidMobileNumber(this.formData.mobile)) {
                this.errors.push("Mobile phone number must be exactly 10 digits, starting with 04.");
            }

            if (this.errors.length !== 0) {
                console.log(this.errors);
                e.preventDefault();
            }
        }
    }
}).mount("#app");

function isValidFirstName(firstName) {
    return /^[a-zA-Z]+$/.test(firstName);
}

function isValidLastName(lastName) {
    return /^[a-zA-Z]+$/.test(lastName);
}

function isValidUsername(username) {
    return /^.{3,}$/.test(username);
}

function isValidPassword(password) {
    return /^.{8,}$/.test(password) && /^[$%^&*]+$/.test(password);
}

function isValidEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function isValidStreetAddress(streetAddress) {
    return streetAddress.trim().length <= 40;
}

function isValidSuburb(suburb) {
    return suburb.trim().length <= 20;
}

function isValidPostcode(postcode) {
    return /^[\d]{4}$/.test(postcode);
}

function isValidMobileNumber(mobile) {
    return /^04[\d]{8}$/.test(mobile);
}