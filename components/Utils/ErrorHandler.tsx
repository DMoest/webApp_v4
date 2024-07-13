/**
 * Error Handler for API requests.
 */
export function RequestErrorHandler(thisError: object | any | never): void {
    const errorObject = {
        errors: {
            title: thisError.name,
            message: thisError.message,
            stack: thisError.stack,
        },
    };

    return console.error(`Error Handler\n${errorObject}`);
}
