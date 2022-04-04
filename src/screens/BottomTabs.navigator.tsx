import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons';
import {Home} from './Home.screen';
import {StockNavigator} from "./Stock.navigator";
import {OrderNavigator} from "./Order.navigator";
import {DeliveryNavigator} from "./Delivery.navigator";
import {theme} from "../assets/themes/theme";


const BottomTabs = createBottomTabNavigator();
const routeIcons = {
    "Home": "home",
    "Lager": "layer-group",
    // "Lager": "boxes",
    // "Lager": "cube",
    "Order": "truck",
    // "OrderItem": "tasks",
    "Leverans": "dolly",
};

/**
 * Bottom Navigation Bar.
 *
 * @constructor
 */
export const BottomTabsNavigator: React.FC = () => {
    return (
        <BottomTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Hem") {
                        iconName = routeIcons.Home;
                    } else if (route.name === "Lager")  {
                        iconName = routeIcons.Lager;
                    } else if (route.name === "Order")  {
                        iconName = routeIcons.Order;
                    } else if (route.name === "Leverans")  {
                        iconName = routeIcons.Leverans;
                    } else {
                        iconName = "list";
                    }

                    return <FontAwesome5 name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.Colors.secondaryColor,
                tabBarInactiveTintColor: theme.Colors.gray3,
                headerShown: false,
            })}>
            <BottomTabs.Screen name='Hem' component={Home} />
            <BottomTabs.Screen name='Lager' component={StockNavigator} />
            <BottomTabs.Screen name='Order' component={OrderNavigator} />
            <BottomTabs.Screen name='Leverans' component={DeliveryNavigator} />
        </BottomTabs.Navigator>
    )
};
