/**
 * Module imports.
 */
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {createStackNavigator} from '@react-navigation/stack';
import {OrderList} from '../../components/Order/OrderList';
import {OrderItem} from './OrderItem.screen';
import {CoverImage} from '../../components/Utils/CoverImage';
import {StatusBar} from 'expo-status-bar';
import * as Style from '../../assets/styles';
import coverIMG from '../../assets/img/NutsAndBolts-3.jpg';

/**
 * Stack navigator for orders.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * Order Stack Navigator.
 *
 * @constructor
 */
export const OrderNavigator: () => React.JSX.Element = () => {
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
        </SafeAreaView>
    );
};
