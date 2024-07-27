/**
 * @module ProductsNavigator
 *
 * This module sets up a stack navigator for the product-related screens in the application.
 * It includes a cover image, introductory text, and two screens:
 * - ProductList: Displays a list of products.
 * - StockItem: Displays detailed information about a selected product.
 *
 * The navigator is wrapped in a SafeAreaView to ensure it is displayed correctly on all devices.
 * It also includes a FlashMessage component for displaying notifications and a StatusBar component.
 *
 * @requires react
 * @requires react-native
 * @requires react-native-screens
 * @requires react-native-flash-message
 * @requires expo-status-bar
 * @requires ../../components/Product/ProductList
 * @requires ./ProductItem.screen
 * @requires ../../components/Utils/CoverImage
 * @requires ../../assets/styles
 * @requires ../../assets/img/NutsAndBolts-5.jpg
 */
// External libraries
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
// Internal components and modules
import {ProductList} from '../../components/Product/ProductList';
import {CoverImage} from '../../components/Utils/CoverImage';
import {StockItem} from './ProductItem.screen';
// Assets & styles
import coverIMG from '../../assets/img/NutsAndBolts-5.jpg';
import * as Style from '../../assets/styles';


/**
 * Stack navigator for products.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();


/**
 * Product Stack Navigator.
 *
 * This component sets up a stack navigator for the product-related screens.
 * It includes a cover image, introductory text, and two screens:
 * - ProductList: Displays a list of products.
 * - StockItem: Displays detailed information about a selected product.
 *
 * @constructor
 * @returns {React.ReactElement} The product stack navigator component.
 */
export const ProductsNavigator = (): React.ReactElement => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Lager', image: coverIMG })}

            <View style={Style.Container.screenIntroductory}>
                <Text style={Style.Typography.paragraph}>
                    Listan innehåller lagerförda produkter. Varje produkt har
                    ett namn, ett artikelnr. och antal i lager.
                </Text>

                <Text style={Style.Typography.paragraph}>
                    Om du klickar på en produkt får du mer information om den.
                </Text>
            </View>

            <Stack.Navigator>
                <Stack.Screen
                    name='Produkter'
                    component={ProductList}
                />
                <Stack.Screen
                    name='Produktspecifikation'
                    component={StockItem}
                />
            </Stack.Navigator>

            <StatusBar style='auto' />

            <FlashMessage position="top"/>
        </SafeAreaView>
    );
};
