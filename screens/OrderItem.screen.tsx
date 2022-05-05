import React, { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Button, StyleProp } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as OrderModel from '../models/Orders';
import * as OrderInterfaces from '../interfaces/Order';
import * as Style from '../assets/styles';

/**
 * StockListItem screen/view.
 *
 * @constructor
 * @param props
 */
export const OrderItem: React.FC = (
    props: PropsWithChildren<OrderInterfaces.Order>,
) => {
    const item = props.route.params.item;
    const navigation = useNavigation();
    const packable: boolean[] = [];

    const orderDetails: React.FC<OrderInterfaces.Order> = () => {
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
                    <Text style={Style.Typography.dataLeft}>Postnummer: </Text>
                    <Text style={Style.Typography.dataRight}>{item.zip}</Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Stad: </Text>
                    <Text style={Style.Typography.dataRight}>{item.city}</Text>
                </View>
            </View>
        );
    };

    function checkStockStatus({
        orderItem,
    }: OrderInterfaces.OrderItem): JSX.Element {
        let indicatorText;
        let indicatorColor;

        if (orderItem.amount <= orderItem.stock) {
            indicatorColor = Style.Color.indicator.positive;
            indicatorText = 'Det finns på lager, bara att plocka! ';
            packable.push(true);
        } else if (orderItem.amount > orderItem.stock) {
            indicatorColor = Style.Color.indicator.warning;
            indicatorText =
                'Kontrollera lagerplatsen, enligt lagersaldo finns inte tillräckligt av produkten. ';
            packable.push(false);
        }

        console.log(`Packable: ${packable}`);

        return (
            <Text
                style={(Style.Typography.dataLeft, { color: indicatorColor })}>
                {indicatorText}
            </Text>
        );
    }

    async function checkOrderPackingStatus({ orderItems }): Promise<object> {
        const packableOrder: boolean[] = [];
        let outputElement: object;

        await orderItems.forEach(
            (item: { amount: number; stock: number }): void => {
                if (item.amount <= item.stock) {
                    packableOrder.push(true);
                } else {
                    packableOrder.push(false);
                }
            },
        );

        console.log(`PackableOrder: ${packableOrder}`);

        if (!packableOrder.includes(false)) {
            outputElement = () => (
                <Button
                    style={Style.Button.buttonContainer}
                    title='Packa order'
                    onPress={async () => {
                        await OrderModel.pickOrder(item.order_items);
                        navigation.navigate('Orderlista');
                    }}>
                    Packa ordern!
                </Button>
            );
        } else {
            outputElement = () => (
                <View>
                    <Text style={{ width: '100%', height: undefined }}>
                        Det går inte att packa orden för tillfället pga lågt
                        produktsaldo.
                    </Text>
                </View>
            );
        }

        return outputElement;
    }

    const orderItems = item.order_items.map(
        (orderItem: OrderInterfaces.OrderItem, index: number): JSX.Element => (
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
                    style={
                        (Style.Container.content,
                        Style.Container.flexBox.rowNoPadding,
                        {
                            paddingVertical: Style.Typography.whiteSpace.X1,
                        })
                    }>
                    <View style={(Style.Container.flexBox.column, { flex: 1 })}>
                        <Text style={Style.Typography.dataLeft}> </Text>
                    </View>

                    <View style={{ flex: 4.5 }}>
                        {checkStockStatus({ orderItem })}
                    </View>
                </View>
            </View>
        ),
    );

    return (
        <View style={[Style.Container.content, { paddingBottom: 0 }]}>
            <ScrollView style={Style.Container.content}>
                {orderDetails}

                {orderItems}
            </ScrollView>
            <StatusBar style='auto' />
        </View>
    );
};
