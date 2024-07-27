/**
 * @module OrderNavigator
 *
 * This module sets up a stack navigator for the order-related screens in the application.
 * It includes a cover image, introductory text, and two screens:
 * - OrderList: Displays a list of orders.
 * - OrderItem: Displays detailed information about a selected order.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 *
 * @requires react
 * @requires react-native
 * @requires react-native-screens
 * @requires react-native-flash-message
 * @requires expo-status-bar
 * @requires ../../components/Order/OrderList
 * @requires ./OrderItem.screen
 * @requires ../../components/Utils/CoverImage
 * @requires ../../assets/styles
 * @requires ../../assets/img/NutsAndBolts-3.jpg
 */
// External libraries
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';

// Internal components and modules
import {OrderList} from '../../components/Order/OrderList';
import {OrderItem} from './OrderItem.screen';
import {CoverImage} from '../../components/Utils/CoverImage';

// Assets & styles
import coverIMG from '../../assets/img/NutsAndBolts-3.jpg';
import * as Style from '../../assets/styles';


/**
 * Stack navigator for orders.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();


/**
 * Order Stack Navigator.
 *
 * This component sets up a stack navigator for the order-related screens.
 * It includes a cover image, introductory text, and two screens:
 * - OrderList: Displays a list of orders.
 * - OrderItem: Displays detailed information about a selected order.
 *
 * @constructor
 * @returns {React.ReactElement} The order stack navigator component.
 */
export const OrderNavigator = (): React.ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({headerText: 'Order', image: coverIMG})}

            <View style={Style.Container.screenIntroductory}>
                <Text style={Style.Typography.paragraph}>
                    Orderfliken innehåller en lista över ordrar. Ordrarna har
                    olika status internt innan dem skickas till kund.
                </Text>
            </View>

            <Stack.Navigator>
                <Stack.Screen
                    name='Orderlista'
                    component={OrderList}
                    reload={false}
                />

                <Stack.Screen
                    name='Orderhanterare'
                    component={OrderItem}
                />
            </Stack.Navigator>

            <StatusBar style='auto'/>

            <FlashMessage position="top"/>
        </SafeAreaView>
    );
};
