/**
 * Error Handler for API requests.
 */
export function RequestErrorHandler(thisError: object | any | never) {
    const errorObject = {
        errors: {
            title: thisError.name,
            message: thisError.message,
            stack: thisError.stack,
        },
    };

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return console.log(`Error Handler\n${errorObject}`);
}
