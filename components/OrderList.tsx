import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {OrderListItem} from "./OrderListItem";
import config from '../config/config.json';
import * as Style from '../assets/styles/index';


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
            key={item.id}
            style={Style.Button.buttonContainer}
            onPress={() => {
                navigation.navigate('OrderDetails', {item})
            }} >
            <OrderListItem item={item} />
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                style={Style.Container.flatList}
                data={orders}
                keyExtractor={item => item.id}
                renderItem={renderItem} />
        </View>
    );
}
