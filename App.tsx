import React from "react";
import AppLoading from 'expo-app-loading';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabsNavigator} from "./screens/BottomTabs.navigator";
import {theme} from "./assets/styles/theme";
import {
    useFonts,
    OleoScriptSwashCaps_400Regular,
    OleoScriptSwashCaps_700Bold,
} from '@expo-google-fonts/oleo-script-swash-caps'
import {
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_600SemiBold,
} from '@expo-google-fonts/josefin-sans'
import {
    Merriweather_300Light,
    Merriweather_300Light_Italic,
    Merriweather_400Regular,
    Merriweather_400Regular_Italic,
    Merriweather_700Bold,
    Merriweather_700Bold_Italic,
} from '@expo-google-fonts/merriweather'


/**
 * Main App module.
 *
 * Font loader to with the package expo-google-fonts.
 * SafeAreaView with navigation containers.
 * Navigation with React-Navigation package, stack navigation type to navigate between app screens.
 *
 * @constructor
 */
export const App: React.FC =() => {
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
        <SafeAreaView style={[styles.safeArea, styles.base]}>
            <NavigationContainer>
                <BottomTabsNavigator/>
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
    base: {
        flex: 1,
        backgroundColor: theme.Colors.white,
        paddingHorizontal: theme.Typography.whiteSpace50,
    },
});

/**
 * Module exports.
 */
export default App;
