import React from "react";
import AppLoading from 'expo-app-loading';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Stock from './src/screens/Stock';
import StockListItem from "./src/screens/StockItem";
import Order from "./src/screens/Order";
import Delivery from "./src/screens/Delivery";
import {theme} from "./src/assets/themes/theme";
import {
    OleoScriptSwashCaps_400Regular,
    OleoScriptSwashCaps_700Bold,
} from '@expo-google-fonts/oleo-script-swash-caps'
import {
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_600SemiBold,
} from '@expo-google-fonts/josefin-sans'
import {
    useFonts,
    Merriweather_300Light,
    Merriweather_300Light_Italic,
    Merriweather_400Regular,
    Merriweather_400Regular_Italic,
    Merriweather_700Bold,
    Merriweather_700Bold_Italic,
} from '@expo-google-fonts/merriweather'
import OrderListItem from "./src/components/OrderListItem";


const Stack = createStackNavigator();

/**
 * Main App module.
 *
 * Font loader to with the package expo-google-fonts.
 * SafeAreaView with navigation container.
 * Navigation with React-Navigation package, stack navigation type to navigate between app screens.
 *
 * @constructor
 */
const App =() => {
    const [fontsLoaded, error] = useFonts({
        OleoScriptSwashCaps_400Regular,
        OleoScriptSwashCaps_700Bold,
        JosefinSans_400Regular,
        JosefinSans_500Medium,
        JosefinSans_600SemiBold,
        Merriweather_300Light,
        Merriweather_300Light_Italic,
        Merriweather_400Regular,
        Merriweather_400Regular_Italic,
        Merriweather_700Bold,
        Merriweather_700Bold_Italic,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <SafeAreaView style={[styles.safeArea, styles.container]}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Home'
                                  component={Home}
                                  options={{ title: "Välkommen" }} />

                    <Stack.Screen name='StockList'
                                  component={Stock}
                                  options={{ title: "Produktkatalog" }} />

                    <Stack.Screen name='StockItem'
                                  component={StockListItem}
                                  options={{ title: "Produkt" }} />

                    <Stack.Screen name='OrderList'
                                  component={Order}
                                  options={{ title: "Orderlista" }} />

                    <Stack.Screen name='OrderItem'
                                  component={OrderListItem}
                                  options={{ title: "Order" }} />

                    <Stack.Screen name='DeliveryList'
                                  component={Delivery}
                                  options={{ title: "Leveranser" }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

/**
 * App module styles.
 */
const styles = StyleSheet.create({
    safeArea: {
        flex: 2,
    },
    container: {
        flex: 1,
    },
    base: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        paddingHorizontal: theme.Container.basePaddingH,
    },
    header: {
        alignSelf: 'center',
        marginTop: theme.Container.headerMarginT,
        marginBottom: theme.Container.headerMarginB,
        color: theme.Colors.textColorDark,
        fontSize: theme.Typography.headerFontSize,
    },
});

/**
 * Module exports.
 */
export default App;
