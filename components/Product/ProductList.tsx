/**
 * Module imports.
 */
import React, {useEffect} from 'react';
// eslint-disable-next-line import/namespace
import {FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../context/App.provider';
import {ProductListItem} from './ProductListItem';
import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles';
import AppLoading from "expo-app-loading";

/**
 * ProductList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @constructor
 */
export const ProductList = () => {
    const appContext = useAppContext();
    const navigation = useNavigation();

    /**
     * Hook to load products.
     */
    useEffect(() => {
        const loadProductsList = async () => {
            appContext.setProducts(await ProductModel.getProducts());
        };

        loadProductsList();
    }, []);

    /**
     * Render item function.
     *
     * @param item
     */
    const renderItem = ({item}) => (
        <TouchableOpacity
            key={item.id}
            style={Style.Button.buttonContainer}
            onPress={() => {
                navigation.navigate('Produktspecifikation', {item});
            }}>
            <ProductListItem item={item}/>
        </TouchableOpacity>
    );

    if (appContext.isLoading) {
        return <AppLoading/>;
    }

    return (
        <FlatList
            style={Style.Container.flatList}
            data={appContext.products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    );
};
