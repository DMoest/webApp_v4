import React, { useEffect } from 'react';
// eslint-disable-next-line import/namespace
import { View, FlatList, Pressable, Text } from 'react-native';
import { DeliveryListItem } from './DeliveryListItem';
import * as DeliveryModel from '../../models/Deliveries';
import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles';
import { useNavigation } from '@react-navigation/native';
// import { buttonSecondary, buttonSTD } from '../../assets/styles/buttons';

/**
 * DeliveryList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @constructor
 */
export const DeliveryList: React.FC = (props) => {
    const navigation = useNavigation();

    useEffect(async () => {
        props.setDeliveries(await DeliveryModel.getDeliveries());
        props.setProducts(await ProductModel.getProducts());
    }, []);

    /**
     * Render item function.
     *
     * @param item
     */
    const renderItem = ({ item }) => (
        <Pressable
            key={item.id}
            onPress={() => {
                navigation.navigate('Inleveransspecifikation', { item });
            }}
            style={Style.Button.buttonContainer}>
            <DeliveryListItem item={item} />
        </Pressable>
    );

    return (
        <View>
            <Pressable
                style={Style.Button.buttonSTD}
                onPress={() => {
                    navigation.navigate('Inleverasformulär', {
                        products: props.products,
                        // setProducts: props.setProducts,
                    });
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </Pressable>

            <FlatList
                style={Style.Container.flatList}
                data={props.deliveries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};
