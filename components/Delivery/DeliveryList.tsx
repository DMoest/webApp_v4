/**
 * Module imports.
 */
import React, { useEffect } from 'react';
// eslint-disable-next-line import/namespace
import { View, FlatList, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DeliveryListItem } from './DeliveryListItem';
import * as DeliveriesInterfaces from '../../interfaces/Deliveries';
import * as DeliveryModel from '../../models/Deliveries';
import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles';

/**
 * DeliveryList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @constructor
 */
export const DeliveryList: React.FC = (props) => {
    const navigation = useNavigation();
    const setProducts = props.setProducts;
    const setDeliveries = props.setDeliveries;

    /**
     * Use Effect Hook to set state of products and deliveries.
     */
    useEffect(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setDeliveries(await DeliveryModel.getDeliveries());

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setProducts(await ProductModel.getProducts());
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

    const renderDeliveriesList = (
        deliveries: Partial<DeliveriesInterfaces.Deliveries>,
    ) => {
        if (props.deliveries.length < 1) {
            return (
                <View style={Style.Container.warningFlashMessageContainer}>
                    <Text style={Style.Typography.warningFlashMessageText}>
                        Det finns inte några inleveranser...
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    style={Style.Container.flatList}
                    data={deliveries}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            );
        }
    };

    return (
        <View>
            <Pressable
                style={Style.Button.buttonSTD}
                onPress={() => {
                    navigation.navigate('Inleverasformulär', {
                        products: props.products,
                        deliveries: props.deliveries,
                        setDeliveries: props.setDeliveries,
                    });
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </Pressable>

            {renderDeliveriesList(props.deliveries)}
        </View>
    );
};
