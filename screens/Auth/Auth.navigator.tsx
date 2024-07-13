/**
 * Module imports.
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useAuthContext} from '../../context/Auth.provider';
import {Login} from './Login.screen';
import {Register} from './Register.screen';
import {InvoiceNavigator} from "../Invoices/Invoices.navigator";
import {SafeAreaView} from "react-native";
import * as Style from "../../assets/styles";


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
export const AuthNavigator: React.FC = (): React.JSX.Element => {
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
        </SafeAreaView>
    );
};
