import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {StatusBar} from 'expo-status-bar';
import {OrderList} from '../components/OrderList';
import {OrderItem} from "./OrderItem.screen";
import * as Style from '../assets/styles';
import coverIMG from '../assets/img/NutsAndBolts-3.jpg';


const Stack = createStackNavigator();

/**
 * Order Stack Navigator.
 *
 * @constructor
 */
export const OrderNavigator: React.FC =() => {
    return (
        <View style={Style.Base.mainContainer}>
            <View style={Style.Image.imageContainer}>
                <ImageBackground source={coverIMG} style={Style.Image.image}>
                    <Text style={Style.Typography.header}>Orderlista</Text>
                </ImageBackground>
            </View>

            <View style={Style.Container.content}>
                <Text style={Style.Typography.paragraph}>Den här listan innehåller utgående ordrar till kund. Varje order ska innehålla ett id, en order status kod och en beställare. </Text>

                <Stack.Navigator>
                    <Stack.Screen name='Orderlista' component={OrderList} />
                    <Stack.Screen name='OrderDetails' component={OrderItem} />
                </Stack.Navigator>
            </View>

            <StatusBar style='auto'/>
        </View>
    );
}
