import React, {useEffect} from 'react'; // eslint-disable-next-line import/namespace
import {useAppContext} from '../../context/App.provider';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {DeliveryListItem} from './DeliveryListItem';
import {LoadingIndicator} from '../Utils/LoadingIndicator';
import * as DeliveriesInterfaces from '../../interfaces/Deliveries';
import * as DeliveryModel from '../../models/Deliveries';
import * as Style from '../../assets/styles';

/**
 * DeliveryList object to fetch item list from API and generate a FlatList View from response JSON object.
 *
 * @constructor
 */
export const DeliveryList: React.FC = () => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    let reload = route.params?.reload ?? true;

    /**
     * React Hook to load deliveries and products.
     */
    useEffect(() => {
        if (reload === true) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            console.log(
                `*> Route ${route.name} ~> useEffect HOOK RELOAD ~> ${reload}`,
            );

            void loadDeliveries().then(() => {
                // Set RELOAD to false.
                reload = false;

                // Set isRefreshing to false.
                appContext.setIsRefreshing(false);
            });
        } else {
            appContext.setIsRefreshing(false);
        }
    }, [reload]);

    async function loadDeliveries() {
        console.log(`Route: ${route.name} ~> loadDeliveries()`);
        appContext.setIsRefreshing(true);

        try {
            appContext.setDeliveries(await DeliveryModel.getDeliveries());
        } catch (error) {
            console.warn(error);
        } finally {
            appContext.setIsRefreshing(false);
        }
    }

    /**
     * Renders Delivery item in a FlatList.
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
                    refreshing={appContext.isRefreshing}
                    onRefresh={loadDeliveries}
                />
            );
        }
    };

    return appContext.isRefreshing ? (
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

            <LoadingIndicator loadingType={'Leveranser'} />
        </View>
    ) : appContext.deliveries.length > 0 ? (
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
            <FlatList
                style={Style.Container.flatList}
                data={appContext.deliveries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshing={appContext.isRefreshing}
                onRefresh={loadDeliveries}
            />
        </View>
    ) : (
        <>
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
            <View style={Style.Container.warningFlashMessageContainer}>
                <Text style={Style.Typography.warningFlashMessageText}>
                    Det finns inte några inleveranser...
                </Text>
            </View>
        </>
    );
};
