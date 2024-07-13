/**
 * Module imports.
 */
import React, {useEffect, useMemo, useState} from 'react';
import {
    FlatList,
    Text,
    Pressable,
    View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {FontAwesome5} from '@expo/vector-icons';
import {useAppContext} from '../../context/App.provider';
import {OrderListItem} from './OrderListItem';
import {LoadingIndicator} from '../Utils/LoadingIndicator';
import * as OrderModel from '../../models/Orders';
import * as OrderInterfaces from '../../interfaces/Order';
import * as Style from '../../assets/styles';


/**
 * OrdersList object to fetch order list from API and generate a FlatList View from response JSON object.
 * Before the FlatList is generated orders are filtered to only show the new once.
 *
 * @constructor
 */
export const OrderList: React.FC = () => {
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

    let reload = route.params?.reload ?? false;

    const loadOrders = async () => {
        appContext.setIsRefreshing(true);

        try {
            appContext.setOrders(await OrderModel.getOrders());

            return appContext.orders;
        } catch (error) {
            console.error(error);
        } finally {
            reload = false;
            appContext.setIsRefreshing(false);
        }
    };

    /**
     * React Hook to reload orders.
     */
    useEffect((): void => {
        /**
         * Function to fetch orders from API.
         */
        // const loadOrders = async () => {
        //     appContext.setIsRefreshing(true);
        //
        //     try {
        //         appContext.setOrders(await OrderModel.getOrders());
        //         appContext.setPackedOrders(
        //             appContext.orders.filter(
        //                 (order: OrderInterfaces.Order) =>
        //                     order.status === 'Packed' &&
        //                     order.status_id === 200 &&
        //                     order.order_items.length > 0,
        //             ),
        //         );
        //
        //         return appContext.orders;
        //     } catch (error) {
        //         console.error(error);
        //     } finally {
        //         reload = false;
        //         appContext.setIsRefreshing(false);
        //     }
        // };

        void loadOrders();
    }, []);

    /**
     * Filter Orders to only show new once.
     */
    const newOrders: OrderInterfaces.Order[] = useMemo(() => {
        return appContext.orders.filter(
            (order: OrderInterfaces.Order): boolean => order.status_id === 100,
        );
    }, [appContext.orders]);

    /**
     * Filter Orders to only show packed once.
     */
    const packedOrders: OrderInterfaces.Order[] = useMemo(() => {
        return appContext.orders.filter(
            (order: OrderInterfaces.Order): boolean => order.status_id === 200,
        );
    }, [appContext.orders]);

    /**
     * Filter Orders to only show sent once.
     */
    const sentOrders: OrderInterfaces.Order[] = useMemo(() => {
        return appContext.orders.filter(
            (order: OrderInterfaces.Order): boolean => order.status_id === 400,
        );
    }, [appContext.orders]);

    /**
     * Filter Orders to only show return once.
     */
    const returnOrders: OrderInterfaces.Order[] = useMemo(() => {
        return appContext.orders.filter(
            (order: OrderInterfaces.Order): boolean => order.status_id === 800,
        );
    }, [appContext.orders]);

    const NewOrdersList = () => (
        <FlatList
            data={newOrders}
            keyExtractor={(item: OrderInterfaces.Order) => item.id.toString()}
            renderItem={renderItem}
            onRefresh={loadOrders}
            refreshing={appContext.isRefreshing}
            style={Style.Container.flatList}
        />
    );
    const PackedOrdersList = () => (
        <FlatList
            data={packedOrders}
            keyExtractor={(item: OrderInterfaces.Order) => item.id.toString()}
            renderItem={renderItem}
            onRefresh={loadOrders}
            refreshing={appContext.isRefreshing}
            style={Style.Container.flatList}
        />
    );
    const SentOrdersList = () => (
        <FlatList
            data={sentOrders}
            keyExtractor={(item: OrderInterfaces.Order) => item.id.toString()}
            renderItem={renderItem}
            onRefresh={loadOrders}
            refreshing={appContext.isRefreshing}
            style={Style.Container.flatList}
        />
    );
    const ReturnOrdersList = () => (
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
     * Render item function.
     *
     * @param item
     */
    const renderItem = ({item}) => (
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
                navigation.navigate('Plocklista', {item});
            }}>
            <OrderListItem item={item}/>
        </Pressable>
    );

    const renderScene = SceneMap({
        first: NewOrdersList,
        second: PackedOrdersList,
        third: SentOrdersList,
        fourth: ReturnOrdersList,
    });

    const renderTabBar = (props) => (
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
