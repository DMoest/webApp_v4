import React from 'react';
// eslint-disable-next-line import/namespace
import { Text, View, ImageBackground } from 'react-native';
import { Router } from '@react-navigation/native';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { createStackNavigator } from '@react-navigation/stack';
import { Stock } from '../interfaces/Stock';
import { Deliveries } from '../interfaces/Deliveries';
import { DeliveryList } from '../components/Delivery/DeliveryList';
import { DeliveryItem } from './DeliveryItem.screen';
import { DeliveryCreationForm } from './DeliveryForm.screen';
import { StatusBar } from 'expo-status-bar';
import * as Style from '../assets/styles';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coverIMG from '../assets/img/NutsAndBolts-6.jpg';

type DeliveriesPropsType = {
    products: Stock;
    setProducts: object;
    deliveries: Deliveries;
    setDeliveries: object;
    navigation: NativeStackNavigatorProps;
    route: Router<any, any>;
};

const Stack: NativeStackNavigatorProps = createStackNavigator();

/**
 * Delivery Stack Navigator.
 *
 * @param props
 * @constructor
 */
export const DeliveryNavigator: (props: DeliveriesPropsType) => JSX.Element = (
    props: DeliveriesPropsType,
) => {
    return (
        <View style={Style.Base.mainContainer}>
            <View style={Style.Image.imageContainer}>
                <ImageBackground
                    source={coverIMG}
                    style={Style.Image.image}>
                    <Text style={Style.Typography.header}>Leveranser</Text>
                </ImageBackground>
            </View>

            <View style={Style.Container.content}>
                <Text
                    style={[
                        Style.Typography.paragraph,
                        Style.Typography.endMarginText,
                    ]}>
                    Listan innehåller samtliga inkommande leveraser. En leverans
                    har ett id, ett datum, ett produkt-id, ett produktnamn och
                    antal beställda av produkten. Sist finns en kommentar som
                    tillhör leveransen.
                </Text>

                <Stack.Navigator>
                    <Stack.Screen name='Inleveranslista'>
                        {() => (
                            <DeliveryList
                                deliveries={props.deliveries}
                                setDeliveries={props.setDeliveries}
                            />
                        )}
                    </Stack.Screen>

                    <Stack.Screen name='Inleveransspecifikation'>
                        {(props: React.PropsWithChildren<object>) => (
                            <DeliveryItem {...props} />
                        )}
                    </Stack.Screen>

                    <Stack.Screen name='Inleverasformulär'>
                        {(props: React.PropsWithChildren<object>) => (
                            <DeliveryCreationForm
                                deliveries={props.deliveries}
                                setDeliveries={props.setDeliveries}
                                {...props}
                            />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
