// This class is an extension of JavaScript's Error class to include an error code.
// This error code is the HTTP status code that the error should correspond to.
export default class DrippleError extends Error {
    constructor(message, code = 500) {
        super(message);
        this.code = code;
    }
}