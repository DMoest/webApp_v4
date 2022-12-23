/**
 * Module imports.
 */
import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppContext} from '../../context/App.provider';
import {ProductListItem} from './ProductListItem';
import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles';
import {LoadingIndicator} from '../Utils/LoadingIndicator';

/**
 * ProductList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @constructor
 */
export const ProductList: React.FC = () => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    let reload = route.params?.reload ?? false;

    /**
     * Hook useEffect to reload products.
     */
    useEffect(() => {
        if (reload === true) {
            console.log(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `*> Route ${route.name} ~> useEffect HOOK RELOAD ~> ${reload}`,
            );

            void loadProducts().then(() => {
                // Set RELOAD to false.
                // eslint-disable-next-line react-hooks/exhaustive-deps
                reload = false;

                // Set isRefreshing to false.
                appContext.setIsRefreshing(false);
            });
        } else {
            // Set isRefreshing to false to remove Loading View.
            appContext.setIsRefreshing(false);
        }
    }, [reload]);

    async function loadProducts() {
        console.log(`Route: ${route.name} ~> loadProducts()`);
        appContext.setIsRefreshing(true);

        try {
            appContext.setProducts(await ProductModel.getProducts());
        } catch (error) {
            console.warn(error);
        } finally {
            appContext.setIsRefreshing(false);
        }
    }

    /**
     * Render item function.
     *
     * @param item
     */
    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={Style.Button.buttonContainer}
            onPress={() => {
                navigation.navigate('Produktspecifikation', { item });
            }}>
            <ProductListItem item={item} />
        </TouchableOpacity>
    );

    // Render Loading View.
    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Produkter'} />
    ) : (
        // Render FlatList Products View.
        <FlatList
            style={Style.Container.flatList}
            data={appContext.products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            refreshing={appContext.isRefreshing} // Refreshing indicator
            onRefresh={loadProducts} // Refreshing function
        />
    );
};
