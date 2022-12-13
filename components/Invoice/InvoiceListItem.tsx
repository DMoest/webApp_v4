/**
 * Module imports.
 */
import React from "react";
import {Text, View} from "react-native";
import * as Style from "../../assets/styles";


/**
 * Product list item props type object. Used to type input props to component ProductListItem.
 */
type InvoiceListItemPropsType = {
    item: {
        id: number;
        order_id: number;
        name: string,
        address: string,
        zip: string,
        city: string,
        country: string,
        total_price: number,
        creation_date: string,
        due_date: string
    };
};


/**
 * ProductListItem object to return a touchable link element to item detail view.
 *
 * @constructor
 * @param props
 */
export const InvoiceListItem = (props: InvoiceListItemPropsType) => {
    return (
        <View
            key={props.item.id.toString()}
            style={Style.Button.listButton}>
            <Text style={Style.Typography.dataLeft}>{props.item.id}</Text>
            <Text style={Style.Typography.dataCenter}>{props.item.name}</Text>
            <Text style={Style.Typography.dataRight}>{props.item.order_id} st</Text>
        </View>
    );
};
