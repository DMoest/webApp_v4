import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
// eslint-disable-next-line import/namespace
import { LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import * as Style from './assets/styles/index';
import {
    useFonts,
    OleoScriptSwashCaps_400Regular,
    OleoScriptSwashCaps_700Bold,
} from '@expo-google-fonts/oleo-script-swash-caps';
import {
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_600SemiBold,
} from '@expo-google-fonts/josefin-sans';
import {
    Merriweather_300Light,
    Merriweather_300Light_Italic,
    Merriweather_400Regular,
    Merriweather_400Regular_Italic,
    Merriweather_700Bold,
    Merriweather_700Bold_Italic,
} from '@expo-google-fonts/merriweather';

LogBox.ignoreLogs([
    'Remote debugger',
    'Non-serializable values were found in the navigation state',
]);

/**
 * Main App module.
 *
 * Build states for app.
 * Font loader to with the package expo-google-fonts.
 * SafeAreaView with navigation containers.
 * Navigation with React-Navigation package, stack navigation type to navigate between app screens.
 *
 * @constructor
 */
export const App: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [deliveries, setDeliveries] = useState([]);

    const [fontsLoaded] = useFonts({
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
        <SafeAreaView style={Style.Base.mainContainer}>
            <NavigationContainer>
                <BottomTabsNavigator
                    products={products}
                    setProducts={setProducts}
                    orders={orders}
                    setOrders={setOrders}
                    deliveries={deliveries}
                    setDeliveries={setDeliveries}
                />
            </NavigationContainer>
        </SafeAreaView>
    );
};

/**
 * Module exports.
 */
export default App;
