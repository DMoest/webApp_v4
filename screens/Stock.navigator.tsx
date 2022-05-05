import React, { PropsWithChildren } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StockList } from '../components/Stock/StockList';
import { StockItem } from './StockItem.screen';
import { StatusBar } from 'expo-status-bar';
import * as Style from '../assets/styles';
import coverIMG from '../assets/img/NutsAndBolts-5.jpg';
import { NavigationProp, RouteProp } from '@react-navigation/native';

const Stack = createStackNavigator();

/**
 * Stock Stack Navigator.
 *
 * @param props
 * @constructor
 */
export const StockNavigator: React.FC = (
    props:
        | NavigationProp<object | never>
        | RouteProp<any>
        | PropsWithChildren<string | number | boolean | object | []>,
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
                        {(props) => <StockItem {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
