import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import StockListItem from "./StockListItem";
import config from '../config/config.json';
// import {theme} from '../assets/themes/theme';


/**
 * StockList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @param navigation
 * @constructor
 */
const StockList = ({navigation}) => {
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

    return (
        <View>
            <FlatList
                // style={}
                data={products}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <StockListItem item={item} navigation={navigation}/>
                )} />
        </View>
    );
}

// const styles = StyleSheet.create({});

/**
 * Module exports.
 */
export default StockList;
