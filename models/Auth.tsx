import config from "../config/config.json";
import * as SecureStore from 'expo-secure-store';
import * as AuthInterfaces from '../interfaces/Auth';


/**
 * Function to check if logged in.
 */
export async function loggedIn(): Promise<boolean> {
    const token: string | null = await SecureStore.getItemAsync('token');
    console.log("AuthModel -> loggedIn() -> token: ", token);

    return token !== null;
}


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
        console.log("LogIn -> ERROR: ", error);
        throw error; // Re-throw the error for the calling function to handle
    }
}


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


export async function logout(): Promise<void> {
    // Remove token from Expo-SecureStore.
    await SecureStore.deleteItemAsync('token');
}
