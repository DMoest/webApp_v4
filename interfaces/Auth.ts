/**
 * Authentication interface.
 */
export interface Auth {
    isLoggedIn: boolean;
    setLoggedIn(value: boolean): void;
}
