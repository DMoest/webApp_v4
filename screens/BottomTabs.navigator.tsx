/**
 * Module imports.
 */
import React, {useEffect} from 'react';
// eslint-disable-next-line import/namespace
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-unresolved
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import * as SecureStore from 'expo-secure-store';
import * as AuthModel from '../models/Auth';
import {useAuthContext} from '../context/Auth.provider';
import {useAppContext} from "../context/App.provider";
import {Home} from './Home.screen';
import {DeliveryNavigator} from './Deliveries/Delivery.navigator';
import {AuthNavigator} from './Auth/Auth.navigator';
import {OrderNavigator} from './Orders/Order.navigator';
import {ProductsNavigator} from './Products/Products.navigator';
import {InvoiceNavigator} from './Invoices/Invoices.navigator';
import {LoadingIndicator} from "../components/Utils/LoadingIndicator";
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
    const appContext = useAppContext();

    useEffect(() => {
        // Function to check if user is logged in.
        const checkIfLoggedIn = async () => {
            // Check if user is logged in.
            authContext.setIsLoggedIn(await AuthModel.loggedIn());
        }

        // Call to check if user is logged in.
        checkIfLoggedIn();

        // Check the SecureStore for the user's token.
        SecureStore.getItemAsync('user')
            .then(userString => {
                if (userString) {
                    console.log('userString', userString);
                    authContext.setUser(userString);
                }
            })
            .catch(error => {
                console.log(error);
            });

        // Temporary timeout to simulate loading.
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 1000);
    }, []);

    if (appContext.isLoading) {
        return (
            <LoadingIndicator loadingType={undefined}/>
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
                        component={InvoiceNavigator}
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
