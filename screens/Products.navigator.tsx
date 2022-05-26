/**
 * Module imports.
 */
import React from 'react';
// eslint-disable-next-line import/namespace
import { ImageBackground, Text, View } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductList } from '../components/Products/ProductList';
import { StockItem } from './ProductItem.screen';
import { Product } from '../interfaces/Product';
import { StatusBar } from 'expo-status-bar';
import { CoverImage } from '../components/Utils/CoverImage';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coverIMG from '../assets/img/NutsAndBolts-5.jpg';
import * as Style from '../assets/styles';

/**
 * Products props type.
 */
type StockPropsType = {
    products: Product[];
    setProducts: object;
};

const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * Products Stack Navigator.
 *
 * @param props
 * @constructor
 */
export const ProductsNavigator: (props: StockPropsType) => JSX.Element = (
    props: StockPropsType,
) => {
    return (
        <View style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Lager', image: coverIMG })}

            <View style={Style.Base.content}>
                <Text
                    style={[
                        Style.Typography.paragraph,
                        Style.Typography.endMarginText,
                    ]}>
                    Listan innehåller lagerförda produkter. Varje produkt har
                    ett namn, ett artikelnr. och antal i lager.
                </Text>

                <Stack.Navigator>
                    <Stack.Screen name='Produkter'>
                        {() => (
                            <ProductList
                                products={props.products}
                                setProducts={props.setProducts}
                            />
                        )}
                    </Stack.Screen>

                    <Stack.Screen name='Produktspecifikation'>
                        {(props: React.PropsWithChildren<object>) => (
                            <StockItem {...props} />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
