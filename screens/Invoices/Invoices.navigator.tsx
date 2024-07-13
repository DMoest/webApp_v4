/**
 * Module imports.
 */
import React from 'react';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {createStackNavigator} from '@react-navigation/stack';
import {useRoute} from '@react-navigation/native';
import {InvoiceDataTable} from '../../components/Invoice/InvoiceDataTable';
import {InvoiceItem} from './InvoiceItem.screen';
import {InvoiceForm} from './InvoiceForm.screen';
import {StatusBar} from 'expo-status-bar';
import {CoverImage} from '../../components/Utils/CoverImage';
import {SafeAreaView, View} from 'react-native';
import * as Style from '../../assets/styles';
import coverIMG from '../../assets/img/NutsAndBolts-7.jpg';


// Create stack navigator for invoices.
const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * Invoice Stack Navigator.
 *
 * @constructor
 */
export const InvoiceNavigator: () => React.JSX.Element = () => {
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
        </SafeAreaView>
    );
};
