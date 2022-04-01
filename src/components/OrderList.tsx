import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import OrderItem from "./OrderItem";
import config from '../config/config.json';
// import {theme} from '../assets/themes/theme';


/**
 * OrdersList object to fetch order list from API and generate a FlatList View from response JSON object.
 *
 * @param navigation
 * @constructor
 */
const OrdersList = ({navigation}) => {
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

    return (
        <View>
            <FlatList
                // style={}
                data={orders}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <OrderItem order={item} navigation={navigation}/>
                )} />
        </View>
    );
}

// const styles = StyleSheet.create({});

/**
 * Module exports.
 */
export default OrdersList;
