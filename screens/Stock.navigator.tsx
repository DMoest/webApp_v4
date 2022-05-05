import React from 'react';
// eslint-disable-next-line import/namespace
import { ImageBackground, Text, View } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { createStackNavigator } from '@react-navigation/stack';
import { Stock } from '../interfaces/Stock';
import { StockList } from '../components/Stock/StockList';
import { StockItem } from './StockItem.screen';
import { StatusBar } from 'expo-status-bar';
import * as Style from '../assets/styles';
import coverIMG from '../assets/img/NutsAndBolts-5.jpg';

type StockPropsType = {
    products: Stock[];
    setProducts: object;
};

const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * Stock Stack Navigator.
 *
 * @param props
 * @constructor
 */
export const StockNavigator: (props: StockPropsType) => JSX.Element = (
    props: StockPropTypes,
) => {
    return (
        <View style={Style.Base.mainContainer}>
            <View style={Style.Image.imageContainer}>
                <ImageBackground
                    source={coverIMG}
                    style={Style.Image.image}>
                    <Text style={Style.Typography.header}>Produkter</Text>
                </ImageBackground>
            </View>

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
                            <StockList
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
