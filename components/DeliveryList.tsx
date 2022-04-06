import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {DeliveryListItem} from "./DeliveryListItem";
import config from '../config/config.json';
import * as Style from "../assets/styles";


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
            style={Style.Button.buttonContainer}
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
                style={Style.Container.flatList}
                data={deliveries}
                keyExtractor={item => item.id}
                renderItem={renderItem} />
        </View>
    );
}
