/**
 * Module imports.
 */
import React, {createContext, useState} from 'react';
import * as AuthInterfaces from '../interfaces/Auth';

/**
 * Authentication context types.
 */
type AuthContextType = {
    user: AuthInterfaces.User;
    setUser: (user: AuthInterfaces.User) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (authIndicator: boolean) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
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
        // setUser(username);
    },
    logout: () => {
        // Logout user with AuthModel.logout()
    },
});

/**
 * Authentication context provider.
 *
 * @param children
 * @constructor
 */
export const AuthProvider: React.FC = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState('Daniel');
    const [user, setUser] = useState('Daniel');

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser: (user: AuthInterfaces.User) => {
                },
                isLoggedIn,
                setIsLoggedIn,
                login: (email, password) => {
                    // Communicate with backend and store token in SecureStore
                    setIsLoggedIn('Daniel@example.com');
                    setUser('Daniel');
                    // SecureStore.setItemAsync('user', 'Daniel@example.com');
                },
                logout: () => {
                    setIsLoggedIn(null);
                    setUser(null);
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
