import React from 'react';
// eslint-disable-next-line import/namespace
import { Text, View, ImageBackground } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { createStackNavigator } from '@react-navigation/stack';
import { Order } from '../interfaces/Order';
import { OrderList } from '../components/Order/OrderList';
import { OrderItem } from './OrderItem.screen';
import { StatusBar } from 'expo-status-bar';
import * as Style from '../assets/styles';
import coverIMG from '../assets/img/NutsAndBolts-3.jpg';

type OrderPropsType = {
    orders: Order[];
    setOrders: object;
};

const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * Order Stack Navigator.
 *
 * @param props
 * @constructor
 */
export const OrderNavigator: (props: OrderPropsType) => JSX.Element = (
    props: OrderPropsType,
) => {
    return (
        <View style={Style.Base.mainContainer}>
            <View style={Style.Image.imageContainer}>
                <ImageBackground
                    source={coverIMG}
                    style={Style.Image.image}>
                    <Text style={Style.Typography.header}>Orderlista</Text>
                </ImageBackground>
            </View>

            <View style={Style.Container.content}>
                <Text style={Style.Typography.paragraph}>
                    Den här listan innehåller utgående ordrar till kund. Varje
                    order ska innehålla ett id, en order status kod och en
                    beställare.{' '}
                </Text>

                <Stack.Navigator>
                    <Stack.Screen name='Orderlista'>
                        {() => (
                            <OrderList
                                orders={props.orders}
                                setOrders={props.setOrders}
                            />
                        )}
                    </Stack.Screen>

                    <Stack.Screen name='Plocklista'>
                        {(props: React.PropsWithChildren<object>) => (
                            <OrderItem {...props} />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
