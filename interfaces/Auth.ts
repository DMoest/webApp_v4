/**
 * Authentication interface.
 */
export interface Auth {
    isLoggedIn: boolean;
    setLoggedIn(value: boolean): void;

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
