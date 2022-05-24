/**
 * Module imports.
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { Home } from './Home.screen';
import { StockNavigator } from './Stock.navigator';
import { OrderNavigator } from './Order.navigator';
import { DeliveryNavigator } from './Delivery.navigator';
import * as StockInterfaces from '../interfaces/Stock';
import * as OrderInterfaces from '../interfaces/Order';
import * as DeliveriesInterfaces from '../interfaces/Deliveries';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Style from '../assets/styles/index';

/**
 * Bottom tab props type.
 */
type BottomTabsProps = {
    products: StockInterfaces.Stock;
    setProducts: object;
    orders: OrderInterfaces.Order;
    setOrders: object;
    deliveries: DeliveriesInterfaces.Deliveries;
    setDeliveries: object;
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

            <BottomTabs.Screen name='Lager'>
                {() => (
                    <StockNavigator
                        products={props.products}
                        setProducts={props.setProducts}
                    />
                )}
            </BottomTabs.Screen>

            <BottomTabs.Screen name='Order'>
                {() => (
                    <OrderNavigator
                        orders={props.orders}
                        setOrders={props.setOrders}
                    />
                )}
            </BottomTabs.Screen>

            <BottomTabs.Screen name='Inleveranser'>
                {() => (
                    <DeliveryNavigator
                        products={props.products}
                        setProducts={props.setProducts}
                        deliveries={props.deliveries}
                        setDeliveries={props.setDeliveries}
                    />
                )}
            </BottomTabs.Screen>
        </BottomTabs.Navigator>
    );
};
