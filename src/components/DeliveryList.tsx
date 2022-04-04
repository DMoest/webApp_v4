import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, RefreshControl, TouchableOpacity} from 'react-native';
import {DeliveryListItem} from "./DeliveryListItem";
import config from '../config/config.json';
import {StockListItem} from "./StockListItem";
import {theme} from "../assets/themes/theme";
// import {theme} from '../assets/themes/theme';


/**DeliveryeliveryList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @param navigation
 * @constructor
 */
export const DeliveryList = ({route, navigation}) => {
    const [deliveries, setDeliveries] = useState([]);

    /**
     * Asynchronous function to handle fetch request to API.
     *
     * First, fetch from API.
     * Second, from response promise make data into JSON object.
     * Last, set result data into a state.
     */
    const handleFetchDeliveries = useCallback(async () => {
        await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setDeliveries(result.data));
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
                navigation.navigate('Leverans', {item})
            }} >
            <DeliveryListItem delivery={item}/>
        </TouchableOpacity>
    );

    /**
     * useEffect triggers the handle function to fetch all deliveries.
     */
    useEffect(() => {
        handleFetchDeliveries();
    }, []);

    return (
        <View>
            <FlatList
                // style={}
                data={deliveries}
                keyExtractor={item => item.id}
                renderItem={renderItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        alignSelf: 'center',
        width: '95%',
        shadowColor: theme.Colors.shadows,
        shadowOffset: theme.Abstracts.btnOffset,
        shadowOpacity: theme.Abstracts.btnOpacity,
        shadowRadius: theme.Abstracts.btnRadius,
        elevation: theme.Abstracts.btnElevation,
    },
});
