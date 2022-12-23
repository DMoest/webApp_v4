/**
 * Module imports.
 */
import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppContext} from '../../context/App.provider';
import {LoadingIndicator} from '../Utils/LoadingIndicator';
import {OrderListItem} from './OrderListItem';
import * as OrderModel from '../../models/Orders';
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
    let reload = route.params?.reload ?? false;

    /**
     * React Hook to reload orders.
     */
    useEffect(() => {
        if (reload === true) {
            console.log(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `*> Route ${route.name} ~> useEffect HOOK RELOAD ~> ${reload}`,
            );

            void loadOrders().then(() => {
                // Set RELOAD to false.
                // eslint-disable-next-line react-hooks/exhaustive-deps
                reload = false;

                // Set isRefreshing to false.
                appContext.setIsRefreshing(false);
            });
        } else {
            // Set isRefreshing to false to remove Loading View.
            appContext.setIsRefreshing(false);
        }
    }, [reload]);

    /**
     * Function to fetch orders from API.
     */
    async function loadOrders() {
        console.log(`Route: ${route.name} ~> loadOrders()`);
        appContext.setIsRefreshing(true);

        try {
            appContext.setOrders(await OrderModel.getOrders());
        } catch (error) {
            console.warn(error);
        } finally {
            appContext.setIsRefreshing(false);
        }
    }

    /**
     * Filter Orders to only show new once.
     */
    const newOrders = appContext.orders.filter((order) => order.status == 'Ny');

    /**
     * Render item function.
     *
     * @param item
     */
    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id.toString()}
            style={Style.Button.buttonContainer}
            onPress={() => {
                navigation.navigate('Plocklista', { item });
            }}>
            <OrderListItem item={item} />
        </TouchableOpacity>
    );

    // Render LoadingIndicator if state is Refreshing else FlatList Component.
    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Produkter'} />
    ) : (
        <FlatList
            style={Style.Container.flatList}
            data={newOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            refreshing={appContext.isRefreshing}
            onRefresh={loadOrders}
        />
    );
};
