import React, {useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
// import config from '../config/config.json';
import {StockListItem} from "./StockListItem";
import * as ProductModel from '../models/Products';
import * as Style from "../assets/styles/index";


/**
 * StockList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @param route
 * @param navigation
 * @param products
 * @param setProducts
 * @constructor
 */
export const StockList = ({navigation, products, setProducts}) => {
    useEffect(async () => {
        setProducts(await ProductModel.getProducts());
    }, []);

    /**
     * Render item function.
     *
     * @param item
     * @param navigation
     */
    const renderItem = ({navigation, item}) => (
        <TouchableOpacity
            key={item.id}
            style={Style.Button.buttonContainer}
            onPress={() => {navigation.navigate('ProduktDetaljer', {item})}}>

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
