/**
 * Module imports.
 */
import React from 'react';
// eslint-disable-next-line import/namespace
import { Text, View } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductList } from '../components/Products/ProductList';
import { StockItem } from './ProductItem.screen';
import { StatusBar } from 'expo-status-bar';
import { CoverImage } from '../components/Utils/CoverImage';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coverIMG from '../assets/img/NutsAndBolts-5.jpg';
import * as Style from '../assets/styles';

/**
 * Stack navigator for products.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * Products Stack Navigator.
 *
 * @constructor
 */
export const ProductsNavigator: () => JSX.Element = () => {
    return (
        <View style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Lager', image: coverIMG })}

            <View>
                <Text
                    style={[
                        Style.Typography.paragraph,
                        Style.Typography.endMarginText,
                    ]}>
                    Listan innehåller lagerförda produkter. Varje produkt har
                    ett namn, ett artikelnr. och antal i lager.
                </Text>
            </View>

            <View style={Style.Base.content}>
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
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
