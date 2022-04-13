import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import * as Style from "../assets/styles";


/**
 * StockListItem screen/view.
 *
 * @param route
 * @constructor
 */
export const StockItem: React.FC = ({route}) => {
    const item = route.params.item

    console.log("Produkt: ", item, "\n")

    return (
        <View style={[Style.Base.content]}>
            <Text style={Style.Typography.subHeader}>{item.name}</Text>

            <View style={Style.Container.flexBox.row}>
                <Text style={[Style.Typography.dataLeft, {flex: 1}]}>ID: </Text>
                <Text style={[Style.Typography.dataRight, {flex: 2}]}>{item.id}</Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={[Style.Typography.dataLeft, {flex: 1}]}>Artikel nr: </Text>
                <Text style={[Style.Typography.dataRight, {flex: 2}]}>{item.article_number}</Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={[Style.Typography.dataLeft, {flex: 1}]}>Plats: </Text>
                <Text style={[Style.Typography.dataRight, {flex: 2}]}>{item.location}</Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={[Style.Typography.dataLeft, {flex: 1}]}>Pris: </Text>
                <Text style={[Style.Typography.dataRight, {flex: 2}]}>{item.price} kr</Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={[Style.Typography.dataLeft, {flex: 1}]}>Beskrivning: </Text>
                <Text style={[Style.Typography.dataRight, {flex: 2}]}>{item.description}</Text>
            </View>

            <View style={Style.Container.flexBox.row}>
                <Text style={[Style.Typography.dataLeft, {flex: 1}]}>Specifikation: </Text>
                <Text style={[Style.Typography.dataRight, {flex: 2}]}>{item.specifiers}</Text>
            </View>

            <StatusBar style="auto"/>
        </View>
    );
}
