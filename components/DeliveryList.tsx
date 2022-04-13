import React, {useEffect} from 'react';
import {View, FlatList, TouchableOpacity, Pressable} from 'react-native';
// import config from '../config/config.json';
import {DeliveryListItem} from "./DeliveryListItem";
import * as DeliveryModel from "../models/Deliveries";
import * as Style from "../assets/styles";


/**
 * DeliveryList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @param navigation
 * @constructor
 */
export const DeliveryList: React.FC = ({route, navigation, deliveries, setDeliveries}) => {
    useEffect(async () => {
        setDeliveries(await DeliveryModel.getDeliveries());
    }, []);

    /**
     * Render item function.
     *
     * @param item
     * @param navigation
     */
    const renderItem = ({item}) => (
        // <TouchableOpacity
        //     key={item.id}
        //     style={Style.Button.buttonContainer}
        //     onPress={() => {navigation.navigate('Leveransdetaljer', {item})}}>
        //
        //     <DeliveryListItem item={item}/>
        // </TouchableOpacity>

        <Pressable
            key={item.id}
            onPress={() => {navigation.navigate('Leveransdetaljer', {item})}}
            style={Style.Button.buttonContainer}>

            <DeliveryListItem item={item} route={route}/>
        </Pressable>
    );

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
