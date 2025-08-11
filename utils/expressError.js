class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode; // Default status code
        this.message = message; // Default error message
    }
}
module.exports = ExpressError; // Exporting the ExpressError class for use in other files
