import React from "react";
import {SafeAreaView, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Stock from './src/screens/Stock';
import {theme} from "./src/assets/themes/theme";

const Stack = createStackNavigator();

const App =() => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Home' component={Home} options={{ title: "Välkommen" }} />
                    <Stack.Screen name='Stocks' component={Stock} options={{ title: "Produktkatalog" }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 2,
    },
    container: {
        flex: 1,
    },
    base: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 12,
    },
    header: {
        fontSize: theme.typography.headerFontSize,
        marginTop: 21,
        marginBottom: 42,
        color: theme.colors.textColorDark,
        alignSelf: 'center'
    },
});

export default App;
