import React from "react";
import {StatusBar} from 'expo-status-bar';
import {Text, View, ScrollView, Button} from 'react-native';
import * as Style from "../assets/themes/index";


/**
 * StockListItem screen/view.
 *
 * @param route
 * @constructor
 */
export const OrderItem: React.FC = ({route}) => {
    const item = route.params.item
    console.log("ORDER: ", item)

    const orderDetails = () => {
        return (
            <View style={[Style.Container.bottomSeparator]}>
                <View style={[Style.Container.flexBox.rowNoPadding]}>
                    <Text style={Style.Typography.dataLeft}>Order ID: </Text>
                    <Text style={Style.Typography.dataRight}>{item.id}</Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Status: </Text>
                    <Text style={Style.Typography.dataRight}>{item.status}</Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Status kod: </Text>
                    <Text style={Style.Typography.dataRight}>{item.status_id}</Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Beställare: </Text>
                    <Text style={Style.Typography.dataRight}>{item.name}</Text>
                </View>

                <View style={Style.Container.flexBox.rowNoPadding}>
                    <Text style={Style.Typography.dataLeft}>Address: </Text>
                    <Text style={Style.Typography.dataRight}>{item.address}</Text>
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
        )
    }

    function checkStockStatus({orderItem}) {
        let indicatorText;
        let indicatorColor;

        if (orderItem.amount <= orderItem.stock) {
            indicatorColor = Style.Color.indicator.positive
            indicatorText = "Det finns på lager, bara att plocka! "
        } else if (orderItem.amount > orderItem.stock) {
            indicatorColor = Style.Color.indicator.warning
            indicatorText = "Kontrollera lagerplatsen, enligt lagersaldo finns inte tillräckligt av produkten. "
        }

        return (
            <Text style={Style.Typography.dataLeft, {color: indicatorColor}}>{indicatorText}</Text>
        );
    };

    const orderItems = item.order_items.map((orderItem, index) =>
        <View style={[Style.Container.bottomSeparator]}>
            <View style={[Style.Container.flexBox.rowNoPadding]}>
                <View style={[Style.Container.flexBox.column, {flex: 1}]}>
                    <Text style={Style.Typography.dataLeft}>{index+1}. </Text>
                    <Text style={Style.Typography.dataLeft}> </Text>
                    <Text style={Style.Typography.dataLeft}> </Text>
                </View>

                <View style={[Style.Container.flexBox.column, {flex: 2}]}>
                    <Text style={Style.Typography.dataLeft}>{orderItem.amount} st {orderItem.name}</Text>
                    <Text style={Style.Typography.dataLeft}>{orderItem.product_id}</Text>
                    <Text style={Style.Typography.dataLeft}>{orderItem.article_number}</Text>
                </View>

                <View style={[Style.Container.flexBox.column, {flex: 2}]}>
                    <Text style={Style.Typography.dataRight}> </Text>
                    <Text style={Style.Typography.dataRight}>{orderItem.stock} st i lager</Text>
                    <Text style={Style.Typography.dataRight}>Plats: {orderItem.location}</Text>
                </View>

                {/*<View style={Style.Container.flexBox.column}>*/}
                {/*    <Text style={Style.Typography.dataLeft}> </Text>*/}
                {/*</View>*/}
            </View>

            <View style={[Style.Container.content, Style.Container.flexBox.rowNoPadding, {
                paddingVertical: Style.Typography.whiteSpace.X1 }]}>

                <View style={[Style.Container.flexBox.column, {flex: 1}]}>
                    <Text style={Style.Typography.dataLeft}> </Text>
                </View>

                <View style={{flex: 4.5}}>
                    {checkStockStatus({orderItem})}
                </View>
            </View>
        </View>
    );

    return (
        <View style={[Style.Container.content, {paddingBottom: 0}]}>
            <ScrollView style={Style.Container.content}>
                {orderDetails()}
                {orderItems}

                {/*<Button title='Packa order' onPress={} />*/}
            </ScrollView>
            <StatusBar style="auto"/>
        </View>
    );
}
