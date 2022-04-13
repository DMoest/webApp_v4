import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons';
import {Home} from './Home.screen';
import {StockNavigator} from "./Stock.navigator";
import {OrderNavigator} from "./Order.navigator";
import {DeliveryNavigator} from "./Delivery.navigator";
// import * as Product from "../models/Products";
import * as Style from "../assets/styles/index";


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
export const BottomTabsNavigator: React.FC = ({products, setProducts, orders, setOrders, deliveries, setDeliveries}) => {
    // const [products, setProducts] = useState([]);

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
                tabBarActiveTintColor: Style.Color.schemeOne.secondary,
                tabBarInactiveTintColor: Style.Color.grayScale.gray3,
                headerShown: false,
            })}>
            <BottomTabs.Screen name='Hem' component={Home} />

            <BottomTabs.Screen name='Lager'>
                {() => <StockNavigator products={products} setProducts={setProducts}/>}
            </BottomTabs.Screen>

            <BottomTabs.Screen name='Order' component={OrderNavigator} />

            <BottomTabs.Screen name='Leverans'>
                {() => <DeliveryNavigator deliveries={deliveries} setDeliveries={setDeliveries}/>}
            </BottomTabs.Screen>
        </BottomTabs.Navigator>
    )
};
