import React, {useCallback, useMemo, useState} from 'react';
import {
    FlatList,
    Text,
    Pressable,
    View,
} from 'react-native';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {FontAwesome5} from '@expo/vector-icons';
import {useAppContext} from '../../context/App.provider';
import {OrderListItem} from './OrderListItem';
import {LoadingIndicator} from '../Utils/LoadingIndicator';
import * as OrderModel from '../../models/Orders';
import * as OrderInterfaces from '../../interfaces/Order';
import * as Style from '../../assets/styles';


/**
 * Represents a tab view containing lists of orders categorized by their status (New, Packed, Sent, Returns).
 * Utilizes the React Native Tab View for navigation between these lists. Each list can refresh to fetch the latest orders.
 * Handles loading states and displays a loading indicator accordingly.
 *
 * @returns {React.ReactElement} A component that renders a tab view with lists of orders.
 */
export const OrderList: React.FC = (): React.ReactElement => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'first', title: 'Nya', icon: 'box-open'},
        {key: 'second', title: 'Packade', icon: 'box'},
        {key: 'third', title: 'Skickade', icon: 'paper-plane'},
        {key: 'fourth', title: 'Returer', icon: 'undo-alt'},
    ]);
    let reload: boolean | null = route.params?.reload ?? false;


    /**
     * Asynchronously fetches orders from an API and updates the application context with the fetched orders.
     * Sets the refreshing state during the loading process and logs any errors encountered.
     *
     * @async
     * @function loadOrders
     * @returns {Promise<void>} A promise that resolves when orders have been fetched and the application
     * context has been updated.
     */
    const loadOrders = async (): Promise<void> => {
        appContext.setIsRefreshing(true);

        try {
            appContext.setOrders(await OrderModel.getOrders());
        } catch (error) {
            console.error(error);
        } finally {
            appContext.setIsRefreshing(false);
        }
    };


    /**
     * A hook that triggers the reloading of orders based on specific conditions, such as navigation
     * parameters or the current order list being empty. Ensures that the latest orders are fetched and
     * displayed whenever the component comes into focus.
     *
     * @hook useFocusEffect
     * @effect Triggers order reloading based on navigation parameters or order list length.
     */
    useFocusEffect(
        useCallback((): void => {
            if (!appContext.orders || reload === true) {
                void loadOrders().then((): void => {
                    // Reset the reload parameter to false after loading orders
                    navigation.setParams({reload: false});
                });
            }
        }, [reload, appContext.orders, navigation.setParams])
    );


    /**
     * Memoized array that filters orders by their status to new orders.
     * Optimizes performance by reducing unnecessary recalculations and re-renders.
     *
     * @memo newOrders
     * @returns {OrderInterfaces.Order[]} An array of new order objects.
     */
    const newOrders: OrderInterfaces.Order[] = useMemo(() => {
        if (appContext.orders) {
            return appContext.orders.filter(
                (order: OrderInterfaces.Order): boolean => order.status_id === 100,
            );
        } else {
            return [];
        }
    }, [appContext.orders]);


    /**
     * Memoized array that filters orders by their status to packed orders.
     * Optimizes performance by reducing unnecessary recalculations and re-renders.
     *
     * @memo packedOrders
     * @returns {OrderInterfaces.Order[]} An array of packed order objects.
     */
    const packedOrders: OrderInterfaces.Order[] = useMemo(() => {
        if (appContext.orders) {
        return appContext.orders.filter(
            (order: OrderInterfaces.Order): boolean => order.status_id === 200,
        );
        } else {
            return [];
        }
    }, [appContext.orders]);


    /**
     * Memoized array that filters orders by their status to sent orders.
     * Optimizes performance by reducing unnecessary recalculations and re-renders.
     *
     * @memo sentOrders
     * @returns {OrderInterfaces.Order[]} An array of sent order objects.
     */
    const sentOrders: OrderInterfaces.Order[] = useMemo(() => {
        if (appContext.orders) {
        return appContext.orders.filter(
            (order: OrderInterfaces.Order): boolean => order.status_id === 400,
        );
        } else {
            return [];
        }
    }, [appContext.orders]);


    /**
     * Memoized array that filters orders by their status to return orders.
     * Optimizes performance by reducing unnecessary recalculations and re-renders.
     *
     * @memo returnOrders
     * @returns {OrderInterfaces.Order[]} An array of return order objects.
     */
    const returnOrders: OrderInterfaces.Order[] = useMemo(() => {
        if (appContext.orders) {
            return appContext.orders.filter((order: OrderInterfaces.Order): boolean => order.status_id === 800,
        );
        } else {
            return [];
        }
    }, [appContext.orders]);


    /**
     * Renders a list of new orders using a FlatList component.
     *
     * This component displays orders that have been marked as new (status_id of 100). It uses the
     * `newOrders` array for its data source. Each item in the list is rendered using the `renderItem`
     * function. The list supports pull-to-refresh, which triggers the `loadOrders` function to reload the
     * orders from the API.
     *
     * @component
     * @returns {React.ReactElement} A FlatList component displaying new orders.
     */
    const NewOrdersList = (): React.ReactElement => (
        <FlatList
            data={newOrders}
            keyExtractor={(item: OrderInterfaces.Order) => item.id.toString()}
            renderItem={renderItem}
            onRefresh={loadOrders}
            refreshing={appContext.isRefreshing}
            style={Style.Container.flatList}
        />
    );


    /**
     * Renders a list of packed orders using a FlatList component.
     *
     * This component displays orders that have been marked as packed (status_id of 200). It uses the
     * `packedOrders` array for its data source. Each item in the list is rendered using the `renderItem`
     * function. The list supports pull-to-refresh, which triggers the `loadOrders` function to reload the
     * orders from the API.
     *
     * @component
     * @returns {React.ReactElement} A FlatList component displaying packed orders.
     */
    const PackedOrdersList = (): React.ReactElement => (
        <FlatList
            data={packedOrders}
            keyExtractor={(item: OrderInterfaces.Order) => item.id.toString()}
            renderItem={renderItem}
            onRefresh={loadOrders}
            refreshing={appContext.isRefreshing}
            style={Style.Container.flatList}
        />
    );


    /**
     * Renders a list of sent orders using a FlatList component.
     *
     * This component displays orders that have been marked as sent (status_id of 400). It uses the
     * `sentOrders` array for its data source. Each item in the list is rendered using the `renderItem`
     * function. The list supports pull-to-refresh, which triggers the `loadOrders` function to reload the
     * orders from the API.
     *
     * @component
     * @returns {React.ReactElement} A FlatList component displaying sent orders.
     */
    const SentOrdersList = (): React.ReactElement => (
        <FlatList
            data={sentOrders}
            keyExtractor={(item: OrderInterfaces.Order) => item.id.toString()}
            renderItem={renderItem}
            onRefresh={loadOrders}
            refreshing={appContext.isRefreshing}
            style={Style.Container.flatList}
        />
    );


    /**
     * Renders a list of return orders using a FlatList component.
     *
     * This component displays orders that have been marked as returns (status_id of 800). It uses the
     * `returnOrders` array for its data source. Each item in the list is rendered using the `renderItem`
     * function. The list supports pull-to-refresh, which triggers the `loadOrders` function to reload the
     * orders from the API.
     *
     * @component
     * @returns {React.ReactElement} A FlatList component displaying return orders.
     */
    const ReturnOrdersList = (): React.ReactElement => (
        <FlatList
            data={returnOrders}
            keyExtractor={(item: OrderInterfaces.Order) => item.id.toString()}
            renderItem={renderItem}
            onRefresh={loadOrders}
            refreshing={appContext.isRefreshing}
            style={Style.Container.flatList}
        />
    );


    /**
     * Renders an individual order item as a pressable component.
     *
     * This function component takes an order item and renders it within a `Pressable` component to make
     * it interactive. The `Pressable` component changes its background color based on the press state to
     * provide visual feedback to the user. Upon pressing, it navigates to the 'Orderhanterare' screen
     * with the pressed order item as a parameter.
     *
     * @param {Object} {item} - The order item to be rendered. It is an object containing order details.
     * @returns {React.ReactElement} A pressable component representing an individual order item.
     */
    const renderItem = ({item}: object): React.ReactElement => (
        <Pressable
            key={item.id.toString()}
            style={({pressed}) => [
                Style.Button.listButton,
                {
                    backgroundColor: pressed
                        ? Style.Color.schemeOne.primary[200]
                        : Style.Color.schemeOne.primary[300],
                },
            ]}
            onPress={(): void => {
                navigation.navigate('Orderhanterare', {item: item, reload: true});
            }}>
            <OrderListItem item={item}/>
        </Pressable>
    );


    /**
     * Maps each tab to its corresponding component for rendering.
     *
     * This constant utilizes the `SceneMap` function from `react-native-tab-view` to map each tab
     * identified by a key to its respective component. The keys 'first', 'second', 'third', and 'fourth'
     * correspond to tabs for new orders, packed orders, sent orders, and return orders, respectively.
     * Each key is associated with a component that renders a list of orders based on their status.
     *
     * - 'first' maps to `NewOrdersList`, which renders a list of new orders.
     * - 'second' maps to `PackedOrdersList`, which renders a list of packed orders.
     * - 'third' maps to `SentOrdersList`, which renders a list of sent orders.
     * - 'fourth' maps to `ReturnOrdersList`, which renders a list of return orders.
     *
     * This mapping is used by the `TabView` component to render the appropriate list based on the
     * selected tab.
     */
    const renderScene = SceneMap({
        first: NewOrdersList,
        second: PackedOrdersList,
        third: SentOrdersList,
        fourth: ReturnOrdersList,
    });


    /**
     * Customizes the tab bar for the TabView component.
     *
     * This function component renders a custom tab bar for the `TabView` component using the `TabBar` from
     * `react-native-tab-view`. It customizes the appearance of the tab bar and its items, including the
     * indicator and label styles, based on the application's color scheme and typography settings.
     *
     * The tab bar's indicator style and the tab label's style change dynamically based on whether the
     * tab is focused, providing visual feedback to the user. Icons for each tab are rendered using the
     * `FontAwesome5` component, with their appearance also changing based on the tab's focus state.
     *
     * @param {Object} props - The props passed to the `TabBar` component.
     * @returns {React.ReactElement} A `TabBar` component with customized styling and behavior.
     */
    const renderTabBar = (props: object): React.ReactElement => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: Style.Color.schemeOne.secondary[300],
            }}
            style={{
                backgroundColor: Style.Color.background.light,
                color: Style.Color.text.dark,
            }}
            renderIcon={({route, focused}) => (
                <FontAwesome5
                    name={route.icon}
                    size={18}
                    color={
                        focused
                            ? Style.Color.schemeOne.secondary[300]
                            : Style.Color.text.dark
                    }
                />
            )}
            renderLabel={({route, focused}) => (
                <Text
                    style={{
                        color: focused
                            ? Style.Color.schemeOne.secondary[300]
                            : Style.Color.text.dark,
                        fontWeight: Style.Typography.fontWeight.btn,
                        fontFamily: Style.Typography.fontFamily.btn,
                    }}>
                    {route.title}
                </Text>
            )}
        />
    );


    // Render LoadingIndicator if state is Refreshing else FlatList Component.
    return appContext.isRefreshing ? (
        <View style={Style.Container.content}>
            <LoadingIndicator loadingType={'Ordrar'}/>
        </View>
    ) : (
        <TabView
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            initialLayout={{width: 1000}}
            style={Style.Form.TabBarStyles.tabBar}
        />
    );
};
