/**
 * Module imports.
 */
import React, {useEffect} from 'react';
import {FlatList, Pressable} from 'react-native';
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
export const ProductList: React.FC = (): React.JSX.Element => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    let reload = route.params?.reload ?? false;

    /**
     * Hook useEffect to reload products.
     */
    useEffect((): void => {
        void loadProducts().then(() => {
            // Set RELOAD to false.
            reload = false;

            // Set isRefreshing to false.
            appContext.setIsRefreshing(false);
        });
    }, []);

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
    const renderItem = ({item}) => (
        <Pressable
            key={item.id}
            onPress={(): void => {
                navigation.navigate('Produktspecifikation', {item});
            }}
            style={({pressed}) => [
                Style.Button.listButton,
                {
                    backgroundColor: pressed
                        ? Style.Color.schemeOne.primary[200]
                        : Style.Button.listButton.backgroundColor,
                },
            ]}>
            <ProductListItem item={item}/>
        </Pressable>
    );


    return appContext.isRefreshing ? (
        <LoadingIndicator loadingType={'Produkter'}/>
    ) : (
        <FlatList
            data={appContext.products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            refreshing={appContext.isRefreshing}
            onRefresh={loadProducts}
            style={Style.Container.flatList}
        />
    );
};
