/**
 * Module imports.
 */
import React, { useEffect } from 'react';
// eslint-disable-next-line import/namespace
import { FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OrderListItem } from './OrderListItem';
import * as OrderModel from '../../models/Orders';
import * as Style from '../../assets/styles';

/**
 * OrdersList object to fetch order list from API and generate a FlatList View from response JSON object.
 * Before the FlatList is generated orders are filtered to only show the new once.
 *
 * @constructor
 */
export const OrderList = (props) => {
    /**
     * Navigation constant.
     */
    const navigation = useNavigation();

    /**
     * React Hook.
     */
    useEffect(async () => {
        props.setOrders(await OrderModel.getOrders());
    }, []);

    /**
     * Filter Orders to only show new once.
     */
    const newOrders = props.orders.filter((order) => order.status == 'Ny');

    /**
     * Render item function.
     *
     * @param item
     */
    const renderItem = ({ item }) => (
        <Pressable
            key={item.id}
            style={Style.Button.buttonContainer}
            onPress={() => {
                navigation.navigate('Plocklista', { item });
            }}>
            <OrderListItem item={item} />
        </Pressable>
    );

    return (
        <FlatList
            style={Style.Container.flatList}
            data={newOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    );
};
