/**
 * @module AuthNavigator
 *
 * This module sets up a stack navigator for the authentication-related screens in the application.
 * Depending on the user's authentication status, it either shows the invoice navigator or the
 * login/register screens.
 * It includes:
 * - Login: Screen for user login.
 * - Register: Screen for user registration.
 * - InvoiceNavigator: Navigator for invoice-related screens, shown if the user is logged in.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications.
 *
 * @requires react
 * @requires react-native
 * @requires react-native-screens
 * @requires react-native-flash-message
 * @requires ../../context/Auth.provider
 * @requires ./Login.screen
 * @requires ./Register.screen
 * @requires ../Invoices/Invoices.navigator
 * @requires ../../assets/styles
 */
// External libraries
import React from 'react';
import {SafeAreaView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import FlashMessage from 'react-native-flash-message';

// Internal components and modules
import { useAuthContext } from '../../context/Auth.provider';
import { Login } from './Login.screen';
import { Register } from './Register.screen';
import { InvoiceNavigator } from '../Invoices/Invoices.navigator';

// Assets & styles
import * as Style from '../../assets/styles';


/**
 * Stack navigator for authentication.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();


/**
 * AuthNavigator component.
 *
 * This component sets up a stack navigator for the authentication-related screens.
 * If the user is logged in, it shows the InvoiceNavigator. Otherwise, it shows the Login and Register
 * screens.
 *
 * @constructor
 * @returns {React.ReactElement} The authentication stack navigator component.
 */
export const AuthNavigator: React.FC = (): React.ReactElement => {
    const authContext = useAuthContext();

    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            <Stack.Navigator initianRouteName='Logga in formulär'>
                {authContext.isLoggedIn ? (
                    <Stack.Screen
                        name='Faktura'
                        component={InvoiceNavigator}
                        options={{
                            headerShown: false,
                        }}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name='Logga in formulär'
                            component={Login}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='Registrera användare'
                            component={Register}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>

            <FlashMessage position="top"/>
        </SafeAreaView>
    );
};
