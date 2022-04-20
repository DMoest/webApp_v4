import React, {useEffect} from 'react';
import {View, FlatList, Pressable} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {OrderListItem} from "./OrderListItem";
import * as Style from '../../assets/styles';
import * as OrderModel from "../../models/Orders";


/**
 * OrdersList object to fetch order list from API and generate a FlatList View from response JSON object.
 * Before the FlatList is generated orders are filtered to only show the new once.
 *
 * @constructor
 */
export const OrderList = (props) => {
    useEffect(async () => {
        props.setOrders(await OrderModel.getOrders());
    }, [props.orders]);

    let newOrders = props.orders.filter(order => order.status == 'Ny');
    const navigation = useNavigation();

    /**
     * Render item function.
     *
     * @param item
     */
    const renderItem = ({item}) => (
        <Pressable
            key={item.id}
            style={Style.Button.buttonContainer}
            onPress={() => {
                navigation.navigate('Plocklista', {item})
            }} >

            <OrderListItem item={item} />
        </Pressable>
    );

    return (
        <View>
            <FlatList
                style={Style.Container.flatList}
                data={newOrders}
                // keyExtractor={item => item.id}
                renderItem={renderItem} />
        </View>
    );
}
