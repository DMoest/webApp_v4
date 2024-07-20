/**
 * Module: Authentication Interfaces
 *
 * Overview:
 * This module defines a cohesive set of TypeScript interfaces that outline the structure and types of data
 * involved in authentication processes within the application. It includes interfaces for user credentials,
 * request bodies for registration and login, responses from authentication requests, and the context for
 * managing authentication state and operations.
 *
 * Purpose:
 * The primary purpose of these interfaces is to ensure type safety and consistency across the application's
 * authentication flow, from the presentation layer down to the network communication with the backend
 * server. By adhering to these interfaces, the application can facilitate secure and efficient user
 * authentication, registration, and state management.
 *
 * Usage:
 * These interfaces are integral to the authentication system, interacting with models, components, and
 * screens that handle user authentication. They are used to type-check the data sent to and received from
 * the server, manage user session state, and guide the development of authentication-related UI components.
 *
 * Related Modules:
 * - `models/Auth`: Defines the data models related to authentication.
 * - `components/Auth`: Contains React components that utilize these interfaces for prop types and state
 * management.
 * - `screens/Auth`: Screens in the application that involve authentication, leveraging these interfaces
 * for consistency.
 *
 * @module interfaces/Auth
 */


/**
 * Represents a user with credentials.
 *
 * This interface is used for operations that require user identification, such as logging in.
 *
 * @interface User
 * @property {string} email - The email address of the user.
 * @property {string} password - The password for the user account.
 */
export interface User {
    email: string;
    password: string;
}


/**
 * Defines the structure for the request body to register a new user.
 *
 * This interface is used when sending data to the server to create a new user account.
 *
 * @interface AuthRegisterRequestBody
 * @property {string} api_key - The API key required for authentication to the server.
 * @property {string} email - The email address of the new user.
 * @property {string} password - The password for the new user account.
 */
export interface AuthRegisterRequestBody {
    api_key: string;
    email: string;
    password: string;
}


/**
 * Defines the structure for the request body for authentication.
 *
 * This interface is used when sending login credentials to the server.
 *
 * @interface AuthRequestBody
 * @property {string} api_key - The API key required for authentication to the server.
 * @property {string} email - The email address of the user attempting to log in.
 * @property {string} password - The password of the user attempting to log in.
 */
export interface AuthRequestBody {
    api_key: string;
    email: string;
    password: string;
}


/**
 * Represents the response from the server after an authentication request.
 *
 * This interface is used to type the response received from the server upon a successful or failed login
 * attempt.
 *
 * @interface AuthResponse
 * @property {object} data - The data object containing the response details.
 * @property {string} data.token - The authentication token provided upon successful authentication.
 * @property {string} data.message - A message from the server, typically indicating the success or
 * failure reason.
 */
export interface AuthResponse {
    data: {
        token: string;
        message: string;
    };
}


/**
 * Defines the context for authentication operations within the application.
 *
 * This interface provides the structure for the authentication context, which manages user state and
 * authentication operations such as login, logout, and registration.
 *
 * @interface AuthContextType
 * @property {User | undefined} user - The current user object or undefined if no user is logged in.
 * @property {(user: User) => void} setUser - Function to update the current user state.
 * @property {boolean} isLoggedIn - Boolean indicating if a user is currently logged in.
 * @property {(authIndicator: boolean) => void} setIsLoggedIn - Function to update the login state.
 * @property {(username: string, password: string) => Promise<void>} login - Async function to handle
 * user login.
 * @property {() => Promise<void>} logout - Async function to handle user logout.
 * @property {(username: string, password: string) => Promise<void>} register - Async function to handle
 * user registration.
 */
export interface AuthContextType {
    user: User | undefined;
    setUser: (user: User) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (authIndicator: boolean) => void;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
}
