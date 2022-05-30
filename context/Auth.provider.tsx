/**
 * Module imports.
 */
import React, { createContext, useState } from 'react';
import * as AuthInterfaces from '../interfaces/Auth';
import * as AuthModel from '../models/Auth';

/**
 * Authentication context types.
 */
type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (authIndicator: boolean) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
};

/**
 * Authentication context.
 */
const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: (email) => {
        // What to do?
    },
    login: (username, password) => {},
    logout: () => {},
});

/**
 * Authentication context provider.
 *
 * @param children
 * @constructor
 */
export const AuthProvider: React.FC = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                login: (email, password) => {
                    // Communicate with backend
                    // store token in SecureStore

                    setIsLoggedIn('Daniel@example.com');
                },
                logout: () => {
                    setIsLoggedIn(null);
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Auth context access function export.
 */
export const useAuthContext = () => React.useContext(AuthContext);
