import config from "../config/config.json";
import * as SecureStore from 'expo-secure-store';
import * as AuthInterfaces from '../interfaces/Auth';


/**
 * Checks if the user is currently logged in.
 *
 * This function asynchronously retrieves the authentication token from secure storage.
 * If a token exists, it implies the user is logged in, returning true. Otherwise, it returns false.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the login status.
 */
export async function loggedIn(): Promise<boolean> {
    const token: string | null = await SecureStore.getItemAsync('token');
    return token !== null;
}


/**
 * Handles user login.
 *
 * This function sends an asynchronous request to the server's login endpoint with the user's email and
 * password. If the login is successful, it stores the received authentication token in secure storage and
 * returns a success message. Throws an error if the login fails for any reason, including server errors
 * or incorrect login details.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} A promise that resolves to a success message upon successful login.
 * @throws {Error} Throws an error if the login request fails.
 */
export async function login(email: string, password: string): Promise<string> {
    try {
        const data: AuthInterfaces.AuthRequestBody = {
            api_key: config.api_key,
            email,
            password,
        };

        const response: Response = await fetch(`${config.base_url}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const result: AuthInterfaces.AuthResponse = await response.json();
        await SecureStore.setItemAsync('token', result.data.token);


        return result.data.message;
    } catch (error) {
        console.error("login -> ERROR: ", error);
        throw error; // Re-throw the error for the calling function to handle
    }
}


/**
 * Handles new user registration.
 *
 * This function sends an asynchronous request to the server's registration endpoint with the user's
 * email and password. If the registration is successful, it returns the server's response, which
 * typically includes a success message. Throws an error if the registration fails for any reason, such as
 * server errors or validation issues.
 *
 * @param {string} email - The email address for the new account.
 * @param {string} password - The password for the new account.
 * @returns {Promise<any>} A promise that resolves to the server's response upon successful registration.
 * @throws {Error} Throws an error if the registration request fails.
 */
export async function register(email: string, password: string): Promise<any> {
    try {
        const data: AuthInterfaces.AuthRegisterRequestBody = {
            api_key: config.api_key,
            email: email,
            password: password,
        };

        const response: Response = await fetch(`${config.base_url}/auth/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.log("ERROR: ", error);
    }
}


/**
 * Logs out the current user.
 *
 * This function removes the authentication token from secure storage, effectively logging the user out.
 * It does not return any value.
 *
 * @returns {Promise<void>}
 */
export async function logout(): Promise<void> {
    // Remove token from Expo-SecureStore.
    await SecureStore.deleteItemAsync('token');
}
