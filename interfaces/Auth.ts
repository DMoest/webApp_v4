/**
 * Authentication interface.
 */
export interface Auth {
    isLoggedIn: boolean;
    setLoggedIn(value: boolean): void;
}

/**
 * User interface.
 */
export interface User {
    email: string;
    password: string;
}
