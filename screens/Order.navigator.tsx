import React, { PropsWithChildren } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { OrderList } from '../components/Order/OrderList';
import { OrderItem } from './OrderItem.screen';
import * as Style from '../assets/styles';
import coverIMG from '../assets/img/NutsAndBolts-3.jpg';

const Stack = createStackNavigator();

/**
 * Order Stack Navigator.
 *
 * @param props
 * @constructor
 */
export const OrderNavigator: React.FC = (
    props:
        | NavigationProp<object | never>
        | RouteProp<any>
        | PropsWithChildren<string | number | boolean | object | []>,
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
                        {(props: React.PropsWithChildren<any>) => (
                            <OrderItem {...props} />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
