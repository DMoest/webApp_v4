import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {StockListItem} from "./StockListItem";
import config from '../config/config.json';
import * as Style from "../assets/styles/index";
import {theme} from "../assets/styles/theme";


/**
 * StockList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @param navigation
 * @constructor
 */
export const StockList = ({route, navigation}) => {
    // const Stack = createStackNavigator();
    const [products, setProducts] = useState([]);

    /**
     * Asynchronous function to handle fetch request to API.
     *
     * First, fetch from API.
     * Second, from response promise make data into JSON object.
     * Last, set result data into a state.
     */
    const handleFetchProducts = useCallback(async () => {
        await fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    /**
     * useEffect triggers the handle function to fetch all products.
     */
    useEffect(() => {
        handleFetchProducts();
    }, []);

    /**
     * Render item function.
     *
     * @param item
     * @param navigation
     */
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={Style.Button.buttonContainer}
            onPress={() => {
                navigation.navigate('Produkt', {item: item})
            }} >
            <StockListItem item={item}/>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                style={Style.Container.flatList}
                data={products}
                keyExtractor={item => item.id}
                renderItem={renderItem} />
        </View>
    );
}
