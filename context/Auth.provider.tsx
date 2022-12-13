/**
 * Module imports.
 */
import React, {createContext, useState} from 'react';
import * as AuthInterfaces from '../interfaces/Auth';
import * as AuthModel from '../models/Auth';
import * as SecureStore from 'expo-secure-store';


/**
 * Authentication context types.
 */
type AuthContextType = {
    user: AuthInterfaces.User | undefined;
    setUser: (user: AuthInterfaces.User) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (authIndicator: boolean) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
    register: (username: string, password: string) => void;
};


/**
 * Authentication context.
 */
const AuthContext = createContext<AuthContextType>({
    user: undefined,
    setUser(user: AuthInterfaces.User | null): void {
    },
    isLoggedIn: false,
    setIsLoggedIn: () => {
        // What to do?
    },
    login: (username: string, password: string) => {
        // Login user with AuthModel.login()
    },
    logout: () => {
        // Logout user with AuthModel.logout()
    },
    register: (username: string, password: string) => {
        // Register user with AuthModel.register()
    }
});


/**
 * Authentication context provider.
 *
 * @param children
 * @constructor
 */
export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser: async (user: AuthInterfaces.User) => {
                },
                isLoggedIn,
                setIsLoggedIn,
                login: async (email, password) => {
                    // Activate loading indicator.
                    await setIsLoading(true);

                    // Login user.
                    await AuthModel.login(email, password);
                    await setIsLoggedIn(true);

                    // Deactivate loading indicator.
                    await setIsLoading(false);

                },
                logout: async () => {
                    await SecureStore.deleteItemAsync('token');
                    await setUser(null);
                    await setIsLoggedIn(false);
                },
                register: async (email, password) => {
                    // Activate loading indicator.
                    await setIsLoading(true);

                    // Register user.
                    await AuthModel.register(email, password);

                    // Deactivate loading indicator.
                    await setIsLoading(false);
                }
            }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Auth context access function export.
 */
export const useAuthContext = () => React.useContext(AuthContext);
