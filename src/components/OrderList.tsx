import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {OrderListItem} from "./OrderListItem";
import config from '../config/config.json';
// import {StockListItem} from "./StockListItem";
import {theme} from "../assets/themes/theme";
// import {theme} from '../assets/themes/theme';


/**
 * OrdersList object to fetch order list from API and generate a FlatList View from response JSON object.
 *
 * @param navigation
 * @constructor
 */
export const OrderList = ({route, navigation}) => {
    const [orders, setOrders] = useState([]);

    /**
     * Asynchronous function to handle fetch request to API.
     *
     * First, fetch from API.
     * Second, from response promise make data into JSON object.
     * Last, set result data into a state.
     */
    const handleFetchOrders = useCallback(async () => {
        await fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setOrders(result.data));
    }, []);

    /**
     * useEffect triggers the handle function to fetch all orders.
     */
    useEffect(() => {
        handleFetchOrders();
    }, []);

    /**
     * Render item function.
     *
     * @param item
     * @param navigation
     */
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
                navigation.navigate('Order', {item})
            }} >
            <OrderListItem item={item} />
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                style={{backgroundColor: theme.Colors.white}}
                data={orders}
                keyExtractor={item => item.id}
                renderItem={renderItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        width: '95%',
        alignSelf: 'center',
        marginHorizontal: theme.Typography.whiteSpace75,
        shadowColor: theme.Colors.shadows,
        shadowOffset: theme.Abstracts.btnOffset,
        shadowOpacity: theme.Abstracts.btnOpacity,
        shadowRadius: theme.Abstracts.btnRadius,
        elevation: theme.Abstracts.btnElevation,
    },
});
