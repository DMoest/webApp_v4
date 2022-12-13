import config from "../config/config.json";
import * as SecureStore from 'expo-secure-store';

/**
 * Function to check if logged in.
 */
export async function loggedIn() {
    // const authContext = useAuthContext();
    //
    // return authContext.isLoggedIn;

    return false;
}

export async function login(email: string, password: string) {
    const data = {
        api_key: config.api_key,
        email: email,
        password: password,
    };

    console.log("\nDATA BODY: ", data); // TODO: TaBort senare!

    const response = await fetch(`${config.base_url}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
    });

    // Await JSON response.
    const result = await response.json();
    console.log("Response: ", result); // TODO: TaBort senare!

    // Store token in Expo-SecureStore.
    await SecureStore.setItemAsync('token', result.data.token);
    console.log("SecureStore saved TOKEN: ", await SecureStore.getItemAsync('token')); // TODO: TaBort senare!

    console.log("Message: ", result.data.message, "\n"); // TODO: TaBort senare!
    return result.data.message;
}

export async function register(email: string, password: string) {
    const data = {
        api_key: config.api_key,
        email: email,
        password: password,
    };

    console.log("\nDATA BODY: ", data); // TODO: TaBort senare!

    const response = await fetch(`${config.base_url}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
    });

    console.log("Response: ", response.json()); // TODO: TaBort senare!

    return await response.json();
}

export async function logout() {
    // Remove token from Expo-SecureStore.
    await SecureStore.deleteItemAsync('token');
}
