/**
 * Module imports.
 */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/namespace
import { View, Text, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useAuthContext } from '../context/Auth.provider';
import { Home } from './Home.screen';
import { DeliveryNavigator } from './Delivery.navigator';
import { InvoiceList } from '../components/Invoice/InvoiceList';
import { Login } from '../components/Auth/Login';
import { OrderNavigator } from './Order.navigator';
import { ProductsNavigator } from './Products.navigator';
import * as AuthModel from '../models/Auth';
import * as Style from '../assets/styles/index';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * Bottom tabs navigator & route icons.
 */
const BottomTabs: NativeStackNavigatorProps = createBottomTabNavigator();
const routeIcons = {
    Home: 'home',
    Lager: 'layer-group',
    Order: 'truck',
    Inleveranser: 'dolly',
};

/**
 * Bottom Navigation Bar.
 *
 * @constructor
 */
export const BottomTabsNavigator: () => JSX.Element = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const authContext = useAuthContext();

    useEffect(async () => {
        // Check if user is logged in.
        authContext.setIsLoggedIn(await AuthModel.loggedIn());

        // Check the SecureStore for the user's token.

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <ActivityIndicator
                    size='large'
                    color={Style.Color.schemeOne.primary}
                />

                <Text
                    style={{
                        paddingVertical: 25,
                        paddingHorizontal: Style.Typography.whiteSpace.X1,
                    }}>
                    Loading...
                </Text>
            </View>
        );
    }

    return (
        <>
            <BottomTabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Hem') {
                            iconName = routeIcons.Home;
                        } else if (route.name === 'Lager') {
                            iconName = routeIcons.Lager;
                        } else if (route.name === 'Order') {
                            iconName = routeIcons.Order;
                        } else if (route.name === 'Inleveranser') {
                            iconName = routeIcons.Inleveranser;
                        } else {
                            iconName = 'list';
                        }

                        return (
                            <FontAwesome5
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: Style.Color.schemeOne.secondary,
                    tabBarInactiveTintColor: Style.Color.grayScale.gray3,
                    headerShown: false,
                })}>
                <BottomTabs.Screen
                    name='Hem'
                    component={Home}
                />

                <BottomTabs.Screen
                    name='Lager'
                    component={ProductsNavigator}
                />

                <BottomTabs.Screen
                    name='Order'
                    component={OrderNavigator}
                />

                <BottomTabs.Screen
                    name='Inleveranser'
                    component={DeliveryNavigator}
                />

                {authContext.isLoggedIn ? (
                    <BottomTabs.Screen
                        name='Faktura'
                        component={InvoiceList}
                    />
                ) : (
                    <BottomTabs.Screen
                        name='Logga in'
                        component={Login}
                    />
                )}
            </BottomTabs.Navigator>
        </>
    );
};
