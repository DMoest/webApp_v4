/**
 * Module imports.
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Style from '../../assets/styles';
import * as DeliveryInterfaces from '../../interfaces/Delivery';
import { Typography } from '../../assets/styles';

/**
 * DeliveryListItem screen/view.
 *
 * @param props
 * @constructor
 */
export const DeliveryItem: (
    props: DeliveryInterfaces.DeliveryItemProps,
) => React.JSX.Element = (props: DeliveryInterfaces.DeliveryItemProps) => {
    const item = props.route.params.item;

    return (
        <View style={Style.Container.content}>
            <View style={Style.Container.grid.row}>
                <Text style={Style.Typography.dataLeft}>Inleverans ID: </Text>
                <Text style={Style.Typography.dataRight}>{item.id}</Text>
            </View>

            <View style={Style.Container.grid.row}>
                <Text style={Style.Typography.dataLeft}>Produkt ID: </Text>
                <Text style={Style.Typography.dataRight}>
                    {item.product_id}
                </Text>
            </View>

            <View style={Style.Container.grid.row}>
                <Text style={Style.Typography.dataLeft}>Produktnamn: </Text>
                <Text style={Style.Typography.dataRight}>
                    {item.product_name}
                </Text>
            </View>

            <View style={Style.Container.flexBox.rowNoPadding}>
                <Text style={Style.Typography.dataLeft}>Antal: </Text>
                <Text style={Style.Typography.dataRight}>{item.amount} st</Text>
            </View>

            <View
                style={
                    (Style.Container.grid.column,
                    {
                        paddingTop: Typography.whiteSpace[100],
                        paddingBottom: Typography.whiteSpace[200],
                    })
                }>
                <Text style={Style.Typography.dataLeft}>Kommentar: </Text>
                <Text style={Style.Typography.dataLeft}>{item.comment}</Text>
            </View>

            <StatusBar style='auto' />
        </View>
    );
};
