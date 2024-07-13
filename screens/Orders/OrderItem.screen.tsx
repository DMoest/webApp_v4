import React, {useMemo} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import * as OrderInterfaces from '../../interfaces/Order';
import * as OrderModel from '../../models/Orders';
import * as Style from '../../assets/styles';
import {FontAwesome5} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';


/**
 * Function to check product stock.
 *
 * @param orderItem
 */
function productStockStatus(
    orderItem: OrderInterfaces.OrderItem,
): React.JSX.Element {
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
 * @param props
 * @constructor
 */
export const OrderItem: (
    props: OrderInterfaces.OrderItemProps,
) => React.JSX.Element = (props: OrderInterfaces.OrderItemProps) => {
    const order: OrderInterfaces.Order = props.route.params.item;
    const navigation = useNavigation();

    /**
     * Compute boolean value to indicate if order is packable.
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
     */
    const orderIsMissingItems: boolean = useMemo(
        (): boolean =>
            order.status_id === 100 && order.order_items.length === 0,
        [order.status_id, order.order_items.length],
    );

    /**
     * Compute boolean value to indicate if order is packed.
     */
    const orderIsPacked: boolean = useMemo(
        (): boolean => order.status_id === 200,
        [order.status_id],
    );

    /**
     * Compute boolean value to indicate if order is sent to customer.
     */
    const orderIsSent: boolean = useMemo(
        (): boolean => [400, 600].includes(order.status_id),
        [order.status_id],
    );

    /**
     * Compute boolean value to indicate if order is returned.
     */
    const orderIsReturned: boolean = useMemo(
        (): boolean => order.status_id === 800,
        [order.status_id],
    );

    /**
     * Compute boolean value to indicate if order is refunded.
     */
    const orderIsRefunded: boolean = useMemo(
        (): boolean => order.status_id === 900,
        [order.status_id],
    );

    const pickOrderAndNavigate = async (
        order: OrderInterfaces.Order,
    ): Promise<void> => {
        await OrderModel.pickOrder(order).then((): void => {
            navigation.navigate('Orderlista', {
                reload: true,
            });
        });
    };

    /**
     * Compute dynamic interaction element based on order status. This would allow the user pack the order if the
     * order is packable or notify the user that the order is already packed, shipped, returned or refunded. The
     * element displayed is based on the computed values based on status and stock levels.
     */
    const dynamicInteractionElement: React.JSX.Element =
        useMemo((): React.JSX.Element => {
            if (orderIsPackable) {
                return (
                    <Pressable
                        style={({pressed}) => [
                            Style.Button.buttonContainer,
                            {
                                backgroundColor: pressed
                                    ? Style.Color.schemeOne.primary[200]
                                    : Style.Color.schemeOne.primary[300],
                            },
                        ]}
                        onPress={async (): Promise<void> => {
                            try {
                                const result =
                                    await OrderModel.pickOrder(order);
                                console.log('picked order result: ', result);

                                navigation.navigate('Orderlista', {
                                    reload: true,
                                });
                            } catch (error) {
                                console.error('Error picking order: ', error);
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
                            style={({pressed}) => [
                                Style.Button.buttonContainer,
                                {
                                    backgroundColor: pressed
                                        ? Style.Color.schemeOne.primary[200]
                                        : Style.Color.schemeOne.primary[300],
                                },
                            ]}
                            onPress={pickOrderAndNavigate(order)}>
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

    const orderDetails: React.JSX.Element = useMemo(() => {
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

    const orderListItems: React.JSX.Element[] = order.order_items.map(
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

    return (
        <View style={Style.Container.content}>
            <ScrollView style={Style.Container.scrollView}>
                {orderDetails}
                {orderListItems}
            </ScrollView>
            <StatusBar style='auto'/>
        </View>
    );
};
