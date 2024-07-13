import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { createStackNavigator } from '@react-navigation/stack';
import { DeliveryList } from '../../components/Delivery/DeliveryList';
import { DeliveryItem } from './DeliveryItem.screen';
import { DeliveryCreationForm } from './DeliveryForm.screen';
import { CoverImage } from '../../components/Utils/CoverImage';
import { StatusBar } from 'expo-status-bar';
import * as Style from '../../assets/styles';
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
export const DeliveryNavigator: React.FC = (): React.JSX.Element => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Inleveranser', image: coverIMG })}

            <View style={Style.Container.screenIntroductory}>
                <Text style={Style.Typography.paragraph}>
                    Listan innehåller inleveranser. Varje inleverans har ett
                    inleveransnr. och datum.
                </Text>
            </View>

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

            <StatusBar style='auto' />
        </SafeAreaView>
    );
};
