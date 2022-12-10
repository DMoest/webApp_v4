/**
 * Module imports.
 */
import React, {useEffect, useState} from 'react';
// eslint-disable-next-line import/namespace
import {ActivityIndicator, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-unresolved
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useAuthContext} from '../context/Auth.provider';
import {Home} from './Home.screen';
import {DeliveryNavigator} from './Deliveries/Delivery.navigator';
import {InvoiceList} from '../components/Invoice/InvoiceList';
// import { Login } from './Auth/AuthLogin.screen';
import {AuthNavigator} from './Auth/Auth.navigator';
import {OrderNavigator} from './Orders/Order.navigator';
import {ProductsNavigator} from './Products/Products.navigator';
import * as AuthModel from '../models/Auth';
import {FontAwesome5} from '@expo/vector-icons';
import * as Style from '../assets/styles/index';


/**
 * Bottom tabs navigator.
 */
const BottomTabs: NativeStackNavigatorProps = createBottomTabNavigator();


/**
 * Bottom tabs navigator icons.
 */
const routeIcons = {
    Home: 'home',
    Lager: 'layer-group',
    Order: 'truck',
    Inleveranser: 'dolly',
    Login: 'lock',
    // Login: 'key',
    Faktura: 'file-invoice-dollar',
};


/**
 * Bottom Navigation Bar.
 *
 * The Navigation bar is the main navigation of the application.
 * It is used to navigate between the different screens.
 * Each screen may have several underlying screens navigated through a nested stack navigator.
 *
 * @constructor
 */
export const BottomTabsNavigator: () => JSX.Element = () => {
    const authContext = useAuthContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Function to check if user is logged in.
        const checkIfLoggedIn = async () => {
            // Check if user is logged in.
            authContext.setIsLoggedIn(await AuthModel.loggedIn());
        }

        // Call to check if user is logged in.
        checkIfLoggedIn();

        // Check the SecureStore for the user's token.

        // Temporary timeout to simulate loading.
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
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
                screenOptions={({route}) => ({
                    tabBarIcon: ({color, size}) => {
                        let iconName;

                        if (route.name === 'Hem') {
                            iconName = routeIcons.Home;
                        } else if (route.name === 'Lager') {
                            iconName = routeIcons.Lager;
                        } else if (route.name === 'Order') {
                            iconName = routeIcons.Order;
                        } else if (route.name === 'Inleveranser') {
                            iconName = routeIcons.Inleveranser;
                        } else if (route.name === 'Logga in') {
                            iconName = routeIcons.Login;
                        } else if (route.name === 'Faktura') {
                            iconName = routeIcons.Faktura;
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
                        component={AuthNavigator}
                    />
                )}
            </BottomTabs.Navigator>
        </>
    );
};
