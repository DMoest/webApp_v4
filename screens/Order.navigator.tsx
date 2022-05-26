/**
 * Module imports.
 */
import React from 'react';
// eslint-disable-next-line import/namespace
import { Text, View } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderList } from '../components/Order/OrderList';
import { OrderItem } from './OrderItem.screen';
import { CoverImage } from '../components/Utils/CoverImage';
import { StatusBar } from 'expo-status-bar';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coverIMG from '../assets/img/NutsAndBolts-3.jpg';
import * as Style from '../assets/styles';

/**
 * Stack navigator for orders.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * Order Stack Navigator.
 *
 * @constructor
 */
export const OrderNavigator: () => JSX.Element = () => {
    return (
        <View style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Order', image: coverIMG })}

            <View style={Style.Container.content}>
                <Text style={Style.Typography.paragraph}>
                    Den här listan innehåller utgående ordrar till kund. Varje
                    order ska innehålla ett id, en order status kod och en
                    beställare.
                </Text>

                <Stack.Navigator>
                    <Stack.Screen
                        name='Orderlista'
                        component={OrderList}
                    />

                    <Stack.Screen
                        name='Plocklista'
                        component={OrderItem}
                    />
                </Stack.Navigator>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
