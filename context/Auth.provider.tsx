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
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>; // Note the Promise<void> since logout is async
    register: (username: string, password: string) => Promise<void>; // Note the Promise<void> since register is async
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
    },
    login: async (email: string, password: string) => {
        await AuthModel.login(email, password);
    },
    logout: async () => {
        await AuthModel.logout();
    },
    register: async (email: string, password: string) => {
        await AuthModel.register(email, password);
    },
});

/**
 * Authentication context provider.
 *
 * @param children
 * @constructor
 */
export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<AuthInterfaces.User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const login = async (email: string, password: string) => {
        setIsLoading(true);

        try {
            // Assuming AuthModel.login() sets some kind of global state or does something else
            // that makes the user "logged in" from the system's perspective.
            await AuthModel.login(email, password).then((user) => {
                console.log('AuthProvider -> login -> user\n', user);
                setUser(user);

                return setIsLoggedIn(true);
            });
        } catch (err) {
            setError(err);
        } finally {
            console.log('AuthProvider -> login -> finally');
            console.log('isLoggedIn: ', isLoggedIn);

            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
            setUser(null);
            setIsLoggedIn(false);
        } catch (e) {
            setError(e);
        }
    };

    const register = async (email: string, password: string) => {
        setIsLoading(true);

        try {
            await AuthModel.register(email, password);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                login,
                logout,
                register,
                // Optionally expose the error and isLoading to consumers
                error,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
};


/**
 * Auth context access function export.
 */
export const useAuthContext = () => React.useContext(AuthContext);
