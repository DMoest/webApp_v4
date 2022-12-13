/**
 * Module imports.
 */
import React from "react";
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from "@react-navigation/native";
import {useAuthContext} from "../../context/Auth.provider";
import {InvoiceList} from "../../components/Invoice/InvoiceList";
import {InvoiceItem} from "./InvoiceItem.screen";
import {InvoiceCreateItem} from "./InvoiceCreateItem.screen";
import {StatusBar} from "expo-status-bar";
import {CoverImage} from "../../components/Utils/CoverImage";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import * as Style from "../../assets/styles";
// @ts-ignore
import coverIMG from "../../assets/img/NutsAndBolts-7.jpg";


// Create stack navigator for invoices.
const Stack: NativeStackNavigatorProps = createStackNavigator();


/**
 * Invoice Stack Navigator.
 *
 * @constructor
 */
export const InvoiceNavigator: () => JSX.Element = () => {
    const authContext = useAuthContext();
    const navigation = useNavigation();

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

                <TouchableOpacity
                    style={Style.Button.button}
                    onPress={async () => {
                        // Logout user.
                        await authContext.logout();

                        // @ts-ignore
                        await navigation.navigate('Logga in');
                    }}>

                    <View>
                        <Text style={Style.Typography.buttonText}>Logga ut</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <StatusBar style='auto'/>
        </SafeAreaView>
    );
};
