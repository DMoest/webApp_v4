import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {DeliveryList} from '../components/DeliveryList';
import {DeliveryItem} from './DeliveryItem.screen';
import {StatusBar} from 'expo-status-bar';
import * as Style from '../assets/styles';
import coverIMG from '../assets/img/NutsAndBolts-6.jpg';


const Stack = createStackNavigator();

/**
 * Delivery screen/view.
 *
 * @constructor
 */
export const DeliveryNavigator: React.FC =({deliveries, setDeliveries}) => {
    return (
        <View style={Style.Base.mainContainer}>
            <View style={Style.Image.imageContainer}>
                <ImageBackground source={coverIMG} style={Style.Image.image}>
                    <Text style={Style.Typography.header}>Leveranser</Text>
                </ImageBackground>
            </View>

            <View style={Style.Container.content}>
                <Text style={[Style.Typography.paragraph, Style.Typography.endMarginText]}>
                    Listan innehåller samtliga inkommande leveraser. En leverans har ett id, ett datum,
                    ett produkt-id, ett produktnamn och antal beställda av produkten.
                    Sist finns en kommentar som tillhör leveransen.
                </Text>

                <Stack.Navigator>
                    {/*<Stack.Screen name='Leveranslista' component={DeliveryList} />*/}
                    {/*<Stack.Screen name='Leverans' component={DeliveryItem} />*/}

                    {/*<Stack.Screen name='Produkter' component={StockList} />*/}
                    <Stack.Screen name='Leveranser'>
                        {() => <DeliveryList deliveries={deliveries} setDeliveries={setDeliveries} />}
                    </Stack.Screen>

                    {/*<Stack.Screen name='Leveransdetaljer' component={DeliveryItem} />*/}
                    <Stack.Screen name='Leveransdetaljer'>
                        {() => <DeliveryItem deliveries={deliveries} setDeliveries={setDeliveries} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </View>

            <StatusBar style='auto'/>
        </View>
    );
}
