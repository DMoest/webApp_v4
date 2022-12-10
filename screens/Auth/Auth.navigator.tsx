/**
 * Module imports.
 */
import React from 'react';
// import { View, Text } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
// eslint-disable-next-line import/no-unresolved
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useAuthContext} from '../../context/Auth.provider';
import {Login} from './Login.screen';
import {Register} from './Register.screen';
import {ProductList} from '../../components/Product/ProductList';
// import { InvoiceList } from './Invoices/Invoices.screen';

/**
 * Auth stack navigator.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * AuthNavigator object.
 *
 * If property isLoggedIn is set show the invoices screen. Else show the login screen
 * or if user have not registered they can navigate to register screen.
 *
 * @constructor
 */
export const AuthNavigator: () => JSX.Element = () => {
    const authContext = useAuthContext();

    return (
        <Stack.Navigator initianRouteName='Logga in formulär'>
            {authContext.isLoggedIn ? (
                <Stack.Screen
                    name='Faktura'
                    component={ProductList}
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
    );
};
