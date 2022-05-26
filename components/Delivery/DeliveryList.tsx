/**
 * Module imports.
 */
import React, { useEffect } from 'react';
// eslint-disable-next-line import/namespace
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../providers/App.provider';
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
export const DeliveryList: React.FC = () => {
    const appContext = useAppContext();
    const navigation = useNavigation();

    /**
     * Use Effect Hook to set state of products and deliveries.
     */
    useEffect(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        appContext.setDeliveries(await DeliveryModel.getDeliveries());

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        appContext.setProducts(await ProductModel.getProducts());
    }, []);

    /**
     * Render item function.
     *
     * @param item
     */
    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            onPress={() => {
                navigation.navigate('Inleveransspecifikation', { item });
            }}
            style={Style.Button.buttonContainer}>
            <DeliveryListItem item={item} />
        </TouchableOpacity>
    );

    const renderDeliveriesList = (
        deliveries: Partial<DeliveriesInterfaces.Deliveries>,
    ) => {
        if (appContext.deliveries.length < 1) {
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
            <TouchableOpacity
                style={Style.Button.buttonSTD}
                onPress={() => {
                    navigation.navigate('Inleverasformulär', {
                        products: appContext.products,
                        deliveries: appContext.deliveries,
                        setDeliveries: appContext.setDeliveries,
                    });
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </TouchableOpacity>

            {renderDeliveriesList(appContext.deliveries)}
        </View>
    );
};
