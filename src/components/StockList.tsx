import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import StockListItem from "./StockListItem";
import config from '../config/config.json';
import {createStackNavigator} from "@react-navigation/stack";
import {Screen} from "react-native-screens";
import {NavigationContainer} from "@react-navigation/native";
import {theme} from "../assets/themes/theme";
// import {theme} from '../assets/themes/theme';


/**
 * StockList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @param navigation
 * @constructor
 */
const StockList = ({route, navigation}) => {
    // const Stack = createStackNavigator();
    const [products, setProducts] = useState([]);

    const thisThing = route.params

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
     * Render item function.
     *
     * @param item
     * @param navigation
     */
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
                navigation.navigate('Produkt', {item: item})
            }} >
            <StockListItem item={item}/>
        </TouchableOpacity>
    );

    /**
     * useEffect triggers the handle function to fetch all products.
     */
    useEffect(() => {
        handleFetchProducts();
    }, []);

    return (
        <View>
            <FlatList
                style={styles.list}
                data={products}
                keyExtractor={item => item.id}
                renderItem={renderItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: theme.Colors.white,
    },
    btnContainer: {
        width: '95%',
        alignSelf: 'center',
        shadowColor: theme.Colors.shadows,
        shadowOffset: theme.Abstracts.btnOffset,
        shadowOpacity: theme.Abstracts.btnOpacity,
        shadowRadius: theme.Abstracts.btnRadius,
        elevation: theme.Abstracts.btnElevation,
    },
});

/**
 * Module exports.
 */
export default StockList;
