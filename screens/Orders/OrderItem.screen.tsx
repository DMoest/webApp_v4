/**
 * @module OrderItem
 *
 * This module provides a detailed view of a specific order. It includes information about the order such as
 * order ID, status, customer name, address, postal code, and city. It also displays a map with markers for
 * the user's current location and the order location if available. The module allows the user to pack the
 * order, send the order, or shows relevant status messages based on the order status.
 *
 * @requires react
 * @requires react-native
 * @requires @react-navigation/native
 * @requires react-native-maps
 * @requires expo-status-bar
 * @requires ../../context/App.provider
 * @requires ../../interfaces/Order
 * @requires ../../models/Orders
 * @requires ../../interfaces/Product
 * @requires ../../models/Products
 * @requires ../../assets/styles
 * @requires @expo/vector-icons
 * @requires ../../models/Nominatim
 * @requires expo-location
 * @requires react-native-flash-message
 */
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import {
    useFocusEffect,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../../context/App.provider';
import { showMessage } from 'react-native-flash-message';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { FontAwesome5 } from '@expo/vector-icons';
import * as OrderInterfaces from '../../interfaces/Order';
import * as OrderModel from '../../models/Orders';
import * as ProductInterfaces from '../../interfaces/Product';
import * as ProductModel from '../../models/Products';
import * as NominatimModel from '../../models/Nominatim';
import * as Style from '../../assets/styles';

import * as APP_CONFIG from '../../config/config.json';

/**
 * Function to check product stock.
 *
 * This function checks the stock status of a product in an order. It returns a React element that displays
 * the product's stock status based on the stock level vs. order amount. The stock status is indicated by
 * different colors and messages.
 *
 * @param {OrderInterfaces.OrderItem} orderItem - The order item to check the stock status for.
 * @returns {React.ReactElement} A React element displaying the product's stock status.
 */
function productStockStatus(
    orderItem: OrderInterfaces.OrderItem,
): React.ReactElement {
    const stockIndicatorElement: React.JSX.Element = useMemo(() => {
        let computedData: OrderInterfaces.OrderStockIndicatorElement = {
            color: '',
            icon: 'boxes',
            text: '',
        };

        // Set the product stock status text and indication color from the stock level vs. order amount.
        if (orderItem.amount <= orderItem.stock - 10) {
            computedData.color = Style.Color.indicator.positive[300];
            computedData.text = `Produkten ${orderItem.name} finns i lager.`;
        } else if (
            orderItem.amount > orderItem.stock - 10 &&
            orderItem.amount <= orderItem.stock
        ) {
            computedData.color = Style.Color.indicator.caution[300];
            computedData.text = `Produkten ${orderItem.name} finns i lager men saldot är lågt.`;
        } else {
            computedData.color = Style.Color.indicator.warning[300];
            computedData.text = `Produkten ${orderItem.name} saknar täckning för ordern i lagersaldot (${orderItem.stock}).`;
        }

        return (
            <View style={Style.Container.grid.row}>
                <View style={Style.Container.grid.col[1]}>
                    <Text> </Text>
                </View>

                <View style={Style.Container.grid.col[7]}>
                    <View style={Style.Container.grid.row}>
                        <FontAwesome5
                            name={computedData.icon}
                            size={20}
                            color={computedData.color}
                            style={Style.Container.grid.col[1]}
                        />

                        <Text
                            style={{
                                fontStyle: 'italic',
                                fontSize: Style.Typography.fontSize.text,
                                color: computedData.color,
                            }}>
                            {computedData.text}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }, [orderItem.stock, orderItem.amount]);

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: Style.Typography.whiteSpace[100],
                justifyContent: 'space-between',
            }}>
            {stockIndicatorElement}
        </View>
    );
}

/**
 * OrderItem screen/view.
 *
 * This component displays a detailed view of a specific order. It includes information about the order
 * such as order ID, status, customer name, address, postal code, and city. It also displays a map with
 * markers for the user's current location and the order location if available. The component allows the
 * user to pack the order, send the order, or shows relevant status messages based on the order status.
 *
 * @param {OrderInterfaces.OrderItemProps} props - The properties for the OrderItem component.
 * @returns {React.ReactElement} The OrderItem component.
 */
export const OrderItem: (
    props: OrderInterfaces.OrderItemProps,
) => React.ReactElement = (props: OrderInterfaces.OrderItemProps) => {
    const appContext = useAppContext();
    const navigation = useNavigation();
    const route = useRoute();
    const order: OrderInterfaces.Order = props.route.params.item;
    const [errorMessage, setErrorMessage] = useState(null);
    const [orderLocationMarker, setOrderLocationMarker] =
        useState<React.ReactElement | null>(null);
    const [userPositionMarker, setUserPositionMarker] =
        useState<React.ReactElement | null>(null);
    const mapRef = useRef<MapView>(null);
    const reload: boolean | null = route.params?.reload ?? false;

    /**
     * Fetches the current user location and the order location, then sets the respective markers on the map.
     *
     * This function requests permission to access the user's location. If granted, it retrieves the current
     * location coordinates and sets the user position in the application context. It also fetches the
     * coordinates for the order address using the Nominatim model and sets the order location marker on
     * the map. If the order address is not found, the order location marker is set to null. Additionally,
     * it sets the user location marker on the map.
     *
     * @returns {Promise<void>} A promise that resolves when the data fetching and marker setting are
     *  complete.
     */
    const fetchData = async (): Promise<void> => {
        try {
            const permission: Location.LocationPermissionResponse =
                await Location.requestForegroundPermissionsAsync();

            if (permission.status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                appContext.setUserPosition({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                });

                setUserPositionMarker(
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title='Min position'
                        pinColor={Style.Color.indicator.info[300]}
                    />,
                );
            } else {
                setUserPositionMarker(null);
            }

            const response = await NominatimModel.getCoordinates(order.address);
            if (response && response.length > 0) {
                const pinColor = (): string =>
                    order.status_id === 200
                        ? Style.Color.indicator.warning[300]
                        : order.status_id === 400
                          ? Style.Color.indicator.positive[300]
                          : Style.Color.indicator.info[300];

                setOrderLocationMarker(
                    <Marker
                        coordinate={{
                            latitude: parseFloat(response[0].lat),
                            longitude: parseFloat(response[0].lon),
                        }}
                        title={order.name + ' position'}
                        pinColor={pinColor()}
                    />,
                );
            } else {
                setOrderLocationMarker(null);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    /**
     * Hook to handle focus effect for fetching user and order locations.
     *
     * This hook uses `useFocusEffect` to trigger the `fetchData` function when the screen comes into focus.
     * It checks if the user position is not set or if a reload is required. If either condition is true,
     * it calls the `fetchData` function to update the user and order locations. After fetching the data,
     * it resets the reload parameter to false.
     *
     * Dependencies:
     * - `appContext.userPosition`: The current user position from the application context.
     * - `reload`: A boolean indicating if a reload is required.
     * - `navigation.setParams`: Function to update the navigation parameters.
     */
    useFocusEffect(
        useCallback((): void => {
            if (!appContext.userPosition || reload) {
                void fetchData();
                navigation.setParams({ reload: false });
            }
        }, [appContext.userPosition, reload, navigation.setParams]),
    );

    /**
     * Hook to fit map view to user and order locations.
     *
     * This hook is executed after the component renders and whenever the user or order location markers change.
     * It checks if the map reference, user position marker, and order location marker are available. If they are,
     * it adjusts the map view to fit the coordinates of the user and order locations with appropriate padding.
     *
     * @requires react
     * @requires react-native-maps
     * @requires ../../context/App.provider
     */
    useEffect((): void => {
        if (mapRef.current && userPositionMarker && orderLocationMarker) {
            mapRef.current.fitToCoordinates(
                [
                    {
                        latitude: appContext.userPosition.latitude,
                        longitude: appContext.userPosition.longitude,
                    },
                    {
                        latitude: parseFloat(
                            orderLocationMarker.props.coordinate.latitude,
                        ),
                        longitude: parseFloat(
                            orderLocationMarker.props.coordinate.longitude,
                        ),
                    },
                ],
                {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                },
            );
        }
    }, [userPositionMarker, orderLocationMarker]);

    /**
     * Compute boolean value to indicate if order is packable.
     *
     * This memoized value determines if the order is packable based on the order status and stock levels.
     * It checks if the order status is 100, the order has items, and every item in the order has
     * sufficient stock.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     * - `order.order_items`: The list of items in the order.
     *
     * @returns {boolean} True if the order is packable, false otherwise.
     */
    const orderIsPackable: boolean = useMemo(
        (): boolean =>
            order.status_id === 100 &&
            order.order_items.length > 0 &&
            order.order_items.every(
                (orderItem: OrderInterfaces.OrderItem): boolean => {
                    return orderItem.stock >= orderItem.amount;
                },
            ),
        [order.status_id, order.order_items],
    );

    /**
     * Compute boolean value to indicate if order is missing items.
     *
     * This memoized value determines if the order is missing items based on the order status and the number of items.
     * It checks if the order status is 100 and the order has no items.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     * - `order.order_items.length`: The number of items in the order.
     *
     * @returns {boolean} True if the order is missing items, false otherwise.
     */
    const orderIsMissingItems: boolean = useMemo(
        (): boolean =>
            order.status_id === 100 && order.order_items.length === 0,
        [order.status_id, order.order_items.length],
    );

    /**
     * Compute boolean value to indicate if order is packed.
     *
     * This memoized value determines if the order is packed based on the order status.
     * It checks if the order status is 200.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {boolean} True if the order is packed, false otherwise.
     */
    const orderIsPacked: boolean = useMemo(
        (): boolean => order.status_id === 200,
        [order.status_id],
    );

    /**
     * Compute boolean value to indicate if order is sent to customer.
     *
     * This memoized value determines if the order is sent based on the order status.
     * It checks if the order status is either 400 or 600.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {boolean} True if the order is sent, false otherwise.
     */
    const orderIsSent: boolean = useMemo(
        (): boolean => [400, 600].includes(order.status_id),
        [order.status_id],
    );

    /**
     * Compute boolean value to indicate if order is returned.
     *
     * This memoized value determines if the order is returned based on the order status.
     * It checks if the order status is 800.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {boolean} True if the order is returned, false otherwise.
     */
    const orderIsReturned: boolean = useMemo(
        (): boolean => order.status_id === 800,
        [order.status_id],
    );

    /**
     * Compute boolean value to indicate if order is refunded.
     *
     * This memoized value determines if the order is refunded based on the order status.
     * It checks if the order status is 900.
     *
     * Dependencies:
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {boolean} True if the order is refunded, false otherwise.
     */
    const orderIsRefunded: boolean = useMemo(
        (): boolean => order.status_id === 900,
        [order.status_id],
    );

    /**
     * Compute dynamic interaction element based on order status.
     *
     * This memoized value determines the appropriate interaction element to display based on the order
     * status and stock levels. It returns different elements for various order statuses, such as
     * packable, packed, sent, returned, and refunded. The element displayed allows the user to pack the
     * order, send the order, or shows relevant status messages.
     *
     * Dependencies:
     * - `orderIsPackable`: Boolean indicating if the order is packable.
     * - `orderIsPacked`: Boolean indicating if the order is packed.
     * - `orderIsSent`: Boolean indicating if the order is sent.
     * - `orderIsReturned`: Boolean indicating if the order is returned.
     * - `orderIsRefunded`: Boolean indicating if the order is refunded.
     * - `orderIsMissingItems`: Boolean indicating if the order is missing items.
     * - `order.status_id`: The current status ID of the order.
     *
     * @returns {React.ReactElement} The interaction element to display based on the order status.
     */
    const dynamicInteractionElement: React.ReactElement =
        useMemo((): React.ReactElement => {
            if (orderIsPackable) {
                return (
                    <Pressable
                        style={({ pressed }) => [
                            Style.Button.buttonContainer,
                            {
                                backgroundColor: pressed
                                    ? Style.Color.schemeOne.primary[200]
                                    : Style.Color.schemeOne.primary[300],
                            },
                        ]}
                        onPress={async (): Promise<void> => {
                            try {
                                await OrderModel.pickOrder(order);
                                const updatedProductsList: ProductInterfaces.Product[] =
                                    await ProductModel.getProducts();
                                const updatedOrdersList: OrderInterfaces.Order[] =
                                    await OrderModel.getOrders();

                                // Update the state of things...
                                appContext.setProducts(updatedProductsList);
                                appContext.setOrders(updatedOrdersList);

                                showMessage({
                                    message: `Order (${order.id}) har paketerats`,
                                    description: 'Order har paketerats.',
                                    type: 'success',
                                    duration: 3500,
                                });

                                // Navigate back to the order list and trigger reload.
                                navigation.navigate('Orderlista', {
                                    reload: true,
                                });
                            } catch (error) {
                                console.error('Error picking order: ', error);
                                showMessage({
                                    message: `Order (${order.id}) gick inte att paketera`,
                                    description: 'Order gick inte paketera',
                                    type: 'warning',
                                    duration: 3000,
                                });
                            } finally {
                            }
                        }}>
                        <Text style={Style.Typography.buttonText}>
                            Packetera Order
                        </Text>
                    </Pressable>
                );
            } else if (orderIsPacked) {
                return (
                    <View>
                        <Pressable
                            style={({ pressed }) => [
                                Style.Button.buttonContainer,
                                {
                                    backgroundColor: pressed
                                        ? Style.Color.schemeOne.primary[200]
                                        : Style.Color.schemeOne.primary[300],
                                },
                            ]}
                            onPress={async (): Promise<void> => {
                                try {
                                    await OrderModel.updateOrderStatus(
                                        order.id,
                                        order.name,
                                        400,
                                    );

                                    showMessage({
                                        message: `Order (${order.id}) har skickats`,
                                        description: 'Order har skickats.',
                                        type: 'success',
                                        duration: 3500,
                                    });

                                    navigation.navigate('Orderlista', {
                                        reload: true,
                                    });
                                } catch (error) {
                                    console.error(
                                        'Error sending order: ',
                                        error,
                                    );
                                }
                            }}>
                            <Text style={Style.Typography.buttonText}>
                                Skicka Order
                            </Text>
                        </Pressable>

                        <View style={Style.Container.infoMsgContainer}>
                            <Text style={Style.Typography.infoFlashMsg}>
                                Ordern är packeterad
                            </Text>
                        </View>
                    </View>
                );
            } else if (orderIsSent) {
                return (
                    <View style={Style.Container.successMsgContainer}>
                        <Text style={Style.Typography.successFlashMsg}>
                            Ordern har skickats till kund
                        </Text>
                    </View>
                );
            } else if (orderIsReturned) {
                return (
                    <View style={Style.Container.infoMsgContainer}>
                        <Text style={Style.Typography.warningFlashMsg}>
                            Kunden har returnerat ordern.
                        </Text>
                    </View>
                );
            } else if (orderIsRefunded) {
                return (
                    <View style={Style.Container.infoMsgContainer}>
                        <Text style={Style.Typography.infoFlashMsg}>
                            Ordern är återbetald.
                        </Text>
                    </View>
                );
            } else if (!orderIsPackable && !orderIsMissingItems) {
                return (
                    <View style={Style.Container.warningMsgContainer}>
                        <Text style={Style.Typography.warningFlashMsg}>
                            Ordern går inte att packetera pga lagersaldo för
                            en/flera av beställda produkter saknas.
                        </Text>
                    </View>
                );
            } else if (orderIsMissingItems) {
                return (
                    <View style={[Style.Container.warningMsgContainer]}>
                        <Text style={Style.Typography.cautionFlashMsg}>
                            Order saknar produkter.
                        </Text>
                    </View>
                );
            } else {
                return (
                    <View style={Style.Container.warningMsgContainer}>
                        <Text style={Style.Typography.warningFlashMsg}>
                            Det är något gick fel på orderns status. Kontakta
                            support!
                        </Text>
                    </View>
                );
            }
        }, [order.status_id]);

    /**
     * Compute and render order details.
     *
     * This memoized value returns a React element that displays the details of an order, including the
     * order ID, status, customer name, address, postal code, and city. It also includes a dynamic
     * interaction element based on the order status.
     *
     * Dependencies:
     * - `order`: The order object containing details such as ID, status, customer name, address, postal
     *      code, and city.
     * - `dynamicInteractionElement`: The interaction element to display based on the order status.
     *
     * @returns {React.ReactElement} The React element displaying the order details and dynamic
     *      interaction element.
     */
    const orderDetails: React.ReactElement = useMemo(() => {
        return (
            <View style={Style.Container.content}>
                <View style={Style.Container.grid.row}>
                    <Text style={Style.Typography.dataLeft}>Order ID: </Text>
                    <Text style={Style.Typography.dataRight}>{order.id}</Text>
                </View>

                <View style={Style.Container.grid.row}>
                    <Text style={Style.Typography.dataLeft}>Status: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {order.status}
                    </Text>
                </View>

                <View style={Style.Container.grid.row}>
                    <Text style={Style.Typography.dataLeft}>Status kod: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {order.status_id}
                    </Text>
                </View>

                <View style={Style.Container.grid.row}>
                    <Text style={Style.Typography.dataLeft}>Kund: </Text>
                    <Text style={Style.Typography.dataRight}>{order.name}</Text>
                </View>

                <View style={Style.Container.grid.row}>
                    <Text style={Style.Typography.dataLeft}>Address: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {order.address}
                    </Text>
                </View>

                <View style={Style.Container.grid.row}>
                    <Text style={Style.Typography.dataLeft}>Postkod: </Text>
                    <Text style={Style.Typography.dataRight}>{order.zip}</Text>
                </View>

                <View style={Style.Container.grid.row}>
                    <Text style={Style.Typography.dataLeft}>Stad: </Text>
                    <Text style={Style.Typography.dataRight}>{order.city}</Text>
                </View>

                {dynamicInteractionElement}
            </View>
        );
    }, [order, dynamicInteractionElement]);

    const orderDirectionsPath = useMemo(() => {
        if (
            appContext.userPosition?.latitude &&
            appContext.userPosition?.longitude &&
            orderLocationMarker
        ) {
            return (
                <MapViewDirections
                    origin={appContext.userPosition}
                    destination={orderLocationMarker.props.coordinate}
                    apikey={APP_CONFIG.google_directions_api_key}
                    strokeWidth={3}
                    strokeColor={Style.Color.indicator.positive[100]}
                />
            );
        } else {
            return null;
        }
    }, [appContext.userPosition, orderLocationMarker]);

    /**
     * Compute and render map element based on user and order locations.
     *
     * This memoized value returns a React element that displays a map centered around the user's position.
     * It includes markers for the user's current location and the order location if available.
     *
     * Dependencies:
     * - `appContext.userPosition`: The current user position from the application context.
     * - `userPositionMarker`: The marker element for the user's position.
     * - `orderLocationMarker`: The marker element for the order location.
     *
     * @returns {React.ReactElement | null} The React element displaying the map with markers, or null if
     *      the user position is not available.
     */
    const mapElement: React.ReactElement | null = useMemo(() => {
        if (
            !appContext.userPosition?.latitude ||
            !appContext.userPosition?.longitude
        ) {
            return null;
        }

        return (
            <View style={Style.Container.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={Style.Container.map}
                    initialRegion={{
                        // center around your position
                        latitude: appContext.userPosition?.latitude,
                        longitude: appContext.userPosition?.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    mapType={'hybrid'}
                    // showsUserLocation={true}
                >
                    {orderDirectionsPath}
                    {userPositionMarker}
                    {orderLocationMarker}
                </MapView>
            </View>
        );
    }, [appContext.userPosition, userPositionMarker, orderLocationMarker]);

    const orderListItems: React.ReactElement[] = order.order_items.map(
        (orderListItem: OrderInterfaces.OrderItem, index: number) => (
            <View key={index}>
                <View style={Style.Container.grid}>
                    <View style={Style.Container.grid.row}>
                        <View style={Style.Container.grid.col[1]}>
                            <Text>{index + 1}. </Text>
                        </View>

                        <View style={Style.Container.grid.col[7]}>
                            <View style={Style.Container.grid.row}>
                                {/* Item article number */}
                                <Text style={Style.Typography.dataLeft}>
                                    {orderListItem.name}
                                </Text>

                                {/* Item name */}
                                <Text style={Style.Typography.dataCenter}>
                                    {orderListItem.article_number}
                                </Text>

                                {/* Item amount */}
                                <Text style={Style.Typography.dataRight}>
                                    {orderListItem.amount} st.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={Style.Container.grid.row}>
                        <View style={Style.Container.grid.col[1]}>
                            <Text> </Text>
                        </View>

                        <View style={Style.Container.grid.col[7]}>
                            <View style={Style.Container.grid.row}>
                                {/* Item article number */}
                                <Text style={Style.Typography.dataLeft}>
                                    Lagerplats:
                                </Text>

                                {/* Item name */}
                                <Text style={Style.Typography.dataCenter}>
                                    {orderListItem.location}
                                </Text>

                                {/* Item amount */}
                                <Text style={Style.Typography.dataRight}>
                                    {orderListItem.stock} st.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {order.status_id === 100 ? (
                    <View
                        style={[
                            Style.Container.grid.row,
                            {
                                paddingVertical:
                                    Style.Typography.whiteSpace[75],
                                marginBottom:
                                    index < order.order_items.length - 1
                                        ? Style.Typography.whiteSpace[100]
                                        : Style.Typography.whiteSpace[50],
                                borderBottomColor:
                                    index < order.order_items.length - 1
                                        ? Style.Color.grayScale[200]
                                        : '',
                                borderBottomWidth:
                                    index < order.order_items.length - 1
                                        ? 0.3
                                        : 0,
                            },
                        ]}>
                        {productStockStatus(orderListItem)}
                    </View>
                ) : (
                    <View
                        style={[
                            Style.Container.grid.row,
                            {
                                borderBottomColor:
                                    index < order.order_items.length - 1
                                        ? Style.Color.grayScale[200]
                                        : '',
                                borderBottomWidth:
                                    index < order.order_items.length - 1
                                        ? 0.3
                                        : 0,
                            },
                        ]}></View>
                )}
            </View>
        ),
    );

    const shouldShowMapElement = [200, 400].includes(order.status_id);

    return (
        <View style={Style.Container.content}>
            <ScrollView style={Style.Container.scrollView}>
                {orderDetails}

                {shouldShowMapElement && mapElement}

                {orderListItems}
            </ScrollView>
            <StatusBar style='auto' />
        </View>
    );
};
