/**
 * @module InvoiceNavigator
 *
 * This module sets up a stack navigator for the invoice-related screens in the application.
 * It includes a cover image, introductory text, and three screens:
 * - InvoiceDataTable: Displays a list of invoices.
 * - InvoiceItem: Displays detailed information about a selected invoice.
 * - InvoiceForm: Provides a form for creating a new invoice.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 *
 * @requires react
 * @requires react-native
 * @requires react-native-screens
 * @requires react-native-flash-message
 * @requires expo-status-bar
 * @requires ../../components/Invoice/InvoiceDataTable
 * @requires ./InvoiceItem.screen
 * @requires ./InvoiceForm.screen
 * @requires ../../components/Utils/CoverImage
 * @requires ../../assets/styles
 * @requires ../../assets/img/NutsAndBolts-7.jpg
 */
// External libraries
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';

// Internal components and modules
import {InvoiceDataTable} from '../../components/Invoice/InvoiceDataTable';
import {InvoiceItem} from './InvoiceItem.screen';
import {InvoiceForm} from './InvoiceForm.screen';
import {CoverImage} from '../../components/Utils/CoverImage';

// Assets & styles
import coverIMG from '../../assets/img/NutsAndBolts-7.jpg';
import * as Style from '../../assets/styles';


/**
 * Stack navigator for invoices.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();


/**
 * Invoice Stack Navigator.
 *
 * This component sets up a stack navigator for the invoice-related screens.
 * It includes a cover image, introductory text, and three screens:
 * - InvoiceDataTable: Displays a list of invoices.
 * - InvoiceItem: Displays detailed information about a selected invoice.
 * - InvoiceForm: Provides a form for creating a new invoice.
 *
 * @constructor
 * @returns {React.ReactElement} The invoice stack navigator component.
 */
export const InvoiceNavigator: React.FC = (): React.ReactElement => {
    const route = useRoute();

    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({headerText: 'Fakturor', image: coverIMG})}

            <View style={Style.Base.content}>
                <Stack.Navigator>
                    <Stack.Screen
                        name='Fakturor'
                        component={InvoiceDataTable}
                        params={{reload: route.params?.reload ?? false}}
                    />
                    <Stack.Screen
                        name='Fakturaspecifikation'
                        component={InvoiceItem}
                    />
                    <Stack.Screen
                        name='Skapa faktura'
                        component={InvoiceForm}
                    />
                </Stack.Navigator>
            </View>

            <StatusBar style='auto'/>

            <FlashMessage position="top"/>
        </SafeAreaView>
    );
};
