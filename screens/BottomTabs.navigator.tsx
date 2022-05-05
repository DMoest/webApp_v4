import React, { PropsWithChildren } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Home } from './Home.screen';
import { StockNavigator } from './Stock.navigator';
import { OrderNavigator } from './Order.navigator';
import { DeliveryNavigator } from './Delivery.navigator';
import { Deliveries } from '../interfaces/Deliveries';
import { Order } from '../interfaces/Order';
import { Stock } from '../interfaces/Stock';
import * as Style from '../assets/styles/index';
import { NavigationProp, RouteProp } from '@react-navigation/native';

const BottomTabs = createBottomTabNavigator();
const routeIcons = {
    Home: 'home',
    Lager: 'layer-group',
    Order: 'truck',
    Inleveranser: 'dolly',
};

export type SetStateProps = {
    setProducts: object;
    setOrders: object;
    setDeliveries: object;
};

/**
 * Bottom Navigation Bar.
 *
 * @param props
 * @constructor
 */
export const BottomTabsNavigator: React.FC = (
    props:
        | SetStateProps
        | Deliveries
        | NavigationProp<object>
        | Order
        | PropsWithChildren<any>
        | RouteProp<any>
        | Stock,
) => {
    return (
        <BottomTabs.Navigator
            s
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
