/**
 * Module imports.
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { Home } from './Home.screen';
import { DeliveryNavigator } from './Delivery.navigator';
import { OrderNavigator } from './Order.navigator';
import { ProductsNavigator } from './Products.navigator';
import * as DeliveriesInterfaces from '../interfaces/Deliveries';
import * as OrderInterfaces from '../interfaces/Order';
import * as ProductInterfaces from '../interfaces/Product';
import * as Style from '../assets/styles/index';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * Bottom tab props type.
 */
type BottomTabsProps = {
    products: ProductInterfaces.Product;
    setProducts: () => void;
    orders: OrderInterfaces.Order;
    setOrders: () => void;
    deliveries: DeliveriesInterfaces.Deliveries;
    setDeliveries: () => void;
};

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
 * @param props
 * @constructor
 */
export const BottomTabsNavigator: (props: BottomTabsProps) => JSX.Element = (
    props: BottomTabsProps,
) => {
    return (
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
        </BottomTabs.Navigator>
    );
};
