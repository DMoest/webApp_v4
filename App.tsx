import React from "react";
import AppLoading from 'expo-app-loading';
import {SafeAreaView, StyleSheet} from 'react-native';
// import {createIconSet, Ionicons, AntDesign, Entypo} from '@expo/vector-icons';
import {createIconSet, FontAwesome5} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Stock from './src/screens/Stock';
// import StockListItem from "./src/screens/StockItem";
import Order from "./src/screens/Order";
import Delivery from "./src/screens/Delivery";
import {theme} from "./src/assets/themes/theme";
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
 * Create Bottom Navigation Object.
 */
const MainNavi = createBottomTabNavigator();
// const MainNavi = createMainNaviNavigator();

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

    const routeIcons = {
        "Home": "home",
        // "StockList": "boxes",
        // "StockList": "cube",
        "StockList": "layer-group",
        // "StockList": "albums",
        // "StockList": "layers",
        // "OrderList": "tasks",
        "OrderList": "truck",
        "DeliveryList": "dolly",
    };

    return (
        <SafeAreaView style={[styles.safeArea, styles.base]}>
            <NavigationContainer>
                <MainNavi.Navigator
                    screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = routeIcons.Home;
                        } else if (route.name === "StockList")  {
                            iconName = routeIcons.StockList;
                        } else if (route.name === "OrderList")  {
                            iconName = routeIcons.OrderList;
                        } else if (route.name === "DeliveryList")  {
                            iconName = routeIcons.DeliveryList;
                        } else {
                            iconName = "alert";
                        }

                        return <FontAwesome5 name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: theme.Colors.secondaryColor,
                    tabBarInactiveTintColor: theme.Colors.gray3,
                })}>
                    <MainNavi.Screen name='Home'
                                  component={Home}
                                  options={{ title: "Hem" }} />

                    <MainNavi.Screen name='StockList'
                                  component={Stock}
                                  options={({route}) => ({ title: "Produktkatalog" })} />

                    {/*<MainNavi.Screen name='StockItem'*/}
                    {/*              component={StockListItem}*/}
                    {/*              options={{ title: "Produkt" }} />*/}

                    <MainNavi.Screen name='OrderList'
                                  component={Order}
                                  options={{ title: "Orderlista" }} />

                    {/*<MainNavi.Screen name='OrderItem'*/}
                    {/*              component={OrderListItem}*/}
                    {/*              options={{ title: "Order" }} />*/}

                    <MainNavi.Screen name='DeliveryList'
                                  component={Delivery}
                                  options={{ title: "Leveranser" }} />
                </MainNavi.Navigator>
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
