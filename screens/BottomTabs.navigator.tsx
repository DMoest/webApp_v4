import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Home } from './Home.screen';
import { StockNavigator } from './Stock.navigator';
import { OrderNavigator } from './Order.navigator';
import { DeliveryNavigator } from './Delivery.navigator';
import * as Style from '../assets/styles/index';

type BottomTabsProps = {
    products: object;
    setProducts: object;
    orders: object;
    setOrders: object;
    deliveries: object;
    setDeliveries: object;
};

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
                tabBarIcon: ({ focused, color, size }) => {
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
                        deliveries={props.deliveries}
                        setDeliveries={props.setDeliveries}
                    />
                )}
            </BottomTabs.Screen>
        </BottomTabs.Navigator>
    );
};
