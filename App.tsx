import React from 'react';
import { AppProvider } from './context/App.provider';
import { AuthProvider } from './context/Auth.provider';
import Root from './Root';

/**
 * App object.
 *
 * @constructor
 */
export default function App(): React.JSX.Element {
    return (
        <AuthProvider>
            <AppProvider>
                <Root />
            </AppProvider>
        </AuthProvider>
    );
}
