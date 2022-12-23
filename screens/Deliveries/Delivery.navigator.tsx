import React from 'react';
// eslint-disable-next-line import/namespace
import {SafeAreaView, View} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {createStackNavigator} from '@react-navigation/stack';
import {DeliveryList} from '../../components/Delivery/DeliveryList';
import {DeliveryItem} from './DeliveryItem.screen';
import {DeliveryCreationForm} from './DeliveryForm.screen';
import {CoverImage} from '../../components/Utils/CoverImage';
import {StatusBar} from 'expo-status-bar';
import * as Style from '../../assets/styles';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coverIMG from '../../assets/img/NutsAndBolts-6.jpg';

/**
 * Stack navigator.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * Delivery Stack Navigator.
 *
 * @constructor
 */
export const DeliveryNavigator: () => JSX.Element = () => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Inleveranser', image: coverIMG })}

            <View style={Style.Base.content}>
                <Stack.Navigator>
                    <Stack.Screen
                        name='Inleveranslista'
                        component={DeliveryList}
                    />
                    <Stack.Screen
                        name='Inleveransspecifikation'
                        component={DeliveryItem}
                    />
                    <Stack.Screen
                        name='Inleverasformulär'
                        component={DeliveryCreationForm}
                    />
                </Stack.Navigator>
            </View>

            <StatusBar style='auto' />
        </SafeAreaView>
    );
};
