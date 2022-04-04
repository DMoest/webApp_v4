import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {DeliveryListItem} from "./DeliveryListItem";
import config from '../config/config.json';
// import {theme} from '../assets/themes/theme';


/**DeliveryeliveryList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @param navigation
 * @constructor
 */
export const DeliveryList = ({navigation}) => {
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
                renderItem={({item}) => (
                    <DeliveryListItem delivery={item}
                                      navigation={navigation}/>

                )} />
        </View>
    );
}

// const styles = StyleSheet.create({});
