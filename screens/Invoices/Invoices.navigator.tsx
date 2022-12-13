/**
 * Module imports.
 */
import React from "react";
import {SafeAreaView, Text, View} from "react-native";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {createStackNavigator} from '@react-navigation/stack';
import {InvoiceList} from "../../components/Invoice/InvoiceList";
import * as Style from "../../assets/styles";
import {CoverImage} from "../../components/Utils/CoverImage";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coverIMG from "../../assets/img/NutsAndBolts-7.jpg";
import {StatusBar} from "expo-status-bar";
import {InvoiceItem} from "./InvoiceItem.screen";
import {InvoiceCreateItem} from "./InvoiceCreateItem.screen";


// Create stack navigator for invoices.
const Stack: NativeStackNavigatorProps = createStackNavigator();


/**
 * Invoice Stack Navigator.
 *
 * @constructor
 */
export const InvoiceNavigator: () => JSX.Element = () => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({headerText: 'Fakturor', image: coverIMG})}

            <View>
                <Text
                    style={[
                        Style.Typography.paragraph,
                        Style.Typography.endMarginText,
                    ]}>
                    Listan innehåller fakturor och endast inloggade användare kan endast se den.
                </Text>
            </View>

            <View>
                <Stack.Navigator>
                    <Stack.Screen
                        name='Fakturor'
                        component={InvoiceList}
                    />
                    <Stack.Screen
                        name='Fakturaspecifikation'
                        component={InvoiceItem}
                    />
                    <Stack.Screen
                        name='Skapa faktura'
                        component={InvoiceCreateItem}
                    />
                </Stack.Navigator>
            </View>
            <StatusBar style='auto'/>
        </SafeAreaView>
    );
};
