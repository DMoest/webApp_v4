/**
 * @module DeliveryNavigator
 *
 * This module sets up a stack navigator for the delivery-related screens in the application.
 * It includes a cover image, introductory text, and three screens:
 * - DeliveryList: Displays a list of deliveries.
 * - DeliveryItem: Displays detailed information about a selected delivery.
 * - DeliveryCreationForm: Provides a form for creating a new delivery.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 *
 * @requires react
 * @requires react-native
 * @requires react-native-screens
 * @requires react-native-flash-message
 * @requires expo-status-bar
 * @requires ../../components/Delivery/DeliveryList
 * @requires ./DeliveryItem.screen
 * @requires ./DeliveryForm.screen
 * @requires ../../components/Utils/CoverImage
 * @requires ../../assets/styles
 * @requires ../../assets/img/NutsAndBolts-6.jpg
 */
// External libraries
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';

// Internal components and modules
import {DeliveryList} from '../../components/Delivery/DeliveryList';
import {DeliveryItem} from './DeliveryItem.screen';
import {DeliveryCreationForm} from './DeliveryForm.screen';
import {CoverImage} from '../../components/Utils/CoverImage';

// Assets & styles
import coverIMG from '../../assets/img/NutsAndBolts-6.jpg';
import * as Style from '../../assets/styles';


/**
 * Stack navigator for deliveries.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();


/**
 * Delivery Stack Navigator.
 *
 * This component sets up a stack navigator for the delivery-related screens.
 * It includes a cover image, introductory text, and three screens:
 * - DeliveryList: Displays a list of deliveries.
 * - DeliveryItem: Displays detailed information about a selected delivery.
 * - DeliveryCreationForm: Provides a form for creating a new delivery.
 *
 * @constructor
 * @returns {React.ReactElement} The delivery stack navigator component.
 */
export const DeliveryNavigator: React.FC = (): React.ReactElement => {
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

            <FlashMessage position="top"/>
        </SafeAreaView>
    );
};
