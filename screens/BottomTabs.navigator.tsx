import React, {useEffect} from 'react';
import {createBottomTabNavigator, BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RouteProp} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import * as AuthModel from '../models/Auth';
import {useAuthContext} from '../context/Auth.provider';
import {useAppContext} from '../context/App.provider';
import {Home} from './Home.screen';
import {DeliveryNavigator} from './Deliveries/Delivery.navigator';
import {AuthNavigator} from './Auth/Auth.navigator';
import {OrderNavigator} from './Orders/Order.navigator';
import {ProductsNavigator} from './Products/Products.navigator';
import {InvoiceNavigator} from './Invoices/Invoices.navigator';
import {LoadingIndicator} from '../components/Utils/LoadingIndicator';
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
    Faktura: 'file-invoice-dollar',
    Home: 'home',
    Inleveranser: 'dolly',
    Lager: 'layer-group',
    Login: 'lock',
    Order: 'truck',
    // Login: 'key',
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
export const BottomTabsNavigator: () => React.JSX.Element = () => {
    const authContext = useAuthContext();
    const appContext = useAppContext();

    useEffect(() => {
        // Function to check if user is logged in.
        const checkIfLoggedIn = async () => {
            const isLoggedIn: boolean = await AuthModel.loggedIn();

            // Check if user is logged in.
            authContext.setIsLoggedIn(isLoggedIn);
        };

        // Call to check if user is logged in.
        void checkIfLoggedIn();

        // Check the SecureStore for the user's token.
        SecureStore.getItemAsync('user')
            .then((userString) => {
                if (userString) {
                    console.log('userString', userString);
                    // authContext.setUser('Daniel');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (appContext.isLoading) {
        return <LoadingIndicator loadingType={undefined} />;
    }

    return appContext.isLoading ? (
        <LoadingIndicator loadingType={undefined} />
    ) : (
        <>
            <BottomTabs.Navigator
                screenOptions={({route}: { route: RouteProp<any, any> }): BottomTabNavigationOptions => ({
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
                    tabBarActiveTintColor: Style.Color.schemeOne.secondary[300],
                    tabBarInactiveTintColor: Style.Color.grayScale[200],
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
