/**
 * Module imports.
 */
import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Style from '../../assets/styles';
import * as DeliveryInterfaces from '../../interfaces/Deliveries';
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
            <View style={Style.Container.flexBox.rowNoPadding}>
                <Text style={Style.Typography.dataLeft}>Inleverans ID: </Text>
                <Text style={Style.Typography.dataRight}>{item.id}</Text>
            </View>
            <View style={Style.Container.flexBox.rowNoPadding}>
                <Text style={Style.Typography.dataLeft}>Produkt ID: </Text>
                <Text style={Style.Typography.dataRight}>
                    {item.product_id}
                </Text>
            </View>
            <View style={Style.Container.flexBox.rowNoPadding}>
                <Text style={Style.Typography.dataLeft}>Produktnamn: </Text>
                <Text style={Style.Typography.dataRight}>
                    {item.product_name}
                </Text>
            </View>
            <View style={Style.Container.flexBox.rowNoPadding}>
                <Text style={Style.Typography.dataLeft}>Antal: </Text>
                <Text style={Style.Typography.dataRight}>{item.amount} st</Text>
            </View>

            <Text style={Style.Typography.dataLeft}>Kommentar: </Text>
            <Text style={Style.Typography.dataLeft}>{item.comment}</Text>

            <StatusBar style='auto' />
        </View>
    );
};
