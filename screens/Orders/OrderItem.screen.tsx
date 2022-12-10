/**
 * Module Imports.
 */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/namespace
import { Text, View, ScrollView, Pressable } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { StatusBar } from 'expo-status-bar';
import * as OrderInterfaces from '../../interfaces/Order';
import * as OrderModel from '../../models/Orders';
import * as Style from '../../assets/styles';

/**
 * Module Props Type.
 */
type OrderItemPropsType = {
    route: {
        params: {
            item: OrderInterfaces.Order;
        };
    };
    navigation: NativeStackNavigatorProps;
};

/**
 * Function to check product stock.
 *
 * @param orderItem
 */
function checkProductStock(orderItem: OrderInterfaces.OrderItem): JSX.Element {
    let indicatorText;
    let indicatorColor;

    if (orderItem.amount <= orderItem.stock) {
        indicatorColor = Style.Color.indicator.positive;
        indicatorText = 'Produkten finns på lager. ';
    } else if (orderItem.amount > orderItem.stock) {
        indicatorColor = Style.Color.indicator.warning;
        indicatorText = 'Det finns inte tillräckligt av produkten. ';
    }

    return (
        <Text style={(Style.Typography.dataLeft, { color: indicatorColor })}>
            {indicatorText}
        </Text>
    );
}

/**
 * Function to check if order is packable or if product stock is not sufficient.
 *
 * @param theOrderItems
 * @param navigation
 */
const checkPackingStatus = (
    theOrderItems: OrderInterfaces.Order,
    navigation: NativeStackNavigatorProps,
): JSX.Element => {
    const numberOfItems: number = theOrderItems.order_items.length;
    let isPackable: boolean;
    let outputElement: JSX.Element;

    if (numberOfItems > 0) {
        isPackable = theOrderItems.order_items.every(
            (item) => item.amount <= item.stock,
        );
    } else {
        isPackable = false;
    }

    if (isPackable) {
        outputElement = (
            <Pressable
                style={Style.Button.buttonContainer}
                onPress={async () => {
                    try {
                        await OrderModel.pickOrder(theOrderItems);
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        await navigation.navigate('Orderlista', {
                            reload: true,
                        });
                    } catch (error) {
                        console.log('Error: ', error);
                    }
                }}>
                <Text style={Style.Button.button}>Packetera Ordern</Text>
            </Pressable>
        );
    } else if (!isPackable) {
        outputElement = (
            <View style={Style.Button.buttonContainer}>
                <Text
                    style={
                        (Style.Container.containers,
                        { backgroundColor: Style.Color.indicator.warning })
                    }>
                    Ordern går inte att slutföra pga att lagersaldo saknas för
                    en eller flera produkter.
                </Text>
            </View>
        );
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return outputElement;
};

/**
 * OrderItem screen/view.
 *
 * @param props
 * @constructor
 */
export const OrderItem: (props: OrderItemPropsType) => JSX.Element = (
    props: OrderItemPropsType,
) => {
    const item: OrderInterfaces.Order = props.route.params.item;
    const [isPackable, setIsPackable] = useState(false);

    useEffect(
        () => setIsPackable(checkPackingStatus(item, props.navigation)),
        [item, props.navigation],
    );

    const orderDetails = () => {
        return (
            <View style={Style.Container.bottomSeparator}>
                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Order ID: </Text>
                    <Text style={Style.Typography.dataRight}>{item.id}</Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Status: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {item.status}
                    </Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Status kod: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {item.status_id}
                    </Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Beställare: </Text>
                    <Text style={Style.Typography.dataRight}>{item.name}</Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Address: </Text>
                    <Text style={Style.Typography.dataRight}>
                        {item.address}
                    </Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Postkod: </Text>
                    <Text style={Style.Typography.dataRight}>{item.zip}</Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Stad: </Text>
                    <Text style={Style.Typography.dataRight}>{item.city}</Text>
                </View>
            </View>
        );
    };

    const orderItems = item.order_items.map(
        (orderItem: OrderInterfaces.OrderItem, index: number) => (
            <View
                key={index}
                style={Style.Container.bottomSeparator}>
                <View style={Style.Container.flexBox.rowNoPadding}>
                    <View style={(Style.Container.flexBox.column, { flex: 1 })}>
                        <Text style={Style.Typography.dataLeft}>
                            {index + 1}.{' '}
                        </Text>
                        <Text style={Style.Typography.dataLeft}> </Text>
                        <Text style={Style.Typography.dataLeft}> </Text>
                    </View>

                    <View style={(Style.Container.flexBox.column, { flex: 2 })}>
                        <Text style={Style.Typography.dataLeft}>
                            {orderItem.amount} st {orderItem.name}
                        </Text>
                        <Text style={Style.Typography.dataLeft}>
                            {orderItem.product_id}
                        </Text>
                        <Text style={Style.Typography.dataLeft}>
                            {orderItem.article_number}
                        </Text>
                    </View>

                    <View style={(Style.Container.flexBox.column, { flex: 2 })}>
                        <Text style={Style.Typography.dataRight}> </Text>
                        <Text style={Style.Typography.dataRight}>
                            {orderItem.stock} st i lager
                        </Text>
                        <Text style={Style.Typography.dataRight}>
                            Plats: {orderItem.location}
                        </Text>
                    </View>
                </View>

                <View
                    style={[
                        Style.Container.content,
                        Style.Container.flexBox.rowNoPadding,
                        {
                            paddingVertical: Style.Typography.whiteSpace.X1,
                        },
                    ]}>
                    <View style={(Style.Container.flexBox.column, { flex: 1 })}>
                        <Text style={Style.Typography.dataLeft}> </Text>
                    </View>

                    <View style={{ flex: 4.5 }}>
                        {checkProductStock(orderItem)}
                    </View>
                </View>
            </View>
        ),
    );

    return (
        <View style={[Style.Container.content, { paddingBottom: 0 }]}>
            <ScrollView style={Style.Container.content}>
                {orderDetails()}
                {orderItems}
                {isPackable}
            </ScrollView>
            <StatusBar style='auto' />
        </View>
    );
};
