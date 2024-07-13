/**
 * Authentication interfaces module.
 *
 * These interfaces are used to define the structure of the data that is sent to and received from the server to
 * perform a login or register a new user.
 *
 * @module interfaces/Auth
 * @see module:models/Auth
 * @see module:components/Auth
 * @see module:screens/Auth
 *
 */


/**
 * User interface.
 */
export interface User {
    email: string;
    password: string;
}
