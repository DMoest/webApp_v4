/**
 * Module imports.
 */
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductList} from '../../components/Product/ProductList';
import {StockItem} from './ProductItem.screen';
import {StatusBar} from 'expo-status-bar';
import {CoverImage} from '../../components/Utils/CoverImage';
import coverIMG from '../../assets/img/NutsAndBolts-5.jpg';
import * as Style from '../../assets/styles';


/**
 * Stack navigator for products.
 */
const Stack: NativeStackNavigatorProps = createStackNavigator();


/**
 * Product Stack Navigator.
 *
 * @constructor
 */
export const ProductsNavigator: () => JSX.Element = () => {
    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            {CoverImage({headerText: 'Lager', image: coverIMG})}

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

            <StatusBar style='auto'/>
        </SafeAreaView>
    );
};
