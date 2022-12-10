import React from 'react';
import {AuthProvider} from './context/Auth.provider';
import Root from './Root';
import {AppProvider} from "./context/App.provider";


/**
 * App object.
 *
 * @constructor
 */
export default function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <Root/>
            </AppProvider>
        </AuthProvider>
    );
}
