/**
 * Module imports.
 */
import React, { useEffect } from 'react';
// eslint-disable-next-line import/namespace
import { Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StockListItem } from './StockListItem';
import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles';

/**
 * StockList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @constructor
 */
export const StockList = (props) => {
    useEffect(async () => {
        props.setProducts(await ProductModel.getProducts());
    }, []);

    /**
     * Navigation constant.
     */
    const navigation = useNavigation();

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
                navigation.navigate('Produktspecifikation', { item });
            }}>
            <StockListItem item={item} />
        </Pressable>
    );

    return (
        <FlatList
            style={Style.Container.flatList}
            data={props.products}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    );
};
