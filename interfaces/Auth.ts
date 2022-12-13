/**
 * Authentication interface.
 */
export interface Auth {
    isLoggedIn: boolean;
    email: string;
    password: string;
}

/**
 * User interface.
 */
export interface User {
    email: string;
    password: string;
}
