/**
 * Module imports.
 */
import React, { useEffect } from 'react';
// eslint-disable-next-line import/namespace
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../context/App.provider';
import { DeliveryListItem } from './DeliveryListItem';
import * as DeliveriesInterfaces from '../../interfaces/Deliveries';
import * as DeliveryModel from '../../models/Deliveries';
// import * as ProductModel from '../../models/Products';
import * as Style from '../../assets/styles';

/**
 * DeliveryList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @constructor
 */
export const DeliveryList: React.FC = ({ route }) => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    let reload = route.params?.reload ?? false;

    /**
     * Function to fetch deliveries from API.
     */
    async function loadDeliveries() {
        appContext.setDeliveries(await DeliveryModel.getDeliveries());
    }

    // /**
    //  * Function to fetch products from API.
    //  */
    // async function loadProducts() {
    //     appContext.setProducts(await ProductModel.getProducts());
    // }

    /**
     * If reload is true fetch orders from API.
     */
    if (reload) {
        void loadDeliveries().then(() => {
            reload = false;
        });
    }

    /**
     * React Hook to load deliveries and products.
     */
    useEffect(() => {
        void loadDeliveries().then(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            reload = false;
        });
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
                key={'newdeliverybtn'}
                style={Style.Button.buttonSTD}
                onPress={() => {
                    navigation.navigate('Inleverasformulär');
                }}>
                <Text style={Style.Typography.buttonText}>
                    Skapa Ny Inleverans
                </Text>
            </TouchableOpacity>

            {renderDeliveriesList(appContext.deliveries)}
        </View>
    );
};
